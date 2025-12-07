import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

export interface JogoDB {
  id: string;
  user_id: string;
  nome: string;
  categoria: string;
  imagem_promocional: string | null;
  provider: string | null;
  rtp_teorico: number | null;
  total_jogadas: number;
  total_gasto: number;
  total_ganho: number;
  lucro_total: number;
  favorito: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateJogoInput {
  nome: string;
  categoria: string;
  imagem_promocional?: string;
  provider?: string;
  rtp_teorico?: number;
}

export function useJogos() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: jogos = [], isLoading, error } = useQuery({
    queryKey: ['jogos', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from('jogos')
        .select('*')
        .eq('user_id', user.id)
        .order('nome');
      
      if (error) throw error;
      return data as JogoDB[];
    },
    enabled: !!user?.id,
  });

  const createJogo = useMutation({
    mutationFn: async (input: CreateJogoInput) => {
      if (!user?.id) throw new Error('Usuário não autenticado');
      
      const { data, error } = await supabase
        .from('jogos')
        .insert({
          user_id: user.id,
          nome: input.nome,
          categoria: input.categoria,
          imagem_promocional: input.imagem_promocional || null,
          provider: input.provider || null,
          rtp_teorico: input.rtp_teorico || null,
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jogos'] });
      toast({
        title: 'Jogo adicionado!',
        description: 'O jogo foi cadastrado com sucesso.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Erro ao adicionar jogo',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const updateJogo = useMutation({
    mutationFn: async ({ id, ...input }: Partial<JogoDB> & { id: string }) => {
      const { data, error } = await supabase
        .from('jogos')
        .update(input)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jogos'] });
    },
    onError: (error) => {
      toast({
        title: 'Erro ao atualizar jogo',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const deleteJogo = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('jogos')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jogos'] });
      toast({
        title: 'Jogo removido',
        description: 'O jogo foi excluído com sucesso.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Erro ao remover jogo',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  return {
    jogos,
    isLoading,
    error,
    createJogo,
    updateJogo,
    deleteJogo,
  };
}
