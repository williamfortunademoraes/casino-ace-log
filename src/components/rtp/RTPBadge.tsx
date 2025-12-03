import { cn } from '@/lib/utils';
import { RTPAnalysis, getClassificacaoColor, getTendenciaIcon } from '@/utils/rtp';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface RTPBadgeProps {
  analysis: RTPAnalysis;
  showDetails?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const RTPBadge = ({ analysis, showDetails = false, size = 'md' }: RTPBadgeProps) => {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-2',
  };

  const badge = (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full font-medium',
        sizeClasses[size],
        analysis.classificacao === 'bom' && 'bg-primary/20 text-primary',
        analysis.classificacao === 'medio' && 'bg-yellow-500/20 text-yellow-500',
        analysis.classificacao === 'perigoso' && 'bg-destructive/20 text-destructive'
      )}
    >
      RTP: {analysis.rtp.toFixed(1)}%
      <span>{getTendenciaIcon(analysis.tendencia)}</span>
    </span>
  );

  if (!showDetails) {
    return badge;
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        {badge}
      </TooltipTrigger>
      <TooltipContent className="max-w-xs">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Seu RTP:</span>
            <span className={cn('font-bold', getClassificacaoColor(analysis.classificacao))}>
              {analysis.rtp.toFixed(2)}%
            </span>
          </div>
          {analysis.rtpTeorico && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">RTP Teórico:</span>
              <span className="font-medium">{analysis.rtpTeorico}%</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-muted-foreground">Tendência:</span>
            <span>{getTendenciaIcon(analysis.tendencia)} {analysis.tendencia}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Classificação:</span>
            <span className={cn('capitalize font-medium', getClassificacaoColor(analysis.classificacao))}>
              {analysis.classificacao}
            </span>
          </div>
        </div>
      </TooltipContent>
    </Tooltip>
  );
};

export default RTPBadge;
