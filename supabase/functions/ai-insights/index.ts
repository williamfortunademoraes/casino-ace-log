import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { stats } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Generating AI insights for stats:", JSON.stringify(stats));

    const systemPrompt = `Você é um analista especializado em apostas de cassino online. 
    Analise os dados do usuário e forneça insights personalizados e úteis.
    Responda SEMPRE em português brasileiro.
    Seja direto e prático nas recomendações.
    Foque em padrões, tendências e oportunidades de melhoria.`;

    const userPrompt = `Analise estes dados de apostas e forneça insights inteligentes:

Estatísticas do Usuário:
- Banca Atual: R$ ${stats.bancaAtual}
- Total Apostado: R$ ${stats.totalApostado}
- Total Ganho: R$ ${stats.totalGanho}
- Lucro: R$ ${stats.lucro} (${stats.lucroPorcentagem}%)
- RTP Médio: ${stats.rtpMedio}%

Jogos Jogados:
${stats.jogos?.map((j: any) => `- ${j.nome} (${j.categoria}): Apostado R$${j.totalGasto}, Ganho R$${j.totalGanho}, RTP: ${((j.totalGanho / j.totalGasto) * 100).toFixed(1)}%`).join('\n') || 'Nenhum dado disponível'}

Casas Utilizadas:
${stats.casas?.map((c: any) => `- ${c.nome}: Apostado R$${c.totalGasto}, Ganho R$${c.totalGanho}`).join('\n') || 'Nenhum dado disponível'}

Últimas Apostas:
${stats.ultimasApostas?.map((a: any) => `- ${a.jogo} em ${a.casa}: Apostou R$${a.valorApostado}, Ganhou R$${a.valorGanho} (${a.resultado})`).join('\n') || 'Nenhum dado disponível'}

Com base nesses dados, forneça:
1. **Melhor Horário para Jogar**: Baseado nos padrões de vitória (se não houver dados suficientes, sugira horários gerais)
2. **Jogos Recomendados**: Quais jogos têm melhor RTP para o usuário
3. **Jogos a Evitar**: Quais jogos estão com RTP muito baixo
4. **Gestão de Banca**: Sugestões para melhorar a gestão
5. **Alerta de Risco**: Se detectar padrões de risco
6. **Próximos Passos**: 2-3 ações concretas para melhorar resultados

Responda em formato JSON com esta estrutura:
{
  "melhorHorario": "string com sugestão de horário",
  "jogosRecomendados": ["array de jogos"],
  "jogosEvitar": ["array de jogos"],
  "gestaoBanca": "string com dica",
  "alertaRisco": "string ou null se não houver",
  "proximosPassos": ["array de ações"],
  "resumoGeral": "string com análise geral de 2-3 frases"
}`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Muitas requisições. Tente novamente em alguns minutos." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Créditos insuficientes. Adicione créditos para continuar." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      
      return new Response(JSON.stringify({ error: "Erro ao gerar insights" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    
    console.log("AI response received:", content);

    // Parse JSON from response
    let insights;
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        insights = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("No JSON found in response");
      }
    } catch (parseError) {
      console.error("Error parsing AI response:", parseError);
      insights = {
        melhorHorario: "Manhã (9h-12h) e noite (20h-23h)",
        jogosRecomendados: ["Aviator", "Spaceman"],
        jogosEvitar: [],
        gestaoBanca: "Defina um limite diário de 5% da banca",
        alertaRisco: null,
        proximosPassos: ["Registre mais apostas para insights precisos"],
        resumoGeral: content || "Análise baseada nos dados disponíveis."
      };
    }

    return new Response(JSON.stringify({ insights }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in ai-insights function:", error);
    const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
