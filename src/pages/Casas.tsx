import { Link } from 'react-router-dom';
import { Building2, TrendingUp, TrendingDown, ExternalLink, Star, ShieldCheck, ShieldAlert } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { casas } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

const Casas = () => {
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
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground flex items-center gap-3">
          <Building2 className="w-8 h-8 text-primary" />
          Casas de Apostas
        </h1>
        <p className="text-muted-foreground">Gerencie suas casas de apostas</p>
      </div>

      {/* Lista de Casas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {casas.map((casa, index) => (
          <Link
            key={casa.id}
            to={`/casas/${casa.id}`}
            className="card-glass p-5 hover:border-primary/50 transition-all group animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center text-3xl shadow-lg">
                  {casa.logo}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors flex items-center gap-2">
                    {casa.nome}
                    {casa.favorito && (
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    )}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    {casa.autorizadaGoverno ? (
                      <Badge className="text-xs bg-primary/10 text-primary gap-1">
                        <ShieldCheck className="w-3 h-3" />
                        Autorizada
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-xs text-yellow-500 border-yellow-500/50 gap-1">
                        <ShieldAlert className="w-3 h-3" />
                        Não autorizada
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 bg-muted/50 rounded-xl">
                <p className="text-xs text-muted-foreground">Gasto</p>
                <p className="font-semibold text-foreground text-sm">{formatCurrency(casa.totalGasto)}</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-xl">
                <p className="text-xs text-muted-foreground">Ganho</p>
                <p className="font-semibold text-foreground text-sm">{formatCurrency(casa.totalGanho)}</p>
              </div>
              <div className={cn(
                'p-3 rounded-xl',
                casa.lucroTotal >= 0 ? 'bg-primary/10' : 'bg-destructive/10'
              )}>
                <p className="text-xs text-muted-foreground">Lucro</p>
                <p className={cn(
                  'font-semibold text-sm flex items-center gap-1',
                  casa.lucroTotal >= 0 ? 'text-primary' : 'text-destructive'
                )}>
                  {casa.lucroTotal >= 0 ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  {formatCurrency(casa.lucroTotal)}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {casas.length === 0 && (
        <div className="text-center py-12">
          <Building2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Nenhuma casa cadastrada</p>
        </div>
      )}
    </Layout>
  );
};

export default Casas;
