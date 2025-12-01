import { useState } from 'react';
import { ShieldCheck, ShieldAlert, ShieldQuestion, Upload, Search, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { casasAutorizadas, casas, verificarAutorizacao } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

const statusConfig = {
  autorizada: { label: 'Autorizada', icon: CheckCircle2, color: 'text-primary bg-primary/10' },
  pendente: { label: 'Pendente', icon: AlertTriangle, color: 'text-yellow-500 bg-yellow-500/10' },
  suspensa: { label: 'Suspensa', icon: XCircle, color: 'text-destructive bg-destructive/10' },
};

const CasasAutorizadas = () => {
  const [busca, setBusca] = useState('');
  const [activeTab, setActiveTab] = useState('lista');

  const casasFiltradas = casasAutorizadas.filter(casa =>
    casa.nome.toLowerCase().includes(busca.toLowerCase()) ||
    casa.marcaComercial.toLowerCase().includes(busca.toLowerCase()) ||
    casa.cnpj.includes(busca)
  );

  // Verificar casas do usuário
  const casasUsuarioVerificadas = casas.map(casa => {
    const autorizada = verificarAutorizacao(casa.nome);
    return {
      ...casa,
      verificacao: autorizada ? 'autorizada' : 'nao_encontrada',
      casaAutorizada: autorizada,
    };
  });

  return (
    <Layout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground flex items-center gap-3">
          <ShieldCheck className="w-8 h-8 text-primary" />
          Casas Autorizadas
        </h1>
        <p className="text-muted-foreground mt-1">
          Lista oficial de casas autorizadas pela Secretaria de Prêmios e Apostas (SPA)
        </p>
      </div>

      {/* Info Card */}
      <div className="card-glass p-4 mb-6 border-l-4 border-primary">
        <div className="flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-primary mt-0.5" />
          <div>
            <h3 className="font-semibold text-foreground">🛡️ Jogue com Segurança</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Sempre verifique se a casa de apostas está na lista oficial do governo brasileiro. 
              Casas não autorizadas não oferecem garantias de segurança para seus dados e dinheiro.
            </p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="lista" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="lista">Lista Oficial</TabsTrigger>
          <TabsTrigger value="verificar">Minhas Casas</TabsTrigger>
        </TabsList>

        <TabsContent value="lista" className="space-y-4">
          {/* Busca */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome, marca ou CNPJ..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Upload */}
          <div className="card-glass p-4 border-dashed border-2 hover:border-primary/50 transition-colors cursor-pointer">
            <div className="flex items-center justify-center gap-3 text-muted-foreground">
              <Upload className="w-5 h-5" />
              <span className="text-sm">Importar lista oficial (PDF/CSV)</span>
            </div>
          </div>

          {/* Tabela */}
          <div className="card-glass overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Marca Comercial</TableHead>
                  <TableHead className="hidden md:table-cell">Razão Social</TableHead>
                  <TableHead className="hidden lg:table-cell">CNPJ</TableHead>
                  <TableHead className="hidden md:table-cell">Domínio</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {casasFiltradas.map((casa) => {
                  const status = statusConfig[casa.statusAutorizacao];
                  const StatusIcon = status.icon;

                  return (
                    <TableRow key={casa.id}>
                      <TableCell className="font-medium">{casa.marcaComercial}</TableCell>
                      <TableCell className="hidden md:table-cell text-muted-foreground">
                        {casa.nome}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell text-muted-foreground font-mono text-sm">
                        {casa.cnpj}
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-muted-foreground">
                        {casa.dominioAprovado}
                      </TableCell>
                      <TableCell>
                        <Badge className={cn('gap-1', status.color)}>
                          <StatusIcon className="w-3 h-3" />
                          {status.label}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>

            {casasFiltradas.length === 0 && (
              <div className="text-center py-8">
                <ShieldQuestion className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">Nenhuma casa encontrada</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="verificar" className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Verificação automática das casas cadastradas no seu perfil:
          </p>

          <div className="space-y-3">
            {casasUsuarioVerificadas.map((casa) => (
              <div 
                key={casa.id} 
                className={cn(
                  'card-glass p-4 flex items-center justify-between',
                  casa.verificacao === 'autorizada' 
                    ? 'border-primary/30' 
                    : 'border-yellow-500/30'
                )}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-xl">
                    {casa.logo}
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">{casa.nome}</h3>
                    {casa.casaAutorizada && (
                      <p className="text-xs text-muted-foreground">
                        CNPJ: {casa.casaAutorizada.cnpj}
                      </p>
                    )}
                  </div>
                </div>

                {casa.verificacao === 'autorizada' ? (
                  <Badge className="gap-1 bg-primary/10 text-primary">
                    <CheckCircle2 className="w-3 h-3" />
                    Autorizada ✔️
                  </Badge>
                ) : (
                  <Badge className="gap-1 bg-yellow-500/10 text-yellow-500">
                    <ShieldAlert className="w-3 h-3" />
                    Não autorizada ⚠️
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default CasasAutorizadas;
