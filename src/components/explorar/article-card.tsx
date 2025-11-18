import type { Article } from '@/data/articles';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Calendar, ArrowRight, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ArticleCardProps {
  article: Article;
  layout: string;
}

export function ArticleCard({ article, layout }: ArticleCardProps) {
  const maxTags = layout === 'grid' ? 3 : 5;
  const remainingTags = article.tags.length - maxTags;

  return (
    <Card className={cn(
      "bg-white border-slate-200 text-slate-800 h-full flex flex-col group hover:border-primary transition-all shadow-sm hover:shadow-lg",
      layout === 'list' ? 'flex-row' : ''
    )}>
      <div className={cn("flex flex-col flex-grow", layout === 'list' ? 'p-6' : '')}>
        <CardHeader className={cn(layout === 'list' ? 'p-0' : '')}>
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg font-bold leading-tight group-hover:text-primary transition-colors pr-2">
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                {article.title}
              </a>
            </CardTitle>
            <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-primary transition-colors shrink-0">
              <ExternalLink className="w-5 h-5" />
            </a>
          </div>
          <CardDescription className="text-slate-500 text-xs pt-2">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <div className="flex items-center gap-1.5">
                <Users className="w-3 h-3" />
                <span>{article.authors.join(', ')}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3 h-3" />
                <span>{article.year}</span>
              </div>
            </div>
            <p className="mt-2">{article.journal}</p>
          </CardDescription>
        </CardHeader>
        <CardContent className={cn("flex-grow flex flex-col", layout === 'list' ? 'p-0 mt-4' : '')}>
          <p className="text-slate-600 text-sm mb-4 flex-grow">
            {article.summary}
          </p>
          <div className="flex flex-wrap gap-2">
            {article.tags.slice(0, maxTags).map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-slate-100 text-slate-700 border-slate-200">
                {tag}
              </Badge>
            ))}
            {remainingTags > 0 && (
              <Badge variant="secondary" className="bg-slate-100 text-slate-700 border-slate-200">
                +{remainingTags}
              </Badge>
            )}
          </div>
        </CardContent>
      </div>
      {layout === 'grid' && (
        <div className="p-6 pt-0 mt-auto">
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-sm font-semibold text-primary group-hover:underline"
          >
            Leer más <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      )}
       {layout === 'list' && (
         <div className="flex items-center justify-center p-6 border-l border-slate-200">
             <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-primary transition-colors"
            >
                <ArrowRight className="w-5 h-5" />
            </a>
         </div>
       )}
    </Card>
  );
}
