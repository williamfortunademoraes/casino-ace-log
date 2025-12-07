import { useState } from 'react';
import { TrendingUp, TrendingDown, Minus, Gamepad2, Clock, Trophy, ChevronRight } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { mockProviders } from '@/data/providersData';
import { jogos } from '@/data/mockData';
import { cn } from '@/lib/utils';

const Providers = () => {
  const [busca, setBusca] = useState('');
  const [providerSelecionado, setProviderSelecionado] = useState<string | null>(null);

  const providersFiltrados = mockProviders.filter(provider =>
    provider.nome.toLowerCase().includes(busca.toLowerCase())
  );

  const getTendenciaIcon = (tendencia: string) => {
    switch (tendencia) {
      case 'alta':
        return <TrendingUp className="w-4 h-4 text-green-400" />;
      case 'baixa':
        return <TrendingDown className="w-4 h-4 text-red-400" />;
      default:
        return <Minus className="w-4 h-4 text-yellow-400" />;
    }
  };

  const getTendenciaBadge = (tendencia: string) => {
    switch (tendencia) {
      case 'alta':
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Em Alta</Badge>;
      case 'baixa':
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Em Baixa</Badge>;
      default:
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Estável</Badge>;
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const provider = providerSelecionado 
    ? mockProviders.find(p => p.id === providerSelecionado) 
    : null;

  const jogosDoProvider = jogos.filter(j => 
    j.nome.toLowerCase().includes(provider?.jogoMaisLucrativo?.toLowerCase() || '')
  );

  if (provider) {
    return (
      <Layout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setProviderSelecionado(null)}
              className="p-2 rounded-xl bg-muted hover:bg-muted/80 transition-colors"
            >
              <ChevronRight className="w-5 h-5 rotate-180" />
            </button>
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-3xl">
              {provider.logo}
            </div>
            <div>
              <h1 className="text-2xl font-bold">{provider.nome}</h1>
              <p className="text-muted-foreground">{provider.descricao}</p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="card-glass">
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">Total Apostado</p>
                <p className="text-xl font-bold">{formatCurrency(provider.totalGasto)}</p>
              </CardContent>
            </Card>
            <Card className="card-glass">
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">Total Ganho</p>
                <p className="text-xl font-bold">{formatCurrency(provider.totalGanho)}</p>
              </CardContent>
            </Card>
            <Card className="card-glass">
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">Lucro</p>
                <p className={cn(
                  "text-xl font-bold",
                  provider.lucroTotal >= 0 ? "text-green-400" : "text-red-400"
                )}>
                  {formatCurrency(provider.lucroTotal)}
                </p>
              </CardContent>
            </Card>
            <Card className="card-glass">
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">RTP Médio</p>
                <p className="text-xl font-bold">{provider.rtpMedio}%</p>
              </CardContent>
            </Card>
          </div>

          {/* Details */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Best Times */}
            <Card className="card-glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Melhores Horários
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {provider.melhoresHorarios?.map((horario, idx) => (
                    <Badge key={idx} variant="outline" className="text-sm py-1 px-3">
                      {horario}
                    </Badge>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-3">
                  Horários com melhor desempenho histórico neste provedor
                </p>
              </CardContent>
            </Card>

            {/* Best Game */}
            <Card className="card-glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-400" />
                  Jogo Mais Lucrativo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 flex items-center justify-center">
                    <Gamepad2 className="w-6 h-6 text-yellow-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-lg">{provider.jogoMaisLucrativo}</p>
                    <p className="text-sm text-muted-foreground">Seu jogo com melhor resultado</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Trend */}
          <Card className="card-glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {getTendenciaIcon(provider.tendencia)}
                Tendência do Provedor
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                {getTendenciaBadge(provider.tendencia)}
                <p className="text-muted-foreground">
                  {provider.tendencia === 'alta' && 'Seus resultados estão melhorando neste provedor'}
                  {provider.tendencia === 'baixa' && 'Seus resultados estão piorando neste provedor'}
                  {provider.tendencia === 'estavel' && 'Seus resultados estão estáveis neste provedor'}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Games from provider */}
          <Card className="card-glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gamepad2 className="w-5 h-5 text-primary" />
                Jogos do Provedor ({provider.totalJogos})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {jogos.slice(0, 6).map((jogo) => (
                  <div 
                    key={jogo.id}
                    className="p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <p className="font-medium">{jogo.nome}</p>
                    <p className="text-sm text-muted-foreground">{jogo.categoria}</p>
                    <p className={cn(
                      "text-sm font-medium mt-1",
                      jogo.lucroTotal >= 0 ? "text-green-400" : "text-red-400"
                    )}>
                      {formatCurrency(jogo.lucroTotal)}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold">Provedores de Jogos</h1>
          <p className="text-muted-foreground">Estatísticas por provedor de jogos</p>
        </div>

        {/* Search */}
        <Input
          placeholder="Buscar provedor..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="max-w-md"
        />

        {/* Stats Summary */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="card-glass">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Total Provedores</p>
              <p className="text-2xl font-bold">{mockProviders.length}</p>
            </CardContent>
          </Card>
          <Card className="card-glass">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Mais Lucrativo</p>
              <p className="text-xl font-bold text-green-400">
                {mockProviders.reduce((a, b) => a.lucroTotal > b.lucroTotal ? a : b).nome}
              </p>
            </CardContent>
          </Card>
          <Card className="card-glass">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Maior RTP</p>
              <p className="text-xl font-bold text-blue-400">
                {mockProviders.reduce((a, b) => a.rtpMedio > b.rtpMedio ? a : b).nome}
              </p>
            </CardContent>
          </Card>
          <Card className="card-glass">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Em Alta</p>
              <p className="text-xl font-bold">
                {mockProviders.filter(p => p.tendencia === 'alta').length}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Providers Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {providersFiltrados.map((provider) => (
            <Card 
              key={provider.id} 
              className="card-glass cursor-pointer hover:border-primary/50 transition-all"
              onClick={() => setProviderSelecionado(provider.id)}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-2xl">
                      {provider.logo}
                    </div>
                    <div>
                      <h3 className="font-semibold">{provider.nome}</h3>
                      <p className="text-sm text-muted-foreground">{provider.totalJogos} jogos</p>
                    </div>
                  </div>
                  {getTendenciaIcon(provider.tendencia)}
                </div>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {provider.descricao}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Lucro</p>
                    <p className={cn(
                      "font-semibold",
                      provider.lucroTotal >= 0 ? "text-green-400" : "text-red-400"
                    )}>
                      {formatCurrency(provider.lucroTotal)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">RTP Médio</p>
                    <p className="font-semibold">{provider.rtpMedio}%</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  {getTendenciaBadge(provider.tendencia)}
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {providersFiltrados.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            Nenhum provedor encontrado
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Providers;
