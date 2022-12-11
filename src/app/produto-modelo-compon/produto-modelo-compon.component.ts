import { Component, Input, OnInit } from '@angular/core';
import { ProdutoModeloComponEntity } from '../entidades/ProdutoModeloCompon/ProdutoModeloComponEntity';
import { utilService } from '../utils/util.servico';
import { produtoModeloComponService } from './produto-modelo-compon.service';

@Component({
  selector: 'app-produto-modelo-compon',
  templateUrl: './produto-modelo-compon.component.html',
  styleUrls: ['./produto-modelo-compon.component.css']
})
export class ProdutoModeloComponComponent implements OnInit {

  produtoModeloComponEntity = new ProdutoModeloComponEntity();
  isShowForm: boolean = false;
  isShowGridProdutoModeloCompon: boolean = true;
  isShowGridProdutoCompon: boolean = false;

  nomeProdutoComponente: string = ""
  
  @Input() 
  produtoModeloId : string = '0';

  constructor(
    private _utilService: utilService,
    private _produtoModeloComponService : produtoModeloComponService
    ) { 

  }

  ngOnInit(): void {
    this.produtoModeloComponEntity.id = 0;
    console.log('passou no init do produto modelo componente');

  }

  doChangeTela(showGrid: any) {
    this.isShowForm = (showGrid == true ? false : true);
  }

  doChangeTelaProdutoModeloCompon() {
    this.isShowGridProdutoModeloCompon = (this.isShowGridProdutoModeloCompon == true ? false : true);
    this.doChangeTela(this.isShowForm);
  }

  doChangeTelaProdutoCompon() {
    this.isShowGridProdutoCompon = (this.isShowGridProdutoCompon == true ? false : true);
    this.doChangeTela(this.isShowForm);
  }

  displayProdutoModeloCompon(_produtoModeloComponEntity: any) {
    this.produtoModeloComponEntity = _produtoModeloComponEntity;
    this.nomeProdutoComponente = _produtoModeloComponEntity.produto.nome;
  }

  displayProdutoCompon(_produtoEntity: any) {
    this.produtoModeloComponEntity.produtoId = _produtoEntity.id;
    this.nomeProdutoComponente = _produtoEntity.nome;
  }

  doAdicionar(): void {
    this.produtoModeloComponEntity.id = 0;
    this.produtoModeloComponEntity.produtoModeloId = Number(this.produtoModeloId);
    
    this._produtoModeloComponService.doAdicionar(this.produtoModeloComponEntity)
      .subscribe(
        (response) => {
          this.produtoModeloComponEntity.id = response.data.id;
          this._utilService.doApresentaMensagens('Adicionou o registro ' + this.produtoModeloComponEntity.id.toString(), 'success');
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
    this._produtoModeloComponService.doAtualizar(this.produtoModeloComponEntity)
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
    this._produtoModeloComponService.doApagar(this.produtoModeloComponEntity)
      .subscribe(
        (response) => {
          this._utilService.doApresentaMensagens('Apagou o registro ' + this.produtoModeloComponEntity.nome, 'success');
        },
        (errorResponse) => {
          this._utilService.doApresentaMensagens(errorResponse.error.mensagens, 'error');
        },
        () => {
          //this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: this.parceiroEntity.nome, life: APP_CONSTANTES.TIMEOUTMSG });
        }
      );
  }

}
