import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Table } from 'primeng/table';
import { ParceiroEntity } from '../entidades/ParceiroEntity';
import { ParceiroLst } from '../entidades/ParceiroLst';
import { parceiroServico } from '../parceiro/parceiro.servico';

@Component({
  selector: 'app-parceiro-lista',
  templateUrl: './parceiro-lista.component.html',
  styleUrls: ['./parceiro-lista.component.css']
})
export class ParceiroListaComponent implements OnInit {
  
  lstParceiros = new Array<ParceiroLst>();
  isShowGrid: boolean = false;
  strFilter:string='';

  @Output()
  parceiroEntityChange = new EventEmitter<ParceiroEntity>();

  @Output() 
  isShowGridChange = new EventEmitter()

  constructor(private _parceiroServico: parceiroServico ) { }

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

  doSelecionarItem(ItemParceiroEntity: ParceiroEntity) {
    this.parceiroEntityChange.emit(ItemParceiroEntity);
    this.doShowGridChanged();
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
}
