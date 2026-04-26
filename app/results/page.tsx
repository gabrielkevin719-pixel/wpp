"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  Lock, 
  Image as ImageIcon, 
  Mic, 
  Video, 
  ArrowLeft, 
  Check, 
  CheckCheck,
  Phone,
  MoreVertical,
  Search,
  Send
} from "lucide-react";

const conversations = [
  {
    id: 1,
    name: "Maria",
    avatar: "M",
    lastMessage: "Saudades de você...",
    time: "10:32",
    unread: 3,
    online: true,
  },
  {
    id: 2,
    name: "João",
    avatar: "J",
    lastMessage: "Foto enviada",
    time: "09:15",
    unread: 0,
    online: false,
  },
  {
    id: 3,
    name: "Ana Paula",
    avatar: "A",
    lastMessage: "Áudio (0:42)",
    time: "Ontem",
    unread: 5,
    online: true,
  },
  {
    id: 4,
    name: "Carlos",
    avatar: "C",
    lastMessage: "Vídeo enviado",
    time: "Ontem",
    unread: 0,
    online: false,
  },
  {
    id: 5,
    name: "Juliana",
    avatar: "J",
    lastMessage: "Preciso te ver hoje...",
    time: "Seg",
    unread: 2,
    online: true,
  },
];

const chatMessages = [
  { id: 1, type: "received", text: "Oi, tudo bem?", time: "10:15", status: "read" },
  { id: 2, type: "sent", text: "Tudo sim, e você?", time: "10:16", status: "read" },
  { id: 3, type: "received", text: "Estava pensando em você...", time: "10:18", status: "read" },
  { id: 4, type: "received", content: "image", time: "10:20", status: "read" },
  { id: 5, type: "sent", text: "Que foto linda!", time: "10:22", status: "read" },
  { id: 6, type: "received", content: "audio", duration: "0:42", time: "10:25", status: "read" },
  { id: 7, type: "received", text: "Saudades de você...", time: "10:32", status: "delivered" },
  { id: 8, type: "received", content: "video", time: "10:35", status: "delivered" },
];

const galleryItems = [
  { type: "image", locked: true },
  { type: "image", locked: true },
  { type: "video", locked: true },
  { type: "image", locked: true },
  { type: "video", locked: true },
  { type: "image", locked: true },
];

export default function ResultsPage() {
  const [activeConversation, setActiveConversation] = useState(conversations[0]);
  const [showOverlay, setShowOverlay] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Show overlay after 2 seconds
    const timer = setTimeout(() => {
      setShowOverlay(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleUnlock = () => {
    router.push("/unlock");
  };

  return (
    <main className="min-h-screen bg-slate-100 flex flex-col">
      {/* Header */}
      <header className="bg-foreground text-white px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()} className="p-1">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="font-semibold">Conversas Encontradas</span>
        </div>
        <div className="flex items-center gap-2">
          <Search className="w-5 h-5" />
          <MoreVertical className="w-5 h-5" />
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Conversations List */}
        <aside className="w-full md:w-80 bg-white border-r border-slate-200 overflow-y-auto">
          {conversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => setActiveConversation(conv)}
              className={`w-full flex items-center gap-3 p-4 hover:bg-slate-50 transition-colors border-b border-slate-100 text-left ${
                activeConversation.id === conv.id ? "bg-slate-50" : ""
              }`}
            >
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-slate-300 to-slate-400 rounded-full flex items-center justify-center text-white font-semibold">
                  {conv.avatar}
                </div>
                {conv.online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-white" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-foreground">{conv.name}</span>
                  <span className="text-xs text-muted">{conv.time}</span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted truncate">{conv.lastMessage}</p>
                  {conv.unread > 0 && (
                    <span className="bg-success text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                      {conv.unread}
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </aside>

        {/* Chat Area - Hidden on mobile */}
        <div className="hidden md:flex flex-1 flex-col bg-[#e5ddd5]">
          {/* Chat Header */}
          <div className="bg-slate-100 px-4 py-3 flex items-center justify-between border-b border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-slate-300 to-slate-400 rounded-full flex items-center justify-center text-white font-semibold">
                {activeConversation.avatar}
              </div>
              <div>
                <p className="font-semibold text-foreground">{activeConversation.name}</p>
                <p className="text-xs text-success">Online</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-muted">
              <Phone className="w-5 h-5" />
              <Search className="w-5 h-5" />
              <MoreVertical className="w-5 h-5" />
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.type === "sent" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg px-3 py-2 shadow-sm ${
                    msg.type === "sent"
                      ? "bg-[#dcf8c6] rounded-br-none"
                      : "bg-white rounded-bl-none"
                  }`}
                >
                  {msg.text && <p className="text-sm text-foreground">{msg.text}</p>}
                  
                  {msg.content === "image" && (
                    <div className="relative w-48 h-48 bg-slate-200 rounded-lg content-locked flex items-center justify-center">
                      <ImageIcon className="w-12 h-12 text-slate-400" />
                      <div className="absolute inset-0 bg-foreground/60 rounded-lg flex items-center justify-center">
                        <Lock className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  )}

                  {msg.content === "audio" && (
                    <div className="flex items-center gap-3 min-w-[200px]">
                      <div className="w-10 h-10 bg-slate-300 rounded-full flex items-center justify-center">
                        <Mic className="w-5 h-5 text-slate-600" />
                      </div>
                      <div className="flex-1">
                        <div className="h-1 bg-slate-300 rounded-full content-locked" />
                        <p className="text-xs text-muted mt-1">{msg.duration}</p>
                      </div>
                      <Lock className="w-4 h-4 text-muted" />
                    </div>
                  )}

                  {msg.content === "video" && (
                    <div className="relative w-48 h-32 bg-slate-200 rounded-lg content-locked flex items-center justify-center">
                      <Video className="w-12 h-12 text-slate-400" />
                      <div className="absolute inset-0 bg-foreground/60 rounded-lg flex items-center justify-center">
                        <Lock className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-end gap-1 mt-1">
                    <span className="text-[10px] text-muted">{msg.time}</span>
                    {msg.type === "sent" && (
                      msg.status === "read" ? (
                        <CheckCheck className="w-4 h-4 text-blue-500" />
                      ) : (
                        <Check className="w-4 h-4 text-muted" />
                      )
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="bg-slate-100 px-4 py-3 flex items-center gap-3">
            <div className="flex-1 bg-white rounded-full px-4 py-2 flex items-center">
              <input
                type="text"
                placeholder="Digite uma mensagem"
                className="flex-1 bg-transparent outline-none text-sm"
                disabled
              />
            </div>
            <button className="w-10 h-10 bg-foreground rounded-full flex items-center justify-center">
              <Send className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="bg-white border-t border-slate-200 p-4">
        <h3 className="font-semibold text-foreground mb-3">Mídia Compartilhada</h3>
        <div className="grid grid-cols-3 gap-2">
          {galleryItems.map((item, index) => (
            <div
              key={index}
              className="relative aspect-square bg-slate-200 rounded-lg content-locked flex items-center justify-center"
            >
              {item.type === "image" ? (
                <ImageIcon className="w-8 h-8 text-slate-400" />
              ) : (
                <Video className="w-8 h-8 text-slate-400" />
              )}
              {item.locked && (
                <div className="absolute inset-0 bg-foreground/60 rounded-lg flex items-center justify-center">
                  <Lock className="w-6 h-6 text-white" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Locked Overlay */}
      {showOverlay && (
        <div className="fixed inset-0 bg-foreground/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-strong animate-fade-up">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Lock className="w-8 h-8 text-foreground" />
            </div>
            
            <h2 className="text-2xl font-bold text-foreground mb-3">
              Conteúdo Bloqueado
            </h2>
            
            <p className="text-muted mb-6">
              Desbloqueie para ver todas as conversas, fotos, vídeos e áudios privados encontrados.
            </p>

            <div className="space-y-3 text-left mb-8">
              {[
                "5 conversas encontradas",
                "12 fotos privadas",
                "3 vídeos íntimos",
                "8 mensagens de áudio",
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-success/10 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-success" />
                  </div>
                  <span className="text-sm text-foreground">{item}</span>
                </div>
              ))}
            </div>

            <button
              onClick={handleUnlock}
              className="w-full bg-foreground hover:bg-slate-800 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-soft hover:shadow-medium"
            >
              Desbloquear Acesso Completo
            </button>

            <p className="text-xs text-muted-foreground mt-4">
              Acesso único e instantâneo
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
