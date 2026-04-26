"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  Eye, 
  Shield, 
  Lock, 
  Check, 
  MessageCircle, 
  Image as ImageIcon, 
  Mic, 
  Video,
  Clock,
  Zap,
  Star,
  ArrowRight
} from "lucide-react";

export default function UnlockPage() {
  const [timeLeft, setTimeLeft] = useState({ minutes: 4, seconds: 59 });
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { minutes: prev.minutes - 1, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleCheckout = () => {
    router.push("/checkout");
  };

  const benefits = [
    { icon: MessageCircle, text: "Acesso a todas as conversas" },
    { icon: ImageIcon, text: "Ver fotos privadas" },
    { icon: Video, text: "Assistir vídeos íntimos" },
    { icon: Mic, text: "Ouvir mensagens de áudio" },
    { icon: Clock, text: "Atualizações em tempo real" },
    { icon: Shield, text: "100% anônimo e seguro" },
  ];

  const testimonials = [
    {
      name: "Lucas M.",
      text: "Descobri tudo que precisava saber. Valeu cada centavo.",
      rating: 5,
    },
    {
      name: "Fernanda S.",
      text: "Fácil de usar e muito rápido. Recomendo!",
      rating: 5,
    },
    {
      name: "Ricardo P.",
      text: "Finalmente consegui a prova que precisava.",
      rating: 5,
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      {/* Header */}
      <header className="py-6 px-4">
        <div className="max-w-md mx-auto flex items-center justify-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-foreground rounded-xl flex items-center justify-center">
              <Eye className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">PrivateScan</span>
          </div>
        </div>
      </header>

      {/* Urgency Banner */}
      <div className="bg-foreground text-white py-3 px-4">
        <div className="max-w-md mx-auto flex items-center justify-center gap-2 text-sm">
          <Zap className="w-4 h-4 text-yellow-400" />
          <span>Oferta expira em</span>
          <span className="font-bold bg-white/20 px-2 py-0.5 rounded">
            {String(timeLeft.minutes).padStart(2, "0")}:{String(timeLeft.seconds).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Hero */}
      <section className="px-4 py-8">
        <div className="max-w-md mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-success/10 text-success text-sm font-medium px-4 py-2 rounded-full mb-6">
            <Check className="w-4 h-4" />
            Escaneamento Completo
          </div>

          <h1 className="text-3xl font-bold text-foreground leading-tight mb-4 text-balance">
            Desbloqueie o Acesso Completo aos Resultados
          </h1>

          <p className="text-muted text-lg mb-6">
            Veja todas as conversas, fotos, vídeos e áudios encontrados no escaneamento.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="px-4 pb-8">
        <div className="max-w-md mx-auto grid grid-cols-2 gap-3">
          {[
            { value: "5", label: "Conversas" },
            { value: "12", label: "Fotos" },
            { value: "3", label: "Vídeos" },
            { value: "8", label: "Áudios" },
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl p-4 text-center shadow-soft">
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="px-4 pb-8">
        <div className="max-w-md mx-auto">
          <h2 className="text-xl font-bold text-foreground text-center mb-6">
            O que você terá acesso
          </h2>

          <div className="bg-white rounded-3xl shadow-medium p-6">
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-foreground flex-shrink-0">
                    <benefit.icon className="w-5 h-5" />
                  </div>
                  <span className="text-foreground">{benefit.text}</span>
                  <Check className="w-5 h-5 text-success ml-auto" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="px-4 pb-8">
        <div className="max-w-md mx-auto">
          <div className="bg-foreground rounded-3xl p-6 text-white text-center">
            <div className="inline-flex items-center gap-1 bg-white/20 text-sm font-medium px-3 py-1 rounded-full mb-4">
              <Star className="w-4 h-4 text-yellow-400" />
              Oferta Especial
            </div>

            <div className="mb-4">
              <span className="text-muted-foreground line-through text-lg">R$ 97,00</span>
              <div className="flex items-center justify-center gap-2">
                <span className="text-4xl font-bold">R$ 29,90</span>
              </div>
              <p className="text-white/60 text-sm mt-1">Pagamento único - Acesso vitalício</p>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-white hover:bg-slate-100 text-foreground font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-soft"
            >
              Desbloquear Agora
              <ArrowRight className="w-5 h-5" />
            </button>

            <div className="flex items-center justify-center gap-4 mt-4 text-sm text-white/60">
              <div className="flex items-center gap-1">
                <Shield className="w-4 h-4" />
                Seguro
              </div>
              <div className="flex items-center gap-1">
                <Lock className="w-4 h-4" />
                Privado
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-4 pb-8">
        <div className="max-w-md mx-auto">
          <h2 className="text-xl font-bold text-foreground text-center mb-6">
            O que nossos clientes dizem
          </h2>

          <div className="space-y-3">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-5 shadow-soft">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-foreground mb-2">{`"${testimonial.text}"`}</p>
                <p className="text-sm text-muted">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantee */}
      <section className="px-4 pb-8">
        <div className="max-w-md mx-auto">
          <div className="bg-success/10 rounded-2xl p-6 text-center">
            <Shield className="w-12 h-12 text-success mx-auto mb-3" />
            <h3 className="font-bold text-foreground mb-2">Garantia de 7 Dias</h3>
            <p className="text-sm text-muted">
              Se não ficar satisfeito, devolvemos seu dinheiro. Sem perguntas.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-4 pb-8">
        <div className="max-w-md mx-auto">
          <button
            onClick={handleCheckout}
            className="w-full bg-foreground hover:bg-slate-800 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-soft hover:shadow-medium"
          >
            Desbloquear Acesso Completo
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 pb-8">
        <div className="max-w-md mx-auto text-center">
          <p className="text-xs text-muted-foreground">
            Pagamento processado de forma segura. Seus dados estão protegidos.
          </p>
        </div>
      </footer>
    </main>
  );
}
