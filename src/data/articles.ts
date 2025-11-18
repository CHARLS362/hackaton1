import data from './articles.json';

export interface Article {
  id: string;
  title: string;
  authors: string[];
  year: number;
  journal: string;
  summary: string;
  tags: string[];
  url: string;
}

export const articles: Article[] = data.articles;
