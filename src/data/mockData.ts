import { Casa, Jogo, Aposta, Promocao, CasaAutorizada, ConfiguracaoLimites } from '@/types';

export const casas: Casa[] = [
  { id: '1', nome: 'Bet365', link: 'https://bet365.com', logo: '🎰', totalGasto: 2500, totalGanho: 3200, lucroTotal: 700, autorizadaGoverno: true, favorito: true },
  { id: '2', nome: 'Betano', link: 'https://betano.com', logo: '⚽', totalGasto: 1800, totalGanho: 1500, lucroTotal: -300, autorizadaGoverno: true, favorito: false },
  { id: '3', nome: 'Sportingbet', link: 'https://sportingbet.com', logo: '🏆', totalGasto: 3200, totalGanho: 4100, lucroTotal: 900, autorizadaGoverno: true, favorito: false },
  { id: '4', nome: 'Pixbet', link: 'https://pixbet.com', logo: '💰', totalGasto: 900, totalGanho: 750, lucroTotal: -150, autorizadaGoverno: false, favorito: false },
  { id: '5', nome: 'Blaze', link: 'https://blaze.com', logo: '🔥', totalGasto: 1200, totalGanho: 2800, lucroTotal: 1600, autorizadaGoverno: false, favorito: true },
];

export const jogos: Jogo[] = [
  { id: '1', nome: 'Aviator', categoria: 'Crash', imagemPromocional: '✈️', totalJogadas: 45, totalGasto: 2250, totalGanho: 3500, lucroTotal: 1250, favorito: true },
  { id: '2', nome: 'Fortune Tiger', categoria: 'Slots', imagemPromocional: '🐯', totalJogadas: 32, totalGasto: 1600, totalGanho: 1200, lucroTotal: -400, favorito: false },
  { id: '3', nome: 'Spaceman', categoria: 'Crash', imagemPromocional: '🚀', totalJogadas: 28, totalGasto: 1400, totalGanho: 1900, lucroTotal: 500, favorito: true },
  { id: '4', nome: 'Mines', categoria: 'Minigames', imagemPromocional: '💎', totalJogadas: 55, totalGasto: 2750, totalGanho: 3100, lucroTotal: 350, favorito: false },
  { id: '5', nome: 'Blackjack', categoria: 'Cartas', imagemPromocional: '🃏', totalJogadas: 20, totalGasto: 1000, totalGanho: 1650, lucroTotal: 650, favorito: false },
  { id: '6', nome: 'Roleta', categoria: 'Mesa', imagemPromocional: '🎡', totalJogadas: 15, totalGasto: 750, totalGanho: 500, lucroTotal: -250, favorito: false },
];

export const apostas: Aposta[] = [
  {
    id: '1',
    data: new Date('2024-11-28T14:30:00'),
    casaId: '1',
    jogoId: '1',
    valorApostado: 50,
    valorGanho: 125,
    resultado: 'Vitória',
    observacao: 'Multiplicador 2.5x',
    lucro: 75,
  },
  {
    id: '2',
    data: new Date('2024-11-28T15:00:00'),
    casaId: '5',
    jogoId: '4',
    valorApostado: 30,
    valorGanho: 0,
    resultado: 'Derrota',
    observacao: 'Bomba na 3ª jogada',
    lucro: -30,
  },
  {
    id: '3',
    data: new Date('2024-11-27T20:15:00'),
    casaId: '3',
    jogoId: '3',
    valorApostado: 100,
    valorGanho: 180,
    resultado: 'Cashout',
    observacao: 'Saí em 1.8x',
    lucro: 80,
  },
  {
    id: '4',
    data: new Date('2024-11-27T18:00:00'),
    casaId: '2',
    jogoId: '2',
    valorApostado: 75,
    valorGanho: 0,
    resultado: 'Derrota',
    observacao: 'Sem bonus',
    lucro: -75,
  },
  {
    id: '5',
    data: new Date('2024-11-26T22:30:00'),
    casaId: '1',
    jogoId: '5',
    valorApostado: 200,
    valorGanho: 400,
    resultado: 'Vitória',
    observacao: 'Blackjack natural!',
    lucro: 200,
  },
  {
    id: '6',
    data: new Date('2024-11-26T21:00:00'),
    casaId: '4',
    jogoId: '6',
    valorApostado: 50,
    valorGanho: 100,
    resultado: 'Vitória',
    observacao: 'Vermelho saiu',
    lucro: 50,
  },
  {
    id: '7',
    data: new Date('2024-11-25T19:45:00'),
    casaId: '5',
    jogoId: '1',
    valorApostado: 80,
    valorGanho: 240,
    resultado: 'Vitória',
    observacao: 'Multiplicador 3x',
    lucro: 160,
  },
  {
    id: '8',
    data: new Date('2024-11-25T17:30:00'),
    casaId: '3',
    jogoId: '4',
    valorApostado: 40,
    valorGanho: 72,
    resultado: 'Cashout',
    observacao: 'Saí com 5 diamantes',
    lucro: 32,
  },
];

export const promocoes: Promocao[] = [
  {
    id: '1',
    casaId: '1',
    titulo: 'Bônus de Boas-Vindas 100%',
    descricao: 'Ganhe 100% do seu primeiro depósito até R$ 500',
    tipo: 'bonus_deposito',
    valor: 500,
    rollover: 35,
    dataExpiracao: new Date('2024-12-31'),
    comoFunciona: 'Deposite qualquer valor e receba 100% de bônus. O rollover de 35x deve ser cumprido em 30 dias.',
    ativa: true,
    favorito: true,
  },
  {
    id: '2',
    casaId: '2',
    titulo: '50 Giros Grátis no Fortune Tiger',
    descricao: 'Giros grátis para novos jogadores',
    tipo: 'giros_gratis',
    valor: 50,
    rollover: 20,
    dataExpiracao: new Date('2024-12-15'),
    comoFunciona: 'Faça um depósito mínimo de R$ 50 e receba 50 giros grátis. Ganhos limitados a R$ 200.',
    ativa: true,
    favorito: false,
  },
  {
    id: '3',
    casaId: '5',
    titulo: 'Cashback 10% Semanal',
    descricao: 'Receba 10% das suas perdas de volta toda semana',
    tipo: 'cashback',
    valor: 10,
    rollover: 1,
    dataExpiracao: undefined,
    comoFunciona: 'Toda segunda-feira, receba 10% das suas perdas líquidas da semana anterior. Máximo R$ 1000.',
    ativa: true,
    favorito: true,
  },
  {
    id: '4',
    casaId: '3',
    titulo: 'Bônus Recarga 50%',
    descricao: '50% de bônus em todos os depósitos às quartas',
    tipo: 'bonus_deposito',
    valor: 250,
    rollover: 25,
    dataExpiracao: new Date('2024-12-20'),
    comoFunciona: 'Deposite às quartas-feiras e ganhe 50% de bônus até R$ 250. Rollover de 25x.',
    ativa: true,
    favorito: false,
  },
];

export const casasAutorizadas: CasaAutorizada[] = [
  { id: '1', nome: 'BET365 BRASIL LTDA', cnpj: '12.345.678/0001-01', marcaComercial: 'Bet365', dominioAprovado: 'bet365.com.br', statusAutorizacao: 'autorizada' },
  { id: '2', nome: 'BETANO OPERAÇÕES BRASIL LTDA', cnpj: '23.456.789/0001-02', marcaComercial: 'Betano', dominioAprovado: 'betano.com.br', statusAutorizacao: 'autorizada' },
  { id: '3', nome: 'SPORTINGBET BRASIL S.A.', cnpj: '34.567.890/0001-03', marcaComercial: 'Sportingbet', dominioAprovado: 'sportingbet.com.br', statusAutorizacao: 'autorizada' },
  { id: '4', nome: 'STAKES BRASIL LTDA', cnpj: '45.678.901/0001-04', marcaComercial: 'Stake', dominioAprovado: 'stake.com.br', statusAutorizacao: 'pendente' },
  { id: '5', nome: 'ESTRELABET S.A.', cnpj: '56.789.012/0001-05', marcaComercial: 'EstrelaBet', dominioAprovado: 'estrelabet.com.br', statusAutorizacao: 'autorizada' },
];

export const configuracaoLimites: ConfiguracaoLimites = {
  limiteDiario: 200,
  limiteSemanal: 1000,
  alertaPercentual: 80,
  modoPausa: false,
  pausaAte: undefined,
  perdasConsecutivasAlerta: 3,
};

export const getApostaWithRelations = (aposta: Aposta): Aposta => ({
  ...aposta,
  casa: casas.find(c => c.id === aposta.casaId),
  jogo: jogos.find(j => j.id === aposta.jogoId),
});

export const monthlyProfitData = [
  { mes: 'Jun', lucro: 450 },
  { mes: 'Jul', lucro: -200 },
  { mes: 'Ago', lucro: 780 },
  { mes: 'Set', lucro: 320 },
  { mes: 'Out', lucro: -150 },
  { mes: 'Nov', lucro: 1150 },
];

export const evolutionData = [
  { data: '01/11', lucro: 100, lucroAcumulado: 100 },
  { data: '05/11', lucro: -50, lucroAcumulado: 50 },
  { data: '10/11', lucro: 200, lucroAcumulado: 250 },
  { data: '15/11', lucro: 150, lucroAcumulado: 400 },
  { data: '20/11', lucro: -80, lucroAcumulado: 320 },
  { data: '25/11', lucro: 300, lucroAcumulado: 620 },
  { data: '28/11', lucro: 180, lucroAcumulado: 800 },
];

// Helper para verificar se casa é autorizada
export const verificarAutorizacao = (nomeCasa: string): CasaAutorizada | undefined => {
  return casasAutorizadas.find(
    ca => ca.marcaComercial.toLowerCase() === nomeCasa.toLowerCase() ||
          ca.nome.toLowerCase().includes(nomeCasa.toLowerCase())
  );
};
