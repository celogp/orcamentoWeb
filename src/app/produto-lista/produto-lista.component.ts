import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Table } from 'primeng/table';
import { ProdutoEntity } from '../entidades/Produto/ProdutoEntity';
import { ProdutoLst } from '../entidades/Produto/ProdutoLst';
import { produtoServico } from '../produto/produto.servico';

@Component({
  selector: 'app-produto-lista',
  templateUrl: './produto-lista.component.html',
  styleUrls: ['./produto-lista.component.css']
})
export class ProdutoListaComponent implements OnInit {
  lstProduto = new Array<ProdutoLst>();
  isShowGrid: boolean = false;
  strFilter:string='';

  @Output()
  produtoEntityChange = new EventEmitter<ProdutoEntity>();

  @Output() 
  isShowGridChange = new EventEmitter()

  constructor(private _produtoServico: produtoServico ) { }

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

  doSelecionarItem(ItemProdutoEntity: ProdutoEntity) {
    this.produtoEntityChange.emit(ItemProdutoEntity);
    this.doShowGridChanged();
  }  

  doAtualizarPesquisa() {
    this._produtoServico.doGetProdutos()
      .subscribe((response) => {
        this.lstProduto = response.data;
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
