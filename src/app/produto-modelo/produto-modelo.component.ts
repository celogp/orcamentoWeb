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
  imageSrc: any;

  activeColor: string = 'green';
  baseColor: string = '#ccc';
  overlayColor: string = 'rgba(255,255,255,0.5)';
  iconColor = this.overlayColor;
  borderColor = this.activeColor;


  uploadedFiles: any[] = [];

  produtoModeloEntity = new ProdutoModeloEntity();
  isShowForm: boolean = true;
  isShowGridProdutoModelo: boolean = false;
  isShowGridProdutoAcabado: boolean = false;
  isShowGridProdutoBase: boolean = false;

  nomeProdutoAcabado: string = ""
  nomeProdutoBase: string = ""

  public message!: string;  
  imagePath: any;
  imgURL: any;
  
  
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
    //this.produtoModeloEntity.imagem = this.imagePath[0];
    console.log('chamando api com imagem =>', this.produtoModeloEntity);
    this._produtoModeloServico.doAtualizar(this.produtoModeloEntity, this.imagePath[0])
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

   doSalvarImagem(): void {

    console.log('antes de chamar a classe do serviço => ', this.produtoModeloEntity.id);

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

  myOnUpload(event:any) {
    console.log('evento ', event);
    for(let file of event.files) {
        this.uploadedFiles.push(file);
        let  url = window.URL.createObjectURL( file );
        //this.imageSrc = url;
        this.imageSrc = file.result;

        var reader = new FileReader();
        this.imagePath = file;
        reader.readAsDataURL(file); 
        reader.onload = (_event) => { 
          this.imgURL = reader.result; 
          this.imageSrc = reader.result; 
        }    
    }
    //this.imageSrc = this.uploadedFiles[0];

    this._utilService.doApresentaMensagens('File Upload', 'success');
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
      this.imgURL = reader.result; 
      this.imageSrc = reader.result; 
    }
    console.log('array ', this.uploadedFiles);
    console.log('scrImage ', this.imageSrc);
    console.log('imagePath ', this.imagePath);

  }  

}
