import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { OrcamentoEntity } from '../entidades/Orcamento/OrcamentoEntity';
import { utilService } from '../utils/util.servico';
import { orcamentoService } from './orcamento.service';

@Component({
  selector: 'app-orcamento',
  templateUrl: './orcamento.component.html',
  styleUrls: ['./orcamento.component.css']
})
export class OrcamentoComponent implements OnInit {

  orcamentoEntity = new OrcamentoEntity();
  isShowForm: boolean = true;
  isShowGridOrcamento: boolean = false;
  isShowGridParceiro: boolean = false;
  nomeParceiro : string=""
  strFilter:string='';
  sub:any;

  constructor(
    private _utilService: utilService, 
    private _orcamentoService : orcamentoService,
    private _appComponent : AppComponent,
    private _activatedRoute: ActivatedRoute,
    private _router: Router 
  ) { }

  ngOnInit(): void {
    console.log('Init do componente do orçamento..');

    this._appComponent.titleForm = "Orcamentos"
    this.orcamentoEntity.id = 0;
    this.orcamentoEntity.bloqueado = false;

    //Carregar os dados.
    if (history.state){
      this.orcamentoEntity.id = history.state.orcamentoId;
      console.log('orcamentoItem -> ', history.state);
      if (this.orcamentoEntity.id){
        this.doObterPorId();
      }
    }

  }

  doChangeTela(showGrid:any) {
    this.isShowForm = (showGrid == true ? false : true);
  }

  doChangeTelaOrcamento() {
    this.isShowGridOrcamento = (this.isShowGridOrcamento == true ? false : true);
    this.doChangeTela(this.isShowForm);
  }

  doChangeTelaParceiro() {
    this.isShowGridParceiro = (this.isShowGridParceiro == true ? false : true);
    this.doChangeTela(this.isShowForm);
  }

  doObterPorId(){
    this._orcamentoService.doObterPorId(this.orcamentoEntity)
      .subscribe(
        (response) => {
          this.orcamentoEntity = response.data;
          this.nomeParceiro = response.data.parceiro.nome;
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
    this.orcamentoEntity.id = 0;
    this._orcamentoService.doAdicionar(this.orcamentoEntity)
      .subscribe(
        (response) => {
          this.orcamentoEntity.id = response.data.id;
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
    this._orcamentoService.doAtualizar(this.orcamentoEntity)
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
    this._orcamentoService.doApagar(this.orcamentoEntity)
      .subscribe(
        (response) => {
          this._utilService.doApresentaMensagens('Apagou o registro '+this.orcamentoEntity.parceiroId, 'success');
        },
        (errorResponse) => {
          this._utilService.doApresentaMensagens(errorResponse.error.mensagens, 'error');
        },
        () => {
          //
        }
      );
  }

  displayOrcamento(_orcamentoEntity:any) {
    this.orcamentoEntity = _orcamentoEntity;
    this.nomeParceiro = _orcamentoEntity.parceiro.nome;
  }

  displayParceiro(_parceiroEntity:any) {
    this.orcamentoEntity.parceiroId = _parceiroEntity.id;
    this.nomeParceiro = _parceiroEntity.nome;
  }


  doTelaOrcamentoItem(){
      this._router.navigate(['/OrcamentoItem'], 
      { queryParams: { orcamentoId: this.orcamentoEntity.id, orcamentoItemId: 0 },
      state : this.orcamentoEntity, 
      relativeTo: this._activatedRoute } );
  }
  
  //Chamado do campo percentual do desconto para calcular o valor
  doCalculaVlrDesconto(){
    this.orcamentoEntity.vlrDesconto = (this.orcamentoEntity.vlrTotalItens * this.orcamentoEntity.percDesconto) / 100
    this.doCalculaTotalLiquido();
  }

  //Chamado do campo do valor do desconto para calcular o percentual
  doCalculaPercDesconto(){
    this.orcamentoEntity.percDesconto = (this.orcamentoEntity.vlrDesconto / this.orcamentoEntity.vlrTotalItens) * 100
    this.doCalculaTotalLiquido();
  }

  doCalculaTotalLiquido(){
    this.orcamentoEntity.vlrTotal = this.orcamentoEntity.vlrTotalItens - this.orcamentoEntity.vlrDesconto
  }

}
