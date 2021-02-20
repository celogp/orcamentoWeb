import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { CFG_URLAPI } from "../app.config";
import { LocalizacaoEntity } from "../entidades/LocalizacaoEntity";
import { ViaCepEntity } from "../entidades/ViaCepEntity";
import { ObjetoResposta } from "../response/objectResponse";

@Injectable()
export class localizacaoServico {
    private LocalizacaoUrl: string = CFG_URLAPI.LocalizacaoUrl;
    private PesquisasUrl: string = CFG_URLAPI.PesquisasUrl;
    private ViaCepUrl : string = CFG_URLAPI.ViaCepUrl;
    private httpOptions = {
        headers:
            new HttpHeaders(
                { 'Content-Type': 'application/json; charset=UTF-8', 'Access-Control-Allow-Origin':'*'}), 
        params : new HttpParams()
    };

    
    constructor(private http: HttpClient) { }

    public doGetUfs() {
        console.info('httpoptions => ', this.httpOptions);
        return this.http.get<ObjetoResposta>(this.PesquisasUrl + 'doObterUfs');
    }

    public doGetLocalizacoes() {
        console.info('httpoptions => ', this.httpOptions);
        return this.http.get<ObjetoResposta>(this.LocalizacaoUrl + 'doObterTodos');
    }

    public doAdicionar(_entity: LocalizacaoEntity) {
        return this.http.post<ObjetoResposta>(this.LocalizacaoUrl + 'doAdicionar', _entity, this.httpOptions);
    }

    /*     public doAdicionar(_entity : LocalizacaoEntity): Observable<ObjetoResposta>{
            return this.http.post<ObjetoResposta>(this.LocalizacaoUrl + 'doAdicionar2', _entity, this.httpOptions)
            .pipe(
                retry(1),
                catchError(this.processError)
              );
        }
     */

    public doAtualizar(_entity: LocalizacaoEntity) {
        return this.http.put<ObjetoResposta>(this.LocalizacaoUrl + 'doAtualizar', _entity, this.httpOptions);
    }

    public doApagar(_entity: LocalizacaoEntity) {
        let _params = new HttpParams();
        _params=_params.append('id', _entity.id.toString());
        this.httpOptions.params = _params;
       return this.http.delete<ObjetoResposta>(this.LocalizacaoUrl + 'doApagar', this.httpOptions);
    }

    public doPesquisarCep(_cep : string){
        let url = this.ViaCepUrl+_cep+'/json/';
        return this.http.get<ViaCepEntity>(url);
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