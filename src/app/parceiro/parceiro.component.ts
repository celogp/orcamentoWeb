import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { ParceiroEntity } from '../entidades/ParceiroEntity';
import { SexoEntity } from '../entidades/SexoEntity';
import { utilService } from '../utils/util.servico';
import { parceiroServico } from './parceiro.servico';

/*
  Falta fazer a pesquisa do endereço.
*/

@Component({
  selector: 'app-parceiro',
  templateUrl: './parceiro.component.html',
  styleUrls: ['./parceiro.component.css']
})
export class ParceiroComponent implements OnInit {

  parceiroEntity = new ParceiroEntity();
  cep:string="";
  logradouro:string="";
  localidade:string="";
  bairro:string="";

  lstSexo = new Array<SexoEntity>();

  isShowForm: boolean = true;
  isShowGridCep:boolean=false;

  constructor(
    private _parceiroServico: parceiroServico, 
    private _utilService: utilService
  ) { }

  ngOnInit(): void {
    this.parceiroEntity.id = 0;
    this.doGetSexo();
  }

  displayParceiro(_parceiroEntity:any) {
    this.parceiroEntity = _parceiroEntity;
    this.cep = _parceiroEntity.localizacao.cep;
    this.logradouro = _parceiroEntity.localizacao.logradouro;
    this.localidade = _parceiroEntity.localizacao.localidade;
    this.bairro = _parceiroEntity.localizacao.bairro;
  }

  doChangeTela(showGrid:any) {
    this.isShowForm = (showGrid == true ? false : true);
  }

  doChangeTelaLocalizacao() {
    this.isShowGridCep = (this.isShowGridCep == true ? false : true);
    this.doChangeTela(this.isShowForm);
    console.log('passou na troca do cep');
  }


  doGetSexo() {
    this._parceiroServico.doGetSexo()
      .subscribe((response) => {
        this.lstSexo = response.data;
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
    this.parceiroEntity.id = 0;
    this._parceiroServico.doAdicionar(this.parceiroEntity)
      .subscribe(
        (response) => {
          this.parceiroEntity.id = response.data.id;
          this._utilService.doApresentaMensagens('Adicionou o registro', 'success');
        },
        (errorResponse) => {
          //console.info('this is complet', error.id);
          this._utilService.doApresentaMensagens(errorResponse.error.mensagens, 'error');
        },
        () => {
          //this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Adicionou o registro', life: APP_CONSTANTES.TIMEOUTMSG });
        }
      );
  }

  doAtualizar(): void {
    this._parceiroServico.doAtualizar(this.parceiroEntity)
      .subscribe(
        (response) => {
          //this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Atualizou o registro', life: APP_CONSTANTES.TIMEOUTMSG });
          this._utilService.doApresentaMensagens('Atualizou o registro', 'success');
        },
        (errorResponse) => {
          this._utilService.doApresentaMensagens(errorResponse.error.mensagens, 'error');
        }
      );
  }

  doApagar(): void {
    this._parceiroServico.doApagar(this.parceiroEntity)
      .subscribe(
        (response) => {
          this._utilService.doApresentaMensagens('Apagou o registro '+this.parceiroEntity.nome, 'success');
        },
        (errorResponse) => {
          this._utilService.doApresentaMensagens(errorResponse.error.mensagens, 'error');
        },
        () => {
          //this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: this.parceiroEntity.nome, life: APP_CONSTANTES.TIMEOUTMSG });
        }
      );
  }

  doApagarItem(ItemParceiroEntity: ParceiroEntity): void {
    this.parceiroEntity = ItemParceiroEntity;
    this.doApagar();
  }

}
