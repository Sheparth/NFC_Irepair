'use client'

import { useEffect, useState } from 'react'
import QRCode from 'qrcode'
import { ArrowUpRight, Clock, Cpu, MapPin, MessageCircle, QrCode, ShieldCheck, Sparkles, Star, X } from 'lucide-react'

// Marca según el Manual de Marca iRepair Arequipa (oct. 2026):
// logotipo solo con el nombre (sin manzana), paleta salmón / roble / negro + blanco / crema / dorado,
// Montserrat para títulos e Inter para textos, títulos en tipo oración y tono experto, honesto y cercano.

const WHATSAPP_MSG = 'Hola iRepair, quiero cotizar una reparación'
const wa = (telefono: string, sede: string) =>
  `https://api.whatsapp.com/send?phone=51${telefono.replace(/\s/g, '')}&text=${encodeURIComponent(`${WHATSAPP_MSG} en la sede de ${sede}`)}`

const sedes = [
  {
    nombre: 'Cayma',
    direccion: 'Urubamba 323',
    telefono: '998 224 023',
    mapHref: 'https://www.google.com/maps/search/?api=1&query=-16.38882012746849,-71.54708107574045',
    mapSrc:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d239.2317628096732!2d-71.54708107574045!3d-16.38882012746849!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91424b9965fcd73b%3A0x39a4ddb259561931!2sIRepair%20Arequipa!5e0!3m2!1ses-419!2spe!4v1790957828192!5m2!1ses-419!2spe',
  },
  {
    nombre: 'Miraflores',
    direccion: 'Elías Aguirre 320',
    telefono: '942 669 970',
    mapHref: 'https://www.google.com/maps/search/?api=1&query=-16.401884390198507,-71.51569848186841',
    mapSrc:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d239.2157137221865!2d-71.51569848186841!3d-16.401884390198507!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91424ba82c657e59%3A0x23056abfe697ef5e!2sElias%20Aguirre%20320%2C%20Miraflores%2004001!5e0!3m2!1ses-419!2spe!4v1790957943030!5m2!1ses-419!2spe',
  },
]

const pilares = [
  { icono: ShieldCheck, titulo: 'Confianza', texto: 'Te explicamos el diagnóstico, el precio y el repuesto: original o genérico, tú eliges. Garantía por escrito.' },
  { icono: Cpu, titulo: 'Especialistas en Apple', texto: 'Microsoldadura, transplante de chip IC y transferencia de True Tone. No somos un taller genérico.' },
  { icono: Sparkles, titulo: 'Experiencia', texto: 'Locales cálidos, atención cuidada y entrega rápida, el mismo día cuando es posible.' },
]

const redes = [
  { label: 'Instagram', handle: '@irepair_arequipa', href: 'https://www.instagram.com/irepair_arequipa', icon: 'instagram' },
  { label: 'TikTok', handle: '@irepair.arequipa', href: 'https://www.tiktok.com/@irepair.arequipa', icon: 'tiktok' },
  { label: 'Facebook', handle: 'iRepair Arequipa', href: 'https://www.facebook.com/p/IRepair-Arequipa-61573417760715', icon: 'facebook' },
]

const RESENA = 'https://search.google.com/local/writereview?placeid=ChIJO9f8ZZlLQpERMRlWWbLdpDk'
const PAGINA = 'https://nfc-irepair.vercel.app'

function IconoRed({ name }: { name: string }) {
  if (name === 'instagram')
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5 fill-none stroke-current" strokeWidth="1.8">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r=".8" className="fill-current stroke-none" />
      </svg>
    )
  if (name === 'facebook')
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5 fill-current">
        <path d="M13.6 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.6-1.5h1.7V3.9c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3V10H7.5v3h2.7v8h3.4Z" />
      </svg>
    )
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5 fill-current">
      <path d="M16.8 3c.2 1.8 1.2 2.9 3 3v3.1c-1.1.1-2.1-.3-3-.8v5.9c0 4.1-4.5 6.4-7.7 4.1-3-2.2-1.9-6.8 1.5-7.7 1-.3 1.8-.1 2.5.2v3.2c-1.8-.6-3.1.8-2.5 2 .7 1.4 3.2 1.1 3.2-.9V3h3Z" />
    </svg>
  )
}

/** Logotipo oficial: solo la palabra "iRepair" (nunca con manzana, nunca en mayúsculas). */
function Logo({ claro = false, grande = false }: { claro?: boolean; grande?: boolean }) {
  return (
    <span className="inline-flex flex-col items-start leading-none">
      <span className={`font-display font-semibold tracking-[-0.04em] ${grande ? 'text-6xl sm:text-7xl' : 'text-[1.7rem]'} ${claro ? 'text-blanco' : 'text-negro'}`}>iRepair</span>
      <span className={`mt-1 font-medium uppercase tracking-[0.42em] text-roble ${grande ? 'text-sm' : 'text-[9px]'}`}>Arequipa</span>
    </span>
  )
}

export default function Page() {
  const [verQr, setVerQr] = useState(false)
  const [qr, setQr] = useState('')

  useEffect(() => {
    if (!verQr || qr) return
    QRCode.toDataURL(PAGINA, { width: 480, margin: 2, color: { dark: '#161616', light: '#ffffff' } }).then(setQr)
  }, [verQr, qr])

  return (
    <main className="min-h-screen bg-blanco text-negro">
      {/* Encabezado */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
        <Logo />
        <a href="#sedes" className="rounded-full border border-negro/15 px-4 py-2 text-xs font-medium text-negro/70 transition hover:border-salmon hover:text-negro">
          Cayma · Miraflores
        </a>
      </header>

      {/* Portada */}
      <section className="mx-auto max-w-6xl px-5 pb-12 pt-4 sm:px-8 lg:pb-20">
        <div className="relative overflow-hidden rounded-[2rem] bg-salmon px-6 py-12 sm:px-12 sm:py-16 lg:px-16 lg:py-20">
          <div aria-hidden="true" className="madera absolute inset-y-0 right-0 hidden w-1/3 lg:block" />
          <div className="relative max-w-xl">
            <p className="flex items-center gap-2 text-sm font-medium text-negro/75">
              <Clock className="size-4" aria-hidden="true" /> Reparación de iPhone y equipos Apple en Arequipa
            </p>
            <h1 className="mt-5 font-display text-[2.6rem] font-bold leading-[1.2] tracking-[-0.02em] sm:text-6xl">Tráelo hoy, lo tenemos listo hoy.</h1>
            <p className="mt-5 max-w-md text-base leading-[1.5] text-negro/80">
              Técnicos especialistas en Apple, diagnóstico claro y repuestos que te explicamos con transparencia: original o genérico, tú decides.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={wa(sedes[0].telefono, sedes[0].nombre)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-negro px-6 py-4 text-sm font-semibold text-blanco transition hover:-translate-y-0.5 hover:bg-black"
              >
                <MessageCircle className="size-5" aria-hidden="true" /> Cotiza por WhatsApp
              </a>
              <a href="#sedes" className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-negro/80 px-6 py-4 text-sm font-semibold transition hover:bg-negro hover:text-blanco">
                <MapPin className="size-5" aria-hidden="true" /> Ver nuestras sedes
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Pilares */}
      <section className="mx-auto max-w-6xl px-5 pb-16 sm:px-8 lg:pb-24">
        <h2 className="font-display text-3xl font-bold leading-[1.2] sm:text-4xl">Por qué traer tu equipo a iRepair</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {pilares.map(({ icono: Icono, titulo, texto }) => (
            <article key={titulo} className="rounded-3xl border border-negro/10 bg-crema/60 p-6">
              <span className="grid size-12 place-items-center rounded-2xl bg-salmon text-negro">
                <Icono className="size-6" strokeWidth={1.8} aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-display text-xl font-semibold">{titulo}</h3>
              <p className="mt-2 text-[15px] leading-[1.5] text-negro/75">{texto}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Sedes */}
      <section id="sedes" className="scroll-mt-6 bg-crema/50 py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <h2 className="font-display text-3xl font-bold leading-[1.2] sm:text-4xl">Nuestras sedes</h2>
          <p className="mt-2 text-negro/70">Dos locales en Arequipa, el mismo equipo de especialistas.</p>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {sedes.map((s) => (
              <article key={s.nombre} className="overflow-hidden rounded-3xl border border-negro/10 bg-blanco">
                <div className="flex items-start justify-between gap-4 p-6">
                  <div>
                    <h3 className="font-display text-2xl font-semibold">{s.nombre}</h3>
                    <p className="mt-1 text-negro/70">{s.direccion}</p>
                    <p className="mt-1 font-semibold">{s.telefono}</p>
                  </div>
                  <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-salmon/30 text-negro">
                    <MapPin className="size-5" strokeWidth={1.8} aria-hidden="true" />
                  </span>
                </div>
                <iframe src={s.mapSrc} title={`Ubicación de iRepair en ${s.nombre}`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-44 w-full border-0" />
                <div className="grid grid-cols-2 gap-2 p-4">
                  <a
                    href={wa(s.telefono, s.nombre)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl bg-negro px-3 py-3 text-sm font-semibold text-blanco transition hover:bg-black"
                  >
                    <MessageCircle className="size-4" aria-hidden="true" /> WhatsApp
                  </a>
                  <a
                    href={s.mapHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl border border-negro/15 px-3 py-3 text-sm font-semibold transition hover:border-salmon hover:bg-salmon/20"
                  >
                    <MapPin className="size-4" aria-hidden="true" /> Cómo llegar
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Redes, reseña y QR */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
        <div className="grid gap-5 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <h2 className="font-display text-3xl font-bold leading-[1.2] sm:text-4xl">Mira nuestro trabajo</h2>
            <p className="mt-2 text-negro/70">Reparaciones reales, antes y después, en nuestras redes.</p>
            <div className="mt-6 grid grid-cols-3 gap-3">
              {redes.map((r) => (
                <a
                  key={r.label}
                  href={r.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${r.label} de iRepair Arequipa`}
                  className="flex min-h-24 flex-col justify-between rounded-2xl border border-negro/10 bg-crema/50 p-4 transition hover:-translate-y-0.5 hover:border-salmon"
                >
                  <IconoRed name={r.icon} />
                  <span>
                    <span className="block text-sm font-semibold">{r.label}</span>
                    <span className="mt-0.5 block truncate text-xs text-negro/60">{r.handle}</span>
                  </span>
                </a>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3 lg:justify-end">
            <a href={RESENA} target="_blank" rel="noreferrer" className="flex items-center justify-between rounded-2xl bg-salmon px-5 py-4 font-semibold transition hover:-translate-y-0.5">
              <span className="flex items-center gap-3">
                <Star className="size-5" aria-hidden="true" /> Déjanos tu reseña en Google
              </span>
              <ArrowUpRight className="size-5" aria-hidden="true" />
            </a>
            <button
              type="button"
              onClick={() => setVerQr(true)}
              className="flex items-center justify-between rounded-2xl border border-negro/15 px-5 py-4 text-left font-semibold transition hover:border-salmon hover:bg-salmon/15"
            >
              <span className="flex items-center gap-3">
                <QrCode className="size-5" aria-hidden="true" /> Compartir esta página con QR
              </span>
              <ArrowUpRight className="size-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>

      {/* Pie */}
      <footer className="bg-negro text-blanco">
        <div aria-hidden="true" className="madera h-3" />
        <div className="h-px bg-dorado" />
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-end sm:justify-between sm:px-8">
          <Logo claro />
          <p className="font-display text-lg font-semibold">Tráelo hoy, lo tenemos listo hoy.</p>
        </div>
      </footer>

      {verQr && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-negro/70 p-5 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="qr-titulo" onClick={() => setVerQr(false)}>
          <div className="w-full max-w-sm rounded-3xl bg-blanco p-6 text-center shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="mb-4 flex items-start justify-between text-left">
              <div>
                <p className="text-xs font-medium text-roble">Comparte iRepair</p>
                <h2 id="qr-titulo" className="mt-1 font-display text-xl font-bold">Escanea para visitarnos</h2>
              </div>
              <button type="button" onClick={() => setVerQr(false)} aria-label="Cerrar" className="rounded-full p-1.5 text-negro/50 hover:bg-crema hover:text-negro">
                <X className="size-5" />
              </button>
            </div>
            <div className="rounded-2xl border border-negro/10 bg-white p-4">
              {qr ? <img src={qr} alt="Código QR de la página de iRepair Arequipa" className="mx-auto aspect-square w-full max-w-[260px]" /> : <div className="mx-auto aspect-square w-full max-w-[260px] animate-pulse rounded-xl bg-crema" />}
            </div>
            <p className="mt-3 break-all text-xs text-negro/55">{PAGINA}</p>
            <a href={qr || '#'} download="irepair-qr.png" className="mt-4 flex items-center justify-center rounded-xl bg-negro px-4 py-3 text-sm font-semibold text-blanco hover:bg-black">
              Descargar QR
            </a>
          </div>
        </div>
      )}
    </main>
  )
}
