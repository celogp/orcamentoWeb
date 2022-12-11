import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CFG_URLAPI } from '../app.config';
import { OrcamentoItemComponenteEntity } from '../entidades/Orcamento/OrcamentoItemComponenteEntity';
import { ObjetoResposta } from '../response/objectResponse';

@Injectable({
  providedIn: 'root'
})
export class orcamentoComponenteService {
  
  private OrcamentoItemUrl: string = CFG_URLAPI.OrcamentoItemUrl;
  private OrcamentoItemComponenteUrl: string = CFG_URLAPI.OrcamentoItemComponenteUrl;
  private httpOptions = {
    headers:
      new HttpHeaders(
        { 'Content-Type': 'application/json; charset=UTF-8', 'Access-Control-Allow-Origin': '*' }),
    params: new HttpParams()
  };

  constructor(private http: HttpClient) { }

  public doObterOrcamentoItemId(_orcamentoItemId: number) {
    let _params = new HttpParams();
    _params = _params.append('id', _orcamentoItemId.toString());
    this.httpOptions.params = _params;

    return this.http.get<ObjetoResposta>(this.OrcamentoItemUrl + 'doObterPorId', this.httpOptions);
  }


  public doObterPorOrcamentoItemId(_orcamentoItemId: number) {
    let _params = new HttpParams();
    _params = _params.append('orcamentoItemId', _orcamentoItemId.toString());
    this.httpOptions.params = _params;
    return this.http.get<ObjetoResposta>(this.OrcamentoItemComponenteUrl + 'doObterPorOrcamentoItemId', this.httpOptions);
  }

  public doObterPorId(_orcamentoItemComponenteId: number) {
    let _params = new HttpParams();
    _params = _params.append('id', _orcamentoItemComponenteId.toString());
    this.httpOptions.params = _params;
    return this.http.get<ObjetoResposta>(this.OrcamentoItemComponenteUrl + 'doObterPorId', this.httpOptions);
  }

  public doAdicionar(_entity: OrcamentoItemComponenteEntity) {
    return this.http.post<ObjetoResposta>(this.OrcamentoItemComponenteUrl + 'doAdicionar', _entity, this.httpOptions);
  }

  public doAtualizar(_entity: OrcamentoItemComponenteEntity) {
    return this.http.put<ObjetoResposta>(this.OrcamentoItemComponenteUrl + 'doAtualizar', _entity, this.httpOptions);
  }

  public doApagar(_entity: OrcamentoItemComponenteEntity) {
    let _params = new HttpParams();
    _params = _params.append('id', _entity.id.toString());
    this.httpOptions.params = _params;
    return this.http.delete<ObjetoResposta>(this.OrcamentoItemComponenteUrl + 'doApagar', this.httpOptions);
  }

}
