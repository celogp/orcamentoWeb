import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs/internal/observable/throwError';
import { CFG_URLAPI } from '../app.config';
import { ProdutoEntity } from '../entidades/Produto/ProdutoEntity';
import { ObjetoResposta } from '../response/objectResponse';

@Injectable({
  providedIn: 'root'
})
export class produtoServico {
  private ProdutoUrl: string = CFG_URLAPI.ProdutoUrl;
  private PesquisasUrl: string = CFG_URLAPI.PesquisasUrl;
  private httpOptions = {
    headers:
      new HttpHeaders(
        { 'Content-Type': 'application/json; charset=UTF-8', 'Access-Control-Allow-Origin': '*' }),
    params: new HttpParams()
  };

  constructor(private http: HttpClient) { }

  public doGetProdutoTipo() {
    return this.http.get<ObjetoResposta>(this.PesquisasUrl + 'doObterProdutoTipo');
  }

  public doGetProdutos() {
    return this.http.get<ObjetoResposta>(this.ProdutoUrl + 'doObterTodos');
  }

  public doAdicionar(_entity: ProdutoEntity) {
    return this.http.post<ObjetoResposta>(this.ProdutoUrl + 'doAdicionar', _entity, this.httpOptions);
  }

  public doAtualizar(_entity: ProdutoEntity) {
    return this.http.put<ObjetoResposta>(this.ProdutoUrl + 'doAtualizar', _entity, this.httpOptions);
  }

  public doApagar(_entity: ProdutoEntity) {
    let _params = new HttpParams();
    _params = _params.append('id', _entity.id.toString());
    this.httpOptions.params = _params;
    return this.http.delete<ObjetoResposta>(this.ProdutoUrl + 'doApagar', this.httpOptions);
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
