// This file is now primarily for defining the Report type.
// The data is fetched from the API.

export interface Report {
  id: string | number; // ID can be number from DB or string from old data
  type: string;
  description: string;
  location: {
    lat: number;
    lng: number;
  };
  image: string;
  timestamp: string;
  author?: string;
  // These might not exist on old mock data, so they are optional
  lat?: number; 
  lng?: number;
}

// Mock data is removed as we are now fetching from the database.
export const reports: Report[] = [];
