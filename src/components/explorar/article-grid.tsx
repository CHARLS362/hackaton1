import type { Article } from '@/data/articles';
import { ArticleCard } from './article-card';
import { cn } from '@/lib/utils';

interface ArticleGridProps {
  articles: Article[];
  layout: string;
}

export function ArticleGrid({ articles, layout }: ArticleGridProps) {
  if (articles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-20 bg-slate-800/50 rounded-lg">
        <h3 className="text-xl font-semibold">No se encontraron artículos</h3>
        <p className="text-slate-400 mt-2">
          Intenta ajustar tus filtros o términos de búsqueda.
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid gap-6",
        layout === 'grid' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'
      )}
    >
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} layout={layout} />
      ))}
    </div>
  );
}
