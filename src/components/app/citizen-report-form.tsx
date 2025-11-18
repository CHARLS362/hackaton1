
'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import {
  Camera,
  MapPin,
  FileText,
  Send,
  ArrowLeft,
  CheckCircle,
  AlertTriangle,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

const steps = [
  { id: 1, title: 'Tipo de Incidente', icon: FileText },
  { id: 2, title: 'Ubicación y Evidencia', icon: MapPin },
  { id: 3, title: 'Confirmar y Enviar', icon: Send },
];

export function CitizenReportForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<{
    incidentType: string;
    description: string;
    location: any;
    photo: string | null;
  }>({
    incidentType: '',
    description: '',
    location: null,
    photo: null,
  });
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  const progress = (currentStep / steps.length) * 100;

  useEffect(() => {
    if (currentStep === 2) {
      const getCameraPermission = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          setHasCameraPermission(true);

          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (error) {
          console.error('Error accessing camera:', error);
          setHasCameraPermission(false);
          toast({
            variant: 'destructive',
            title: 'Acceso a la Cámara Denegado',
            description:
              'Por favor, habilita los permisos de cámara en tu navegador.',
          });
        }
      };
      getCameraPermission();
    }
  }, [currentStep, toast]);

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    toast({
      title: 'Reporte Enviado',
      description:
        'Gracias por tu colaboración. Hemos recibido tu reporte y lo revisaremos pronto.',
    });
  };

  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        const photoDataUrl = canvas.toDataURL('image/jpeg');
        setFormData({ ...formData, photo: photoDataUrl });
      }
    }
  };

  if (isSubmitted) {
    return (
      <Card className="max-w-2xl mx-auto shadow-2xl">
        <CardContent className="p-10 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">¡Reporte Enviado con Éxito!</h2>
          <p className="text-muted-foreground mb-6">
            Gracias por tu contribución a la protección del Lago Titicaca. Tu
            reporte ha sido registrado y será revisado por nuestro equipo.
          </p>
          <Button onClick={() => setIsSubmitted(false)}>
            Enviar otro reporte
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto shadow-2xl backdrop-blur-sm bg-card/80">
      <CardHeader>
        <Progress value={progress} className="mb-4 h-2" />
        <div className="flex justify-between items-center">
          <CardTitle>Paso {currentStep}: {steps[currentStep - 1].title}</CardTitle>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <steps[currentStep-1].icon className="h-5 w-5" />
            <span>Paso {currentStep} de {steps.length}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {currentStep === 1 && (
            <div className="space-y-4 animate-fade-in-up">
              <CardDescription>
                Selecciona el tipo de problema que estás reportando y proporciona
                una breve descripción.
              </CardDescription>
              <div>
                <Label htmlFor="incident-type">Tipo de Incidente</Label>
                <Select
                  onValueChange={(value) =>
                    setFormData({ ...formData, incidentType: value })
                  }
                  defaultValue={formData.incidentType}
                >
                  <SelectTrigger id="incident-type">
                    <SelectValue placeholder="Selecciona un tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vertimiento_ilegal">
                      Vertimiento Ilegal
                    </SelectItem>
                    <SelectItem value="acumulacion_basura">
                      Acumulación de Basura
                    </SelectItem>
                    <SelectItem value="mancha_aceite">Mancha de Aceite</SelectItem>
                    <SelectItem value="proliferacion_algas">
                      Proliferación de Algas
                    </SelectItem>
                    <SelectItem value="otro">Otro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  placeholder="Describe lo que observaste con el mayor detalle posible."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4 animate-fade-in-up">
              <CardDescription>
                Usa tu cámara para tomar una foto del incidente. La ubicación se
                adjuntará automáticamente.
              </CardDescription>
              <div className="relative aspect-video bg-slate-200 dark:bg-slate-800 rounded-lg flex items-center justify-center overflow-hidden">
                <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
                <canvas ref={canvasRef} className="hidden" />
                {formData.photo && (
                  <Image src={formData.photo} alt="Vista previa de la foto" fill className="object-cover" />
                )}
                {!hasCameraPermission && !formData.photo && (
                  <Alert variant="destructive" className="m-4">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Se requiere acceso a la cámara</AlertTitle>
                    <AlertDescription>
                      Por favor, permite el acceso a la cámara para reportar.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  type="button"
                  onClick={takePhoto}
                  disabled={!hasCameraPermission}
                  className="w-full"
                >
                  <Camera className="mr-2 h-4 w-4" />
                  {formData.photo ? 'Tomar Otra Foto' : 'Tomar Foto'}
                </Button>
                <Button type="button" className="w-full" disabled>
                  <MapPin className="mr-2 h-4 w-4" />
                  Obteniendo Ubicación...
                </Button>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6 animate-fade-in-up">
               <CardDescription>
                Revisa la información antes de enviarla. Tu aporte es muy valioso.
              </CardDescription>
              <div className="space-y-4 rounded-lg border p-4">
                  <h3 className="font-semibold">Resumen del Reporte</h3>
                  <div className="text-sm space-y-2">
                    <p><strong>Tipo:</strong> {formData.incidentType || 'No especificado'}</p>
                    <p><strong>Descripción:</strong> {formData.description || 'No especificada'}</p>
                    <p><strong>Ubicación:</strong> Obtenida (ej: -15.8402, -69.5337)</p>
                  </div>
                  {formData.photo && (
                     <div className="mt-4">
                        <p className="font-medium text-sm mb-2">Foto adjunta:</p>
                        <Image src={formData.photo} alt="Evidencia fotográfica" width={200} height={150} className="rounded-md border"/>
                     </div>
                  )}
              </div>
            </div>
          )}

          <div className="flex justify-between pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Anterior
            </Button>
            {currentStep < steps.length ? (
              <Button type="button" onClick={handleNext}>
                Siguiente
              </Button>
            ) : (
              <Button type="submit">
                <Send className="mr-2 h-4 w-4" />
                Enviar Reporte
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
