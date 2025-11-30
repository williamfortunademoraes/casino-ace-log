import { useState } from 'react';
import { BarChart3, TrendingUp, Building2, LineChart } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import MonthlyProfitChart from '@/components/charts/MonthlyProfitChart';
import ProfitChart from '@/components/charts/ProfitChart';
import { jogos, casas, monthlyProfitData, evolutionData } from '@/data/mockData';
import { cn } from '@/lib/utils';

type ReportTab = 'mensal' | 'jogos' | 'casas' | 'evolucao';

const tabs: { id: ReportTab; label: string; icon: typeof BarChart3 }[] = [
  { id: 'mensal', label: 'Lucro Mensal', icon: BarChart3 },
  { id: 'jogos', label: 'Jogos Lucrativos', icon: TrendingUp },
  { id: 'casas', label: 'Casas Jogadas', icon: Building2 },
  { id: 'evolucao', label: 'Evolução', icon: LineChart },
];

const Relatorios = () => {
  const [activeTab, setActiveTab] = useState<ReportTab>('mensal');

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const jogosSorted = [...jogos].sort((a, b) => b.lucroTotal - a.lucroTotal);
  const casasSorted = [...casas].sort((a, b) => b.totalGasto - a.totalGasto);

  return (
    <Layout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Relatórios</h1>
        <p className="text-muted-foreground">Análise detalhada do seu desempenho</p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all',
              activeTab === tab.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            )}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="animate-fade-in">
        {activeTab === 'mensal' && (
          <MonthlyProfitChart data={monthlyProfitData} />
        )}

        {activeTab === 'jogos' && (
          <div className="card-glass p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Jogos Mais Lucrativos</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">#</th>
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">Jogo</th>
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">Categoria</th>
                    <th className="text-right py-3 px-4 text-muted-foreground font-medium">Jogadas</th>
                    <th className="text-right py-3 px-4 text-muted-foreground font-medium">Gasto</th>
                    <th className="text-right py-3 px-4 text-muted-foreground font-medium">Ganho</th>
                    <th className="text-right py-3 px-4 text-muted-foreground font-medium">Lucro</th>
                  </tr>
                </thead>
                <tbody>
                  {jogosSorted.map((jogo, index) => (
                    <tr key={jogo.id} className="table-row-hover border-b border-border/50">
                      <td className="py-4 px-4 text-muted-foreground">{index + 1}</td>
                      <td className="py-4 px-4 font-medium text-foreground">{jogo.nome}</td>
                      <td className="py-4 px-4">
                        <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                          {jogo.categoria}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right text-foreground">{jogo.totalJogadas}</td>
                      <td className="py-4 px-4 text-right text-foreground">{formatCurrency(jogo.totalGasto)}</td>
                      <td className="py-4 px-4 text-right text-foreground">{formatCurrency(jogo.totalGanho)}</td>
                      <td className={cn(
                        'py-4 px-4 text-right font-semibold',
                        jogo.lucroTotal >= 0 ? 'text-primary' : 'text-destructive'
                      )}>
                        {jogo.lucroTotal >= 0 ? '+' : ''}{formatCurrency(jogo.lucroTotal)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'casas' && (
          <div className="card-glass p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Casas Mais Jogadas</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">#</th>
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">Casa</th>
                    <th className="text-right py-3 px-4 text-muted-foreground font-medium">Total Gasto</th>
                    <th className="text-right py-3 px-4 text-muted-foreground font-medium">Total Ganho</th>
                    <th className="text-right py-3 px-4 text-muted-foreground font-medium">Lucro</th>
                  </tr>
                </thead>
                <tbody>
                  {casasSorted.map((casa, index) => (
                    <tr key={casa.id} className="table-row-hover border-b border-border/50">
                      <td className="py-4 px-4 text-muted-foreground">{index + 1}</td>
                      <td className="py-4 px-4 font-medium text-foreground">{casa.nome}</td>
                      <td className="py-4 px-4 text-right text-foreground">{formatCurrency(casa.totalGasto)}</td>
                      <td className="py-4 px-4 text-right text-foreground">{formatCurrency(casa.totalGanho)}</td>
                      <td className={cn(
                        'py-4 px-4 text-right font-semibold',
                        casa.lucroTotal >= 0 ? 'text-primary' : 'text-destructive'
                      )}>
                        {casa.lucroTotal >= 0 ? '+' : ''}{formatCurrency(casa.lucroTotal)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'evolucao' && (
          <ProfitChart data={evolutionData} title="Evolução da Banca" />
        )}
      </div>
    </Layout>
  );
};

export default Relatorios;
