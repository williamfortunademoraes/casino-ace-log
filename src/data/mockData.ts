import { Casa, Jogo, Aposta, Resultado } from '@/types';

export const casas: Casa[] = [
  { id: '1', nome: 'Bet365', link: 'https://bet365.com', totalGasto: 2500, totalGanho: 3200, lucroTotal: 700 },
  { id: '2', nome: 'Betano', link: 'https://betano.com', totalGasto: 1800, totalGanho: 1500, lucroTotal: -300 },
  { id: '3', nome: 'Sportingbet', link: 'https://sportingbet.com', totalGasto: 3200, totalGanho: 4100, lucroTotal: 900 },
  { id: '4', nome: 'Pixbet', link: 'https://pixbet.com', totalGasto: 900, totalGanho: 750, lucroTotal: -150 },
  { id: '5', nome: 'Blaze', link: 'https://blaze.com', totalGasto: 1200, totalGanho: 2800, lucroTotal: 1600 },
];

export const jogos: Jogo[] = [
  { id: '1', nome: 'Aviator', categoria: 'Crash', totalJogadas: 45, totalGasto: 2250, totalGanho: 3500, lucroTotal: 1250 },
  { id: '2', nome: 'Fortune Tiger', categoria: 'Slots', totalJogadas: 32, totalGasto: 1600, totalGanho: 1200, lucroTotal: -400 },
  { id: '3', nome: 'Spaceman', categoria: 'Crash', totalJogadas: 28, totalGasto: 1400, totalGanho: 1900, lucroTotal: 500 },
  { id: '4', nome: 'Mines', categoria: 'Minigames', totalJogadas: 55, totalGasto: 2750, totalGanho: 3100, lucroTotal: 350 },
  { id: '5', nome: 'Blackjack', categoria: 'Cartas', totalJogadas: 20, totalGasto: 1000, totalGanho: 1650, lucroTotal: 650 },
  { id: '6', nome: 'Roleta', categoria: 'Mesa', totalJogadas: 15, totalGasto: 750, totalGanho: 500, lucroTotal: -250 },
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
