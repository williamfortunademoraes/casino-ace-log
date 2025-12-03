import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  PlusCircle, 
  Building2, 
  Gamepad2, 
  BarChart3,
  Gift,
  Star,
  Menu,
  X,
  ShieldCheck,
  Bell,
  Settings,
  Calculator,
  Scale,
  User
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: PlusCircle, label: 'Nova Aposta', path: '/nova-aposta' },
  { icon: Building2, label: 'Casas', path: '/casas' },
  { icon: Gamepad2, label: 'Jogos', path: '/jogos' },
  { icon: Calculator, label: 'Calculadora', path: '/calculadora' },
  { icon: Scale, label: 'Comparador', path: '/comparador' },
  { icon: Gift, label: 'Promoções', path: '/promocoes' },
  { icon: ShieldCheck, label: 'Autorizadas', path: '/casas-autorizadas' },
  { icon: Star, label: 'Favoritos', path: '/favoritos' },
  { icon: BarChart3, label: 'Relatórios', path: '/relatorios' },
  { icon: Bell, label: 'Limites', path: '/limites' },
  { icon: User, label: 'Perfil', path: '/perfil' },
  { icon: Settings, label: 'Config', path: '/configuracoes' },
];

const MobileNav = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const mainNavItems = navItems.slice(0, 4);

  return (
    <>
      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-xl border-t border-border z-50 lg:hidden safe-area-bottom">
        <div className="flex items-center justify-around py-2 px-2">
          {mainNavItems.map((item) => {
            const isActive = location.pathname === item.path || 
              (item.path !== '/' && location.pathname.startsWith(item.path));
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'flex flex-col items-center gap-1 p-2 rounded-xl transition-all min-w-[60px]',
                  isActive 
                    ? 'text-primary bg-primary/10' 
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            );
          })}
          <button
            onClick={() => setIsOpen(true)}
            className="flex flex-col items-center gap-1 p-2 rounded-xl text-muted-foreground hover:text-foreground min-w-[60px]"
          >
            <Menu className="w-5 h-5" />
            <span className="text-[10px] font-medium">Mais</span>
          </button>
        </div>
      </nav>

      {/* Full Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-background/95 backdrop-blur-xl z-[100] lg:hidden animate-fade-in">
          <div className="flex flex-col h-full p-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-foreground">Menu</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl bg-muted hover:bg-muted/80 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <nav className="flex-1 space-y-2 overflow-y-auto">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path || 
                  (item.path !== '/' && location.pathname.startsWith(item.path));
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      'flex items-center gap-4 p-4 rounded-2xl transition-all',
                      isActive 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
                    )}
                  >
                    <item.icon className="w-6 h-6" />
                    <span className="font-medium text-lg">{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileNav;
