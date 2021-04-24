import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CFG_URLAPI } from "../app.config";
import { FinanceiroBaixaEntity } from "../entidades/FinanceiroBaixaEntity";
import { FinanceiroEntity } from "../entidades/FinanceiroEntity";
import { ObjetoResposta } from "../response/objectResponse";

@Injectable()
export class financeiroServico {
    private FinanceiroUrl: string = CFG_URLAPI.FinanceiroUrl;
    private httpOptions = {
        headers:
            new HttpHeaders(
                { 'Content-Type': 'application/json; charset=UTF-8', 'Access-Control-Allow-Origin': '*' }), 
        params : new HttpParams()
    };

    constructor(private http: HttpClient) { }

    public doGetFinanceiros() {
        return this.http.get<ObjetoResposta>(this.FinanceiroUrl + 'doObterTodos');
    }

    public doAdicionar(_entity: FinanceiroEntity) {
        return this.http.post<ObjetoResposta>(this.FinanceiroUrl + 'doAdicionar', _entity, this.httpOptions);
    }

    public doAtualizar(_entity: FinanceiroEntity) {
        return this.http.put<ObjetoResposta>(this.FinanceiroUrl + 'doAtualizar', _entity, this.httpOptions);
    }

    public doApagar(_entity: FinanceiroEntity) {
        let _params = new HttpParams();
        _params=_params.append('id', _entity.id.toString());
        this.httpOptions.params = _params;
       return this.http.delete<ObjetoResposta>(this.FinanceiroUrl + 'doApagar', this.httpOptions);
    }

    public doBaixar(_entity: FinanceiroEntity) {
        let _financeiroBaixa = new FinanceiroBaixaEntity(_entity.id, _entity.dtBaixa);
       return this.http.put<ObjetoResposta>(this.FinanceiroUrl + 'doEstornarBaixa', _financeiroBaixa, this.httpOptions);
    }

    public doEstornarBaixa(_entity: FinanceiroEntity) {
        let _params = new HttpParams();
        _params=_params.append('id', _entity.id.toString());
        this.httpOptions.params = _params;
       return this.http.delete<ObjetoResposta>(this.FinanceiroUrl + 'doEstornarBaixa', this.httpOptions);
    }

    public doGetFinanceirosMes(ano : number) {
        let _params = new HttpParams();
        _params=_params.append('ano', ano.toString());
        this.httpOptions.params = _params;
        return this.http.get<ObjetoResposta>(this.FinanceiroUrl + 'doObterFinanceirosMes', this.httpOptions);
    }

}