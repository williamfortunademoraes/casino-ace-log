import { Link } from 'react-router-dom';
import { Building2, ExternalLink, TrendingUp, TrendingDown } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { casas } from '@/data/mockData';
import { cn } from '@/lib/utils';

const Casas = () => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const totalLucro = casas.reduce((acc, c) => acc + c.lucroTotal, 0);

  return (
    <Layout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Casas de Apostas</h1>
        <p className="text-muted-foreground">
          {casas.length} casas • Lucro total: {' '}
          <span className={cn(totalLucro >= 0 ? 'text-primary' : 'text-destructive')}>
            {formatCurrency(totalLucro)}
          </span>
        </p>
      </div>

      {/* List */}
      <div className="space-y-4">
        {casas.map((casa, index) => (
          <Link
            key={casa.id}
            to={`/casas/${casa.id}`}
            className="card-glass p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-card/90 transition-all animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center gap-4">
              <div className={cn(
                'w-14 h-14 rounded-xl flex items-center justify-center',
                casa.lucroTotal >= 0 ? 'bg-primary/20' : 'bg-destructive/20'
              )}>
                <Building2 className={cn(
                  'w-7 h-7',
                  casa.lucroTotal >= 0 ? 'text-primary' : 'text-destructive'
                )} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-foreground text-lg">{casa.nome}</h3>
                  <a 
                    href={casa.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
                <p className="text-sm text-muted-foreground">
                  Gasto: {formatCurrency(casa.totalGasto)} • Ganho: {formatCurrency(casa.totalGanho)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 ml-auto">
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Lucro Total</p>
                <div className="flex items-center gap-2">
                  {casa.lucroTotal >= 0 ? (
                    <TrendingUp className="w-5 h-5 text-primary" />
                  ) : (
                    <TrendingDown className="w-5 h-5 text-destructive" />
                  )}
                  <p className={cn(
                    'text-xl font-bold',
                    casa.lucroTotal >= 0 ? 'text-primary' : 'text-destructive'
                  )}>
                    {casa.lucroTotal >= 0 ? '+' : ''}{formatCurrency(casa.lucroTotal)}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Layout>
  );
};

export default Casas;
