import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

export interface ApostaDB {
  id: string;
  user_id: string;
  casa_id: string | null;
  jogo_id: string | null;
  data: string;
  valor_apostado: number;
  valor_ganho: number;
  resultado: string | null;
  observacao: string | null;
  lucro: number | null;
  screenshot_url: string | null;
  created_at: string;
}

export interface CreateApostaInput {
  casa_id: string;
  jogo_id: string;
  data: Date;
  valor_apostado: number;
  valor_ganho: number;
  resultado: string;
  observacao?: string;
}

export function useApostas() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: apostas = [], isLoading, error } = useQuery({
    queryKey: ['apostas', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from('apostas')
        .select('*')
        .eq('user_id', user.id)
        .order('data', { ascending: false });
      
      if (error) throw error;
      return data as ApostaDB[];
    },
    enabled: !!user?.id,
  });

  const createAposta = useMutation({
    mutationFn: async (input: CreateApostaInput) => {
      if (!user?.id) throw new Error('Usuário não autenticado');
      
      const lucro = input.valor_ganho - input.valor_apostado;
      
      const { data, error } = await supabase
        .from('apostas')
        .insert({
          user_id: user.id,
          casa_id: input.casa_id,
          jogo_id: input.jogo_id,
          data: input.data.toISOString(),
          valor_apostado: input.valor_apostado,
          valor_ganho: input.valor_ganho,
          resultado: input.resultado,
          observacao: input.observacao || null,
          lucro,
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['apostas'] });
      queryClient.invalidateQueries({ queryKey: ['casas'] });
      queryClient.invalidateQueries({ queryKey: ['jogos'] });
      toast({
        title: 'Aposta registrada!',
        description: 'Sua aposta foi salva com sucesso.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Erro ao registrar aposta',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const deleteAposta = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('apostas')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['apostas'] });
      queryClient.invalidateQueries({ queryKey: ['casas'] });
      queryClient.invalidateQueries({ queryKey: ['jogos'] });
      toast({
        title: 'Aposta excluída',
        description: 'A aposta foi removida com sucesso.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Erro ao excluir aposta',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  // Calcular estatísticas
  const stats = {
    totalGasto: apostas.reduce((acc, a) => acc + a.valor_apostado, 0),
    totalGanho: apostas.reduce((acc, a) => acc + a.valor_ganho, 0),
    saldoAtual: apostas.reduce((acc, a) => acc + (a.lucro || 0), 0),
    totalApostas: apostas.length,
  };

  return {
    apostas,
    isLoading,
    error,
    createAposta,
    deleteAposta,
    stats,
  };
}
