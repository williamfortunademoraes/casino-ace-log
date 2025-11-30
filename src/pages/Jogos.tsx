import { Link } from 'react-router-dom';
import { Gamepad2, TrendingUp, TrendingDown, Hash } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { jogos } from '@/data/mockData';
import { cn } from '@/lib/utils';

const Jogos = () => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const totalLucro = jogos.reduce((acc, j) => acc + j.lucroTotal, 0);
  const totalJogadas = jogos.reduce((acc, j) => acc + j.totalJogadas, 0);

  const categorias = [...new Set(jogos.map(j => j.categoria))];

  return (
    <Layout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Jogos</h1>
        <p className="text-muted-foreground">
          {jogos.length} jogos • {totalJogadas} jogadas • Lucro: {' '}
          <span className={cn(totalLucro >= 0 ? 'text-primary' : 'text-destructive')}>
            {formatCurrency(totalLucro)}
          </span>
        </p>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categorias.map((cat) => (
          <span key={cat} className="px-4 py-2 rounded-full bg-muted text-sm font-medium text-muted-foreground">
            {cat}
          </span>
        ))}
      </div>

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {jogos.map((jogo, index) => (
          <Link
            key={jogo.id}
            to={`/jogos/${jogo.id}`}
            className="card-glass p-6 hover:bg-card/90 transition-all animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className={cn(
                  'w-12 h-12 rounded-xl flex items-center justify-center',
                  jogo.lucroTotal >= 0 ? 'bg-primary/20' : 'bg-destructive/20'
                )}>
                  <Gamepad2 className={cn(
                    'w-6 h-6',
                    jogo.lucroTotal >= 0 ? 'text-primary' : 'text-destructive'
                  )} />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-lg">{jogo.nome}</h3>
                  <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                    {jogo.categoria}
                  </span>
                </div>
              </div>
              {jogo.lucroTotal >= 0 ? (
                <TrendingUp className="w-5 h-5 text-primary" />
              ) : (
                <TrendingDown className="w-5 h-5 text-destructive" />
              )}
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Jogadas</p>
                <div className="flex items-center gap-1">
                  <Hash className="w-4 h-4 text-muted-foreground" />
                  <span className="font-semibold text-foreground">{jogo.totalJogadas}</span>
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Gasto</p>
                <span className="font-semibold text-foreground">{formatCurrency(jogo.totalGasto)}</span>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Lucro</p>
                <span className={cn(
                  'font-bold',
                  jogo.lucroTotal >= 0 ? 'text-primary' : 'text-destructive'
                )}>
                  {jogo.lucroTotal >= 0 ? '+' : ''}{formatCurrency(jogo.lucroTotal)}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Layout>
  );
};

export default Jogos;
