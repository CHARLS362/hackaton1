'use client';

import { useState } from 'react';
import { FiltersPanel } from '@/components/explorar/filters-panel';
import { ArticleGrid } from '@/components/explorar/article-grid';
import { articles, type Article } from '@/data/articles';
import { Input } from '@/components/ui/input';
import { LayoutGrid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

export default function ExplorarPage() {
  const [filteredArticles, setFilteredArticles] = useState<Article[]>(articles);
  const [searchTerm, setSearchTerm] = useState('');
  const [layout, setLayout] = useState('grid');

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const lowercasedTerm = term.toLowerCase();
    const results = articles.filter(
      (article) =>
        article.title.toLowerCase().includes(lowercasedTerm) ||
        article.summary.toLowerCase().includes(lowercasedTerm) ||
        article.authors.some((author) =>
          author.toLowerCase().includes(lowercasedTerm)
        ) ||
        article.tags.some((tag) => tag.toLowerCase().includes(lowercasedTerm))
    );
    setFilteredArticles(results);
  };
  
  const clearSearch = () => {
    setSearchTerm('');
    setFilteredArticles(articles);
  };

  return (
    <div className="bg-white min-h-screen text-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-headline text-slate-800">
            Explorador de Artículos
          </h1>
          <p className="mt-3 text-lg text-slate-600">
            Descubre y explora artículos de investigación científica sobre el
            Lago Titicaca.
          </p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <FiltersPanel
              articles={articles}
              onFilterChange={setFilteredArticles}
              originalCount={articles.length}
              filteredCount={filteredArticles.length}
            />
          </div>

          <div className="lg:col-span-3">
            <div className="mb-6">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Búsqueda por título, resumen o palabras clave..."
                  className="w-full bg-white border-slate-300 text-slate-900 placeholder:text-slate-500 h-12 pl-4 pr-24 rounded-lg"
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                />
                <div className="absolute inset-y-0 right-2 flex items-center gap-2">
                  <ToggleGroup type="single" value={layout} onValueChange={(value) => value && setLayout(value)} aria-label="Layout">
                    <ToggleGroupItem value="grid" aria-label="Grid view" className="data-[state=on]:bg-primary data-[state=on]:text-white">
                      <LayoutGrid className="h-5 w-5" />
                    </ToggleGroupItem>
                    <ToggleGroupItem value="list" aria-label="List view" className="data-[state=on]:bg-primary data-[state=on]:text-white">
                      <List className="h-5 w-5" />
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>
              </div>
              <div className="flex justify-between items-center mt-4 text-sm">
                <p className="text-slate-500">
                  Se encontraron{' '}
                  <span className="font-bold text-primary">
                    {filteredArticles.length}
                  </span>{' '}
                  documentos.
                </p>
                <Button variant="link" className="text-primary p-0 h-auto" onClick={clearSearch}>
                  Borrar todo
                </Button>
              </div>
            </div>
            <ArticleGrid articles={filteredArticles} layout={layout} />
          </div>
        </main>
      </div>
    </div>
  );
}
