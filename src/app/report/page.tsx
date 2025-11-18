import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { FileUp } from "lucide-react";
import { AudioPlayer } from "@/components/layout/audio-player";

export default function ReportPage() {
  const heroImage = PlaceHolderImages.find((p) => p.id === "hero-background");
  const pageDescription =
    "Bienvenido a la sección de Reporte Ciudadano. Tu ayuda es fundamental. Usa este formulario para reportar cualquier incidente ambiental que observes en el lago o sus alrededores.";

  return (
    <div>
      <AudioPlayer text={pageDescription} />
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
                Completa los siguientes campos para enviar tu reporte. Todos
                los campos son importantes.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Tu Nombre</Label>
                    <Input id="name" placeholder="Ej: Juan Pérez" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Tu Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Ej: juan.perez@email.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="incident-type">Tipo de Incidente</Label>
                  <Select>
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
                      <SelectItem value="fauna">
                        Fauna Afectada
                      </SelectItem>
                      <SelectItem value="deforestacion">
                        Deforestación en Orillas
                      </SelectItem>
                       <SelectItem value="otro">
                        Otro
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Ubicación del Incidente</Label>
                  <Input
                    id="location"
                    placeholder="Ej: Cerca del muelle de Puno"
                  />
                  <p className="text-xs text-muted-foreground">
                    Sé lo más específico posible. Puedes incluir coordenadas si
                    las conoces.
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
                  />
                </div>
                
                <div className="space-y-2">
                    <Label htmlFor="evidence">Adjuntar Evidencia (Opcional)</Label>
                    <div className="flex items-center justify-center w-full">
                        <label htmlFor="evidence-upload" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <FileUp className="w-8 h-8 mb-4 text-muted-foreground" />
                                <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Haz clic para subir</span> o arrastra y suelta</p>
                                <p className="text-xs text-muted-foreground">PNG, JPG, o MP4 (MAX. 10MB)</p>
                            </div>
                            <Input id="evidence-upload" type="file" className="hidden" />
                        </label>
                    </div> 
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
