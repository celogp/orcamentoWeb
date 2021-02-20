import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { FinanceiroEntity } from '../entidades/FinanceiroEntity';
import { utilService } from '../utils/util.servico';
import { financeiroServico } from './financeiro.servico';

@Component({
  selector: 'app-financeiro',
  templateUrl: './financeiro.component.html',
  styleUrls: ['./financeiro.component.css']
})
export class FinanceiroComponent implements OnInit {
  financeiroEntity = new FinanceiroEntity();
  lstFinanceiros = new Array<FinanceiroEntity>();

  isShowGrid: boolean = false;
  isShowForm: boolean = true;

  strFilter:string='';

  constructor(private _utilService: utilService, 
    private _financeiroServico : financeiroServico) { }

  ngOnInit(): void {
    this.financeiroEntity.id = 0;
    this.doAtualizarPesquisa();
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

  doSelecionarItem(ItemFinanceiroEntity: FinanceiroEntity) {
    this.financeiroEntity = ItemFinanceiroEntity;
    this.doAlternarTela();
  }  

  doAtualizarPesquisa() {
    this._financeiroServico.doGetFinanceiros()
      .subscribe((response) => {
        this.lstFinanceiros = response.data;
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
    this.financeiroEntity.id = 0;
    this._financeiroServico.doAdicionar(this.financeiroEntity)
      .subscribe(
        (response) => {
          this.financeiroEntity.id = response.data.id;
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
    this._financeiroServico.doAtualizar(this.financeiroEntity)
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
    this._financeiroServico.doApagar(this.financeiroEntity)
      .subscribe(
        (response) => {
          this._utilService.doApresentaMensagens('Apagou o registro '+this.financeiroEntity.parceiroId, 'success');
        },
        (errorResponse) => {
          this._utilService.doApresentaMensagens(errorResponse.error.mensagens, 'error');
        },
        () => {
          //
        }
      );
  }

  doApagarItem(ItemFinanceiroEntity: FinanceiroEntity): void {
    this.financeiroEntity = ItemFinanceiroEntity;
    this.doApagar();
  }


}
