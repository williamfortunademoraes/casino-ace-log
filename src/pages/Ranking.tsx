import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trophy, Medal, Crown, TrendingUp, Target, Zap, User } from 'lucide-react';
import { mockRanking, niveisVIP } from '@/data/gamificationData';
import { NivelVIP } from '@/types';

const getVIPBadgeColor = (nivel: NivelVIP) => {
  const colors: Record<NivelVIP, string> = {
    bronze: 'bg-amber-700 text-white',
    silver: 'bg-gray-400 text-gray-900',
    gold: 'bg-yellow-500 text-yellow-900',
    platinum: 'bg-slate-400 text-slate-900',
    diamond: 'bg-cyan-400 text-cyan-900',
    elite_black: 'bg-gradient-to-r from-purple-600 to-slate-900 text-white',
  };
  return colors[nivel];
};

const getPosicaoIcon = (posicao: number) => {
  if (posicao === 1) return <Trophy className="w-6 h-6 text-yellow-500" />;
  if (posicao === 2) return <Medal className="w-6 h-6 text-gray-400" />;
  if (posicao === 3) return <Medal className="w-6 h-6 text-amber-600" />;
  return <span className="w-6 h-6 flex items-center justify-center font-bold text-muted-foreground">{posicao}</span>;
};

const getPosicaoStyle = (posicao: number) => {
  if (posicao === 1) return 'bg-gradient-to-r from-yellow-500/20 to-amber-500/10 border-yellow-500/30';
  if (posicao === 2) return 'bg-gradient-to-r from-gray-400/20 to-gray-500/10 border-gray-400/30';
  if (posicao === 3) return 'bg-gradient-to-r from-amber-600/20 to-orange-500/10 border-amber-600/30';
  return '';
};

const Ranking = () => {
  const currentUser = mockRanking.find(u => u.username === 'Você');

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Trophy className="w-7 h-7 text-yellow-500" />
              Ranking
            </h1>
            <p className="text-muted-foreground">Compare seu desempenho com outros jogadores</p>
          </div>
        </div>

        {/* Your Position */}
        {currentUser && (
          <Card className="border-primary/30 bg-primary/5">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                  <User className="w-8 h-8 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold text-foreground">{currentUser.username}</h3>
                    <Badge className={`${getVIPBadgeColor(currentUser.nivelVIP)} capitalize`}>
                      {niveisVIP.find(n => n.nivel === currentUser.nivelVIP)?.nome}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground">Nível {currentUser.nivel} • {currentUser.xp.toLocaleString()} XP</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <Crown className="w-6 h-6 text-primary" />
                    <span className="text-3xl font-bold text-primary">#{currentUser.posicao}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Sua posição</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <TrendingUp className="w-6 h-6 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">{currentUser?.lucroPercentual}%</div>
              <p className="text-sm text-muted-foreground">Lucro</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Target className="w-6 h-6 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">{currentUser?.consistencia}%</div>
              <p className="text-sm text-muted-foreground">Consistência</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Zap className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">{currentUser?.missoesConcluidas}</div>
              <p className="text-sm text-muted-foreground">Missões</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Crown className="w-6 h-6 text-purple-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">{currentUser?.nivel}</div>
              <p className="text-sm text-muted-foreground">Nível</p>
            </CardContent>
          </Card>
        </div>

        {/* Ranking Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Medal className="w-5 h-5 text-primary" />
              Ranking Geral
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="geral">
              <TabsList className="grid w-full grid-cols-4 mb-4">
                <TabsTrigger value="geral">Geral</TabsTrigger>
                <TabsTrigger value="lucro">Lucro %</TabsTrigger>
                <TabsTrigger value="consistencia">Consistência</TabsTrigger>
                <TabsTrigger value="xp">XP</TabsTrigger>
              </TabsList>
              
              {['geral', 'lucro', 'consistencia', 'xp'].map(tabValue => (
                <TabsContent key={tabValue} value={tabValue} className="space-y-2">
                  {mockRanking
                    .sort((a, b) => {
                      if (tabValue === 'lucro') return b.lucroPercentual - a.lucroPercentual;
                      if (tabValue === 'consistencia') return b.consistencia - a.consistencia;
                      if (tabValue === 'xp') return b.xp - a.xp;
                      return a.posicao - b.posicao;
                    })
                    .map((user, index) => {
                      const isCurrentUser = user.username === 'Você';
                      const displayPosition = index + 1;
                      
                      return (
                        <div 
                          key={user.id} 
                          className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
                            isCurrentUser ? 'border-primary/50 bg-primary/10' : 
                            getPosicaoStyle(displayPosition) || 'bg-muted/30'
                          }`}
                        >
                          <div className="w-8 flex justify-center">
                            {getPosicaoIcon(displayPosition)}
                          </div>
                          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                            <User className="w-6 h-6 text-muted-foreground" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h4 className={`font-semibold ${isCurrentUser ? 'text-primary' : 'text-foreground'}`}>
                                {user.username}
                              </h4>
                              <Badge className={`${getVIPBadgeColor(user.nivelVIP)} text-xs capitalize`}>
                                {niveisVIP.find(n => n.nivel === user.nivelVIP)?.nome}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">Nível {user.nivel}</p>
                          </div>
                          <div className="text-right space-y-1">
                            <div className="text-sm">
                              <span className="text-muted-foreground">Lucro: </span>
                              <span className="text-green-500 font-semibold">{user.lucroPercentual}%</span>
                            </div>
                            <div className="text-sm">
                              <span className="text-muted-foreground">XP: </span>
                              <span className="text-foreground font-semibold">{user.xp.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Ranking;
