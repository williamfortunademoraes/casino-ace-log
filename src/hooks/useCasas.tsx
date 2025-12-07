import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

export interface CasaDB {
  id: string;
  user_id: string;
  nome: string;
  link: string | null;
  logo: string | null;
  total_gasto: number;
  total_ganho: number;
  lucro_total: number;
  autorizada_governo: boolean;
  favorito: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateCasaInput {
  nome: string;
  link?: string;
  logo?: string;
  autorizada_governo?: boolean;
}

export function useCasas() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: casas = [], isLoading, error } = useQuery({
    queryKey: ['casas', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from('casas')
        .select('*')
        .eq('user_id', user.id)
        .order('nome');
      
      if (error) throw error;
      return data as CasaDB[];
    },
    enabled: !!user?.id,
  });

  const createCasa = useMutation({
    mutationFn: async (input: CreateCasaInput) => {
      if (!user?.id) throw new Error('Usuário não autenticado');
      
      const { data, error } = await supabase
        .from('casas')
        .insert({
          user_id: user.id,
          nome: input.nome,
          link: input.link || null,
          logo: input.logo || null,
          autorizada_governo: input.autorizada_governo || false,
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['casas'] });
      toast({
        title: 'Casa adicionada!',
        description: 'A casa de apostas foi cadastrada com sucesso.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Erro ao adicionar casa',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const updateCasa = useMutation({
    mutationFn: async ({ id, ...input }: Partial<CasaDB> & { id: string }) => {
      const { data, error } = await supabase
        .from('casas')
        .update(input)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['casas'] });
    },
    onError: (error) => {
      toast({
        title: 'Erro ao atualizar casa',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const deleteCasa = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('casas')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['casas'] });
      toast({
        title: 'Casa removida',
        description: 'A casa de apostas foi excluída com sucesso.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Erro ao remover casa',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  return {
    casas,
    isLoading,
    error,
    createCasa,
    updateCasa,
    deleteCasa,
  };
}
