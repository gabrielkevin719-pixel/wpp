"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Image from "next/image";

function DecodeContent() {
  const searchParams = useSearchParams();
  const tel = searchParams.get("tel") || "";
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Iniciando conexión segura...");
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);

  useEffect(() => {
    // Try to get photo from sessionStorage
    const storedPhoto = sessionStorage.getItem("photoUserLink");
    if (storedPhoto) {
      setPhotoUrl(storedPhoto);
    }
  }, []);

  useEffect(() => {
    const steps = [
      { progress: 15, status: "Conectando con servidores..." },
      { progress: 30, status: "Verificando número de destino..." },
      { progress: 45, status: "Accediendo a base de datos..." },
      { progress: 60, status: "Escaneando mensajes..." },
      { progress: 75, status: "Descargando multimedia..." },
      { progress: 90, status: "Procesando datos..." },
      { progress: 100, status: "¡Análisis completado!" },
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setProgress(steps[currentStep].progress);
        setStatus(steps[currentStep].status);
        currentStep++;
      } else {
        clearInterval(interval);
      }
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen pb-16">
      {/* Orbs */}
      <div className="fixed w-[300px] h-[300px] rounded-full bg-acid/[0.06] -top-20 -right-15 blur-[80px] animate-float pointer-events-none z-0" />
      <div className="fixed w-[200px] h-[200px] rounded-full bg-acid2/[0.04] bottom-[200px] -left-15 blur-[80px] animate-float pointer-events-none z-0" style={{ animationDelay: "-4s" }} />

      <div className="w-full max-w-[480px] relative z-10 flex flex-col items-center px-4 pt-12">
        {/* Logo */}
        <Image
          src="/assets/logo-Dmi_bgbj.png"
          alt="WhatSpy"
          width={80}
          height={80}
          className="rounded-full border-2 border-acid/30 shadow-[0_0_30px_rgba(0,255,136,0.2)] object-cover mb-4"
        />
        <span className="font-display text-lg font-black text-acid tracking-widest mb-8">
          WHATSPY
        </span>

        {/* Target Info */}
        <div className="bg-surface border border-border rounded-[14px] p-6 w-full mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-acid/10 border-2 border-acid/30 flex items-center justify-center overflow-hidden">
              {photoUrl ? (
                <Image
                  src={photoUrl}
                  alt="Target"
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-2xl">👤</span>
              )}
            </div>
            <div>
              <div className="font-display text-xs text-acid tracking-widest uppercase mb-1">
                OBJETIVO
              </div>
              <div className="text-xl font-bold text-foreground">
                +{tel}
              </div>
            </div>
          </div>
        </div>

        {/* Progress Card */}
        <div className="bg-surface border border-border rounded-[14px] p-6 w-full relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-acid via-acid2 to-acid bg-[length:200%_100%] animate-shimmer" />
          
          <div className="font-display text-xs text-acid tracking-widest uppercase text-center mb-6">
            ANÁLISIS EN PROGRESO
          </div>

          {/* Progress Bar */}
          <div className="w-full h-3 bg-black/30 rounded-full overflow-hidden mb-4">
            <div
              className="h-full bg-gradient-to-r from-acid to-acid2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex justify-between items-center mb-6">
            <span className="text-sm text-muted">{status}</span>
            <span className="font-display text-lg font-bold text-acid">{progress}%</span>
          </div>

          {/* Scanning Animation */}
          <div className="flex items-center justify-center gap-3">
            <div className="w-2 h-2 bg-acid rounded-full animate-bounce" style={{ animationDelay: "0s" }} />
            <div className="w-2 h-2 bg-acid rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
            <div className="w-2 h-2 bg-acid rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
          </div>
        </div>

        {/* Security Note */}
        <div className="flex items-center justify-center gap-1.5 text-xs text-muted pt-6 text-center">
          <span>Conexión encriptada de extremo a extremo</span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 w-full mt-8">
          {[
            { value: "847", label: "Usuarios activos" },
            { value: "99.8%", label: "Éxito" },
            { value: "< 2min", label: "Tiempo medio" },
          ].map((stat) => (
            <div key={stat.label} className="bg-surface border border-border rounded-[10px] p-3 text-center">
              <div className="font-display text-lg font-bold text-acid">{stat.value}</div>
              <div className="text-[0.65rem] text-muted">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function DecodePage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-acid">Cargando...</div>
      </div>
    }>
      <DecodeContent />
    </Suspense>
  );
}
