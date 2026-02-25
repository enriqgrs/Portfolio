import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Link from "next/link";
import { NavLink } from "./components/NavLink";
import { ThemeProvider } from "./components/ThemeProvider";
import { ThemeToggle } from "./components/ThemeToggle";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const jetbrainsMono = JetBrains_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Enrique Guarás | Ingeniero IA & ML",
  description: "Portfolio profesional — Ingeniero de IA, Machine Learning y Deep Learning.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t){document.documentElement.setAttribute('data-theme',t)}else if(window.matchMedia('(prefers-color-scheme:dark)').matches){document.documentElement.setAttribute('data-theme','dark')}}catch(e){}})()`,
          }}
        />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}>
        <ThemeProvider>

          {/* ===== NAVBAR ===== */}
          <nav
            className="fixed top-0 left-0 right-0 z-50 animate-fade-in-down"
            style={{
              background: "var(--nav-bg)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              borderBottom: "1px solid var(--border)",
              transition: "background 0.3s ease, border-color 0.3s ease",
            }}
          >
            <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
              <Link
                href="/"
                style={{ color: "var(--text-primary)", fontSize: 16, fontWeight: 800, letterSpacing: "0.02em", textDecoration: "none" }}
              >
                EGL<span style={{ color: "#4F46E5" }}>.</span>
              </Link>
              <div className="flex items-center gap-1">
                <NavLink href="/">Sobre mí</NavLink>
                <NavLink href="/proyectos">Proyectos</NavLink>
                <NavLink href="/ia" isSpecial>
                  <span className="relative flex h-2 w-2 flex-shrink-0">
                    <span className="absolute inline-flex h-full w-full rounded-full opacity-60" style={{ background: "#10B981", animation: "ping-custom 1.2s cubic-bezier(0,0,0.2,1) infinite" }} />
                    <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: "#10B981" }} />
                  </span>
                  La IA
                </NavLink>
                <div style={{ width: 1, height: 20, background: "var(--border)", margin: "0 4px" }} />
                <ThemeToggle />
              </div>
            </div>
          </nav>

          <main className="pt-20 pb-16" style={{ minHeight: "100vh" }}>{children}</main>

          {/* ===== FOOTER ===== */}
          <footer style={{ borderTop: "1px solid var(--border)", background: "var(--footer-bg)", transition: "background 0.3s ease, border-color 0.3s ease" }} className="py-8">
            <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ fontSize: 13, color: "var(--text-muted)" }}>
              <p style={{ margin: 0 }}>© 2025 Enrique Guarás Lacasta</p>
              <div className="flex gap-5">
                {[
                  { label: "GitHub", href: "https://github.com/enriqgrs" },
                  { label: "LinkedIn", href: "https://www.linkedin.com/in/enrique-guar%C3%A1s-lacasta-0abb63332/" },
                ].map(l => (
                  <Link key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className="footer-link">{l.label}</Link>
                ))}
              </div>
            </div>
          </footer>

        </ThemeProvider>
      </body>
    </html>
  );
}
