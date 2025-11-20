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
import { Camera, RefreshCcw, Video, VideoOff } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { LocationPicker } from '@/components/report/location-picker';

export default function ReportPage() {
  const heroImage = PlaceHolderImages.find((p) => p.id === 'hero-background');
  const { toast } = useToast();

  const [isCameraOn, setIsCameraOn] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [location, setLocation] = useState<[number, number] | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    return () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
        }
    };
  }, []);
  
  const toggleCamera = async () => {
    if (isCameraOn) {
      // Turn camera off
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
        videoRef.current.srcObject = null;
      }
      setIsCameraOn(false);
    } else {
      // Turn camera on
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        console.error('Camera API is not supported by this browser.');
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Cámara no Soportada',
          description: 'Tu navegador no soporta el acceso a la cámara.',
        });
        return;
      }

      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setHasCameraPermission(true);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
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
      }
    }
  };


  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        const dataUrl = canvas.toDataURL('image/jpeg');
        setCapturedImage(dataUrl);
      }
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!location) {
        toast({
            variant: "destructive",
            title: "Ubicación requerida",
            description: "Por favor, marca la ubicación del incidente en el mapa.",
        });
        return;
    }
    // Logic to handle form submission will go here
    console.log("Submitting report...", { location });
    toast({
        title: "Reporte Enviado (Simulación)",
        description: "Tu reporte ha sido recibido y será analizado por nuestro equipo.",
      });
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
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Tu Nombre (Opcional)</Label>
                    <Input id="name" placeholder="Ej: Juan Pérez" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Tu Email (Opcional)</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Ej: juan.perez@email.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="incident-type">Tipo de Incidente</Label>
                  <Select required>
                    <SelectTrigger id="incident-type">
                      <SelectValue placeholder="Selecciona el tipo de incidente" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vertido">
                        Vertido de Residuos
                      </SelectItem>
                      <SelectItem value="contaminacion">
                        Contaminación del Agua
                      </SelectItem>
                      <SelectItem value="fauna">Fauna Afectada</SelectItem>
                      <SelectItem value="deforestacion">
                        Deforestación en Orillas
                      </SelectItem>
                      <SelectItem value="otro">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location">Ubicación del Incidente (Requerido)</Label>
                   <LocationPicker onLocationChange={setLocation} />
                   <p className="text-xs text-muted-foreground">
                    Haz clic en el mapa para marcar la ubicación exacta del incidente.
                  </p>
                </div>


                <div className="space-y-2">
                  <Label htmlFor="description">
                    Descripción del Incidente
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Describe lo que observaste con el mayor detalle posible."
                    rows={5}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Evidencia Fotográfica (Opcional)</Label>
                   <Button type="button" onClick={toggleCamera} variant="outline" className="w-full mb-4">
                      {isCameraOn ? <VideoOff className="mr-2 h-4 w-4" /> : <Video className="mr-2 h-4 w-4" />}
                      {isCameraOn ? 'Desactivar Cámara' : 'Activar Cámara'}
                    </Button>

                  {hasCameraPermission === false && isCameraOn && (
                    <Alert variant="destructive">
                      <AlertTitle>Cámara no disponible</AlertTitle>
                      <AlertDescription>
                        No se pudo acceder a la cámara. Por favor, verifica los
                        permisos de tu navegador.
                      </AlertDescription>
                    </Alert>
                  )}
                  
                  {isCameraOn && hasCameraPermission && !capturedImage && (
                    <div className="space-y-4">
                       <div className="w-full bg-slate-900 rounded-lg overflow-hidden aspect-video">
                          <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
                       </div>
                       <Button type="button" onClick={handleCapture} className="w-full">
                            <Camera className="mr-2 h-4 w-4" /> Tomar Foto
                        </Button>
                    </div>
                  )}

                  {capturedImage && (
                    <div className="space-y-4">
                        <div className="w-full rounded-lg overflow-hidden aspect-video">
                            <Image src={capturedImage} alt="Captured evidence" width={1280} height={720} className="w-full h-full object-cover" />
                        </div>
                         <Button type="button" onClick={handleRetake} variant="outline" className="w-full">
                            <RefreshCcw className="mr-2 h-4 w-4" /> Tomar de Nuevo
                        </Button>
                    </div>
                  )}
                  <canvas ref={canvasRef} className="hidden"></canvas>
                </div>

                <Button type="submit" className="w-full">
                  Enviar Reporte
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
