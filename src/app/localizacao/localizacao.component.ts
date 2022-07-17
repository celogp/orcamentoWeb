import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { AppComponent } from '../app.component';
import { LocalizacaoEntity } from '../entidades/LocalizacaoEntity';
import { UfEntity } from '../entidades/UfsEntity';
import { utilService } from '../utils/util.servico';
import { localizacaoServico } from './localizacao.servico';

@Component({
  selector: 'app-localizacao',
  templateUrl: './localizacao.component.html',
  styleUrls: ['./localizacao.component.css']
})

export class LocalizacaoComponent implements OnInit {

  localizacaoEntity = new LocalizacaoEntity();
  lstUfs = new Array<UfEntity>();

  isShowForm: boolean = true;

  constructor(
    private _utilService: utilService, 
    private _localizacaoServico: localizacaoServico, 
    private _appComponent : AppComponent) {
  }

  ngOnInit(): void {
    this._appComponent.titleForm = "Localizações"
    this.localizacaoEntity.id = 0;
    this.doGetUfs();
  }

  ngOnDestroy() {
    //console.log('this pass to destroy...');
  }

  displayLocalizacao(_localizacaoEntity:any) {
    this.localizacaoEntity = _localizacaoEntity;
  }

  doChangeTela(showGrid:any) {
    this.isShowForm = (showGrid == true ? false : true);
  }

  doGetUfs() {
    this._localizacaoServico.doGetUfs()
      .subscribe((response) => {
        this.lstUfs = response.data;
      },
        (errorResponse) => {
          this._utilService.doApresentaMensagens(errorResponse.error.mensagens,'error');
        },
        () => {
          //console.log('this complet');
        }
      );
  }

  doAdicionar(): void {
    this.localizacaoEntity.id = 0;
    this._localizacaoServico.doAdicionar(this.localizacaoEntity)
      .subscribe(
        (response  ) => {
          console.log(response)
          this.localizacaoEntity.id = response.data.id;
          this._utilService.doApresentaMensagens('Adicionou o registro com sucesso.','success');
          console.log(this.localizacaoEntity)
        },
        (errorResponse) => {
          this._utilService.doApresentaMensagens(errorResponse.error.mensagens,'error');
        },
        () => {
          //
        }
      );
  }

  doAtualizar(): void {
    this._localizacaoServico.doAtualizar(this.localizacaoEntity)
      .subscribe(
        () => {
          //console.info('response data.id => ', response.data.id);
          this._utilService.doApresentaMensagens('Atualizou o registro', 'success');
        },
        (errorResponse) => {
          this._utilService.doApresentaMensagens(errorResponse.error.mensagens, 'error');
        },
        () => {
          //
        }
      );
  }

  doApagar(): void {
    this._localizacaoServico.doApagar(this.localizacaoEntity)
      .subscribe(
        () => {
          this._utilService.doApresentaMensagens('Apagou o registro '+this.localizacaoEntity.cep, 'success');
        },
        (errorResponse) => {
          this._utilService.doApresentaMensagens(errorResponse.error.mensagens, 'error');
        },
        () => {
          //
        }
      );
  }

  doApagarItem(ItemLocalizacaoEntity: LocalizacaoEntity): void {
    this.localizacaoEntity = ItemLocalizacaoEntity;
    this.doApagar();
  }

  doPesquisarCep(){
    this._localizacaoServico.doPesquisarCep(this.localizacaoEntity.cep)
      .subscribe(
        (response) => {
          if ((this.lstUfs[this.lstUfs.findIndex( uf => uf.sigla == response.uf)]) != undefined){
            let _objectUfId = this.lstUfs[this.lstUfs.findIndex( uf => uf.sigla == response.uf)].id;
            this.localizacaoEntity.bairro = response.bairro;
            this.localizacaoEntity.cep = response.cep;
            this.localizacaoEntity.complemento = response.complemento;
            this.localizacaoEntity.localidade = response.localidade;
            this.localizacaoEntity.logradouro = response.logradouro;
            this.localizacaoEntity.ufId = _objectUfId;
            this._utilService.doApresentaMensagens('Localizou o Cep na ViaCep com sucesso', 'success');
          }else{
            this._utilService.doApresentaMensagens('Uf ' + response.uf + ' não consta na lista de Ufs', 'error');
          }
        },
        (errorResponse) => {
          this._utilService.doApresentaMensagens('Não localizou o Cep na ViaCep ' + "\n \n" + errorResponse.message, 'error');
        }
      );
  }
}