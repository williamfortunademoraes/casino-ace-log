import { Link } from 'react-router-dom';
import { Wallet, TrendingUp, TrendingDown, Target, Plus, ShieldCheck, AlertTriangle, Calculator, Scale, Crown, Layers, Building2, Percent, Trophy, Sparkles } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import StatCard from '@/components/dashboard/StatCard';
import RecentBets from '@/components/dashboard/RecentBets';
import ProfitChart from '@/components/charts/ProfitChart';
import { AIInsights } from '@/components/insights/AIInsights';
import { apostas, casas, jogos, getApostaWithRelations, evolutionData, configuracaoLimites } from '@/data/mockData';
import { mockProviders } from '@/data/providersData';
import { mockAlertas } from '@/data/alertsData';
import { mockUserVIP, niveisVIP } from '@/data/gamificationData';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { analisarRTPJogo, getClassificacaoColor } from '@/utils/rtp';
import { cn } from '@/lib/utils';

const Dashboard = () => {
  const apostasWithRelations = apostas.map(getApostaWithRelations);
  
  const totalGasto = apostas.reduce((acc, a) => acc + a.valorApostado, 0);
  const totalGanho = apostas.reduce((acc, a) => acc + a.valorGanho, 0);
  const saldoAtual = totalGanho - totalGasto;
  const totalApostas = apostas.length;
  const lucroPercent = totalGasto > 0 ? ((saldoAtual / totalGasto) * 100) : 0;

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

  // Insights
  const jogoMaisLucrativo = [...jogos].sort((a, b) => b.lucroTotal - a.lucroTotal)[0];
  const providerMaisLucrativo = [...mockProviders].sort((a, b) => b.lucroTotal - a.lucroTotal)[0];
  const casaMaisUsada = [...casas].sort((a, b) => b.totalGasto - a.totalGasto)[0];
  
  // Alertas críticos
  const alertasCriticos = mockAlertas.filter(a => !a.lido && a.tipo === 'critico');
  const alertasMedios = mockAlertas.filter(a => !a.lido && a.tipo === 'medio');

  // VIP Progress
  const userVIP = mockUserVIP;
  const currentLevelIndex = niveisVIP.findIndex(n => n.nivel === userVIP.nivel);
  const vipProgress = (userVIP.xpAtual / userVIP.xpProximoNivel) * 100;

  return (
    <Layout>
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Acompanhe suas apostas em tempo real</p>
        </div>
        <div className="flex gap-2">
          <Link to="/vip">
            <Badge className="bg-gradient-to-r from-yellow-500 to-amber-600 text-white px-3 py-1 cursor-pointer hover:opacity-90">
              <Crown className="w-3 h-3 mr-1" />
              {niveisVIP[currentLevelIndex]?.nome} • {userVIP.xpAtual.toLocaleString()} XP
            </Badge>
          </Link>
          <Link to="/nova-aposta">
            <Button className="btn-primary flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Registrar Aposta
            </Button>
          </Link>
        </div>
      </div>

      {/* Alertas de Risco */}
      {(alertasCriticos.length > 0 || alertasMedios.length > 0) && (
        <div className="space-y-2 mb-6">
          {alertasCriticos.map(alerta => (
            <div key={alerta.id} className="card-glass p-4 border-l-4 border-red-500 bg-red-500/5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{alerta.titulo}</p>
                    <p className="text-xs text-muted-foreground">{alerta.descricao}</p>
                  </div>
                </div>
                <Link to="/alertas" className="text-xs text-primary hover:underline">Ver →</Link>
              </div>
            </div>
          ))}
          {alertasMedios.slice(0, 1).map(alerta => (
            <div key={alerta.id} className="card-glass p-4 border-l-4 border-yellow-500 bg-yellow-500/5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-500" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{alerta.titulo}</p>
                    <p className="text-xs text-muted-foreground">{alerta.descricao}</p>
                  </div>
                </div>
                <Link to="/alertas" className="text-xs text-primary hover:underline">Ver →</Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Alerta de Limite Diário */}
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
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
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
          title="Lucro %"
          value={lucroPercent}
          icon={<Percent className="w-6 h-6" />}
          trend={lucroPercent >= 0 ? 'up' : 'down'}
          isPercentage
          className="delay-400"
        />
        <StatCard
          title="Total Apostas"
          value={totalApostas}
          icon={<Target className="w-6 h-6" />}
          trend="neutral"
          subtitle={`${casas.length} casas`}
          className="delay-500 col-span-2 lg:col-span-1"
        />
      </div>

      {/* Insights Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Link to={`/jogos/${jogoMaisLucrativo?.id}`} className="card-glass p-4 hover:border-primary/50 transition-all group">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center text-2xl">
              {jogoMaisLucrativo?.imagemPromocional || '🎰'}
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Jogo Mais Lucrativo</p>
              <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">{jogoMaisLucrativo?.nome}</h4>
              <p className="text-sm text-green-500 font-semibold">+R$ {jogoMaisLucrativo?.lucroTotal.toLocaleString()}</p>
            </div>
          </div>
        </Link>
        <Link to="/providers" className="card-glass p-4 hover:border-primary/50 transition-all group">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
              <Layers className="w-6 h-6 text-purple-500" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Provider Mais Lucrativo</p>
              <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">{providerMaisLucrativo?.nome}</h4>
              <p className="text-sm text-green-500 font-semibold">+R$ {providerMaisLucrativo?.lucroTotal.toLocaleString()}</p>
            </div>
          </div>
        </Link>
        <Link to={`/casas/${casaMaisUsada?.id}`} className="card-glass p-4 hover:border-primary/50 transition-all group">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-2xl">
              {casaMaisUsada?.logo || '🏠'}
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Casa Mais Utilizada</p>
              <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">{casaMaisUsada?.nome}</h4>
              <p className="text-sm text-muted-foreground">R$ {casaMaisUsada?.totalGasto.toLocaleString()} apostados</p>
            </div>
          </div>
        </Link>
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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Link to="/calculadora" className="card-glass p-4 hover:border-primary/50 transition-all group">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
              <Calculator className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">Calculadora</h4>
              <p className="text-xs text-muted-foreground">Lucro e rollover</p>
            </div>
          </div>
        </Link>
        <Link to="/comparador" className="card-glass p-4 hover:border-primary/50 transition-all group">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center">
              <Scale className="w-5 h-5 text-cyan-500" />
            </div>
            <div>
              <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">Comparador</h4>
              <p className="text-xs text-muted-foreground">Compare casas</p>
            </div>
          </div>
        </Link>
        <Link to="/ranking" className="card-glass p-4 hover:border-primary/50 transition-all group">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-yellow-500/20 flex items-center justify-center">
              <Trophy className="w-5 h-5 text-yellow-500" />
            </div>
            <div>
              <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">Ranking</h4>
              <p className="text-xs text-muted-foreground">Posição #5</p>
            </div>
          </div>
        </Link>
        <Link to="/gamificacao" className="card-glass p-4 hover:border-primary/50 transition-all group">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-purple-500" />
            </div>
            <div>
              <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">Missões</h4>
              <p className="text-xs text-muted-foreground">2/6 hoje</p>
            </div>
          </div>
        </Link>
      </div>

      {/* AI Insights */}
      <div className="mb-6">
        <AIInsights />
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
