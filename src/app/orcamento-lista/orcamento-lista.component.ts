import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Table } from 'primeng/table';
import { OrcamentoEntity } from '../entidades/Orcamento/OrcamentoEntity';
import { OrcamentoLst } from '../entidades/Orcamento/OrcamentoLst';
import { orcamentoService } from '../orcamento/orcamento.service';

@Component({
  selector: 'app-orcamento-lista',
  templateUrl: './orcamento-lista.component.html',
  styleUrls: ['./orcamento-lista.component.css']
})
export class OrcamentoListaComponent implements OnInit {
  lstOrcamentos = new Array<OrcamentoLst>();

  isShowGrid: boolean = false;
  strFilter:string='';

  @Output()
  orcamentoEntityChange = new EventEmitter<OrcamentoEntity>();

  @Output() 
  isShowGridChange = new EventEmitter()

  constructor(private _orcamentoService: orcamentoService ) { }

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

  doSelecionarItem(ItemOrcamentoEntity: OrcamentoEntity) {
    this.orcamentoEntityChange.emit(ItemOrcamentoEntity);
    this.doShowGridChanged();
  } 
  
  doAtualizarPesquisa() {
    this._orcamentoService.doGetOrcamentos()
      .subscribe((response) => {
        this.lstOrcamentos = response.data;
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
