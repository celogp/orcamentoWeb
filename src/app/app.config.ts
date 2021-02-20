export const APP_CONSTANTES = {
    TIMEOUTMSG:  3000
}

export const CFG_API = {
  Base: 'http:',
  Servidor: '//localhost',
  Porta: ':8080'
}

export const CFG_URLAPI = {
  LocalizacaoUrl: CFG_API.Base + CFG_API.Servidor + CFG_API.Porta + '/localizacoes/',
  ParceiroUrl: CFG_API.Base + CFG_API.Servidor + CFG_API.Porta + '/parceiros/',
  FinanceiroUrl: CFG_API.Base + CFG_API.Servidor + CFG_API.Porta + '/financeiros/',
  PesquisasUrl: CFG_API.Base + CFG_API.Servidor + CFG_API.Porta + '/pesquisas/',
  ViaCepUrl: 'https://viacep.com.br/ws/'
}
