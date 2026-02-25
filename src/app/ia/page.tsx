"use client";

import { useState, useRef, useEffect } from "react";
import {
    Send, User, Bot, Cpu, Database, Globe,
    Zap, Search, MessageSquare, BrainCircuit, Sparkles,
    ShieldCheck, Activity, ChevronRight,
} from "lucide-react";

/* ========== TYPEWRITER ========== */
function Typewriter({ text, delay = 12 }: { text: string; delay?: number }) {
    const [cur, setCur] = useState("");
    const [i, setI] = useState(0);
    useEffect(() => {
        if (i < text.length) {
            const t = setTimeout(() => { setCur(p => p + text[i]); setI(p => p + 1); }, delay);
            return () => clearTimeout(t);
        }
    }, [i, delay, text]);
    return <span>{cur}{i < text.length && <span className="animate-typewriter-blink" style={{ color: "#818CF8" }}>▌</span>}</span>;
}

/* ========== DATA ========== */
const pipelineAccents = ["#6366F1", "#8B5CF6", "#06B6D4", "#10B981", "#F59E0B"];

const pipeline = [
    { icon: <MessageSquare size={16} />, title: "Pregunta", text: "El usuario envía la pregunta en lenguaje natural.", tag: "POST /ask" },
    { icon: <Zap size={16} />, title: "Embedding", text: "Se genera un vector 768D con gemini-embedding-001.", tag: "768D" },
    { icon: <Search size={16} />, title: "Búsqueda", text: "Búsqueda semántica con pgvector (cosine ≥ 0.3).", tag: "cosine" },
    { icon: <Database size={16} />, title: "Contexto", text: "Top 5 fragmentos del CV se concatenan como contexto.", tag: "Top 5" },
    { icon: <BrainCircuit size={16} />, title: "LLM", text: "Gemini 2.5 Flash genera la respuesta con guardrails.", tag: "t: 0.2" },
];

const stack = [
    { icon: <Globe size={18} />, name: "FastAPI", desc: "Backend REST API", bg: "rgba(16,185,129,0.1)", color: "#10B981" },
    { icon: <Cpu size={18} />, name: "Google Gemini", desc: "Embeddings + LLM", bg: "rgba(99,102,241,0.1)", color: "#6366F1" },
    { icon: <Database size={18} />, name: "Supabase", desc: "PostgreSQL + pgvector", bg: "rgba(6,182,212,0.1)", color: "#06B6D4" },
    { icon: <Zap size={18} />, name: "Hugging Face", desc: "Hosting Docker", bg: "rgba(245,158,11,0.1)", color: "#F59E0B" },
];

const details = [
    { label: "Modelo Embeddings", value: "gemini-embedding-001 (768D)" },
    { label: "Modelo Generativo", value: "gemini-2.5-flash (temp: 0.2)" },
    { label: "Base de Datos", value: "Supabase + pgvector (cosine)" },
    { label: "Umbral Similitud", value: "0.3 (permisivo)" },
    { label: "Chunks Recuperados", value: "Top 5 por relevancia" },
    { label: "Guardrails", value: "System prompt + low temperature" },
];

/* ========== PAGE ========== */
export default function IAPage() {
    const [messages, setMessages] = useState([
        { role: "ai", content: "¡Hola! Soy el asistente de Enrique. Estoy potenciado por RAG y puedo responder con información real de su CV. ¿Qué quieres saber?" },
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }, [messages, loading]);

    const send = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || loading) return;
        const msg = input;
        setInput("");
        setMessages(prev => [...prev, { role: "user", content: msg }]);
        setLoading(true);
        try {
            const base = process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/\/$/, "");
            const res = await fetch(`${base}/ask`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: msg }),
            });
            if (!res.ok) throw new Error();
            const data = await res.json();
            setMessages(prev => [...prev, { role: "ai", content: data.answer }]);
        } catch {
            setMessages(prev => [...prev, { role: "ai", content: "⚠️ No pude conectar con el backend. Inténtalo más tarde." }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto px-6" style={{ display: "flex", flexDirection: "column", gap: 48 }}>

            {/* ===== HEADER ===== */}
            <div className="animate-fade-in-up" style={{ display: "flex", flexDirection: "column", gap: 16, paddingTop: 24 }}>
                <div className="badge"><BrainCircuit size={11} /> Retrieval-Augmented Generation</div>
                <h1 style={{ fontSize: "clamp(2rem,4vw,2.8rem)", fontWeight: 800, margin: 0, letterSpacing: "-0.02em", color: "var(--text-primary)" }}>
                    <span className="gradient-text">La IA</span> de mi Portfolio
                </h1>

                {/* Technical description — full width like main page */}
                <div style={{ color: "var(--text-tertiary)", lineHeight: 1.8, margin: 0, fontSize: 15, display: "flex", flexDirection: "column", gap: 12 }}>
                    <p style={{ margin: 0 }}>
                        Este chatbot implementa una arquitectura{" "}
                        <span style={{ color: "var(--indigo-500)", fontWeight: 700 }}>RAG</span>{" "}
                        <span style={{ color: "var(--text-secondary)", fontWeight: 500 }}>(Retrieval-Augmented Generation)</span>{" "}
                        diseñada para evitar alucinaciones del LLM. En lugar de confiar en el conocimiento paramétrico del modelo,
                        cada pregunta dispara una búsqueda semántica sobre fragmentos reales de mi CV almacenados como embeddings
                        en <span style={{ color: "var(--text-secondary)", fontWeight: 600 }}>Supabase (pgvector)</span>.
                    </p>
                    <p style={{ margin: 0 }}>
                        El pipeline funciona así: la pregunta del usuario se convierte en un vector de 768 dimensiones con{" "}
                        <span style={{ color: "var(--text-secondary)", fontWeight: 600 }}>gemini-embedding-001</span>, se buscan
                        los 5 fragmentos más similares por distancia coseno (umbral ≥ 0.3), y se inyectan como contexto en el prompt
                        de <span style={{ color: "var(--text-secondary)", fontWeight: 600 }}>Gemini 2.5 Flash</span> con temperatura 0.2
                        y system prompt restrictivo. El resultado: respuestas fundamentadas exclusivamente en datos verificables.
                    </p>
                    <p style={{ margin: 0, color: "var(--text-muted)", fontSize: 14 }}>
                        Backend en FastAPI, desplegado como contenedor Docker en Hugging Face Spaces.
                        El frontend (este) es una SPA en Next.js en Vercel que consume el endpoint <code style={{ fontFamily: "var(--font-mono)", fontSize: 12, padding: "2px 6px", borderRadius: 4, background: "var(--surface-alt)", color: "var(--indigo-500)" }}>POST /ask</code>.
                    </p>
                </div>

                {/* Feature badges */}
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", paddingTop: 4 }}>
                    {[
                        { icon: <Sparkles size={12} />, text: "Gemini AI", color: "#6366F1", bg: "rgba(99,102,241,0.1)" },
                        { icon: <Activity size={12} />, text: "Real-time", color: "#10B981", bg: "rgba(16,185,129,0.1)" },
                        { icon: <ShieldCheck size={12} />, text: "Sin alucinaciones", color: "#F59E0B", bg: "rgba(245,158,11,0.1)" },
                    ].map(b => (
                        <span key={b.text} style={{
                            display: "inline-flex", alignItems: "center", gap: 5,
                            padding: "5px 12px", borderRadius: 8, fontSize: 12, fontWeight: 600,
                            background: b.bg, color: b.color,
                        }}>
                            {b.icon} {b.text}
                        </span>
                    ))}
                </div>
            </div>

            {/* ===== ARCHITECTURE ===== */}
            <section className="animate-fade-in-up stagger-2" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <div className="section-label">
                    <div className="icon-circle"><Cpu size={18} /></div>
                    <h2>¿Cómo funciona?</h2>
                </div>

                {/* Pipeline steps */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(170px,1fr))", gap: 10 }}>
                    {pipeline.map((step, i) => (
                        <div key={step.title} className="card" style={{ padding: "18px 16px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                            <div style={{ position: "relative" }}>
                                <div className="icon-circle" style={{
                                    background: `${pipelineAccents[i]}14`, color: pipelineAccents[i],
                                }}>{step.icon}</div>
                                <span style={{
                                    position: "absolute", top: -5, right: -8,
                                    width: 18, height: 18, borderRadius: "50%",
                                    background: pipelineAccents[i], color: "#FFFFFF",
                                    fontSize: 10, fontWeight: 800,
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    boxShadow: `0 0 10px ${pipelineAccents[i]}40`,
                                }}>{i + 1}</span>
                            </div>
                            <h3 style={{ fontSize: 12, fontWeight: 700, color: "var(--text-primary)", margin: 0 }}>{step.title}</h3>
                            <p style={{ fontSize: 11, color: "var(--text-tertiary)", lineHeight: 1.5, margin: 0, flex: 1 }}>{step.text}</p>
                            <span style={{ fontSize: 10, fontFamily: "var(--font-mono)", padding: "2px 8px", borderRadius: 4, background: `${pipelineAccents[i]}14`, color: pipelineAccents[i], fontWeight: 600 }}>{step.tag}</span>
                        </div>
                    ))}
                </div>

                {/* Tech stack */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(210px,1fr))", gap: 10 }}>
                    {stack.map(t => (
                        <div key={t.name} className="card" style={{ padding: "14px 18px", display: "flex", alignItems: "center", gap: 12 }}>
                            <div className="icon-circle" style={{ background: t.bg, color: t.color }}>{t.icon}</div>
                            <div>
                                <p style={{ fontWeight: 700, color: "var(--text-primary)", margin: 0, fontSize: 13 }}>{t.name}</p>
                                <p style={{ fontSize: 11, color: "var(--text-muted)", margin: "1px 0 0" }}>{t.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Details */}
                <div className="card" style={{ padding: 22 }}>
                    <p style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.10em", color: "var(--text-muted)", margin: "0 0 14px" }}>Detalles de Implementación</p>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 14 }}>
                        {details.map(d => (
                            <div key={d.label}>
                                <p style={{ fontSize: 11, color: "var(--text-muted)", margin: 0, fontWeight: 500 }}>{d.label}</p>
                                <p style={{ fontSize: 12, fontWeight: 700, color: "var(--text-secondary)", margin: "3px 0 0", fontFamily: "var(--font-mono)" }}>{d.value}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== CHAT ===== */}
            <section className="animate-fade-in-up stagger-4" style={{ display: "flex", flexDirection: "column", gap: 16, paddingBottom: 24 }}>
                <div className="section-label">
                    <div className="icon-circle" style={{ background: "rgba(16,185,129,0.1)", color: "#10B981" }}><Sparkles size={18} /></div>
                    <h2>Prueba el Chat</h2>
                </div>

                {/* Chat container with animated glow border */}
                <div className="glow-border" style={{ display: "flex", flexDirection: "column", height: 500 }}>
                    <div style={{
                        display: "flex", flexDirection: "column", height: "100%",
                        background: "var(--surface)", borderRadius: 16, overflow: "hidden",
                        transition: "background 0.3s ease",
                    }}>
                        {/* Chat header */}
                        <div style={{
                            padding: "10px 20px", borderBottom: "1px solid var(--border)",
                            display: "flex", alignItems: "center", gap: 8,
                            background: "var(--surface-alt)",
                            transition: "background 0.3s ease, border-color 0.3s ease",
                        }}>
                            <span style={{ position: "relative", width: 8, height: 8, display: "inline-flex" }}>
                                <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#10B981", animation: "ping-custom 1.5s cubic-bezier(0,0,0.2,1) infinite", opacity: 0.5 }} />
                                <span style={{ position: "relative", width: 8, height: 8, borderRadius: "50%", background: "#10B981" }} />
                            </span>
                            <span style={{ fontSize: 11, fontWeight: 600, color: "var(--text-muted)", letterSpacing: "0.04em" }}>
                                RAG Pipeline · Gemini AI · <span style={{ color: "#10B981" }}>En línea</span>
                            </span>
                        </div>

                        {/* Messages */}
                        <div ref={scrollRef} style={{ flex: 1, overflowY: "auto", padding: "18px 18px 8px", display: "flex", flexDirection: "column", gap: 14 }}>
                            {messages.map((m, i) => (
                                <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
                                    <div style={{ display: "flex", gap: 8, maxWidth: "82%", flexDirection: m.role === "user" ? "row-reverse" : "row" }}>
                                        <div style={{
                                            width: 32, height: 32, borderRadius: 10, flexShrink: 0,
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            ...(m.role === "user"
                                                ? { background: "linear-gradient(135deg, #6366F1, #8B5CF6)", color: "#FFFFFF" }
                                                : { background: "var(--surface-alt)", color: "var(--text-tertiary)" }),
                                        }}>
                                            {m.role === "user" ? <User size={14} /> : <Bot size={14} />}
                                        </div>
                                        <div style={{
                                            padding: "10px 16px", fontSize: 13.5, lineHeight: 1.7,
                                            ...(m.role === "user"
                                                ? { background: "linear-gradient(135deg, #6366F1, #4F46E5)", color: "#FFFFFF", borderRadius: "14px 4px 14px 14px", boxShadow: "0 4px 12px rgba(99,102,241,0.25)" }
                                                : { background: "var(--chat-bubble-ai)", color: "var(--chat-bubble-ai-text)", borderRadius: "4px 14px 14px 14px" }),
                                        }}>
                                            {m.role === "ai" && i === messages.length - 1 && i > 0
                                                ? <Typewriter text={m.content} />
                                                : m.content}
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {loading && (
                                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                                    <div style={{ width: 32, height: 32, borderRadius: 10, background: "var(--surface-alt)", color: "var(--text-tertiary)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        <Bot size={14} />
                                    </div>
                                    <div style={{ background: "var(--chat-bubble-ai)", borderRadius: "4px 14px 14px 14px", padding: "12px 18px", display: "flex", gap: 5 }}>
                                        {[0, 140, 280].map(d => (
                                            <div key={d} style={{
                                                width: 6, height: 6, borderRadius: "50%", background: "var(--text-muted)",
                                                animation: `bounce-dot 1.4s ${d}ms ease-in-out infinite`,
                                            }} />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input */}
                        <form onSubmit={send} style={{
                            padding: "12px 14px", borderTop: "1px solid var(--border)",
                            display: "flex", gap: 8, background: "var(--surface-alt)",
                            transition: "background 0.3s ease, border-color 0.3s ease",
                        }}>
                            <input
                                type="text"
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                placeholder="Pregúntame sobre Enrique..."
                                style={{
                                    flex: 1, padding: "10px 16px", borderRadius: 10, fontSize: 14,
                                    border: "1px solid var(--border)", background: "var(--input-bg)", color: "var(--text-primary)",
                                    outline: "none", transition: "border-color 0.15s, box-shadow 0.15s",
                                }}
                                onFocus={e => { e.target.style.borderColor = "#6366F1"; e.target.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.1)"; }}
                                onBlur={e => { e.target.style.borderColor = "var(--border)"; e.target.style.boxShadow = "none"; }}
                            />
                            <button type="submit" disabled={loading || !input.trim()} style={{
                                width: 42, height: 42, borderRadius: 10, border: "none",
                                background: input.trim() && !loading ? "linear-gradient(135deg, #6366F1, #4F46E5)" : "var(--surface-alt)",
                                color: input.trim() && !loading ? "#FFFFFF" : "var(--text-muted)",
                                cursor: input.trim() && !loading ? "pointer" : "default",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                transition: "all 0.15s", flexShrink: 0,
                                boxShadow: input.trim() && !loading ? "0 4px 12px rgba(99,102,241,0.3)" : "none",
                            }}>
                                <Send size={16} />
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}
