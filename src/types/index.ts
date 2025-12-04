export interface Casa {
  id: string;
  nome: string;
  link: string;
  logo?: string;
  totalGasto: number;
  totalGanho: number;
  lucroTotal: number;
  autorizadaGoverno?: boolean;
  favorito?: boolean;
}

export interface Jogo {
  id: string;
  nome: string;
  categoria: string;
  imagemPromocional?: string;
  totalJogadas: number;
  totalGasto: number;
  totalGanho: number;
  lucroTotal: number;
  favorito?: boolean;
  providerId?: string;
  rtpTeorico?: number;
}

export type Resultado = 'Vitória' | 'Derrota' | 'Cashout';

export interface Aposta {
  id: string;
  data: Date;
  casaId: string;
  jogoId: string;
  valorApostado: number;
  valorGanho: number;
  resultado: Resultado;
  observacao: string;
  lucro: number;
  casa?: Casa;
  jogo?: Jogo;
}

export interface DashboardStats {
  saldoAtual: number;
  ganhosTotal: number;
  gastosTotal: number;
  totalApostas: number;
}

export interface MonthlyData {
  mes: string;
  lucro: number;
}

export interface PerformanceData {
  data: string;
  lucro: number;
  lucroAcumulado: number;
}

export interface Promocao {
  id: string;
  casaId: string;
  titulo: string;
  descricao: string;
  tipo: 'bonus_deposito' | 'giros_gratis' | 'cashback' | 'outro';
  valor?: number;
  rollover?: number;
  dataExpiracao?: Date;
  comoFunciona?: string;
  ativa: boolean;
  favorito?: boolean;
}

export interface CasaAutorizada {
  id: string;
  nome: string;
  cnpj: string;
  marcaComercial: string;
  dominioAprovado: string;
  statusAutorizacao: 'autorizada' | 'pendente' | 'suspensa';
}

export interface Alerta {
  id: string;
  tipo: 'limite_diario' | 'limite_semanal' | 'anti_tilt' | 'pausa';
  valor?: number;
  ativo: boolean;
  dataInicio?: Date;
  dataFim?: Date;
}

export interface ConfiguracaoLimites {
  limiteDiario: number;
  limiteSemanal: number;
  alertaPercentual: number;
  modoPausa: boolean;
  pausaAte?: Date;
  perdasConsecutivasAlerta: number;
}

// NEW: Provider type
export interface Provider {
  id: string;
  nome: string;
  descricao: string;
  logo?: string;
  totalJogos: number;
  totalGasto: number;
  totalGanho: number;
  lucroTotal: number;
  rtpMedio: number;
  jogoMaisLucrativo?: string;
  melhoresHorarios?: string[];
  tendencia: 'alta' | 'estavel' | 'baixa';
}

// NEW: Lesson type for learning module
export interface Licao {
  id: string;
  titulo: string;
  descricao: string;
  categoria: 'gestao_banca' | 'rtp' | 'volatilidade' | 'estrategia' | 'psicologia' | 'erros_comuns';
  conteudo: string;
  duracaoMinutos: number;
  concluida: boolean;
  ordem: number;
}

export interface ProgressoAprendizado {
  totalLicoes: number;
  licoesConcluidas: number;
  porcentagemConcluida: number;
  categoriasProgresso: {
    categoria: string;
    total: number;
    concluidas: number;
  }[];
}
