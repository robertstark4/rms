import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowUp, ArrowUpRight, Menu, X } from "lucide-react";
import portrait from "@/assets/portrait.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Your Name — Brand Strategist" },
      { name: "description", content: "Brand strategist shaping positioning, narrative and growth for ambitious companies. Strategy, storytelling and identity." },
      { property: "og:title", content: "Your Name — Brand Strategist" },
      { property: "og:description", content: "Positioning, narrative and growth for ambitious brands." },
    ],
  }),
  component: Index,
});

// ——— Editable content (all placeholder) ———
const CONTACT = {
  email: "hello@yourname.com",
  phone: "+1 (555) 000-0000",
  phoneHref: "+15550000000",
  website: "yourname.com",
  websiteHref: "https://example.com",
};

const NAV = [
  { id: "about", label: "About" },
  { id: "approach", label: "Approach" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

const EXPERIENCE = [
  {
    role: "Head of Brand Strategy",
    org: "[Agency Name]",
    dates: "2021 — Present",
    desc: "Lead a multidisciplinary strategy team across positioning, naming and brand architecture for growth-stage clients.",
    points: ["Repositioned [Client Name], contributing to ~200% growth in qualified pipeline*", "Built a reusable brand-platform framework adopted across 12 accounts*"],
  },
  {
    role: "Senior Brand Strategist",
    org: "[Studio Name]",
    dates: "2018 — 2021",
    desc: "Owned research-to-narrative engagements, translating customer insight into messaging systems and campaign platforms.",
    points: ["Launch narrative for [Client Name] reached 3× category awareness benchmark*", "Ran 40+ stakeholder & customer interviews per engagement*"],
  },
  {
    role: "Brand Strategist",
    org: "[Company Name]",
    dates: "2015 — 2018",
    desc: "Shaped in-house brand voice, guidelines and go-to-market storytelling for a portfolio of consumer products.",
    points: ["Unified 5 sub-brands under one coherent identity system*", "Cut creative review cycles by ~35% via clearer briefs*"],
  },
];

const EDUCATION = [
  { title: "MA, Brand & Communication Strategy", org: "[University Name]", dates: "2013 — 2015" },
  { title: "BA, Media & Cultural Studies", org: "[University Name]", dates: "2009 — 2013" },
];

const SKILLS = [
  { group: "Strategy", items: ["Positioning", "Brand architecture", "Audience research", "Competitive mapping"] },
  { group: "Storytelling", items: ["Narrative platforms", "Messaging systems", "Tone of voice", "Naming"] },
  { group: "Delivery", items: ["Workshop facilitation", "Creative direction", "Go-to-market", "Brand guidelines"] },
];

const LANGUAGES = [
  { name: "English", level: "Native" },
  { name: "Spanish", level: "Professional" },
  { name: "French", level: "Conversational" },
];

const APPROACH = [
  { n: "01", t: "Listen", d: "Research, interviews and audits to find the truth the brand already holds." },
  { n: "02", t: "Distill", d: "Sharpen insight into a single, defensible position and a clear promise." },
  { n: "03", t: "Narrate", d: "Build the story, voice and messaging system people can repeat." },
  { n: "04", t: "Activate", d: "Equip teams to bring it to life consistently, everywhere." },
];

function useReveal() {
  useEffect(() => {
    document.documentElement.classList.add("js");
    const els = document.querySelectorAll(".js-reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && (e.target.classList.add("in"), io.unobserve(e.target))),
      { rootMargin: "0px 0px -8% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Placeholder() {
  return <span className="eyebrow ml-2 rounded-sm border border-dashed border-foreground/30 px-1.5 py-0.5 text-[0.6rem] text-muted-foreground">Sample copy</span>;
}

function SectionHead({ index, title, id }: { index: string; title: string; id: string }) {
  return (
    <div className="js-reveal mb-12 grid grid-cols-12 items-end gap-6 border-t border-foreground pt-6">
      <span className="eyebrow col-span-12 text-primary md:col-span-3">({index})</span>
      <h2 id={id} className="col-span-12 text-5xl font-black uppercase leading-[0.9] tracking-tighter md:col-span-9 md:text-7xl">{title}</h2>
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 20);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, []);
  return (
    <header className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${scrolled || open ? "border-b bg-background/90 backdrop-blur" : "border-b border-transparent"}`}>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-10">
        <a href="#top" aria-label="Your Name — home" className="grid h-10 w-10 place-items-center rounded-full bg-foreground text-sm font-black tracking-tighter text-background transition-colors hover:bg-primary">
          YN
        </a>
        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex gap-8 text-sm font-medium">
            {NAV.map((n) => (
              <li key={n.id}><a className="link-u" href={`#${n.id}`}>{n.label}</a></li>
            ))}
          </ul>
        </nav>
        <a href={`mailto:${CONTACT.email}`} className="hidden rounded-full bg-primary px-5 py-2 text-sm font-bold text-primary-foreground transition-colors hover:bg-foreground md:inline-block">
          Let's talk
        </a>
        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-full border border-foreground md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
      {open && (
        <nav id="mobile-menu" aria-label="Mobile" className="animate-in fade-in slide-in-from-top-2 border-t bg-background px-5 pb-8 pt-4 md:hidden">
          <ul className="flex flex-col">
            {NAV.map((n, i) => (
              <li key={n.id} className="border-b">
                <a href={`#${n.id}`} onClick={() => setOpen(false)} className="flex items-baseline justify-between py-4 text-3xl font-black uppercase tracking-tighter hover:text-primary">
                  {n.label}<span className="eyebrow text-muted-foreground">0{i + 1}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="top" aria-labelledby="hero-name" className="mx-auto max-w-7xl px-5 pb-20 pt-28 md:px-10 md:pt-36">
      <div className="grid grid-cols-12 gap-6">
        <div className="reveal col-span-12 flex flex-wrap items-center gap-3 md:col-span-8">
          <span className="eyebrow rounded-full bg-tag px-3 py-1 text-tag-foreground">Available for projects — 2026</span>
          <span className="eyebrow text-muted-foreground">Based in [City]</span>
        </div>
        <h1 id="hero-name" className="reveal col-span-12 mt-4 text-[17vw] font-black uppercase leading-[0.82] tracking-[-0.06em] md:col-span-8 md:text-[10.5rem]">
          Your<br />Name
        </h1>
        <div className="reveal col-span-12 flex items-center justify-start md:col-span-4 md:justify-end" style={{ animationDelay: "120ms" }}>
          <div className="relative h-52 w-52 md:h-72 md:w-72">
            <div aria-hidden className="ring-gradient spin-slow absolute inset-0 rounded-full" />
            <img src={portrait} alt="Portrait placeholder of the strategist" width={816} height={816} className="absolute inset-[6px] h-[calc(100%-12px)] w-[calc(100%-12px)] rounded-full border-4 border-background object-cover" />
          </div>
        </div>
        <p className="reveal col-span-12 mt-2 text-[13vw] font-black leading-[0.9] tracking-[-0.05em] text-primary md:text-[8rem]" style={{ animationDelay: "180ms" }}>
          Brand Strategist
        </p>
        <div className="col-span-12 mt-10 grid grid-cols-12 gap-6 border-t pt-8">
          <p className="eyebrow col-span-12 text-muted-foreground md:col-span-3">Mission</p>
          <p className="reveal col-span-12 max-w-3xl text-2xl font-medium leading-snug md:col-span-9 md:text-3xl" style={{ animationDelay: "260ms" }}>
            I help ambitious brands find what makes them matter — and turn it into a story people remember, repeat and choose.
          </p>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section aria-labelledby="about" className="mx-auto max-w-7xl px-5 py-24 md:px-10">
      <SectionHead index="01" title="About" id="about" />
      <div className="grid grid-cols-12 gap-6">
        <div className="js-reveal col-span-12 space-y-6 text-lg leading-relaxed md:col-span-7 md:col-start-4">
          <p className="text-2xl font-bold leading-snug">
            A decade of turning complex businesses into clear, compelling brands.<Placeholder />
          </p>
          <p className="text-muted-foreground">
            For over ten years I've worked at the intersection of strategy and storytelling — partnering with founders, marketing leaders and creative teams to define positioning, shape narrative and build brands that hold up under pressure. Replace this paragraph with your own bio.
          </p>
          <p className="text-muted-foreground">
            My work starts with listening and ends with alignment: a sharp idea everyone in the room can stand behind, and a system that makes it easy to express.
          </p>
        </div>
        <dl className="js-reveal col-span-12 mt-8 grid grid-cols-3 border-y md:col-span-9 md:col-start-4">
          {[["10+", "Years"], ["60+", "Brands"], ["12", "Industries"]].map(([v, l]) => (
            <div key={l} className="border-r py-6 pr-4 last:border-r-0 [&:not(:first-child)]:pl-4">
              <dt className="eyebrow text-muted-foreground">{l}*</dt>
              <dd className="text-4xl font-black tracking-tighter md:text-6xl">{v}</dd>
            </div>
          ))}
        </dl>
        <p className="eyebrow col-span-12 text-muted-foreground md:col-span-9 md:col-start-4">* Sample placeholder figures — replace with your own.</p>
      </div>
    </section>
  );
}

function Approach() {
  return (
    <section aria-labelledby="approach" className="bg-foreground py-24 text-background">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="js-reveal mb-12 grid grid-cols-12 items-end gap-6 border-t border-background pt-6">
          <span className="eyebrow col-span-12 text-primary md:col-span-3">(02)</span>
          <h2 id="approach" className="col-span-12 text-5xl font-black uppercase leading-[0.9] tracking-tighter md:col-span-9 md:text-7xl">Approach</h2>
        </div>
        <ol className="grid gap-px bg-background/20 sm:grid-cols-2 lg:grid-cols-4">
          {APPROACH.map((a, i) => (
            <li key={a.n} className="js-reveal group bg-foreground p-8 transition-colors hover:bg-primary" style={{ transitionDelay: `${i * 60}ms` }}>
              <span className="eyebrow text-tag group-hover:text-background">{a.n}</span>
              <h3 className="mt-10 text-3xl font-black uppercase tracking-tighter">{a.t}</h3>
              <p className="mt-3 text-background/70 group-hover:text-background">{a.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section aria-labelledby="experience" className="mx-auto max-w-7xl px-5 py-24 md:px-10">
      <SectionHead index="03" title="Experience" id="experience" />
      <ol className="border-t">
        {EXPERIENCE.map((e) => (
          <li key={e.role} className="js-reveal group grid grid-cols-12 gap-6 border-b py-10">
            <p className="eyebrow col-span-12 text-muted-foreground md:col-span-3">{e.dates}</p>
            <div className="col-span-12 md:col-span-9">
              <h3 className="text-3xl font-black tracking-tighter transition-colors group-hover:text-primary md:text-4xl">{e.role}</h3>
              <p className="mt-1 font-medium">{e.org}</p>
              <p className="mt-4 max-w-2xl text-muted-foreground">{e.desc}</p>
              <ul className="mt-5 space-y-2">
                {e.points.map((p) => (
                  <li key={p} className="flex gap-3"><span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />{p}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
      <p className="eyebrow mt-6 text-muted-foreground">* Metrics and organization names are sample placeholders, not verified claims.</p>

      <div className="mt-24">
        <h3 className="js-reveal eyebrow mb-6 text-primary">Education</h3>
        <ul className="border-t">
          {EDUCATION.map((ed) => (
            <li key={ed.title} className="js-reveal grid grid-cols-12 gap-6 border-b py-6">
              <p className="eyebrow col-span-12 text-muted-foreground md:col-span-3">{ed.dates}</p>
              <p className="col-span-12 text-xl font-bold md:col-span-6">{ed.title}</p>
              <p className="col-span-12 text-muted-foreground md:col-span-3 md:text-right">{ed.org}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section aria-labelledby="skills" className="mx-auto max-w-7xl px-5 py-24 md:px-10">
      <SectionHead index="04" title="Skills" id="skills" />
      <div className="grid gap-px border bg-border md:grid-cols-4">
        {SKILLS.map((s) => (
          <div key={s.group} className="js-reveal bg-background p-6">
            <h3 className="eyebrow mb-5">{s.group}</h3>
            <ul className="flex flex-wrap gap-2">
              {s.items.map((i) => (
                <li key={i} className="rounded-full bg-tag px-3 py-1 text-sm font-medium text-tag-foreground">{i}</li>
              ))}
            </ul>
          </div>
        ))}
        <div className="js-reveal bg-background p-6">
          <h3 className="eyebrow mb-5">Languages</h3>
          <ul className="space-y-3">
            {LANGUAGES.map((l) => (
              <li key={l.name} className="flex items-baseline justify-between border-b pb-2">
                <span className="font-bold">{l.name}</span><span className="text-sm text-muted-foreground">{l.level}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const links = [
    { label: "Email", value: CONTACT.email, href: `mailto:${CONTACT.email}` },
    { label: "Phone", value: CONTACT.phone, href: `tel:${CONTACT.phoneHref}` },
    { label: "Website", value: CONTACT.website, href: CONTACT.websiteHref },
  ];
  return (
    <section aria-labelledby="contact" className="mx-auto max-w-7xl px-5 py-24 md:px-10">
      <div className="js-reveal border-t border-foreground pt-6">
        <span className="eyebrow text-primary">(05) — Contact</span>
        <h2 id="contact" className="mt-6 text-[13vw] font-black uppercase leading-[0.85] tracking-[-0.05em] md:text-[9rem]">
          Let's build<br /><span className="text-primary">your story.</span>
        </h2>
        <a href={`mailto:${CONTACT.email}`} className="mt-10 inline-flex items-center gap-3 rounded-full bg-foreground px-8 py-4 text-lg font-bold text-background transition-colors hover:bg-primary">
          Start a conversation <ArrowUpRight size={20} aria-hidden />
        </a>
      </div>
      <ul className="mt-16 grid border-t md:grid-cols-3">
        {links.map((l) => (
          <li key={l.label} className="js-reveal border-b py-6 md:border-b-0 md:border-r md:px-6 md:first:pl-0 md:last:border-r-0">
            <p className="eyebrow text-muted-foreground">{l.label}</p>
            <a href={l.href} {...(l.label === "Website" ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="link-u mt-2 inline-block text-xl font-bold">{l.value}</a>
          </li>
        ))}
      </ul>
      <p className="eyebrow mt-4 text-muted-foreground">Placeholder contact details — replace with your own.</p>
    </section>
  );
}

function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const f = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <a
      href="#top"
      aria-label="Back to top"
      className={`fixed bottom-6 right-6 z-40 grid h-14 w-14 place-items-center rounded-full bg-foreground text-background shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-primary ${show ? "opacity-100" : "pointer-events-none translate-y-4 opacity-0"}`}
      tabIndex={show ? 0 : -1}
    >
      <ArrowUp size={20} aria-hidden />
    </a>
  );
}

function Index() {
  useReveal();
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-foreground focus:px-4 focus:py-2 focus:text-background">Skip to content</a>
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Approach />
        <Experience />
        <Skills />
        <Contact />
      </main>
      <footer className="border-t">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 text-sm md:flex-row md:items-center md:justify-between md:px-10">
          <p>© {new Date().getFullYear()} Your Name. Brand Strategy & Storytelling.</p>
          <ul className="flex gap-6">
            {NAV.map((n) => <li key={n.id}><a className="link-u" href={`#${n.id}`}>{n.label}</a></li>)}
          </ul>
        </div>
      </footer>
      <BackToTop />
    </>
  );
}
