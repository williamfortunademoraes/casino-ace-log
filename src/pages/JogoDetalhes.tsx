import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Gamepad2, TrendingUp, TrendingDown, Wallet, Target, Percent } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import StatCard from '@/components/dashboard/StatCard';
import LinePerformanceChart from '@/components/charts/LinePerformanceChart';
import { jogos, apostas, getApostaWithRelations } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { analisarRTPJogo, getRTPTeorico, getClassificacaoColor, getTendenciaIcon } from '@/utils/rtp';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const JogoDetalhes = () => {
  const { id } = useParams();
  const jogo = jogos.find(j => j.id === id);
  
  if (!jogo) {
    return (
      <Layout>
        <div className="text-center py-20">
          <p className="text-muted-foreground">Jogo não encontrado</p>
          <Link to="/jogos" className="text-primary hover:underline">Voltar para jogos</Link>
        </div>
      </Layout>
    );
  }

  const apostasJogo = apostas
    .filter(a => a.jogoId === id)
    .map(getApostaWithRelations)
    .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());

  // RTP Analysis
  const rtpAnalysis = analisarRTPJogo(jogo, apostasJogo);
  const rtpTeorico = getRTPTeorico(jogo.categoria);

  // Generate performance data
  let acumulado = 0;
  const performanceData = apostasJogo
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
          to="/jogos" 
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          Voltar para jogos
        </Link>
        <div className="flex items-center gap-4">
          <div className={cn(
            'w-16 h-16 rounded-2xl flex items-center justify-center',
            jogo.lucroTotal >= 0 ? 'bg-primary/20 glow-success' : 'bg-destructive/20 glow-loss'
          )}>
            <Gamepad2 className={cn(
              'w-8 h-8',
              jogo.lucroTotal >= 0 ? 'text-primary' : 'text-destructive'
            )} />
          </div>
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">{jogo.nome}</h1>
            <div className="flex items-center gap-2">
              <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                {jogo.categoria}
              </span>
              <span className="text-muted-foreground">• {apostasJogo.length} apostas</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
        <StatCard
          title="Lucro Total"
          value={jogo.lucroTotal}
          icon={<Wallet className="w-6 h-6" />}
          trend={jogo.lucroTotal >= 0 ? 'up' : 'down'}
        />
        <StatCard
          title="Total Ganho"
          value={jogo.totalGanho}
          icon={<TrendingUp className="w-6 h-6" />}
          trend="up"
        />
        <StatCard
          title="Total Gasto"
          value={jogo.totalGasto}
          icon={<TrendingDown className="w-6 h-6" />}
          trend="down"
        />
        <StatCard
          title="Jogadas"
          value={jogo.totalJogadas}
          icon={<Target className="w-6 h-6" />}
          trend="neutral"
        />
      </div>

      {/* RTP Card */}
      <Card className="card-glass mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Percent className="w-5 h-5 text-primary" />
            Análise de RTP (Return to Player)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-muted/50 text-center">
              <p className="text-sm text-muted-foreground mb-1">Seu RTP</p>
              <p className={cn('text-2xl font-bold', getClassificacaoColor(rtpAnalysis.classificacao))}>
                {rtpAnalysis.rtp.toFixed(1)}%
              </p>
            </div>
            <div className="p-4 rounded-xl bg-muted/50 text-center">
              <p className="text-sm text-muted-foreground mb-1">RTP Teórico</p>
              <p className="text-2xl font-bold text-foreground">
                {rtpTeorico ? `${rtpTeorico}%` : 'N/A'}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-muted/50 text-center">
              <p className="text-sm text-muted-foreground mb-1">Tendência</p>
              <p className="text-2xl font-bold text-foreground">
                {getTendenciaIcon(rtpAnalysis.tendencia)} {rtpAnalysis.tendencia}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-muted/50 text-center">
              <p className="text-sm text-muted-foreground mb-1">Classificação</p>
              <p className={cn('text-2xl font-bold capitalize', getClassificacaoColor(rtpAnalysis.classificacao))}>
                {rtpAnalysis.classificacao}
              </p>
            </div>
          </div>

          {rtpTeorico && (
            <div className="mt-4 p-4 rounded-xl bg-muted/30">
              <p className="text-sm text-muted-foreground">
                {rtpAnalysis.rtp > rtpTeorico ? (
                  <span className="text-primary">✅ Você está acima do RTP teórico em {(rtpAnalysis.rtp - rtpTeorico).toFixed(1)}%</span>
                ) : rtpAnalysis.rtp === rtpTeorico ? (
                  <span className="text-foreground">➡️ Você está exatamente no RTP teórico</span>
                ) : (
                  <span className="text-destructive">⚠️ Você está abaixo do RTP teórico em {(rtpTeorico - rtpAnalysis.rtp).toFixed(1)}%</span>
                )}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Chart and Bets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LinePerformanceChart data={performanceData} title={`Performance - ${jogo.nome}`} />
        
        <div className="card-glass p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Histórico de Apostas</h3>
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {apostasJogo.map((aposta) => (
              <div 
                key={aposta.id}
                className="flex items-center justify-between p-4 rounded-xl bg-muted/30"
              >
                <div>
                  <p className="font-medium text-foreground">{aposta.casa?.nome}</p>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(aposta.data), "dd MMM, HH:mm", { locale: ptBR })}
                  </p>
                  {aposta.observacao && (
                    <p className="text-xs text-muted-foreground mt-1">{aposta.observacao}</p>
                  )}
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

export default JogoDetalhes;
