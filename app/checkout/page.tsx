"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Eye, 
  Shield, 
  Lock, 
  CreditCard,
  Check,
  ArrowLeft
} from "lucide-react";

export default function CheckoutPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
    email: "",
  });
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "cardNumber") {
      formattedValue = value
        .replace(/\D/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim()
        .slice(0, 19);
    }

    if (name === "expiry") {
      formattedValue = value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "$1/$2")
        .slice(0, 5);
    }

    if (name === "cvv") {
      formattedValue = value.replace(/\D/g, "").slice(0, 4);
    }

    setFormData((prev) => ({ ...prev, [name]: formattedValue }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simula processamento
    setTimeout(() => {
      router.push("/success");
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      {/* Header */}
      <header className="py-6 px-4 border-b border-slate-100">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-muted hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-foreground rounded-lg flex items-center justify-center">
              <Eye className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-foreground">PrivateScan</span>
          </div>
          <div className="w-16" />
        </div>
      </header>

      {/* Checkout Form */}
      <section className="px-4 py-8">
        <div className="max-w-md mx-auto">
          {/* Order Summary */}
          <div className="bg-slate-100 rounded-2xl p-5 mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-foreground font-medium">Acesso Completo PrivateScan</span>
              <span className="text-foreground font-bold">R$ 29,90</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted">
              <Check className="w-4 h-4 text-success" />
              Pagamento único - Acesso vitalício
            </div>
          </div>

          {/* Payment Form */}
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-medium p-6">
            <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Dados do Pagamento
            </h2>

            <div className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  E-mail
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="seu@email.com"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground focus:ring-1 focus:ring-foreground transition-colors"
                />
              </div>

              {/* Card Number */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Número do Cartão
                </label>
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  placeholder="0000 0000 0000 0000"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground focus:ring-1 focus:ring-foreground transition-colors"
                />
              </div>

              {/* Card Name */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Nome no Cartão
                </label>
                <input
                  type="text"
                  name="cardName"
                  value={formData.cardName}
                  onChange={handleInputChange}
                  placeholder="NOME COMPLETO"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground focus:ring-1 focus:ring-foreground transition-colors uppercase"
                />
              </div>

              {/* Expiry and CVV */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Validade
                  </label>
                  <input
                    type="text"
                    name="expiry"
                    value={formData.expiry}
                    onChange={handleInputChange}
                    placeholder="MM/AA"
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground focus:ring-1 focus:ring-foreground transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    CVV
                  </label>
                  <input
                    type="text"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    placeholder="123"
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground focus:ring-1 focus:ring-foreground transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full bg-foreground hover:bg-slate-800 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 mt-6 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processando...
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5" />
                  Pagar R$ 29,90
                </>
              )}
            </button>

            {/* Trust Badges */}
            <div className="flex items-center justify-center gap-6 mt-6 text-sm text-muted">
              <div className="flex items-center gap-1">
                <Shield className="w-4 h-4" />
                Pagamento Seguro
              </div>
              <div className="flex items-center gap-1">
                <Lock className="w-4 h-4" />
                SSL Criptografado
              </div>
            </div>
          </form>

          {/* Security Note */}
          <p className="text-xs text-muted-foreground text-center mt-6">
            Seus dados de pagamento são processados de forma segura. 
            Não armazenamos informações do seu cartão.
          </p>
        </div>
      </section>
    </main>
  );
}
