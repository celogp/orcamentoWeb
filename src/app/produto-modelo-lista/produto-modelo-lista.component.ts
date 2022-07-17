import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Table } from 'primeng/table';
import { ProdutoModeloEntity } from '../entidades/ProdutoModelo/ProdutoModeloEntity';
import { ProdutoModeloLst } from '../entidades/ProdutoModelo/ProdutoModeloLst';
import { produtoModeloServico } from '../produto-modelo/produto-modelo.servico';

@Component({
  selector: 'app-produto-modelo-lista',
  templateUrl: './produto-modelo-lista.component.html',
  styleUrls: ['./produto-modelo-lista.component.css']
})
export class ProdutoModeloListaComponent implements OnInit {
  lstProdutoModelo = new Array<ProdutoModeloLst>();
  isShowGrid: boolean = false;
  strFilter:string='';

  @Output()
  produtoModeloEntityChange = new EventEmitter<ProdutoModeloEntity>();

  @Output() 
  isShowGridChange = new EventEmitter()

  constructor(private _produtoModeloServico: produtoModeloServico ) { }

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

  doSelecionarItem(ItemProdutoEntity: ProdutoModeloEntity) {
    this.produtoModeloEntityChange.emit(ItemProdutoEntity);
    this.doShowGridChanged();
  }  

  doAtualizarPesquisa() {
    this._produtoModeloServico.doGetProdutosModelo()
      .subscribe((response) => {
        this.lstProdutoModelo = response.data;
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
