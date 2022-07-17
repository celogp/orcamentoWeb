import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { ProdutoEntity } from '../entidades/Produto/ProdutoEntity';
import { ProdutoTipoEntity } from '../entidades/Produto/ProdutoTipo';
import { utilService } from '../utils/util.servico';
import { produtoServico } from './produto.servico';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {

  produtoEntity = new ProdutoEntity();
  lstProdutoTipo = new Array<ProdutoTipoEntity>();
  isShowForm: boolean = true;
  isShowGridProduto:boolean=false;

  constructor(
    private _produtoServico: produtoServico, 
    private _utilService: utilService, 
    private _appComponent : AppComponent
  ) { 
  }

  ngOnInit(): void {
    this._appComponent.titleForm = "Produtos"
    this.produtoEntity.id = 0;
    this.doGetProdutoTipo();
  }

  displayProduto(_produtoEntity:any) {
    this.produtoEntity = _produtoEntity;
  }

  doChangeTela(showGrid:any) {
    this.isShowForm = (showGrid == true ? false : true);
  }

  doChangeTelaProduto() {
    this.isShowGridProduto = (this.isShowGridProduto == true ? false : true);
    this.doChangeTela(this.isShowForm);
  }

  doGetProdutoTipo() {
    this._produtoServico.doGetProdutoTipo()
      .subscribe((response) => {
        this.lstProdutoTipo = response.data;
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
    this.produtoEntity.id = 0;
    this._produtoServico.doAdicionar(this.produtoEntity)
      .subscribe(
        (response) => {
          this.produtoEntity.id = response.data.id;
          this._utilService.doApresentaMensagens('Adicionou o registro', 'success');
        },
        (errorResponse) => {
          this._utilService.doApresentaMensagens(errorResponse.error.mensagens, 'error');
        },
        () => {
          //this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Adicionou o registro', life: APP_CONSTANTES.TIMEOUTMSG });
        }
      );
  }

  doAtualizar(): void {
    this._produtoServico.doAtualizar(this.produtoEntity)
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
    this._produtoServico.doApagar(this.produtoEntity)
      .subscribe(
        (response) => {
          this._utilService.doApresentaMensagens('Apagou o registro '+this.produtoEntity.nome, 'success');
        },
        (errorResponse) => {
          this._utilService.doApresentaMensagens(errorResponse.error.mensagens, 'error');
        },
        () => {
          //this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: this.parceiroEntity.nome, life: APP_CONSTANTES.TIMEOUTMSG });
        }
      );
  }

  doApagarItem(ItemProdutoEntity: ProdutoEntity): void {
    this.produtoEntity = ItemProdutoEntity;
    this.doApagar();
  }

} 
