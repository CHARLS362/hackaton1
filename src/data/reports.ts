import data from './reports.json';

export interface Report {
  id: string;
  type: string;
  description: string;
  location: {
    lat: number;
    lng: number;
  };
  image: string;
  timestamp: string;
  author?: string;
}

export const reports: Report[] = data.reports;
