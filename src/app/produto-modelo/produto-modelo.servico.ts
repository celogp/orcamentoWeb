import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs/internal/observable/throwError';
import { CFG_URLAPI } from '../app.config';
import { ProdutoModeloEntity } from '../entidades/ProdutoModelo/ProdutoModeloEntity';
import { ObjetoResposta } from '../response/objectResponse';

@Injectable({
  providedIn: 'root'
})
export class produtoModeloServico {
  private ProdutoModeloUrl: string = CFG_URLAPI.ProdutoModeloUrl;
  private ProdutoModeloImagemUrl : string = CFG_URLAPI.ProdutoModeloImagemUrl;
  private httpOptions = {
    headers:
      new HttpHeaders(
        { 'Content-Type': 'application/json; charset=UTF-8', 'Access-Control-Allow-Origin': '*' }),
    params: new HttpParams()
  };


  constructor(private http: HttpClient) { }

  public doGetProdutosModelo() {
    return this.http.get<ObjetoResposta>(this.ProdutoModeloUrl + 'doObterTodos');
  }

  public doAdicionar(_entity: ProdutoModeloEntity) {
    return this.http.post<ObjetoResposta>(this.ProdutoModeloUrl + 'doAdicionar', _entity, this.httpOptions);
  }

  public doAtualizar(_entity: ProdutoModeloEntity) {
    return this.http.put<ObjetoResposta>(this.ProdutoModeloUrl + 'doAtualizar',  _entity, this.httpOptions);
  }

  public doApagar(_entity: ProdutoModeloEntity) {
    let _params = new HttpParams();
    _params = _params.append('id', _entity.id.toString());
    this.httpOptions.params = _params;
    return this.http.delete<ObjetoResposta>(this.ProdutoModeloUrl + 'doApagar', this.httpOptions);
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

  public doSalvarImagem(id:number, _file: File) {
    console.log('chamando backend com a imagem botão Save', id, _file);
    const formData = new FormData();
    formData.append("id", id.toString());
    formData.append("conteudo", _file);
    console.log('FormData =>', formData);
    return this.http.post<ObjetoResposta>(this.ProdutoModeloImagemUrl + 'doSalvar',  formData);
  }

  public doApagarImagem(id:number) {
    let _params = new HttpParams();
    _params = _params.append('id', id.toString());
    this.httpOptions.params = _params;
    return this.http.delete<ObjetoResposta>(this.ProdutoModeloImagemUrl + 'doApagar', this.httpOptions);
  }

}
