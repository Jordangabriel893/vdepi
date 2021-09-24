import { Moment } from "moment";


export class Recolhimento {
  id: number;
  id_dispositivo: number;
  id_grv: number;
  ativo: boolean;
  taxa_atualizacao: number;

  dispositivo: Dispositivo;
  grv: GRV;
  alerta_atividade: AlertaAtividade;
}

export class RecolhimentoAtividade {
  id: number;
  id_recolhimento: number;
  lat: number;
  lng: number;
  bateria: number;
  velociodade: number;
  data_atividade: Date;
}

export class Alerta {
  id: number;
  id_tipo_alerta: number;
  id_cliente: number;
  sms: boolean;
  email: boolean;
  prioridade: number;

  cliente: Cliente;
  tipoAlerta: TipoAlerta;
}


export class Dispositivo {
  id: number;
  imei: string;
  ativo: boolean = true;
  id_status: number;
  telefone: string;
  fabricante: string;
  modelo: string;
  nota_fiscal: string;
  id_cliente?: number;
  id_deposito?: number;
}

export class GRV {
  id_grv: number
  id_cliente: number;
  placa: string;
  chassi: string;
  renavam: string;
  marca_modelo: string;
  tipo_veiculo: number;
  data_remocao: Date;
  numero_processo: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
  latitude: number;
  longitude: number;
  autoridade: Autoridade;
  infracoes: Infracao[];
}

export class Loja {
  id: number;
  name: string;
  endereco: string;
  codRMS: number;
}

export class MarkerMap {
  label?: any;
  recolhimento: Recolhimento;
  icon: string;
  iconConverColor: string;
  visible: boolean;
  gm: google.maps.Marker;
}

export class User {
  id: number;
  username: string;
  password: string;
  token: string;
  acessos: Acesso[]
}

export class Acesso {
  id: number;
  name_acesso: string;
}

export class Cliente {
  id_cliente: number;
  nome: string;

  depositos: Deposito[];
}

export class Deposito {
  id_deposito: number;
  descricao: string;
  flag_virtual: string;
}

export class TipoAlerta {
  id: number;
  descricao: string;
  data_cadastro: Date;
  ativo: boolean = true;
  cor: string;
}

export class Infracao {
  id_infracao: number;
  nome_infracao: string;
}

export class Autoridade {
  id_autoridade: number;
  nome_orgao: string;
  nome_autoridade: string;
}

export class AlertaAtividade {
  id: number;
  id_recolhimento: number;
  id_alerta: number;
  id_status: number;
  data_atividade: Date;
  observacao: string;

  recolhimento: Recolhimento;
  alerta: Alerta;
}

export class AlertaResumo {
  id_tipo_alerta: number;
  descricao: string;
  quantidade: number;
  cor: string;
  percent: number;
}

export class DashboardContador {
  cliente: string;
  deposito: string;
  recolhidos: number;
  liberados: number;
  estoque: number;
  estoque_pre_leilao: number;
}

export class DashboardContadorEstoque {
  estoque: number;
  estoque_pre_leilao: number;
}

export class DashboardLineChart {
  label: string;
  data: string[]
  hidden: boolean;
}

export class DashboardDoughnutChart {
  itens: DashboardDoughnutChartItem[]
}

export class DashboardDoughnutChartItem {
  label: string;
  data: number;
}

export class DispositivoAtividade {
  id: number;
  id_status: number;
  id_dispositivo: number;
  id_cliente?: number;
  id_autoridade?: number;
  nome_agente: string;
  usuario: number;
  data_atividade_inicio: Date;
  data_atividade_fim?: Date;

  cliente: Cliente;
  autoridade: Autoridade;
  dispositivo: Dispositivo;
  user: User;
}

export class DispositivoRemessa {
  id: number;
  id_cliente: number = 0;
  status: string;
  resp_recebimento: string;
  observacao: string;
  usuario: number;
  data_remessa: Date;
  data_recebimento_remessa?: Date;
  total_dispositivo: number;

  cliente: Cliente;
  user: User;
  remessaItens: DispositivoRemessaItem[];
}


export class DispositivoRemessaItem {
  id: number;
  id_remessa: number;
  id_dispositivo: number;

  dispositivo: Dispositivo;
}

export class RouteWay {
  id: number;
  route: google.maps.Polyline;
  date: Moment;
  color: string;
  visible: boolean;
}

export class Agente {
  id: number;
  autoridade_responsavel_id: number = 0;
  tipo_profissao_id: number;
  orgao_emissor_id: number = 0;
  autoridade_divisao_id: number = 0;
  usuario_cadastro_id: number;
  usuario_alteracao_id: number;
  login: string;
  matricula: string;
  senha: string;
  nome: string;

  data_ultimo_login: Date;
  data_ultima_alteracao_senha: Date;
  data_desativacao: Date;
  data_cadastro: Date;
  data_alteracao: Date;
  flag_ativo: boolean = true;

  Orgao: Orgao;
  Autoridade: Autoridade
  Divisao: Divisao;
}

export class Orgao {
  id_orgao: number;
  sigla: string;
  descricao: string;
}

export class Divisao {
  id_divisao: number;
  nome_divisao: string;
}

export class Parceiro {
  id: number;
  nome_fantasia: string;
  razao_social: string;
  cnpj: string;
  responsavel: string;
  telefone: string;
  cep: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
  lat: number;
  lng: number;
  ativo: boolean = true;
  login: string;
  senha: string;
}

export class DashboardContadorFinanceiro {
  receita_total: number;
  ticket_medio: number;
  receita_diarias: number;
  receita_taxa: number;
}

export class DashboardResumoFinanceiro {
  dia: number;
  desativacoes: number;
  media_dias: number;
  total_diarias: number;
  receita_diarias_dia: number;
  receita_taxa_dias: number;
}

export class OrdemServico {
  id: number;
  id_cliente: number = 0;
  status: string;
  id_parceiro: string;
  id_usuario: number;
  data_ordem_servico: Date;
  data_coleta?: Date;
  total_dispositivo: number;

  cliente: Cliente;
  usuario: User;
  parceiro: Parceiro;
  itens: OrdemServicoItem[];
}


export class OrdemServicoItem {
  id: number;
  id_ordem_servico: number;
  id_dispositivo: number;

  dispositivo: Dispositivo;
}

export class AgenteRecolhimento {
  id: number;
  nome: string;
  cpf: string;
  telefone: string;
  ativo: boolean = true;
  login: string;
  senha: string;
  clientes: number[];
  total_clientes?: number;
  recolhedor_clientes?: AgenteRecolhimentoCliente[];
}

export class AgenteRecolhimentoCliente {
  id: number;
  id_agente_recolhimento: number;
  id_cliente: number;
}

export class DashboardFaturamentoUF {
  Uf: string;
  faturamento: number;
}

export class DashboardFaturamentoUFClientes {
  id_cliente: number;
  cliente: string;
  faturamento: number;
}

export class DashboardFaturamentoContadores {
  total_UF: number;
  total_clientes: number;
  total_depositos: number;
  total_faturamento: number;
}

export class DashboardFaturamentoMetas {
  deposito: string;
  fat_atual: number;
  fat_1ano_anterior: number;
  fat_2ano_anterior: number;
}


export interface Foto {
  arquivoId: number;
  nome: string;
  base64: string;
  tipo: string;
  tamanho: number;
}

export interface Leilao {
  id: number;
  nome: string;
  titulo: string;
  dataLeilao: Date;
  categoria: string;
  status: string;
  foto: Foto;
  qtdLotes: number;
}
export interface Categoria {
  categoriaId: number;
  dataCadastro: Date;
  ativo: boolean;
  descricao: string;
  categoriaPai?: any;
  categoriaPaiId?: any;
}
