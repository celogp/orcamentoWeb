import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { FinanceiroEntity } from '../entidades/FinanceiroEntity';
import { utilService } from '../utils/util.servico';
import { financeiroServico } from './financeiro.servico';
import { format } from 'date-fns';
import { FinanceiroLst } from '../entidades/FinanceiroLst';

@Component({
  selector: 'app-financeiro',
  templateUrl: './financeiro.component.html',
  styleUrls: ['./financeiro.component.css']
})
export class FinanceiroComponent implements OnInit {
  financeiroEntity = new FinanceiroEntity();

  isShowForm: boolean = true;
  isShowGridFinanceiro: boolean = false;
  isShowGridParceiro: boolean = false;
  nomeParceiro : string=""
  strFilter:string='';

  constructor(private _utilService: utilService, 
    private _financeiroServico : financeiroServico) { 
    }

  ngOnInit(): void {
    this.financeiroEntity.id = 0;
    this.financeiroEntity.pendente = true;
  }

  doChangeTela(showGrid:any) {
    this.isShowForm = (showGrid == true ? false : true);
  }

  doChangeTelaFinanceiro() {
    this.isShowGridFinanceiro = (this.isShowGridFinanceiro == true ? false : true);
    this.doChangeTela(this.isShowForm);
  }

  doChangeTelaParceiro() {
    this.isShowGridParceiro = (this.isShowGridParceiro == true ? false : true);
    this.doChangeTela(this.isShowForm);
  }

  handleChange(e:any): void {
    let dateHoje = new Date();
    if (e.checked){
      this.financeiroEntity.dtBaixa = "";
    }else{
      this.financeiroEntity.dtBaixa = format(dateHoje, 'yyyy-MM-dd');
    }
  }

  doAdicionar(): void {
    this.financeiroEntity.id = 0;
    this._financeiroServico.doAdicionar(this.financeiroEntity)
      .subscribe(
        (response) => {
          this.financeiroEntity.id = response.data.id;
          this._utilService.doApresentaMensagens('Adicionou o registro', 'success');
        },
        (errorResponse) => {
          this._utilService.doApresentaMensagens(errorResponse.error.mensagens, 'error');
        },
        () => {
          //
        }
      );
  }

  doAtualizar(): void {
    this._financeiroServico.doAtualizar(this.financeiroEntity)
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
    this._financeiroServico.doApagar(this.financeiroEntity)
      .subscribe(
        (response) => {
          this._utilService.doApresentaMensagens('Apagou o registro '+this.financeiroEntity.parceiroId, 'success');
        },
        (errorResponse) => {
          this._utilService.doApresentaMensagens(errorResponse.error.mensagens, 'error');
        },
        () => {
          //
        }
      );
  }

  displayFinanceiro(_financeiroEntity:any) {
    this.financeiroEntity = _financeiroEntity;
    this.nomeParceiro = _financeiroEntity.parceiro.nome;
  }

  displayParceiro(_parceiroEntity:any) {
    this.financeiroEntity.parceiroId = _parceiroEntity.id;
    this.nomeParceiro = _parceiroEntity.nome;
  }

}
