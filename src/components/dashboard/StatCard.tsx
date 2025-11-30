import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  subtitle?: string;
  className?: string;
}

const StatCard = ({ title, value, icon, trend, subtitle, className }: StatCardProps) => {
  const formatValue = (val: string | number) => {
    if (typeof val === 'number') {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(val);
    }
    return val;
  };

  return (
    <div className={cn('stat-card animate-slide-up', className)}>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className={cn(
            'w-12 h-12 rounded-xl flex items-center justify-center',
            trend === 'up' && 'bg-primary/20 text-primary',
            trend === 'down' && 'bg-destructive/20 text-destructive',
            (!trend || trend === 'neutral') && 'bg-muted text-muted-foreground'
          )}>
            {icon}
          </div>
          {trend && (
            <div className={cn(
              'flex items-center gap-1 text-sm font-medium',
              trend === 'up' && 'text-primary',
              trend === 'down' && 'text-destructive',
              trend === 'neutral' && 'text-muted-foreground'
            )}>
              {trend === 'up' && <TrendingUp className="w-4 h-4" />}
              {trend === 'down' && <TrendingDown className="w-4 h-4" />}
              {trend === 'neutral' && <Minus className="w-4 h-4" />}
            </div>
          )}
        </div>
        <p className="text-sm text-muted-foreground mb-1">{title}</p>
        <p className={cn(
          'text-2xl lg:text-3xl font-bold',
          trend === 'up' && 'text-primary',
          trend === 'down' && 'text-destructive',
          (!trend || trend === 'neutral') && 'text-foreground'
        )}>
          {formatValue(value)}
        </p>
        {subtitle && (
          <p className="text-xs text-muted-foreground mt-2">{subtitle}</p>
        )}
      </div>
    </div>
  );
};

export default StatCard;
