import { Link } from 'react-router-dom';
import { Building2, Gamepad2, Receipt } from 'lucide-react';
import { SearchResult } from '@/hooks/useGlobalSearch';

interface SearchResultsProps {
  results: SearchResult[];
  onSelect: () => void;
}

const typeIcons = {
  casa: Building2,
  jogo: Gamepad2,
  aposta: Receipt,
};

const typeLabels = {
  casa: 'Casa',
  jogo: 'Jogo',
  aposta: 'Aposta',
};

const SearchResults = ({ results, onSelect }: SearchResultsProps) => {
  if (results.length === 0) {
    return (
      <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-lg p-4 z-50">
        <p className="text-muted-foreground text-sm text-center">
          Nenhum resultado encontrado
        </p>
      </div>
    );
  }

  return (
    <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-lg overflow-hidden z-50 max-h-80 overflow-y-auto">
      {results.map((result) => {
        const Icon = typeIcons[result.type];
        return (
          <Link
            key={`${result.type}-${result.id}`}
            to={result.link}
            onClick={onSelect}
            className="flex items-center gap-3 p-3 hover:bg-muted/50 transition-colors border-b border-border last:border-b-0"
          >
            <div className="p-2 rounded-lg bg-muted">
              <Icon className="h-4 w-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{result.title}</p>
              <p className="text-xs text-muted-foreground truncate">
                {result.subtitle}
              </p>
            </div>
            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
              {typeLabels[result.type]}
            </span>
          </Link>
        );
      })}
    </div>
  );
};

export default SearchResults;
