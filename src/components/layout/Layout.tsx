import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';
import Header from './Header';
import { useSidebar } from '@/hooks/useSidebar';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { isExpanded } = useSidebar();

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>
      
      {/* Main Content */}
      <div className={cn(
        'min-h-screen pb-24 lg:pb-0 transition-all duration-300',
        isExpanded ? 'lg:ml-64' : 'lg:ml-[72px]'
      )}>
        {/* Header with Search */}
        <Header />
        
        <main>
          <div className="p-4 lg:p-8 max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Navigation */}
      <MobileNav />
    </div>
  );
};

export default Layout;
