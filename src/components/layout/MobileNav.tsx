import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  PlusCircle, 
  Building2, 
  Gamepad2, 
  BarChart3
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: LayoutDashboard, label: 'Home', path: '/' },
  { icon: Building2, label: 'Casas', path: '/casas' },
  { icon: PlusCircle, label: 'Nova', path: '/nova-aposta' },
  { icon: Gamepad2, label: 'Jogos', path: '/jogos' },
  { icon: BarChart3, label: 'Relatórios', path: '/relatorios' },
];

const MobileNav = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-sidebar border-t border-sidebar-border p-2 flex justify-around items-center z-50 lg:hidden">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path || 
          (item.path !== '/' && location.pathname.startsWith(item.path));
        const isMain = item.path === '/nova-aposta';
        
        return (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              'flex flex-col items-center gap-1 p-2 rounded-xl transition-all',
              isActive && !isMain && 'text-primary',
              !isActive && !isMain && 'text-muted-foreground',
              isMain && 'bg-primary text-primary-foreground -mt-6 p-3 rounded-full shadow-glow-md'
            )}
          >
            <item.icon className={cn('w-5 h-5', isMain && 'w-6 h-6')} />
            {!isMain && <span className="text-xs font-medium">{item.label}</span>}
          </Link>
        );
      })}
    </nav>
  );
};

export default MobileNav;
