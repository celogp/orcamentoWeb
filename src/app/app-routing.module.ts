import { Injectable, NgModule } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Routes, RouterModule, TitleStrategy, RouterStateSnapshot } from '@angular/router';
import { FinanceiroComponent } from './financeiro/financeiro.component';
import { HomeComponent } from './home/home.component';
import { LocalizacaoComponent } from './localizacao/localizacao.component';
import { OrcamentoComponenteListaComponent } from './orcamento-componente-lista/orcamento-componente-lista.component';
import { OrcamentoComponenteComponent } from './orcamento-componente/orcamento-componente.component';
import { OrcamentoItemComponent } from './orcamento-item/orcamento-item.component';
import { OrcamentoComponent } from './orcamento/orcamento.component';
import { ParceiroComponent } from './parceiro/parceiro.component';
import { ProdutoModeloComponent } from './produto-modelo/produto-modelo.component';
import { ProdutoComponent } from './produto/produto.component';

const routes: Routes = [
  { path: 'Home', component: HomeComponent },
  { path: 'Localizacao', component: LocalizacaoComponent }, 
  { path: 'Parceiro', component: ParceiroComponent },
  { path: 'Financeiro', component: FinanceiroComponent }, 
  { path: 'Produto', component: ProdutoComponent },
  { path: 'ProdutoModelo', component: ProdutoModeloComponent },
  { path: 'Orcamento', component: OrcamentoComponent},
  { path: 'OrcamentoItem', component: OrcamentoItemComponent},
  { path: 'OrcamentoComponente', component: OrcamentoComponenteComponent},
  { path: 'OrcamentoComponenteLista', component: OrcamentoComponenteListaComponent},

  // otherwise redirect to home
  { path: '**', redirectTo: '' }  
  
];

@Injectable({providedIn: 'root'})
export class TemplatePageTitleStrategy extends TitleStrategy {
  constructor(private readonly title: Title) {
    super();
  }

  override updateTitle(routerState: RouterStateSnapshot) {
    const title = this.buildTitle(routerState);
    if (title !== undefined) {
      this.title.setTitle(`Sw1Tech | ${title}`);
    }
  }
}


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    {provide: TitleStrategy, useClass: TemplatePageTitleStrategy},
  ]  
})
export class AppRoutingModule { }
