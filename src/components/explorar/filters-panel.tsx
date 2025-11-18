'use client';

import { useState, useEffect } from 'react';
import type { Article } from '@/data/articles';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Filter, Search } from 'lucide-react';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';

interface FiltersPanelProps {
  articles: Article[];
  onFilterChange: (filteredArticles: Article[]) => void;
  originalCount: number;
  filteredCount: number;
}

const allJournals = [
  'Revista de Biología Tropical',
  'Water Research',
  'Environmental Pollution',
  'Science of The Total Environment',
  'Journal of Hydrology',
  'PLoS ONE',
];

export function FiltersPanel({
  articles,
  onFilterChange,
  originalCount,
  filteredCount,
}: FiltersPanelProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [yearRange, setYearRange] = useState([2010, 2025]);
  const [selectedJournals, setSelectedJournals] = useState<string[]>([]);

  useEffect(() => {
    const applyFilters = () => {
      let filtered = articles;

      // Filter by search term in title/summary
      if (searchTerm) {
        const lowercasedTerm = searchTerm.toLowerCase();
        filtered = filtered.filter(
          (article) =>
            article.title.toLowerCase().includes(lowercasedTerm) ||
            article.summary.toLowerCase().includes(lowercasedTerm)
        );
      }

      // Filter by year range
      filtered = filtered.filter(
        (article) =>
          article.year >= yearRange[0] && article.year <= yearRange[1]
      );
      
      // Filter by journal
      if (selectedJournals.length > 0) {
        filtered = filtered.filter((article) => selectedJournals.includes(article.journal));
      }

      onFilterChange(filtered);
    };

    applyFilters();
  }, [searchTerm, yearRange, selectedJournals, articles, onFilterChange]);
  
  const handleJournalChange = (journal: string) => {
    setSelectedJournals(prev => 
      prev.includes(journal) 
        ? prev.filter(j => j !== journal)
        : [...prev, journal]
    );
  };


  return (
    <Card className="bg-slate-800 border-slate-700 text-white sticky top-24">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5" />
          <CardTitle className="text-xl">Filtros</CardTitle>
        </div>
        <div className="text-sm text-blue-400 font-semibold">
          {filteredCount} / {originalCount}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <Input
            type="text"
            placeholder="Buscar en el título, resumen..."
            className="w-full bg-slate-700 border-slate-600 text-white placeholder:text-slate-500 pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-300">
            Rango de años:{" "}
            <span className="font-bold text-blue-400">
              {yearRange[0]} - {yearRange[1]}
            </span>
          </label>
          <Slider
            min={2000}
            max={2025}
            step={1}
            value={yearRange}
            onValueChange={(value) => setYearRange(value)}
            className="mt-3"
          />
        </div>

        <Accordion type="single" collapsible>
          <AccordionItem value="item-1" className="border-b-0">
            <AccordionTrigger className="bg-slate-700/50 hover:bg-slate-700 px-4 rounded-lg text-sm font-semibold">
              Filtros Avanzados
            </AccordionTrigger>
            <AccordionContent className="pt-4 px-2 space-y-4">
               <div>
                <h4 className="font-semibold mb-2 text-slate-300">Revista</h4>
                <div className="space-y-2">
                  {allJournals.map(journal => (
                    <div key={journal} className="flex items-center space-x-2">
                      <Checkbox 
                        id={journal} 
                        checked={selectedJournals.includes(journal)}
                        onCheckedChange={() => handleJournalChange(journal)}
                        className="border-slate-500 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                      />
                      <Label htmlFor={journal} className="text-sm text-slate-400 font-normal">
                        {journal}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
