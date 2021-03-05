import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Table } from 'primeng/table';
import { LocalizacaoEntity } from '../entidades/LocalizacaoEntity';
import { localizacaoServico } from '../localizacao/localizacao.servico';

@Component({
  selector: 'app-localizacao-lista',
  templateUrl: './localizacao-lista.component.html',
  styleUrls: ['./localizacao-lista.component.css']
})
export class LocalizacaoListaComponent implements OnInit {

  localizacaoEntity = new LocalizacaoEntity();
  lstLocalizacoes = new Array<LocalizacaoEntity>();
  isShowGrid: boolean = false;
  strFilter:string='';

  @Output()
  localizacaoEntityChange = new EventEmitter<LocalizacaoEntity>();

  @Output() 
  isShowGridChange = new EventEmitter()

  constructor(private _localizacaoServico: localizacaoServico) { }

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

  doSelecionarItem(ItemLocalizacaoEntity: LocalizacaoEntity) {
    this.localizacaoEntityChange.emit(ItemLocalizacaoEntity);
    this.doShowGridChanged();
  }

  doAtualizarPesquisa() {
    this._localizacaoServico.doGetLocalizacoes()
      .subscribe((response) => {
        this.lstLocalizacoes = response.data;
      },
        () => {
          //console.log(error);
        },
        () => {
          //console.log('this complet');
        }
      );
  }
}