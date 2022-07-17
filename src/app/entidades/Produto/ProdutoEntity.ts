
export class ProdutoEntity{
    id : number=0;
    nome : string = '';
    volume : string = '';
    ativo : boolean = true;
    estoque : number=0;
    precoDaBase : boolean = false;
    produtoTipoId : number =0;
    precoTabela : number = 0;
    custoGerencial : number = 0
    adicionadoTime!:Date;
    alteradoTime!: Date;
}