import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { IMAGEM_VAZIA } from '../app.config';
import { ProdutoModeloEntity } from '../entidades/ProdutoModelo/ProdutoModeloEntity';
import { utilService } from '../utils/util.servico';
import { produtoModeloServico } from './produto-modelo.servico';

@Component({
  selector: 'app-produto-modelo',
  templateUrl: './produto-modelo.component.html',
  styleUrls: ['./produto-modelo.component.css']
})
export class ProdutoModeloComponent implements OnInit {
  
  imageSrc: any = IMAGEM_VAZIA.Image;
  imagePath: any;
  messageImagem!: string;  

  uploadedFiles: any[] = [];

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
    console.log('passou no init do produto modelo');
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
    this.produtoModeloEntity.id = 0;
    this._produtoModeloServico.doAdicionar(this.produtoModeloEntity)
      .subscribe(
        (response) => {
          this.produtoModeloEntity.id = response.data.id;
          this._utilService.doApresentaMensagens('Adicionou o registro ' + this.produtoModeloEntity.id.toString(), 'success');
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

/*   doApagarItem(ItemProdutoModeloEntity: ProdutoModeloEntity): void {
    this.produtoModeloEntity = ItemProdutoModeloEntity;
    this.doApagar();
  } */

  displayProdutoModelo(_produtoModeloEntity: any) {
    this.produtoModeloEntity = _produtoModeloEntity;
    this.nomeProdutoAcabado = _produtoModeloEntity.produtoAcabado.nome;
    this.nomeProdutoBase = _produtoModeloEntity.produtoBase.nome;

    //this.imageSrc = _produtoModeloEntity.imagemsrc
    if (_produtoModeloEntity.produtoModeloImagem != null){
      this.imageSrc = "data:image/png;base64," + _produtoModeloEntity.produtoModeloImagem.conteudo;
    }else {
      //this.imageSrc = "data:image/png;base64," + _produtoModeloEntity.produtoModeloImagem.conteudo;
      this.imageSrc = '../assets/images/photoEmpty.jfif';
    }
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

   doSalvarImagem(): void {

    this._produtoModeloServico.doSalvarImagem(this.produtoModeloEntity.id, this.imagePath[0])
      .subscribe(
        (response) => {
          this._utilService.doApresentaMensagens('Adicionou a imagem ', 'success');
        },
        (errorResponse) => {
          this._utilService.doApresentaMensagens(errorResponse.error.mensagens, 'error');
        },
        () => {
          //this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Adicionou o registro', life: APP_CONSTANTES.TIMEOUTMSG });
        }
      );
  }

  doApagarImagem(): void {
    this._produtoModeloServico.doApagarImagem(this.produtoModeloEntity.id)
      .subscribe(
        (response) => {
          this.imageSrc = IMAGEM_VAZIA.Image;
          this._utilService.doApresentaMensagens('Apagou a imagem ', 'success');
        },
        (errorResponse) => {
          this._utilService.doApresentaMensagens(errorResponse.error.mensagens, 'error');
        },
        () => {
          //this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Adicionou o registro', life: APP_CONSTANTES.TIMEOUTMSG });
        }
      );
  }

  preview(files : any) {
    if (files.length === 0)
      return;
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this._utilService.doApresentaMensagens('Only images are supported.', 'error');
      return;
    }
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imageSrc = reader.result;
      this.doSalvarImagem();
    }
  }  

}
