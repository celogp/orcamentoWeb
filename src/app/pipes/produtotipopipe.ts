import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'produtoTipoPipe' })
export class ProdutoTipoPipe implements PipeTransform {
    transform(input: number): string {
        let _result = "Sem Classificação";
        switch (input) {
            case 1: 
                _result = "Acabado";
                break;
            case 2:
                _result = "Base";
                break;
            case 3:
                _result = "Acabamento";
                break;
            case 4:
                _result = "Acessório";
                break;
            case 5:
                _result = "Servico";
                break;
            default:
                _result = "Todo";
        }
        return _result;
    }
}