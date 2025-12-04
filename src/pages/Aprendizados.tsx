import { useState } from 'react';
import { BookOpen, CheckCircle2, Circle, Clock, ChevronRight, ChevronLeft, Trophy, Target } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { mockLicoes, categoriasAprendizado } from '@/data/providersData';
import { cn } from '@/lib/utils';

const Aprendizados = () => {
  const [licoes, setLicoes] = useState(mockLicoes);
  const [licaoAtiva, setLicaoAtiva] = useState<string | null>(null);
  const [categoriaFiltro, setCategoriaFiltro] = useState<string | null>(null);

  const licoesFiltradas = categoriaFiltro 
    ? licoes.filter(l => l.categoria === categoriaFiltro)
    : licoes;

  const totalConcluidas = licoes.filter(l => l.concluida).length;
  const progressoGeral = (totalConcluidas / licoes.length) * 100;

  const progressoPorCategoria = categoriasAprendizado.map(cat => {
    const licoesCategoria = licoes.filter(l => l.categoria === cat.id);
    const concluidas = licoesCategoria.filter(l => l.concluida).length;
    return {
      ...cat,
      total: licoesCategoria.length,
      concluidas,
      progresso: licoesCategoria.length > 0 ? (concluidas / licoesCategoria.length) * 100 : 0
    };
  });

  const toggleConcluida = (id: string) => {
    setLicoes(licoes.map(l => 
      l.id === id ? { ...l, concluida: !l.concluida } : l
    ));
  };

  const licao = licaoAtiva ? licoes.find(l => l.id === licaoAtiva) : null;

  if (licao) {
    const categoriaInfo = categoriasAprendizado.find(c => c.id === licao.categoria);
    const licaoIndex = licoes.findIndex(l => l.id === licao.id);
    const proximaLicao = licoes[licaoIndex + 1];
    const licaoAnterior = licoes[licaoIndex - 1];

    return (
      <Layout>
        <div className="space-y-6 max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setLicaoAtiva(null)}
              className="p-2 rounded-xl bg-muted hover:bg-muted/80 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex-1">
              <Badge className={cn("mb-2", categoriaInfo?.cor)}>
                {categoriaInfo?.icone} {categoriaInfo?.nome}
              </Badge>
              <h1 className="text-2xl font-bold">{licao.titulo}</h1>
              <div className="flex items-center gap-4 mt-1 text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {licao.duracaoMinutos} min
                </span>
                <span>Lição {licaoIndex + 1} de {licoes.length}</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <Card className="card-glass">
            <CardContent className="p-6 prose prose-invert max-w-none">
              <div 
                className="whitespace-pre-wrap text-foreground leading-relaxed"
                style={{ fontFamily: 'inherit' }}
              >
                {licao.conteudo.split('\n').map((line, idx) => {
                  if (line.startsWith('# ')) {
                    return <h1 key={idx} className="text-2xl font-bold mt-6 mb-4 text-foreground">{line.slice(2)}</h1>;
                  }
                  if (line.startsWith('## ')) {
                    return <h2 key={idx} className="text-xl font-semibold mt-5 mb-3 text-foreground">{line.slice(3)}</h2>;
                  }
                  if (line.startsWith('### ')) {
                    return <h3 key={idx} className="text-lg font-semibold mt-4 mb-2 text-foreground">{line.slice(4)}</h3>;
                  }
                  if (line.startsWith('- ')) {
                    return <li key={idx} className="ml-4 text-muted-foreground">{line.slice(2)}</li>;
                  }
                  if (line.startsWith('✅') || line.startsWith('❌')) {
                    return <p key={idx} className="text-muted-foreground">{line}</p>;
                  }
                  if (line.startsWith('- [ ]')) {
                    return (
                      <label key={idx} className="flex items-center gap-2 text-muted-foreground cursor-pointer">
                        <input type="checkbox" className="rounded" />
                        {line.slice(5)}
                      </label>
                    );
                  }
                  if (line.startsWith('```')) {
                    return null;
                  }
                  if (line.trim() === '') {
                    return <br key={idx} />;
                  }
                  return <p key={idx} className="text-muted-foreground mb-2">{line}</p>;
                })}
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => licaoAnterior && setLicaoAtiva(licaoAnterior.id)}
              disabled={!licaoAnterior}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Anterior
            </Button>

            <Button
              onClick={() => toggleConcluida(licao.id)}
              className={cn(
                licao.concluida 
                  ? "bg-green-600 hover:bg-green-700" 
                  : "bg-primary hover:bg-primary/90"
              )}
            >
              {licao.concluida ? (
                <>
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Concluída
                </>
              ) : (
                <>
                  <Circle className="w-4 h-4 mr-2" />
                  Marcar como Concluída
                </>
              )}
            </Button>

            <Button
              variant="outline"
              onClick={() => proximaLicao && setLicaoAtiva(proximaLicao.id)}
              disabled={!proximaLicao}
            >
              Próxima
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <BookOpen className="w-7 h-7 text-primary" />
            Aprendizados sobre Bet
          </h1>
          <p className="text-muted-foreground">Aprenda a apostar de forma inteligente e responsável</p>
        </div>

        {/* Overall Progress */}
        <Card className="card-glass bg-gradient-to-br from-primary/10 to-accent/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-lg">Seu Progresso</h3>
                <p className="text-muted-foreground">
                  {totalConcluidas} de {licoes.length} lições concluídas
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className={cn(
                  "w-8 h-8",
                  progressoGeral === 100 ? "text-yellow-400" : "text-muted-foreground"
                )} />
                <span className="text-2xl font-bold">{Math.round(progressoGeral)}%</span>
              </div>
            </div>
            <Progress value={progressoGeral} className="h-3" />
          </CardContent>
        </Card>

        {/* Categories */}
        <div>
          <h3 className="font-semibold mb-3">Categorias</h3>
          <div className="flex flex-wrap gap-2">
            <Badge 
              variant={categoriaFiltro === null ? "default" : "outline"}
              className="cursor-pointer py-1.5 px-3"
              onClick={() => setCategoriaFiltro(null)}
            >
              Todas
            </Badge>
            {categoriasAprendizado.map(cat => (
              <Badge 
                key={cat.id}
                variant={categoriaFiltro === cat.id ? "default" : "outline"}
                className={cn("cursor-pointer py-1.5 px-3", categoriaFiltro === cat.id && cat.cor)}
                onClick={() => setCategoriaFiltro(cat.id)}
              >
                {cat.icone} {cat.nome}
              </Badge>
            ))}
          </div>
        </div>

        {/* Category Progress */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {progressoPorCategoria.map(cat => (
            <Card 
              key={cat.id} 
              className={cn(
                "card-glass cursor-pointer transition-all",
                categoriaFiltro === cat.id && "border-primary"
              )}
              onClick={() => setCategoriaFiltro(cat.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{cat.icone}</span>
                    <span className="font-medium">{cat.nome}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {cat.concluidas}/{cat.total}
                  </span>
                </div>
                <Progress value={cat.progresso} className="h-2" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Lessons List */}
        <div>
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            Lições {categoriaFiltro && `- ${categoriasAprendizado.find(c => c.id === categoriaFiltro)?.nome}`}
          </h3>
          <div className="space-y-3">
            {licoesFiltradas.map((licao, index) => {
              const categoriaInfo = categoriasAprendizado.find(c => c.id === licao.categoria);
              return (
                <Card 
                  key={licao.id}
                  className={cn(
                    "card-glass cursor-pointer hover:border-primary/50 transition-all",
                    licao.concluida && "opacity-70"
                  )}
                  onClick={() => setLicaoAtiva(licao.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
                        licao.concluida 
                          ? "bg-green-500/20 text-green-400" 
                          : "bg-muted text-muted-foreground"
                      )}>
                        {licao.concluida ? (
                          <CheckCircle2 className="w-5 h-5" />
                        ) : (
                          <span className="font-semibold">{index + 1}</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold">{licao.titulo}</h4>
                          {licao.concluida && (
                            <Badge variant="outline" className="text-green-400 border-green-400/30">
                              Concluída
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                          {licao.descricao}
                        </p>
                        <div className="flex items-center gap-3">
                          <Badge variant="outline" className={categoriaInfo?.cor}>
                            {categoriaInfo?.icone} {categoriaInfo?.nome}
                          </Badge>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {licao.duracaoMinutos} min
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0" />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {licoesFiltradas.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            Nenhuma lição encontrada nesta categoria
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Aprendizados;
