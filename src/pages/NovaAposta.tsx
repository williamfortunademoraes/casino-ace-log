import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarIcon, Save, Plus } from 'lucide-react';
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
import { useCasas } from '@/hooks/useCasas';
import { useJogos } from '@/hooks/useJogos';
import { useApostas } from '@/hooks/useApostas';
import { Resultado } from '@/types';
import { cn } from '@/lib/utils';

const NovaAposta = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { casas, isLoading: loadingCasas, createCasa } = useCasas();
  const { jogos, isLoading: loadingJogos, createJogo } = useJogos();
  const { createAposta } = useApostas();
  
  const [date, setDate] = useState<Date>(new Date());
  const [casaId, setCasaId] = useState('');
  const [jogoId, setJogoId] = useState('');
  const [valorApostado, setValorApostado] = useState('');
  const [valorGanho, setValorGanho] = useState('');
  const [resultado, setResultado] = useState<Resultado | ''>('');
  const [observacao, setObservacao] = useState('');
  
  // Estados para criar nova casa/jogo
  const [showNewCasa, setShowNewCasa] = useState(false);
  const [showNewJogo, setShowNewJogo] = useState(false);
  const [newCasaNome, setNewCasaNome] = useState('');
  const [newJogoNome, setNewJogoNome] = useState('');
  const [newJogoCategoria, setNewJogoCategoria] = useState('');

  const lucro = valorGanho && valorApostado 
    ? parseFloat(valorGanho) - parseFloat(valorApostado) 
    : 0;

  const handleCreateCasa = async () => {
    if (!newCasaNome.trim()) return;
    try {
      const result = await createCasa.mutateAsync({ nome: newCasaNome });
      setCasaId(result.id);
      setShowNewCasa(false);
      setNewCasaNome('');
    } catch (error) {
      // Error handled by hook
    }
  };

  const handleCreateJogo = async () => {
    if (!newJogoNome.trim() || !newJogoCategoria.trim()) return;
    try {
      const result = await createJogo.mutateAsync({ 
        nome: newJogoNome,
        categoria: newJogoCategoria,
      });
      setJogoId(result.id);
      setShowNewJogo(false);
      setNewJogoNome('');
      setNewJogoCategoria('');
    } catch (error) {
      // Error handled by hook
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!casaId || !jogoId || !valorApostado || !resultado) {
      toast({
        title: 'Erro',
        description: 'Preencha todos os campos obrigatórios.',
        variant: 'destructive',
      });
      return;
    }

    try {
      await createAposta.mutateAsync({
        casa_id: casaId,
        jogo_id: jogoId,
        data: date,
        valor_apostado: parseFloat(valorApostado),
        valor_ganho: parseFloat(valorGanho) || 0,
        resultado,
        observacao: observacao || undefined,
      });
      navigate('/');
    } catch (error) {
      // Error handled by hook
    }
  };

  const categorias = ['Slots', 'Roleta', 'Blackjack', 'Poker', 'Crash', 'Esportes', 'Outros'];

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

            {/* Casa */}
            <div className="space-y-2">
              <Label>Casa de Aposta *</Label>
              {!showNewCasa ? (
                <div className="flex gap-2">
                  <Select value={casaId} onValueChange={setCasaId} disabled={loadingCasas}>
                    <SelectTrigger className="input-dark flex-1">
                      <SelectValue placeholder={loadingCasas ? 'Carregando...' : 'Selecione a casa'} />
                    </SelectTrigger>
                    <SelectContent>
                      {casas.map((casa) => (
                        <SelectItem key={casa.id} value={casa.id}>
                          {casa.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button type="button" variant="outline" size="icon" onClick={() => setShowNewCasa(true)}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Input 
                    placeholder="Nome da casa" 
                    value={newCasaNome}
                    onChange={(e) => setNewCasaNome(e.target.value)}
                    className="input-dark"
                  />
                  <Button type="button" onClick={handleCreateCasa} disabled={createCasa.isPending}>
                    Adicionar
                  </Button>
                  <Button type="button" variant="ghost" onClick={() => setShowNewCasa(false)}>
                    Cancelar
                  </Button>
                </div>
              )}
            </div>

            {/* Jogo */}
            <div className="space-y-2">
              <Label>Jogo *</Label>
              {!showNewJogo ? (
                <div className="flex gap-2">
                  <Select value={jogoId} onValueChange={setJogoId} disabled={loadingJogos}>
                    <SelectTrigger className="input-dark flex-1">
                      <SelectValue placeholder={loadingJogos ? 'Carregando...' : 'Selecione o jogo'} />
                    </SelectTrigger>
                    <SelectContent>
                      {jogos.map((jogo) => (
                        <SelectItem key={jogo.id} value={jogo.id}>
                          {jogo.nome} ({jogo.categoria})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button type="button" variant="outline" size="icon" onClick={() => setShowNewJogo(true)}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Nome do jogo" 
                      value={newJogoNome}
                      onChange={(e) => setNewJogoNome(e.target.value)}
                      className="input-dark"
                    />
                    <Select value={newJogoCategoria} onValueChange={setNewJogoCategoria}>
                      <SelectTrigger className="input-dark w-40">
                        <SelectValue placeholder="Categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        {categorias.map((cat) => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex gap-2">
                    <Button type="button" onClick={handleCreateJogo} disabled={createJogo.isPending}>
                      Adicionar
                    </Button>
                    <Button type="button" variant="ghost" onClick={() => setShowNewJogo(false)}>
                      Cancelar
                    </Button>
                  </div>
                </div>
              )}
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
          <Button 
            type="submit" 
            className="btn-primary w-full flex items-center justify-center gap-2"
            disabled={createAposta.isPending}
          >
            <Save className="w-5 h-5" />
            {createAposta.isPending ? 'Salvando...' : 'Salvar Aposta'}
          </Button>
        </form>
      </div>
    </Layout>
  );
};

export default NovaAposta;
