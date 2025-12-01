import { useState } from 'react';
import { Bell, AlertTriangle, Shield, Clock, TrendingDown, Pause, Play, Save } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { configuracaoLimites, apostas } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';

const Limites = () => {
  const { toast } = useToast();
  const [config, setConfig] = useState(configuracaoLimites);
  const [modoPausa, setModoPausa] = useState(config.modoPausa);
  const [horasPausa, setHorasPausa] = useState(24);

  // Calcular gastos do dia e da semana
  const hoje = new Date();
  const inicioDia = new Date(hoje.setHours(0, 0, 0, 0));
  const inicioSemana = new Date(hoje);
  inicioSemana.setDate(hoje.getDate() - hoje.getDay());

  const gastoDiario = apostas
    .filter(a => new Date(a.data) >= inicioDia)
    .reduce((acc, a) => acc + a.valorApostado, 0);

  const gastoSemanal = apostas
    .filter(a => new Date(a.data) >= inicioSemana)
    .reduce((acc, a) => acc + a.valorApostado, 0);

  const percentualDiario = Math.min((gastoDiario / config.limiteDiario) * 100, 100);
  const percentualSemanal = Math.min((gastoSemanal / config.limiteSemanal) * 100, 100);

  // Contar perdas consecutivas
  const perdasConsecutivas = apostas
    .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())
    .reduce((count, aposta, index, arr) => {
      if (index === 0) return aposta.resultado === 'Derrota' ? 1 : 0;
      if (aposta.resultado === 'Derrota' && arr[index - 1]?.resultado === 'Derrota') {
        return count + 1;
      }
      return count;
    }, 0);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const handleSave = () => {
    toast({
      title: "Configurações salvas!",
      description: "Seus limites e alertas foram atualizados.",
    });
  };

  const ativarPausa = () => {
    setModoPausa(true);
    toast({
      title: "Modo Pausa Ativado",
      description: `Registro de apostas travado por ${horasPausa} horas.`,
    });
  };

  const desativarPausa = () => {
    setModoPausa(false);
    toast({
      title: "Modo Pausa Desativado",
      description: "Você pode voltar a registrar apostas.",
    });
  };

  return (
    <Layout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground flex items-center gap-3">
          <Bell className="w-8 h-8 text-primary" />
          Limites & Alertas
        </h1>
        <p className="text-muted-foreground mt-1">Gerencie seus limites e mantenha o controle</p>
      </div>

      {/* Alertas Ativos */}
      {(percentualDiario >= config.alertaPercentual || 
        percentualSemanal >= config.alertaPercentual ||
        perdasConsecutivas >= config.perdasConsecutivasAlerta) && (
        <div className="card-glass p-4 mb-6 border-l-4 border-yellow-500 bg-yellow-500/5">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5" />
            <div className="space-y-1">
              <h3 className="font-semibold text-foreground">⚠️ Atenção!</h3>
              {percentualDiario >= config.alertaPercentual && (
                <p className="text-sm text-muted-foreground">
                  Você atingiu {percentualDiario.toFixed(0)}% do seu limite diário.
                </p>
              )}
              {percentualSemanal >= config.alertaPercentual && (
                <p className="text-sm text-muted-foreground">
                  Você atingiu {percentualSemanal.toFixed(0)}% do seu limite semanal.
                </p>
              )}
              {perdasConsecutivas >= config.perdasConsecutivasAlerta && (
                <p className="text-sm text-muted-foreground">
                  Alerta anti-tilt: {perdasConsecutivas} derrotas consecutivas. Considere fazer uma pausa.
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modo Pausa */}
      {modoPausa && (
        <div className="card-glass p-6 mb-6 border-2 border-primary bg-primary/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center">
                <Pause className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Modo Pausa Ativo</h3>
                <p className="text-sm text-muted-foreground">
                  Registro de apostas temporariamente bloqueado
                </p>
              </div>
            </div>
            <Button onClick={desativarPausa} variant="outline">
              <Play className="w-4 h-4 mr-2" />
              Desativar
            </Button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status dos Limites */}
        <div className="card-glass p-6 space-y-6">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <TrendingDown className="w-5 h-5 text-primary" />
            Status dos Limites
          </h2>

          {/* Limite Diário */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Limite Diário</span>
              <span className="text-sm font-medium text-foreground">
                {formatCurrency(gastoDiario)} / {formatCurrency(config.limiteDiario)}
              </span>
            </div>
            <Progress 
              value={percentualDiario} 
              className={cn(
                "h-3",
                percentualDiario >= config.alertaPercentual && "[&>div]:bg-yellow-500",
                percentualDiario >= 100 && "[&>div]:bg-destructive"
              )}
            />
            <p className="text-xs text-muted-foreground">
              {percentualDiario >= 100 
                ? 'Limite atingido!' 
                : `${(100 - percentualDiario).toFixed(0)}% restante`}
            </p>
          </div>

          {/* Limite Semanal */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Limite Semanal</span>
              <span className="text-sm font-medium text-foreground">
                {formatCurrency(gastoSemanal)} / {formatCurrency(config.limiteSemanal)}
              </span>
            </div>
            <Progress 
              value={percentualSemanal} 
              className={cn(
                "h-3",
                percentualSemanal >= config.alertaPercentual && "[&>div]:bg-yellow-500",
                percentualSemanal >= 100 && "[&>div]:bg-destructive"
              )}
            />
            <p className="text-xs text-muted-foreground">
              {percentualSemanal >= 100 
                ? 'Limite atingido!' 
                : `${(100 - percentualSemanal).toFixed(0)}% restante`}
            </p>
          </div>

          {/* Anti-Tilt */}
          <div className="p-4 bg-muted/50 rounded-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AlertTriangle className={cn(
                  "w-5 h-5",
                  perdasConsecutivas >= config.perdasConsecutivasAlerta 
                    ? "text-destructive" 
                    : "text-muted-foreground"
                )} />
                <div>
                  <p className="text-sm font-medium text-foreground">Alerta Anti-Tilt</p>
                  <p className="text-xs text-muted-foreground">
                    {perdasConsecutivas} derrotas consecutivas
                  </p>
                </div>
              </div>
              <span className={cn(
                "text-2xl font-bold",
                perdasConsecutivas >= config.perdasConsecutivasAlerta 
                  ? "text-destructive" 
                  : "text-foreground"
              )}>
                {perdasConsecutivas}/{config.perdasConsecutivasAlerta}
              </span>
            </div>
          </div>
        </div>

        {/* Configurar Limites */}
        <div className="card-glass p-6 space-y-6">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            Configurar Limites
          </h2>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="limiteDiario">Limite Diário de Perda</Label>
              <Input
                id="limiteDiario"
                type="number"
                value={config.limiteDiario}
                onChange={(e) => setConfig({ ...config, limiteDiario: Number(e.target.value) })}
                className="font-mono"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="limiteSemanal">Limite Semanal de Perda</Label>
              <Input
                id="limiteSemanal"
                type="number"
                value={config.limiteSemanal}
                onChange={(e) => setConfig({ ...config, limiteSemanal: Number(e.target.value) })}
                className="font-mono"
              />
            </div>

            <div className="space-y-3">
              <Label>Alertar quando atingir: {config.alertaPercentual}%</Label>
              <Slider
                value={[config.alertaPercentual]}
                onValueChange={([value]) => setConfig({ ...config, alertaPercentual: value })}
                max={100}
                min={50}
                step={5}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="perdasConsecutivas">Alerta Anti-Tilt (derrotas consecutivas)</Label>
              <Input
                id="perdasConsecutivas"
                type="number"
                value={config.perdasConsecutivasAlerta}
                onChange={(e) => setConfig({ ...config, perdasConsecutivasAlerta: Number(e.target.value) })}
                className="font-mono"
                min={1}
                max={10}
              />
            </div>

            <Button onClick={handleSave} className="w-full">
              <Save className="w-4 h-4 mr-2" />
              Salvar Configurações
            </Button>
          </div>
        </div>

        {/* Modo Pausa */}
        <div className="card-glass p-6 lg:col-span-2">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-primary" />
            Modo Pausa
          </h2>
          
          <p className="text-sm text-muted-foreground mb-4">
            Ative o modo pausa para travar o registro de apostas por um período determinado. 
            Isso ajuda a manter o controle em momentos de tilt.
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-1 space-y-2">
              <Label>Duração da pausa: {horasPausa} horas</Label>
              <Slider
                value={[horasPausa]}
                onValueChange={([value]) => setHorasPausa(value)}
                max={72}
                min={1}
                step={1}
                disabled={modoPausa}
              />
            </div>
            <Button 
              onClick={ativarPausa}
              disabled={modoPausa}
              variant={modoPausa ? "secondary" : "destructive"}
            >
              <Pause className="w-4 h-4 mr-2" />
              {modoPausa ? 'Pausa Ativa' : 'Ativar Pausa'}
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Limites;
