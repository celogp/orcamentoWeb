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
  ProdutoUrl: CFG_API.Base + CFG_API.Servidor + CFG_API.Porta + '/produtos/',
  ProdutoModeloUrl: CFG_API.Base + CFG_API.Servidor + CFG_API.Porta + '/produtosmodelos/',
  ProdutoModeloComponenteUrl: CFG_API.Base + CFG_API.Servidor + CFG_API.Porta + '/produtosmodeloscomponentes/',
  ProdutoModeloImagemUrl: CFG_API.Base + CFG_API.Servidor + CFG_API.Porta + '/produtosmodelosimagem/',
  PesquisasUrl: CFG_API.Base + CFG_API.Servidor + CFG_API.Porta + '/pesquisas/',
  OrcamentoUrl: CFG_API.Base + CFG_API.Servidor + CFG_API.Porta + '/orcamentos/',
  OrcamentoItemUrl: CFG_API.Base + CFG_API.Servidor + CFG_API.Porta + '/orcamentositens/',
  OrcamentoItemComponenteUrl: CFG_API.Base + CFG_API.Servidor + CFG_API.Porta + '/orcamentositenscomponentes/',
  ViaCepUrl: 'https://viacep.com.br/ws/'
}

export const IMAGEM_VAZIA = {
  Image: '../assets/images/photoEmpty.jfif'
}
