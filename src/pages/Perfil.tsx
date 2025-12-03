import { useState } from 'react';
import { User, Mail, Camera, Save, LogOut } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const Perfil = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [nome, setNome] = useState('Usuário Demo');
  const [email, setEmail] = useState('demo@cassinotracker.com');
  const [avatar, setAvatar] = useState('');

  const handleSave = () => {
    toast({
      title: 'Funcionalidade em desenvolvimento',
      description: 'A edição de perfil será habilitada quando o backend for conectado.',
    });
  };

  const handleLogout = () => {
    toast({
      title: 'Logout',
      description: 'Você foi desconectado (modo demo).',
    });
    navigate('/auth');
  };

  const handleAvatarChange = () => {
    toast({
      title: 'Funcionalidade em desenvolvimento',
      description: 'O upload de foto será habilitado quando o backend for conectado.',
    });
  };

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Meu Perfil</h1>
        <p className="text-muted-foreground">Gerencie suas informações pessoais</p>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        {/* Avatar Section */}
        <Card className="card-glass">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={avatar} />
                  <AvatarFallback className="bg-primary/20 text-primary text-2xl">
                    {nome.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <button
                  onClick={handleAvatarChange}
                  className="absolute bottom-0 right-0 p-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <div className="text-center">
                <h2 className="text-xl font-bold text-foreground">{nome}</h2>
                <p className="text-muted-foreground">{email}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Edit Profile */}
        <Card className="card-glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              Editar Perfil
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="nome"
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="pl-10 bg-muted border-border"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-muted border-border"
                />
              </div>
            </div>

            <Button onClick={handleSave} className="w-full">
              <Save className="w-4 h-4 mr-2" />
              Salvar Alterações
            </Button>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="card-glass border-destructive/30">
          <CardHeader>
            <CardTitle className="text-destructive">Zona de Perigo</CardTitle>
          </CardHeader>
          <CardContent>
            <Button 
              variant="destructive" 
              onClick={handleLogout}
              className="w-full"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sair da Conta
            </Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Perfil;
