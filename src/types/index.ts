export interface Casa {
  id: string;
  nome: string;
  link: string;
  totalGasto: number;
  totalGanho: number;
  lucroTotal: number;
}

export interface Jogo {
  id: string;
  nome: string;
  categoria: string;
  totalJogadas: number;
  totalGasto: number;
  totalGanho: number;
  lucroTotal: number;
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
