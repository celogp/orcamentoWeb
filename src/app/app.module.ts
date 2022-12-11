import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { InputSwitchModule } from 'primeng/inputswitch';
import { SidebarModule } from 'primeng/sidebar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DividerModule } from 'primeng/divider';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { localizacaoServico } from './localizacao/localizacao.servico';
import { LocalizacaoComponent } from './localizacao/localizacao.component';
import { ToolbarModule } from 'primeng/toolbar';
import { DropdownModule } from 'primeng/dropdown';
import { CepPipe } from './pipes/ceppipe';
import { ParceiroComponent } from './parceiro/parceiro.component';
import { parceiroServico } from './parceiro/parceiro.servico';
import { utilService } from './utils/util.servico';
import { PhonePipe } from './pipes/phonepipe';
import { FinanceiroComponent } from './financeiro/financeiro.component';
import { financeiroServico } from './financeiro/financeiro.servico';
import { TabViewModule } from 'primeng/tabview';
import { InputNumberModule } from 'primeng/inputnumber';
import { SimNaoPipe } from './pipes/simnaopipe';
import { ParceiroListaComponent } from './parceiro-lista/parceiro-lista.component';
import { FinanceiroListaComponent } from './financeiro-lista/financeiro-lista.component';
import { LocalizacaoListaComponent } from './localizacao-lista/localizacao-lista.component';

import { ChartModule } from 'primeng/chart';
import { PickListModule } from 'primeng/picklist';
import { ProdutoComponent } from './produto/produto.component';
import { ProdutoListaComponent } from './produto-lista/produto-lista.component';
import { produtoServico } from './produto/produto.servico';
import { ProdutoTipoPipe } from './pipes/produtotipopipe';
import { ProdutoModeloComponent } from './produto-modelo/produto-modelo.component';
import { ProdutoModeloListaComponent } from './produto-modelo-lista/produto-modelo-lista.component';
import { produtoModeloServico } from './produto-modelo/produto-modelo.servico';

import {FileUploadModule} from 'primeng/fileupload';
import {ImageModule} from 'primeng/image';
import {CardModule} from 'primeng/card';
import { ProdutoModeloComponListaComponent } from './produto-modelo-compon-lista/produto-modelo-compon-lista.component';
import { ProdutoModeloComponComponent } from './produto-modelo-compon/produto-modelo-compon.component';
import { produtoModeloComponService } from './produto-modelo-compon/produto-modelo-compon.service';
import { OrcamentoComponent } from './orcamento/orcamento.component';
import { OrcamentoListaComponent } from './orcamento-lista/orcamento-lista.component';
import { OrcamentoComponenteComponent } from './orcamento-componente/orcamento-componente.component';
import { orcamentoService } from './orcamento/orcamento.service';
import { OrcamentoItemComponent } from './orcamento-item/orcamento-item.component';
import { OrcamentoItemListaComponent } from './orcamento-item-lista/orcamento-item-lista.component';
import { OrcamentoComponenteListaComponent } from './orcamento-componente-lista/orcamento-componente-lista.component';
import { orcamentoComponenteService } from './orcamento-componente/orcamento-componente.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LocalizacaoComponent, 
    CepPipe, 
    PhonePipe,
    SimNaoPipe,
    ProdutoTipoPipe,
    ParceiroComponent,
    FinanceiroComponent,
    ParceiroListaComponent,
    FinanceiroListaComponent,
    LocalizacaoListaComponent,
    ProdutoComponent,
    ProdutoListaComponent,
    ProdutoModeloComponent,
    ProdutoModeloListaComponent,
    ProdutoModeloComponListaComponent,
    ProdutoModeloComponComponent,
    OrcamentoComponent,
    OrcamentoListaComponent,
    OrcamentoComponenteComponent,
    OrcamentoItemComponent,
    OrcamentoItemListaComponent,
    OrcamentoComponenteListaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    InputTextModule,
    InputMaskModule,
    InputSwitchModule,
    SidebarModule,
    BrowserAnimationsModule,
    DividerModule,
    ToastModule,
    TableModule,
    HttpClientModule,
    ButtonModule, 
    ToolbarModule, 
    DropdownModule, 
    TabViewModule,
    InputNumberModule, 
    ChartModule, 
    PickListModule, 
    FileUploadModule, 
    ImageModule,
    CardModule
  ],
  providers: [MessageService, utilService, localizacaoServico, parceiroServico, financeiroServico, produtoServico, produtoModeloServico, orcamentoService
    , produtoModeloComponService
    , orcamentoComponenteService],
  bootstrap: [AppComponent]
})

export class AppModule { }
