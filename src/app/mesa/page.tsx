'use client';

import { useState, useEffect } from 'react';
import { ReportQueue } from '@/components/mesa/report-queue';
import { Report } from '@/data/reports';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Layers, ListTodo, Loader2, Download, GalleryVertical } from 'lucide-react';
import IncidentMapLoader from '@/components/mesa/heatmap-loader';
import { cn } from '@/lib/utils';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { ReportImageGallery } from '@/components/mesa/report-image-gallery';


export default function MesaPage() {
  const [pendingReports, setPendingReports] = useState<Report[]>([]);
  const [approvedReports, setApprovedReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('triage');
  const { toast } = useToast();

  const fetchReports = async () => {
    try {
      setLoading(true);
      const [pendingRes, approvedRes] = await Promise.all([
        fetch('/api/reports?status=pending'),
        fetch('/api/reports?status=approved')
      ]);

      if (!pendingRes.ok || !approvedRes.ok) {
        throw new Error('Failed to fetch reports');
      }

      const pendingData = await pendingRes.json();
      const approvedData = await approvedRes.json();
      
      setPendingReports(pendingData);
      setApprovedReports(approvedData);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleDecision = async (reportId: string, decision: 'approve' | 'reject') => {
    const originalPending = [...pendingReports];
    const reportToMove = pendingReports.find(r => r.id.toString() === reportId.toString());

    // Optimistic UI update
    setPendingReports(prev => prev.filter(r => r.id.toString() !== reportId.toString()));
    if (decision === 'approve' && reportToMove) {
      setApprovedReports(prev => [...prev, reportToMove]);
    }
    
    try {
      const response = await fetch(`/api/reports/${reportId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: decision === 'approve' ? 'approved' : 'rejected' }),
      });

      if (!response.ok) {
        throw new Error('Failed to update report status');
      }
      // No need to re-fetch, optimistic update is enough for the session
    } catch (error) {
      // Revert UI on failure
      setPendingReports(originalPending);
      if (decision === 'approve') {
        setApprovedReports(prev => prev.filter(r => r.id.toString() !== reportId.toString()));
      }
      alert('Error al actualizar el reporte. Inténtalo de nuevo.');
    }
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    toast({
      title: 'Iniciando descarga',
      description: 'Preparando imágenes para comprimir. Esto puede tardar un momento...',
    });

    const zip = new JSZip();
    const imageReports = approvedReports.filter(report => report.image);
    
    try {
      const imagePromises = imageReports.map(async (report, index) => {
        try {
          const response = await fetch(report.image);
          if (!response.ok) {
            throw new Error(`Failed to fetch image for report ${report.id}`);
          }
          const blob = await response.blob();
          const fileExtension = blob.type.split('/')[1] || 'jpg';
          zip.file(`report-${report.id}-${index + 1}.${fileExtension}`, blob);
        } catch (e) {
          console.error(`Could not process image for report ${report.id}:`, e);
          // Don't let one failed image stop the whole process
        }
      });
      
      await Promise.all(imagePromises);

      zip.generateAsync({ type: 'blob' }).then((content) => {
        saveAs(content, 'reportes_imagenes.zip');
        toast({
          title: 'Descarga Completa',
          description: 'El archivo ZIP con las imágenes ha sido descargado.',
        });
      });

    } catch (error) {
      console.error("Error creating zip file:", error);
      toast({
        variant: 'destructive',
        title: 'Error en la descarga',
        description: 'No se pudo crear el archivo ZIP. Por favor, inténtalo de nuevo.',
      });
    } finally {
      setIsDownloading(false);
    }
  };
  
  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <header className="mb-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                  <h1 className="text-4xl md:text-5xl font-bold font-headline text-slate-800">
                    Mesa de Trabajo de Datos
                  </h1>
                  <p className="mt-3 text-lg text-slate-600">
                    Procesa y analiza los datos de los reportes ciudadanos para generar inteligencia ambiental.
                  </p>
              </div>
              <Button onClick={handleDownload} disabled={isDownloading || loading || approvedReports.filter(r => r.image).length === 0}>
                {isDownloading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Download className="mr-2 h-4 w-4" />
                )}
                {isDownloading ? 'Comprimiendo...' : 'Descargar Imágenes'}
              </Button>
          </div>
        </header>

        {loading && (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-12 h-12 animate-spin text-primary" />
          </div>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        {!loading && !error && (
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 max-w-2xl mx-auto">
                <TabsTrigger value="triage">
                  <ListTodo className="mr-2" />
                  Triaje de Datos ({pendingReports.length})
                </TabsTrigger>
                <TabsTrigger value="heatmap">
                  <Layers className="mr-2" />
                  Mapa de Incidencia ({approvedReports.length})
                </TabsTrigger>
                 <TabsTrigger value="gallery">
                  <GalleryVertical className="mr-2" />
                  Galería ({approvedReports.filter(r => r.image).length})
                </TabsTrigger>
              </TabsList>
              
              <div className={cn("mt-8", activeTab !== 'triage' && 'hidden')}>
                <ReportQueue reports={pendingReports} onDecision={handleDecision} />
              </div>

              <div className={cn("mt-8", activeTab !== 'heatmap' && 'hidden')}>
                <IncidentMapLoader reports={approvedReports} />
              </div>
              
              <div className={cn("mt-8", activeTab !== 'gallery' && 'hidden')}>
                <ReportImageGallery reports={approvedReports.filter(r => r.image)} />
              </div>
            </Tabs>
        )}
      </div>
    </div>
  );
}