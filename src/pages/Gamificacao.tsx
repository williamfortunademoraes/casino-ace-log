import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Target, Trophy, Flame, Star, CheckCircle2, Clock, Sparkles } from 'lucide-react';
import { mockMissoes, mockConquistas, mockUserVIP } from '@/data/gamificationData';

const getRaridadeColor = (raridade: string) => {
  const colors: Record<string, string> = {
    comum: 'bg-gray-500',
    raro: 'bg-blue-500',
    epico: 'bg-purple-500',
    lendario: 'bg-amber-500',
  };
  return colors[raridade] || colors.comum;
};

const getRaridadeBorder = (raridade: string) => {
  const colors: Record<string, string> = {
    comum: 'border-gray-500/30',
    raro: 'border-blue-500/30',
    epico: 'border-purple-500/30',
    lendario: 'border-amber-500/30 shadow-lg shadow-amber-500/20',
  };
  return colors[raridade] || colors.comum;
};

const Gamificacao = () => {
  const userLevel = 28;
  const userXP = mockUserVIP.xpAtual;
  const xpParaProximoNivel = 8000;
  const progressPercent = ((userXP % 1000) / 1000) * 100;

  const missoesDiarias = mockMissoes.filter(m => m.tipo === 'diaria');
  const missoesSemanais = mockMissoes.filter(m => m.tipo === 'semanal');
  const missoesEspeciais = mockMissoes.filter(m => m.tipo === 'especial');

  const conquistasDesbloqueadas = mockConquistas.filter(c => c.desbloqueada);
  const conquistasBloqueadas = mockConquistas.filter(c => !c.desbloqueada);

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Sparkles className="w-7 h-7 text-primary" />
              Gamificação
            </h1>
            <p className="text-muted-foreground">Complete missões e desbloqueie conquistas</p>
          </div>
        </div>

        {/* User Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-primary/20 to-primary/5 border-primary/20">
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-primary">{userLevel}</div>
              <p className="text-sm text-muted-foreground">Nível</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-yellow-500/20 to-yellow-500/5 border-yellow-500/20">
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-yellow-500">{userXP.toLocaleString()}</div>
              <p className="text-sm text-muted-foreground">XP Total</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-500/20 to-green-500/5 border-green-500/20">
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-green-500">{mockMissoes.filter(m => m.concluida).length}</div>
              <p className="text-sm text-muted-foreground">Missões</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-purple-500/20 to-purple-500/5 border-purple-500/20">
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-purple-500">{conquistasDesbloqueadas.length}</div>
              <p className="text-sm text-muted-foreground">Conquistas</p>
            </CardContent>
          </Card>
        </div>

        {/* XP Progress */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Star className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Nível {userLevel}</p>
                  <p className="text-sm text-muted-foreground">Progresso para Nível {userLevel + 1}</p>
                </div>
              </div>
              <span className="text-sm text-muted-foreground">{userXP % 1000} / 1000 XP</span>
            </div>
            <Progress value={progressPercent} className="h-3" />
          </CardContent>
        </Card>

        {/* Missions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              Missões
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="diarias">
              <TabsList className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger value="diarias" className="flex items-center gap-1">
                  <Clock className="w-4 h-4" /> Diárias
                </TabsTrigger>
                <TabsTrigger value="semanais" className="flex items-center gap-1">
                  <Flame className="w-4 h-4" /> Semanais
                </TabsTrigger>
                <TabsTrigger value="especiais" className="flex items-center gap-1">
                  <Star className="w-4 h-4" /> Especiais
                </TabsTrigger>
              </TabsList>
              
              {[
                { value: 'diarias', missions: missoesDiarias },
                { value: 'semanais', missions: missoesSemanais },
                { value: 'especiais', missions: missoesEspeciais },
              ].map(({ value, missions }) => (
                <TabsContent key={value} value={value} className="space-y-3">
                  {missions.map(missao => (
                    <div 
                      key={missao.id} 
                      className={`p-4 rounded-xl border transition-all ${
                        missao.concluida ? 'bg-green-500/10 border-green-500/30' : 'bg-muted/30 border-border'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="text-2xl">{missao.icone}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-foreground">{missao.titulo}</h4>
                            {missao.concluida && <CheckCircle2 className="w-4 h-4 text-green-500" />}
                          </div>
                          <p className="text-sm text-muted-foreground">{missao.descricao}</p>
                          <div className="mt-2 flex items-center gap-3">
                            <Progress value={(missao.progresso / missao.meta) * 100} className="flex-1 h-2" />
                            <span className="text-sm text-muted-foreground">{missao.progresso}/{missao.meta}</span>
                          </div>
                        </div>
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                          +{missao.xpRecompensa} XP
                        </Badge>
                      </div>
                    </div>
                  ))}
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-primary" />
              Conquistas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="desbloqueadas">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="desbloqueadas">
                  Desbloqueadas ({conquistasDesbloqueadas.length})
                </TabsTrigger>
                <TabsTrigger value="bloqueadas">
                  Bloqueadas ({conquistasBloqueadas.length})
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="desbloqueadas" className="grid md:grid-cols-2 gap-4">
                {conquistasDesbloqueadas.map(conquista => (
                  <Card key={conquista.id} className={`border ${getRaridadeBorder(conquista.raridade)}`}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="text-3xl">{conquista.icone}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-foreground">{conquista.titulo}</h4>
                            <Badge className={`${getRaridadeColor(conquista.raridade)} text-white text-xs capitalize`}>
                              {conquista.raridade}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{conquista.descricao}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Desbloqueada em {conquista.dataDesbloqueio?.toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
              
              <TabsContent value="bloqueadas" className="grid md:grid-cols-2 gap-4">
                {conquistasBloqueadas.map(conquista => (
                  <Card key={conquista.id} className="opacity-60">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="text-3xl grayscale">{conquista.icone}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-foreground">{conquista.titulo}</h4>
                            <Badge variant="outline" className="text-xs capitalize">
                              {conquista.raridade}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{conquista.descricao}</p>
                          <Badge variant="outline" className="mt-2 text-xs">
                            +{conquista.xpRecompensa} XP
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Gamificacao;
