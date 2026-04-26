"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Eye, Shield, Database, Lock } from "lucide-react";

const loadingMessages = [
  { text: "Conectando ao servidor seguro...", icon: Shield },
  { text: "Escaneando banco de dados...", icon: Database },
  { text: "Buscando perfis correspondentes...", icon: Eye },
  { text: "Descriptografando conteúdo privado...", icon: Lock },
  { text: "Preparando resultados...", icon: Eye },
];

export default function LoadingPage() {
  const [progress, setProgress] = useState(0);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const duration = 8000; // 8 seconds total
    const interval = 50;
    const increment = 100 / (duration / interval);

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(progressTimer);
          setShowButton(true);
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(progressTimer);
  }, []);

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setCurrentMessageIndex((prev) => 
        prev < loadingMessages.length - 1 ? prev + 1 : prev
      );
    }, 1800);

    return () => clearInterval(messageInterval);
  }, []);

  const handleViewResults = () => {
    router.push("/results");
  };

  const CurrentIcon = loadingMessages[currentMessageIndex].icon;

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-slate-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-12">
          <div className="w-10 h-10 bg-foreground rounded-xl flex items-center justify-center">
            <Eye className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-foreground">PrivateScan</span>
        </div>

        {/* Loading Card */}
        <div className="bg-white rounded-3xl shadow-medium p-8 text-center">
          {/* Animated Icon */}
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 bg-slate-100 rounded-full animate-ping opacity-20" />
            <div className="relative w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center">
              <CurrentIcon className="w-8 h-8 text-foreground animate-pulse" />
            </div>
          </div>

          {/* Progress Text */}
          <h2 className="text-2xl font-bold text-foreground mb-2">
            {progress < 100 ? "Escaneando..." : "Escaneamento Completo"}
          </h2>

          {/* Dynamic Message */}
          <p className="text-muted mb-8 h-6 transition-all duration-300">
            {loadingMessages[currentMessageIndex].text}
          </p>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-foreground rounded-full transition-all duration-100 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-sm font-semibold text-foreground mt-3">
              {Math.round(progress)}%
            </p>
          </div>

          {/* Scanning Steps */}
          <div className="space-y-3 mb-8">
            {loadingMessages.slice(0, currentMessageIndex + 1).map((msg, index) => (
              <div 
                key={index}
                className="flex items-center gap-3 text-left animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-5 h-5 bg-success/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm text-muted">{msg.text}</span>
              </div>
            ))}
          </div>

          {/* View Results Button */}
          {showButton && (
            <button
              onClick={handleViewResults}
              className="w-full bg-foreground hover:bg-slate-800 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-soft hover:shadow-medium animate-fade-up"
            >
              Ver Resultados
            </button>
          )}
        </div>

        {/* Security Note */}
        <p className="text-xs text-muted-foreground text-center mt-6">
          Seus dados estão protegidos com criptografia de ponta a ponta
        </p>
      </div>
    </main>
  );
}
