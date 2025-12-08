import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

export interface SearchResult {
  id: string;
  type: 'casa' | 'jogo' | 'aposta';
  title: string;
  subtitle: string;
  link: string;
}

export const useGlobalSearch = (query: string) => {
  const { user } = useAuth();

  const { data: casas = [] } = useQuery({
    queryKey: ['casas', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('casas')
        .select('*')
        .eq('user_id', user!.id);
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const { data: jogos = [] } = useQuery({
    queryKey: ['jogos', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('jogos')
        .select('*')
        .eq('user_id', user!.id);
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const { data: apostas = [] } = useQuery({
    queryKey: ['apostas', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('apostas')
        .select('*')
        .eq('user_id', user!.id);
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const results = useMemo(() => {
    if (!query.trim() || query.length < 2) return [];

    const searchTerm = query.toLowerCase();
    const searchResults: SearchResult[] = [];

    // Search casas
    casas.forEach((casa) => {
      if (casa.nome.toLowerCase().includes(searchTerm)) {
        searchResults.push({
          id: casa.id,
          type: 'casa',
          title: casa.nome,
          subtitle: `Lucro: R$ ${Number(casa.lucro_total || 0).toFixed(2)}`,
          link: `/casas/${casa.id}`,
        });
      }
    });

    // Search jogos
    jogos.forEach((jogo) => {
      if (
        jogo.nome.toLowerCase().includes(searchTerm) ||
        jogo.categoria.toLowerCase().includes(searchTerm) ||
        (jogo.provider && jogo.provider.toLowerCase().includes(searchTerm))
      ) {
        searchResults.push({
          id: jogo.id,
          type: 'jogo',
          title: jogo.nome,
          subtitle: `${jogo.categoria} • ${jogo.provider || 'Sem provedor'}`,
          link: `/jogos/${jogo.id}`,
        });
      }
    });

    // Search apostas by observacao
    apostas.forEach((aposta) => {
      if (aposta.observacao && aposta.observacao.toLowerCase().includes(searchTerm)) {
        searchResults.push({
          id: aposta.id,
          type: 'aposta',
          title: `Aposta - R$ ${Number(aposta.valor_apostado).toFixed(2)}`,
          subtitle: aposta.observacao.substring(0, 50),
          link: '/apostas',
        });
      }
    });

    return searchResults.slice(0, 10); // Limit results
  }, [query, casas, jogos, apostas]);

  return { results };
};
