"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PhoneInput from "react-phone-number-input";
import { Search, Shield, Eye, ArrowRight, CheckCircle2 } from "lucide-react";

export default function LandingPage() {
  const [phone, setPhone] = useState<string | undefined>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phone || phone.length < 10) {
      setError("Por favor, insira um número válido");
      return;
    }

    setIsLoading(true);
    setError("");

    const cleanNumber = phone.replace(/[^0-9]/g, "");
    localStorage.setItem("scanPhone", cleanNumber);

    setTimeout(() => {
      router.push("/loading");
    }, 500);
  };

  const steps = [
    {
      icon: <Search className="w-6 h-6" />,
      title: "Digite o número",
      description: "Insira o número que deseja investigar",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Escaneamos perfis",
      description: "Nossa tecnologia busca dados correspondentes",
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "Veja os resultados",
      description: "Acesse conversas e mídia privada",
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

      {/* Hero Section */}
      <section className="px-4 pt-8 pb-12">
        <div className="max-w-md mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-slate-100 text-slate-600 text-sm font-medium px-4 py-2 rounded-full mb-6">
            <CheckCircle2 className="w-4 h-4 text-success" />
            100% Anônimo e Seguro
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight mb-4 text-balance">
            Descubra conversas ocultas de qualquer número
          </h1>
          
          <p className="text-muted text-lg mb-8">
            Acesse mensagens privadas, fotos e áudios enviados pelo WhatsApp
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="px-4 pb-12">
        <div className="max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-medium p-6 sm:p-8">
            <label className="block text-sm font-semibold text-foreground mb-3">
              Número de telefone
            </label>
            
            <PhoneInput
              international
              defaultCountry="BR"
              value={phone}
              onChange={setPhone}
              placeholder="(00) 00000-0000"
              className="mb-4"
            />

            {error && (
              <p className="text-red-500 text-sm mb-4">{error}</p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-foreground hover:bg-slate-800 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-soft hover:shadow-medium"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Iniciando...
                </>
              ) : (
                <>
                  Iniciar Escaneamento
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

            <p className="text-xs text-muted-foreground text-center mt-4">
              Ao continuar, você concorda com nossos Termos de Uso
            </p>
          </form>
        </div>
      </section>

      {/* Steps Section */}
      <section className="px-4 pb-16">
        <div className="max-w-md mx-auto">
          <h2 className="text-xl font-bold text-foreground text-center mb-8">
            Como funciona
          </h2>
          
          <div className="space-y-4">
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex items-start gap-4 bg-white rounded-2xl p-5 shadow-soft"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-foreground">
                  {step.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold text-muted bg-slate-100 px-2 py-0.5 rounded">
                      Passo {index + 1}
                    </span>
                  </div>
                  <h3 className="font-semibold text-foreground">{step.title}</h3>
                  <p className="text-sm text-muted">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="px-4 pb-16">
        <div className="max-w-md mx-auto">
          <div className="bg-slate-100 rounded-2xl p-6 text-center">
            <div className="flex justify-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              ))}
            </div>
            <p className="text-sm text-muted mb-2">
              Mais de <strong className="text-foreground">50.000</strong> escaneamentos realizados
            </p>
            <p className="text-xs text-muted-foreground">
              Avaliação média de 4.9 estrelas
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 pb-8">
        <div className="max-w-md mx-auto text-center">
          <p className="text-xs text-muted-foreground">
            Este serviço é apenas para fins educacionais.
          </p>
        </div>
      </footer>
    </main>
  );
}
