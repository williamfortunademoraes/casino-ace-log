import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, Clock, Gamepad2, AlertTriangle, TrendingUp, Loader2, Sparkles, Target, Ban } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { jogos, casas, apostas } from '@/data/mockData';

interface AIInsightsData {
  melhorHorario: string;
  jogosRecomendados: string[];
  jogosEvitar: string[];
  gestaoBanca: string;
  alertaRisco: string | null;
  proximosPassos: string[];
  resumoGeral: string;
}

export const AIInsights = () => {
  const [insights, setInsights] = useState<AIInsightsData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateInsights = async () => {
    setLoading(true);
    setError(null);

    // Calculate stats from mock data
    const totalApostado = apostas.reduce((sum, a) => sum + a.valorApostado, 0);
    const totalGanho = apostas.reduce((sum, a) => sum + a.valorGanho, 0);
    const lucro = totalGanho - totalApostado;
    const lucroPorcentagem = totalApostado > 0 ? ((lucro / totalApostado) * 100).toFixed(1) : 0;
    const rtpMedio = totalApostado > 0 ? ((totalGanho / totalApostado) * 100).toFixed(1) : 0;

    const stats = {
      bancaAtual: lucro,
      totalApostado,
      totalGanho,
      lucro,
      lucroPorcentagem,
      rtpMedio,
      jogos: jogos.map(j => ({
        nome: j.nome,
        categoria: j.categoria,
        totalGasto: j.totalGasto,
        totalGanho: j.totalGanho,
      })),
      casas: casas.map(c => ({
        nome: c.nome,
        totalGasto: c.totalGasto,
        totalGanho: c.totalGanho,
      })),
      ultimasApostas: apostas.slice(0, 10).map(a => {
        const jogo = jogos.find(j => j.id === a.jogoId);
        const casa = casas.find(c => c.id === a.casaId);
        return {
          jogo: jogo?.nome || 'Desconhecido',
          casa: casa?.nome || 'Desconhecida',
          valorApostado: a.valorApostado,
          valorGanho: a.valorGanho,
          resultado: a.resultado,
        };
      }),
    };

    try {
      const { data, error: fnError } = await supabase.functions.invoke('ai-insights', {
        body: { stats },
      });

      if (fnError) {
        throw new Error(fnError.message);
      }

      if (data.error) {
        throw new Error(data.error);
      }

      setInsights(data.insights);
    } catch (err) {
      console.error('Error generating insights:', err);
      setError(err instanceof Error ? err.message : 'Erro ao gerar insights');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Brain className="w-5 h-5 text-primary" />
          Insights com IA
        </CardTitle>
        <Button 
          onClick={generateInsights} 
          disabled={loading}
          variant="outline"
          size="sm"
          className="gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Analisando...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              Gerar Insights
            </>
          )}
        </Button>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
            {error}
          </div>
        )}

        {!insights && !loading && !error && (
          <div className="text-center py-8 text-muted-foreground">
            <Brain className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>Clique em "Gerar Insights" para receber análises personalizadas baseadas em IA</p>
          </div>
        )}

        {insights && (
          <div className="space-y-4">
            {/* Resumo Geral */}
            <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
              <p className="text-sm text-foreground">{insights.resumoGeral}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Melhor Horário */}
              <div className="p-4 bg-accent/50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="font-medium text-foreground">Melhor Horário</span>
                </div>
                <p className="text-sm text-muted-foreground">{insights.melhorHorario}</p>
              </div>

              {/* Gestão de Banca */}
              <div className="p-4 bg-accent/50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  <span className="font-medium text-foreground">Gestão de Banca</span>
                </div>
                <p className="text-sm text-muted-foreground">{insights.gestaoBanca}</p>
              </div>

              {/* Jogos Recomendados */}
              <div className="p-4 bg-accent/50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Gamepad2 className="w-4 h-4 text-primary" />
                  <span className="font-medium text-foreground">Jogos Recomendados</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {insights.jogosRecomendados.map((jogo, i) => (
                    <span key={i} className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-full">
                      {jogo}
                    </span>
                  ))}
                </div>
              </div>

              {/* Jogos a Evitar */}
              {insights.jogosEvitar.length > 0 && (
                <div className="p-4 bg-accent/50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Ban className="w-4 h-4 text-destructive" />
                    <span className="font-medium text-foreground">Jogos a Evitar</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {insights.jogosEvitar.map((jogo, i) => (
                      <span key={i} className="px-2 py-1 bg-destructive/20 text-destructive text-xs rounded-full">
                        {jogo}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Alerta de Risco */}
            {insights.alertaRisco && (
              <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-4 h-4 text-destructive" />
                  <span className="font-medium text-destructive">Alerta de Risco</span>
                </div>
                <p className="text-sm text-destructive/80">{insights.alertaRisco}</p>
              </div>
            )}

            {/* Próximos Passos */}
            <div className="p-4 bg-accent/50 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <Target className="w-4 h-4 text-primary" />
                <span className="font-medium text-foreground">Próximos Passos</span>
              </div>
              <ul className="space-y-2">
                {insights.proximosPassos.map((passo, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="w-5 h-5 flex items-center justify-center bg-primary/20 text-primary text-xs rounded-full flex-shrink-0">
                      {i + 1}
                    </span>
                    {passo}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
