import { NodeWithI18n } from "@angular/compiler";

export class FinanceiroBaixaEntity{
    id: number=0;
    dtBaixa?:Date;

    constructor(id:number, dtBaixa:any) {
        this.id=id;
        this.dtBaixa = dtBaixa;
    }
}