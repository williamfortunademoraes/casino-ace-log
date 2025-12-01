import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  PlusCircle, 
  Building2, 
  Gamepad2, 
  BarChart3, 
  Settings,
  TrendingUp,
  Gift,
  ShieldCheck,
  Star,
  Bell
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: PlusCircle, label: 'Nova Aposta', path: '/nova-aposta' },
  { icon: Building2, label: 'Casas', path: '/casas' },
  { icon: Gamepad2, label: 'Jogos', path: '/jogos' },
  { icon: Gift, label: 'Promoções', path: '/promocoes' },
  { icon: ShieldCheck, label: 'Casas Autorizadas', path: '/casas-autorizadas' },
  { icon: Star, label: 'Favoritos', path: '/favoritos' },
  { icon: BarChart3, label: 'Relatórios', path: '/relatorios' },
  { icon: Bell, label: 'Limites & Alertas', path: '/limites' },
  { icon: Settings, label: 'Configurações', path: '/configuracoes' },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-sidebar border-r border-sidebar-border p-6 flex flex-col z-50">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg shadow-primary/25">
          <TrendingUp className="w-7 h-7 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Cassino</h1>
          <p className="text-xs text-muted-foreground font-medium">Tracker Pro</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || 
            (item.path !== '/' && location.pathname.startsWith(item.path));
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'nav-item group relative',
                isActive && 'active'
              )}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full" />
              )}
              <item.icon className={cn(
                "w-5 h-5 transition-colors",
                isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
              )} />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="pt-4 border-t border-sidebar-border">
        <div className="px-3 py-2 rounded-xl bg-muted/50">
          <p className="text-xs text-muted-foreground text-center">
            v2.0.0 • Jogue com responsabilidade
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
