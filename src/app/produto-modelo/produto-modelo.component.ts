import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { ProdutoModeloEntity } from '../entidades/ProdutoModelo/ProdutoModeloEntity';
import { utilService } from '../utils/util.servico';
import { produtoModeloServico } from './produto-modelo.servico';

@Component({
  selector: 'app-produto-modelo',
  templateUrl: './produto-modelo.component.html',
  styleUrls: ['./produto-modelo.component.css'],
  inputs: ['activeColor', 'baseColor', 'overlayColor']
})
export class ProdutoModeloComponent implements OnInit {

  dragging: boolean = false;
  loaded: boolean = false;
  imageLoaded: boolean = false;
  imageSrc: string = '';

  activeColor: string = 'green';
  baseColor: string = '#ccc';
  overlayColor: string = 'rgba(255,255,255,0.5)';
  iconColor = this.overlayColor;
  borderColor = this.activeColor;


  produtoModeloEntity = new ProdutoModeloEntity();
  isShowForm: boolean = true;
  isShowGridProdutoModelo: boolean = false;
  isShowGridProdutoAcabado: boolean = false;
  isShowGridProdutoBase: boolean = false;

  nomeProdutoAcabado: string = ""
  nomeProdutoBase: string = ""

  constructor(
    private _utilService: utilService,
    private _appComponent: AppComponent,
    private _produtoModeloServico: produtoModeloServico,

  ) { }

  ngOnInit(): void {
    this._appComponent.titleForm = "Produtos Modelos"
    this.produtoModeloEntity.id = 0;
  }

  doChangeTela(showGrid: any) {
    this.isShowForm = (showGrid == true ? false : true);
  }

  doChangeTelaProdutoModelo() {
    this.isShowGridProdutoModelo = (this.isShowGridProdutoModelo == true ? false : true);
    this.doChangeTela(this.isShowForm);
  }

  doChangeTelaProdutoAcabado() {
    this.isShowGridProdutoAcabado = (this.isShowGridProdutoAcabado == true ? false : true);
    this.doChangeTela(this.isShowForm);
  }

  doChangeTelaProdutoBase() {
    this.isShowGridProdutoBase = (this.isShowGridProdutoBase == true ? false : true);
    this.doChangeTela(this.isShowForm);
  }

  doAdicionar(): void {
    console.log('objeto ', this.produtoModeloEntity);
    this.produtoModeloEntity.id = 0;
    this._produtoModeloServico.doAdicionar(this.produtoModeloEntity)
      .subscribe(
        (response) => {
          this.produtoModeloEntity.id = response.data.id;
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
    this._produtoModeloServico.doAtualizar(this.produtoModeloEntity)
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
    this._produtoModeloServico.doApagar(this.produtoModeloEntity)
      .subscribe(
        (response) => {
          this._utilService.doApresentaMensagens('Apagou o registro ' + this.produtoModeloEntity.nome, 'success');
        },
        (errorResponse) => {
          this._utilService.doApresentaMensagens(errorResponse.error.mensagens, 'error');
        },
        () => {
          //this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: this.parceiroEntity.nome, life: APP_CONSTANTES.TIMEOUTMSG });
        }
      );
  }

  doApagarItem(ItemProdutoModeloEntity: ProdutoModeloEntity): void {
    this.produtoModeloEntity = ItemProdutoModeloEntity;
    this.doApagar();
  }

  displayProdutoModelo(_produtoModeloEntity: any) {
    this.produtoModeloEntity = _produtoModeloEntity;
    this.nomeProdutoAcabado = _produtoModeloEntity.produtoAcabado.nome;
    this.nomeProdutoBase = _produtoModeloEntity.produtoBase.nome;

    this.imageSrc = _produtoModeloEntity.imagemsrc
  }

  displayProdutoAcabado(_produtoEntity: any) {
    this.produtoModeloEntity.produtoAcabadoId = _produtoEntity.id;
    this.nomeProdutoAcabado = _produtoEntity.nome;
  }

  displayProdutoBase(_produtoEntity: any) {
    this.produtoModeloEntity.produtoBaseId = _produtoEntity.id;
    this.nomeProdutoBase = _produtoEntity.nome;
  }
  /**
   * Daqui para baixo tratativa da imagem
   */

  handleImageLoad() {
    this.imageLoaded = true;
  }

  handleDragEnter() {
    console.log("handleDragEnter")
    this.dragging = true;
  }

  handleDragLeave() {
    console.log("handleDragLeave")
    this.dragging = false;
  }

  handleDrop(e: any) {
    e.preventDefault();
    this.dragging = false;
    this.handleInputChange(e);
  }

  handleInputChange(e: any) {
    console.log("input change")
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];

    var pattern = /image-*/;
    var reader = new FileReader();

    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }

    this.loaded = false;

    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }

  _handleReaderLoaded(e: any) {
    console.log("_handleReaderLoaded")
    var reader = e.target;
    this.imageSrc = reader.result;
    this.loaded = true;
    console.log('base64 ', this.imageSrc);
    this.produtoModeloEntity.imagemsrc = this.imageSrc;
  }

  _setActive() {

    this.borderColor = this.activeColor;
    if (this.imageSrc.length === 0) {
      this.iconColor = this.activeColor;
    }
  }

  _setInactive() {
    this.borderColor = this.baseColor;
    if (this.imageSrc.length === 0) {
      this.iconColor = this.baseColor;
    }
  }

  cancel() {
    this.imageSrc = "null"
  }

}
