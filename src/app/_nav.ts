export const navigation = [
  {
    title: true,
    name: 'OPERAÇÃO',
    grupo:'OPERACAO'
  },
  {
    name: 'Leilões',
    url: '/leilao',
    icon: 'fa fa-gavel',
    source: 'LEILOES',
    grupo:'OPERACAO'
  },
  {
    name: 'Habilitação',
    url: '/habilitacao',
    icon: 'fa fa-check',
    source: 'HABILITACAO',
    grupo:'OPERACAO'
  },
  {
    name: 'Vistoria',
    url: '/vistoria',
    icon: 'fa fa-search',
    source: 'VISTORIA',
    grupo:'OPERACAO'
  },
  {
    name: 'Faturas',
    url: '/fatura',
    icon: 'fa fa-file-invoice-dollar',
    source: 'FATURA',
    grupo:'OPERACAO'
  },
  {
    name: 'Documentos',
    url: '/gerenciador-documentos',
    icon: 'fa fa-file-alt',
    source: 'GERENCIADOR_DOC',
    grupo:'OPERACAO'
  },
  {
    title: true,
    name: 'RELATORIOS',
    grupo:'RELATORIOS'
  },
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'fa fa-chart-line',
    source: 'DASHBOARD',
    grupo:'RELATORIOS'
  },
  {
    name: 'Mapa de Lances',
    url: '/mapa-lance',
    icon: 'fa fa-map',
    source: 'MAPA_LANCES',
    grupo:'RELATORIOS'
  },
  {
    name: 'Histórico de Lances',
    url: '/historicolances',
    icon: 'fa fa-history',
    source: 'HISTORICO_LANCES',
    grupo:'RELATORIOS'
  },
   {
     name: 'Lotes Consolidados',
     url: '/lancesconsolidado',
     icon: 'fa fa-file-alt',
     source: 'LANCES_CONSOLIDADOS',
     grupo:'RELATORIOS'
   },

  {
    name: 'Arrematantes',
    url: '/arrematantes',
    icon: 'fa fa-dollar-sign',
    source: 'ARREMATANTES',
    grupo:'RELATORIOS'
  },
  {
    title: true,
    name: 'MARKETING',
    grupo:'MARKETING'
  },
  {
    name: 'Lista de Contatos',
    url: '/listacontatos',
    icon: 'fa fa-users',
    source: 'LISTA_CONTATOS',
    grupo:'MARKETING'
  },
  {
    name: 'Contatos',
    url: '/contatos',
    icon: 'fa fa-user',
    source: 'CONTATOS',
    grupo:'MARKETING'
  },
  {
    name: 'Notificações',
    url: '/notificacoes',
    icon: 'fa fa-envelope',
    source: 'NOTIFICACOES',
    grupo:'MARKETING'
  },
  {
    name: 'Meio Notificação',
    url: '/tipomeionotificao',
    icon: 'fa fa-envelope-open',
    source: 'MEIO_NOTIFICACAO',
    grupo:'MARKETING'
  },
  {
    name: 'Tipo Notificação',
    url: '/tiponotificacao',
    icon: 'fa fa-mail-bulk',
    source: 'TIPO_NOTIFICACAO',
    grupo:'MARKETING'
  },
  {
    name: 'Agenda',
    url: '/agenda',
    icon: 'fa fa-book',
    source: 'AGENDA',
    grupo:'MARKETING'
  },

  {
    name: 'Template',
    url: '/template',
    icon: 'fa fa-code',
    source: 'AGENDA',
    grupo:'MARKETING'
  },
  {
    title: true,
    name: 'AGENDAMENTO',
    grupo:'AGENDAMENTO'
  },
  {
    name: 'Agendamento',
    url: '/agendamento',
    icon: 'fa fa-calendar-alt',
    source: 'AGENDAMENTO',
    grupo:'MARKETING'
  },
  {
    name: 'Configuração',
    url: '/configuracao',
    icon: 'fa fa-cog',
    source: 'CONFIG_AGENDAMENTO',
    grupo:'MARKETING'
  },

  {
    title: true,
    name: 'GERENCIADOR SITE',
    grupo:'GERENCIADOR SITE'
  },
  {
    name: 'Banner',
    url: '/banner',
    icon: 'fa fa-images',
    source: 'GERENCIADOR_SITE',
    grupo:'GERENCIADOR SITE'
  },
  {
    name: 'Página Estática',
    url: '/paginaEstatica',
    icon: 'fa fa-window-maximize',
    source: 'GERENCIADOR_SITE',
    grupo:'GERENCIADOR SITE'
  },
  {
    title: true,
    name: 'CADASTROS',
    grupo:'CADASTROS'
  },
  {
    name: 'Permissão',
    url: '/permissao',
    icon: 'fa fa-user-cog',
    source: 'PERMISSAO',
    grupo:'CADASTROS'
  },
  {
    name: 'Usuarios',
    url: '/usuarios',
    icon: 'fa fa-user',
    source: 'USUARIO',
    grupo:'CADASTROS'
  },
  {
    name: 'Empresas',
    url: '/empresa',
    icon: 'fa fa-building',
    source: 'EMPRESAS',
    grupo:'CADASTROS'
  },
  {
    name: 'Comitentes',
    url: '/comitente',
    icon: 'fa fa-university',
    source: 'COMITENTES',
    grupo:'CADASTROS'
  },
  {
    name: 'Leiloeiros',
    url: '/leiloeiro',
    icon: 'fa fa-gavel',
    source: 'LEILOEIROS',
    grupo:'CADASTROS'
  },
  {
    name: 'Locais',
    url: '/local',
    icon: 'fa fa-map-marker',
    source: 'LOCAIS',
    grupo:'CADASTROS'
  },
  {
    name: 'Categorias',
    url: '/categorias',
    icon: 'fa fa-tags',
    source: 'CATEGORIAS',
    grupo:'CADASTROS'
  },
  // {
  //   name: 'Status Lote',
  //   url: '/statusLote',
  //   icon: 'fa fa-signal',
  //   source: 'STATUS_LOTE',
  //   grupo:'CADASTROS'
  // },
  // {
  //   name: 'Status Leilão',
  //   url: '/statusLeilao',
  //   icon: 'fa fa-signal',
  //   source: 'STATUS_LEILAO',
  //   grupo:'CADASTROS'
  // },
  {
    name: 'Tipo de Documento',
    url: '/tipodocumento',
    icon: 'fa fa-file',
    source: 'GERENCIADOR_DOC',
    grupo:'CADASTROS'
  },
  {
    name: 'Template Documento',
    url: '/documentotemplate',
    icon: 'fa fa-code',
    source: 'GERENCIADOR_DOC',
    grupo:'CADASTROS'
  },
  {
    name: 'Ger. Documentos',
    url: '/gerenciadordocumento',
    icon: 'fa fa-file-alt',
    source: 'GERENCIADOR_DOC',
    grupo:'CADASTROS'
  },
];
