import { UserVIP, BeneficioVIP, Missao, Conquista, RankingUser, NivelVIP } from '@/types';

export const niveisVIP: { nivel: NivelVIP; nome: string; xpMinimo: number; cor: string }[] = [
  { nivel: 'bronze', nome: 'Bronze', xpMinimo: 0, cor: '#CD7F32' },
  { nivel: 'silver', nome: 'Silver', xpMinimo: 1000, cor: '#C0C0C0' },
  { nivel: 'gold', nome: 'Gold', xpMinimo: 5000, cor: '#FFD700' },
  { nivel: 'platinum', nome: 'Platinum', xpMinimo: 15000, cor: '#E5E4E2' },
  { nivel: 'diamond', nome: 'Diamond', xpMinimo: 50000, cor: '#B9F2FF' },
  { nivel: 'elite_black', nome: 'Elite Black', xpMinimo: 100000, cor: '#1a1a2e' },
];

export const beneficiosVIP: BeneficioVIP[] = [
  { nivel: 'bronze', nome: 'Acesso Básico', descricao: 'Todas as funcionalidades básicas do app', icone: '🎮' },
  { nivel: 'silver', nome: 'Relatórios Avançados', descricao: 'Acesso a relatórios detalhados', icone: '📊' },
  { nivel: 'silver', nome: 'Tema Silver', descricao: 'Tema exclusivo prateado', icone: '🎨' },
  { nivel: 'gold', nome: 'Alertas Premium', descricao: 'Sistema de alertas inteligentes', icone: '🔔' },
  { nivel: 'gold', nome: 'Tema Gold', descricao: 'Tema exclusivo dourado', icone: '✨' },
  { nivel: 'platinum', nome: 'Análise de Providers', descricao: 'Insights profundos de providers', icone: '🔍' },
  { nivel: 'platinum', nome: 'Badge Platinum', descricao: 'Badge exclusivo no perfil', icone: '💎' },
  { nivel: 'diamond', nome: 'Previsões IA', descricao: 'Previsões baseadas em IA', icone: '🤖' },
  { nivel: 'diamond', nome: 'Suporte Prioritário', descricao: 'Atendimento VIP exclusivo', icone: '👑' },
  { nivel: 'elite_black', nome: 'Acesso Total', descricao: 'Todas as funcionalidades desbloqueadas', icone: '🏆' },
  { nivel: 'elite_black', nome: 'Elite Black Badge', descricao: 'Badge lendário exclusivo', icone: '⚫' },
];

export const mockUserVIP: UserVIP = {
  id: '1',
  nivel: 'gold',
  xpAtual: 7500,
  xpProximoNivel: 15000,
  beneficios: ['Acesso Básico', 'Relatórios Avançados', 'Tema Silver', 'Alertas Premium', 'Tema Gold'],
  diasAtivos: 45,
  volumeTotal: 25000,
};

export const mockMissoes: Missao[] = [
  { id: '1', titulo: 'Registrar 3 apostas', descricao: 'Registre 3 apostas hoje', tipo: 'diaria', xpRecompensa: 50, progresso: 2, meta: 3, concluida: false, icone: '📝' },
  { id: '2', titulo: 'Favoritar 2 jogos', descricao: 'Adicione 2 jogos aos favoritos', tipo: 'diaria', xpRecompensa: 30, progresso: 1, meta: 2, concluida: false, icone: '⭐' },
  { id: '3', titulo: 'Concluir 1 aprendizado', descricao: 'Complete uma lição do módulo de aprendizados', tipo: 'diaria', xpRecompensa: 40, progresso: 0, meta: 1, concluida: false, icone: '📚' },
  { id: '4', titulo: 'Manter banca positiva', descricao: 'Mantenha sua banca positiva por 2 dias', tipo: 'semanal', xpRecompensa: 150, progresso: 1, meta: 2, concluida: false, icone: '💰' },
  { id: '5', titulo: 'Analisar 5 providers', descricao: 'Veja estatísticas de 5 providers diferentes', tipo: 'semanal', xpRecompensa: 100, progresso: 3, meta: 5, concluida: false, icone: '🔍' },
  { id: '6', titulo: 'Sequência de 7 dias', descricao: 'Entre no app por 7 dias consecutivos', tipo: 'especial', xpRecompensa: 300, progresso: 5, meta: 7, concluida: false, icone: '🔥' },
];

export const mockConquistas: Conquista[] = [
  { id: '1', titulo: 'Primeira Aposta', descricao: 'Registre sua primeira aposta', icone: '🎯', xpRecompensa: 100, desbloqueada: true, dataDesbloqueio: new Date('2024-01-15'), raridade: 'comum' },
  { id: '2', titulo: 'Apostador Frequente', descricao: 'Registre 100 apostas', icone: '📊', xpRecompensa: 500, desbloqueada: true, dataDesbloqueio: new Date('2024-02-20'), raridade: 'raro' },
  { id: '3', titulo: 'Mestre dos Slots', descricao: 'Jogue 50 slots diferentes', icone: '🎰', xpRecompensa: 300, desbloqueada: true, dataDesbloqueio: new Date('2024-03-10'), raridade: 'raro' },
  { id: '4', titulo: 'Estudioso', descricao: 'Complete todas as lições', icone: '🎓', xpRecompensa: 1000, desbloqueada: false, raridade: 'epico' },
  { id: '5', titulo: 'Lucro Consistente', descricao: 'Mantenha lucro positivo por 30 dias', icone: '💎', xpRecompensa: 2000, desbloqueada: false, raridade: 'epico' },
  { id: '6', titulo: 'Elite Black', descricao: 'Alcance o nível Elite Black', icone: '👑', xpRecompensa: 5000, desbloqueada: false, raridade: 'lendario' },
  { id: '7', titulo: 'Caçador de Promos', descricao: 'Utilize 20 promoções diferentes', icone: '🎁', xpRecompensa: 400, desbloqueada: true, dataDesbloqueio: new Date('2024-03-25'), raridade: 'raro' },
  { id: '8', titulo: 'Analista Pro', descricao: 'Use todas as ferramentas da calculadora', icone: '🧮', xpRecompensa: 200, desbloqueada: false, raridade: 'comum' },
];

export const mockRanking: RankingUser[] = [
  { id: '1', username: 'ProGambler', avatar: '', nivel: 42, nivelVIP: 'elite_black', xp: 125000, lucroPercentual: 32.5, consistencia: 95, missoesConcluidas: 156, posicao: 1 },
  { id: '2', username: 'LuckyAce', avatar: '', nivel: 38, nivelVIP: 'diamond', xp: 89000, lucroPercentual: 28.3, consistencia: 88, missoesConcluidas: 134, posicao: 2 },
  { id: '3', username: 'SlotMaster', avatar: '', nivel: 35, nivelVIP: 'diamond', xp: 72000, lucroPercentual: 25.1, consistencia: 82, missoesConcluidas: 121, posicao: 3 },
  { id: '4', username: 'BetKing', avatar: '', nivel: 31, nivelVIP: 'platinum', xp: 48000, lucroPercentual: 22.8, consistencia: 79, missoesConcluidas: 98, posicao: 4 },
  { id: '5', username: 'Você', avatar: '', nivel: 28, nivelVIP: 'gold', xp: 7500, lucroPercentual: 18.5, consistencia: 75, missoesConcluidas: 45, posicao: 5 },
  { id: '6', username: 'CasinoWiz', avatar: '', nivel: 25, nivelVIP: 'gold', xp: 6200, lucroPercentual: 15.2, consistencia: 70, missoesConcluidas: 38, posicao: 6 },
  { id: '7', username: 'BigWinner', avatar: '', nivel: 22, nivelVIP: 'silver', xp: 4800, lucroPercentual: 12.8, consistencia: 65, missoesConcluidas: 32, posicao: 7 },
  { id: '8', username: 'SpinPro', avatar: '', nivel: 19, nivelVIP: 'silver', xp: 3500, lucroPercentual: 10.5, consistencia: 60, missoesConcluidas: 28, posicao: 8 },
  { id: '9', username: 'JackpotHunter', avatar: '', nivel: 15, nivelVIP: 'bronze', xp: 800, lucroPercentual: 8.2, consistencia: 55, missoesConcluidas: 15, posicao: 9 },
  { id: '10', username: 'Newbie123', avatar: '', nivel: 5, nivelVIP: 'bronze', xp: 250, lucroPercentual: 5.0, consistencia: 45, missoesConcluidas: 5, posicao: 10 },
];
