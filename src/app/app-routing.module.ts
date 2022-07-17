import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FinanceiroComponent } from './financeiro/financeiro.component';
import { HomeComponent } from './home/home.component';
import { LocalizacaoComponent } from './localizacao/localizacao.component';
import { ParceiroComponent } from './parceiro/parceiro.component';
import { ProdutoModeloComponent } from './produto-modelo/produto-modelo.component';
import { ProdutoComponent } from './produto/produto.component';

const routes: Routes = [
  { path: 'Home', component: HomeComponent },
  { path: 'Localizacao', component: LocalizacaoComponent }, 
  { path: 'Parceiro', component: ParceiroComponent },
  { path: 'Financeiro', component: FinanceiroComponent }, 
  { path: 'Produto', component: ProdutoComponent },
  { path: 'ProdutoModelo', component: ProdutoModeloComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
