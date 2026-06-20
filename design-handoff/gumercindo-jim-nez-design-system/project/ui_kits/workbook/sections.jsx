/* Gumercindo Jiménez — Workbook & Diario UI kit.
   Recreates two real interior pages on the design system:
   · "Hay que salir del bar" workbook (green line)
   · "Mata al quejica que llevas dentro" diario (violet line)
   Composes the editorial primitives from the DS bundle. */
const NS = window.GumercindoJimNezDesignSystem_5d8aa6;
const { BlockLabel, WorksheetPrompt, WritingLines, QuoteBlock, RatingScale, Logo } = NS;
const BASE = '../..';

/* Chapter header band — local composition (band + chapter numeral). */
function ChapterHeader({ kicker, title, number, line }) {
  const violet = line === 'quejica';
  return (
    <div style={{ display: 'flex', alignItems: 'stretch', background: 'var(--editorial-band)', color: 'var(--bone-50)' }}>
      {number != null && (
        <div style={{ width: 86, flex: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid rgba(255,255,255,.15)' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 56, color: 'var(--imprint-gold)', lineHeight: 1 }}>{number}</span>
        </div>
      )}
      <div style={{ padding: '22px 26px' }}>
        <div style={{ fontFamily: 'var(--font-sans)', fontSize: 10, fontWeight: 700, letterSpacing: '.24em', textTransform: 'uppercase', color: violet ? '#d9c2ff' : 'var(--imprint-gold)' }}>{kicker}</div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 26, lineHeight: 1.2, margin: '6px 0 0' }}>{title}</h1>
      </div>
    </div>
  );
}

/* A4-ish page shell with the brand top rule. */
function Sheet({ children, line, footer }) {
  return (
    <div data-line={line} style={{
      width: 560, minHeight: 740, background: 'var(--surface-raised)',
      boxShadow: 'var(--shadow-lg)', borderRadius: 6, overflow: 'hidden', position: 'relative',
      display: 'flex', flexDirection: 'column',
    }}>
      <div style={{ height: 4, background: 'linear-gradient(to right, var(--editorial-band), var(--imprint-gold), var(--editorial-band))' }} />
      {children}
      <div style={{ marginTop: 'auto', borderTop: '1px solid var(--border-hair)', padding: '12px 26px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'var(--font-sans)', fontSize: 10, color: 'var(--text-faint)', letterSpacing: '.04em' }}>
        <span>{footer}</span>
        <span>gumercindojimenez.com</span>
      </div>
    </div>
  );
}

/* ---------- Page A: workbook (green) ---------- */
function WorkbookPage() {
  return (
    <Sheet line="bar" footer="Hay que salir del bar — WorkBook">
      <ChapterHeader number="1" kicker="Capítulo" title="El último trago en el bar de lo conocido" />
      <div style={{ padding: '26px 30px', display: 'flex', flexDirection: 'column', gap: 22 }}>
        <div>
          <BlockLabel glyph="✦" style={{ marginBottom: 16 }}>Bloque 1 — La esencia</BlockLabel>
          <QuoteBlock style={{ marginBottom: 16 }}>"La pregunta no es si deberías salir del bar, sino cuándo darás ese primer paso hacia tu verdadero potencial."</QuoteBlock>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: 14, color: 'var(--text-body)', margin: '0 0 8px' }}>¿Cuál es la idea que más te impactó de este capítulo? Escribila con tus propias palabras:</p>
          <WritingLines count={2} />
        </div>
        <div>
          <BlockLabel glyph="◎" style={{ marginBottom: 16 }}>Bloque 2 — El espejo</BlockLabel>
          <WorksheetPrompt variant="plain" number={1} lines={1} style={{ marginBottom: 14 }}>
            ¿Qué 'bar' de lo conocido te está costando más caro hoy: tu trabajo, una relación, un hábito o tu zona de confort?
          </WorksheetPrompt>
          <WorksheetPrompt variant="plain" number={2} lines={1}>
            ¿Qué versión de vos está esperando que salgas del bar y empieces a vivir?
          </WorksheetPrompt>
        </div>
      </div>
    </Sheet>
  );
}

/* ---------- Page B: diario (violet) ---------- */
function DiarioPage() {
  return (
    <Sheet line="quejica" footer="Mata al quejica que llevas dentro — Diario">
      <ChapterHeader number="1" kicker="Sección · Trabajo y Carrera" title="¿Qué te están diciendo tus quejas?" line="quejica" />
      <div style={{ padding: '26px 30px', display: 'flex', flexDirection: 'column', gap: 18 }}>
        <BlockLabel glyph="◈" style={{ marginBottom: 2 }}>El ejercicio</BlockLabel>
        <WorksheetPrompt variant="card" lines={2}
          example="Me quejo de que nunca tengo tiempo para enfocarme en lo importante porque siempre estoy apagando incendios.">
          ¿Qué queja recurrente tenés sobre tu trabajo o tu carrera?
        </WorksheetPrompt>
        <WorksheetPrompt variant="card" lines={2}
          example="Me siento frustrado porque siento que mis esfuerzos no son estratégicos.">
          ¿Qué emociones surgen cuando te quejás?
        </WorksheetPrompt>
        <QuoteBlock author="Gumercindo Jiménez">"Si tu queja fuera una pista sobre lo que realmente necesitás o valorás, ¿qué estaría tratando de decirte?"</QuoteBlock>
      </div>
    </Sheet>
  );
}

window.GJWorkbook = { WorkbookPage, DiarioPage };
