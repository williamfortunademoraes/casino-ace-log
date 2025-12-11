import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Gamepad2, 
  Building2, 
  Layers,
  Gift,
  Target,
  Calculator,
  BookOpen,
  Trophy,
  Crown,
  User,
  HardDrive,
  Palette,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const mainItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Gamepad2, label: 'Jogos', path: '/jogos' },
  { icon: Building2, label: 'Casas', path: '/casas' },
  { icon: Layers, label: 'Provedoras', path: '/providers' },
  { icon: Gift, label: 'Promoções', path: '/promocoes' },
  { icon: Target, label: 'Missões', path: '/gamificacao' },
];

const secondaryItems = [
  { icon: Calculator, label: 'Calculadora', path: '/calculadora' },
  { icon: BookOpen, label: 'Aprendizados', path: '/aprendizados' },
  { icon: Trophy, label: 'Ranking', path: '/ranking' },
  { icon: Crown, label: 'VIP', path: '/vip' },
];

const userItems = [
  { icon: User, label: 'Perfil', path: '/perfil' },
  { icon: HardDrive, label: 'Backup', path: '/configuracoes' },
  { icon: Palette, label: 'Tema', path: '/configuracoes' },
  { icon: Settings, label: 'Configurações', path: '/configuracoes' },
];

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  path: string;
  isActive: boolean;
  isExpanded: boolean;
}

const NavItem = ({ icon: Icon, label, path, isActive, isExpanded }: NavItemProps) => {
  const content = (
    <Link
      to={path}
      className={cn(
        'group flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-300 relative overflow-hidden',
        isActive 
          ? 'bg-primary/20 text-primary' 
          : 'text-muted-foreground hover:text-foreground hover:bg-muted/50',
        !isExpanded && 'justify-center'
      )}
    >
      {/* Glow effect for active item */}
      {isActive && (
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-50" />
      )}
      
      <Icon className={cn(
        'w-5 h-5 shrink-0 transition-all duration-300 relative z-10',
        isActive 
          ? 'text-primary drop-shadow-[0_0_8px_hsl(var(--primary))]' 
          : 'group-hover:text-primary group-hover:drop-shadow-[0_0_6px_hsl(var(--primary)/0.5)]'
      )} />
      
      <span className={cn(
        'font-medium text-sm whitespace-nowrap transition-all duration-300 relative z-10',
        isExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'
      )}>
        {label}
      </span>
      
      {/* Active indicator */}
      {isActive && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full shadow-[0_0_10px_hsl(var(--primary))]" />
      )}
    </Link>
  );

  if (!isExpanded) {
    return (
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          {content}
        </TooltipTrigger>
        <TooltipContent side="right" className="bg-card border-border">
          {label}
        </TooltipContent>
      </Tooltip>
    );
  }

  return content;
};

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    navigate('/auth');
  };

  const userInitials = user?.email 
    ? user.email.substring(0, 2).toUpperCase() 
    : 'U';

  const userName = user?.user_metadata?.username || user?.email?.split('@')[0] || 'Usuário';

  const isActive = (path: string) => {
    return location.pathname === path || 
      (path !== '/' && location.pathname.startsWith(path));
  };

  return (
    <aside 
      className={cn(
        'fixed left-0 top-0 h-full bg-[#0C0F14] border-r border-border/30 flex flex-col z-50 transition-all duration-300 ease-in-out',
        isExpanded ? 'w-64' : 'w-[72px]'
      )}
    >
      {/* Logo */}
      <div className={cn(
        'flex items-center gap-3 p-4 border-b border-border/30',
        !isExpanded && 'justify-center'
      )}>
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-[0_0_20px_hsl(var(--primary)/0.4)]">
          <TrendingUp className="w-5 h-5 text-primary-foreground" />
        </div>
        <div className={cn(
          'transition-all duration-300',
          isExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'
        )}>
          <h1 className="text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Cassino
          </h1>
          <p className="text-[10px] text-muted-foreground font-medium -mt-1">Tracker Pro</p>
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute -right-3 top-20 w-6 h-6 bg-card border border-border/50 rounded-full flex items-center justify-center hover:bg-muted transition-colors shadow-lg z-10"
      >
        {isExpanded ? (
          <ChevronLeft className="w-4 h-4 text-muted-foreground" />
        ) : (
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        )}
      </button>

      {/* User Info */}
      <div className={cn(
        'flex items-center gap-3 mx-3 mt-4 p-2.5 rounded-xl bg-muted/30 border border-border/20',
        !isExpanded && 'justify-center p-2'
      )}>
        <Avatar className="h-9 w-9 shrink-0">
          <AvatarFallback className="bg-primary/20 text-primary text-sm font-semibold">
            {userInitials}
          </AvatarFallback>
        </Avatar>
        <div className={cn(
          'flex-1 min-w-0 transition-all duration-300',
          isExpanded ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'
        )}>
          <p className="text-sm font-medium text-foreground truncate">{userName}</p>
          <p className="text-[11px] text-muted-foreground truncate">{user?.email}</p>
        </div>
      </div>

      {/* Navigation Sections */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {/* Main Section */}
        <div className="space-y-1">
          {isExpanded && (
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground/70 font-semibold px-3 mb-2">
              Principal
            </p>
          )}
          {mainItems.map((item) => (
            <NavItem
              key={item.path}
              icon={item.icon}
              label={item.label}
              path={item.path}
              isActive={isActive(item.path)}
              isExpanded={isExpanded}
            />
          ))}
        </div>

        {/* Secondary Section */}
        <div className="space-y-1">
          {isExpanded && (
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground/70 font-semibold px-3 mb-2">
              Ferramentas
            </p>
          )}
          {secondaryItems.map((item) => (
            <NavItem
              key={item.path + item.label}
              icon={item.icon}
              label={item.label}
              path={item.path}
              isActive={isActive(item.path)}
              isExpanded={isExpanded}
            />
          ))}
        </div>

        {/* User Section */}
        <div className="space-y-1">
          {isExpanded && (
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground/70 font-semibold px-3 mb-2">
              Conta
            </p>
          )}
          {userItems.map((item) => (
            <NavItem
              key={item.path + item.label}
              icon={item.icon}
              label={item.label}
              path={item.path}
              isActive={isActive(item.path)}
              isExpanded={isExpanded}
            />
          ))}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-border/30 space-y-2">
        {/* Logout Button */}
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <button
              onClick={handleLogout}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-destructive hover:bg-destructive/10 transition-all duration-300',
                !isExpanded && 'justify-center'
              )}
            >
              <LogOut className="w-5 h-5 shrink-0" />
              <span className={cn(
                'font-medium text-sm transition-all duration-300',
                isExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'
              )}>
                Sair
              </span>
            </button>
          </TooltipTrigger>
          {!isExpanded && (
            <TooltipContent side="right" className="bg-card border-border">
              Sair
            </TooltipContent>
          )}
        </Tooltip>

        {/* Version */}
        {isExpanded && (
          <div className="px-3 py-2 rounded-lg bg-muted/20">
            <p className="text-[10px] text-muted-foreground text-center">
              v2.0.0 • Jogue com responsabilidade
            </p>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
