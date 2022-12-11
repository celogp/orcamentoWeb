import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Table } from 'primeng/table';
import { AppComponent } from '../app.component';
import { OrcamentoItemComponenteLst } from '../entidades/Orcamento/OrcamentoItemComponenteLst';
import { orcamentoComponenteService } from '../orcamento-componente/orcamento-componente.service';

@Component({
  selector: 'app-orcamento-componente-lista',
  templateUrl: './orcamento-componente-lista.component.html',
  styleUrls: ['./orcamento-componente-lista.component.css']
})
export class OrcamentoComponenteListaComponent implements OnInit {

  lstOrcamentoItemComponentes = new Array<OrcamentoItemComponenteLst>();
  strFilter:string='';
  orcamentoId : string = '';
  orcamentoItemId : string = '';

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router  ,
    private _orcamentoItemComponenteService : orcamentoComponenteService, 
    private _appComponent : AppComponent,
  ) { }

  ngOnInit(): void {
    this._appComponent.titleForm = "Orcamento componentes do Item lista"
    if (history.state){
      this.orcamentoId = history.state.orcamentoId;
      this.orcamentoItemId = history.state.orcamentoItemId;
      console.log('orcamentoItem componentes lista state-> ', history.state);
      //chamar a api para trazer o objeto obterPorId
      if (this.orcamentoItemId != ''){
        this.doAtualizarPesquisa();
      }
    }
  }

  doClear(table: Table) {
    table.clear();
  }

  applyFilterGlobal() : string{
    return this.strFilter;
  }

  //testes de mudanca da pagina 
  doTelaOrcamento(){
    this._router.navigate(['/Orcamento'], 
    { state: { "orcamentoId": this.orcamentoId }, 
    relativeTo: this._activatedRoute } );
  }

  doTelaOrcamentoItemComponenteAdd(){
    this._router.navigate(['/OrcamentoComponente'], 
    { state : {"Id": 0, "orcamentoId" : this.orcamentoId, "orcamentoItemId" : this.orcamentoItemId},
    relativeTo: this._activatedRoute } );
  }  

  doTelaOrcamentoItemComponenteEdit(orcamentoItemComponenteId:number) {
    this._router.navigate(['/OrcamentoComponente'], 
    { state : {"Id": orcamentoItemComponenteId, "orcamentoId" : this.orcamentoId, "orcamentoItemId" : this.orcamentoItemId},
      relativeTo: this._activatedRoute } );
  } 

  doAtualizarPesquisa() {
    let _orcamentoItemId = Number(this.orcamentoItemId);
    this._orcamentoItemComponenteService.doObterPorOrcamentoItemId(_orcamentoItemId)
      .subscribe((response) => {
        this.lstOrcamentoItemComponentes = response.data;
      },
        (error) => {
          //console.log(error);
        },
        () => {
          //console.log('this complet');
        }
      );
  }  

}
