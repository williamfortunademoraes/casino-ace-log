import { Jogo, Aposta } from '@/types';

export interface RTPAnalysis {
  rtp: number;
  rtpTeorico?: number;
  tendencia: 'alta' | 'estavel' | 'baixa';
  classificacao: 'bom' | 'medio' | 'perigoso';
  totalApostado: number;
  totalGanho: number;
}

// RTP teórico estimado por categoria de jogo
const rtpTeoricoPorCategoria: Record<string, number> = {
  'Crash': 97,
  'Slots': 96,
  'Minigames': 95,
  'Cartas': 99,
  'Mesa': 97.3,
};

export const calcularRTP = (totalGanho: number, totalApostado: number): number => {
  if (totalApostado === 0) return 0;
  return (totalGanho / totalApostado) * 100;
};

export const getRTPTeorico = (categoria: string): number | undefined => {
  return rtpTeoricoPorCategoria[categoria];
};

export const classificarRTP = (rtp: number, rtpTeorico?: number): 'bom' | 'medio' | 'perigoso' => {
  const referencia = rtpTeorico || 95;
  
  if (rtp >= referencia) return 'bom';
  if (rtp >= referencia - 10) return 'medio';
  return 'perigoso';
};

export const calcularTendencia = (apostasRecentes: Aposta[]): 'alta' | 'estavel' | 'baixa' => {
  if (apostasRecentes.length < 3) return 'estavel';
  
  const metade = Math.floor(apostasRecentes.length / 2);
  const primeiraParte = apostasRecentes.slice(0, metade);
  const segundaParte = apostasRecentes.slice(metade);
  
  const rtpPrimeira = calcularRTP(
    primeiraParte.reduce((sum, a) => sum + a.valorGanho, 0),
    primeiraParte.reduce((sum, a) => sum + a.valorApostado, 0)
  );
  
  const rtpSegunda = calcularRTP(
    segundaParte.reduce((sum, a) => sum + a.valorGanho, 0),
    segundaParte.reduce((sum, a) => sum + a.valorApostado, 0)
  );
  
  const diferenca = rtpSegunda - rtpPrimeira;
  
  if (diferenca > 5) return 'alta';
  if (diferenca < -5) return 'baixa';
  return 'estavel';
};

export const analisarRTPJogo = (jogo: Jogo, apostasJogo: Aposta[]): RTPAnalysis => {
  const rtp = calcularRTP(jogo.totalGanho, jogo.totalGasto);
  const rtpTeorico = getRTPTeorico(jogo.categoria);
  const tendencia = calcularTendencia(apostasJogo);
  const classificacao = classificarRTP(rtp, rtpTeorico);
  
  return {
    rtp,
    rtpTeorico,
    tendencia,
    classificacao,
    totalApostado: jogo.totalGasto,
    totalGanho: jogo.totalGanho,
  };
};

export const getClassificacaoColor = (classificacao: 'bom' | 'medio' | 'perigoso'): string => {
  switch (classificacao) {
    case 'bom': return 'text-primary';
    case 'medio': return 'text-yellow-500';
    case 'perigoso': return 'text-destructive';
  }
};

export const getTendenciaIcon = (tendencia: 'alta' | 'estavel' | 'baixa'): string => {
  switch (tendencia) {
    case 'alta': return '↗️';
    case 'estavel': return '➡️';
    case 'baixa': return '↘️';
  }
};
