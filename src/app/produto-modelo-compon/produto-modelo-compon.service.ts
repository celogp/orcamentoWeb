import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { CFG_URLAPI } from '../app.config';
import { ProdutoModeloComponEntity } from '../entidades/ProdutoModeloCompon/ProdutoModeloComponEntity';
import { ObjetoResposta } from '../response/objectResponse';

@Injectable({
  providedIn: 'root'
})
export class produtoModeloComponService {
  
  private ProdutoModeloComponenteUrl: string = CFG_URLAPI.ProdutoModeloComponenteUrl;
  private httpOptions = {
      headers:
          new HttpHeaders(
              { 'Content-Type': 'application/json; charset=UTF-8', 'Access-Control-Allow-Origin':'*'}), 
      params : new HttpParams()
  };

  
  constructor(private http: HttpClient) { }


  doGetProdutosModeloCompon(produtoModeloId : any){
    let _params = new HttpParams();
    _params=_params.append('id', produtoModeloId.toString());
    this.httpOptions.params = _params;

    return this.http.get<ObjetoResposta>(this.ProdutoModeloComponenteUrl + 'doObterTodosPorModeloId', this.httpOptions);
  }

  public doAdicionar(_entity: ProdutoModeloComponEntity) {
    return this.http.post<ObjetoResposta>(this.ProdutoModeloComponenteUrl + 'doAdicionar', _entity, this.httpOptions);
  }

  public doAtualizar(_entity: ProdutoModeloComponEntity) {
    return this.http.put<ObjetoResposta>(this.ProdutoModeloComponenteUrl + 'doAtualizar',  _entity, this.httpOptions);
  }

  public doApagar(_entity: ProdutoModeloComponEntity) {
    let _params = new HttpParams();
    _params = _params.append('id', _entity.id.toString());
    this.httpOptions.params = _params;
    return this.http.delete<ObjetoResposta>(this.ProdutoModeloComponenteUrl + 'doApagar', this.httpOptions);
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
