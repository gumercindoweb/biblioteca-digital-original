// ============================================================
// LOGIN MODAL — Acceso de administrador (Supabase Auth)
// Gumercindo Jiménez Brand System
// ============================================================

import { useState } from "react";
import { X, Lock, LogIn } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const { signIn } = useAuth();
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  /* ---- tokens ---- */
  const FONT_DISPLAY = "'Cormorant Garamond', 'Times New Roman', serif";
  const FONT_UI      = "'Hanken Grotesk', system-ui, sans-serif";
  const FONT_SERIF   = "'Spectral', Georgia, serif";
  const IVORY  = "#F8F5EE";
  const BONE   = "#F1ECE0";
  const SAND   = "#E5DDCC";
  const EARTH  = "#897F66";
  const INK    = "#221F17";
  const GREEN  = "#11503D";
  const GREEN_HOVER = "#166B4F";
  const GOLD   = "#B89455";
  const CLAY   = "#AB4A40";

  const inputStyle: React.CSSProperties = {
    background: BONE,
    border: `1px solid ${SAND}`,
    borderRadius: "0.25rem",
    color: INK,
    fontFamily: FONT_SERIF,
    fontSize: "0.9rem",
    padding: "10px 12px",
    width: "100%",
    outline: "none",
    transition: "border-color 180ms ease",
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: FONT_UI,
    fontSize: "0.6rem",
    fontWeight: 600,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: EARTH,
    display: "block",
    marginBottom: "6px",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) return;
    setSubmitting(true);
    setError(null);
    const { error } = await signIn(email.trim(), password);
    setSubmitting(false);
    if (error) {
      setError("Email o contraseña incorrectos.");
      return;
    }
    setEmail(""); setPassword("");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      style={{ background: "rgba(14,59,46,0.55)", backdropFilter: "blur(4px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="w-full max-w-sm rounded overflow-hidden"
        style={{
          background: "#FFFFFF",
          border: `1px solid ${SAND}`,
          boxShadow: "0 40px 90px -30px rgba(10,46,37,0.35), 0 8px 24px -8px rgba(33,31,23,0.14)",
          animation: "fadeSlideUp 240ms cubic-bezier(0.22, 1, 0.36, 1) both",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5" style={{ borderBottom: `1px solid ${SAND}` }}>
          <div>
            <div className="flex items-center gap-2.5 mb-1.5">
              <Lock size={12} style={{ color: GOLD }} />
              <span style={{ fontFamily: FONT_UI, fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: GOLD }}>
                Acceso restringido
              </span>
            </div>
            <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: "1.4rem", fontWeight: 600, color: INK, letterSpacing: "-0.01em" }}>
              Administrador
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded transition-colors"
            style={{ color: EARTH }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = INK)}
            onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = EARTH)}
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          <div>
            <label style={labelStyle}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              autoFocus
              style={inputStyle}
              onFocus={(e) => ((e.target as HTMLInputElement).style.borderColor = `${GREEN}55`)}
              onBlur={(e) => ((e.target as HTMLInputElement).style.borderColor = SAND)}
              required
            />
          </div>
          <div>
            <label style={labelStyle}>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={inputStyle}
              onFocus={(e) => ((e.target as HTMLInputElement).style.borderColor = `${GREEN}55`)}
              onBlur={(e) => ((e.target as HTMLInputElement).style.borderColor = SAND)}
              required
            />
          </div>

          {error && (
            <p style={{ fontFamily: FONT_UI, fontSize: "0.72rem", color: CLAY, marginTop: "-4px" }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded transition-all"
            style={{
              background: GREEN,
              border: `1px solid ${GREEN}`,
              color: IVORY,
              fontFamily: FONT_UI,
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              opacity: submitting ? 0.65 : 1,
              cursor: submitting ? "default" : "pointer",
            }}
            onMouseEnter={(e) => { if (!submitting) (e.currentTarget as HTMLButtonElement).style.background = GREEN_HOVER; }}
            onMouseLeave={(e) => { if (!submitting) (e.currentTarget as HTMLButtonElement).style.background = GREEN; }}
          >
            <LogIn size={14} />
            {submitting ? "Ingresando..." : "Ingresar"}
          </button>
        </form>
      </div>
    </div>
  );
}
