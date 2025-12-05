export interface AlertaRisco {
  id: string;
  tipo: 'baixo' | 'medio' | 'critico';
  titulo: string;
  descricao: string;
  categoria: 'apostas_frequentes' | 'perdas_altas' | 'variancia' | 'banca_baixa' | 'emocional';
  dataCriacao: Date;
  lido: boolean;
  acaoRecomendada: string;
}

export const mockAlertas: AlertaRisco[] = [
  {
    id: '1',
    tipo: 'critico',
    titulo: 'Limite diário atingido',
    descricao: 'Você atingiu 95% do seu limite diário de perdas.',
    categoria: 'perdas_altas',
    dataCriacao: new Date(),
    lido: false,
    acaoRecomendada: 'Considere pausar as apostas por hoje e revisar sua estratégia.'
  },
  {
    id: '2',
    tipo: 'medio',
    titulo: 'Sequência de perdas detectada',
    descricao: 'Você teve 5 perdas consecutivas nas últimas 2 horas.',
    categoria: 'emocional',
    dataCriacao: new Date(Date.now() - 3600000),
    lido: false,
    acaoRecomendada: 'Faça uma pausa de 30 minutos antes de continuar.'
  },
  {
    id: '3',
    tipo: 'baixo',
    titulo: 'Apostas muito frequentes',
    descricao: 'Você registrou 12 apostas na última hora.',
    categoria: 'apostas_frequentes',
    dataCriacao: new Date(Date.now() - 7200000),
    lido: true,
    acaoRecomendada: 'Reduza a frequência das apostas para melhor gestão de banca.'
  },
  {
    id: '4',
    tipo: 'medio',
    titulo: 'Variância alta detectada',
    descricao: 'Seus resultados estão muito voláteis hoje.',
    categoria: 'variancia',
    dataCriacao: new Date(Date.now() - 10800000),
    lido: true,
    acaoRecomendada: 'Considere jogos com menor volatilidade.'
  },
  {
    id: '5',
    tipo: 'baixo',
    titulo: 'Banca abaixo da média',
    descricao: 'Sua banca atual está 15% abaixo da média mensal.',
    categoria: 'banca_baixa',
    dataCriacao: new Date(Date.now() - 86400000),
    lido: true,
    acaoRecomendada: 'Revise sua estratégia de gestão de banca.'
  }
];

export const getAlertaColor = (tipo: 'baixo' | 'medio' | 'critico') => {
  const colors = {
    baixo: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-500' },
    medio: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', text: 'text-yellow-500' },
    critico: { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-500' }
  };
  return colors[tipo];
};

export const getAlertaIcon = (categoria: string) => {
  const icons: Record<string, string> = {
    apostas_frequentes: '⚡',
    perdas_altas: '📉',
    variancia: '📊',
    banca_baixa: '💰',
    emocional: '🧠'
  };
  return icons[categoria] || '⚠️';
};
