import { Provider, Licao } from '@/types';

export const mockProviders: Provider[] = [
  {
    id: '1',
    nome: 'Pragmatic Play',
    descricao: 'Um dos maiores provedores de slots do mundo, conhecido por jogos como Gates of Olympus, Sweet Bonanza e Big Bass.',
    logo: '🎰',
    totalJogos: 15,
    totalGasto: 5000,
    totalGanho: 4800,
    lucroTotal: -200,
    rtpMedio: 96.5,
    jogoMaisLucrativo: 'Gates of Olympus',
    melhoresHorarios: ['10:00-12:00', '22:00-00:00'],
    tendencia: 'estavel',
  },
  {
    id: '2',
    nome: 'Play\'n GO',
    descricao: 'Criadores do famoso Book of Dead e Rich Wilde series. Conhecidos por slots de alta volatilidade.',
    logo: '🎲',
    totalJogos: 12,
    totalGasto: 3500,
    totalGanho: 4200,
    lucroTotal: 700,
    rtpMedio: 96.2,
    jogoMaisLucrativo: 'Book of Dead',
    melhoresHorarios: ['14:00-16:00', '20:00-22:00'],
    tendencia: 'alta',
  },
  {
    id: '3',
    nome: 'NetEnt',
    descricao: 'Pioneiros em slots online com clássicos como Starburst, Gonzo\'s Quest e Dead or Alive.',
    logo: '💎',
    totalJogos: 8,
    totalGasto: 2000,
    totalGanho: 1500,
    lucroTotal: -500,
    rtpMedio: 96.8,
    jogoMaisLucrativo: 'Starburst',
    melhoresHorarios: ['08:00-10:00'],
    tendencia: 'baixa',
  },
  {
    id: '4',
    nome: 'Hacksaw Gaming',
    descricao: 'Conhecidos por slots de alta volatilidade como Wanted Dead or Wild e Chaos Crew.',
    logo: '🪓',
    totalJogos: 6,
    totalGasto: 1500,
    totalGanho: 2100,
    lucroTotal: 600,
    rtpMedio: 96.3,
    jogoMaisLucrativo: 'Wanted Dead or Wild',
    melhoresHorarios: ['18:00-20:00'],
    tendencia: 'alta',
  },
  {
    id: '5',
    nome: 'Push Gaming',
    descricao: 'Criadores de slots inovadores como Jammin\' Jars e Fat Santa com mecânicas únicas.',
    logo: '🍇',
    totalJogos: 5,
    totalGasto: 1200,
    totalGanho: 1100,
    lucroTotal: -100,
    rtpMedio: 96.4,
    jogoMaisLucrativo: 'Jammin\' Jars',
    melhoresHorarios: ['12:00-14:00'],
    tendencia: 'estavel',
  },
  {
    id: '6',
    nome: 'Big Time Gaming',
    descricao: 'Inventores da mecânica Megaways™. Conhecidos por Bonanza e Extra Chilli.',
    logo: '⚡',
    totalJogos: 7,
    totalGasto: 2500,
    totalGanho: 3000,
    lucroTotal: 500,
    rtpMedio: 96.6,
    jogoMaisLucrativo: 'Bonanza Megaways',
    melhoresHorarios: ['16:00-18:00', '21:00-23:00'],
    tendencia: 'alta',
  },
];

export const mockLicoes: Licao[] = [
  // Gestão de Banca
  {
    id: '1',
    titulo: 'Introdução à Gestão de Banca',
    descricao: 'Aprenda os fundamentos para proteger seu dinheiro nas apostas.',
    categoria: 'gestao_banca',
    conteudo: `# Gestão de Banca: O Pilar do Sucesso

A gestão de banca é a habilidade mais importante que um apostador pode ter. Sem ela, mesmo os melhores jogadores podem perder tudo.

## Por que é importante?

- **Proteção**: Evita que você perca todo seu dinheiro em uma sessão ruim
- **Longevidade**: Permite que você jogue por mais tempo
- **Controle emocional**: Reduz a ansiedade e decisões impulsivas

## Regra de Ouro

Nunca aposte mais de **2-5% da sua banca** em uma única aposta. Isso significa:

- Banca de R$ 1.000 = Aposta máxima de R$ 20-50
- Banca de R$ 500 = Aposta máxima de R$ 10-25

## Dica Final

Defina um valor fixo para sua banca e NUNCA use dinheiro que você precisa para outras coisas.`,
    duracaoMinutos: 10,
    concluida: false,
    ordem: 1,
  },
  {
    id: '2',
    titulo: 'Stop Loss e Stop Win',
    descricao: 'Saiba quando parar - tanto nas perdas quanto nos ganhos.',
    categoria: 'gestao_banca',
    conteudo: `# Stop Loss e Stop Win

Definir limites claros é essencial para proteger seus lucros e minimizar perdas.

## Stop Loss (Limite de Perda)

É o valor máximo que você aceita perder em uma sessão. Recomendação: **20-30% da banca**.

- Banca R$ 1.000 = Stop Loss de R$ 200-300

## Stop Win (Limite de Ganho)

É o valor de lucro onde você para de jogar. Recomendação: **50-100% da banca**.

- Banca R$ 1.000 = Stop Win de R$ 500-1.000

## Por que usar Stop Win?

A casa sempre tem vantagem. Quanto mais você joga, maior a chance de devolver os lucros. Saiba a hora de parar!

## Checklist

- [ ] Definir stop loss antes de começar
- [ ] Definir stop win antes de começar
- [ ] NUNCA mudar os limites durante a sessão`,
    duracaoMinutos: 8,
    concluida: false,
    ordem: 2,
  },
  // RTP
  {
    id: '3',
    titulo: 'O que é RTP?',
    descricao: 'Entenda como funciona o Return to Player nos slots.',
    categoria: 'rtp',
    conteudo: `# RTP - Return to Player

RTP (Retorno ao Jogador) é a porcentagem teórica que um jogo devolve aos jogadores ao longo do tempo.

## Como funciona?

Um slot com RTP de 96% significa que, teoricamente, para cada R$ 100 apostados, o jogo devolve R$ 96.

**Importante**: Este é um valor teórico calculado em milhões de rodadas!

## RTPs Comuns

- **Alto**: 97% ou mais (ex: Blood Suckers - 98%)
- **Médio**: 95-97% (maioria dos slots)
- **Baixo**: Abaixo de 95% (evitar!)

## Mitos sobre RTP

❌ "O jogo vai pagar porque não pagou hoje"
❌ "Se mudar de slot, o próximo vai pagar"
❌ "RTP muda dependendo do horário"

✅ Cada rodada é independente
✅ RTP é calculado em milhões de spins
✅ O RTP é fixo e auditado`,
    duracaoMinutos: 12,
    concluida: false,
    ordem: 3,
  },
  {
    id: '4',
    titulo: 'RTP Real vs Teórico',
    descricao: 'Por que seu RTP pessoal pode ser diferente do anunciado.',
    categoria: 'rtp',
    conteudo: `# RTP Real vs Teórico

Seu RTP pessoal é o que você realmente está recebendo de volta nos jogos.

## Calculando seu RTP Real

\`\`\`
RTP Real = (Total Ganho / Total Apostado) × 100
\`\`\`

**Exemplo**:
- Apostou: R$ 1.000
- Ganhou: R$ 850
- RTP Real: 85%

## Por que a diferença?

- O RTP teórico precisa de milhões de rodadas
- Sua amostra é muito pequena
- Variância natural dos jogos

## O que fazer?

- Acompanhe seu RTP real no Cassino Tracker
- Se seu RTP está muito baixo em um jogo, considere trocar
- Não persiga perdas tentando "recuperar o RTP"`,
    duracaoMinutos: 10,
    concluida: false,
    ordem: 4,
  },
  // Volatilidade
  {
    id: '5',
    titulo: 'Entendendo Volatilidade',
    descricao: 'Saiba como a volatilidade afeta sua experiência de jogo.',
    categoria: 'volatilidade',
    conteudo: `# Volatilidade nos Slots

Volatilidade indica a frequência e o tamanho dos pagamentos.

## Tipos de Volatilidade

### Baixa Volatilidade
- Pagamentos frequentes
- Valores menores
- Menos risco
- Ex: Starburst, Blood Suckers

### Média Volatilidade
- Equilíbrio entre frequência e valor
- Risco moderado
- Ex: Dead or Alive II, Gonzo's Quest

### Alta Volatilidade
- Pagamentos raros
- Valores potencialmente enormes
- Alto risco
- Ex: Gates of Olympus, Wanted Dead or Wild

## Qual escolher?

- **Banca pequena**: Prefira baixa/média volatilidade
- **Banca grande**: Pode arriscar alta volatilidade
- **Sessão curta**: Baixa volatilidade
- **Caçando big wins**: Alta volatilidade

## Regra de Ouro

Sua banca deve aguentar pelo menos 200-500 rodadas no jogo que você escolher.`,
    duracaoMinutos: 15,
    concluida: false,
    ordem: 5,
  },
  // Estratégia
  {
    id: '6',
    titulo: 'Escolhendo o Jogo Certo',
    descricao: 'Critérios para selecionar slots com melhor potencial.',
    categoria: 'estrategia',
    conteudo: `# Como Escolher o Jogo Certo

Nem todos os slots são iguais. Saiba escolher os melhores para sua estratégia.

## Checklist de Seleção

✅ RTP acima de 96%
✅ Volatilidade adequada à sua banca
✅ Mecânicas que você entende
✅ Buy bonus disponível (se for usar)
✅ Boa reputação do provider

## Evite

❌ Slots sem RTP visível
❌ Jogos que você não conhece
❌ RTPs abaixo de 94%
❌ Slots "exclusivos" de cassinos duvidosos

## Dica Pro

Use o modo demo primeiro! Jogue pelo menos 100 rodadas grátis para entender a mecânica antes de apostar dinheiro real.

## Providers Confiáveis

- Pragmatic Play
- Play'n GO
- NetEnt
- Big Time Gaming
- Push Gaming
- Hacksaw Gaming`,
    duracaoMinutos: 10,
    concluida: false,
    ordem: 6,
  },
  // Psicologia
  {
    id: '7',
    titulo: 'Controle Emocional',
    descricao: 'Aprenda a manter a calma e tomar decisões racionais.',
    categoria: 'psicologia',
    conteudo: `# Controle Emocional nas Apostas

O maior inimigo do apostador não é a casa - é ele mesmo.

## Sinais de TILT

- Aumentar apostas após perdas
- Continuar após atingir stop loss
- Sentir necessidade de "recuperar"
- Fazer depósitos impulsivos
- Jogar com raiva ou frustração

## Como Evitar

1. **Defina limites ANTES** de começar
2. **Use o timer** do Cassino Tracker
3. **Faça pausas** a cada 30-60 minutos
4. **Nunca jogue** cansado, bêbado ou estressado
5. **Aceite** que perdas fazem parte

## Exercício Mental

Antes de cada sessão, diga:
"Estou disposto a perder [valor do stop loss]. Se perder, vou parar sem culpa."

## Quando Parar Imediatamente

- Coração acelerado
- Mãos suando
- Pensando em depositar mais
- Ignorando compromissos
- Mentindo sobre perdas`,
    duracaoMinutos: 12,
    concluida: false,
    ordem: 7,
  },
  // Erros Comuns
  {
    id: '8',
    titulo: 'Erros Fatais',
    descricao: 'Os maiores erros que apostadores cometem e como evitá-los.',
    categoria: 'erros_comuns',
    conteudo: `# Erros Fatais nas Apostas

Aprenda com os erros dos outros para não repetí-los.

## Erro #1: Perseguir Perdas

"Perdi R$ 500, vou depositar mais R$ 500 para recuperar"

**Por que é fatal**: Você está tomando decisões emocionais, não racionais. A chance de perder mais é maior.

## Erro #2: Apostar o Aluguel

Nunca, JAMAIS aposte dinheiro que você precisa para contas, comida ou emergências.

## Erro #3: Ignorar RTP

Jogar slots com RTP de 88% porque "esse paga bem" é queimar dinheiro.

## Erro #4: Não Ter Stop Loss

Sem limite de perda, uma sessão ruim pode acabar com meses de lucro.

## Erro #5: Acreditar em Padrões

"Esse slot não paga há 2 horas, agora vai!"

Cada spin é independente. O slot não "deve" nada a você.

## Erro #6: Jogar Bêbado

Álcool prejudica o julgamento. Perdas aumentam em até 300% quando jogando sob efeito.`,
    duracaoMinutos: 15,
    concluida: false,
    ordem: 8,
  },
];

export const categoriasAprendizado = [
  { id: 'gestao_banca', nome: 'Gestão de Banca', icone: '💰', cor: 'bg-green-500/20 text-green-400' },
  { id: 'rtp', nome: 'RTP', icone: '📊', cor: 'bg-blue-500/20 text-blue-400' },
  { id: 'volatilidade', nome: 'Volatilidade', icone: '📈', cor: 'bg-purple-500/20 text-purple-400' },
  { id: 'estrategia', nome: 'Estratégia', icone: '🎯', cor: 'bg-yellow-500/20 text-yellow-400' },
  { id: 'psicologia', nome: 'Psicologia', icone: '🧠', cor: 'bg-pink-500/20 text-pink-400' },
  { id: 'erros_comuns', nome: 'Erros Comuns', icone: '⚠️', cor: 'bg-red-500/20 text-red-400' },
];
