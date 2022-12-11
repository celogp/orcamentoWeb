import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CFG_URLAPI } from '../app.config';
import { OrcamentoItemEntity } from '../entidades/Orcamento/OrcamentoItemEntity';
import { ObjetoResposta } from '../response/objectResponse';

@Injectable({
  providedIn: 'root'
})
export class orcamentoItemService {

  private OrcamentoItemUrl: string = CFG_URLAPI.OrcamentoItemUrl;
  private httpOptions = {
    headers:
      new HttpHeaders(
        { 'Content-Type': 'application/json; charset=UTF-8', 'Access-Control-Allow-Origin': '*' }),
    params: new HttpParams()
  };

  constructor(private http: HttpClient) { }

  public doObterPorOrcamentoId(_orcamentoId: number) {
    let _params = new HttpParams();
    _params = _params.append('orcamentoId', _orcamentoId.toString());
    this.httpOptions.params = _params;

    return this.http.get<ObjetoResposta>(this.OrcamentoItemUrl + 'doObterPorOrcamentoId', this.httpOptions);
  }

  public doObterPorId(orcamentoItemId: number) {
    let _params = new HttpParams();
    _params = _params.append('id', orcamentoItemId.toString());
    this.httpOptions.params = _params;

    return this.http.get<ObjetoResposta>(this.OrcamentoItemUrl + 'doObterPorId', this.httpOptions);
  }

  public doAdicionar(_entity: OrcamentoItemEntity) {
    return this.http.post<ObjetoResposta>(this.OrcamentoItemUrl + 'doAdicionar', _entity, this.httpOptions);
  }

  public doAtualizar(_entity: OrcamentoItemEntity) {
    return this.http.put<ObjetoResposta>(this.OrcamentoItemUrl + 'doAtualizar', _entity, this.httpOptions);
  }

  public doApagar(_entity: OrcamentoItemEntity) {
    let _params = new HttpParams();
    _params = _params.append('id', _entity.id.toString());
    this.httpOptions.params = _params;
    return this.http.delete<ObjetoResposta>(this.OrcamentoItemUrl + 'doApagar', this.httpOptions);
  }


}
