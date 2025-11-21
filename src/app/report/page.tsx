'use client';

import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Camera, RefreshCcw, Video, VideoOff, Loader2 } from 'lucide-react';
import { useState, useRef, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { LocationPicker } from '@/components/report/location-picker';
import { z } from 'zod';

// Zod schema for form validation
const formSchema = z.object({
    reporter_name: z.string().optional(),
    reporter_email: z.string().email({ message: "Por favor, introduce un email válido." }).optional().or(z.literal('')),
    incident_type: z.string({ required_error: "Por favor, selecciona un tipo de incidente." }),
    latitude: z.number(),
    longitude: z.number(),
    description: z.string().optional(),
    photo_evidence: z.string().optional(),
});


export default function ReportPage() {
  const heroImage = PlaceHolderImages.find((p) => p.id === 'hero-background');
  const { toast } = useToast();

  const [isCameraOn, setIsCameraOn] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [location, setLocation] = useState<[number, number] | null>(null);
  const [incidentType, setIncidentType] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
        videoRef.current.srcObject = null;
    }
    setIsCameraOn(false);
  }, []);

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);
  
  const toggleCamera = async () => {
    if (isCameraOn) {
      stopCamera();
    } else {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        toast({
          variant: 'destructive',
          title: 'Cámara no Soportada',
          description: 'Tu navegador no soporta el acceso a la cámara.',
        });
        setHasCameraPermission(false);
        return;
      }

      const constraints = {
        video: {
            width: { ideal: 1280 },
            height: { ideal: 720 },
            facingMode: "environment"
        }
      };

      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        streamRef.current = stream;
        setHasCameraPermission(true);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
        setIsCameraOn(true);
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Acceso a la Cámara Denegado',
          description:
            'Por favor, habilita los permisos de cámara en tu navegador para usar esta función.',
        });
        stopCamera();
      }
    }
  };


  const handleCapture = () => {
    if (videoRef.current && canvasRef.current && streamRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
        setCapturedImage(dataUrl);
        stopCamera();
      }
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
    toggleCamera();
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!location) {
        toast({
            variant: "destructive",
            title: "Ubicación requerida",
            description: "Por favor, marca la ubicación del incidente en el mapa.",
        });
        setIsSubmitting(false);
        return;
    }
    
    if (!incidentType) {
        toast({
            variant: "destructive",
            title: "Tipo de incidente requerido",
            description: "Por favor, selecciona un tipo de incidente.",
        });
        setIsSubmitting(false);
        return;
    }
    
    const formData = new FormData(e.currentTarget);
    const data = {
        reporter_name: formData.get('name') as string,
        reporter_email: formData.get('email') as string,
        incident_type: incidentType,
        latitude: location[0],
        longitude: location[1],
        description: formData.get('description') as string,
        photo_evidence: capturedImage || undefined
    };

    const validation = formSchema.safeParse(data);

    if (!validation.success) {
        validation.error.errors.forEach(err => {
            toast({ variant: "destructive", title: "Dato inválido", description: err.message });
        });
        setIsSubmitting(false);
        return;
    }

    try {
        const response = await fetch('/api/reports', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(validation.data),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Algo salió mal');
        }

        toast({
            title: "Reporte Enviado Correctamente",
            description: "Gracias por tu colaboración. Tu reporte ha sido recibido.",
        });
        
        // Reset form
        formRef.current?.reset();
        setCapturedImage(null);
        setLocation(null);
        setIncidentType('');

    } catch (error: any) {
        toast({
            variant: "destructive",
            title: "Error al enviar el reporte",
            description: error.message || "No se pudo enviar el reporte. Inténtalo de nuevo.",
        });
    } finally {
        setIsSubmitting(false);
    }
  }

  return (
    <div>
      <section className="relative py-24 md:py-32 bg-slate-900 text-white text-center">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover object-center opacity-20"
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950" />

        <div className="relative container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold">Reporte Ciudadano</h1>
          <p className="mt-4 max-w-2xl mx-auto text-slate-300">
            Tu ayuda es fundamental. Reporta cualquier incidente ambiental que
            observes.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-24 bg-slate-50 dark:bg-slate-950">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto shadow-xl">
            <CardHeader>
              <CardTitle>Formulario de Reporte</CardTitle>
              <CardDescription>
                Completa los siguientes campos para enviar tu reporte. La ubicación es indispensable.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form ref={formRef} className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Tu Nombre (Opcional)</Label>
                    <Input id="name" name="name" placeholder="Ej: Juan Pérez" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Tu Email (Opcional)</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Ej: juan.perez@email.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="incident-type">Tipo de Incidente</Label>
                  <Select name="incident_type" onValueChange={setIncidentType} value={incidentType}>
                    <SelectTrigger id="incident-type">
                      <SelectValue placeholder="Selecciona el tipo de incidente" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Vertido de Residuos">
                        Vertido de Residuos
                      </SelectItem>
                      <SelectItem value="Contaminación del Agua">
                        Contaminación del Agua
                      </SelectItem>
                      <SelectItem value="Fauna Afectada">Fauna Afectada</SelectItem>
                      <SelectItem value="Deforestación en Orillas">
                        Deforestación en Orillas
                      </SelectItem>
                      <SelectItem value="Otro">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location">Ubicación del Incidente (Requerido)</Label>
                   <LocationPicker onLocationChange={setLocation} />
                   <p className="text-xs text-muted-foreground">
                    Marca la ubicación en el mapa, usa tu ubicación actual o busca una dirección.
                  </p>
                </div>


                <div className="space-y-2">
                  <Label htmlFor="description">
                    Descripción del Incidente
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Describe lo que observaste con el mayor detalle posible."
                    rows={5}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Evidencia Fotográfica (Opcional)</Label>
                   {!capturedImage && (
                    <Button type="button" onClick={toggleCamera} variant="outline" className="w-full mb-4">
                        {isCameraOn ? <VideoOff className="mr-2 h-4 w-4" /> : <Video className="mr-2 h-4 w-4" />}
                        {isCameraOn ? 'Desactivar Cámara' : 'Activar Cámara'}
                    </Button>
                   )}

                  {hasCameraPermission === false && !isCameraOn && (
                    <Alert variant="destructive">
                      <AlertTitle>Cámara no disponible</AlertTitle>
                      <AlertDescription>
                        No se pudo acceder a la cámara. Por favor, verifica los
                        permisos de tu navegador.
                      </AlertDescription>
                    </Alert>
                  )}
                  
                  <div className="w-full bg-slate-900 rounded-lg overflow-hidden aspect-video relative">
                    {!capturedImage && isCameraOn && (
                        <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
                    )}
                    {capturedImage && (
                        <Image src={capturedImage} alt="Evidencia capturada" fill className="object-cover" />
                    )}
                    {!isCameraOn && !capturedImage && (
                        <div className="w-full h-full flex items-center justify-center bg-slate-100">
                            <p className="text-slate-500">La vista previa de la cámara aparecerá aquí.</p>
                        </div>
                    )}
                  </div>
                  
                  {isCameraOn && !capturedImage && (
                    <Button type="button" onClick={handleCapture} className="w-full mt-4">
                        <Camera className="mr-2 h-4 w-4" /> Tomar Foto
                    </Button>
                  )}

                  {capturedImage && (
                     <Button type="button" onClick={handleRetake} variant="outline" className="w-full mt-4">
                        <RefreshCcw className="mr-2 h-4 w-4" /> Tomar de Nuevo
                    </Button>
                  )}
                  <canvas ref={canvasRef} className="hidden"></canvas>
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  {isSubmitting ? 'Enviando...' : 'Enviar Reporte'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
