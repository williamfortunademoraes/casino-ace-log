import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, TrendingUp, TrendingDown, Wallet, Target } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import StatCard from '@/components/dashboard/StatCard';
import LinePerformanceChart from '@/components/charts/LinePerformanceChart';
import { casas, apostas, getApostaWithRelations } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const CasaDetalhes = () => {
  const { id } = useParams();
  const casa = casas.find(c => c.id === id);
  
  if (!casa) {
    return (
      <Layout>
        <div className="text-center py-20">
          <p className="text-muted-foreground">Casa não encontrada</p>
          <Link to="/casas" className="text-primary hover:underline">Voltar para casas</Link>
        </div>
      </Layout>
    );
  }

  const apostasCasa = apostas
    .filter(a => a.casaId === id)
    .map(getApostaWithRelations)
    .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());

  // Generate performance data
  let acumulado = 0;
  const performanceData = apostasCasa
    .slice()
    .reverse()
    .map((a) => {
      acumulado += a.lucro;
      return {
        data: format(new Date(a.data), 'dd/MM'),
        lucro: a.lucro,
        lucroAcumulado: acumulado,
      };
    });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <Layout>
      {/* Header */}
      <div className="mb-8">
        <Link 
          to="/casas" 
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          Voltar para casas
        </Link>
        <div className="flex items-center gap-4">
          <div className={cn(
            'w-16 h-16 rounded-2xl flex items-center justify-center',
            casa.lucroTotal >= 0 ? 'bg-primary/20 glow-success' : 'bg-destructive/20 glow-loss'
          )}>
            {casa.lucroTotal >= 0 ? (
              <TrendingUp className="w-8 h-8 text-primary" />
            ) : (
              <TrendingDown className="w-8 h-8 text-destructive" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground">{casa.nome}</h1>
              <a 
                href={casa.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
            <p className="text-muted-foreground">{apostasCasa.length} apostas registradas</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
        <StatCard
          title="Lucro Total"
          value={casa.lucroTotal}
          icon={<Wallet className="w-6 h-6" />}
          trend={casa.lucroTotal >= 0 ? 'up' : 'down'}
        />
        <StatCard
          title="Total Ganho"
          value={casa.totalGanho}
          icon={<TrendingUp className="w-6 h-6" />}
          trend="up"
        />
        <StatCard
          title="Total Gasto"
          value={casa.totalGasto}
          icon={<TrendingDown className="w-6 h-6" />}
          trend="down"
        />
        <StatCard
          title="Apostas"
          value={apostasCasa.length}
          icon={<Target className="w-6 h-6" />}
          trend="neutral"
        />
      </div>

      {/* Chart and Bets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LinePerformanceChart data={performanceData} title={`Desempenho - ${casa.nome}`} />
        
        <div className="card-glass p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Histórico de Apostas</h3>
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {apostasCasa.map((aposta) => (
              <div 
                key={aposta.id}
                className="flex items-center justify-between p-4 rounded-xl bg-muted/30"
              >
                <div>
                  <p className="font-medium text-foreground">{aposta.jogo?.nome}</p>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(aposta.data), "dd MMM, HH:mm", { locale: ptBR })}
                  </p>
                </div>
                <div className="text-right">
                  <p className={cn(
                    'font-semibold',
                    aposta.lucro >= 0 ? 'text-primary' : 'text-destructive'
                  )}>
                    {aposta.lucro >= 0 ? '+' : ''}{formatCurrency(aposta.lucro)}
                  </p>
                  <span className={cn(
                    'text-xs',
                    aposta.resultado === 'Vitória' && 'badge-success',
                    aposta.resultado === 'Derrota' && 'badge-loss',
                    aposta.resultado === 'Cashout' && 'badge-neutral'
                  )}>
                    {aposta.resultado}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CasaDetalhes;
