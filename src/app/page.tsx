"use client";

import Image from "next/image";
import {
  GraduationCap, Code2, Brain, Languages, Briefcase,
  Cpu, Database, Terminal, Users, MessageCircle,
  Lightbulb, Shield, Rocket, HeartHandshake, MapPin,
  Github, Linkedin, ExternalLink,
} from "lucide-react";

export default function SobreMi() {
  return (
    <div className="max-w-5xl mx-auto px-6" style={{ display: "flex", flexDirection: "column", gap: 64 }}>

      {/* ===== HERO ===== */}
      <section className="animate-fade-in" style={{ paddingTop: 24 }}>
        <style>{`@media(min-width:768px){#hero-grid{grid-template-columns:1fr auto !important;}}`}</style>
        <div id="hero-grid" style={{ display: "grid", gap: 40, alignItems: "center" }}>

          {/* Text column */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div className="badge animate-fade-in-up stagger-1">
              <MapPin size={11} /> Zaragoza, España
            </div>

            <h1 className="animate-fade-in-up stagger-2" style={{ fontSize: "clamp(2.2rem,4.5vw,3.2rem)", fontWeight: 800, lineHeight: 1.1, margin: 0, letterSpacing: "-0.025em", color: "var(--text-primary)" }}>
              Enrique{" "}
              <span className="gradient-text">Guarás Lacasta</span>
            </h1>

            <div className="accent-line animate-fade-in-up stagger-3" />

            <p className="animate-fade-in-up stagger-3" style={{ fontSize: 16, fontWeight: 600, color: "#4F46E5", margin: 0 }}>
              Ingeniero de IA &amp; Machine Learning
            </p>

            <p className="animate-fade-in-up stagger-4" style={{ color: "var(--text-tertiary)", lineHeight: 1.75, maxWidth: 520, margin: 0, fontSize: 15 }}>
              Estudiante de 3º de Ingeniería Informática (Computación) en la{" "}
              <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>Universidad de Zaragoza</span>.
              Especializado en el diseño de algoritmos eficientes y sistemas inteligentes con
              Deep Learning, modelos probabilísticos y programación concurrente.
            </p>

            <div className="animate-fade-in-up stagger-5" style={{ display: "flex", gap: 10, flexWrap: "wrap", paddingTop: 4 }}>
              <a href="https://github.com/enriqgrs" target="_blank" rel="noopener noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 7,
                  padding: "9px 18px", borderRadius: 8,
                  background: "var(--surface)", border: "1px solid var(--border)",
                  color: "var(--text-secondary)", fontSize: 13, fontWeight: 600,
                  textDecoration: "none", boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                  transition: "all 0.15s",
                }}>
                <Github size={15} /> GitHub
              </a>
              <a href="https://www.linkedin.com/in/enrique-josé-guarás/" target="_blank" rel="noopener noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 7,
                  padding: "9px 18px", borderRadius: 8,
                  background: "#4F46E5", border: "1px solid #4F46E5",
                  color: "#FFFFFF", fontSize: 13, fontWeight: 600,
                  textDecoration: "none", boxShadow: "0 1px 3px rgba(79,70,229,0.30)",
                  transition: "all 0.15s",
                }}>
                <Linkedin size={15} /> LinkedIn
              </a>
            </div>
          </div>

          {/* Photo */}
          <div className="animate-fade-in-up stagger-4" style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ position: "relative" }}>
              {/* Gradient ring frame */}
              <div style={{
                padding: 3, borderRadius: 22,
                background: "linear-gradient(135deg, #6366F1, #8B5CF6, #06B6D4)",
                boxShadow: "0 20px 40px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.04)",
              }}>
                <div style={{
                  width: 240, height: 240, borderRadius: 20, overflow: "hidden",
                  border: "3px solid var(--surface)",
                }}>
                  <Image src="/foto.jpg" alt="Enrique Guarás Lacasta" fill className="object-cover object-center" priority />
                </div>
              </div>
              <div style={{
                position: "absolute", bottom: -10, right: -10,
                background: "var(--surface)", borderRadius: 8, padding: "5px 12px",
                border: "1px solid var(--border)", fontSize: 11, fontWeight: 700,
                color: "#10B981", boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: 5,
              }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#10B981", flexShrink: 0 }} />
                Activo
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== EDUCACIÓN ===== */}
      <Section title="Educación" icon={<GraduationCap size={18} />}>
        <Grid>
          <TimelineCard
            period="2022 – Actualidad"
            title="Ingeniería Informática — Computación"
            subtitle="Universidad de Zaragoza"
            text="Diseño de algoritmos avanzados, inteligencia artificial, robótica, visión por computador y aprendizaje automático."
            color="#4F46E5"
          />
          <TimelineCard
            period="2020 – 2022"
            title="Bachillerato Científico-Tecnológico"
            subtitle="Colegio Sagrado Corazón La Mina"
            text="Formación sólida en matemáticas, física y tecnología como base para la ingeniería."
            color="#A3AEBF"
          />
        </Grid>
      </Section>

      {/* ===== EXPERIENCIA ===== */}
      <Section title="Experiencia" icon={<Briefcase size={18} />}>
        <div className="card" style={{ padding: 24, display: "flex", gap: 16, alignItems: "flex-start" }}>
          <div className="icon-circle" style={{ width: 44, height: 44, background: "rgba(16,185,129,0.1)", color: "#10B981" }}>
            <GraduationCap size={22} />
          </div>
          <div>
            <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--indigo-500)" }}>2025</span>
            <h3 style={{ fontSize: 16, fontWeight: 700, margin: "4px 0 6px", color: "var(--text-primary)" }}>Profesor Particular — EVAU</h3>
            <p style={{ color: "var(--text-tertiary)", fontSize: 14, lineHeight: 1.7, margin: 0 }}>
              Preparación de alumnos para las pruebas de acceso a la universidad.
              Comunicación técnica adaptativa y mentoring personalizado.
            </p>
          </div>
        </div>
      </Section>

      {/* ===== HARD SKILLS ===== */}
      <Section title="Hard Skills" icon={<Code2 size={18} />}>
        <Grid>
          <SkillCard icon={<Terminal size={18} />} title="Lenguajes" color="rgba(99,102,241,0.1)" iconColor="#6366F1"
            skills={["C++ · Avanzado", "Python · Avanzado", "Java · Intermedio", "JavaScript · Intermedio", "C", "Haskell", "Ada", "Ensamblador"]} />
          <SkillCard icon={<Brain size={18} />} title="IA & Data Science" color="rgba(139,92,246,0.1)" iconColor="#8B5CF6"
            skills={["Deep Learning (CNN)", "Inferencia Probabilística", "Regresión Robusta", "Naive Bayes", "TensorFlow / Keras", "NumPy"]} />
          <SkillCard icon={<Database size={18} />} title="Bases de Datos" color="rgba(16,185,129,0.1)" iconColor="#10B981"
            skills={["SQL", "PostgreSQL", "Supabase (pgvector)"]} />
          <SkillCard icon={<Cpu size={18} />} title="Herramientas" color="rgba(245,158,11,0.1)" iconColor="#F59E0B"
            skills={["Docker", "Git / GitHub", "Linux", "Sistemas Empotrados", "HTML / CSS"]} />
        </Grid>
      </Section>

      {/* ===== ALGORITMIA ===== */}
      <Section title="Algoritmia" icon={<Cpu size={18} />}>
        <div className="card" style={{ padding: 24 }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {["Optimización de búsqueda", "Heurísticas", "Poda Alfa-Beta", "Estructuras eficientes",
              "Complejidad asintótica", "Greedy Search", "A*", "BFS / DFS", "Min-Heaps", "Multithreading"].map(s => (
                <span key={s} className="pill">{s}</span>
              ))}
          </div>
        </div>
      </Section>

      {/* ===== SOFT SKILLS ===== */}
      <Section title="Soft Skills" icon={<Users size={18} />}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: 10 }}>
          {[
            { icon: <Users size={16} />, label: "Trabajo en equipo" },
            { icon: <MessageCircle size={16} />, label: "Comunicación técnica" },
            { icon: <Lightbulb size={16} />, label: "Pensamiento analítico" },
            { icon: <Shield size={16} />, label: "Responsabilidad" },
            { icon: <Rocket size={16} />, label: "Proactividad" },
            { icon: <HeartHandshake size={16} />, label: "Resiliencia" },
          ].map(item => (
            <div key={item.label} className="card" style={{ padding: "14px 18px", display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ color: "var(--indigo-500)" }}>{item.icon}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-secondary)" }}>{item.label}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* ===== IDIOMAS ===== */}
      <Section title="Idiomas" icon={<Languages size={18} />}>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {[
            { flag: "🇪🇸", lang: "Español", level: "Nativo" },
            { flag: "🇬🇧", lang: "Inglés", level: "B2" },
          ].map(l => (
            <div key={l.lang} className="card" style={{ padding: "16px 24px", display: "flex", alignItems: "center", gap: 14, minWidth: 180 }}>
              <span style={{ fontSize: 28 }}>{l.flag}</span>
              <div>
                <p style={{ fontWeight: 700, color: "var(--text-primary)", margin: 0, fontSize: 14 }}>{l.lang}</p>
                <p style={{ fontSize: 12, color: "var(--text-muted)", margin: "2px 0 0" }}>{l.level}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

    </div>
  );
}

/* ===== Sub-components ===== */
function Section({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="animate-fade-in-up" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div className="section-label">
        <div className="icon-circle">{icon}</div>
        <h2>{title}</h2>
      </div>
      {children}
    </section>
  );
}

function Grid({ children }: { children: React.ReactNode }) {
  return <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 12 }}>{children}</div>;
}

function TimelineCard({ period, title, subtitle, text, color }: {
  period: string; title: string; subtitle: string; text: string; color: string;
}) {
  return (
    <div className="card" style={{ padding: 24, borderLeft: `3px solid ${color}` }}>
      <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--indigo-500)" }}>{period}</span>
      <h3 style={{ fontSize: 15, fontWeight: 700, margin: "6px 0 3px", color: "var(--text-primary)" }}>{title}</h3>
      <p style={{ fontSize: 13, fontWeight: 500, color: "var(--text-muted)", margin: "0 0 8px" }}>{subtitle}</p>
      <p style={{ fontSize: 13, color: "var(--text-tertiary)", lineHeight: 1.7, margin: 0 }}>{text}</p>
    </div>
  );
}

function SkillCard({ icon, title, skills, color, iconColor }: {
  icon: React.ReactNode; title: string; skills: string[]; color: string; iconColor: string;
}) {
  return (
    <div className="card" style={{ padding: 20, display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div className="icon-circle" style={{ background: color, color: iconColor }}>{icon}</div>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)", margin: 0 }}>{title}</h3>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {skills.map(s => <span key={s} className="pill">{s}</span>)}
      </div>
    </div>
  );
}
