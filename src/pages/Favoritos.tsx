import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Building2, Gamepad2, Gift, Heart, TrendingUp, TrendingDown } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { casas, jogos, promocoes } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

const Favoritos = () => {
  const [casasFavoritas, setCasasFavoritas] = useState(
    casas.filter(c => c.favorito)
  );
  const [jogosFavoritos, setJogosFavoritos] = useState(
    jogos.filter(j => j.favorito)
  );
  const [promocoesFavoritas, setPromocoesFavoritas] = useState(
    promocoes.filter(p => p.favorito)
  );

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const toggleFavoritoCasa = (id: string) => {
    setCasasFavoritas(prev => prev.filter(c => c.id !== id));
  };

  const toggleFavoritoJogo = (id: string) => {
    setJogosFavoritos(prev => prev.filter(j => j.id !== id));
  };

  const toggleFavoritoPromocao = (id: string) => {
    setPromocoesFavoritas(prev => prev.filter(p => p.id !== id));
  };

  const totalFavoritos = casasFavoritas.length + jogosFavoritos.length + promocoesFavoritas.length;

  return (
    <Layout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground flex items-center gap-3">
          <Star className="w-8 h-8 text-yellow-500 fill-yellow-500" />
          Favoritos
        </h1>
        <p className="text-muted-foreground mt-1">
          {totalFavoritos} {totalFavoritos === 1 ? 'item favoritado' : 'itens favoritados'}
        </p>
      </div>

      <Tabs defaultValue="casas" className="space-y-6">
        <TabsList className="grid w-full max-w-lg grid-cols-3">
          <TabsTrigger value="casas" className="gap-2">
            <Building2 className="w-4 h-4" />
            Casas ({casasFavoritas.length})
          </TabsTrigger>
          <TabsTrigger value="jogos" className="gap-2">
            <Gamepad2 className="w-4 h-4" />
            Jogos ({jogosFavoritos.length})
          </TabsTrigger>
          <TabsTrigger value="promocoes" className="gap-2">
            <Gift className="w-4 h-4" />
            Promoções ({promocoesFavoritas.length})
          </TabsTrigger>
        </TabsList>

        {/* Casas Favoritas */}
        <TabsContent value="casas">
          {casasFavoritas.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {casasFavoritas.map((casa) => (
                <div key={casa.id} className="card-glass p-5 group hover:border-primary/50 transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <Link to={`/casas/${casa.id}`} className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center text-3xl">
                        {casa.logo}
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {casa.nome}
                        </h3>
                        {casa.autorizadaGoverno && (
                          <Badge className="mt-1 text-xs bg-primary/10 text-primary">
                            ✔️ Autorizada
                          </Badge>
                        )}
                      </div>
                    </Link>
                    <button
                      onClick={() => toggleFavoritoCasa(casa.id)}
                      className="p-2 rounded-lg text-yellow-500 hover:bg-yellow-500/10 transition-colors"
                    >
                      <Star className="w-5 h-5 fill-current" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-muted/50 rounded-xl">
                      <p className="text-xs text-muted-foreground">Gasto</p>
                      <p className="font-semibold text-foreground">{formatCurrency(casa.totalGasto)}</p>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-xl">
                      <p className="text-xs text-muted-foreground">Lucro</p>
                      <p className={cn(
                        'font-semibold flex items-center gap-1',
                        casa.lucroTotal >= 0 ? 'text-primary' : 'text-destructive'
                      )}>
                        {casa.lucroTotal >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                        {formatCurrency(casa.lucroTotal)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState 
              icon={Building2} 
              message="Nenhuma casa favoritada" 
              description="Favorite suas casas de apostas preferidas para acesso rápido"
            />
          )}
        </TabsContent>

        {/* Jogos Favoritos */}
        <TabsContent value="jogos">
          {jogosFavoritos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {jogosFavoritos.map((jogo) => (
                <div key={jogo.id} className="card-glass p-5 group hover:border-primary/50 transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <Link to={`/jogos/${jogo.id}`} className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center text-3xl">
                        {jogo.imagemPromocional}
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {jogo.nome}
                        </h3>
                        <Badge variant="outline" className="mt-1 text-xs">
                          {jogo.categoria}
                        </Badge>
                      </div>
                    </Link>
                    <button
                      onClick={() => toggleFavoritoJogo(jogo.id)}
                      className="p-2 rounded-lg text-yellow-500 hover:bg-yellow-500/10 transition-colors"
                    >
                      <Star className="w-5 h-5 fill-current" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-muted/50 rounded-xl">
                      <p className="text-xs text-muted-foreground">Jogadas</p>
                      <p className="font-semibold text-foreground">{jogo.totalJogadas}</p>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-xl">
                      <p className="text-xs text-muted-foreground">Lucro</p>
                      <p className={cn(
                        'font-semibold flex items-center gap-1',
                        jogo.lucroTotal >= 0 ? 'text-primary' : 'text-destructive'
                      )}>
                        {jogo.lucroTotal >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                        {formatCurrency(jogo.lucroTotal)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState 
              icon={Gamepad2} 
              message="Nenhum jogo favoritado" 
              description="Favorite seus jogos preferidos para acesso rápido"
            />
          )}
        </TabsContent>

        {/* Promoções Favoritas */}
        <TabsContent value="promocoes">
          {promocoesFavoritas.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {promocoesFavoritas.map((promocao) => {
                const casa = casas.find(c => c.id === promocao.casaId);
                return (
                  <div key={promocao.id} className="card-glass p-5 group hover:border-primary/50 transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-2xl">
                          {casa?.logo || '🎰'}
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">{casa?.nome}</p>
                          <h3 className="font-semibold text-foreground">{promocao.titulo}</h3>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleFavoritoPromocao(promocao.id)}
                        className="p-2 rounded-lg text-yellow-500 hover:bg-yellow-500/10 transition-colors"
                      >
                        <Star className="w-5 h-5 fill-current" />
                      </button>
                    </div>
                    <p className="text-sm text-muted-foreground">{promocao.descricao}</p>
                  </div>
                );
              })}
            </div>
          ) : (
            <EmptyState 
              icon={Gift} 
              message="Nenhuma promoção favoritada" 
              description="Favorite promoções para não perder as melhores ofertas"
            />
          )}
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

interface EmptyStateProps {
  icon: React.ElementType;
  message: string;
  description: string;
}

const EmptyState = ({ icon: Icon, message, description }: EmptyStateProps) => (
  <div className="text-center py-12">
    <Icon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
    <p className="text-foreground font-medium">{message}</p>
    <p className="text-sm text-muted-foreground mt-1">{description}</p>
  </div>
);

export default Favoritos;
