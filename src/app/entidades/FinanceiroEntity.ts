import { NodeWithI18n } from "@angular/compiler";

export class FinanceiroEntity{
    id: number=0;
    recDesp: number=0;
    parceiroId: number=0; 
    dtMovimento?:Date;
    dtVencimento?:Date;
    dtBaixa?:Date;
    historico:string="";
    vlrFinanceiro:number=0;
    baixado:boolean=false;
}