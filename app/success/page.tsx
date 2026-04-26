"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  Eye, 
  CheckCircle2, 
  ArrowRight,
  MessageCircle,
  Image as ImageIcon,
  Video,
  Mic
} from "lucide-react";

export default function SuccessPage() {
  const [progress, setProgress] = useState(0);
  const [showAccess, setShowAccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const duration = 3000;
    const interval = 50;
    const increment = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          setShowAccess(true);
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const handleAccess = () => {
    router.push("/dashboard");
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-slate-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 bg-foreground rounded-xl flex items-center justify-center">
            <Eye className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-foreground">PrivateScan</span>
        </div>

        {/* Success Card */}
        <div className="bg-white rounded-3xl shadow-medium p-8">
          {/* Success Icon */}
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 bg-success/20 rounded-full animate-ping" />
            <div className="relative w-20 h-20 bg-success rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-foreground mb-2">
            Pagamento Confirmado!
          </h1>

          <p className="text-muted mb-8">
            Seu acesso foi desbloqueado com sucesso. Preparando seus resultados...
          </p>

          {/* Progress */}
          {!showAccess && (
            <div className="mb-6">
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-success rounded-full transition-all duration-100 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-sm text-muted mt-3">
                Configurando acesso... {Math.round(progress)}%
              </p>
            </div>
          )}

          {/* Access Ready */}
          {showAccess && (
            <>
              {/* What You Got */}
              <div className="bg-slate-50 rounded-2xl p-5 mb-6 text-left">
                <h3 className="font-semibold text-foreground mb-4">
                  Seu acesso inclui:
                </h3>
                <div className="space-y-3">
                  {[
                    { icon: MessageCircle, text: "5 conversas completas" },
                    { icon: ImageIcon, text: "12 fotos privadas" },
                    { icon: Video, text: "3 vídeos íntimos" },
                    { icon: Mic, text: "8 mensagens de áudio" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center">
                        <item.icon className="w-4 h-4 text-success" />
                      </div>
                      <span className="text-foreground text-sm">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={handleAccess}
                className="w-full bg-foreground hover:bg-slate-800 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-soft hover:shadow-medium animate-fade-up"
              >
                Acessar Resultados
                <ArrowRight className="w-5 h-5" />
              </button>
            </>
          )}
        </div>

        {/* Confirmation */}
        <div className="mt-6 text-sm text-muted">
          <p>Um e-mail de confirmação foi enviado para você.</p>
        </div>
      </div>
    </main>
  );
}
