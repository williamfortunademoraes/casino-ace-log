import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useGlobalSearch } from '@/hooks/useGlobalSearch';
import SearchResults from './SearchResults';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface SearchDialogProps {
  isExpanded: boolean;
}

const SearchDialog = ({ isExpanded }: SearchDialogProps) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { results } = useGlobalSearch(searchQuery);

  // Keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(true);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelectResult = () => {
    setOpen(false);
    setSearchQuery('');
  };

  const triggerButton = (
    <button
      onClick={() => setOpen(true)}
      className={cn(
        'group flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-300 w-full',
        'text-muted-foreground hover:text-foreground hover:bg-muted/50',
        !isExpanded && 'justify-center'
      )}
    >
      <Search className="w-5 h-5 shrink-0 transition-all duration-300 group-hover:text-primary group-hover:drop-shadow-[0_0_6px_hsl(var(--primary)/0.5)]" />
      <span className={cn(
        'font-medium text-sm whitespace-nowrap transition-all duration-300',
        isExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'
      )}>
        Buscar
      </span>
      {isExpanded && (
        <kbd className="ml-auto pointer-events-none hidden lg:inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-muted/50 px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
          <span className="text-xs">⌘</span>K
        </kbd>
      )}
    </button>
  );

  return (
    <>
      {!isExpanded ? (
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            {triggerButton}
          </TooltipTrigger>
          <TooltipContent side="right" className="bg-card border-border">
            Buscar (⌘K)
          </TooltipContent>
        </Tooltip>
      ) : (
        triggerButton
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg p-0 gap-0 bg-card border-border overflow-hidden">
          <DialogTitle className="sr-only">Buscar</DialogTitle>
          <div className="flex items-center border-b border-border px-4">
            <Search className="h-5 w-5 text-muted-foreground shrink-0" />
            <Input
              type="search"
              placeholder="Buscar jogos, casas, apostas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-0 focus-visible:ring-0 bg-transparent text-base h-14 placeholder:text-muted-foreground"
              autoFocus
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="p-1 hover:bg-muted rounded"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            )}
          </div>
          
          <div className="max-h-[60vh] overflow-y-auto">
            {searchQuery.length >= 2 ? (
              <SearchResults results={results} onSelect={handleSelectResult} />
            ) : (
              <div className="p-8 text-center text-muted-foreground">
                <p className="text-sm">Digite ao menos 2 caracteres para buscar</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SearchDialog;
