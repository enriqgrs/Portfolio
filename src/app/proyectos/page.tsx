"use client";

import { useState } from "react";
import { Github, ExternalLink, Filter, FolderGit2 } from "lucide-react";

const proyectos = [
    { title: "Greedy Heuristic Search CPP", desc: "Motor de optimización en C++ con búsqueda voraz, Min-Heaps y multithreading.", detail: "Minimiza el MSE en espacios masivos con complejidad O(N log S) y paralelización con std::thread.", tags: ["C++", "Multithreading", "Optimization"], url: "https://github.com/enriqgrs/Greedy-Heuristic-Search-CPP" },
    { title: "Search Intelligence Java", desc: "Suite de motores de búsqueda IA: A*, Poda Alfa-Beta y Hill Climbing.", detail: "Agentes inteligentes con A*, BFS, DFS y Poda Alfa-Beta para entornos competitivos.", tags: ["Java", "AI", "Algorithms"], url: "https://github.com/enriqgrs/Search-Intelligence-Java" },
    { title: "Probabilistic Inference Pacman", desc: "Agente con Redes Bayesianas e inferencia probabilística exacta.", detail: "Razonamiento bajo incertidumbre con eliminación de variables para seguimiento de objetivos.", tags: ["Python", "Bayesian Networks", "Inference"], url: "https://github.com/enriqgrs/Probabilistic-Inference-Pacman" },
    { title: "Naive Bayes Spam Classifier", desc: "Clasificador Bayesiano Multinomial para detección de SPAM (99.61% precisión).", detail: "Suavizado de Laplace y análisis de envenenamiento bayesiano.", tags: ["Python", "Machine Learning", "NLP"], url: "https://github.com/enriqgrs/Naive-Bayes-Spam-Classifier" },
    { title: "Car Price Prediction MLP", desc: "Perceptrón Multicapa regularizado para tasación de vehículos (88.6% R²).", detail: "MLPRegressor optimizado con análisis de compromiso Sesgo-Varianza.", tags: ["Python", "Neural Networks", "Regression"], url: "https://github.com/enriqgrs/Car-Price-Prediction-MLP" },
    { title: "CNN Image Classification", desc: "Arquitecturas de Deep Learning para visión artificial.", detail: "CNNs con TensorFlow/Keras, Dropout y Batch Normalization.", tags: ["Python", "Deep Learning", "Computer Vision"], url: "https://github.com/enriqgrs/Deep-Learning-Image-Classification" },
    { title: "ML Regression Analysis", desc: "Modelado predictivo con regularización Lasso (L1) y Ridge (L2).", detail: "Análisis de regresión para prevenir sobreajuste en aprendizaje supervisado.", tags: ["Python", "Machine Learning", "Data Science"], url: "https://github.com/enriqgrs/Machine-Learning-Regression-Analysis" },
];

const allTags = Array.from(new Set(proyectos.flatMap(p => p.tags)));

const tagColors: Record<string, { bg: string; color: string }> = {
    "C++": { bg: "rgba(99,102,241,0.1)", color: "#6366F1" },
    "Java": { bg: "rgba(245,158,11,0.1)", color: "#F59E0B" },
    "Python": { bg: "rgba(16,185,129,0.1)", color: "#10B981" },
    "AI": { bg: "rgba(139,92,246,0.1)", color: "#8B5CF6" },
    "Algorithms": { bg: "rgba(99,102,241,0.1)", color: "#6366F1" },
    "Machine Learning": { bg: "rgba(16,185,129,0.1)", color: "#10B981" },
    "Deep Learning": { bg: "rgba(244,63,94,0.1)", color: "#F43F5E" },
    "NLP": { bg: "rgba(245,158,11,0.1)", color: "#F59E0B" },
    "Neural Networks": { bg: "rgba(244,63,94,0.1)", color: "#F43F5E" },
    "Computer Vision": { bg: "rgba(16,185,129,0.1)", color: "#10B981" },
    "Data Science": { bg: "rgba(139,92,246,0.1)", color: "#8B5CF6" },
    "Optimization": { bg: "rgba(99,102,241,0.1)", color: "#6366F1" },
    "Multithreading": { bg: "rgba(99,102,241,0.1)", color: "#6366F1" },
    "Bayesian Networks": { bg: "rgba(139,92,246,0.1)", color: "#8B5CF6" },
    "Inference": { bg: "rgba(139,92,246,0.1)", color: "#8B5CF6" },
    "Regression": { bg: "rgba(244,63,94,0.1)", color: "#F43F5E" },
};

export default function Proyectos() {
    const [filter, setFilter] = useState<string | null>(null);
    const list = filter ? proyectos.filter(p => p.tags.includes(filter)) : proyectos;

    return (
        <div className="max-w-5xl mx-auto px-6" style={{ display: "flex", flexDirection: "column", gap: 32 }}>

            {/* Header */}
            <div className="animate-fade-in-up" style={{ display: "flex", flexDirection: "column", gap: 12, paddingTop: 24 }}>
                <div className="badge"><FolderGit2 size={11} /> Repositorios GitHub</div>
                <h1 style={{ fontSize: "clamp(2rem,4vw,2.8rem)", fontWeight: 800, margin: 0, letterSpacing: "-0.02em", color: "var(--text-primary)" }}>
                    Mis <span className="gradient-text">Proyectos</span>
                </h1>
                <p style={{ color: "var(--text-tertiary)", maxWidth: 520, lineHeight: 1.7, margin: 0, fontSize: 15 }}>
                    Proyectos de IA, Machine Learning, optimización algorítmica y desarrollo de sistemas inteligentes.
                </p>
            </div>

            {/* Filters */}
            <div className="animate-fade-in-up stagger-2" style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                <FilterBtn active={filter === null} onClick={() => setFilter(null)}>
                    <Filter size={11} /> Todos
                </FilterBtn>
                {allTags.map(tag => (
                    <FilterBtn key={tag} active={filter === tag} onClick={() => setFilter(filter === tag ? null : tag)}>
                        {tag}
                    </FilterBtn>
                ))}
            </div>

            {/* Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(310px,1fr))", gap: 14 }}>
                {list.map((p, i) => (
                    <div key={p.title} className="card animate-fade-in-up" style={{ padding: 0, overflow: "hidden", display: "flex", flexDirection: "column", animationDelay: `${i * 0.05}s` }}>
                        {/* Top accent */}
                        <div style={{ height: 3, background: "linear-gradient(90deg, #4F46E5, #8B5CF6, #4F46E5)" }} />

                        <div style={{ padding: "20px 22px 22px", display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
                            <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)", margin: 0, lineHeight: 1.3 }}>{p.title}</h3>
                            <p style={{ fontSize: 13, fontWeight: 500, color: "var(--indigo-500)", margin: 0, lineHeight: 1.5 }}>{p.desc}</p>
                            <p style={{ fontSize: 12.5, color: "var(--text-tertiary)", lineHeight: 1.7, margin: 0, flex: 1 }}>{p.detail}</p>

                            {/* Tags */}
                            <div style={{ display: "flex", flexWrap: "wrap", gap: 5, paddingTop: 4 }}>
                                {p.tags.map(tag => {
                                    const c = tagColors[tag] ?? { bg: "rgba(99,102,241,0.06)", color: "var(--text-secondary)" };
                                    return (
                                        <span key={tag} className="tag" style={{ background: c.bg, color: c.color }}>{tag}</span>
                                    );
                                })}
                            </div>

                            {/* Link */}
                            <a href={p.url} target="_blank" rel="noopener noreferrer"
                                style={{
                                    marginTop: 6, display: "flex", alignItems: "center", gap: 6, justifyContent: "center",
                                    padding: "8px 0", borderRadius: 8,
                                    background: "var(--surface-alt)", border: "1px solid var(--border)",
                                    color: "var(--text-secondary)", fontSize: 12.5, fontWeight: 600,
                                    textDecoration: "none", transition: "all 0.15s",
                                }}>
                                <Github size={13} /> Código fuente <ExternalLink size={10} style={{ color: "var(--text-muted)" }} />
                            </a>
                        </div>
                    </div>
                ))}
            </div>

            {/* CTA */}
            <div className="animate-fade-in-up stagger-6" style={{ paddingTop: 8 }}>
                <a href="https://github.com/enriqgrs?tab=repositories" target="_blank" rel="noopener noreferrer"
                    style={{
                        display: "inline-flex", alignItems: "center", gap: 8,
                        padding: "10px 20px", borderRadius: 8,
                        background: "#4F46E5", color: "#FFFFFF", fontSize: 13, fontWeight: 600,
                        textDecoration: "none", boxShadow: "0 1px 3px rgba(79,70,229,0.30)",
                        transition: "all 0.15s",
                    }}>
                    <Github size={15} /> Todos los repositorios <ExternalLink size={12} />
                </a>
            </div>
        </div>
    );
}

function FilterBtn({ active, onClick, children }: {
    active: boolean; onClick: () => void; children: React.ReactNode;
}) {
    return (
        <button onClick={onClick} style={{
            padding: "6px 14px", borderRadius: 7, fontSize: 12, fontWeight: 600,
            cursor: "pointer", border: "1px solid", display: "inline-flex", alignItems: "center", gap: 4,
            transition: "all 0.15s",
            ...(active
                ? { background: "#4F46E5", borderColor: "#4F46E5", color: "#FFFFFF", boxShadow: "0 1px 3px rgba(79,70,229,0.25)" }
                : { background: "var(--surface)", borderColor: "var(--border)", color: "var(--text-tertiary)" }),
        }}>
            {children}
        </button>
    );
}
