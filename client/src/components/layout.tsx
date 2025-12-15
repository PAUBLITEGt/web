import React from "react";
import { Link, useLocation } from "wouter";
import { useApp } from "@/lib/context";
import { ShieldCheck, ShoppingBag, LogOut, Menu, X, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const { isAuthenticated, logout } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
    const isActive = location === href;
    return (
      <Link href={href} className={`text-sm font-medium transition-colors hover:text-primary ${isActive ? "text-primary text-glow" : "text-muted-foreground"}`}>
        {children}
      </Link>
    );
  };

  return (
    <div className="min-h-screen flex flex-col font-body">
      <header className="sticky top-0 z-50 w-full bg-background shadow-md shadow-primary/10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-display font-black text-2xl text-primary tracking-wider">
              PAUDRONIX GT
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <NavLink href="/">Inicio</NavLink>
            <a href="/#catalogo" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">Catálogo</a>
            <a href="/#testimonios" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">Clientes</a>
            
            {isAuthenticated ? (
              <div className="flex items-center gap-4 ml-4 pl-4 border-l border-white/10">
                <Link href="/admin">
                  <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/10">
                    Panel Admin
                  </Button>
                </Link>
                <Button variant="destructive" size="sm" onClick={logout}>
                  <LogOut className="w-4 h-4 mr-2" /> Salir
                </Button>
              </div>
            ) : (
              <Link href="/admin">
                <Button variant="ghost" size="sm" className="ml-4 hover:bg-white/5">
                  <ShieldCheck className="w-4 h-4 mr-2" /> Admin
                </Button>
              </Link>
            )}
          </nav>

          {/* Mobile Nav */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-card border-l-white/10">
              <div className="flex flex-col gap-6 mt-10">
                <Link href="/" className="text-lg font-medium hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>
                  Inicio
                </Link>
                <a href="/#catalogo" className="text-lg font-medium hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>
                  Catálogo
                </a>
                
                {isAuthenticated ? (
                  <>
                    <Link href="/admin" className="text-lg font-medium text-primary" onClick={() => setIsMobileMenuOpen(false)}>
                      Panel Admin
                    </Link>
                    <Button variant="destructive" onClick={() => { logout(); setIsMobileMenuOpen(false); }}>
                      Cerrar Sesión
                    </Button>
                  </>
                ) : (
                  <Link href="/admin" className="text-lg font-medium hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>
                    Acceso Admin
                  </Link>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="border-t border-slate-800 bg-slate-900 relative overflow-hidden">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-display text-xl font-black text-primary mb-4">PAUDRONIX GT</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Tu destino número uno para entretenimiento digital y moda en Guatemala. 
                Precios accesibles, calidad garantizada.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-4">Contacto</h4>
              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-primary" /> 
                  <a href="https://wa.me/50237871216" target="_blank" className="hover:text-primary transition-colors">
                    +502 3787-1216
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-primary" />
                  <a href="mailto:paudronixpro@gmail.com" className="hover:text-primary transition-colors">
                    paudronixpro@gmail.com
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4">Ubicación</h4>
              <p className="text-slate-300 text-sm">
                Guatemala, Centroamérica.<br/>
                Servicio disponible para todo el país.
              </p>
            </div>
          </div>
          
          <div className="border-t border-slate-700 mt-12 pt-8 text-center text-xs text-slate-400">
            © 2025 Paudronix GT. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}
