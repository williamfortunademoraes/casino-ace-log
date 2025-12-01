import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, TrendingDown, Minus, ShieldCheck } from 'lucide-react';
import { Aposta } from '@/types';
import { cn } from '@/lib/utils';

interface RecentBetsProps {
  apostas: Aposta[];
}

const RecentBets = ({ apostas }: RecentBetsProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const getResultIcon = (resultado: string, lucro: number) => {
    if (resultado === 'Vitória') return <TrendingUp className="w-4 h-4 text-primary" />;
    if (resultado === 'Derrota') return <TrendingDown className="w-4 h-4 text-destructive" />;
    return <Minus className="w-4 h-4 text-muted-foreground" />;
  };

  const recentApostas = apostas.slice(0, 5);

  return (
    <div className="card-glass p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Últimas Apostas</h3>
        <Link 
          to="/relatorios" 
          className="text-sm text-primary hover:text-primary/80 flex items-center gap-1 transition-colors"
        >
          Ver todas <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="space-y-3">
        {recentApostas.map((aposta, index) => (
          <div
            key={aposta.id}
            className={cn(
              'flex items-center justify-between p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-all animate-fade-in group',
            )}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-xl">
                {aposta.jogo?.imagemPromocional || '🎰'}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-medium text-foreground">{aposta.jogo?.nome || 'Jogo'}</p>
                  {aposta.casa?.autorizadaGoverno && (
                    <ShieldCheck className="w-3 h-3 text-primary" />
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    {aposta.casa?.logo} {aposta.casa?.nome || 'Casa'}
                  </span>
                  <span>•</span>
                  <span>{formatDate(aposta.data)}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className={cn(
                  'font-semibold flex items-center gap-1 justify-end',
                  aposta.lucro > 0 ? 'text-primary' : aposta.lucro < 0 ? 'text-destructive' : 'text-muted-foreground'
                )}>
                  {getResultIcon(aposta.resultado, aposta.lucro)}
                  {aposta.lucro > 0 ? '+' : ''}{formatCurrency(aposta.lucro)}
                </p>
                <p className="text-xs text-muted-foreground">
                  Apostou {formatCurrency(aposta.valorApostado)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {recentApostas.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">Nenhuma aposta registrada</p>
        </div>
      )}
    </div>
  );
};

export default RecentBets;
