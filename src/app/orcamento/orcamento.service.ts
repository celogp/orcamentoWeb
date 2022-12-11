import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CFG_URLAPI } from '../app.config';
import { OrcamentoEntity } from '../entidades/Orcamento/OrcamentoEntity';
import { ObjetoResposta } from '../response/objectResponse';

@Injectable({
    providedIn: 'root'
})
export class orcamentoService {

    private OrcamentoUrl: string = CFG_URLAPI.OrcamentoUrl;
    private httpOptions = {
        headers:
            new HttpHeaders(
                { 'Content-Type': 'application/json; charset=UTF-8', 'Access-Control-Allow-Origin': '*' }),
        params: new HttpParams()
    };

    constructor(private http: HttpClient) { }

    public doGetOrcamentos() {
        return this.http.get<ObjetoResposta>(this.OrcamentoUrl + 'doObterTodos');
    }

    public doObterPorId(_entity: OrcamentoEntity) {
        let _params = new HttpParams();
        _params = _params.append('id', _entity.id.toString());
        this.httpOptions.params = _params;

        return this.http.get<ObjetoResposta>(this.OrcamentoUrl + 'doObterPorId', this.httpOptions);
    }

    public doAdicionar(_entity: OrcamentoEntity) {
        return this.http.post<ObjetoResposta>(this.OrcamentoUrl + 'doAdicionar', _entity, this.httpOptions);
    }

    public doAtualizar(_entity: OrcamentoEntity) {
        return this.http.put<ObjetoResposta>(this.OrcamentoUrl + 'doAtualizar', _entity, this.httpOptions);
    }

    public doApagar(_entity: OrcamentoEntity) {
        let _params = new HttpParams();
        _params = _params.append('id', _entity.id.toString());
        this.httpOptions.params = _params;
        return this.http.delete<ObjetoResposta>(this.OrcamentoUrl + 'doApagar', this.httpOptions);
    }

}
