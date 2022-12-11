import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { OrcamentoItemEntity } from '../entidades/Orcamento/OrcamentoItemEntity';
import { utilService } from '../utils/util.servico';
import { orcamentoItemService } from './orcamento-item.service';

@Component({
  selector: 'app-orcamento-item',
  templateUrl: './orcamento-item.component.html',
  styleUrls: ['./orcamento-item.component.css']
})
export class OrcamentoItemComponent implements OnInit {

  orcamentoItemEntity = new OrcamentoItemEntity();
  isEdit : boolean = false;
  isShowForm: boolean = true;
  isShowGridProduto: boolean = false;
  nomeProduto : string = '';

  constructor(
    private _appComponent : AppComponent,
    private _activatedRoute: ActivatedRoute,
    private _router: Router, 
    private _orcamentoItemService : orcamentoItemService,
    private _utilService : utilService, 
  ) { }

  ngOnInit(): void {
    this._appComponent.titleForm = "Orcamento Itens"
    if (history.state){
      this.orcamentoItemEntity.id = history.state.orcamentoItemId;
      this.orcamentoItemEntity.orcamentoId = history.state.orcamentoId;
      this.isEdit = (this.orcamentoItemEntity.id !=0);
      console.log('orcamentoItem state-> ', history.state);
      //chamar a api para trazer o objeto obterPorId
      if (this.orcamentoItemEntity.id != 0){
        this.doObterPorId();
      }
    }
  }

  doChangeTela(showGrid:any) {
    this.isShowForm = (showGrid == true ? false : true);
  }

  doChangeTelaProduto() {
    this.isShowGridProduto = (this.isShowGridProduto == true ? false : true);
    this.doChangeTela(this.isShowForm);
  }

  displayProduto(_produtoEntity:any) {
    this.orcamentoItemEntity.produtoId = _produtoEntity.id;
    this.nomeProduto = _produtoEntity.nome;
    this.orcamentoItemEntity.volume = _produtoEntity.volume;
    this.orcamentoItemEntity.vlrUnitario = _produtoEntity.precoTabela;
    this.doCalculaVlrBruto();
  }


  doTelaOrcamento(){
    this._router.navigate(['/Orcamento'], 
    { state: { orcamentoId: this.orcamentoItemEntity.orcamentoId}, 
    relativeTo: this._activatedRoute } );
  }

  doObterPorId(){
    this._orcamentoItemService.doObterPorId(this.orcamentoItemEntity.id)
      .subscribe(
        (response) => {
          this.orcamentoItemEntity = response.data;
          this.orcamentoItemEntity.volume = response.data.produto.volume;
          this.nomeProduto = response.data.produto.nome;
        },
        (errorResponse) => {
          this._utilService.doApresentaMensagens(errorResponse.error.mensagens, 'error');
        },
        () => {
          //
        }
      );

  }

  doAdicionar(): void {
    this.orcamentoItemEntity.id = 0;
    console.log('objeto de inclusao', this.orcamentoItemEntity);

    this._orcamentoItemService.doAdicionar(this.orcamentoItemEntity)
      .subscribe(
        (response) => {
          this.orcamentoItemEntity.id = response.data.id;
          this._utilService.doApresentaMensagens('Adicionou o registro', 'success');
        },
        (errorResponse) => {
          this._utilService.doApresentaMensagens(errorResponse.error.mensagens, 'error');
        },
        () => {
          //
        }
      );
  }

  doAtualizar(): void {
    this._orcamentoItemService.doAtualizar(this.orcamentoItemEntity)
      .subscribe(
        (response) => {
          this._utilService.doApresentaMensagens('Atualizou o registro', 'success');
        },
        (errorResponse) => {
          this._utilService.doApresentaMensagens(errorResponse.error.mensagens, 'error');
        }
      );
  }

  doApagar(): void {
    this._orcamentoItemService.doApagar(this.orcamentoItemEntity)
      .subscribe(
        (response) => {
          this._utilService.doApresentaMensagens('Apagou o registro '+this.orcamentoItemEntity.id, 'success');
        },
        (errorResponse) => {
          this._utilService.doApresentaMensagens(errorResponse.error.mensagens, 'error');
        },
        () => {
          //
        }
      );
  }

//Calculo da area
doCalculaArea(){
  this.orcamentoItemEntity.area = (this.orcamentoItemEntity.largura * this.orcamentoItemEntity.comprimento)
  this.doCalculaVlrBruto();
}

//Calcular o valor Bruto
doCalculaVlrBruto(){
  this.orcamentoItemEntity.vlrBruto = (this.orcamentoItemEntity.quantidade * this.orcamentoItemEntity.vlrUnitario * this.orcamentoItemEntity.area);
  this.doCalculaTotalLiquido();
}

  
//Chamado do campo percentual do desconto para calcular o valor
doCalculaVlrDesconto(){
  this.orcamentoItemEntity.vlrDesconto = (this.orcamentoItemEntity.vlrBruto * this.orcamentoItemEntity.percDesconto) / 100;
  this.doCalculaTotalLiquido();
}

//Chamado do campo do valor do desconto para calcular o percentual
doCalculaPercDesconto(){
  this.orcamentoItemEntity.percDesconto = (this.orcamentoItemEntity.vlrDesconto / this.orcamentoItemEntity.vlrBruto) * 100
  this.doCalculaTotalLiquido();
}

doCalculaTotalLiquido(){
  this.orcamentoItemEntity.vlrLiquido = this.orcamentoItemEntity.vlrBruto - this.orcamentoItemEntity.vlrDesconto
}

}
