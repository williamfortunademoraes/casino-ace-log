import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  Shield, 
  BarChart3, 
  Gamepad2, 
  Gift, 
  Trophy,
  ChevronRight,
  Zap,
  Lock,
  Eye,
  BookOpen,
  Calculator,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const features = [
  {
    icon: BarChart3,
    title: 'Dashboard Inteligente',
    description: 'Visualize sua banca, lucros e perdas em tempo real com gráficos detalhados.',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Gamepad2,
    title: 'Controle de Jogos',
    description: 'Acompanhe o desempenho em cada jogo e descubra quais são mais lucrativos.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Gift,
    title: 'Promoções & Bônus',
    description: 'Gerencie promoções, giros grátis e cashbacks das suas casas favoritas.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Trophy,
    title: 'Estatísticas RTP',
    description: 'Calcule seu RTP real e compare com o teórico para tomar melhores decisões.',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    icon: BookOpen,
    title: 'Aprenda a Apostar',
    description: 'Módulo educacional completo sobre gestão de banca, volatilidade e estratégias.',
    color: 'from-pink-500 to-rose-500',
  },
  {
    icon: Calculator,
    title: 'Calculadoras',
    description: 'Ferramentas para calcular lucros, rollover, odds e gerenciar sua banca.',
    color: 'from-cyan-500 to-blue-500',
  },
];

const securityFeatures = [
  {
    icon: Lock,
    title: 'Dados Protegidos',
    description: 'Suas informações são criptografadas e armazenadas com segurança.',
  },
  {
    icon: Eye,
    title: 'Privacidade Total',
    description: 'Seus dados nunca são compartilhados com terceiros.',
  },
  {
    icon: Shield,
    title: 'Jogo Responsável',
    description: 'Alertas de risco e limites para proteger você de perdas excessivas.',
  },
];

const Landing = () => {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[128px] animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px]" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-border/50 backdrop-blur-xl bg-background/50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/30">
              <TrendingUp className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Cassino Tracker
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/auth">
              <Button variant="ghost" className="hidden sm:flex">
                Entrar
              </Button>
            </Link>
            <Link to="/auth">
              <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90 shadow-lg shadow-primary/30">
                Criar Conta
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 container mx-auto px-4 pt-20 pb-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8">
            <Zap className="w-4 h-4" />
            Controle total das suas apostas
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Organize suas apostas.
            <br />
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Maximize seus lucros.
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            O Cassino Tracker é o assistente inteligente que registra, analisa e otimiza 
            todas as suas apostas em jogos de cassino online.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/auth">
              <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-primary to-accent hover:opacity-90 shadow-xl shadow-primary/30 text-lg px-8">
                Começar Agora — É Grátis
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 border-border/50 hover:bg-muted/50">
                Ver Demo
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 pt-16 border-t border-border/30">
            <div>
              <p className="text-3xl sm:text-4xl font-bold text-primary">100%</p>
              <p className="text-sm text-muted-foreground mt-1">Gratuito</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-bold text-accent">6+</p>
              <p className="text-sm text-muted-foreground mt-1">Relatórios</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">∞</p>
              <p className="text-sm text-muted-foreground mt-1">Apostas</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Tudo que você precisa para
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"> controlar suas apostas</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Ferramentas poderosas para analisar, otimizar e proteger sua banca.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="group card-glass border-border/50 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1"
              >
                <CardContent className="p-6">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="relative z-10 py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium mb-6">
                  <Shield className="w-4 h-4" />
                  Segurança & Privacidade
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                  Seus dados estão
                  <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent"> seguros conosco</span>
                </h2>
                <p className="text-muted-foreground mb-8">
                  Levamos a segurança a sério. Suas informações são protegidas com 
                  criptografia de ponta e nunca são compartilhadas com terceiros.
                </p>
                <div className="space-y-4">
                  {securityFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center shrink-0">
                        <feature.icon className="w-5 h-5 text-green-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">{feature.title}</h4>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Security Visual */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-3xl blur-3xl" />
                <div className="relative bg-card/50 backdrop-blur-xl border border-border/50 rounded-3xl p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-xl shadow-green-500/30">
                      <Shield className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-lg">Proteção Ativa</p>
                      <p className="text-sm text-green-400">Dados criptografados</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
                      <span className="text-sm">Criptografia</span>
                      <span className="text-sm text-green-400 font-medium">AES-256</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
                      <span className="text-sm">Autenticação</span>
                      <span className="text-sm text-green-400 font-medium">Segura</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
                      <span className="text-sm">Backups</span>
                      <span className="text-sm text-green-400 font-medium">Automáticos</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-3xl blur-3xl" />
              <div className="relative bg-card/50 backdrop-blur-xl border border-border/50 rounded-3xl p-12">
                <Star className="w-12 h-12 mx-auto mb-6 text-yellow-400" />
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                  Comece a controlar suas apostas
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"> hoje mesmo</span>
                </h2>
                <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                  Junte-se a milhares de apostadores que já usam o Cassino Tracker 
                  para tomar decisões mais inteligentes.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link to="/auth">
                    <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-primary to-accent hover:opacity-90 shadow-xl shadow-primary/30 text-lg px-8">
                      Criar Conta Grátis
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                  <Link to="/auth">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8">
                      Já tenho conta
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-semibold">Cassino Tracker</span>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              © 2024 Cassino Tracker. Jogue com responsabilidade.
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="hover:text-foreground cursor-pointer">Termos</span>
              <span className="hover:text-foreground cursor-pointer">Privacidade</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
