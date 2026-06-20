/* Gumercindo Jiménez — Website UI kit sections.
   Composes the design-system primitives (window namespace) into the real
   site surfaces: nav, hero, about, services, proof, testimonials, FAQ,
   audit form, footer. Loaded after React + the DS bundle. */
const NS = window.GumercindoJimNezDesignSystem_5d8aa6;
const { Button, Tag, Eyebrow, Card, Logo, Input, Accordion, Testimonial, Stat } = NS;

const BASE = '../..'; // path back to DS root from ui_kits/website/

/* ---------- Shared bits ------------------------------------- */
function Container({ children, narrow, style }) {
  return <div style={{ width: '100%', maxWidth: narrow ? 760 : 1180, margin: '0 auto', padding: '0 32px', ...style }}>{children}</div>;
}

function PortraitPlaceholder({ label = 'Retrato', tall, style }) {
  return (
    <div style={{
      position: 'relative', aspectRatio: tall ? '4 / 5' : '1 / 1', width: '100%',
      background: 'linear-gradient(155deg, var(--green-800), var(--green-950))',
      borderRadius: 'var(--radius-md)', overflow: 'hidden', display: 'flex',
      alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-lg)', ...style,
    }}>
      <img src={BASE + '/assets/logo/gj-symbol-gold.png'} alt="" style={{ height: 84, opacity: 0.26 }} />
      <span style={{ position: 'absolute', bottom: 14, left: 16, fontFamily: 'var(--font-sans)', fontSize: 10, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--gold-400)', opacity: 0.8 }}>{label} · placeholder</span>
    </div>
  );
}

/* ---------- Nav --------------------------------------------- */
function Nav({ onAudit }) {
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 100, background: 'color-mix(in srgb, var(--bone-50) 88%, transparent)', backdropFilter: 'blur(10px)', borderBottom: '1px solid var(--border-hair)' }}>
      <Container style={{ height: 76, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Logo variant="lockup" tone="light" base={BASE} height={42} />
        <nav style={{ display: 'flex', alignItems: 'center', gap: 34 }}>
          {['Inicio', 'Servicios', 'Sobre mí', 'Trabaja conmigo'].map((t) => (
            <a key={t} href="#" style={{ fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 500, color: 'var(--text-body)', letterSpacing: '.01em' }}>{t}</a>
          ))}
          <Button size="sm" variant="solid" onClick={onAudit}>Solicitar auditoría</Button>
        </nav>
      </Container>
    </header>
  );
}

/* ---------- Hero -------------------------------------------- */
function Hero({ onAudit }) {
  return (
    <section style={{ padding: '88px 0 96px' }}>
      <Container style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 64, alignItems: 'center' }}>
        <div>
          <Eyebrow tone="accent">El caos me busca · Yo lo convierto en método</Eyebrow>
          <h1 className="gj-display" style={{ fontSize: 58, fontWeight: 600, lineHeight: 1.04, margin: '22px 0 0', color: 'var(--text-strong)' }}>
            Si tu negocio funciona bajo <em style={{ fontStyle: 'italic', color: 'var(--text-brand)' }}>urgencias</em>, no de estructura… ahí entro yo.
          </h1>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: 19, lineHeight: 1.6, color: 'var(--text-body)', margin: '26px 0 0', maxWidth: '46ch' }}>
            Convierto ese caos en un sistema inteligente que funciona con o sin tu presencia. Desde automatizaciones hasta formación de equipo.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 22, marginTop: 34, flexWrap: 'wrap' }}>
            <Button size="lg" variant="solid" onClick={onAudit}>Solicitar una auditoría</Button>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--text-muted)' }}>
              Valorada en <s style={{ color: 'var(--text-faint)' }}>$250</s> · <strong style={{ color: 'var(--text-accent)', fontWeight: 600 }}>Hoy, gratis</strong>
            </span>
          </div>
        </div>
        <div style={{ position: 'relative' }}>
          <PortraitPlaceholder label="Gumercindo" tall />
          <div style={{ position: 'absolute', bottom: -26, left: -26 }}>
            <Card tone="paper" padding="md" style={{ width: 210 }}>
              <Stat value="8" suffix="años" label="Transformando negocios desde adentro" />
            </Card>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ---------- About (dark band) ------------------------------- */
function About() {
  return (
    <section style={{ background: 'var(--surface-inverse)', padding: '92px 0' }}>
      <Container style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: 60, alignItems: 'center' }}>
        <PortraitPlaceholder label="En terreno" />
        <div>
          <Eyebrow tone="onDark">Sobre mí</Eyebrow>
          <h2 className="gj-display" style={{ fontSize: 40, fontWeight: 500, lineHeight: 1.12, color: 'var(--bone-50)', margin: '20px 0 0' }}>
            Soy Gumercindo, y ayudo a negocios que <em style={{ fontStyle: 'italic', color: 'var(--gold-400)' }}>ya venden</em> a convertirse en sistemas rentables y sostenibles.
          </h2>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: 17, lineHeight: 1.65, color: 'var(--text-on-dark-muted)', margin: '24px 0 0', maxWidth: '54ch' }}>
            Durante los últimos 8 años he liderado proyectos desde adentro: del caos operativo a una máquina de atracción, conversión y fidelización. Ejecuto, documento, automatizo y escalo.
          </p>
          <div style={{ display: 'flex', gap: 48, marginTop: 36 }}>
            <Stat tone="dark" value="2" label="Clientes activos en fee recurrente" />
            <Stat tone="dark" prefix="+$" value="2.2K" label="Ingreso mensual recurrente" />
            <Stat tone="dark" value="∞" label="Caos convertido en método" />
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ---------- Services ---------------------------------------- */
const SERVICES = [
  { n: '01', tag: 'Automatización', title: 'Tu negocio, en piloto inteligente', body: 'Configuro herramientas como ManyChat, Make, Brevo y Calendly para que el flujo trabaje por vos.', includes: 'Diagnóstico, implementación y formación.', cta: 'Quiero automatizar' },
  { n: '02', tag: 'Ventas', title: 'Embudos que convierten, no que adornan', body: 'Auditamos y rediseñamos tus embudos para que cada lead sepa exactamente qué hacer.', includes: 'Auditoría, rediseño, testing y guías.', cta: 'Quiero vender mejor' },
  { n: '03', tag: 'Negocio', title: 'Delegá sin perder el control', body: 'Creamos SOPs, manuales y tableros para que el equipo ejecute con criterio y orden.', includes: 'Sesiones 1:1, playbooks y seguimiento.', cta: 'Quiero delegar' },
];
function Services() {
  return (
    <section style={{ padding: '96px 0' }}>
      <Container>
        <div style={{ maxWidth: 640, marginBottom: 48 }}>
          <Eyebrow>Trabaja conmigo</Eyebrow>
          <h2 className="gj-display" style={{ fontSize: 42, fontWeight: 600, lineHeight: 1.08, margin: '18px 0 0', color: 'var(--text-strong)' }}>Tres formas de poner orden — y de hacerlo rendir.</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {SERVICES.map((s) => (
            <Card key={s.n} tone="paper" interactive accentRule padding="lg" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 30, fontWeight: 600, color: 'var(--green-200)' }}>{s.n}</span>
                <Tag tone="brand">{s.tag}</Tag>
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 600, lineHeight: 1.15, color: 'var(--text-strong)', margin: '0 0 12px' }}>{s.title}</h3>
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: 15.5, lineHeight: 1.6, color: 'var(--text-muted)', margin: '0 0 18px' }}>{s.body}</p>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 12.5, color: 'var(--text-body)', margin: '0 0 22px' }}><strong style={{ color: 'var(--text-accent)' }}>Incluye:</strong> {s.includes}</p>
              <div style={{ marginTop: 'auto' }}>
                <Button variant="outline" size="sm" fullWidth iconRight="→">{s.cta}</Button>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ---------- Testimonials (tint band) ------------------------ */
const QUOTES = [
  { q: 'Pensé que necesitaba más seguidores para vender. Gumer me hizo entender que necesitaba un sistema que convierta. Hoy vendo con menos esfuerzo y más foco.', a: 'Dueña de marca' },
  { q: 'Creía que automatizar era deshumanizar. Hasta que vi cómo un simple mensaje bien diseñado en WhatsApp cerraba más ventas que diez respuestas manuales.', a: 'E-commerce' },
  { q: 'No tenía idea de lo que era un embudo. Ahora mi negocio tiene pasos claros y cada lead sabe qué hacer — sin que yo intervenga.', a: 'Servicios' },
];
function Testimonials() {
  return (
    <section style={{ background: 'var(--surface-tint)', padding: '92px 0' }}>
      <Container>
        <div style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto 56px' }}>
          <Eyebrow tone="brand" style={{ justifyContent: 'center' }}>En sus palabras</Eyebrow>
          <h2 className="gj-display" style={{ fontSize: 42, fontWeight: 600, lineHeight: 1.1, margin: '18px 0 0', color: 'var(--green-900)' }}>Lo que dicen al trabajar conmigo.</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 36 }}>
          {QUOTES.map((t, i) => (
            <Card key={i} tone="paper" padding="lg">
              <Testimonial size="sm" quote={t.q} author={t.a} />
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ---------- FAQ --------------------------------------------- */
function FAQ() {
  return (
    <section style={{ padding: '96px 0' }}>
      <Container narrow>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <Eyebrow style={{ justifyContent: 'center' }}>Preguntas frecuentes</Eyebrow>
          <h2 className="gj-display" style={{ fontSize: 40, fontWeight: 600, margin: '18px 0 0', color: 'var(--text-strong)' }}>Antes de que preguntes.</h2>
        </div>
        <Accordion
          defaultOpen={[0]}
          items={[
            { q: '¿Qué incluye exactamente la consultoría?', a: 'Un servicio integral de Marketing, Ventas y Negocio: diagnóstico, implementación y optimización. Adaptado a tu negocio, nunca a una plantilla genérica.' },
            { q: '¿Cuánto tiempo toma ver resultados?', a: 'Depende del punto de partida, pero la auditoría te da claridad desde la primera semana. Los sistemas empiezan a rendir en cuanto se implementan.' },
            { q: '¿Qué herramientas usás? ¿Tengo que saber usarlas?', a: 'Trabajo con ManyChat, Make, Brevo, GetResponse, Calendly y más. No necesitás saber usarlas: las configuro y te formo.' },
            { q: '¿Qué diferencia tu servicio del de una agencia?', a: 'No tercerizo tu criterio. Trabajo desde adentro, con vos, cuestionándote y convirtiendo lo que sabés en estrategia medible.' },
            { q: '¿En qué se diferencia una auditoría de una consultoría?', a: 'La auditoría es el diagnóstico que te da el mapa. La consultoría es el acompañamiento que recorre el camino con vos.' },
          ]}
        />
      </Container>
    </section>
  );
}

/* ---------- Audit CTA band ---------------------------------- */
function AuditBand({ onAudit }) {
  return (
    <section style={{ background: 'var(--surface-inverse-deep)', padding: '84px 0' }}>
      <Container style={{ textAlign: 'center' }}>
        <Eyebrow tone="onDark" rule={false} style={{ justifyContent: 'center' }}>Valorada en $250 · Hoy gratis</Eyebrow>
        <h2 className="gj-display" style={{ fontSize: 50, fontWeight: 600, lineHeight: 1.06, color: 'var(--bone-50)', margin: '20px auto 0', maxWidth: '18ch' }}>
          Pedí la auditoría que te dará <em style={{ fontStyle: 'italic', color: 'var(--gold-400)' }}>claridad</em>.
        </h2>
        <p style={{ fontFamily: 'var(--font-serif)', fontSize: 18, color: 'var(--text-on-dark-muted)', margin: '20px auto 32px', maxWidth: '44ch' }}>
          Un plan de acción Mínimo Viable, sin compromiso. Empezá por entender qué está frenando tu crecimiento.
        </p>
        <Button size="lg" variant="accent" onClick={onAudit}>Solicitar mi auditoría gratuita</Button>
      </Container>
    </section>
  );
}

/* ---------- Footer ------------------------------------------ */
function Footer() {
  return (
    <footer style={{ background: 'var(--ink-900)', padding: '56px 0 40px' }}>
      <Container style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 32 }}>
        <div>
          <Logo variant="lockup" tone="dark" base={BASE} height={44} />
          <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 15, color: 'var(--text-on-dark-muted)', margin: '20px 0 0', maxWidth: '34ch' }}>
            El caos, convertido en método. Y el método, en dinero.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 56 }}>
          <FootCol title="Navegá" items={['Inicio', 'Servicios', 'Sobre mí', 'Trabaja conmigo']} />
          <FootCol title="Seguime" items={['Instagram', 'LinkedIn', 'YouTube']} />
        </div>
      </Container>
      <Container style={{ marginTop: 44, paddingTop: 22, borderTop: '1px solid var(--border-on-dark)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--text-on-dark-muted)' }}>© 2026 Gumercindo Jiménez · Todos los derechos reservados</span>
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--text-on-dark-muted)' }}>Términos · Privacidad</span>
      </Container>
    </footer>
  );
}
function FootCol({ title, items }) {
  return (
    <div>
      <div style={{ fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 600, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--gold-400)', marginBottom: 16 }}>{title}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
        {items.map((i) => <a key={i} href="#" style={{ fontFamily: 'var(--font-serif)', fontSize: 15, color: 'var(--text-on-dark)' }}>{i}</a>)}
      </div>
    </div>
  );
}

/* ---------- Audit modal ------------------------------------- */
function AuditModal({ open, onClose }) {
  const [sent, setSent] = React.useState(false);
  React.useEffect(() => { if (open) setSent(false); }, [open]);
  if (!open) return null;
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'color-mix(in srgb, var(--ink-900) 62%, transparent)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: '100%', maxWidth: 460, background: 'var(--surface-raised)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-xl)', padding: 40, position: 'relative' }}>
        <button onClick={onClose} aria-label="Cerrar" style={{ position: 'absolute', top: 18, right: 18, background: 'transparent', border: 'none', cursor: 'pointer', fontSize: 20, color: 'var(--text-faint)' }}>✕</button>
        {sent ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <img src={BASE + '/assets/logo/gj-symbol-green.png'} alt="" style={{ height: 54, marginBottom: 18 }} />
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 600, color: 'var(--text-strong)', margin: '0 0 8px' }}>Recibido.</h3>
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: 16, color: 'var(--text-muted)', margin: 0 }}>Te escribo en menos de 24 horas con los próximos pasos.</p>
          </div>
        ) : (
          <>
            <Eyebrow>Auditoría gratuita</Eyebrow>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 600, color: 'var(--text-strong)', margin: '14px 0 6px' }}>Empecemos por la claridad.</h3>
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: 15, color: 'var(--text-muted)', margin: '0 0 24px' }}>Contame de tu negocio y te devuelvo un plan de acción Mínimo Viable.</p>
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <Input label="Nombre" placeholder="¿Cómo te llamás?" required />
              <Input label="Email" type="email" placeholder="tu@empresa.com" required />
              <Input label="¿Qué te frena hoy?" placeholder="Contame en una línea" />
              <Button type="submit" variant="solid" size="lg" fullWidth style={{ marginTop: 6 }}>Solicitar auditoría</Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

window.GJSite = { Nav, Hero, About, Services, Testimonials, FAQ, AuditBand, Footer, AuditModal };
