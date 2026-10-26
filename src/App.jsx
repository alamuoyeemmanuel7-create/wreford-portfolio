import { useEffect, useRef, useState } from 'react'
import { SOCIAL, WORKS, waLink, CONTACT, STANDALONE_VIDEO } from './config'
import * as Ic from './icons'
import './styles.css'

const HI = 'Hi Wreford, I’d like to work with you.'
const RATIOS = ['4/5', '1/1', '3/4', '4/3', '3/4', '4/5', '1/1', '4/3', '1/1', '3/4', '4/5', '4/3']
const FILTERS = ['All', 'Brands', 'Weddings', 'Events']

function useInView() {
  const ref = useRef(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setSeen(true); io.disconnect() }
    }, { threshold: 0.12 })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [])
  return [ref, seen]
}

function Rv({ className = '', delay = 0, style, children, ...rest }) {
  const [ref, seen] = useInView()
  return (
    <div ref={ref} className={`rv${seen ? ' in' : ''} ${className}`} style={{ '--d': `${delay}s`, ...style }} {...rest}>
      {children}
    </div>
  )
}

function Socials({ whatsapp }) {
  const ext = { target: '_blank', rel: 'noopener noreferrer' }
  return (
    <div className="soc">
      <a href={`tel:${CONTACT.phone}`} aria-label="Phone" title={CONTACT.phone}><Ic.PHONE /></a>
      <a href={`mailto:${CONTACT.email}`} aria-label="Email" title={CONTACT.email}><Ic.MAIL /></a>
      <a href={SOCIAL.tiktok} aria-label="TikTok" {...ext}><Ic.TT /></a>
      {whatsapp && <a href={waLink(HI)} aria-label="WhatsApp" {...ext}><Ic.WA /></a>}
    </div>
  )
}

function Hero() {
  const [scrolled, setScrolled] = useState(false)
  const [logoOk, setLogoOk] = useState(true)
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 40)
    f()
    window.addEventListener('scroll', f, { passive: true })
    return () => window.removeEventListener('scroll', f)
  }, [])
  return (
    <header className="hero">
      <div className={`top${scrolled ? ' sc' : ''}`}>
        <a className={`logo${logoOk ? '' : ' nologo'}`} href="#top" aria-label="Wreford, back to top">
          {logoOk && <img src="/images/WhatsApp Image 2026-10-25 at 3.30.10 PM.jpeg" alt="Wreford logo" onError={() => setLogoOk(false)} />}
        </a>
        <ul aria-label="Main">
          {[['Home', '#top'], ['About', '#about'], ['Portfolio', '#work'], ['Services', '#services'], ['Contact', '#contact']].map(([l, h]) => (
            <li key={l}><a href={h}>{l}</a></li>
          ))}
        </ul>
        <Socials />
      </div>
      <div className="hero-c" id="top">
        <p className="k">Content creator and visual storyteller</p>
        <h1>I turn moments into content people remember.</h1>
        <p className="s">Photo and video for brands, weddings and events.</p>
        <div className="btns">
          <a className="btn" href="#work">See my work <Ic.ARW /></a>
          <a className="btn ghost" href="#contact">Book a shoot</a>
        </div>
      </div>
      <a className="scroll" href="#services" aria-label="Scroll down" />
    </header>
  )
}

const SERVICES = [
  [Ic.CAM, 'Brand content', 'Photo and video that shows your product and your people at their best, ready for social and your website.'],
  [Ic.HT, 'Weddings', 'Coverage from the first preparations to the last dance, delivered as an edited gallery and a highlight film.'],
  [Ic.CAL, 'Events', 'Launches, parties and gatherings, captured as they happen, with quick edits you can post the same week.'],
]

function Services() {
  return (
    <section id="services"><div className="wrap">
      <Rv className="head">
        <p className="kicker">Services</p><h2>What I can make for you</h2>
        <p>Every project starts with your story. I plan, shoot and edit, so you get content that is ready to share.</p>
      </Rv>
      <div className="cards">
        {SERVICES.map(([Icon, t, d], i) => (
          <Rv key={t} className="card" delay={i * 0.15}>
            <span className="ico"><Icon /></span><h3>{t}</h3><p>{d}</p>
          </Rv>
        ))}
      </div>
    </div></section>
  )
}

function About() {
  return (
    <section className="about" id="about"><div className="wrap">
      <Rv className="pic" role="img" aria-label="Wreford Hyellagyadani" />
      <Rv>
        <p className="kicker">About me</p>
        <h2>Every moment has a story worth keeping.</h2>
        <p>I’m Wreford Hyellagyadani, a content creator and visual storyteller with two years of experience making content for brands, weddings and events.</p>
        <p>I look for the small moments people forget they lived, then shape them into content they’re proud to share.</p>
        <div className="mini">
          {[[Ic.CLK, '2 years of experience'], [Ic.LAY, 'Brands, weddings, events'], [Ic.FLM, 'Photo and video']].map(([Icon, t]) => (
            <div key={t}><span className="ico sm"><Icon /></span>{t}</div>
          ))}
        </div>
        <a className="btn" href={waLink(HI)} target="_blank" rel="noopener noreferrer">Work with me <Ic.WA /></a>
      </Rv>
    </div></section>
  )
}

function Tile({ item, index, hidden, onOpen }) {
  const [ref, seen] = useInView()
  const [ok, setOk] = useState(true)
  return (
    <button
      ref={ref}
      hidden={hidden}
      data-c={item.c}
      className={`tile rv${seen ? ' in' : ''}${item.video ? ' vid' : ''}${ok ? '' : ' empty'}`}
      style={{ aspectRatio: RATIOS[index % RATIOS.length], '--d': `${(index % 3) * 0.12}s` }}
      onClick={() => onOpen(item)}
    >
      {ok && <img src={item.img} alt="" loading="lazy" onError={() => setOk(false)} />}
      <span className="pl">{item.video ? <Ic.PLAY /> : <Ic.EXP />}</span>
      <span className="ov"><small>{item.c}</small><b>{item.t}</b><em>View project</em></span>
    </button>
  )
}

function Lightbox({ item, onClose }) {
  const ref = useRef(null)
  const [bad, setBad] = useState(false)
  useEffect(() => {
    const d = ref.current
    if (item && !d.open) d.showModal()
    if (!item && d.open) d.close()
    setBad(false)
  }, [item])
  
  const isLocalVideo = item?.video?.startsWith('/videos/')
  
  return (
    <dialog ref={ref} onClose={onClose} onClick={(e) => e.target === ref.current && onClose()}>
      <button className="x" aria-label="Close" onClick={onClose}>&times;</button>
      <div className="box">
        {item && (
          isLocalVideo
            ? <video src={item.video} title={item.t} controls autoPlay style={{ width: '100%', height: '100%' }} />
            : item.video
            ? <iframe src={`${item.video}?autoplay=1`} title={item.t} allow="autoplay;fullscreen" allowFullScreen />
            : bad ? <p>Add this photo to the public/images folder.</p>
            : <img src={item.img} alt={item.t} onError={() => setBad(true)} />
        )}
      </div>
    </dialog>
  )
}

function Work() {
  const [filter, setFilter] = useState('All')
  const [active, setActive] = useState(null)
  return (
    <section id="work"><div className="wrap">
      <Rv className="head">
        <p className="kicker">Portfolio</p><h2>Recent work</h2>
        <p>Tap a project to view it.</p>
      </Rv>
      <div className="filters" role="group" aria-label="Filter work">
        {FILTERS.map((f) => (
          <button key={f} aria-pressed={filter === f} onClick={() => setFilter(f)}>{f}</button>
        ))}
      </div>
      <div className="grid">
        {WORKS.map((w, i) => (
          <Tile key={w.img} item={w} index={i} hidden={filter !== 'All' && w.c !== filter} onOpen={setActive} />
        ))}
      </div>
      <Lightbox item={active} onClose={() => setActive(null)} />
    </div></section>
  )
}

const TYPES = [['Brand content', Ic.CAM], ['Wedding', Ic.HT], ['Event', Ic.CAL], ['Something else', Ic.SPK]]
const EMPTY = { name: '', phone: '', email: '', type: 'Brand content', date: '', location: '', budget: '', msg: '' }

function Fld({ id, label, icon: Icon, error, up, area, value, onChange, ...rest }) {
  const Tag = area ? 'textarea' : 'input'
  return (
    <div className={`fld${error ? ' bad' : ''}${up ? ' up' : ''}${area ? ' ta full' : ''}`}>
      {Icon && <span className="fi"><Icon /></span>}
      <Tag id={id} name={id} placeholder=" " value={value} onChange={onChange} aria-invalid={!!error} {...rest} />
      <label htmlFor={id}>{label}</label>
      {error && <small className="err" role="alert">{error}</small>}
    </div>
  )
}

function Booking() {
  const [v, setV] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [sentUrl, setSentUrl] = useState(null)
  const set = (k) => (e) => setV((p) => ({ ...p, [k]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    const x = {}
    if (!v.name.trim()) x.name = 'Please tell me your name'
    if (v.email && !/^\S+@\S+\.\S+$/.test(v.email)) x.email = 'That email doesn’t look right'
    setErrors(x)
    if (Object.keys(x).length) return
    const rows = [['name', 'Name'], ['phone', 'Phone'], ['email', 'Email'], ['type', 'Booking'], ['date', 'Date'], ['location', 'Location'], ['budget', 'Budget'], ['msg', 'Details']]
    const text = 'New booking request\n' + rows.filter(([k]) => v[k].trim()).map(([k, l]) => `${l}: ${v[k].trim()}`).join('\n')
    const url = waLink(text)
    window.open(url, '_blank', 'noopener')
    setSentUrl(url)
  }

  if (sentUrl) {
    return (
      <div className="formcard done">
        <span className="ico"><Ic.CHK /></span>
        <h3>Almost there!</h3>
        <p>WhatsApp should have opened with your request filled in. Just press send there and I’ll reply with availability and next steps.</p>
        <div className="btns">
          <a className="btn" href={sentUrl} target="_blank" rel="noopener noreferrer">Open WhatsApp again <Ic.WA /></a>
          <button className="btn ghost" onClick={() => setSentUrl(null)}>Edit request</button>
        </div>
      </div>
    )
  }

  return (
    <div className="formcard">
      <h3>Tell me about your story</h3>
      <p className="hint">Fill this in and your request opens in WhatsApp, ready to send.</p>
      <form className="bk" onSubmit={submit} noValidate>
        <Fld id="name" label="Your name" icon={Ic.USER} value={v.name} onChange={set('name')} error={errors.name} autoComplete="name" />
        <Fld id="phone" label="Phone (optional)" icon={Ic.PHONE} type="tel" value={v.phone} onChange={set('phone')} autoComplete="tel" />
        <Fld id="email" label="Email (optional)" icon={Ic.MAIL} type="email" value={v.email} onChange={set('email')} error={errors.email} autoComplete="email" />
        <Fld id="date" label="Event date" icon={Ic.CAL} type="date" up value={v.date} onChange={set('date')} />
        <fieldset className="chips full">
          <legend>What are you booking?</legend>
          {TYPES.map(([t, Icon]) => (
            <label className="chip" key={t}>
              <input type="radio" name="type" value={t} checked={v.type === t} onChange={set('type')} />
              <span><Icon />{t}</span>
            </label>
          ))}
        </fieldset>
        <Fld id="location" label="Location" icon={Ic.PIN} value={v.location} onChange={set('location')} />
        <Fld id="budget" label="Budget range (optional)" icon={Ic.WALLET} value={v.budget} onChange={set('budget')} />
        <Fld id="msg" label="Tell me about it" area rows={4} value={v.msg} onChange={set('msg')} />
        <button className="btn send full" type="submit">Send on WhatsApp <Ic.WA /></button>
        <p className="note full">Nothing is sent until you press send in WhatsApp.</p>
      </form>
    </div>
  )
}

function Video() {
  return (
    <section id="video"><div className="wrap">
      <Rv className="head">
        <p className="kicker">Video</p>
        <h2>My Latest Video</h2>
      </Rv>
      <Rv className="video-container">
        <video src={STANDALONE_VIDEO.src} controls style={{ width: '100%', maxWidth: '800px', margin: '0 auto', display: 'block' }} />
      </Rv>
    </div></section>
  )
}

function Contact() {
  return (
    <section className="contact dark" id="contact"><div className="wrap">
      <Rv>
        <p className="kicker">Contact</p>
        <h2>Have a story to tell?</h2>
        <p>Tell me what you’re planning and the date. I’ll reply with availability and next steps.</p>
        <div className="steps">
          {[[Ic.PEN, 'Fill in the form'], [Ic.WA, 'WhatsApp opens with your details'], [Ic.CAL, 'We chat and plan your shoot']].map(([Icon, t]) => (
            <div key={t}><span className="ico sm"><Icon /></span>{t}</div>
          ))}
        </div>
      </Rv>
      <Rv delay={0.15}><Booking /></Rv>
    </div></section>
  )
}

export default function App() {
  return (
    <>
      <Hero />
      <main><Services /><About /><Work /><Video /><Contact /></main>
      <footer>
        <Socials whatsapp />
        <div style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
          <p><a href={`tel:${CONTACT.phone}`}>{CONTACT.phone}</a></p>
          <p><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></p>
        </div>
        © {new Date().getFullYear()} Wreford Hyellagyadani
      </footer>
    </>
  )
}
