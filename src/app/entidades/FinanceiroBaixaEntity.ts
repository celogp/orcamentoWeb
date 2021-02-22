export class FinanceiroBaixaEntity{
    id: number=0;
    dtBaixa:String;

    constructor(id:number, dtBaixa:String) {
        this.id=id;
        this.dtBaixa = dtBaixa;
    }
}