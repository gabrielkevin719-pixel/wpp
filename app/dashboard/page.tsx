"use client";

import { useState } from "react";
import { 
  Eye, 
  MessageCircle, 
  Image as ImageIcon, 
  Video, 
  Mic,
  ChevronRight,
  User,
  Clock,
  Check,
  CheckCheck,
  Play
} from "lucide-react";

const conversations = [
  {
    id: 1,
    name: "Maria",
    avatar: "M",
    messages: 47,
    lastMessage: "Saudades de você...",
    time: "10:32",
    online: true,
  },
  {
    id: 2,
    name: "João",
    avatar: "J",
    messages: 23,
    lastMessage: "Vamos nos encontrar hoje?",
    time: "09:15",
    online: false,
  },
  {
    id: 3,
    name: "Ana Paula",
    avatar: "A",
    messages: 89,
    lastMessage: "Te amo muito...",
    time: "Ontem",
    online: true,
  },
  {
    id: 4,
    name: "Carlos",
    avatar: "C",
    messages: 15,
    lastMessage: "Foi ótimo te ver",
    time: "Ontem",
    online: false,
  },
  {
    id: 5,
    name: "Juliana",
    avatar: "J",
    messages: 62,
    lastMessage: "Não conta pra ninguém...",
    time: "Seg",
    online: true,
  },
];

const mediaItems = [
  { type: "image", preview: "bg-gradient-to-br from-pink-200 to-rose-300" },
  { type: "image", preview: "bg-gradient-to-br from-blue-200 to-indigo-300" },
  { type: "video", preview: "bg-gradient-to-br from-purple-200 to-violet-300" },
  { type: "image", preview: "bg-gradient-to-br from-amber-200 to-orange-300" },
  { type: "video", preview: "bg-gradient-to-br from-emerald-200 to-teal-300" },
  { type: "image", preview: "bg-gradient-to-br from-cyan-200 to-sky-300" },
];

const audioMessages = [
  { duration: "0:42", from: "Maria", date: "Hoje, 10:25" },
  { duration: "1:15", from: "Ana Paula", date: "Ontem, 18:30" },
  { duration: "0:28", from: "Juliana", date: "Seg, 14:20" },
  { duration: "2:03", from: "Maria", date: "Dom, 22:45" },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"conversations" | "media" | "audio">("conversations");

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-foreground rounded-xl flex items-center justify-center">
                <Eye className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-foreground">PrivateScan</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-success bg-success/10 px-3 py-1.5 rounded-full">
              <Check className="w-4 h-4" />
              Acesso Ativo
            </div>
          </div>
        </div>
      </header>

      {/* Stats */}
      <section className="px-4 py-6">
        <div className="max-w-2xl mx-auto grid grid-cols-4 gap-3">
          {[
            { icon: MessageCircle, value: "236", label: "Mensagens" },
            { icon: ImageIcon, value: "12", label: "Fotos" },
            { icon: Video, value: "3", label: "Vídeos" },
            { icon: Mic, value: "8", label: "Áudios" },
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-3 text-center shadow-soft">
              <stat.icon className="w-5 h-5 text-muted mx-auto mb-1" />
              <p className="text-lg font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tabs */}
      <section className="px-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex gap-2 bg-slate-100 p-1 rounded-xl">
            {[
              { id: "conversations", label: "Conversas", icon: MessageCircle },
              { id: "media", label: "Mídia", icon: ImageIcon },
              { id: "audio", label: "Áudios", icon: Mic },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-white text-foreground shadow-sm"
                    : "text-muted hover:text-foreground"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="px-4 py-6">
        <div className="max-w-2xl mx-auto">
          {/* Conversations Tab */}
          {activeTab === "conversations" && (
            <div className="space-y-3">
              {conversations.map((conv) => (
                <button
                  key={conv.id}
                  className="w-full bg-white rounded-2xl p-4 shadow-soft hover:shadow-medium transition-shadow flex items-center gap-4 text-left"
                >
                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-br from-slate-300 to-slate-400 rounded-full flex items-center justify-center text-white text-lg font-semibold">
                      {conv.avatar}
                    </div>
                    {conv.online && (
                      <div className="absolute bottom-0 right-0 w-4 h-4 bg-success rounded-full border-2 border-white" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-foreground">{conv.name}</span>
                      <span className="text-xs text-muted">{conv.time}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted truncate">{conv.lastMessage}</p>
                      <span className="text-xs text-muted bg-slate-100 px-2 py-0.5 rounded-full">
                        {conv.messages} msgs
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted" />
                </button>
              ))}
            </div>
          )}

          {/* Media Tab */}
          {activeTab === "media" && (
            <div className="grid grid-cols-3 gap-2">
              {mediaItems.map((item, index) => (
                <div
                  key={index}
                  className={`aspect-square rounded-xl ${item.preview} flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity`}
                >
                  {item.type === "video" && (
                    <div className="w-12 h-12 bg-white/80 rounded-full flex items-center justify-center">
                      <Play className="w-6 h-6 text-foreground ml-1" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Audio Tab */}
          {activeTab === "audio" && (
            <div className="space-y-3">
              {audioMessages.map((audio, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-4 shadow-soft flex items-center gap-4"
                >
                  <button className="w-12 h-12 bg-foreground rounded-full flex items-center justify-center flex-shrink-0 hover:bg-slate-800 transition-colors">
                    <Play className="w-5 h-5 text-white ml-0.5" />
                  </button>
                  <div className="flex-1">
                    <div className="h-2 bg-slate-200 rounded-full mb-2">
                      <div className="h-full w-0 bg-foreground rounded-full" />
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-foreground font-medium">{audio.from}</span>
                      <span className="text-muted">{audio.duration}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted">{audio.date}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs text-muted-foreground">
            Todos os dados são exibidos de forma segura e privada.
          </p>
        </div>
      </footer>
    </main>
  );
}
