import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Table } from 'primeng/table';
import { FinanceiroEntity } from '../entidades/FinanceiroEntity';
import { FinanceiroLst } from '../entidades/FinanceiroLst';
import { financeiroServico } from '../financeiro/financeiro.servico';

@Component({
  selector: 'app-financeiro-lista',
  templateUrl: './financeiro-lista.component.html',
  styleUrls: ['./financeiro-lista.component.css']
})
export class FinanceiroListaComponent implements OnInit {
  lstFinanceiros = new Array<FinanceiroLst>();

  isShowGrid: boolean = false;
  strFilter:string='';

  @Output()
  financeiroEntityChange = new EventEmitter<FinanceiroEntity>();

  @Output() 
  isShowGridChange = new EventEmitter()


  constructor(private _financeiroServico: financeiroServico ) { }

  ngOnInit(): void {
    this.isShowGrid = true;
    this.doAtualizarPesquisa();    
  }

  doShowGridChanged(): void {
    this.isShowGrid = (this.isShowGrid == true ? false : true);
    this.isShowGridChange.emit(this.isShowGrid);
  }  

  doClear(table: Table) {
    table.clear();
  }

  applyFilterGlobal() : string{
    return this.strFilter;
  }

  doSelecionarItem(ItemFinanceiroEntity: FinanceiroEntity) {
    this.financeiroEntityChange.emit(ItemFinanceiroEntity);
    this.doShowGridChanged();
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

}
