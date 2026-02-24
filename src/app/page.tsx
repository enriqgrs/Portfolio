"use client";
import { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Loader2, Github, Code2, Sparkles, Terminal } from 'lucide-react';

export default function Portfolio() {
  const [messages, setMessages] = useState([
    { role: 'ai', content: '¡Hola! Soy el asistente inteligente de Enrique. ¿Quieres saber sobre sus proyectos de ML, su formación en la Unizar o sus habilidades técnicas?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      // Usamos la variable de entorno que configuraremos en Vercel
      const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/\/$/, '');
      const response = await fetch(`${baseUrl}/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) throw new Error('Error en el servidor');
      const data = await response.json();
      setMessages(prev => [...prev, { role: 'ai', content: data.answer }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', content: '⚠️ Mi conexión con el servidor ha fallado. Enrique está migrando el backend a la nube. ¡Vuelve pronto!' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans selection:bg-blue-500/30">
      {/* BACKGROUND DECORATION */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-900/20 blur-[120px] rounded-full" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-indigo-900/20 blur-[120px] rounded-full" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 py-8 md:py-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* COLUMNA IZQUIERDA: PERFIL */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="bg-slate-800/50 backdrop-blur-xl p-8 rounded-3xl border border-slate-700/50 shadow-2xl">
            <div className="w-20 h-20 bg-gradient-to-tr from-blue-500 to-indigo-600 rounded-2xl mb-6 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Terminal size={40} className="text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              Enrique
            </h1>
            <p className="text-blue-400 font-medium mb-4">Ingeniería de IA & Sistemas</p>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Estudiante de la Universidad de Zaragoza. Especializado en arquitecturas RAG, 
              sistemas inteligentes y optimización algorítmica.
            </p>
            
            <div className="space-y-3">
               <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Stack Principal</h3>
               <div className="flex flex-wrap gap-2">
                  {['Python', 'FastAPI', 'Next.js', 'Supabase', 'Gemini API'].map(tech => (
                    <span key={tech} className="px-3 py-1 bg-slate-900/50 border border-slate-700 rounded-lg text-xs font-medium">{tech}</span>
                  ))}
               </div>
            </div>

            <a href="https://github.com/enriqgrs" target="_blank" className="mt-8 flex items-center justify-center gap-2 w-full py-3 bg-slate-700 hover:bg-slate-600 rounded-xl transition-all font-semibold text-sm">
              <Github size={18} /> Ver GitHub
            </a>
          </div>
        </aside>

        {/* COLUMNA DERECHA: IA CHAT PORTFOLIO */}
        <main className="lg:col-span-8 flex flex-col h-[700px] bg-slate-800/30 backdrop-blur-xl rounded-3xl border border-slate-700/50 overflow-hidden shadow-2xl">
          <div className="p-5 border-b border-slate-700/50 bg-slate-800/40 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <div className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full blur-sm" />
              </div>
              <span className="font-bold text-sm tracking-wide">ASISTENTE IA</span>
            </div>
            <Sparkles size={18} className="text-blue-400" />
          </div>

          {/* CHAT MESSAGES */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-slate-700">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex gap-4 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg ${
                    msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-slate-700 text-blue-400'
                  }`}>
                    {msg.role === 'user' ? <User size={18} /> : <Bot size={18} />}
                  </div>
                  <div className={`p-4 rounded-2xl text-[15px] leading-relaxed shadow-sm ${
                    msg.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-none' 
                    : 'bg-slate-800 text-slate-300 border border-slate-700 rounded-tl-none'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start items-center gap-3 text-slate-500 italic text-sm animate-pulse">
                <Loader2 size={16} className="animate-spin text-blue-500" />
                Pensando respuesta...
              </div>
            )}
          </div>

          {/* INPUT AREA */}
          <form onSubmit={handleSendMessage} className="p-4 bg-slate-800/50 border-t border-slate-700/50 flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Pregunta sobre mis proyectos..."
              className="flex-1 bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-slate-600"
            />
            <button
              disabled={isLoading || !input.trim()}
              className="bg-blue-600 hover:bg-blue-500 text-white p-3 rounded-xl transition-all disabled:opacity-30 shadow-lg shadow-blue-600/20 active:scale-95"
            >
              <Send size={20} />
            </button>
          </form>
        </main>
      </div>
    </div>
  );
}
