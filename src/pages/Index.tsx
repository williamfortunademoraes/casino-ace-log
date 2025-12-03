import { Link } from 'react-router-dom';
import { Wallet, TrendingUp, TrendingDown, Target, Plus, ShieldCheck, AlertTriangle, Calculator, Scale } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import StatCard from '@/components/dashboard/StatCard';
import RecentBets from '@/components/dashboard/RecentBets';
import ProfitChart from '@/components/charts/ProfitChart';
import { apostas, casas, jogos, getApostaWithRelations, evolutionData, configuracaoLimites } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { analisarRTPJogo, getClassificacaoColor } from '@/utils/rtp';
import { cn } from '@/lib/utils';

const Dashboard = () => {
  const apostasWithRelations = apostas.map(getApostaWithRelations);
  
  const totalGasto = apostas.reduce((acc, a) => acc + a.valorApostado, 0);
  const totalGanho = apostas.reduce((acc, a) => acc + a.valorGanho, 0);
  const saldoAtual = totalGanho - totalGasto;
  const totalApostas = apostas.length;

  // Calcular gasto diário para alerta
  const hoje = new Date();
  const inicioDia = new Date(hoje.setHours(0, 0, 0, 0));
  const gastoDiario = apostas
    .filter(a => new Date(a.data) >= inicioDia)
    .reduce((acc, a) => acc + a.valorApostado, 0);
  const percentualDiario = (gastoDiario / configuracaoLimites.limiteDiario) * 100;

  // Jogos e casas favoritos
  const jogosFavoritos = jogos.filter(j => j.favorito).slice(0, 3);
  const casasFavoritas = casas.filter(c => c.favorito).slice(0, 3);

  return (
    <Layout>
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Acompanhe suas apostas em tempo real</p>
        </div>
        <Link to="/nova-aposta">
          <Button className="btn-primary flex items-center gap-2 w-full lg:w-auto">
            <Plus className="w-5 h-5" />
            Registrar Aposta
          </Button>
        </Link>
      </div>

      {/* Alerta de Limite */}
      {percentualDiario >= configuracaoLimites.alertaPercentual && (
        <div className="card-glass p-4 mb-6 border-l-4 border-yellow-500 bg-yellow-500/5">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-500" />
            <p className="text-sm text-foreground">
              <strong>Atenção:</strong> Você atingiu {percentualDiario.toFixed(0)}% do seu limite diário.
              <Link to="/limites" className="text-primary ml-2 hover:underline">Ver limites →</Link>
            </p>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
        <StatCard
          title="Saldo Atual"
          value={saldoAtual}
          icon={<Wallet className="w-6 h-6" />}
          trend={saldoAtual >= 0 ? 'up' : 'down'}
          subtitle={saldoAtual >= 0 ? 'Você está no lucro!' : 'Atenção ao limite'}
          className="delay-100"
        />
        <StatCard
          title="Total Ganho"
          value={totalGanho}
          icon={<TrendingUp className="w-6 h-6" />}
          trend="up"
          className="delay-200"
        />
        <StatCard
          title="Total Gasto"
          value={totalGasto}
          icon={<TrendingDown className="w-6 h-6" />}
          trend="down"
          className="delay-300"
        />
        <StatCard
          title="Total de Apostas"
          value={totalApostas}
          icon={<Target className="w-6 h-6" />}
          trend="neutral"
          subtitle={`${casas.length} casas utilizadas`}
          className="delay-400"
        />
      </div>

      {/* Quick Access - Favoritos */}
      {(jogosFavoritos.length > 0 || casasFavoritas.length > 0) && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {jogosFavoritos.length > 0 && (
            <div className="card-glass p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground">🎮 Jogos Favoritos</h3>
                <Link to="/favoritos" className="text-xs text-primary hover:underline">Ver todos</Link>
              </div>
              <div className="flex gap-3">
                {jogosFavoritos.map(jogo => {
                  const rtpAnalysis = analisarRTPJogo(jogo, apostas.filter(a => a.jogoId === jogo.id));
                  return (
                    <Link 
                      key={jogo.id} 
                      to={`/jogos/${jogo.id}`}
                      className="flex-1 p-3 bg-muted/50 rounded-xl hover:bg-muted transition-colors text-center group"
                    >
                      <span className="text-2xl block mb-1">{jogo.imagemPromocional}</span>
                      <span className="text-xs font-medium text-foreground group-hover:text-primary transition-colors block">
                        {jogo.nome}
                      </span>
                      <span className={cn('text-[10px]', getClassificacaoColor(rtpAnalysis.classificacao))}>
                        RTP: {rtpAnalysis.rtp.toFixed(0)}%
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {casasFavoritas.length > 0 && (
            <div className="card-glass p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground">🏠 Casas Favoritas</h3>
                <Link to="/favoritos" className="text-xs text-primary hover:underline">Ver todos</Link>
              </div>
              <div className="flex gap-3">
                {casasFavoritas.map(casa => (
                  <Link 
                    key={casa.id} 
                    to={`/casas/${casa.id}`}
                    className="flex-1 p-3 bg-muted/50 rounded-xl hover:bg-muted transition-colors text-center group"
                  >
                    <span className="text-2xl block mb-1">{casa.logo}</span>
                    <span className="text-xs font-medium text-foreground group-hover:text-primary transition-colors">
                      {casa.nome}
                    </span>
                    {casa.autorizadaGoverno && (
                      <ShieldCheck className="w-3 h-3 text-primary mx-auto mt-1" />
                    )}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Quick Tools */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Link to="/calculadora" className="card-glass p-4 hover:border-primary/50 transition-all group">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
              <Calculator className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">Calculadora</h4>
              <p className="text-xs text-muted-foreground">Lucro, banca e rollover</p>
            </div>
          </div>
        </Link>
        <Link to="/comparador" className="card-glass p-4 hover:border-primary/50 transition-all group">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
              <Scale className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">Comparador</h4>
              <p className="text-xs text-muted-foreground">Compare suas casas</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Charts and Recent Bets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProfitChart data={evolutionData} />
        <RecentBets apostas={apostasWithRelations} />
      </div>
    </Layout>
  );
};

export default Dashboard;
