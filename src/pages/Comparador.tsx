import { useState, useMemo } from 'react';
import { Scale, Trophy, TrendingUp, ShieldCheck, Gift, BarChart3 } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { casas, jogos, apostas, promocoes } from '@/data/mockData';
import { calcularRTP } from '@/utils/rtp';
import { cn } from '@/lib/utils';

const Comparador = () => {
  const [selectedCasas, setSelectedCasas] = useState<string[]>([]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const toggleCasa = (casaId: string) => {
    setSelectedCasas(prev => 
      prev.includes(casaId) 
        ? prev.filter(id => id !== casaId)
        : [...prev, casaId]
    );
  };

  const comparacaoData = useMemo(() => {
    return selectedCasas.map(casaId => {
      const casa = casas.find(c => c.id === casaId);
      if (!casa) return null;

      const apostasCasa = apostas.filter(a => a.casaId === casaId);
      const rtpUsuario = calcularRTP(casa.totalGanho, casa.totalGasto);
      
      // Jogos mais lucrativos nesta casa
      const lucrosPorJogo = apostas
        .filter(a => a.casaId === casaId)
        .reduce((acc, aposta) => {
          const jogo = jogos.find(j => j.id === aposta.jogoId);
          if (jogo) {
            if (!acc[jogo.id]) {
              acc[jogo.id] = { jogo, lucro: 0 };
            }
            acc[jogo.id].lucro += aposta.lucro;
          }
          return acc;
        }, {} as Record<string, { jogo: typeof jogos[0], lucro: number }>);

      const jogosMaisLucrativos = Object.values(lucrosPorJogo)
        .sort((a, b) => b.lucro - a.lucro)
        .slice(0, 3);

      const promocoesCasa = promocoes.filter(p => p.casaId === casaId && p.ativa);

      return {
        casa,
        rtpUsuario,
        totalApostas: apostasCasa.length,
        jogosMaisLucrativos,
        promocoesAtivas: promocoesCasa,
      };
    }).filter(Boolean);
  }, [selectedCasas]);

  const ranking = useMemo(() => {
    return [...casas]
      .sort((a, b) => b.lucroTotal - a.lucroTotal)
      .map((casa, index) => ({
        casa,
        posicao: index + 1,
        rtp: calcularRTP(casa.totalGanho, casa.totalGasto),
      }));
  }, []);

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Comparador de Casas</h1>
        <p className="text-muted-foreground">Compare o desempenho entre diferentes casas de apostas</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Seleção de Casas */}
        <Card className="card-glass lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Scale className="w-5 h-5 text-primary" />
              Selecionar Casas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {casas.map(casa => (
              <label
                key={casa.id}
                className={cn(
                  'flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all',
                  selectedCasas.includes(casa.id) 
                    ? 'bg-primary/20 border border-primary/30' 
                    : 'bg-muted/50 hover:bg-muted'
                )}
              >
                <Checkbox
                  checked={selectedCasas.includes(casa.id)}
                  onCheckedChange={() => toggleCasa(casa.id)}
                />
                <span className="text-2xl">{casa.logo}</span>
                <div className="flex-1">
                  <p className="font-medium text-foreground">{casa.nome}</p>
                  <p className={cn(
                    'text-sm',
                    casa.lucroTotal >= 0 ? 'text-primary' : 'text-destructive'
                  )}>
                    {casa.lucroTotal >= 0 ? '+' : ''}{formatCurrency(casa.lucroTotal)}
                  </p>
                </div>
                {casa.autorizadaGoverno && (
                  <ShieldCheck className="w-4 h-4 text-primary" />
                )}
              </label>
            ))}
          </CardContent>
        </Card>

        {/* Comparação */}
        <div className="lg:col-span-2 space-y-6">
          {selectedCasas.length < 2 ? (
            <Card className="card-glass">
              <CardContent className="py-12 text-center">
                <Scale className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
                <p className="text-muted-foreground">
                  Selecione pelo menos 2 casas para comparar
                </p>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Tabela Comparativa */}
              <Card className="card-glass">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    Comparação Detalhada
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-2 text-muted-foreground font-medium">Métrica</th>
                          {comparacaoData.map(data => (
                            <th key={data!.casa.id} className="text-center py-3 px-2 text-foreground font-medium">
                              <span className="text-xl mr-2">{data!.casa.logo}</span>
                              {data!.casa.nome}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-border/50">
                          <td className="py-3 px-2 text-muted-foreground">Total Apostado</td>
                          {comparacaoData.map(data => (
                            <td key={data!.casa.id} className="py-3 px-2 text-center font-medium">
                              {formatCurrency(data!.casa.totalGasto)}
                            </td>
                          ))}
                        </tr>
                        <tr className="border-b border-border/50">
                          <td className="py-3 px-2 text-muted-foreground">Total Ganho</td>
                          {comparacaoData.map(data => (
                            <td key={data!.casa.id} className="py-3 px-2 text-center font-medium">
                              {formatCurrency(data!.casa.totalGanho)}
                            </td>
                          ))}
                        </tr>
                        <tr className="border-b border-border/50">
                          <td className="py-3 px-2 text-muted-foreground">Lucro Total</td>
                          {comparacaoData.map(data => (
                            <td key={data!.casa.id} className={cn(
                              'py-3 px-2 text-center font-bold',
                              data!.casa.lucroTotal >= 0 ? 'text-primary' : 'text-destructive'
                            )}>
                              {data!.casa.lucroTotal >= 0 ? '+' : ''}{formatCurrency(data!.casa.lucroTotal)}
                            </td>
                          ))}
                        </tr>
                        <tr className="border-b border-border/50">
                          <td className="py-3 px-2 text-muted-foreground">RTP Usuário</td>
                          {comparacaoData.map(data => (
                            <td key={data!.casa.id} className={cn(
                              'py-3 px-2 text-center font-bold',
                              data!.rtpUsuario >= 100 ? 'text-primary' : 'text-destructive'
                            )}>
                              {data!.rtpUsuario.toFixed(1)}%
                            </td>
                          ))}
                        </tr>
                        <tr className="border-b border-border/50">
                          <td className="py-3 px-2 text-muted-foreground">Autorização Gov.</td>
                          {comparacaoData.map(data => (
                            <td key={data!.casa.id} className="py-3 px-2 text-center">
                              {data!.casa.autorizadaGoverno ? (
                                <span className="inline-flex items-center gap-1 text-primary">
                                  <ShieldCheck className="w-4 h-4" /> Sim
                                </span>
                              ) : (
                                <span className="text-muted-foreground">Não</span>
                              )}
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="py-3 px-2 text-muted-foreground">Promoções Ativas</td>
                          {comparacaoData.map(data => (
                            <td key={data!.casa.id} className="py-3 px-2 text-center">
                              <span className="inline-flex items-center gap-1">
                                <Gift className="w-4 h-4 text-accent" />
                                {data!.promocoesAtivas.length}
                              </span>
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* Jogos Mais Lucrativos por Casa */}
              <Card className="card-glass">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    Jogos Mais Lucrativos por Casa
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {comparacaoData.map(data => (
                      <div key={data!.casa.id} className="p-4 rounded-xl bg-muted/30">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-xl">{data!.casa.logo}</span>
                          <span className="font-medium text-foreground">{data!.casa.nome}</span>
                        </div>
                        <div className="space-y-2">
                          {data!.jogosMaisLucrativos.length > 0 ? (
                            data!.jogosMaisLucrativos.map((item, idx) => (
                              <div key={item.jogo.id} className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">
                                  {idx + 1}. {item.jogo.imagemPromocional} {item.jogo.nome}
                                </span>
                                <span className={cn(
                                  'font-medium',
                                  item.lucro >= 0 ? 'text-primary' : 'text-destructive'
                                )}>
                                  {item.lucro >= 0 ? '+' : ''}{formatCurrency(item.lucro)}
                                </span>
                              </div>
                            ))
                          ) : (
                            <p className="text-sm text-muted-foreground">Nenhuma aposta registrada</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {/* Ranking Geral */}
          <Card className="card-glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                Ranking de Casas Mais Lucrativas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {ranking.map(({ casa, posicao, rtp }) => (
                  <div 
                    key={casa.id}
                    className={cn(
                      'flex items-center gap-4 p-3 rounded-xl',
                      posicao === 1 ? 'bg-yellow-500/10 border border-yellow-500/20' :
                      posicao === 2 ? 'bg-gray-400/10 border border-gray-400/20' :
                      posicao === 3 ? 'bg-amber-600/10 border border-amber-600/20' :
                      'bg-muted/30'
                    )}
                  >
                    <div className={cn(
                      'w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm',
                      posicao === 1 ? 'bg-yellow-500 text-yellow-950' :
                      posicao === 2 ? 'bg-gray-400 text-gray-900' :
                      posicao === 3 ? 'bg-amber-600 text-amber-950' :
                      'bg-muted text-muted-foreground'
                    )}>
                      {posicao}
                    </div>
                    <span className="text-xl">{casa.logo}</span>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{casa.nome}</p>
                      <p className="text-xs text-muted-foreground">RTP: {rtp.toFixed(1)}%</p>
                    </div>
                    <div className="text-right">
                      <p className={cn(
                        'font-bold',
                        casa.lucroTotal >= 0 ? 'text-primary' : 'text-destructive'
                      )}>
                        {casa.lucroTotal >= 0 ? '+' : ''}{formatCurrency(casa.lucroTotal)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Comparador;
