'use client';

import dynamic from 'next/dynamic';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Skeleton } from '../ui/skeleton';
import { Report } from '@/data/reports';

interface IncidentMapLoaderProps {
    reports: Report[];
}

const DynamicIncidentMap = dynamic(
  () => import('./incident-map').then(mod => mod.IncidentMap),
  {
    ssr: false,
    loading: () => (
        <Card className="w-full bg-white shadow-xl border">
            <CardHeader>
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-4 w-3/4 mt-2" />
            </CardHeader>
            <CardContent>
                <Skeleton className="h-10 w-full mb-4" />
                <Skeleton className="h-[500px] w-full" />
            </CardContent>
        </Card>
    ),
  }
);

export default function IncidentMapLoader({ reports }: IncidentMapLoaderProps) {
  return <DynamicIncidentMap reports={reports} />;
}
