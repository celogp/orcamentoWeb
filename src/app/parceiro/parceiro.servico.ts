import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { CFG_URLAPI } from "../app.config";
import { ParceiroEntity } from "../entidades/ParceiroEntity";
import { ObjetoResposta } from "../response/objectResponse";

@Injectable()
export class parceiroServico {
    private ParceiroUrl: string = CFG_URLAPI.ParceiroUrl;
    private PesquisasUrl: string = CFG_URLAPI.PesquisasUrl;
    private httpOptions = {
        headers:
            new HttpHeaders(
                { 'Content-Type': 'application/json; charset=UTF-8', 'Access-Control-Allow-Origin': '*' }), 
        params : new HttpParams()
    };

    constructor(private http: HttpClient) { }

    public doGetSexo() {
        return this.http.get<ObjetoResposta>(this.PesquisasUrl + 'doObterSexos');
    }
    
    public doGetParceiros() {
        return this.http.get<ObjetoResposta>(this.ParceiroUrl + 'doObterTodos');
    }

    public doAdicionar(_entity: ParceiroEntity) {
        return this.http.post<ObjetoResposta>(this.ParceiroUrl + 'doAdicionar', _entity, this.httpOptions);
    }

    public doAtualizar(_entity: ParceiroEntity) {
        return this.http.put<ObjetoResposta>(this.ParceiroUrl + 'doAtualizar', _entity, this.httpOptions);
    }

    public doApagar(_entity: ParceiroEntity) {
        let _params = new HttpParams();
        _params=_params.append('id', _entity.id.toString());
        this.httpOptions.params = _params;
       return this.http.delete<ObjetoResposta>(this.ParceiroUrl + 'doApagar', this.httpOptions);
    }

    processError(err: any) {
        let message = '';
        if (err.error instanceof ErrorEvent) {
            message = err.error.message;
        } else {
            message = `Error Code: ${err.status}\nMessage: ${err.message}`;
        }
        console.log(message);
        return throwError(message);
    }
}