import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { OrcamentoItemComponenteEntity } from '../entidades/Orcamento/OrcamentoItemComponenteEntity';
import { utilService } from '../utils/util.servico';
import { orcamentoComponenteService } from './orcamento-componente.service';

@Component({
  selector: 'app-orcamento-componente',
  templateUrl: './orcamento-componente.component.html',
  styleUrls: ['./orcamento-componente.component.css']
})
export class OrcamentoComponenteComponent implements OnInit {
  orcamentoItemComponenteEntity = new OrcamentoItemComponenteEntity();
  id : number = 0;
  orcamentoId : string = '';
  orcamentoItemId : string = '';

  isEdit : boolean = false;
  isShowForm: boolean = true;
  isShowGridProduto: boolean = false;
  nomeProduto : string = '';

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router , 
    private _appComponent : AppComponent,
    private _utilService : utilService,
    private _orcamentoComponenteService : orcamentoComponenteService,
  ) { 
  }

  ngOnInit(): void {
    this._appComponent.titleForm = "Orcamento Componentes do Item"
    if (history.state){
      this.id = history.state.Id;
      this.orcamentoItemId = history.state.orcamentoItemId;
      this.orcamentoId = history.state.orcamentoId;

      this.orcamentoItemComponenteEntity.orcamentoId = Number(this.orcamentoId); 
      this.orcamentoItemComponenteEntity.orcamentoItemId = Number(this.orcamentoItemId); 
      this.isEdit = (this.id!=0);

      console.log('orcamentoItem componente state-> ', history.state);
      //chamar a api para trazer o objeto do componente obterPorItemId
      if (this.id != 0){
        console.log('Chamou o obterPorId => ', history.state);
        this.doObterPorId();
      }else{
        //Atualizar medidas com os valores do item
        this.doObterOrcamentoItemId(this.orcamentoItemComponenteEntity.orcamentoItemId);
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
    this.orcamentoItemComponenteEntity.produtoId = _produtoEntity.id;
    this.nomeProduto = _produtoEntity.nome;
    this.orcamentoItemComponenteEntity.volume = _produtoEntity.volume;
    this.orcamentoItemComponenteEntity.vlrUnitario = _produtoEntity.precoTabela;
    console.log('passou no display do produto do componente  ', this.orcamentoItemComponenteEntity);
    this.doCalculaVlrBruto();
  }

  doListaComponente(){
    this._router.navigate(['/OrcamentoComponenteLista'], 
    { state : {"orcamentoId" : this.orcamentoId, "orcamentoItemId" : this.orcamentoItemId},
    relativeTo: this._activatedRoute } );
  }

  doObterOrcamentoItemId(_orcamentoItemId: number){
    console.log('pegou o item do servidor no add');
    this._orcamentoComponenteService.doObterOrcamentoItemId(_orcamentoItemId)
    .subscribe(
      (response) => {
        this.orcamentoItemComponenteEntity.quantidade = response.data.quantidade;
        this.orcamentoItemComponenteEntity.largura = response.data.largura;
        this.orcamentoItemComponenteEntity.comprimento = response.data.comprimento;
        this.orcamentoItemComponenteEntity.espessura = response.data.espessura;
        this.orcamentoItemComponenteEntity.area = response.data.area;
      },
      (errorResponse) => {
        this._utilService.doApresentaMensagens(errorResponse.error.mensagens, 'error');
      },
      () => {
        //
      }
    ); 
  }

  doObterPorId(){
    this._orcamentoComponenteService.doObterPorId(this.id)
      .subscribe(
        (response) => {
          this.orcamentoItemComponenteEntity = response.data;
          this.nomeProduto = response.data.produto.nome;
          console.log('pegou o componente no back ', this.orcamentoItemComponenteEntity);
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
    this.orcamentoItemComponenteEntity.id = 0;
    this._orcamentoComponenteService.doAdicionar(this.orcamentoItemComponenteEntity)
      .subscribe(
        (response) => {
          this.orcamentoItemComponenteEntity.id = response.data.id;
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
    this._orcamentoComponenteService.doAtualizar(this.orcamentoItemComponenteEntity)
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
    this._orcamentoComponenteService.doApagar(this.orcamentoItemComponenteEntity)
      .subscribe(
        (response) => {
          this._utilService.doApresentaMensagens('Apagou o registro '+this.orcamentoItemComponenteEntity.id, 'success');
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
  this.orcamentoItemComponenteEntity.area = (this.orcamentoItemComponenteEntity.largura * this.orcamentoItemComponenteEntity.comprimento)
  this.doCalculaVlrBruto();
}

//Calcular o valor Bruto
doCalculaVlrBruto(){
  this.orcamentoItemComponenteEntity.vlrBruto = (this.orcamentoItemComponenteEntity.quantidade * this.orcamentoItemComponenteEntity.vlrUnitario * this.orcamentoItemComponenteEntity.area);
  this.doCalculaTotalLiquido();
}

  
//Chamado do campo percentual do desconto para calcular o valor
doCalculaVlrDesconto(){
  this.orcamentoItemComponenteEntity.vlrDesconto = (this.orcamentoItemComponenteEntity.vlrBruto * this.orcamentoItemComponenteEntity.percDesconto) / 100;
  this.doCalculaTotalLiquido();
}

//Chamado do campo do valor do desconto para calcular o percentual
doCalculaPercDesconto(){
  this.orcamentoItemComponenteEntity.percDesconto = (this.orcamentoItemComponenteEntity.vlrDesconto / this.orcamentoItemComponenteEntity.vlrBruto) * 100
  this.doCalculaTotalLiquido();
}

doCalculaTotalLiquido(){
  this.orcamentoItemComponenteEntity.vlrLiquido = this.orcamentoItemComponenteEntity.vlrBruto - this.orcamentoItemComponenteEntity.vlrDesconto
}


}
