import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarIcon, Save } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useToast } from '@/hooks/use-toast';
import { casas, jogos } from '@/data/mockData';
import { Resultado } from '@/types';
import { cn } from '@/lib/utils';

const NovaAposta = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [date, setDate] = useState<Date>(new Date());
  const [casaId, setCasaId] = useState('');
  const [jogoId, setJogoId] = useState('');
  const [valorApostado, setValorApostado] = useState('');
  const [valorGanho, setValorGanho] = useState('');
  const [resultado, setResultado] = useState<Resultado | ''>('');
  const [observacao, setObservacao] = useState('');

  const lucro = valorGanho && valorApostado 
    ? parseFloat(valorGanho) - parseFloat(valorApostado) 
    : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!casaId || !jogoId || !valorApostado || !resultado) {
      toast({
        title: 'Erro',
        description: 'Preencha todos os campos obrigatórios.',
        variant: 'destructive',
      });
      return;
    }

    // Here we would save to the database
    toast({
      title: 'Aposta registrada!',
      description: `Lucro: R$ ${lucro.toFixed(2)}`,
    });

    navigate('/');
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Nova Aposta</h1>
          <p className="text-muted-foreground">Registre uma nova aposta</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="card-glass p-6 space-y-6">
            {/* Date */}
            <div className="space-y-2">
              <Label>Data e Hora</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      'w-full justify-start text-left font-normal input-dark',
                      !date && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP 'às' HH:mm", { locale: ptBR }) : 'Selecione a data'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 pointer-events-auto" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(d) => d && setDate(d)}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Casa and Jogo */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Casa de Aposta *</Label>
                <Select value={casaId} onValueChange={setCasaId}>
                  <SelectTrigger className="input-dark">
                    <SelectValue placeholder="Selecione a casa" />
                  </SelectTrigger>
                  <SelectContent>
                    {casas.map((casa) => (
                      <SelectItem key={casa.id} value={casa.id}>
                        {casa.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Jogo *</Label>
                <Select value={jogoId} onValueChange={setJogoId}>
                  <SelectTrigger className="input-dark">
                    <SelectValue placeholder="Selecione o jogo" />
                  </SelectTrigger>
                  <SelectContent>
                    {jogos.map((jogo) => (
                      <SelectItem key={jogo.id} value={jogo.id}>
                        {jogo.nome} ({jogo.categoria})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Values */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Valor Apostado (R$) *</Label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={valorApostado}
                  onChange={(e) => setValorApostado(e.target.value)}
                  className="input-dark"
                />
              </div>

              <div className="space-y-2">
                <Label>Valor Ganho (R$)</Label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={valorGanho}
                  onChange={(e) => setValorGanho(e.target.value)}
                  className="input-dark"
                />
              </div>
            </div>

            {/* Result */}
            <div className="space-y-2">
              <Label>Resultado *</Label>
              <Select value={resultado} onValueChange={(v) => setResultado(v as Resultado)}>
                <SelectTrigger className="input-dark">
                  <SelectValue placeholder="Selecione o resultado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Vitória">✅ Vitória</SelectItem>
                  <SelectItem value="Derrota">❌ Derrota</SelectItem>
                  <SelectItem value="Cashout">💰 Cashout</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Observation */}
            <div className="space-y-2">
              <Label>Observação</Label>
              <Textarea
                placeholder="Multiplicador, estratégia utilizada, etc."
                value={observacao}
                onChange={(e) => setObservacao(e.target.value)}
                className="input-dark min-h-[100px]"
              />
            </div>

            {/* Profit Preview */}
            {(valorApostado || valorGanho) && (
              <div className={cn(
                'p-4 rounded-xl text-center',
                lucro >= 0 ? 'bg-primary/10 border border-primary/20' : 'bg-destructive/10 border border-destructive/20'
              )}>
                <p className="text-sm text-muted-foreground mb-1">Lucro Calculado</p>
                <p className={cn(
                  'text-2xl font-bold',
                  lucro >= 0 ? 'text-primary' : 'text-destructive'
                )}>
                  {lucro >= 0 ? '+' : ''}R$ {lucro.toFixed(2)}
                </p>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <Button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
            <Save className="w-5 h-5" />
            Salvar Aposta
          </Button>
        </form>
      </div>
    </Layout>
  );
};

export default NovaAposta;
