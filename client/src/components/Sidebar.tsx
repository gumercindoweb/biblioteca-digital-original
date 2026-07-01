// ============================================================
// SIDEBAR — Gumercindo Jiménez Brand System
// Superficie inversa verde esmeralda · acento brass gold
// ============================================================

import { useState } from "react";
import { categories, ResourceType } from "@/lib/data";
import { useAuth } from "@/contexts/AuthContext";
import { BookOpen, Headphones, Monitor, Youtube, Library, Search, X, Plus, Volume2, Film, GraduationCap, Lock, LogOut } from "lucide-react";

const typeIcons: Record<ResourceType, React.ReactNode> = {
  libro:      <BookOpen size={14} />,
  podcast:    <Headphones size={14} />,
  audiolibro: <Volume2 size={14} />,
  documental: <Film size={14} />,
  plataforma: <Monitor size={14} />,
  youtube:    <Youtube size={14} />,
  curso:      <GraduationCap size={14} />,
};

interface SidebarProps {
  selectedCategory: string;
  selectedType: ResourceType | "todos";
  searchQuery: string;
  onCategoryChange: (cat: string) => void;
  onTypeChange: (type: ResourceType | "todos") => void;
  onSearchChange: (q: string) => void;
  totalCount: number;
  onAddResource?: () => void;
  onLoginClick?: () => void;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

export default function Sidebar({
  selectedCategory,
  selectedType,
  searchQuery,
  onCategoryChange,
  onTypeChange,
  onSearchChange,
  totalCount,
  onAddResource,
  onLoginClick,
  mobileOpen = false,
  onMobileClose,
}: SidebarProps) {
  const [searchFocused, setSearchFocused] = useState(false);
  const { isAdmin, signOut } = useAuth();

  const handleNavClick = (fn: () => void) => {
    fn();
    onMobileClose?.();
  };

  const allTypes: Array<{ id: ResourceType | "todos"; label: string }> = [
    { id: "todos",       label: "Todos los tipos" },
    { id: "libro",       label: "Libros" },
    { id: "podcast",     label: "Podcasts" },
    { id: "audiolibro",  label: "Audiolibros" },
    { id: "documental",  label: "Documentales" },
    { id: "plataforma",  label: "Plataformas" },
    { id: "youtube",     label: "YouTube" },
    { id: "curso",       label: "Cursos" },
  ];

  /* ---- tokens ---- */
  const BG       = "#0E3B2E"; /* green-800  */
  const BG_DEEP  = "#0A2E25"; /* green-900  */
  const IVORY    = "#F8F5EE"; /* bone-50    */
  const MUTED    = "rgba(248,245,238,0.50)";
  const GOLD     = "#B89455"; /* gold-500   */
  const BORDER   = "rgba(248,245,238,0.12)";
  const FONT_UI  = "'Hanken Grotesk', system-ui, sans-serif";
  const FONT_SER = "'Cormorant Garamond', 'Times New Roman', serif";

  return (
    <>
      {/* Backdrop mobile */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          style={{ background: "rgba(10,46,37,0.55)", backdropFilter: "blur(2px)" }}
          onClick={onMobileClose}
        />
      )}

    <aside
      className={`w-[228px] min-w-[228px] h-screen flex flex-col overflow-y-auto
        md:sticky md:top-0
        max-md:fixed max-md:inset-y-0 max-md:left-0 max-md:z-50 max-md:transition-transform max-md:duration-300
        ${mobileOpen ? "max-md:translate-x-0" : "max-md:-translate-x-full"}`}
      style={{ background: BG, borderRight: `1px solid ${BORDER}` }}
    >
      {/* ── Logo / Identidad ── */}
      <div className="px-5 pt-7 pb-5">
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <img
              src="/brand/logo/gj-symbol-ivory.png"
              alt="GJ"
              style={{ height: 36, width: "auto", objectFit: "contain" }}
            />
            <div>
              <p style={{
                fontFamily: FONT_UI,
                fontSize: "0.58rem",
                fontWeight: 600,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: GOLD,
                lineHeight: 1,
                marginBottom: "3px",
              }}>
                Mi
              </p>
              <h1 style={{
                fontFamily: FONT_SER,
                fontSize: "1.15rem",
                fontWeight: 600,
                color: IVORY,
                lineHeight: 1,
                letterSpacing: "-0.01em",
              }}>
                Biblioteca
              </h1>
            </div>
          </div>
          {/* Botón cerrar — solo mobile */}
          <button
            className="md:hidden flex items-center justify-center rounded"
            style={{ color: "rgba(248,245,238,0.5)", padding: 4 }}
            onClick={onMobileClose}
          >
            <X size={18} />
          </button>
        </div>
        {/* Regla gold */}
        <div style={{ height: "1.5px", background: GOLD, opacity: 0.35 }} />
      </div>

      {/* ── Buscador ── */}
      <div className="px-4 pb-4">
        <div
          className="flex items-center gap-2 px-3 py-2 rounded"
          style={{
            background: BG_DEEP,
            border: `1px solid ${searchFocused ? `rgba(184,148,85,0.55)` : BORDER}`,
            transition: "border-color 200ms ease",
          }}
        >
          <Search size={12} style={{ color: MUTED }} />
          <input
            type="text"
            placeholder="Buscar..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            className="flex-1 bg-transparent outline-none"
            style={{ fontFamily: FONT_UI, color: IVORY, fontSize: "0.78rem" }}
          />
          {searchQuery && (
            <button onClick={() => onSearchChange("")}>
              <X size={11} style={{ color: MUTED }} />
            </button>
          )}
        </div>
      </div>

      {/* ── Categorías ── */}
      <nav className="flex-1 px-3">
        <p style={{
          fontFamily: FONT_UI,
          fontSize: "0.58rem",
          fontWeight: 600,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: GOLD,
          marginBottom: "8px",
          paddingLeft: "10px",
        }}>
          Estantes
        </p>

        <ul className="space-y-0.5">
          {categories.map((cat) => {
            const active = selectedCategory === cat.id;
            return (
              <li key={cat.id}>
                <button
                  onClick={() => handleNavClick(() => onCategoryChange(cat.id))}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded text-left transition-all"
                  style={{
                    background: active ? "rgba(184,148,85,0.14)" : "transparent",
                    borderLeft: `2px solid ${active ? GOLD : "transparent"}`,
                    color: active ? IVORY : MUTED,
                    fontFamily: FONT_UI,
                    fontSize: "0.8rem",
                    fontWeight: active ? 500 : 400,
                    transition: "background 160ms ease, color 160ms ease",
                  }}
                >
                  <span style={{
                    fontFamily: FONT_UI,
                    fontSize: "0.58rem",
                    fontWeight: 600,
                    color: active ? GOLD : "rgba(184,148,85,0.45)",
                    minWidth: "18px",
                    letterSpacing: "0.04em",
                  }}>
                    {cat.numeral}
                  </span>
                  <span className="truncate">{cat.name}</span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* Separador */}
        <div style={{ height: "1px", background: BORDER, margin: "14px 0" }} />

        {/* ── Filtro por tipo ── */}
        <p style={{
          fontFamily: FONT_UI,
          fontSize: "0.58rem",
          fontWeight: 600,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: GOLD,
          marginBottom: "8px",
          paddingLeft: "10px",
        }}>
          Tipo
        </p>

        <ul className="space-y-0.5">
          {allTypes.map((t) => {
            const active = selectedType === t.id;
            return (
              <li key={t.id}>
                <button
                  onClick={() => handleNavClick(() => onTypeChange(t.id))}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded text-left transition-all"
                  style={{
                    background: active ? "rgba(184,148,85,0.14)" : "transparent",
                    borderLeft: `2px solid ${active ? GOLD : "transparent"}`,
                    color: active ? IVORY : MUTED,
                    fontFamily: FONT_UI,
                    fontSize: "0.8rem",
                    fontWeight: active ? 500 : 400,
                    transition: "background 160ms ease, color 160ms ease",
                  }}
                >
                  <span style={{ color: active ? GOLD : "rgba(248,245,238,0.35)", display: "flex" }}>
                    {t.id === "todos"
                      ? <Library size={13} />
                      : typeIcons[t.id as ResourceType]}
                  </span>
                  <span>{t.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* ── Footer ── */}
      <div className="px-4 py-5 mt-auto">
        <div style={{ height: "1px", background: BORDER, marginBottom: "14px" }} />

        {isAdmin ? (
          <>
            {/* Admin: agregar recurso */}
            <button
              onClick={() => { onAddResource?.(); onMobileClose?.(); }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded transition-all"
              style={{
                background: "rgba(184,148,85,0.14)",
                border: `1px solid rgba(184,148,85,0.38)`,
                color: GOLD,
                fontFamily: FONT_UI,
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.05em",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(184,148,85,0.24)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(184,148,85,0.14)";
              }}
            >
              <Plus size={13} />
              Agregar recurso
            </button>
            {/* Cerrar sesión */}
            <button
              onClick={() => { signOut(); onMobileClose?.(); }}
              className="w-full flex items-center justify-center gap-1.5 mt-2 py-1.5 rounded transition-all"
              style={{
                background: "transparent",
                color: "rgba(248,245,238,0.45)",
                fontFamily: FONT_UI,
                fontSize: "0.62rem",
                fontWeight: 500,
                letterSpacing: "0.06em",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = IVORY)}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "rgba(248,245,238,0.45)")}
            >
              <LogOut size={11} />
              Cerrar sesión
            </button>
          </>
        ) : (
          /* Visitante: acceso discreto de admin */
          <button
            onClick={() => { onLoginClick?.(); onMobileClose?.(); }}
            className="w-full flex items-center justify-center gap-1.5 py-2 rounded transition-all"
            style={{
              background: "transparent",
              border: `1px solid ${BORDER}`,
              color: "rgba(248,245,238,0.40)",
              fontFamily: FONT_UI,
              fontSize: "0.62rem",
              fontWeight: 500,
              letterSpacing: "0.08em",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = GOLD;
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(184,148,85,0.38)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = "rgba(248,245,238,0.40)";
              (e.currentTarget as HTMLButtonElement).style.borderColor = BORDER;
            }}
          >
            <Lock size={10} />
            Acceso administrador
          </button>
        )}

        <p style={{
          fontFamily: FONT_UI,
          fontSize: "0.58rem",
          color: "rgba(248,245,238,0.30)",
          letterSpacing: "0.06em",
          textAlign: "center",
          marginTop: "10px",
        }}>
          {totalCount} recursos · estante GJ
        </p>
      </div>
    </aside>
    </>
  );
}
