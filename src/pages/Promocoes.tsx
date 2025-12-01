import { useState } from 'react';
import { Gift, Star, Clock, Percent, Info, Heart } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { promocoes, casas } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const tipoLabels = {
  bonus_deposito: { label: 'Bônus Depósito', color: 'bg-primary/20 text-primary' },
  giros_gratis: { label: 'Giros Grátis', color: 'bg-accent/20 text-accent' },
  cashback: { label: 'Cashback', color: 'bg-green-500/20 text-green-400' },
  outro: { label: 'Outro', color: 'bg-muted text-muted-foreground' },
};

const Promocoes = () => {
  const [favoritos, setFavoritos] = useState<string[]>(
    promocoes.filter(p => p.favorito).map(p => p.id)
  );
  const [filtroTipo, setFiltroTipo] = useState<string | null>(null);

  const toggleFavorito = (id: string) => {
    setFavoritos(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatDate = (date: Date | undefined) => {
    if (!date) return 'Sem prazo';
    return new Intl.DateTimeFormat('pt-BR').format(date);
  };

  const diasRestantes = (date: Date | undefined) => {
    if (!date) return null;
    const hoje = new Date();
    const diff = Math.ceil((date.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24));
    return diff;
  };

  const promocoesFiltradas = filtroTipo 
    ? promocoes.filter(p => p.tipo === filtroTipo)
    : promocoes;

  return (
    <Layout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground flex items-center gap-3">
          <Gift className="w-8 h-8 text-primary" />
          Promoções & Giros Grátis
        </h1>
        <p className="text-muted-foreground mt-1">Aproveite as melhores ofertas das casas de apostas</p>
      </div>

      {/* Dica de Banca Grátis */}
      <div className="card-glass p-4 mb-6 border-l-4 border-primary">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-primary mt-0.5" />
          <div>
            <h3 className="font-semibold text-foreground">💡 Dica: Banca Grátis</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Aproveite bônus de boas-vindas para construir sua banca sem risco. 
              Cumpra o rollover com apostas de baixo risco e retire os lucros!
            </p>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Button
          variant={filtroTipo === null ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFiltroTipo(null)}
          className="rounded-full"
        >
          Todas
        </Button>
        {Object.entries(tipoLabels).map(([tipo, { label }]) => (
          <Button
            key={tipo}
            variant={filtroTipo === tipo ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFiltroTipo(tipo)}
            className="rounded-full"
          >
            {label}
          </Button>
        ))}
      </div>

      {/* Lista de Promoções */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {promocoesFiltradas.map((promocao) => {
          const casa = casas.find(c => c.id === promocao.casaId);
          const dias = diasRestantes(promocao.dataExpiracao);
          const isFavorito = favoritos.includes(promocao.id);
          const tipoInfo = tipoLabels[promocao.tipo];

          return (
            <div 
              key={promocao.id} 
              className="card-glass p-5 hover:border-primary/50 transition-all group"
            >
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
                  onClick={() => toggleFavorito(promocao.id)}
                  className={cn(
                    'p-2 rounded-lg transition-colors',
                    isFavorito ? 'text-red-500 bg-red-500/10' : 'text-muted-foreground hover:text-red-500'
                  )}
                >
                  <Heart className={cn('w-5 h-5', isFavorito && 'fill-current')} />
                </button>
              </div>

              <p className="text-sm text-muted-foreground mb-4">{promocao.descricao}</p>

              <div className="flex flex-wrap items-center gap-2 mb-4">
                <Badge className={tipoInfo.color}>
                  {tipoInfo.label}
                </Badge>
                {promocao.rollover && (
                  <Badge variant="outline" className="gap-1">
                    <Percent className="w-3 h-3" />
                    Rollover {promocao.rollover}x
                  </Badge>
                )}
                {dias !== null && (
                  <Badge 
                    variant="outline" 
                    className={cn(
                      'gap-1',
                      dias <= 3 && 'border-destructive text-destructive'
                    )}
                  >
                    <Clock className="w-3 h-3" />
                    {dias <= 0 ? 'Expirado' : `${dias} dias`}
                  </Badge>
                )}
              </div>

              <div className="flex items-center justify-between">
                {promocao.valor && (
                  <span className="text-lg font-bold text-primary">
                    {promocao.tipo === 'cashback' ? `${promocao.valor}%` : `Até ${formatCurrency(promocao.valor)}`}
                  </span>
                )}
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      Como funciona
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{promocao.titulo}</DialogTitle>
                      <DialogDescription>{promocao.descricao}</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 mt-4">
                      <div>
                        <h4 className="font-medium text-foreground mb-2">📋 Regras:</h4>
                        <p className="text-sm text-muted-foreground">{promocao.comoFunciona}</p>
                      </div>
                      {promocao.rollover && (
                        <div className="p-3 bg-muted rounded-lg">
                          <p className="text-sm">
                            <strong>Rollover:</strong> {promocao.rollover}x o valor do bônus
                          </p>
                        </div>
                      )}
                      {promocao.dataExpiracao && (
                        <div className="p-3 bg-muted rounded-lg">
                          <p className="text-sm">
                            <strong>Expira em:</strong> {formatDate(promocao.dataExpiracao)}
                          </p>
                        </div>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          );
        })}
      </div>

      {promocoesFiltradas.length === 0 && (
        <div className="text-center py-12">
          <Gift className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Nenhuma promoção encontrada</p>
        </div>
      )}
    </Layout>
  );
};

export default Promocoes;
