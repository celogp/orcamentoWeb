import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Table } from 'primeng/table';
import { ProdutoModeloComponEntity } from '../entidades/ProdutoModeloCompon/ProdutoModeloComponEntity';
import { ProdutoModeloComponLst } from '../entidades/ProdutoModeloCompon/ProdutoModeloComponLst';
import { produtoModeloComponService } from '../produto-modelo-compon/produto-modelo-compon.service';

@Component({
  selector: 'app-produto-modelo-compon-lista',
  templateUrl: './produto-modelo-compon-lista.component.html',
  styleUrls: ['./produto-modelo-compon-lista.component.css']
})
export class ProdutoModeloComponListaComponent implements OnInit {

  lstProdutoModeloCompon = new Array<ProdutoModeloComponLst>();
  isShowGrid: boolean = false;
  strFilter:string='';

  @Input() 
  produtoModeloId : string = '0';

  @Output()
  produtoModeloComponEntityChange = new EventEmitter<ProdutoModeloComponEntity>();

  @Output() 
  isShowGridChange = new EventEmitter()

  constructor(private _produtoModeloComponService : produtoModeloComponService) { 
  }

  ngOnInit(): void {
    this.isShowGrid = true;
    if (this.produtoModeloId != '0') {
      this.doAtualizarPesquisa();
    }
    console.log('passou no init do produto modeloLista');

  }

  doShowGridChanged(): void {
    this.isShowGrid = (this.isShowGrid == true ? false : true);
    this.isShowGridChange.emit(this.isShowGrid);
  }  

  doClear(table: Table) {
    this.strFilter = '';
    table.clear();
  }

  applyFilterGlobal() : string{
    return this.strFilter;
  }

  doSelecionarItem(ItemProdutoComponEntity: ProdutoModeloComponEntity) {
    this.produtoModeloComponEntityChange.emit(ItemProdutoComponEntity);
    this.doShowGridChanged();
  }  

  doAtualizarPesquisa() {
    this._produtoModeloComponService.doGetProdutosModeloCompon(this.produtoModeloId)
      .subscribe((response) => {
        this.lstProdutoModeloCompon = response.data;
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


