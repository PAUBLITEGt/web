import React, { useState } from "react";
import { motion } from "framer-motion";
import { useApp, CategoryItem, Product } from "@/lib/context";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShoppingCart, ExternalLink, Zap, Star } from "lucide-react";
import defaultHeroBg from "@assets/generated_images/neon_cyberpunk_streaming_services_abstract_background.png";

// Animation Variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 }
};

export default function Home() {
  const { products, addOrder, settings, categories } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");


  const heroBg = settings.backgroundImage || defaultHeroBg;
  const whatsappNumber = settings.whatsappNumber;
  const storeName = settings.storeName;

  const filteredProducts = activeCategory === "all" 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const handleBuyClick = (product: Product) => {
    const productWhatsapp = product.whatsappNumber || whatsappNumber;
    const message = `Hola ${storeName}! Me interesa comprar: ${product.name} (Q${product.price}).`;
    const url = `https://wa.me/${productWhatsapp}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="w-full overflow-hidden">
      
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-background">
        <div className="container relative z-10 px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-left"
            >
              <div className="inline-flex items-center gap-2 mb-6 border border-primary/30 text-primary bg-transparent px-4 py-2 rounded-full text-sm">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                Precios de Guatemala <span className="text-xs">GT</span>
              </div>
              <h1 className="text-5xl md:text-6xl mb-2 leading-tight text-foreground tracking-tight" style={{ fontFamily: 'Arial, sans-serif', fontWeight: 900 }}>
                Todo lo que<br/>Necesitas
              </h1>
              <h2 className="text-4xl md:text-5xl mb-6 text-primary tracking-tight" style={{ fontFamily: 'Arial, sans-serif', fontWeight: 900 }}>
                En un Solo Lugar
              </h2>
              <p className="text-lg text-muted-foreground mb-10 max-w-lg" style={{ fontFamily: 'Arial, sans-serif' }}>
                Streaming, ropa, accesorios y mucho más. Encuentra todo lo que buscas al mejor precio con entrega rápida y garantizada.
              </p>
            
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-white min-w-[180px] h-12 text-base font-semibold rounded-full"
                  onClick={() => document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Ver Catálogo
                  <span className="ml-2">&gt;</span>
                </Button>
                <Button 
                  size="lg" 
                  variant="ghost" 
                  className="text-foreground min-w-[180px] h-12 text-base rounded-full hover:bg-transparent"
                  onClick={() => window.open(`https://wa.me/${whatsappNumber}`, '_blank')}
                >
                  <div className="w-5 h-5 rounded-full border-2 border-foreground flex items-center justify-center mr-2">
                    <span className="text-xs">▶</span>
                  </div>
                  Cómo Funciona
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-2 gap-4"
            >
              <motion.div 
                className="aspect-square rounded-2xl overflow-hidden cursor-pointer -rotate-3"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ scale: 1.05, rotate: 2 }}
              >
                <img src="https://i.pinimg.com/1200x/86/99/c9/8699c99ed7af8ff818cd2c266f2b7301.jpg" />
              </motion.div>
              <motion.div 
                className="aspect-square rounded-2xl overflow-hidden cursor-pointer rotate-2 mt-6"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                whileHover={{ scale: 1.05, rotate: -2 }}
              >
                <img src="https://i.pinimg.com/736x/18/59/5e/18595e8a434c096b895c81debf685ec2.jpg" />
              </motion.div>
              <motion.div 
                className="aspect-square rounded-2xl overflow-hidden cursor-pointer rotate-3 -mt-6"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                whileHover={{ scale: 1.05, rotate: -2 }}
              >
                <img src="https://i.pinimg.com/736x/92/00/6b/92006b0d1bf43b14e7b9fb28debc726f.jpg" />
              </motion.div>
              <motion.div 
                className="aspect-square rounded-2xl overflow-hidden cursor-pointer -rotate-2"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                whileHover={{ scale: 1.05, rotate: 2 }}
              >
                <img src="https://i.pinimg.com/736x/13/3a/ca/133aca7b244c9d6fe97eda8eecf38540.jpg" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Divider Line */}
      <div className="w-full py-4">
        <div className="container mx-auto px-4">
          <div className="h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent" />
        </div>
      </div>

      {/* Catalog Section */}
      <section className="py-20 container mx-auto px-4" id="catalogo">
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-center mb-6">
            <span className="text-foreground">Catálogo</span> <span className="text-primary">Premium</span>
          </h2>
          
          <div className="flex flex-wrap justify-center gap-3 w-full max-w-4xl">
            <button 
              onClick={() => setActiveCategory("all")}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${activeCategory === "all" ? "bg-primary text-white" : "bg-slate-200 text-foreground hover:bg-slate-300"}`}
            >
              Todo
            </button>
            {Array.from(new Set(products.map(p => p.category))).filter(Boolean).map((cat) => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full font-semibold transition-all capitalize ${activeCategory === cat ? "bg-primary text-white" : "bg-slate-200 text-foreground hover:bg-slate-300"}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredProducts.map((product) => {
            const isOutOfStock = product.inStock === false;
            return (
            <div key={product.id}>
              <Card className={`group bg-background border-border overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-lg rounded-2xl ${isOutOfStock ? 'opacity-70' : ''}`}>
                <div className="aspect-square relative overflow-hidden bg-slate-800 rounded-t-2xl">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${isOutOfStock ? 'grayscale' : ''}`}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 to-transparent">
                    <h3 className="text-lg font-bold text-white truncate">{product.name}</h3>
                    <div className="flex">
                      {[1,2,3,4,5].map(s => <Star key={s} size={12} className="text-yellow-500 fill-yellow-500" />)}
                    </div>
                  </div>
                  {isOutOfStock ? (
                    <div className="absolute top-2 left-2 bg-red-600 px-2 py-1 rounded text-xs font-bold text-white uppercase">
                      Sin Stock
                    </div>
                  ) : product.category === 'streaming' && (
                    <div className="absolute top-2 left-2 bg-primary px-2 py-1 rounded text-xs font-bold text-white uppercase">
                      Popular
                    </div>
                  )}
                </div>
                <CardContent className="p-4 bg-background">
                  <div className="text-2xl font-display font-bold text-foreground mb-2">Q{product.price} {product.isMonthly !== false && <span className="text-sm font-normal text-muted-foreground">/ mes</span>}</div>
                  {product.description && (
                    <div className="text-sm text-muted-foreground space-y-1">
                      {product.description.split('\n').map((line, index) => (
                        line.trim() && (
                          <div key={index} className="flex items-start gap-2 leading-relaxed">
                            {product.showCheckmarks !== false && <span className="text-primary mt-0.5">✓</span>}
                            <span className="font-medium">{line}</span>
                          </div>
                        )
                      ))}
                    </div>
                  )}
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  {isOutOfStock ? (
                    <Button className="w-full bg-gray-500 text-white rounded-lg cursor-not-allowed" disabled>
                      Sin Stock
                    </Button>
                  ) : (
                    <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-lg" onClick={() => handleBuyClick(product)}>
                      <ShoppingCart className="mr-2 h-4 w-4" /> Comprar Ahora
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </div>
          )})}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            No hay productos en esta categoría por el momento.
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary via-primary/90 to-primary" id="cta">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 italic">
            ¿Listo para empezar?
          </h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Únete a más de 5,000 clientes satisfechos en Guatemala y disfruta del mejor contenido hoy mismo.
          </p>
          <Button 
            size="lg"
            className="bg-white text-primary hover:bg-white/90 min-w-[250px] h-14 text-lg font-bold rounded-full"
            onClick={() => window.open(`https://wa.me/${whatsappNumber}`, '_blank')}
          >
            Contactar por WhatsApp
          </Button>
        </div>
      </section>

      {/* Policies Section */}
      <section className="py-16 bg-muted border-t border-border" id="politicas">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12 text-foreground">
            POLÍTICAS Y <span className="text-primary">TÉRMINOS</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <div className="bg-background border border-border p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-extrabold text-primary mb-4">Política de Entrega</h3>
              <ul className="text-base text-foreground space-y-2 font-medium">
                <li>• Entrega inmediata vía WhatsApp (5-15 minutos)</li>
                <li>• Horario de atención: 8:00 AM - 10:00 PM</li>
                <li>• Confirmación de pago requerida antes del envío</li>
                <li>• Datos de acceso enviados de forma segura</li>
              </ul>
            </div>
            
            <div className="bg-background border border-border p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-extrabold text-primary mb-4">Garantía del Servicio</h3>
              <ul className="text-base text-foreground space-y-2 font-medium">
                <li>• Garantía de 30 días en todas las cuentas</li>
                <li>• Reemplazo gratuito si la cuenta presenta fallas</li>
                <li>• Soporte técnico incluido durante la garantía</li>
                <li>• No aplica si se cambia la contraseña</li>
              </ul>
            </div>
            
            <div className="bg-background border border-border p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-extrabold text-primary mb-4">Métodos de Pago</h3>
              <ul className="text-base text-foreground space-y-2 font-medium">
                <li>• Transferencia bancaria (Banrural, BAM, BI)</li>
                <li>• Depósito en agente bancario</li>
                <li>• Pago móvil (Tigo Money, etc.)</li>
                <li>• Efectivo solo en zona metropolitana</li>
              </ul>
            </div>
            
            <div className="bg-background border border-border p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-extrabold text-primary mb-4">Términos de Uso</h3>
              <ul className="text-base text-foreground space-y-2 font-medium">
                <li>• Las cuentas son para uso personal únicamente</li>
                <li>• Prohibido compartir credenciales con terceros</li>
                <li>• No modificar datos del perfil asignado</li>
                <li>• Respetar las políticas de cada plataforma</li>
              </ul>
            </div>
            
            <div className="bg-background border border-border p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-extrabold text-primary mb-4">Política de Devoluciones</h3>
              <ul className="text-base text-foreground space-y-2 font-medium">
                <li>• Reembolso solo si no podemos entregar el servicio</li>
                <li>• No hay devoluciones una vez entregada la cuenta</li>
                <li>• Cambios permitidos dentro de las primeras 24 horas</li>
                <li>• Comunicar cualquier problema inmediatamente</li>
              </ul>
            </div>
            
            <div className="bg-background border border-border p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-extrabold text-primary mb-4">Contacto y Soporte</h3>
              <ul className="text-base text-foreground space-y-2 font-medium">
                <li>• WhatsApp: +502 3787-1216</li>
                <li>• Respuesta en menos de 1 hora</li>
                <li>• Atención personalizada</li>
                <li>• Seguimiento post-venta incluido</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-base text-foreground mb-4 font-medium">
              Al realizar una compra, aceptas nuestros términos y condiciones.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                variant="outline" 
                className="border-primary/50 text-primary hover:bg-primary/10 font-bold"
                onClick={() => window.open(`https://wa.me/${whatsappNumber}?text=Hola, tengo una pregunta sobre sus políticas`, '_blank')}
              >
                Preguntar por WhatsApp
              </Button>
              <Button 
                className="bg-primary hover:bg-primary/90 font-bold"
                onClick={() => document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Ver Catálogo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-slate-900 overflow-hidden" id="testimonios">
        <div className="container mx-auto mb-10 px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 flex items-center justify-center gap-3">
            <Star className="text-yellow-400 fill-yellow-400 w-8 h-8" />
            CLIENTES SATISFECHOS
            <Star className="text-yellow-400 fill-yellow-400 w-8 h-8" />
          </h2>
        </div>

        <div className="flex overflow-hidden w-full px-4">
          <motion.div 
            className="flex gap-6"
            animate={{ x: [0, -2600] }}
            transition={{ repeat: Infinity, duration: 35, ease: "linear" }}
          >
            {[
              { name: "Carlos Méndez", comment: "Excelente servicio, me entregaron mi cuenta de Netflix en 5 minutos. 100% recomendado!" },
              { name: "María García", comment: "Llevo 3 meses usando Disney+ sin ningún problema. El soporte por WhatsApp es muy rápido." },
              { name: "José Hernández", comment: "Increíble precio por HBO Max. La calidad es perfecta y nunca se cae la cuenta." },
              { name: "Ana López", comment: "Compré Spotify Premium y funciona de maravilla. Gracias PAUDRONIX!" },
              { name: "Luis Ramírez", comment: "Super confiables, ya les he comprado varias cuentas y todas funcionan perfecto." },
              { name: "Sofía Martínez", comment: "El mejor servicio de Guatemala. Entrega inmediata y precios justos." },
              { name: "Diego Morales", comment: "Mi cuenta de Prime Video sigue funcionando después de 6 meses. Excelente!" },
              { name: "Fernanda Castro", comment: "Recomendadísimo! Me ayudaron a elegir el plan perfecto para mi familia." },
              { name: "Roberto Juárez", comment: "Primera vez comprando y quedé muy satisfecho. El proceso fue muy fácil." },
              { name: "Patricia Solís", comment: "Tenía miedo de que fuera estafa pero todo salió perfecto. Muy profesionales." },
              { name: "Eduardo Pérez", comment: "Las cuentas de streaming más baratas de Guatemala. No busquen más!" },
              { name: "Claudia Rivera", comment: "Me encanta que responden rápido por WhatsApp. Servicio 24/7 real." },
              { name: "Carlos Méndez", comment: "Excelente servicio, me entregaron mi cuenta de Netflix en 5 minutos. 100% recomendado!" },
              { name: "María García", comment: "Llevo 3 meses usando Disney+ sin ningún problema. El soporte por WhatsApp es muy rápido." },
              { name: "José Hernández", comment: "Increíble precio por HBO Max. La calidad es perfecta y nunca se cae la cuenta." },
              { name: "Ana López", comment: "Compré Spotify Premium y funciona de maravilla. Gracias PAUDRONIX!" }
            ].map((testimonial, i) => (
              <div key={i} className="flex-shrink-0 w-[300px] md:w-[350px] bg-slate-800 border border-slate-600 p-5 rounded-2xl shadow-xl">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-sm font-bold text-white">
                    {testimonial.name.charAt(0)}
                  </div>
                  <span className="font-semibold text-base text-white">{testimonial.name}</span>
                  <div className="flex ml-auto gap-0.5">
                    {[1,2,3,4,5].map(s => <Star key={s} size={14} className="text-yellow-400 fill-yellow-400" />)}
                  </div>
                </div>
                <p className="text-base text-white leading-relaxed">
                  "{testimonial.comment}"
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Sell Your Products Section */}
      <section className="py-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-t border-slate-700" id="vender">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              ¿QUIERES <span className="text-primary">VENDER</span> TUS PRODUCTOS?
            </h2>
            <p className="text-lg text-gray-300 mb-4">
              Publica tus ventas con nosotros y llega a más clientes en Guatemala. 
            </p>
            <div className="inline-block bg-green-500 text-white px-6 py-2 rounded-full text-lg font-bold mb-8">
              ¡GRATIS! - Vende y Publica Sin Costo
            </div>
            
            <div className="bg-slate-800 border border-slate-600 p-8 rounded-2xl shadow-xl max-w-lg mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">Publica GRATIS</h3>
              <p className="text-gray-300 mb-6">
                Escríbenos por WhatsApp para publicar tus productos GRATIS y empezar a vender hoy mismo.
              </p>
              <Button 
                size="lg"
                className="bg-[#25D366] hover:bg-[#20bd5a] text-white min-w-[250px] h-14 text-lg font-bold rounded-full"
                onClick={() => window.open('https://wa.me/50237871216?text=Hola, quiero publicar mis productos para vender', '_blank')}
              >
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current mr-2">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                WhatsApp: 3787-1216
              </Button>
            </div>
          </div>
        </div>
      </section>


      {/* Floating WhatsApp Button */}
      <a 
        href={`https://wa.me/${whatsappNumber}`} 
        target="_blank"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20bd5a] text-white p-4 rounded-full shadow-[0_0_20px_rgba(37,211,102,0.5)] transition-all hover:scale-110 flex items-center justify-center"
      >
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      </a>
    </div>
  );
}
