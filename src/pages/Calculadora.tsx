import { useState } from 'react';
import { Calculator, Percent, RefreshCw, ArrowLeftRight } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

const Calculadora = () => {
  // Lucro/Perda
  const [valorApostado, setValorApostado] = useState('');
  const [odd, setOdd] = useState('');
  
  // Gerenciamento de Banca
  const [bancaTotal, setBancaTotal] = useState('');
  const [percentualRisco, setPercentualRisco] = useState('2');
  
  // Rollover
  const [bonusRecebido, setBonusRecebido] = useState('');
  const [multiplicadorRollover, setMultiplicadorRollover] = useState('');
  const [apostadoRollover, setApostadoRollover] = useState('');
  
  // Conversor de Odds
  const [oddDecimal, setOddDecimal] = useState('');
  const [oddFracionaria, setOddFracionaria] = useState('');
  const [oddAmericana, setOddAmericana] = useState('');

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  // Cálculos Lucro/Perda
  const calcularLucro = () => {
    const aposta = parseFloat(valorApostado) || 0;
    const oddValor = parseFloat(odd) || 0;
    const retornoPotencial = aposta * oddValor;
    const lucroLiquido = retornoPotencial - aposta;
    return { retornoPotencial, lucroLiquido };
  };

  // Cálculos Gerenciamento de Banca
  const calcularValorIdeal = () => {
    const banca = parseFloat(bancaTotal) || 0;
    const percentual = parseFloat(percentualRisco) || 2;
    return banca * (percentual / 100);
  };

  // Cálculos Rollover
  const calcularRollover = () => {
    const bonus = parseFloat(bonusRecebido) || 0;
    const multiplicador = parseFloat(multiplicadorRollover) || 0;
    const apostado = parseFloat(apostadoRollover) || 0;
    const totalNecessario = bonus * multiplicador;
    const faltante = Math.max(0, totalNecessario - apostado);
    const progresso = totalNecessario > 0 ? (apostado / totalNecessario) * 100 : 0;
    return { totalNecessario, faltante, progresso };
  };

  // Conversão de Odds
  const converterDeDecimal = (decimal: string) => {
    const d = parseFloat(decimal);
    if (isNaN(d) || d <= 1) return;
    
    // Decimal para Fracionária
    const numerador = d - 1;
    const fracionaria = `${numerador.toFixed(2)}/1`;
    
    // Decimal para Americana
    let americana = '';
    if (d >= 2) {
      americana = `+${((d - 1) * 100).toFixed(0)}`;
    } else {
      americana = `${(-100 / (d - 1)).toFixed(0)}`;
    }
    
    setOddFracionaria(fracionaria);
    setOddAmericana(americana);
  };

  const { retornoPotencial, lucroLiquido } = calcularLucro();
  const valorIdeal = calcularValorIdeal();
  const { totalNecessario, faltante, progresso } = calcularRollover();

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Calculadora de Apostas</h1>
        <p className="text-muted-foreground">Ferramentas para gerenciar suas apostas</p>
      </div>

      <Tabs defaultValue="lucro" className="space-y-6">
        <TabsList className="grid grid-cols-2 lg:grid-cols-4 gap-2 bg-transparent h-auto p-0">
          <TabsTrigger value="lucro" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground bg-muted rounded-xl py-3">
            <Calculator className="w-4 h-4 mr-2" />
            Lucro/Perda
          </TabsTrigger>
          <TabsTrigger value="banca" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground bg-muted rounded-xl py-3">
            <Percent className="w-4 h-4 mr-2" />
            Banca
          </TabsTrigger>
          <TabsTrigger value="rollover" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground bg-muted rounded-xl py-3">
            <RefreshCw className="w-4 h-4 mr-2" />
            Rollover
          </TabsTrigger>
          <TabsTrigger value="conversor" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground bg-muted rounded-xl py-3">
            <ArrowLeftRight className="w-4 h-4 mr-2" />
            Conversor
          </TabsTrigger>
        </TabsList>

        <TabsContent value="lucro" className="animate-fade-in">
          <Card className="card-glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-primary" />
                Calculadora de Lucro/Perda
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="valorApostado">Valor Apostado (R$)</Label>
                  <Input
                    id="valorApostado"
                    type="number"
                    placeholder="100.00"
                    value={valorApostado}
                    onChange={(e) => setValorApostado(e.target.value)}
                    className="bg-muted border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="odd">Odd (Decimal)</Label>
                  <Input
                    id="odd"
                    type="number"
                    step="0.01"
                    placeholder="2.50"
                    value={odd}
                    onChange={(e) => setOdd(e.target.value)}
                    className="bg-muted border-border"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-border">
                <div className="p-4 rounded-xl bg-muted/50">
                  <p className="text-sm text-muted-foreground mb-1">Retorno Potencial</p>
                  <p className="text-2xl font-bold text-foreground">
                    {formatCurrency(retornoPotencial)}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-muted/50">
                  <p className="text-sm text-muted-foreground mb-1">Lucro Líquido</p>
                  <p className={cn(
                    'text-2xl font-bold',
                    lucroLiquido >= 0 ? 'text-primary' : 'text-destructive'
                  )}>
                    {lucroLiquido >= 0 ? '+' : ''}{formatCurrency(lucroLiquido)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="banca" className="animate-fade-in">
          <Card className="card-glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Percent className="w-5 h-5 text-primary" />
                Gerenciamento de Banca
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bancaTotal">Banca Total (R$)</Label>
                  <Input
                    id="bancaTotal"
                    type="number"
                    placeholder="5000.00"
                    value={bancaTotal}
                    onChange={(e) => setBancaTotal(e.target.value)}
                    className="bg-muted border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="percentualRisco">% de Risco por Aposta</Label>
                  <Input
                    id="percentualRisco"
                    type="number"
                    step="0.5"
                    placeholder="2"
                    value={percentualRisco}
                    onChange={(e) => setPercentualRisco(e.target.value)}
                    className="bg-muted border-border"
                  />
                </div>
              </div>

              <div className="p-6 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20">
                <p className="text-sm text-muted-foreground mb-2">Valor Ideal por Aposta</p>
                <p className="text-3xl font-bold text-primary">
                  {formatCurrency(valorIdeal)}
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  {percentualRisco}% da sua banca de {formatCurrency(parseFloat(bancaTotal) || 0)}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-muted/30 text-sm text-muted-foreground">
                <p className="font-medium text-foreground mb-2">💡 Dica de Gerenciamento</p>
                <p>Especialistas recomendam arriscar entre 1% e 5% da banca por aposta. Isso protege seu capital contra sequências de perdas.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rollover" className="animate-fade-in">
          <Card className="card-glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <RefreshCw className="w-5 h-5 text-primary" />
                Calculadora de Rollover
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bonusRecebido">Bônus Recebido (R$)</Label>
                  <Input
                    id="bonusRecebido"
                    type="number"
                    placeholder="500.00"
                    value={bonusRecebido}
                    onChange={(e) => setBonusRecebido(e.target.value)}
                    className="bg-muted border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="multiplicadorRollover">Multiplicador (x)</Label>
                  <Input
                    id="multiplicadorRollover"
                    type="number"
                    placeholder="35"
                    value={multiplicadorRollover}
                    onChange={(e) => setMultiplicadorRollover(e.target.value)}
                    className="bg-muted border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="apostadoRollover">Já Apostado (R$)</Label>
                  <Input
                    id="apostadoRollover"
                    type="number"
                    placeholder="5000.00"
                    value={apostadoRollover}
                    onChange={(e) => setApostadoRollover(e.target.value)}
                    className="bg-muted border-border"
                  />
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-border">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total Necessário</span>
                  <span className="font-bold text-foreground">{formatCurrency(totalNecessario)}</span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progresso</span>
                    <span className="text-primary font-medium">{progresso.toFixed(1)}%</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-accent transition-all"
                      style={{ width: `${Math.min(100, progresso)}%` }}
                    />
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-muted/50">
                  <p className="text-sm text-muted-foreground mb-1">Falta Apostar</p>
                  <p className={cn(
                    'text-2xl font-bold',
                    faltante > 0 ? 'text-destructive' : 'text-primary'
                  )}>
                    {formatCurrency(faltante)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="conversor" className="animate-fade-in">
          <Card className="card-glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowLeftRight className="w-5 h-5 text-primary" />
                Conversor de Odds
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="oddDecimal">Odd Decimal</Label>
                <Input
                  id="oddDecimal"
                  type="number"
                  step="0.01"
                  placeholder="2.50"
                  value={oddDecimal}
                  onChange={(e) => {
                    setOddDecimal(e.target.value);
                    converterDeDecimal(e.target.value);
                  }}
                  className="bg-muted border-border"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-border">
                <div className="p-4 rounded-xl bg-muted/50">
                  <p className="text-sm text-muted-foreground mb-1">Odd Fracionária</p>
                  <p className="text-2xl font-bold text-foreground">
                    {oddFracionaria || '-'}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-muted/50">
                  <p className="text-sm text-muted-foreground mb-1">Odd Americana</p>
                  <p className="text-2xl font-bold text-foreground">
                    {oddAmericana || '-'}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-muted/30 text-sm">
                <p className="font-medium text-foreground mb-2">📊 Tipos de Odds</p>
                <ul className="space-y-1 text-muted-foreground">
                  <li><strong>Decimal:</strong> Retorno total por R$1 apostado (ex: 2.50)</li>
                  <li><strong>Fracionária:</strong> Lucro/Aposta (ex: 3/2)</li>
                  <li><strong>Americana:</strong> +150 (favorito) ou -200 (azarão)</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default Calculadora;
