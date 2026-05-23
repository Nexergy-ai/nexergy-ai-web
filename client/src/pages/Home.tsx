import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Zap, Factory, Cpu, Box, Beaker, Shield, Eye, Users, Leaf, Lightbulb, TrendingUp, Cloud } from "lucide-react";
import { useState } from "react";

/**
 * Diseño: Minimalismo Corporativo Futurista
 * - Paleta: Azul profundo (#0F3A7D) + Verde esmeralda (#00A86B) + Cian (#00D9FF)
 * - Tipografía: IBM Plex Sans
 * - Espaciado: Generoso (32px entre secciones)
 * - Componentes: Tarjetas con borde izquierdo de color, métricas grandes
 */

export default function Home() {
  const [activeUnit, setActiveUnit] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white">
      {/* Header Navigation */}
      <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">NX</span>
            </div>
            <span className="text-xl font-bold text-foreground">NEXERGY AI</span>
          </div>
          <nav className="hidden md:flex gap-8">
            <a href="#platform" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Plataforma</a>
            <a href="#units" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Soluciones</a>
            <a href="#governance" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Seguridad</a>
            <a href="#contact" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Contacto</a>
          </nav>
          <Button className="bg-primary hover:bg-primary/90 text-white">Solicitar Demo</Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50 to-white py-20 md:py-32">
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#0F3A7D" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="1200" height="600" fill="url(#grid)" />
          </svg>
        </div>
        
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Conectamos estrategia y operación para ejecutar el futuro, <span className="text-primary">hoy</span>.
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              NEXERGY AI conecta la estrategia del negocio con los datos operacionales mediante IA agentiva y gemelos digitales para optimizar decisiones en tiempo real y asistir la ejecución operativa.
            </p>
            <div className="flex gap-4">
              <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-base">
                Explorar Plataforma <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button variant="outline" className="px-8 py-6 text-base border-primary text-primary hover:bg-primary/5">
                Ver Documentación
              </Button>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="mt-16 container">
          <img 
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663615079919/MyZLdEugXfJzSSj4QhaJuV/hero-nexergy-ai-3CN4gxQD9QjGymF5gokaHi.webp"
            alt="Nexergy AI Platform Architecture"
            className="w-full rounded-lg shadow-lg"
          />
        </div>
      </section>

      {/* Problem-Solution-Results Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Problem */}
            <Card className="border-l-4 border-l-primary bg-gradient-to-br from-blue-50 to-white p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold text-lg">i</span>
                </div>
                <h3 className="text-lg font-bold text-primary">PROBLEMA</h3>
              </div>
              <p className="text-foreground leading-relaxed">
                Las industrias operan con sistemas fragmentados y desconectados de la estrategia del negocio, generando ineficiencias, baja visibilidad operacional y pérdida de productividad.
              </p>
            </Card>

            {/* Solution */}
            <Card className="border-l-4 border-l-secondary bg-gradient-to-br from-green-50 to-white p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                  <Lightbulb className="w-5 h-5 text-secondary" />
                </div>
                <h3 className="text-lg font-bold text-secondary">SOLUCIÓN</h3>
              </div>
              <p className="text-foreground leading-relaxed">
                NEXERGY AI conecta la estrategia del negocio con los datos operacionales mediante IA agentiva y gemelos digitales para optimizar decisiones en tiempo real y asistir la ejecución operativa.
              </p>
            </Card>

            {/* Results */}
            <Card className="border-l-4 border-l-accent bg-gradient-to-br from-cyan-50 to-white p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-lg font-bold text-accent">RESULTADOS</h3>
              </div>
              <ul className="space-y-2 text-foreground">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                  Mayor productividad
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                  Claridad de visión y misión
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                  Menos downtime
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                  Eficiencia energética
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Platform Architecture Section */}
      <section id="platform" className="py-20 md:py-32 bg-gradient-to-b from-white to-blue-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">PLATAFORMA NEXERGY AI</h2>
            <p className="text-xl text-muted-foreground">Inteligencia Operacional en Tiempo Real</p>
          </div>

          <img 
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663615079919/MyZLdEugXfJzSSj4QhaJuV/platform-architecture-JALpXsFgh838vqvPE2AT8M.webp"
            alt="Platform Architecture"
            className="w-full rounded-lg shadow-lg mb-16"
          />

          <div className="grid md:grid-cols-5 gap-6">
            {[
              { icon: "📊", title: "CONECTA", desc: "Integra y centraliza datos de múltiples fuentes" },
              { icon: "🧠", title: "ENTIENDE", desc: "Aplica IA y analítica para comprender patrones" },
              { icon: "🎲", title: "SIMULA", desc: "Crea modelos y escenarios para predecir resultados" },
              { icon: "🤖", title: "DECIDE", desc: "IA recomienda la mejor acción basada en datos" },
              { icon: "▶️", title: "EJECUTA", desc: "Ejecuta la decisión en los sistemas y el entorno real" }
            ].map((step, idx) => (
              <Card key={idx} className="border-t-4 border-t-primary bg-white p-6 text-center hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-3">{step.icon}</div>
                <h4 className="font-bold text-primary mb-2">{step.title}</h4>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Business Units Section */}
      <section id="units" className="py-20 md:py-32 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">NUESTRAS UNIDADES DE NEGOCIO</h2>
            <p className="text-xl text-muted-foreground">Soluciones especializadas para cada desafío operacional</p>
          </div>

          <img 
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663615079919/MyZLdEugXfJzSSj4QhaJuV/business-units-Qg5U5cDCyQwmpqszqvhxQJ.webp"
            alt="Business Units"
            className="w-full rounded-lg shadow-lg mb-16"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              {
                id: "industrial",
                title: "NEXERGY INDUSTRIAL",
                icon: Factory,
                color: "border-l-blue-600",
                desc: "Optimización de operaciones industriales, mantenimiento predictivo y reducción de downtime."
              },
              {
                id: "energy",
                title: "NEXERGY ENERGY",
                icon: Zap,
                color: "border-l-green-600",
                desc: "Gestión y eficiencia energética para activos, plantas y redes críticas."
              },
              {
                id: "agents",
                title: "NEXERGY AGENTS",
                icon: Cpu,
                color: "border-l-purple-600",
                desc: "Agentes de IA que monitorean, analizan y ejecutan acciones para mejorar resultados."
              },
              {
                id: "digital-twin",
                title: "NEXERGY DIGITAL TWIN",
                icon: Box,
                color: "border-l-cyan-600",
                desc: "Gemelos digitales que simulan, predicen y optimizan sistemas en tiempo real."
              },
              {
                id: "labs",
                title: "NEXERGY LABS",
                icon: Beaker,
                color: "border-l-yellow-600",
                desc: "Investigación, desarrollo e innovación en IA, automatización y tecnologías emergentes."
              }
            ].map((unit) => (
              <Card
                key={unit.id}
                className={`border-l-4 ${unit.color} bg-gradient-to-br from-white to-gray-50 p-6 cursor-pointer hover:shadow-lg transition-all`}
                onClick={() => setActiveUnit(activeUnit === unit.id ? null : unit.id)}
              >
                <div className="flex items-center gap-3 mb-4">
                  <unit.icon className="w-6 h-6 text-primary" />
                  <h4 className="font-bold text-foreground text-sm">{unit.title}</h4>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{unit.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Governance & Security Section */}
      <section id="governance" className="py-20 md:py-32 bg-gradient-to-b from-white to-blue-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">GOBERNANZA, SEGURIDAD Y TRAZABILIDAD</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <img 
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663615079919/MyZLdEugXfJzSSj4QhaJuV/governance-security-7nzRr24LQ7tVA9wQzYaYV7.webp"
              alt="Governance Security"
              className="rounded-lg shadow-lg"
            />

            <div className="space-y-6">
              <div className="border-l-4 border-l-primary pl-6">
                <h4 className="font-bold text-primary mb-2 flex items-center gap-2">
                  <Shield className="w-5 h-5" /> GOBERNANZA (ISO 42001)
                </h4>
                <p className="text-muted-foreground">Ética, validación, gobierno, control de riesgos y transparencia algorítmica.</p>
              </div>

              <div className="border-l-4 border-l-secondary pl-6">
                <h4 className="font-bold text-secondary mb-2 flex items-center gap-2">
                  <Users className="w-5 h-5" /> CUMPLIMIENTO Y MLOPS
                </h4>
                <p className="text-muted-foreground">Gestión del ciclo de vida de modelos, calidad, versionado y monitoreo continuo.</p>
              </div>

              <div className="border-l-4 border-l-accent pl-6">
                <h4 className="font-bold text-accent mb-2 flex items-center gap-2">
                  <Eye className="w-5 h-5" /> INTEGRIDAD Y AUDITORÍA (BLOCKCHAIN)
                </h4>
                <p className="text-muted-foreground">Inmutabilidad, hashes criptográficos y timestamping para auditoría forense e integridad de IA.</p>
              </div>

              <p className="text-sm text-muted-foreground italic pt-4">
                Confianza. Trazabilidad. Evidencia verificable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">PROPUESTA DE VALOR</h2>
          </div>

          <img 
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663615079919/MyZLdEugXfJzSSj4QhaJuV/value-proposition-5k4LEEkpATKoAaJ7nWGThC.webp"
            alt="Value Proposition"
            className="w-full rounded-lg shadow-lg"
          />

          <div className="mt-12 grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-foreground">Alineamos estrategia y operación</h3>
              <p className="text-muted-foreground leading-relaxed">
                Conectamos la visión estratégica con la ejecución operativa, asegurando que cada decisión contribuya a los objetivos del negocio.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-foreground">Convertimos datos en decisiones y acciones</h3>
              <p className="text-muted-foreground leading-relaxed">
                Transformamos datos operacionales en inteligencia accionable que empodera decisiones más inteligentes, rápidas y confiables.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-foreground">Operación más eficiente, segura y sostenible</h3>
              <p className="text-muted-foreground leading-relaxed">
                Optimizamos operaciones con automatización, resiliencia y seguridad en el núcleo, reduciendo costos y riesgos.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-foreground">Valor medible y escalable</h3>
              <p className="text-muted-foreground leading-relaxed">
                Construimos soluciones escalables que crecen con tu negocio y entregan compounding value a través del tiempo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-white to-blue-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">NUESTROS VALORES FUNDAMENTALES</h2>
          </div>

          <div className="grid md:grid-cols-5 gap-6">
            {[
              { icon: Shield, title: "CONFIABILIDAD", desc: "Sistemas seguros y resilientes" },
              { icon: Eye, title: "TRANSPARENCIA", desc: "Visibilidad total de punta a punta" },
              { icon: Users, title: "COLABORACIÓN", desc: "IA + personas trabajando juntas" },
              { icon: Leaf, title: "SOSTENIBILIDAD", desc: "Eficiencia y cuidado de los recursos" },
              { icon: Lightbulb, title: "INNOVACIÓN", desc: "Tecnología para resolver problemas reales" }
            ].map((value, idx) => (
              <Card key={idx} className="bg-white p-6 text-center hover:shadow-lg transition-shadow border border-border">
                <value.icon className="w-8 h-8 text-primary mx-auto mb-4" />
                <h4 className="font-bold text-foreground mb-2">{value.title}</h4>
                <p className="text-sm text-muted-foreground">{value.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-20 md:py-32 bg-gradient-to-r from-primary to-primary/90">
        <div className="container text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">¿Listo para transformar tu operación?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Descubre cómo NEXERGY AI puede conectar tu estrategia con la ejecución operativa para generar valor medible.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button className="bg-white text-primary hover:bg-blue-50 px-8 py-6 text-base font-semibold">
              Solicitar Demo <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-base">
              Contactar Ventas
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-white py-12">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4">Sobre Nexergy</h4>
              <p className="text-sm text-gray-300">Plataforma de inteligencia operacional en tiempo real para transformación digital.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Soluciones</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white transition">Industrial</a></li>
                <li><a href="#" className="hover:text-white transition">Energy</a></li>
                <li><a href="#" className="hover:text-white transition">Agents</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Empresa</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white transition">Acerca de</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Carreras</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white transition">Privacidad</a></li>
                <li><a href="#" className="hover:text-white transition">Términos</a></li>
                <li><a href="#" className="hover:text-white transition">Contacto</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-300">
            <p>&copy; 2026 Nexergy AI. Todos los derechos reservados. | Data. Intelligence. Action. Impact.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
