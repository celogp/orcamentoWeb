import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { ParceiroEntity } from '../entidades/ParceiroEntity';
import { SexoEntity } from '../entidades/SexoEntity';
import { utilService } from '../utils/util.servico';
import { parceiroServico } from './parceiro.servico';

@Component({
  selector: 'app-parceiro',
  templateUrl: './parceiro.component.html',
  styleUrls: ['./parceiro.component.css']
})
export class ParceiroComponent implements OnInit {

  parceiroEntity = new ParceiroEntity();
  lstParceiros = new Array<ParceiroEntity>();
  lstSexo = new Array<SexoEntity>();

  isShowGrid: boolean = false;
  isShowForm: boolean = true;

  strFilter:string='';

  constructor(
    private _parceiroServico: parceiroServico, 
    private _utilService: utilService
  ) { }

  ngOnInit(): void {
    this.parceiroEntity.id = 0;
    this.doAtualizarPesquisa();
    this.doGetSexo();
  }

  doAlternarTela(): void {
    this.isShowGrid = (this.isShowGrid == true ? false : true);
    this.isShowForm = (this.isShowForm == true ? false : true);
  }

  doClear(table: Table) {
    table.clear();
  }

  applyFilterGlobal() : string{
    return this.strFilter;
  }

  doPesquisar(): void {
    this.doAlternarTela();
  }

  doSelecionarItem(ItemParceiroEntity: ParceiroEntity) {
    this.parceiroEntity = ItemParceiroEntity;
    this.doAlternarTela();
  }  

  doGetSexo() {
    this._parceiroServico.doGetSexo()
      .subscribe((response) => {
        this.lstSexo = response.data;
      },
        (error) => {
          //console.log(error);
        },
        () => {
          //console.log('this complet');
        }
      );
  }


  doAtualizarPesquisa() {
    this._parceiroServico.doGetParceiros()
      .subscribe((response) => {
        this.lstParceiros = response.data;
      },
        (error) => {
          //console.log(error);
        },
        () => {
          //console.log('this complet');
        }
      );
  }

  doAdicionar(): void {
    this.parceiroEntity.id = 0;
    this._parceiroServico.doAdicionar(this.parceiroEntity)
      .subscribe(
        (response) => {
          this.parceiroEntity.id = response.data.id;
          this._utilService.doApresentaMensagens('Adicionou o registro', 'success');
        },
        (errorResponse) => {
          //console.info('this is complet', error.id);
          this._utilService.doApresentaMensagens(errorResponse.error.mensagens, 'error');
        },
        () => {
          //this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Adicionou o registro', life: APP_CONSTANTES.TIMEOUTMSG });
        }
      );
  }

  doAtualizar(): void {
    this._parceiroServico.doAtualizar(this.parceiroEntity)
      .subscribe(
        (response) => {
          //this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Atualizou o registro', life: APP_CONSTANTES.TIMEOUTMSG });
          this._utilService.doApresentaMensagens('Atualizou o registro', 'success');
        },
        (errorResponse) => {
          this._utilService.doApresentaMensagens(errorResponse.error.mensagens, 'error');
        }
      );
  }

  doApagar(): void {
    this._parceiroServico.doApagar(this.parceiroEntity)
      .subscribe(
        (response) => {
          this._utilService.doApresentaMensagens('Apagou o registro '+this.parceiroEntity.nome, 'success');
        },
        (errorResponse) => {
          this._utilService.doApresentaMensagens(errorResponse.error.mensagens, 'error');
        },
        () => {
          //this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: this.parceiroEntity.nome, life: APP_CONSTANTES.TIMEOUTMSG });
        }
      );
  }

  doApagarItem(ItemParceiroEntity: ParceiroEntity): void {
    this.parceiroEntity = ItemParceiroEntity;
    this.doApagar();
  }

}
