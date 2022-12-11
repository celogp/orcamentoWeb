import { ProdutoEntity } from "../Produto/ProdutoEntity";

export class OrcamentoItemLst{
    id : number=0;
    quantidade : number = 0;
    vlrUnitario : number = 0;
    vlrBruto : number = 0;
    percDesconto : number = 0;
    vlrDesconto : number = 0;
    vlrLiquido : number = 0;
    largura : number = 0;
    comprimento : number = 0;
    espessura : number = 0;
    area : number = 0;
    ambiente : string = '';
    produtoId : number = 0;
    nomeProduto: string = '';
    volume : string = '';
    orcamentoId : number = 0;
}