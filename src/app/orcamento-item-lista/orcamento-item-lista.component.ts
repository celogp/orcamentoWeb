import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Table } from 'primeng/table';
import { OrcamentoItemLst } from '../entidades/Orcamento/OrcamentoItemLst ';
import { orcamentoItemService } from '../orcamento-item/orcamento-item.service';

@Component({
  selector: 'app-orcamento-item-lista',
  templateUrl: './orcamento-item-lista.component.html',
  styleUrls: ['./orcamento-item-lista.component.css']
})
export class OrcamentoItemListaComponent implements OnInit {

  lstOrcamentoItens = new Array<OrcamentoItemLst>();

  strFilter:string='';

  @Input()
  orcamentoId : string = '';

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router  ,
    private _orcamentoItemService : orcamentoItemService
  ) { }

  ngOnInit(): void {
    console.log('passou no init do orcamento itens');
    if (this.orcamentoId != ''){
      this.doAtualizarPesquisa();
    }
  }

  doClear(table: Table) {
    table.clear();
  }

  applyFilterGlobal() : string{
    return this.strFilter;
  }

  //testes de mudanca da pagina 
  doTelaOrcamentoItemAdd(){
    this._router.navigate(['/OrcamentoItem'], 
    { state : {"orcamentoId" : this.orcamentoId,  "orcamentoItemId": 0}, 
    relativeTo: this._activatedRoute } );
  }  
  
  doSelecionarItem(orcamentoItemId:number) {
    this._router.navigate(['/OrcamentoItem'], 
    { state : {"orcamentoId" : this.orcamentoId,  "orcamentoItemId": orcamentoItemId},
      relativeTo: this._activatedRoute } );

  } 
  
  doListarComponente(orcamentoItemId:number) {
    this._router.navigate(['/OrcamentoComponenteLista'], 
    { state : {"orcamentoId" : this.orcamentoId,  "orcamentoItemId": orcamentoItemId},
    relativeTo: this._activatedRoute } );

  } 

  doAtualizarPesquisa() {
    let _orcamentoId = Number(this.orcamentoId);
    this._orcamentoItemService.doObterPorOrcamentoId(_orcamentoId)
      .subscribe((response) => {
        this.lstOrcamentoItens = response.data;
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
