import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { AlertTriangle, Bell, BellOff, Check, Shield, Clock, TrendingDown, Zap, Brain } from 'lucide-react';
import { mockAlertas, getAlertaColor, getAlertaIcon, AlertaRisco } from '@/data/alertsData';
import { cn } from '@/lib/utils';

const Alertas = () => {
  const [alertas, setAlertas] = useState<AlertaRisco[]>(mockAlertas);
  const [alertasAtivos, setAlertasAtivos] = useState({
    apostas_frequentes: true,
    perdas_altas: true,
    variancia: true,
    banca_baixa: true,
    emocional: true
  });

  const alertasNaoLidos = alertas.filter(a => !a.lido).length;
  const alertasCriticos = alertas.filter(a => a.tipo === 'critico' && !a.lido).length;

  const marcarComoLido = (id: string) => {
    setAlertas(prev => prev.map(a => a.id === id ? { ...a, lido: true } : a));
  };

  const marcarTodosLidos = () => {
    setAlertas(prev => prev.map(a => ({ ...a, lido: true })));
  };

  const getCategoriaLabel = (categoria: string) => {
    const labels: Record<string, string> = {
      apostas_frequentes: 'Apostas Frequentes',
      perdas_altas: 'Perdas Altas',
      variancia: 'Variância',
      banca_baixa: 'Banca Baixa',
      emocional: 'Controle Emocional'
    };
    return labels[categoria] || categoria;
  };

  const getTipoLabel = (tipo: string) => {
    const labels: Record<string, string> = {
      baixo: 'Baixo Impacto',
      medio: 'Médio Impacto',
      critico: 'Crítico'
    };
    return labels[tipo] || tipo;
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Shield className="w-7 h-7 text-primary" />
              Alertas de Risco
            </h1>
            <p className="text-muted-foreground">Proteja sua banca com alertas inteligentes</p>
          </div>
          {alertasNaoLidos > 0 && (
            <Button variant="outline" onClick={marcarTodosLidos}>
              <Check className="w-4 h-4 mr-2" />
              Marcar todos como lidos
            </Button>
          )}
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className={alertasCriticos > 0 ? 'border-red-500/50 bg-red-500/5' : ''}>
            <CardContent className="p-4 text-center">
              <AlertTriangle className={`w-6 h-6 mx-auto mb-2 ${alertasCriticos > 0 ? 'text-red-500' : 'text-muted-foreground'}`} />
              <div className="text-2xl font-bold text-foreground">{alertasCriticos}</div>
              <p className="text-sm text-muted-foreground">Críticos</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Bell className="w-6 h-6 mx-auto mb-2 text-yellow-500" />
              <div className="text-2xl font-bold text-foreground">{alertasNaoLidos}</div>
              <p className="text-sm text-muted-foreground">Não lidos</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Check className="w-6 h-6 mx-auto mb-2 text-green-500" />
              <div className="text-2xl font-bold text-foreground">{alertas.filter(a => a.lido).length}</div>
              <p className="text-sm text-muted-foreground">Resolvidos</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Clock className="w-6 h-6 mx-auto mb-2 text-blue-500" />
              <div className="text-2xl font-bold text-foreground">{alertas.length}</div>
              <p className="text-sm text-muted-foreground">Total</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Alerts List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-primary" />
                  Alertas Recentes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="todos">
                  <TabsList className="grid w-full grid-cols-4 mb-4">
                    <TabsTrigger value="todos">Todos</TabsTrigger>
                    <TabsTrigger value="critico">Críticos</TabsTrigger>
                    <TabsTrigger value="medio">Médios</TabsTrigger>
                    <TabsTrigger value="baixo">Baixos</TabsTrigger>
                  </TabsList>
                  
                  {['todos', 'critico', 'medio', 'baixo'].map(tabValue => (
                    <TabsContent key={tabValue} value={tabValue} className="space-y-3">
                      {alertas
                        .filter(a => tabValue === 'todos' || a.tipo === tabValue)
                        .sort((a, b) => new Date(b.dataCriacao).getTime() - new Date(a.dataCriacao).getTime())
                        .map(alerta => {
                          const colors = getAlertaColor(alerta.tipo);
                          return (
                            <div 
                              key={alerta.id} 
                              className={cn(
                                'p-4 rounded-xl border transition-all',
                                colors.bg, colors.border,
                                !alerta.lido && 'ring-2 ring-offset-2 ring-offset-background',
                                alerta.tipo === 'critico' && !alerta.lido && 'ring-red-500/50',
                                alerta.tipo === 'medio' && !alerta.lido && 'ring-yellow-500/50',
                                alerta.tipo === 'baixo' && !alerta.lido && 'ring-blue-500/50'
                              )}
                            >
                              <div className="flex items-start gap-3">
                                <div className="text-2xl">{getAlertaIcon(alerta.categoria)}</div>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <h4 className="font-semibold text-foreground">{alerta.titulo}</h4>
                                    <Badge className={cn('text-xs', colors.text, colors.bg, 'border-0')}>
                                      {getTipoLabel(alerta.tipo)}
                                    </Badge>
                                    {!alerta.lido && (
                                      <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                    )}
                                  </div>
                                  <p className="text-sm text-muted-foreground mb-2">{alerta.descricao}</p>
                                  <div className="flex items-center justify-between">
                                    <p className="text-xs text-muted-foreground">
                                      {new Date(alerta.dataCriacao).toLocaleString('pt-BR')}
                                    </p>
                                    {!alerta.lido && (
                                      <Button 
                                        size="sm" 
                                        variant="ghost" 
                                        onClick={() => marcarComoLido(alerta.id)}
                                      >
                                        <Check className="w-4 h-4 mr-1" /> Marcar lido
                                      </Button>
                                    )}
                                  </div>
                                  <div className="mt-3 p-3 rounded-lg bg-muted/50">
                                    <p className="text-xs text-muted-foreground">
                                      <strong className="text-foreground">Recomendação:</strong> {alerta.acaoRecomendada}
                                    </p>
                                  </div>
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

          {/* Settings */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Configurar Alertas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { key: 'apostas_frequentes', icon: <Zap className="w-4 h-4" />, label: 'Apostas Frequentes' },
                  { key: 'perdas_altas', icon: <TrendingDown className="w-4 h-4" />, label: 'Perdas Altas' },
                  { key: 'variancia', icon: <AlertTriangle className="w-4 h-4" />, label: 'Variância Alta' },
                  { key: 'banca_baixa', icon: <Bell className="w-4 h-4" />, label: 'Banca Baixa' },
                  { key: 'emocional', icon: <Brain className="w-4 h-4" />, label: 'Controle Emocional' },
                ].map(item => (
                  <div key={item.key} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {item.icon}
                      <span className="text-sm text-foreground">{item.label}</span>
                    </div>
                    <Switch 
                      checked={alertasAtivos[item.key as keyof typeof alertasAtivos]}
                      onCheckedChange={(checked) => setAlertasAtivos(prev => ({ ...prev, [item.key]: checked }))}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Dicas de Segurança</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  'Defina limites diários e semanais',
                  'Faça pausas regulares durante as sessões',
                  'Nunca aposte para recuperar perdas',
                  'Mantenha um registro de todas as apostas',
                  'Aposte apenas o que pode perder'
                ].map((dica, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-primary mt-0.5" />
                    <span className="text-sm text-muted-foreground">{dica}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Alertas;
