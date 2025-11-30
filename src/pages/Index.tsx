import { Link } from 'react-router-dom';
import { Wallet, TrendingUp, TrendingDown, Target, Plus } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import StatCard from '@/components/dashboard/StatCard';
import RecentBets from '@/components/dashboard/RecentBets';
import ProfitChart from '@/components/charts/ProfitChart';
import { apostas, casas, getApostaWithRelations, evolutionData } from '@/data/mockData';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
  const apostasWithRelations = apostas.map(getApostaWithRelations);
  
  const totalGasto = apostas.reduce((acc, a) => acc + a.valorApostado, 0);
  const totalGanho = apostas.reduce((acc, a) => acc + a.valorGanho, 0);
  const saldoAtual = totalGanho - totalGasto;
  const totalApostas = apostas.length;

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

      {/* Charts and Recent Bets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProfitChart data={evolutionData} />
        <RecentBets apostas={apostasWithRelations} />
      </div>
    </Layout>
  );
};

export default Dashboard;
