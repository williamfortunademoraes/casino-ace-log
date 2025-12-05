import { useState } from 'react';
import { User, Mail, Camera, Save, LogOut, Crown, Trophy, Target, Clock, Gamepad2 } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { useNavigate, Link } from 'react-router-dom';
import { mockUserVIP, niveisVIP, mockConquistas, mockRanking } from '@/data/gamificationData';
import { apostas, casas, jogos } from '@/data/mockData';
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

const Perfil = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [nome, setNome] = useState('Usuário Demo');
  const [email, setEmail] = useState('demo@cassinotracker.com');
  const [bio, setBio] = useState('Apostador casual buscando consistência.');
  const [avatar, setAvatar] = useState('');

  const userVIP = mockUserVIP;
  const currentLevelIndex = niveisVIP.findIndex(n => n.nivel === userVIP.nivel);
  const vipProgress = (userVIP.xpAtual / userVIP.xpProximoNivel) * 100;
  const currentUser = mockRanking.find(u => u.username === 'Você');
  const conquistasDesbloqueadas = mockConquistas.filter(c => c.desbloqueada);

  // Stats
  const totalApostas = apostas.length;
  const totalGasto = apostas.reduce((acc, a) => acc + a.valorApostado, 0);
  const totalGanho = apostas.reduce((acc, a) => acc + a.valorGanho, 0);
  const lucroTotal = totalGanho - totalGasto;
  const diasAtivos = userVIP.diasAtivos;

  const handleSave = () => {
    toast({
      title: 'Funcionalidade em desenvolvimento',
      description: 'A edição de perfil será habilitada quando o backend for conectado.',
    });
  };

  const handleLogout = () => {
    toast({
      title: 'Logout',
      description: 'Você foi desconectado (modo demo).',
    });
    navigate('/auth');
  };

  const handleAvatarChange = () => {
    toast({
      title: 'Funcionalidade em desenvolvimento',
      description: 'O upload de foto será habilitado quando o backend for conectado.',
    });
  };

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Meu Perfil</h1>
        <p className="text-muted-foreground">Gerencie suas informações e veja seu progresso</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Profile Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Card */}
          <Card className="card-glass overflow-hidden">
            <div className={`bg-gradient-to-r ${getVIPColor(userVIP.nivel)} p-6`}>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Avatar className="w-24 h-24 border-4 border-white/20">
                    <AvatarImage src={avatar} />
                    <AvatarFallback className="bg-background/20 text-white text-2xl">
                      {nome.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <button
                    onClick={handleAvatarChange}
                    className="absolute bottom-0 right-0 p-2 rounded-full bg-background text-foreground hover:bg-muted transition-colors"
                  >
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-white">
                  <h2 className="text-2xl font-bold">{nome}</h2>
                  <p className="text-white/80">{email}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge className="bg-white/20 text-white border-0">
                      <Crown className="w-3 h-3 mr-1" />
                      {niveisVIP[currentLevelIndex]?.nome}
                    </Badge>
                    <Badge className="bg-white/20 text-white border-0">
                      Nível {currentUser?.nivel || 28}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Progresso VIP</span>
                    <span className="text-sm text-foreground">{userVIP.xpAtual.toLocaleString()} / {userVIP.xpProximoNivel.toLocaleString()} XP</span>
                  </div>
                  <Progress value={vipProgress} className="h-2" />
                </div>
                <p className="text-sm text-muted-foreground">{bio}</p>
              </div>
            </CardContent>
          </Card>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <Gamepad2 className="w-6 h-6 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">{totalApostas}</div>
                <p className="text-xs text-muted-foreground">Apostas</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Target className="w-6 h-6 text-green-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-500">
                  {lucroTotal >= 0 ? '+' : ''}R$ {lucroTotal.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">Lucro Total</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Clock className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">{diasAtivos}</div>
                <p className="text-xs text-muted-foreground">Dias Ativos</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Trophy className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">#{currentUser?.posicao || 5}</div>
                <p className="text-xs text-muted-foreground">Ranking</p>
              </CardContent>
            </Card>
          </div>

          {/* Edit Profile */}
          <Card className="card-glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                Editar Perfil
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="nome"
                      type="text"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      className="pl-10 bg-muted border-border"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 bg-muted border-border"
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Input
                  id="bio"
                  type="text"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="bg-muted border-border"
                  placeholder="Conte um pouco sobre você..."
                />
              </div>
              <Button onClick={handleSave} className="w-full">
                <Save className="w-4 h-4 mr-2" />
                Salvar Alterações
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Achievements & Actions */}
        <div className="space-y-6">
          {/* Conquistas */}
          <Card className="card-glass">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  Conquistas
                </span>
                <Link to="/gamificacao" className="text-xs text-primary hover:underline">
                  Ver todas
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {conquistasDesbloqueadas.slice(0, 4).map(conquista => (
                <div key={conquista.id} className="flex items-center gap-3 p-2 rounded-lg bg-muted/50">
                  <span className="text-2xl">{conquista.icone}</span>
                  <div>
                    <p className="font-medium text-foreground text-sm">{conquista.titulo}</p>
                    <p className="text-xs text-muted-foreground">{conquista.descricao}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Links */}
          <Card className="card-glass">
            <CardHeader>
              <CardTitle>Ações Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link to="/vip" className="block">
                <Button variant="outline" className="w-full justify-start">
                  <Crown className="w-4 h-4 mr-2 text-yellow-500" />
                  Benefícios VIP
                </Button>
              </Link>
              <Link to="/gamificacao" className="block">
                <Button variant="outline" className="w-full justify-start">
                  <Target className="w-4 h-4 mr-2 text-primary" />
                  Missões Diárias
                </Button>
              </Link>
              <Link to="/ranking" className="block">
                <Button variant="outline" className="w-full justify-start">
                  <Trophy className="w-4 h-4 mr-2 text-yellow-500" />
                  Ver Ranking
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="card-glass border-destructive/30">
            <CardHeader>
              <CardTitle className="text-destructive">Zona de Perigo</CardTitle>
            </CardHeader>
            <CardContent>
              <Button 
                variant="destructive" 
                onClick={handleLogout}
                className="w-full"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sair da Conta
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Perfil;
