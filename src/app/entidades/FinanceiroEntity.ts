export class FinanceiroEntity{
    id: number=0;
    nroDocumento:number=0;
    receita: boolean=true;
    parceiroId: number=0; 
    dtMovimento:string="";
    dtVencimento:string="";
    dtBaixa: string="";
    historico:string="";
    vlrFinanceiro:number=0;
    pendente:boolean=false;
}