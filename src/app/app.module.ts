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
import {ToolbarModule} from 'primeng/toolbar';
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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LocalizacaoComponent, 
    CepPipe, 
    PhonePipe,
    SimNaoPipe,
    ParceiroComponent,
    FinanceiroComponent,
    ParceiroListaComponent,
    FinanceiroListaComponent,
    LocalizacaoListaComponent
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
    InputNumberModule
  ],
  providers: [MessageService, utilService, localizacaoServico, parceiroServico, financeiroServico],
  bootstrap: [AppComponent]
})

export class AppModule { }
