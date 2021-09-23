export const navigation = [
  {
    title: true,
    name: 'DASHBOARDS'
  },{
    name: 'Resultados',
    url: '/dashboardResultado',
    icon: 'fa fa-chart-line',
    source: 'Resultado'
  },
  {
    name: 'Faturamento',
    url: '/faturamentoUF',
    icon: 'fas fa-chart-pie',
    source: 'Faturamento'
  },
  {
    name: 'Operações',
    url: '/dash-operation',
    icon: 'fas fa-tablet',
    source: 'Operacoes'
  },
  {
    name: 'Financeiro',
    url: '/dash-financial',
    icon: 'fas fa-chart-area',
    source: 'Financeiro'
  },
  {
    name: 'Estoque',
    url: '/dash-estoque',
    icon: 'fas fa-cubes',
    source: 'Estoque'
  },
  {
    title: true,
    name: 'RELATORIOS'
  },
  {
    name: 'Perícia Leilao',
    url: '/relatorios/pericialeilao',
    icon: 'fas fa-gavel',
    source: 'RelatorioPericiaLeilao'
  },
  {
    name: 'Estoque Atual',
    url: '/relatorios/estoque',
    icon: 'fas fa-car',
    source: 'RelatorioEstoque'
  },
  {
    name: 'Liberados',
    url: '/relatorios/liberadosConsolidados',
    icon: 'fas fa-unlock',
    source: 'RelatorioLiberadosConsolidado'
  },
  {
    name: 'Notas Fiscais',
    url: '/relatorios/notasfiscais',
    icon: 'fas fa-file',
    source: 'RelatorioNotasFiscais'
  }
];
