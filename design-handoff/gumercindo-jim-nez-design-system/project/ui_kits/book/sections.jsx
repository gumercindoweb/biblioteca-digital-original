/* Gumercindo Jiménez — Book landing UI kit ("Hay que salir del bar").
   A luxury-editorial sales page built on the DS primitives. */
const NS = window.GumercindoJimNezDesignSystem_5d8aa6;
const { Button, Tag, Eyebrow, Card, Logo, Accordion, Testimonial, Stat } = NS;
const BASE = '../..';

function Container({ children, narrow, style }) {
  return <div style={{ width: '100%', maxWidth: narrow ? 760 : 1120, margin: '0 auto', padding: '0 32px', ...style }}>{children}</div>;
}

/* The book itself — the real cover is the title set in serif on deep green.
   Recreated typographically (no cover art asset shipped). */
function BookCover({ w = 230, style }) {
  return (
    <div style={{
      width: w, aspectRatio: '3 / 4.4', borderRadius: '3px 6px 6px 3px',
      background: 'linear-gradient(120deg, var(--green-700), var(--green-900))',
      boxShadow: 'var(--shadow-xl), inset 7px 0 14px -6px rgba(0,0,0,.45), inset 2px 0 0 rgba(255,255,255,.06)',
      borderLeft: '3px solid var(--green-950)', padding: '30px 24px',
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between', ...style,
    }}>
      <span style={{ fontFamily: 'var(--font-sans)', fontSize: 9, letterSpacing: '.24em', textTransform: 'uppercase', color: 'var(--gold-400)' }}>Gumercindo Jiménez</span>
      <div>
        <span style={{ width: 26, height: 2, background: 'var(--gold-500)', display: 'block', marginBottom: 16 }} />
        <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: w * 0.18, lineHeight: 0.98, color: 'var(--bone-50)', margin: 0, letterSpacing: '-.01em' }}>
          Hay que<br />salir<br /><em style={{ fontStyle: 'italic', color: 'var(--gold-400)' }}>del bar</em>
        </h3>
      </div>
      <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 11, color: 'var(--text-on-dark-muted)' }}>Un viaje de introspección</span>
    </div>
  );
}

/* Gold guarantee medallion */
function Seal({ size = 132 }) {
  return (
    <div style={{ width: size, height: size, borderRadius: '50%', position: 'relative',
      background: 'radial-gradient(circle at 38% 32%, var(--gold-400), var(--gold-600) 70%, var(--gold-700))',
      boxShadow: 'var(--shadow-lg), inset 0 0 0 2px rgba(255,255,255,.25)', display: 'flex',
      alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 2 }}>
      <div style={{ position: 'absolute', inset: 8, borderRadius: '50%', border: '1.5px dashed rgba(61,48,24,.5)' }} />
      <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: size * 0.30, lineHeight: 1, color: 'var(--green-950)' }}>30</span>
      <span style={{ fontFamily: 'var(--font-sans)', fontSize: 9, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--umber-700)' }}>Días de garantía</span>
    </div>
  );
}

function Nav() {
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 100, background: 'color-mix(in srgb, var(--green-950) 80%, transparent)', backdropFilter: 'blur(10px)', borderBottom: '1px solid var(--border-on-dark)' }}>
      <Container style={{ height: 72, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Logo variant="lockup" tone="dark" base={BASE} height={40} />
        <Button size="sm" variant="accent">Quiero el libro</Button>
      </Container>
    </header>
  );
}

function Hero() {
  return (
    <section style={{ background: 'var(--surface-inverse-deep)', padding: '80px 0 96px' }}>
      <Container style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 56, alignItems: 'center' }}>
        <div>
          <Eyebrow tone="onDark">Nuevo libro · Introspección</Eyebrow>
          <h1 className="gj-display" style={{ fontSize: 56, fontWeight: 600, lineHeight: 1.04, color: 'var(--bone-50)', margin: '22px 0 0' }}>
            Salí de la rutina que te atrapa y desbloqueá tu <em style={{ fontStyle: 'italic', color: 'var(--gold-400)' }}>verdadero potencial</em>.
          </h1>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: 18, lineHeight: 1.6, color: 'var(--text-on-dark-muted)', margin: '24px 0 0', maxWidth: '46ch' }}>
            Un método íntimo para empezar el viaje de introspección sin sentirte abrumado por el estancamiento, el miedo o el agotamiento.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginTop: 34, flexWrap: 'wrap' }}>
            <Button size="lg" variant="accent">Quiero mi ejemplar</Button>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--text-on-dark-muted)' }}>Edición digital · <strong style={{ color: 'var(--gold-400)', fontWeight: 600 }}>$24.99</strong></span>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
          <BookCover w={250} style={{ transform: 'rotate(-3deg)' }} />
          <div style={{ position: 'absolute', bottom: -18, right: 8 }}><Seal size={118} /></div>
        </div>
      </Container>
    </section>
  );
}

const INSIDE = [
  { icon: '◷', title: 'Reconocé dónde estás', body: 'Identificá con honestidad lo que te frena hoy — sin juicio, con método.' },
  { icon: '✕', title: 'Puntos de acción', body: 'Encontrá pequeños pasos concretos para avanzar, incluso cuando todo se siente abrumador.' },
  { icon: '↗', title: 'Conectá con vos', body: 'Reconectá con tu propio proceso y construí un sistema que sea tuyo.' },
];
function Inside() {
  return (
    <section style={{ padding: '92px 0' }}>
      <Container>
        <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 52px' }}>
          <Eyebrow style={{ justifyContent: 'center' }}>Qué vas a encontrar</Eyebrow>
          <h2 className="gj-display" style={{ fontSize: 42, fontWeight: 600, lineHeight: 1.1, margin: '18px 0 0', color: 'var(--text-strong)' }}>
            Cómo empezar tu viaje sin sentirte abrumado.
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
          {INSIDE.map((c, i) => (
            <Card key={i} tone="paper" accentRule padding="lg">
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 30, color: 'var(--gold-600)', marginBottom: 14 }}>{c.icon}</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 23, fontWeight: 600, color: 'var(--text-strong)', margin: '0 0 10px' }}>{c.title}</h3>
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: 15.5, lineHeight: 1.6, color: 'var(--text-muted)', margin: 0 }}>{c.body}</p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* Offer band */
function Offer() {
  return (
    <section style={{ background: 'var(--surface-tint)', padding: '88px 0' }}>
      <Container style={{ display: 'grid', gridTemplateColumns: '0.8fr 1.2fr', gap: 56, alignItems: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}><BookCover w={220} /></div>
        <div>
          <Eyebrow tone="brand">La oferta</Eyebrow>
          <h2 className="gj-display" style={{ fontSize: 38, fontWeight: 600, color: 'var(--green-900)', margin: '16px 0 8px' }}>Hay que salir del bar</h2>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: 16.5, lineHeight: 1.65, color: 'var(--bark-600)', margin: '0 0 24px', maxWidth: '50ch' }}>
            El libro, más tres bonus para enriquecer tu proceso: hipnosis para romper creencias limitantes, un workbook de ejercicios y un método para convertir tus quejas en poder personal.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
            {['El libro completo en formato digital', 'Bonus 1 — Reprograma tu mente (hipnosis)', 'Bonus 2 — Workbook de introspección', 'Bonus 3 — De la queja al poder personal'].map((t) => (
              <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ color: 'var(--green-600)', fontFamily: 'var(--font-sans)', fontWeight: 700 }}>✓</span>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: 16, color: 'var(--text-body)' }}>{t}</span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
            <Button size="lg" variant="solid">Comprar ahora · $24.99</Button>
            <Tag tone="gold" variant="soft">Garantía 30 días</Tag>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Proof() {
  return (
    <section style={{ background: 'var(--surface-inverse)', padding: '88px 0' }}>
      <Container narrow style={{ textAlign: 'center' }}>
        <Eyebrow tone="onDark" style={{ justifyContent: 'center' }}>Antes de vos, ya lo vivieron</Eyebrow>
        <div style={{ marginTop: 28 }}>
          <Testimonial
            tone="dark" size="lg"
            quote="Yo también me sentí estancado, sin claridad y frustrado con mi vida. Este libro me dio el primer paso — pequeño, pero real."
            author="Lector"
          />
        </div>
      </Container>
    </section>
  );
}

function FAQ() {
  return (
    <section style={{ padding: '92px 0' }}>
      <Container narrow>
        <div style={{ textAlign: 'center', marginBottom: 38 }}>
          <Eyebrow style={{ justifyContent: 'center' }}>Podrías estar preguntando</Eyebrow>
          <h2 className="gj-display" style={{ fontSize: 38, fontWeight: 600, color: 'var(--text-strong)', margin: '16px 0 0' }}>Lo que necesitás saber.</h2>
        </div>
        <Accordion
          defaultOpen={[0]}
          items={[
            { q: '¿Para quién es este libro?', a: 'Para quien siente que su rutina lo atrapa y quiere empezar — de verdad — un proceso de introspección con pasos concretos.' },
            { q: '¿Cómo lo recibo?', a: 'Es digital: lo recibís por email apenas confirmás la compra, junto con los tres bonus.' },
            { q: '¿Cuánto tarda en llegar?', a: 'De inmediato. El acceso es instantáneo a tu correo.' },
            { q: '¿Y si no es para mí?', a: 'Tenés 30 días de garantía. Si no te sirve, te devuelvo tu dinero.' },
          ]}
        />
      </Container>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ background: 'var(--ink-900)', padding: '48px 0' }}>
      <Container style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
        <Logo variant="lockup" tone="dark" base={BASE} height={40} />
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--text-on-dark-muted)' }}>© 2026 Gumercindo Jiménez · Hay que salir del bar</span>
      </Container>
    </footer>
  );
}

window.GJBook = { Nav, Hero, Inside, Offer, Proof, FAQ, Footer };
