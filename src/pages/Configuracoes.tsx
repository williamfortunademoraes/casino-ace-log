import { useState } from 'react';
import { Shield, Bell, Download, Cloud, Moon, Sun } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';

const Configuracoes = () => {
  const { toast } = useToast();
  const [limiteDiario, setLimiteDiario] = useState('200');
  const [notificacoes, setNotificacoes] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  const handleExport = () => {
    toast({
      title: 'Exportação iniciada',
      description: 'Seus dados estão sendo preparados para download.',
    });
  };

  const handleBackup = () => {
    toast({
      title: 'Backup solicitado',
      description: 'Conecte sua conta Google Drive para continuar.',
    });
  };

  const handleSave = () => {
    toast({
      title: 'Configurações salvas',
      description: 'Suas preferências foram atualizadas.',
    });
  };

  return (
    <Layout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Configurações</h1>
        <p className="text-muted-foreground">Personalize sua experiência</p>
      </div>

      <div className="max-w-2xl space-y-6">
        {/* Limite de Perda */}
        <div className="card-glass p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-destructive/20 flex items-center justify-center">
              <Shield className="w-6 h-6 text-destructive" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Limite Diário de Perda</h3>
              <p className="text-sm text-muted-foreground">Defina um valor máximo de perda por dia</p>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Valor máximo (R$)</Label>
            <Input
              type="number"
              value={limiteDiario}
              onChange={(e) => setLimiteDiario(e.target.value)}
              className="input-dark max-w-xs"
            />
          </div>
        </div>

        {/* Notificações */}
        <div className="card-glass p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <Bell className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Notificações</h3>
                <p className="text-sm text-muted-foreground">Alertas de limite e resumos diários</p>
              </div>
            </div>
            <Switch
              checked={notificacoes}
              onCheckedChange={setNotificacoes}
            />
          </div>
        </div>

        {/* Tema */}
        <div className="card-glass p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                {darkMode ? (
                  <Moon className="w-6 h-6 text-muted-foreground" />
                ) : (
                  <Sun className="w-6 h-6 text-warning" />
                )}
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Tema Escuro</h3>
                <p className="text-sm text-muted-foreground">Alternar entre tema claro e escuro</p>
              </div>
            </div>
            <Switch
              checked={darkMode}
              onCheckedChange={setDarkMode}
            />
          </div>
        </div>

        {/* Exportar Dados */}
        <div className="card-glass p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
              <Download className="w-6 h-6 text-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Exportar Dados</h3>
              <p className="text-sm text-muted-foreground">Baixe todas as suas apostas em CSV</p>
            </div>
          </div>
          <Button onClick={handleExport} variant="outline" className="w-full sm:w-auto">
            Exportar para CSV
          </Button>
        </div>

        {/* Backup */}
        <div className="card-glass p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
              <Cloud className="w-6 h-6 text-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Backup na Nuvem</h3>
              <p className="text-sm text-muted-foreground">Salve seus dados no Google Drive</p>
            </div>
          </div>
          <Button onClick={handleBackup} variant="outline" className="w-full sm:w-auto">
            Conectar Google Drive
          </Button>
        </div>

        {/* Save Button */}
        <Button onClick={handleSave} className="btn-primary w-full">
          Salvar Configurações
        </Button>
      </div>
    </Layout>
  );
};

export default Configuracoes;
