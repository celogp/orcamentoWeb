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
    return this.http.put<ObjetoResposta>(this.ProdutoModeloUrl + 'doAtualizar', _entity, this.httpOptions);
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

  public doEncodeBase64(strImage : string):string{
    let encodedData = btoa(strImage);
    console.log('image 64', encodedData);
    return encodedData;
  }

  public doDecodeBase64(strImage : string):string{
    let decodeData = atob(strImage)
    console.log('desconvertido ', decodeData);
    return decodeData;
  }


  public previewFile(event:any) {
    let input = event.target;
    console.log('input ', input);

    let preview = document.querySelector('img');
    let file = document.querySelector('input[type=file]');
    let reader = new FileReader();
    let arquivo = input.files[0];
    console.log('image lida', reader, arquivo);

    reader.addEventListener("load", function () {
      // convert image file to base64 string
      //preview.src = reader.result;
      console.log('converter base 64', reader.result);
    }, false);
  
    if (arquivo) {
      console.log('converter base 64', reader.readAsDataURL(arquivo));
      reader.readAsDataURL(arquivo);
    }
  }
  
}
