import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Aposta } from '@/types';
import { cn } from '@/lib/utils';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

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

  const getResultIcon = (resultado: string) => {
    switch (resultado) {
      case 'Vitória':
        return <ArrowUpRight className="w-4 h-4 text-primary" />;
      case 'Derrota':
        return <ArrowDownRight className="w-4 h-4 text-destructive" />;
      default:
        return <Minus className="w-4 h-4 text-warning" />;
    }
  };

  const getResultBadge = (resultado: string) => {
    switch (resultado) {
      case 'Vitória':
        return 'badge-success';
      case 'Derrota':
        return 'badge-loss';
      default:
        return 'badge-neutral';
    }
  };

  return (
    <div className="card-glass p-6 animate-slide-up delay-300">
      <h3 className="text-lg font-semibold text-foreground mb-4">Últimas Apostas</h3>
      <div className="space-y-3">
        {apostas.slice(0, 5).map((aposta, index) => (
          <div 
            key={aposta.id} 
            className={cn(
              'flex items-center justify-between p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-all cursor-pointer',
              'animate-fade-in',
            )}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center gap-4">
              <div className={cn(
                'w-10 h-10 rounded-lg flex items-center justify-center',
                aposta.lucro >= 0 ? 'bg-primary/20' : 'bg-destructive/20'
              )}>
                {getResultIcon(aposta.resultado)}
              </div>
              <div>
                <p className="font-medium text-foreground">{aposta.jogo?.nome || 'Jogo'}</p>
                <p className="text-sm text-muted-foreground">
                  {aposta.casa?.nome} • {format(new Date(aposta.data), "dd MMM, HH:mm", { locale: ptBR })}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className={cn(
                'font-semibold',
                aposta.lucro >= 0 ? 'text-primary' : 'text-destructive'
              )}>
                {aposta.lucro >= 0 ? '+' : ''}{formatCurrency(aposta.lucro)}
              </p>
              <span className={cn('text-xs', getResultBadge(aposta.resultado))}>
                {aposta.resultado}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentBets;
