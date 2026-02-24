"use client";
import { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Loader2, Github, Sparkles, Terminal } from 'lucide-react';

// --- COMPONENTE MÁGICO: EFECTO MÁQUINA DE ESCRIBIR ---
const Typewriter = ({ text, delay = 15 }: { text: string, delay?: number }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text]);

  return (
    <span>
      {currentText}
      {currentIndex < text.length && <span className="animate-pulse text-blue-400">█</span>}
    </span>
  );
};
// ----------------------------------------------------

export default function Portfolio() {
  const [messages, setMessages] = useState([
    { role: 'ai', content: '¡Hola! Soy el asistente inteligente de Enrique. ¿Quieres saber sobre sus proyectos de ML, su formación en la Unizar o sus habilidades técnicas?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isLoading]); // Añadido isLoading para que baje al salir "Pensando..."

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
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
    <div className="min-h-screen bg-[#050B14] text-slate-200 font-sans selection:bg-blue-500/30 relative">
      
      {/* BACKGROUND MÁGICO (Orbes de luz flotantes) */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-600/20 blur-[150px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-600/20 blur-[150px] rounded-full mix-blend-screen" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 py-8 md:py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 z-10">
        
        {/* COLUMNA IZQUIERDA: PERFIL CON EFECTO CRISTAL */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="bg-white/5 backdrop-blur-2xl p-8 rounded-3xl border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.3)] relative overflow-hidden group">
            {/* Brillo sutil al pasar el ratón (Hover effect) */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="w-20 h-20 bg-gradient-to-tr from-blue-500 via-indigo-500 to-purple-500 rounded-2xl mb-6 flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.4)] relative">
              <div className="absolute inset-0 bg-white/20 rounded-2xl blur-sm" />
              <Terminal size={40} className="text-white relative z-10" />
            </div>
            
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-white via-blue-100 to-slate-400 bg-clip-text text-transparent tracking-tight">
              Enrique
            </h1>
            <p className="text-blue-400 font-semibold mb-4 text-sm uppercase tracking-widest mt-2">Ingeniero de IA</p>
            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              Estudiante de la Universidad de Zaragoza. Especializado en arquitecturas RAG, 
              sistemas inteligentes y optimización algorítmica.
            </p>
            
            <div className="space-y-3">
               <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Stack Principal</h3>
               <div className="flex flex-wrap gap-2">
                  {['Python', 'FastAPI', 'Next.js', 'Supabase', 'Gemini AI'].map(tech => (
                    <span key={tech} className="px-3 py-1.5 bg-white/5 border border-white/10 hover:border-blue-500/50 hover:bg-blue-500/10 transition-all rounded-lg text-xs font-medium backdrop-blur-md cursor-default">
                      {tech}
                    </span>
                  ))}
               </div>
            </div>

            <a href="https://github.com/enriqgrs" target="_blank" rel="noreferrer" className="mt-8 flex items-center justify-center gap-2 w-full py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all font-semibold text-sm group/btn shadow-lg">
              <Github size={18} className="group-hover/btn:scale-110 transition-transform" /> Ver GitHub
            </a>
          </div>
        </aside>

        {/* COLUMNA DERECHA: IA CHAT PORTFOLIO */}
        <main className="lg:col-span-8 flex flex-col h-[600px] bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          <div className="p-5 border-b border-white/10 bg-black/20 flex items-center justify-between backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="relative flex items-center justify-center w-4 h-4">
                <div className="absolute w-full h-full bg-emerald-500 rounded-full animate-ping opacity-75" />
                <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full z-10" />
              </div>
              <span className="font-bold text-xs uppercase tracking-widest text-slate-300">Conexión Segura • Gemini AI</span>
            </div>
            <Sparkles size={18} className="text-blue-400 animate-pulse" />
          </div>

          {/* CHAT MESSAGES */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-4 duration-500`}>
                <div className={`flex gap-4 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  
                  {/* AVATAR */}
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg border ${
                    msg.role === 'user' 
                      ? 'bg-gradient-to-br from-blue-500 to-indigo-600 border-blue-400/30 text-white' 
                      : 'bg-gradient-to-br from-slate-800 to-slate-900 border-white/10 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.2)]'
                  }`}>
                    {msg.role === 'user' ? <User size={18} /> : <Bot size={18} />}
                  </div>

                  {/* BURBUJA DE MENSAJE */}
                  <div className={`p-5 rounded-3xl text-[15px] leading-relaxed shadow-xl ${
                    msg.role === 'user' 
                    ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-tr-sm border border-blue-500/30' 
                    : 'bg-white/5 backdrop-blur-md border border-white/10 text-slate-200 rounded-tl-sm'
                  }`}>
                    {/* Si es IA y es el último mensaje (y no es el saludo inicial), aplica el efecto máquina de escribir */}
                    {msg.role === 'ai' && i === messages.length - 1 && i !== 0 ? (
                      <Typewriter text={msg.content} />
                    ) : (
                      msg.content
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {/* LOADING ANIMATION */}
            {isLoading && (
              <div className="flex justify-start items-center gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
                 <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                    <Bot size={18} className="text-blue-400 opacity-50" />
                 </div>
                 <div className="bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-3xl rounded-tl-sm flex gap-2 items-center">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                 </div>
              </div>
            )}
          </div>

          {/* INPUT AREA (Glassmorphism effect) */}
          <form onSubmit={handleSendMessage} className="p-4 bg-black/20 border-t border-white/10 flex gap-3 backdrop-blur-xl">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Hazme una pregunta sobre Enrique..."
              className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-slate-500 text-white shadow-inner"
            />
            <button
              disabled={isLoading || !input.trim()}
              className="bg-blue-600 hover:bg-blue-500 text-white px-6 rounded-2xl transition-all disabled:opacity-30 disabled:hover:scale-100 hover:scale-105 shadow-[0_0_20px_rgba(37,99,235,0.4)] flex items-center justify-center"
            >
              <Send size={20} className={isLoading ? 'animate-pulse' : ''} />
            </button>
          </form>
        </main>
      </div>
    </div>
  );
}
