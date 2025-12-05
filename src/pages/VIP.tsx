import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Crown, Star, Zap, Gift, Lock, Check } from 'lucide-react';
import { mockUserVIP, niveisVIP, beneficiosVIP } from '@/data/gamificationData';
import { NivelVIP } from '@/types';

const getVIPColor = (nivel: NivelVIP) => {
  const colors: Record<NivelVIP, string> = {
    bronze: 'from-amber-700 to-amber-900',
    silver: 'from-gray-300 to-gray-500',
    gold: 'from-yellow-400 to-amber-600',
    platinum: 'from-slate-300 to-slate-500',
    diamond: 'from-cyan-300 to-blue-500',
    elite_black: 'from-purple-600 to-slate-900',
  };
  return colors[nivel];
};

const getVIPBorderColor = (nivel: NivelVIP) => {
  const colors: Record<NivelVIP, string> = {
    bronze: 'border-amber-700',
    silver: 'border-gray-400',
    gold: 'border-yellow-500',
    platinum: 'border-slate-400',
    diamond: 'border-cyan-400',
    elite_black: 'border-purple-500',
  };
  return colors[nivel];
};

const VIP = () => {
  const userVIP = mockUserVIP;
  const progressPercent = (userVIP.xpAtual / userVIP.xpProximoNivel) * 100;
  const currentLevelIndex = niveisVIP.findIndex(n => n.nivel === userVIP.nivel);
  const nextLevel = niveisVIP[currentLevelIndex + 1];

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Crown className="w-7 h-7 text-yellow-500" />
              Sistema VIP
            </h1>
            <p className="text-muted-foreground">Suba de nível e desbloqueie benefícios exclusivos</p>
          </div>
        </div>

        {/* Current VIP Status Card */}
        <Card className={`border-2 ${getVIPBorderColor(userVIP.nivel)} overflow-hidden`}>
          <div className={`bg-gradient-to-r ${getVIPColor(userVIP.nivel)} p-6`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-background/20 backdrop-blur flex items-center justify-center">
                  <Crown className="w-10 h-10 text-white" />
                </div>
                <div className="text-white">
                  <p className="text-sm opacity-80">Seu Nível</p>
                  <h2 className="text-3xl font-bold capitalize">{niveisVIP[currentLevelIndex]?.nome}</h2>
                  <p className="text-sm opacity-80">{userVIP.diasAtivos} dias ativos</p>
                </div>
              </div>
              <div className="text-right text-white">
                <p className="text-sm opacity-80">Volume Total</p>
                <p className="text-2xl font-bold">R$ {userVIP.volumeTotal.toLocaleString()}</p>
              </div>
            </div>
          </div>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Progresso para {nextLevel?.nome || 'Máximo'}</span>
                <span className="text-foreground font-medium">{userVIP.xpAtual.toLocaleString()} / {userVIP.xpProximoNivel.toLocaleString()} XP</span>
              </div>
              <Progress value={progressPercent} className="h-3" />
              <p className="text-sm text-muted-foreground text-center">
                Faltam <span className="text-primary font-bold">{(userVIP.xpProximoNivel - userVIP.xpAtual).toLocaleString()}</span> XP para o próximo nível
              </p>
            </div>
          </CardContent>
        </Card>

        {/* VIP Levels */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Star className="w-5 h-5 text-primary" />
            Níveis VIP
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {niveisVIP.map((nivel, index) => {
              const isUnlocked = index <= currentLevelIndex;
              const isCurrent = nivel.nivel === userVIP.nivel;
              
              return (
                <Card 
                  key={nivel.nivel} 
                  className={`relative overflow-hidden transition-all ${
                    isCurrent ? `border-2 ${getVIPBorderColor(nivel.nivel)} shadow-lg` : 
                    isUnlocked ? 'opacity-90' : 'opacity-50'
                  }`}
                >
                  <div className={`bg-gradient-to-br ${getVIPColor(nivel.nivel)} p-4 text-center`}>
                    <Crown className={`w-8 h-8 mx-auto mb-2 ${isUnlocked ? 'text-white' : 'text-white/50'}`} />
                    <h3 className="font-bold text-white">{nivel.nome}</h3>
                    <p className="text-xs text-white/80">{nivel.xpMinimo.toLocaleString()} XP</p>
                  </div>
                  {isCurrent && (
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-background text-foreground text-xs">Atual</Badge>
                    </div>
                  )}
                  {!isUnlocked && (
                    <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
                      <Lock className="w-6 h-6 text-muted-foreground" />
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        </div>

        {/* Benefits */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Gift className="w-5 h-5 text-primary" />
            Benefícios por Nível
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {beneficiosVIP.map((beneficio, index) => {
              const beneficioLevelIndex = niveisVIP.findIndex(n => n.nivel === beneficio.nivel);
              const isUnlocked = beneficioLevelIndex <= currentLevelIndex;
              
              return (
                <Card key={index} className={`transition-all ${isUnlocked ? '' : 'opacity-60'}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
                        isUnlocked ? 'bg-primary/20' : 'bg-muted'
                      }`}>
                        {beneficio.icone}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-foreground">{beneficio.nome}</h3>
                          {isUnlocked ? (
                            <Check className="w-4 h-4 text-green-500" />
                          ) : (
                            <Lock className="w-4 h-4 text-muted-foreground" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{beneficio.descricao}</p>
                        <Badge variant="outline" className={`mt-2 text-xs capitalize bg-gradient-to-r ${getVIPColor(beneficio.nivel)} text-white border-0`}>
                          {niveisVIP.find(n => n.nivel === beneficio.nivel)?.nome}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* How to Level Up */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              Como Subir de Nível
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              {[
                { icon: '📝', title: 'Registre Apostas', desc: 'Cada aposta registrada dá XP' },
                { icon: '📚', title: 'Complete Lições', desc: 'Aprendizados geram XP bônus' },
                { icon: '🎯', title: 'Cumpra Missões', desc: 'Missões diárias e semanais' },
                { icon: '🔥', title: 'Seja Consistente', desc: 'Dias ativos aumentam XP' },
              ].map((item, index) => (
                <div key={index} className="text-center p-4 rounded-xl bg-muted/50">
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <h4 className="font-semibold text-foreground">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default VIP;
