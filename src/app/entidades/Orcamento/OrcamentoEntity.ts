
export class OrcamentoEntity{
    id : number=0;
    descricao : string = '';
    numero:number=0;
    bloqueado : boolean = false;
    parceiroId: number=0; 
    dtMovimento:string="";
    dtEntrega:string="";

    vlrTotalItens : number = 0;
    vlrDesconto : number = 0;
    percDesconto : number = 0;
    vlrTotal : number = 0;
    

}