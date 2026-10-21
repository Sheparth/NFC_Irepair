'use client'

import { useEffect, useState } from 'react'
import QRCode from 'qrcode'
import {
  ArrowUpRight,
  BatteryCharging,
  Camera,
  Check,
  ClipboardCheck,
  Cpu,
  Droplets,
  MapPin,
  MessageCircle,
  PackageCheck,
  PlugZap,
  QrCode,
  ScanFace,
  ShieldCheck,
  Smartphone,
  Star,
  Wrench,
  X,
  type LucideIcon,
} from 'lucide-react'

// Marca según el Manual de Marca iRepair Arequipa: logotipo solo con el nombre (sin manzana),
// paleta salmón / roble / negro + blanco / crema / dorado, Montserrat (títulos) e Inter (textos),
// títulos en tipo oración y tono experto, honesto y cercano.

const sedes = [
  {
    id: 'cayma',
    nombre: 'Cayma',
    direccion: 'Urubamba 323',
    telefono: '998 224 023',
    mapHref: 'https://www.google.com/maps/search/?api=1&query=-16.38882012746849,-71.54708107574045',
    mapSrc:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d239.2317628096732!2d-71.54708107574045!3d-16.38882012746849!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91424b9965fcd73b%3A0x39a4ddb259561931!2sIRepair%20Arequipa!5e0!3m2!1ses-419!2spe!4v1790957828192!5m2!1ses-419!2spe',
  },
  {
    id: 'miraflores',
    nombre: 'Miraflores',
    direccion: 'Elías Aguirre 320',
    telefono: '942 669 970',
    mapHref: 'https://www.google.com/maps/search/?api=1&query=-16.401884390198507,-71.51569848186841',
    mapSrc:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d239.2157137221865!2d-71.51569848186841!3d-16.401884390198507!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91424ba82c657e59%3A0x23056abfe697ef5e!2sElias%20Aguirre%20320%2C%20Miraflores%2004001!5e0!3m2!1ses-419!2spe!4v1790957943030!5m2!1ses-419!2spe',
  },
] as const

type Sede = (typeof sedes)[number]

const wa = (sede: Sede, mensaje: string) => `https://api.whatsapp.com/send?phone=51${sede.telefono.replace(/\s/g, '')}&text=${encodeURIComponent(mensaje)}`

const servicios: { id: string; icono: LucideIcon; nombre: string; detalle: string }[] = [
  { id: 'pantalla', icono: Smartphone, nombre: 'Pantalla', detalle: 'Pantalla rota, rayas, manchas o táctil que no responde. Te explicamos la diferencia entre pantalla original y genérica para que elijas.' },
  { id: 'bateria', icono: BatteryCharging, nombre: 'Batería', detalle: 'Se descarga rápido, se apaga sola o está hinchada. Revisamos su salud y te decimos si conviene cambiarla.' },
  { id: 'carga', icono: PlugZap, nombre: 'Carga', detalle: 'No carga, carga lento o hay que mover el cable. Limpieza o cambio del puerto de carga.' },
  { id: 'camara', icono: Camera, nombre: 'Cámara', detalle: 'Fotos borrosas, cámara negra o lente rajado, trasera o frontal.' },
  { id: 'faceid', icono: ScanFace, nombre: 'Face ID y True Tone', detalle: 'Face ID que dejó de funcionar o pérdida de True Tone tras un cambio de pantalla. Hacemos la transferencia de True Tone.' },
  { id: 'placa', icono: Cpu, nombre: 'Placa y microsoldadura', detalle: 'No enciende, se reinicia o falla tras un golpe. Microsoldadura y transplante de chip IC en laboratorio.' },
  { id: 'liquido', icono: Droplets, nombre: 'Daño por líquido', detalle: 'Se mojó o cayó al agua. Apágalo, no lo cargues y tráelo cuanto antes: el tiempo cuenta.' },
  { id: 'otro', icono: Wrench, nombre: 'Otro problema', detalle: 'Altavoz, micrófono, botones, vibrador o algo que no sabes qué es. Lo diagnosticamos y te explicamos.' },
]

const pasos: { icono: LucideIcon; titulo: string; texto: string }[] = [
  { icono: ClipboardCheck, titulo: 'Diagnóstico', texto: 'Revisamos tu equipo y encontramos la causa real.' },
  { icono: MessageCircle, titulo: 'Te explicamos', texto: 'Precio y repuesto claros: original o genérico, tú eliges.' },
  { icono: Wrench, titulo: 'Reparamos', texto: 'Especialistas en Apple, en nuestro laboratorio.' },
  { icono: PackageCheck, titulo: 'Listo hoy', texto: 'Cuando es posible, el mismo día. Con garantía por escrito.' },
]

const redes = [
  { label: 'Instagram', handle: '@irepair_arequipa', href: 'https://www.instagram.com/irepair_arequipa', icon: 'instagram' },
  { label: 'TikTok', handle: '@irepair.arequipa', href: 'https://www.tiktok.com/@irepair.arequipa', icon: 'tiktok' },
  { label: 'Facebook', handle: 'iRepair Arequipa', href: 'https://www.facebook.com/p/IRepair-Arequipa-61573417760715', icon: 'facebook' },
]

const RESENA = 'https://search.google.com/local/writereview?placeid=ChIJO9f8ZZlLQpERMRlWWbLdpDk'
const PAGINA = 'https://nfc-irepair.vercel.app'
const menu = [
  { href: '#servicios', label: 'Servicios' },
  { href: '#proceso', label: 'Cómo trabajamos' },
  { href: '#sedes', label: 'Sedes' },
  { href: '#redes', label: 'Redes' },
]

function IconoRed({ name, className = 'size-5' }: { name: string; className?: string }) {
  if (name === 'instagram')
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className={`${className} fill-none stroke-current`} strokeWidth="1.8">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r=".8" className="fill-current stroke-none" />
      </svg>
    )
  if (name === 'facebook')
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className={`${className} fill-current`}>
        <path d="M13.6 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.6-1.5h1.7V3.9c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3V10H7.5v3h2.7v8h3.4Z" />
      </svg>
    )
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={`${className} fill-current`}>
      <path d="M16.8 3c.2 1.8 1.2 2.9 3 3v3.1c-1.1.1-2.1-.3-3-.8v5.9c0 4.1-4.5 6.4-7.7 4.1-3-2.2-1.9-6.8 1.5-7.7 1-.3 1.8-.1 2.5.2v3.2c-1.8-.6-3.1.8-2.5 2 .7 1.4 3.2 1.1 3.2-.9V3h3Z" />
    </svg>
  )
}

/** Logotipo oficial: solo la palabra "iRepair" (nunca con manzana, nunca en mayúsculas). */
function Logo({ claro = false }: { claro?: boolean }) {
  return (
    <span className="inline-flex flex-col items-start leading-none">
      <span className={`font-display text-[1.7rem] font-semibold tracking-[-0.04em] ${claro ? 'text-blanco' : 'text-negro'}`}>iRepair</span>
      <span className="mt-1 text-[9px] font-medium uppercase tracking-[0.42em] text-dorado">Arequipa</span>
    </span>
  )
}

/** Pistas de circuito decorativas (el detalle tecnológico). */
function Circuito({ className = '' }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 400 300" fill="none" className={className}>
      <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path className="pista" d="M0 60h90l30 30h120l20-20h140" />
        <path className="pista" d="M0 150h60l25-25h95l40 40h180" style={{ animationDelay: '-1.5s' }} />
        <path className="pista" d="M0 240h130l30-30h80l25 25h135" style={{ animationDelay: '-3s' }} />
        <path d="M200 0v40l-20 20M300 300v-50l25-25" />
      </g>
      <g fill="currentColor">
        {[
          [90, 60], [240, 90], [85, 125], [220, 165], [160, 210], [265, 235], [200, 40], [325, 225],
        ].map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="4" />
        ))}
      </g>
    </svg>
  )
}

/** Celular ilustrado (genérico) que muestra el avance de una reparación. */
function CelularReparacion() {
  const etapas = ['Diagnóstico', 'Repuesto elegido', 'Reparando', '¡Listo hoy!']
  const [etapa, setEtapa] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setEtapa((e) => (e + 1) % etapas.length), 1800)
    return () => clearInterval(t)
  }, [etapas.length])

  return (
    <div className="relative mx-auto w-[230px] sm:w-[260px]" aria-hidden="true">
      <div className="absolute -inset-6 rounded-[3rem] bg-dorado/20 blur-2xl" />
      <div className="relative rounded-[2.6rem] border-[10px] border-negro bg-negro shadow-[0_30px_60px_-20px_rgba(0,0,0,.6)]">
        <div className="absolute left-1/2 top-2 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-negro" />
        <div className="overflow-hidden rounded-[2rem] bg-blanco px-4 pb-6 pt-10">
          <p className="font-display text-sm font-semibold">Tu reparación</p>
          <p className="text-[11px] text-negro/55">Orden #0247 · Cayma</p>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-crema">
            <div className="h-full rounded-full bg-salmon transition-all duration-700" style={{ width: `${((etapa + 1) / etapas.length) * 100}%` }} />
          </div>
          <ul className="mt-4 space-y-2.5">
            {etapas.map((e, i) => (
              <li key={e} className={`flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-xs font-medium transition-colors duration-500 ${i === etapa ? 'bg-salmon/25 text-negro' : 'text-negro/55'}`}>
                <span className={`grid size-5 place-items-center rounded-full text-[10px] transition-colors duration-500 ${i < etapa || (i === etapa && i === etapas.length - 1) ? 'bg-negro text-blanco' : i === etapa ? 'bg-salmon text-negro' : 'bg-crema text-negro/40'}`}>
                  {i < etapa || (i === etapa && i === etapas.length - 1) ? <Check className="size-3" strokeWidth={3} /> : i + 1}
                </span>
                {e}
                {i === etapa && i < etapas.length - 1 && <span className="ml-auto size-1.5 animate-ping rounded-full bg-salmon" />}
              </li>
            ))}
          </ul>
          <div className="mt-4 rounded-xl bg-negro px-3 py-2.5 text-center text-[11px] font-semibold text-blanco">Garantía por escrito</div>
        </div>
      </div>
    </div>
  )
}

export default function Page() {
  const [servicioId, setServicioId] = useState(servicios[0].id)
  const [sedeId, setSedeId] = useState<Sede['id']>('cayma')
  const [repuesto, setRepuesto] = useState<'original' | 'generico'>('original')
  const [verQr, setVerQr] = useState(false)
  const [qr, setQr] = useState('')

  const servicio = servicios.find((s) => s.id === servicioId) ?? servicios[0]
  const sede = sedes.find((s) => s.id === sedeId) ?? sedes[0]
  const mensaje = `Hola iRepair, quiero cotizar: ${servicio.nombre.toLowerCase()}. Sede ${sede.nombre}.`

  useEffect(() => {
    if (!verQr || qr) return
    QRCode.toDataURL(PAGINA, { width: 480, margin: 2, color: { dark: '#161616', light: '#ffffff' } }).then(setQr)
  }, [verQr, qr])

  return (
    <main className="madera-fondo min-h-screen pb-28 text-negro lg:pb-0">
      {/* Menú superior */}
      <header className="sticky top-0 z-40 border-b border-negro/10 bg-blanco/90 backdrop-blur-md">
        <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
          <a href="#inicio" aria-label="iRepair Arequipa, inicio">
            <Logo />
          </a>
          <ul className="hidden items-center gap-1 lg:flex">
            {menu.map((m) => (
              <li key={m.href}>
                <a href={m.href} className="rounded-full px-4 py-2 text-sm font-medium text-negro/70 transition hover:bg-salmon/25 hover:text-negro">
                  {m.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#cotizar" className="inline-flex items-center gap-2 rounded-full bg-negro px-4 py-2.5 text-sm font-semibold text-blanco transition hover:bg-black">
            <MessageCircle className="size-4" aria-hidden="true" /> Cotizar
          </a>
        </nav>
      </header>

      {/* Portada */}
      <section id="inicio" className="mx-auto max-w-6xl scroll-mt-20 px-4 pt-5 sm:px-8 sm:pt-8">
        <div className="relative overflow-hidden rounded-[2rem] bg-salmon shadow-[0_30px_70px_-30px_rgba(0,0,0,.6)]">
          <Circuito className="pointer-events-none absolute -right-10 -top-6 w-[520px] text-negro/[0.09]" />
          <div className="relative grid items-center gap-10 px-6 py-10 sm:px-10 sm:py-14 lg:grid-cols-[1.15fr_0.85fr] lg:px-14">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-negro px-3.5 py-1.5 text-xs font-semibold text-blanco">
                <span className="size-1.5 rounded-full bg-dorado" /> Especialistas en iPhone y equipos Apple
              </p>
              <h1 className="mt-6 font-display text-[2.6rem] font-bold leading-[1.15] tracking-[-0.02em] sm:text-6xl">Tráelo hoy, lo tenemos listo hoy.</h1>
              <p className="mt-5 max-w-md text-base leading-[1.6] text-negro/80">
                Diagnóstico honesto, repuestos que te explicamos con transparencia y garantía por escrito. En Cayma y Miraflores.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="#cotizar" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-negro px-6 py-4 text-sm font-semibold text-blanco shadow-lg transition hover:-translate-y-0.5 hover:bg-black">
                  <Wrench className="size-5" aria-hidden="true" /> ¿Qué le pasa a tu equipo?
                </a>
                <a href="#sedes" className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-negro px-6 py-4 text-sm font-semibold transition hover:bg-negro hover:text-blanco">
                  <MapPin className="size-5" aria-hidden="true" /> Ver sedes
                </a>
              </div>
              <dl className="mt-9 grid max-w-md grid-cols-3 gap-2 text-center">
                {[
                  ['2', 'sedes en Arequipa'],
                  ['Apple', 'especialistas'],
                  ['Hoy', 'cuando es posible'],
                ].map(([v, t]) => (
                  <div key={t} className="flex flex-col-reverse rounded-2xl bg-blanco/60 px-2 py-3">
                    <dt className="text-[11px] leading-tight text-negro/65">{t}</dt>
                    <dd className="font-display text-xl font-bold">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <CelularReparacion />
          </div>
        </div>
      </section>

      {/* Cotizador interactivo */}
      <section id="servicios" className="mx-auto max-w-6xl scroll-mt-20 px-4 pt-6 sm:px-8 sm:pt-8">
        <div id="cotizar" className="scroll-mt-20 rounded-[2rem] bg-blanco p-6 shadow-[0_30px_70px_-30px_rgba(0,0,0,.55)] sm:p-10">
          <p className="text-sm font-semibold text-roble">Servicios</p>
          <h2 className="mt-1 font-display text-3xl font-bold leading-[1.2] sm:text-4xl">¿Qué le pasa a tu equipo?</h2>
          <p className="mt-2 text-negro/70">Elige el problema y la sede: te armamos el mensaje para cotizar por WhatsApp.</p>

          <div className="mt-7 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            {servicios.map((s) => {
              const activo = s.id === servicioId
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setServicioId(s.id)}
                  aria-pressed={activo}
                  className={`group flex flex-col items-start gap-3 rounded-2xl border-2 p-4 text-left transition ${
                    activo ? 'border-negro bg-negro text-blanco shadow-lg' : 'border-negro/10 bg-crema/40 hover:-translate-y-0.5 hover:border-salmon hover:bg-salmon/15'
                  }`}
                >
                  <span className={`grid size-10 place-items-center rounded-xl transition ${activo ? 'bg-salmon text-negro' : 'bg-blanco text-negro'}`}>
                    <s.icono className="size-5" strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <span className="text-sm font-semibold leading-tight">{s.nombre}</span>
                </button>
              )
            })}
          </div>

          <div className="mt-6 grid gap-5 rounded-2xl bg-salmon/20 p-5 sm:p-6 lg:grid-cols-[1.3fr_1fr] lg:items-center">
            <div>
              <p className="flex items-center gap-2 font-display text-lg font-semibold">
                <servicio.icono className="size-5" aria-hidden="true" /> {servicio.nombre}
              </p>
              <p className="mt-2 text-[15px] leading-[1.6] text-negro/80">{servicio.detalle}</p>
              <p className="mt-3 text-xs text-negro/60">El precio y el tiempo exactos te los damos al revisar el equipo.</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-negro/60">Sede</p>
              <div className="mt-2 grid grid-cols-2 gap-1.5 rounded-2xl bg-blanco p-1.5">
                {sedes.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSedeId(s.id)}
                    aria-pressed={s.id === sedeId}
                    className={`rounded-xl py-2.5 text-sm font-semibold transition ${s.id === sedeId ? 'bg-negro text-blanco' : 'text-negro/65 hover:bg-crema'}`}
                  >
                    {s.nombre}
                  </button>
                ))}
              </div>
              <a
                href={wa(sede, mensaje)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex items-center justify-center gap-2 rounded-2xl bg-negro px-5 py-4 text-sm font-semibold text-blanco shadow-lg transition hover:-translate-y-0.5 hover:bg-black"
              >
                <MessageCircle className="size-5" aria-hidden="true" /> Cotizar en {sede.nombre}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Original vs genérico + proceso */}
      <section id="proceso" className="mx-auto max-w-6xl scroll-mt-20 px-4 pt-6 sm:px-8 sm:pt-8">
        <div className="relative overflow-hidden rounded-[2rem] bg-negro p-6 text-blanco shadow-[0_30px_70px_-30px_rgba(0,0,0,.7)] sm:p-10">
          <Circuito className="pointer-events-none absolute -bottom-10 -left-10 w-[480px] text-dorado/[0.13]" />
          <div className="relative grid gap-10 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold text-dorado">Transparencia</p>
              <h2 className="mt-1 font-display text-3xl font-bold leading-[1.2] sm:text-4xl">Original o genérico: tú eliges</h2>
              <p className="mt-2 text-blanco/70">Te explicamos la diferencia antes de reparar. Sin sorpresas.</p>
              <div className="mt-6 grid grid-cols-2 gap-1.5 rounded-2xl bg-blanco/10 p-1.5">
                {(['original', 'generico'] as const).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRepuesto(r)}
                    aria-pressed={repuesto === r}
                    className={`rounded-xl py-3 text-sm font-semibold transition ${repuesto === r ? 'bg-salmon text-negro' : 'text-blanco/70 hover:text-blanco'}`}
                  >
                    {r === 'original' ? 'Repuesto original' : 'Repuesto genérico'}
                  </button>
                ))}
              </div>
              <ul className="mt-5 space-y-3">
                {(repuesto === 'original'
                  ? ['Pieza de la misma especificación que trae tu equipo de fábrica.', 'La opción con la que tu equipo queda como era.', 'Te la recomendamos cuando la función lo exige.']
                  : ['Alternativa más económica para que tu equipo vuelva a funcionar.', 'Te decimos con honestidad qué cambia respecto a la original.', 'Garantía por escrito igual, según el tipo de repuesto.']
                ).map((t) => (
                  <li key={t} className="flex gap-3 text-[15px] leading-[1.5] text-blanco/85">
                    <ShieldCheck className="mt-0.5 size-5 shrink-0 text-salmon" aria-hidden="true" /> {t}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold text-dorado">Cómo trabajamos</p>
              <ol className="mt-4 space-y-3">
                {pasos.map((p, i) => (
                  <li key={p.titulo} className="flex items-start gap-4 rounded-2xl border border-blanco/10 bg-blanco/[0.04] p-4 transition hover:border-salmon/60 hover:bg-blanco/[0.07]">
                    <span className="relative grid size-11 shrink-0 place-items-center rounded-xl bg-salmon text-negro">
                      <p.icono className="size-5" strokeWidth={1.8} aria-hidden="true" />
                      <span className="absolute -right-1.5 -top-1.5 grid size-5 place-items-center rounded-full bg-dorado text-[10px] font-bold text-negro">{i + 1}</span>
                    </span>
                    <span>
                      <span className="block font-display font-semibold">{p.titulo}</span>
                      <span className="mt-0.5 block text-sm leading-[1.5] text-blanco/70">{p.texto}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Sedes */}
      <section id="sedes" className="mx-auto max-w-6xl scroll-mt-20 px-4 pt-6 sm:px-8 sm:pt-8">
        <div className="rounded-[2rem] bg-crema p-6 shadow-[0_30px_70px_-30px_rgba(0,0,0,.55)] sm:p-10">
          <p className="text-sm font-semibold text-roble">Visítanos</p>
          <h2 className="mt-1 font-display text-3xl font-bold leading-[1.2] sm:text-4xl">Nuestras sedes</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {sedes.map((s) => (
              <article key={s.id} className="overflow-hidden rounded-3xl bg-blanco shadow-sm">
                <div className="flex items-start justify-between gap-4 p-5">
                  <div>
                    <h3 className="font-display text-2xl font-semibold">{s.nombre}</h3>
                    <p className="mt-1 text-negro/70">{s.direccion}</p>
                    <a href={`tel:+51${s.telefono.replace(/\s/g, '')}`} className="mt-1 inline-block font-semibold underline-offset-4 hover:underline">
                      {s.telefono}
                    </a>
                  </div>
                  <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-salmon text-negro">
                    <MapPin className="size-5" strokeWidth={1.8} aria-hidden="true" />
                  </span>
                </div>
                <iframe src={s.mapSrc} title={`Ubicación de iRepair en ${s.nombre}`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-44 w-full border-0" />
                <div className="grid grid-cols-2 gap-2 p-4">
                  <a href={wa(s, `Hola iRepair, quiero información de la sede ${s.nombre}.`)} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-xl bg-negro px-3 py-3 text-sm font-semibold text-blanco transition hover:bg-black">
                    <MessageCircle className="size-4" aria-hidden="true" /> WhatsApp
                  </a>
                  <a href={s.mapHref} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-xl border border-negro/15 px-3 py-3 text-sm font-semibold transition hover:border-salmon hover:bg-salmon/20">
                    <MapPin className="size-4" aria-hidden="true" /> Cómo llegar
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Redes, reseña y QR */}
      <section id="redes" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-6 sm:px-8 sm:py-8">
        <div className="grid gap-5 rounded-[2rem] bg-blanco p-6 shadow-[0_30px_70px_-30px_rgba(0,0,0,.55)] sm:p-10 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="text-sm font-semibold text-roble">Redes</p>
            <h2 className="mt-1 font-display text-3xl font-bold leading-[1.2] sm:text-4xl">Mira nuestro trabajo</h2>
            <p className="mt-2 text-negro/70">Reparaciones reales, antes y después.</p>
            <div className="mt-6 grid grid-cols-3 gap-3">
              {redes.map((r) => (
                <a
                  key={r.label}
                  href={r.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${r.label} de iRepair Arequipa`}
                  className="flex min-h-24 flex-col justify-between rounded-2xl bg-negro p-4 text-blanco transition hover:-translate-y-1 hover:bg-black"
                >
                  <IconoRed name={r.icon} className="size-6 text-salmon" />
                  <span>
                    <span className="block text-sm font-semibold">{r.label}</span>
                    <span className="mt-0.5 block truncate text-xs text-blanco/60">{r.handle}</span>
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
            <button type="button" onClick={() => setVerQr(true)} className="flex items-center justify-between rounded-2xl border-2 border-negro/15 px-5 py-4 text-left font-semibold transition hover:border-negro">
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
        <div className="h-px bg-dorado" />
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-end sm:justify-between sm:px-8">
          <Logo claro />
          <p className="font-display text-lg font-semibold">Tráelo hoy, lo tenemos listo hoy.</p>
        </div>
      </footer>

      {/* Menú inferior para celular */}
      <nav aria-label="Acciones rápidas" className="fixed inset-x-3 bottom-3 z-40 lg:hidden">
        <div className="mx-auto grid max-w-md grid-cols-[1fr_1fr_1.5fr_1fr] items-center gap-1 rounded-full border border-blanco/10 bg-negro/95 p-1.5 shadow-[0_12px_40px_rgba(0,0,0,.55)] backdrop-blur-xl">
          <a href="#servicios" className="flex flex-col items-center gap-0.5 rounded-full py-1.5 text-[10px] font-semibold text-blanco/70 active:text-salmon">
            <Wrench className="size-5 text-salmon" aria-hidden="true" /> Servicios
          </a>
          <a href="#sedes" className="flex flex-col items-center gap-0.5 rounded-full py-1.5 text-[10px] font-semibold text-blanco/70 active:text-salmon">
            <MapPin className="size-5 text-salmon" aria-hidden="true" /> Sedes
          </a>
          <a href="#cotizar" className="flex items-center justify-center gap-2 rounded-full bg-salmon py-3 text-[12px] font-bold text-negro">
            <MessageCircle className="size-4" aria-hidden="true" /> Cotizar
          </a>
          <a href={RESENA} target="_blank" rel="noreferrer" className="flex flex-col items-center gap-0.5 rounded-full py-1.5 text-[10px] font-semibold text-blanco/70 active:text-salmon">
            <Star className="size-5 text-salmon" aria-hidden="true" /> Reseña
          </a>
        </div>
      </nav>

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
