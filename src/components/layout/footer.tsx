import { Logo } from "./logo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import FloatingLines from "../ui/floating-lines";

export function Footer() {
  return (
    <footer id="data" className="bg-slate-900 text-slate-100 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <FloatingLines 
          enabledWaves={['top', 'middle', 'bottom']}
          lineCount={[10, 15, 20]}
          lineDistance={[8, 6, 4]}
          bendRadius={5.0}
          bendStrength={-0.5}
          interactive={true}
          parallax={true}
        />
      </div>
      <div className="container mx-auto px-4 md:px-6 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="md:col-span-2 lg:col-span-1">
            <Logo />
            <p className="mt-4 text-sm">
              Monitoreando y protegiendo el Lago Titicaca a través de tecnología
              y participación comunitaria.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/#modules"
                  className="hover:text-primary transition-colors text-white"
                >
                  Módulos
                </a>
              </li>
              <li>
                <a href="/#map" className="hover:text-primary transition-colors text-white">
                  Mapa
                </a>
              </li>
              <li>
                <Link href="/report" className="hover:text-primary transition-colors text-white">
                  Reportar
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-primary transition-colors text-white">
                  Acceso al Sistema
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-primary transition-colors text-white">
                  Términos de Servicio
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors text-white">
                  Política de Privacidad
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">
              Mantente Actualizado
            </h3>
            <p className="text-sm mb-4">
              Suscríbete para recibir noticias y alertas importantes.
            </p>
            <form className="flex gap-2">
              <Input
                type="email"
                placeholder="tu@email.com"
                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
              />
              <Button type="submit" variant="default">
                Enviar
              </Button>
            </form>
          </div>
        </div>

        <Separator className="my-8 bg-slate-700" />

        <div className="text-center text-sm">
          &copy; {new Date().getFullYear()} SIGA-Titicaca. Todos los derechos
          reservados.
        </div>
      </div>
    </footer>
  );
}
