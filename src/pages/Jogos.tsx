import { Link } from 'react-router-dom';
import { Gamepad2, TrendingUp, TrendingDown, Star } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { jogos, apostas } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { analisarRTPJogo } from '@/utils/rtp';
import RTPBadge from '@/components/rtp/RTPBadge';

const Jogos = () => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  // Agrupar por categoria
  const categorias = [...new Set(jogos.map(j => j.categoria))];

  return (
    <Layout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground flex items-center gap-3">
          <Gamepad2 className="w-8 h-8 text-primary" />
          Jogos
        </h1>
        <p className="text-muted-foreground">Acompanhe o desempenho em cada jogo</p>
      </div>

      {/* Filtros por Categoria */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Badge variant="secondary" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
          Todos ({jogos.length})
        </Badge>
        {categorias.map(cat => (
          <Badge 
            key={cat} 
            variant="outline" 
            className="cursor-pointer hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
          >
            {cat} ({jogos.filter(j => j.categoria === cat).length})
          </Badge>
        ))}
      </div>

      {/* Lista de Jogos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {jogos.map((jogo, index) => (
          <Link
            key={jogo.id}
            to={`/jogos/${jogo.id}`}
            className="card-glass p-5 hover:border-primary/50 transition-all group animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center text-3xl shadow-lg">
                  {jogo.imagemPromocional}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors flex items-center gap-2">
                    {jogo.nome}
                    {jogo.favorito && (
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    )}
                  </h3>
                  <Badge variant="outline" className="mt-1 text-xs">
                    {jogo.categoria}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="p-3 bg-muted/50 rounded-xl">
                <p className="text-xs text-muted-foreground">Jogadas</p>
                <p className="font-semibold text-foreground">{jogo.totalJogadas}</p>
              </div>
              <div className={cn(
                'p-3 rounded-xl',
                jogo.lucroTotal >= 0 ? 'bg-primary/10' : 'bg-destructive/10'
              )}>
                <p className="text-xs text-muted-foreground">Lucro</p>
                <p className={cn(
                  'font-semibold flex items-center gap-1',
                  jogo.lucroTotal >= 0 ? 'text-primary' : 'text-destructive'
                )}>
                  {jogo.lucroTotal >= 0 ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  {formatCurrency(jogo.lucroTotal)}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="text-center p-2 bg-muted/30 rounded-lg">
                <p className="text-xs text-muted-foreground">Gasto</p>
                <p className="text-sm font-medium text-foreground">{formatCurrency(jogo.totalGasto)}</p>
              </div>
              <div className="text-center p-2 bg-muted/30 rounded-lg">
                <p className="text-xs text-muted-foreground">Ganho</p>
                <p className="text-sm font-medium text-foreground">{formatCurrency(jogo.totalGanho)}</p>
              </div>
            </div>

            {/* RTP Badge */}
            <div className="flex justify-center">
              <RTPBadge 
                analysis={analisarRTPJogo(jogo, apostas.filter(a => a.jogoId === jogo.id))} 
                showDetails 
                size="sm"
              />
            </div>
          </Link>
        ))}
      </div>

      {jogos.length === 0 && (
        <div className="text-center py-12">
          <Gamepad2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Nenhum jogo cadastrado</p>
        </div>
      )}
    </Layout>
  );
};

export default Jogos;
