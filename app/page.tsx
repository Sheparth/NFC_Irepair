'use client'

import { useEffect, useState } from 'react'
import QRCode from 'qrcode'

import {
  ArrowUpRight,
  Facebook,
  Instagram,
  Link2,
  MapPin,
  MessageCircle,
  Phone,
  QrCode,
  Star,
  Store,
} from 'lucide-react'

const contactPoints = [
  { address: 'Urubamba 323 · Cayma', phone: '998 224 023', href: 'https://api.whatsapp.com/send?phone=51998224023&text=Hola%20IREPAIR%2C%20quiero%20informaci%C3%B3n%20sobre%20la%20sede%20de%20Cayma', mapHref: 'https://www.google.com/maps/search/?api=1&query=-16.38882012746849,-71.54708107574045', mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d239.2317628096732!2d-71.54708107574045!3d-16.38882012746849!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91424b9965fcd73b%3A0x39a4ddb259561931!2sIRepair%20Arequipa!5e0!3m2!1ses-419!2spe!4v1790957828192!5m2!1ses-419!2spe' },
  { address: 'Elías Aguirre 320 · Miraflores', phone: '942 669 970', href: 'https://api.whatsapp.com/send?phone=51942669970&text=Hola%20IREPAIR%2C%20quiero%20informaci%C3%B3n%20sobre%20la%20sede%20de%20Miraflores', mapHref: 'https://www.google.com/maps/search/?api=1&query=-16.401884390198507,-71.51569848186841', mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d239.2157137221865!2d-71.51569848186841!3d-16.401884390198507!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91424ba82c657e59%3A0x23056abfe697ef5e!2sElias%20Aguirre%20320%2C%20Miraflores%2004001!5e0!3m2!1ses-419!2spe!4v1790957943030!5m2!1ses-419!2spe' },
]

const socials = [
  { label: 'TikTok', handle: '@irepair.arequipa', href: 'https://www.tiktok.com/@irepair.arequipa', icon: 'tiktok' },
  { label: 'Facebook', handle: 'IRepair Arequipa', href: 'https://www.facebook.com/p/IRepair-Arequipa-61573417760715', icon: 'facebook' },
  { label: 'Instagram', handle: '@irepair_arequipa', href: 'https://www.instagram.com/irepair_arequipa', icon: 'instagram' },
]

function SocialIcon({ name }: { name: string }) {
  if (name === 'instagram') return <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5 fill-none stroke-current" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".8" className="fill-current stroke-none" /></svg>
  if (name === 'facebook') return <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5 fill-current"><path d="M13.6 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.6-1.5h1.7V3.9c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3V10H7.5v3h2.7v8h3.4Z" /></svg>
  return <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5 fill-current"><path d="M16.8 3c.2 1.8 1.2 2.9 3 3v3.1c-1.1.1-2.1-.3-3-.8v5.9c0 4.1-4.5 6.4-7.7 4.1-3-2.2-1.9-6.8 1.5-7.7 1-.3 1.8-.1 2.5.2v3.2c-1.8-.6-3.1.8-2.5 2 .7 1.4 3.2 1.1 3.2-.9V3h3Z" /></svg>
}

export default function Page() {
  const [showQr, setShowQr] = useState(false)
  const [qrDataUrl, setQrDataUrl] = useState('')
  const pageUrl = 'https://nfc-irepair.vercel.app'

  useEffect(() => {
    if (!showQr) return
    QRCode.toDataURL(pageUrl, { width: 480, margin: 2, color: { dark: '#171116', light: '#ffffff' } }).then(setQrDataUrl)
  }, [showQr])

  return (
    <main className="irepair-tech-wall relative min-h-screen overflow-hidden text-white">
      <div className="pointer-events-none absolute inset-0 opacity-50 [background-image:linear-gradient(rgba(243,168,200,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(243,168,200,0.035)_1px,transparent_1px)] [background-size:42px_42px]" />
      <div className="pointer-events-none absolute -right-32 top-20 size-96 rounded-full bg-[#4c7dff]/10 blur-3xl" />
      <div className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 py-5 sm:px-8 lg:px-12">
        <header className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="group relative flex size-10 items-center justify-center overflow-hidden rounded-xl border border-[#f3a8c8]/40 bg-[#1c1c1b] shadow-[0_0_24px_rgba(243,168,200,0.24)] transition-all duration-300 hover:scale-105 hover:border-[#f3a8c8] hover:shadow-[0_0_32px_rgba(243,168,200,0.4)]"><span className="absolute inset-0 bg-[#f3a8c8]/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" /><img src="/irepair-logo.jpg" alt="Logo de iRepair Arequipa" className="relative size-full object-cover" /></div>
            <div><span className="block text-sm font-black tracking-[0.22em]">IREPAIR</span><span className="block text-[9px] uppercase tracking-[0.2em] text-white/35">Tech service lab</span></div>
          </div>
          <span className="rounded-full border border-[#f3a8c8]/25 bg-[#f3a8c8]/[0.06] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#f3a8c8]">Arequipa // PE</span>
        </header>

        <div className="grid flex-1 items-center gap-10 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20 lg:py-16">
          <section className="relative flex flex-col items-center text-center lg:items-start lg:text-left">
            <div className="pointer-events-none absolute -left-20 -top-16 size-72 rounded-full bg-[#f3a8c8]/[0.07] blur-3xl" />
            <div className="irepair-logo-orbit group relative mb-8 flex size-44 cursor-default items-center justify-center rounded-[2.25rem] border border-[#f3a8c8]/35 bg-[#f3a8c8]/[0.06] shadow-[0_0_70px_rgba(243,168,200,0.14)] transition-all duration-500 hover:scale-[1.03] hover:border-[#f3a8c8]/70 hover:bg-[#f3a8c8]/[0.1] hover:shadow-[0_0_90px_rgba(243,168,200,0.28)] sm:size-52">
              <span className="irepair-orbit-ring absolute inset-2 rounded-[1.8rem] border border-dashed border-[#f3a8c8]/45" aria-hidden="true" />
              <span className="irepair-orbit-dot absolute -right-1 top-8 size-2 rounded-full bg-[#f3a8c8] shadow-[0_0_16px_#f3a8c8]" aria-hidden="true" />
              <div className="relative z-10 flex size-32 items-center justify-center overflow-hidden rounded-3xl border border-white/15 bg-[#1c1c1b] shadow-2xl sm:size-40">
                <img src="/irepair-logo.jpg" alt="Logo de iRepair Arequipa" className="size-full object-cover" />
              </div>
            </div>
            <div className="irepair-wood-panel relative mb-8 w-full max-w-md overflow-hidden rounded-[2rem] border border-[#f3a8c8]/30 px-6 py-7 text-center shadow-[0_18px_60px_rgba(0,0,0,0.3)] transition-all duration-500 hover:-translate-y-1 hover:border-[#f3a8c8]/60 hover:shadow-[0_22px_70px_rgba(243,168,200,0.16)] sm:px-10 sm:py-9 lg:text-left">
              <span className="pointer-events-none absolute inset-y-0 left-3 w-2 rounded-full bg-[#f3a8c8]/35" aria-hidden="true" />
              <span className="pointer-events-none absolute inset-y-0 right-3 w-2 rounded-full bg-[#f3a8c8]/35" aria-hidden="true" />
              <p className="relative text-[1.65rem] font-black leading-[0.95] tracking-[-0.05em] text-[#171116] sm:text-[2rem]">No somos para todos.</p>
              <p className="relative mt-2 font-serif text-xl italic leading-tight text-[#171116]/80 sm:text-2xl">Somos para quienes<br />saben lo que tienen.</p>
            </div>
            <div className="mb-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.26em] text-[#f3a8c8]"><span className="size-1.5 rounded-full bg-[#f3a8c8] shadow-[0_0_12px_#f3a8c8]" /> Tecnología y servicio en Arequipa <span className="text-white/25">// 01</span></div>
            <h1 className="max-w-xl text-[3.7rem] font-black leading-[0.88] tracking-[-0.07em] sm:text-[5.2rem]">Hola, somos <span className="mt-2 block text-[#f3a8c8]">IREPAIR.</span></h1>
            <p className="mt-7 max-w-md text-base leading-7 text-white/60">Soluciones confiables para tus equipos, atención cercana y todo lo que necesitas para seguir conectado.</p>
            <a href="https://api.whatsapp.com/send?phone=51942669970&text=Hola%20IREPAIR%2C%20quiero%20informaci%C3%B3n" target="_blank" rel="noopener noreferrer" className="group mt-8 flex w-full max-w-sm items-center justify-between rounded-2xl bg-[#f3a8c8] px-5 py-4 text-sm font-black text-[#090a0c] shadow-[0_10px_30px_rgba(243,168,200,0.12)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#e5ff72] hover:shadow-[0_16px_42px_rgba(243,168,200,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f3a8c8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#07090d]"><span className="flex items-center gap-3"><MessageCircle aria-hidden="true" className="size-5" /> Escríbenos por WhatsApp</span><ArrowUpRight aria-hidden="true" className="size-5" /></a>
          </section>

          <div className="flex flex-col gap-4">
            <section aria-labelledby="contacto-heading" className="rounded-3xl border border-white/10 bg-white/[0.045] p-5 backdrop-blur-sm sm:p-6">
              <div className="mb-5 flex items-end justify-between"><div><p className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#f3a8c8]">Visítanos</p><h2 id="contacto-heading" className="text-xl font-bold tracking-tight">Encuentra tu sede</h2></div><Store aria-hidden="true" className="size-5 text-white/30" /></div>
              <div className="flex flex-col gap-3">{contactPoints.map((point) => <div key={point.address} className="group rounded-2xl border border-white/10 bg-[#111316] p-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#f3a8c8]/55 hover:bg-[#171b1d] hover:shadow-[0_8px_24px_rgba(243,168,200,0.08)]"><div className="flex items-center justify-between"><span className="flex items-center gap-3"><span className="flex size-9 items-center justify-center rounded-xl bg-[#f3a8c8]/10 text-[#f3a8c8]"><MapPin aria-hidden="true" className="size-4" /></span><span className="flex flex-col gap-1"><span className="text-sm font-semibold">{point.address}</span><span className="text-xs text-white/45">{point.phone}</span></span></span><Phone aria-hidden="true" className="size-4 text-white/30 transition-colors group-hover:text-[#f3a8c8]" /></div><div className="mt-3 grid grid-cols-2 gap-2"><a href={point.href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-xl bg-[#f3a8c8] px-3 py-2.5 text-xs font-bold text-[#171116] transition-all hover:bg-[#ffd0e2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f3a8c8]"><MessageCircle aria-hidden="true" className="size-4" /> WhatsApp</a><a href={point.mapHref} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-xl border border-white/10 px-3 py-2.5 text-xs font-semibold text-white/70 transition-all hover:border-[#f3a8c8]/50 hover:text-[#f3a8c8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f3a8c8]"><MapPin aria-hidden="true" className="size-4" /> Ver mapa</a></div><iframe src={point.mapSrc} title={`Ubicación de IRepair en ${point.address}`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="mt-3 h-32 w-full rounded-xl border-0 opacity-80 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0" /></div>)}</div>
            </section>

            <section aria-labelledby="social-heading" className="rounded-3xl border border-white/10 bg-white/[0.025] p-5 sm:p-6"><div className="mb-4 flex items-center justify-between"><h2 id="social-heading" className="text-xs font-bold uppercase tracking-[0.2em] text-white/45">Síguenos</h2><Star aria-hidden="true" className="size-4 text-[#f3a8c8]" /></div><div className="grid grid-cols-3 gap-2">{socials.map((social) => { return <a key={social.label} href={social.href} target="_blank" rel="noreferrer" aria-label={`Visitar ${social.label} de IRepair Arequipa`} className="group flex min-h-20 flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.035] p-3 transition-all duration-300 hover:-translate-y-1 hover:border-[#f3a8c8]/45 hover:bg-[#f3a8c8]/[0.07] hover:shadow-[0_10px_28px_rgba(243,168,200,0.1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f3a8c8]"><SocialIcon name={social.icon} /><span><span className="block text-xs font-bold">{social.label}</span><span className="mt-0.5 block truncate text-[10px] text-white/40">{social.handle}</span></span></a> })}</div><a href="https://search.google.com/local/writereview?placeid=ChIJO9f8ZZlLQpERMRlWWbLdpDk" target="_blank" rel="noreferrer" className="mt-3 flex items-center justify-between rounded-2xl border border-[#f3a8c8]/25 bg-[#f3a8c8]/[0.06] px-4 py-3.5 text-sm font-semibold text-[#f3a8c8] transition-colors hover:bg-[#f3a8c8]/10"><span className="flex items-center gap-3"><Star aria-hidden="true" className="size-4" fill="currentColor" /> Déjanos una reseña en Google</span><ArrowUpRight aria-hidden="true" className="size-4" /></a><button type="button" onClick={() => setShowQr(true)} className="mt-3 flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3.5 text-sm font-semibold text-white/75 transition-all hover:-translate-y-0.5 hover:border-[#f3a8c8]/55 hover:bg-[#f3a8c8]/[0.07] hover:text-[#f3a8c8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f3a8c8]"><span className="flex items-center gap-3"><QrCode aria-hidden="true" className="size-4" /> Compartir perfil con QR</span><ArrowUpRight aria-hidden="true" className="size-4" /></button></section>
          </div>
        </div>
        {showQr && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-5 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="qr-title" onClick={() => setShowQr(false)}><div className="w-full max-w-sm rounded-3xl border border-[#f3a8c8]/35 bg-[#171116] p-5 text-center shadow-[0_24px_80px_rgba(0,0,0,0.55)]" onClick={(event) => event.stopPropagation()}><div className="mb-4 flex items-center justify-between"><div className="text-left"><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#f3a8c8]">Comparte IRepair</p><h2 id="qr-title" className="mt-1 text-xl font-bold">Escanea para visitarnos</h2></div><button type="button" onClick={() => setShowQr(false)} aria-label="Cerrar código QR" className="rounded-full px-2 py-1 text-xl text-white/45 transition-colors hover:bg-white/10 hover:text-white">×</button></div><div className="rounded-2xl bg-white p-4"><img src={qrDataUrl} alt="Código QR para abrir el perfil web de IRepair Arequipa" className="mx-auto aspect-square w-full max-w-[280px]" /></div><p className="mt-4 break-all text-xs text-white/45">{pageUrl}</p><a href={qrDataUrl || '#'} download="irepair-qr.png" target="_blank" rel="noreferrer" className="mt-4 flex items-center justify-center rounded-xl bg-[#f3a8c8] px-4 py-3 text-sm font-bold text-[#171116] transition-colors hover:bg-[#ffd0e2]">Descargar QR</a></div></div>}
        <footer className="pb-2 text-center text-[10px] uppercase tracking-[0.18em] text-white/25">IREPAIR Arequipa · Siempre conectados</footer>
      </div>
    </main>
  )
}
