import { Facebook, MessageCircle, Twitter, MapPin, Phone, Mail, ArrowUpRight, ArrowRight, CheckCircle, Briefcase, Users, Globe, FileText, Menu, X, Compass, Star } from 'lucide-react';
import { useState } from 'react';

interface Props {
  onApply: () => void;
}

const NAV_LINKS = [
  { label: 'About Us', href: '#about' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Documents Needed', href: '#requirements' },
  { label: 'Contact', href: '#contact' },
];

const SOCIAL = [
  { name: 'Facebook', icon: Facebook, url: 'https://facebook.com', color: 'text-[#1877F2] hover:text-[#1877F2]' },
  { name: 'Twitter / X', icon: Twitter, url: 'https://twitter.com', color: 'text-navy-700 hover:text-navy-900' },
  { name: 'TikTok', icon: Globe, url: 'https://tiktok.com', color: 'text-navy-700 hover:text-navy-900' },
  { name: 'WhatsApp', icon: MessageCircle, url: 'https://wa.me/', color: 'text-green-600 hover:text-green-700' },
];

const SOCIAL_BUTTONS = [
  { name: 'Facebook', icon: Facebook, url: 'https://facebook.com', bg: 'bg-[#1877F2] hover:bg-[#0d65d9]' },
  { name: 'Twitter / X', icon: Twitter, url: 'https://twitter.com', bg: 'bg-navy-700 hover:bg-navy-800' },
  { name: 'TikTok', icon: Globe, url: 'https://tiktok.com', bg: 'bg-navy-900 hover:bg-black' },
  { name: 'WhatsApp', icon: MessageCircle, url: 'https://wa.me/', bg: 'bg-green-500 hover:bg-green-600' },
];

const STEPS = [
  { num: 1, icon: FileText, title: 'Fill in the Form', desc: 'Complete the short application form with your name, passport details, and work experience. Takes about 10 minutes.' },
  { num: 2, icon: Users, title: 'We Review Your Profile', desc: 'Our team reads your application and checks your details within 3–5 working days.' },
  { num: 3, icon: Briefcase, title: 'We Find You a Job', desc: 'We connect you with real employers in Luxembourg who are actively looking to hire.' },
  { num: 4, icon: Globe, title: 'We Sort Your Visa', desc: 'We guide you through every step of the visa process so you can move to Luxembourg with confidence.' },
];

const REGIONS = [
  { flag: '🇦🇪', name: 'UAE', continent: 'Middle East' },
  { flag: '🇮🇳', name: 'India', continent: 'Asia' },
  { flag: '🇵🇭', name: 'Philippines', continent: 'Asia' },
  { flag: '🇧🇩', name: 'Bangladesh', continent: 'Asia' },
  { flag: '🇵🇰', name: 'Pakistan', continent: 'Asia' },
  { flag: '🇱🇰', name: 'Sri Lanka', continent: 'Asia' },
  { flag: '🇳🇵', name: 'Nepal', continent: 'Asia' },
  { flag: '🇮🇩', name: 'Indonesia', continent: 'Asia' },
  { flag: '🇳🇬', name: 'Nigeria', continent: 'Africa' },
  { flag: '🇬🇭', name: 'Ghana', continent: 'Africa' },
  { flag: '🇰🇪', name: 'Kenya', continent: 'Africa' },
  { flag: '🇿🇦', name: 'South Africa', continent: 'Africa' },
  { flag: '🇨🇲', name: 'Cameroon', continent: 'Africa' },
  { flag: '🇸🇳', name: 'Senegal', continent: 'Africa' },
  { flag: '🇲🇦', name: 'Morocco', continent: 'Africa' },
  { flag: '🇪🇹', name: 'Ethiopia', continent: 'Africa' },
];

const DOCS = [
  'Valid Passport — must not expire for at least 6 months',
  'A recent passport-sized photo',
  'Proof of work or education history',
  'Travel documents (if you have travelled before)',
  'Police Clearance Certificate',
  'Medical report (only if you take regular medication)',
  'Payment for the official immigration processing fee',
];

const SERVICES = [
  { icon: Compass, title: 'Job Matching', desc: 'We find employers in Luxembourg that match your skills and work experience.' },
  { icon: FileText, title: 'Visa Help', desc: 'We handle all your visa paperwork and guide you through every step.' },
  { icon: Briefcase, title: 'Full Relocation Support', desc: 'We support you from your first application right through to arriving in Luxembourg.' },
  { icon: Star, title: 'Your Own Case Manager', desc: 'You get one person to contact throughout your whole journey — no confusion.' },
];

export default function LandingPage({ onApply }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-navy-700" style={{ fontFamily: "'Open Sans', sans-serif" }}>

      {/* ── NAVBAR ── */}
      <header className="sticky top-0 z-50 bg-white border-b border-sky-border shadow-sm">
        <div className="max-w-6xl mx-auto px-5 flex items-center justify-between h-16">
          <a href="#" className="flex items-center">
            <img src="/image.png" alt="LuxCareer Help" className="h-11 w-auto" />
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(l => (
              <a
                key={l.label}
                href={l.href}
                className="text-sm font-medium text-navy-700 hover:text-gold-400 transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={onApply}
              className="hidden md:flex bg-gold-400 hover:bg-gold-500 text-white text-sm font-bold px-5 py-2.5 rounded-lg transition-all items-center gap-2 shadow-sm hover:shadow-md"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Get Started <ArrowRight className="w-4 h-4" />
            </button>
            <button className="md:hidden text-navy-700" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-sky-border bg-white px-5 py-4 space-y-3">
            {NAV_LINKS.map(l => (
              <a key={l.label} href={l.href} onClick={() => setMenuOpen(false)} className="block text-sm text-navy-700 font-medium py-1">{l.label}</a>
            ))}
            <button
              onClick={() => { onApply(); setMenuOpen(false); }}
              className="w-full bg-gold-400 hover:bg-gold-500 text-white text-sm font-bold py-2.5 rounded-lg mt-2"
            >
              Get Started — Apply Now
            </button>
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <section className="bg-navy-700 text-white">
        <div className="max-w-6xl mx-auto px-5 py-16 lg:py-20 grid lg:grid-cols-2 gap-10 items-center">
          {/* Text */}
          <div>
            <div className="inline-flex items-center gap-2 bg-gold-400/20 border border-gold-300/30 rounded-full px-4 py-1.5 mb-6">
              <Compass className="w-3.5 h-3.5 text-gold-300" />
              <span className="text-gold-200 text-xs font-semibold uppercase tracking-widest">
                UAE, Asia &amp; Africa &rarr; Luxembourg
              </span>
            </div>
            <h1
              className="text-4xl sm:text-5xl font-extrabold leading-tight mb-5"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Find a Real Job<br />
              and Move to<br />
              <span className="text-gold-300">Luxembourg</span>
            </h1>
            <p className="text-white/75 text-base leading-relaxed mb-8 max-w-md">
              We help people from Africa, the UAE, and Asia find a real job in Luxembourg — and we handle all the visa paperwork so you can focus on your new life.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              <button
                onClick={onApply}
                className="bg-gold-400 hover:bg-gold-500 text-white font-bold px-8 py-3.5 rounded-lg transition-all flex items-center gap-2 shadow-lg hover:shadow-xl text-base"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Apply Now — It's Free <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-sm transition-colors"
            >
              See how it works <ArrowUpRight className="w-4 h-4" />
            </a>
            <div className="flex flex-col sm:flex-row gap-4 text-sm text-white/60 mt-6">
              {['Free to apply', 'Verified employers only', 'Full visa support included'].map(t => (
                <span key={t} className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-gold-300 flex-shrink-0" /> {t}
                </span>
              ))}
            </div>
          </div>

          {/* Hero image — bright, clear, full height */}
          <div className="hidden lg:block">
            <img
              src="https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop"
              alt="Diverse professionals ready to work in Luxembourg"
              className="rounded-2xl w-full h-[420px] object-cover object-top shadow-2xl ring-4 ring-white/10"
            />
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <div className="bg-gold-400 text-white">
        <div className="max-w-6xl mx-auto px-5 py-7 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { n: '2,400+', l: 'People We Helped' },
            { n: '98%', l: 'Visa Approval Rate' },
            { n: '30 Days', l: 'Average Wait Time' },
            { n: '16+', l: 'Countries We Serve' },
          ].map(({ n, l }) => (
            <div key={l}>
              <div className="text-2xl font-bold" style={{ fontFamily: "'Poppins', sans-serif" }}>{n}</div>
              <div className="text-white/80 text-xs mt-0.5 font-medium uppercase tracking-wide">{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── SERVICES STRIP ── */}
      <div className="bg-sky-light border-b border-sky-border">
        <div className="max-w-6xl mx-auto px-5 py-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex gap-4">
              <div className="w-10 h-10 bg-navy-700 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon className="w-5 h-5 text-gold-300" />
              </div>
              <div>
                <h3 className="font-semibold text-navy-700 text-sm mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>{title}</h3>
                <p className="text-navy-500 text-xs leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── ABOUT ── */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-5 grid lg:grid-cols-2 gap-14 items-center">
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Team helping clients"
              className="rounded-2xl w-full h-80 object-cover shadow-lg"
            />
            <div className="absolute top-4 right-4 bg-navy-700 text-white rounded-xl px-4 py-3 text-center shadow-lg">
              <p className="text-2xl font-bold text-gold-300" style={{ fontFamily: "'Poppins', sans-serif" }}>10+</p>
              <p className="text-white/80 text-xs">Years of Experience</p>
            </div>
          </div>
          <div>
            <p className="text-gold-400 text-xs font-semibold uppercase tracking-widest mb-3">Who We Are</p>
            <h2 className="text-3xl font-bold text-navy-700 mb-4 leading-snug" style={{ fontFamily: "'Poppins', sans-serif" }}>
              We help you get a job and move to Luxembourg
            </h2>
            <p className="text-navy-500 leading-relaxed mb-4 text-sm">
              LuxCareer Help connects workers from Africa, the UAE, and across Asia with real employers in Luxembourg who are actively looking to hire — no matter where you are starting from.
            </p>
            <p className="text-navy-500 leading-relaxed mb-6 text-sm">
              Once we match you with a job, our team handles your visa documents, guides you on fees, and supports you every step of the way — so you can arrive in Luxembourg ready to work.
            </p>
            {/* Africa */}
            <div className="mb-4">
              <p className="text-xs font-semibold text-navy-400 uppercase tracking-wider mb-2">Africa</p>
              <div className="flex flex-wrap gap-2">
                {REGIONS.filter(r => r.continent === 'Africa').map(({ flag, name }) => (
                  <div key={name} className="flex items-center gap-1.5 text-sm text-navy-600 bg-sky-light rounded-lg px-2.5 py-1.5">
                    <span>{flag}</span> {name}
                  </div>
                ))}
              </div>
            </div>
            {/* Middle East & Asia */}
            <div className="mb-6">
              <p className="text-xs font-semibold text-navy-400 uppercase tracking-wider mb-2">Middle East &amp; Asia</p>
              <div className="flex flex-wrap gap-2">
                {REGIONS.filter(r => r.continent !== 'Africa').map(({ flag, name }) => (
                  <div key={name} className="flex items-center gap-1.5 text-sm text-navy-600 bg-sky-light rounded-lg px-2.5 py-1.5">
                    <span>{flag}</span> {name}
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={onApply}
              className="inline-flex items-center gap-2 bg-gold-400 hover:bg-gold-500 text-white font-bold px-6 py-3 rounded-lg transition-all text-sm shadow-md hover:shadow-lg"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Start My Application <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="py-20 bg-sky-light border-t border-sky-border">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center mb-12">
            <p className="text-gold-400 text-xs font-semibold uppercase tracking-widest mb-2">Step by Step</p>
            <h2 className="text-3xl font-bold text-navy-700" style={{ fontFamily: "'Poppins', sans-serif" }}>
              How it works
            </h2>
            <p className="text-navy-500 mt-3 max-w-xl mx-auto text-sm">
              Four simple steps from sending your form to starting your new job in Luxembourg.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map(({ num, icon: Icon, title, desc }) => (
              <div key={num} className="bg-white border border-sky-border rounded-2xl p-6 hover:border-gold-300 hover:shadow-md transition-all group">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 bg-navy-700 group-hover:bg-gold-400 rounded-xl flex items-center justify-center transition-colors">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-3xl font-black text-sky-border" style={{ fontFamily: "'Poppins', sans-serif" }}>0{num}</span>
                </div>
                <h3 className="font-bold text-navy-700 mb-2 text-sm" style={{ fontFamily: "'Poppins', sans-serif" }}>{title}</h3>
                <p className="text-navy-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <button
              onClick={onApply}
              className="bg-gold-400 hover:bg-gold-500 text-white font-bold px-8 py-3.5 rounded-lg transition-all inline-flex items-center gap-2 shadow-md hover:shadow-lg text-sm"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              I'm Ready — Apply Now <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ── REQUIREMENTS ── */}
      <section id="requirements" className="py-20 bg-white border-t border-sky-border">
        <div className="max-w-6xl mx-auto px-5 grid lg:grid-cols-2 gap-14 items-start">
          <div>
            <p className="text-gold-400 text-xs font-semibold uppercase tracking-widest mb-3">Before You Apply</p>
            <h2 className="text-3xl font-bold text-navy-700 mb-4 leading-snug" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Documents you will need
            </h2>
            <p className="text-navy-500 leading-relaxed mb-8 text-sm">
              Get these ready before you start the form. Having them on hand means we can process your application faster.
            </p>
            <ul className="space-y-3">
              {DOCS.map(d => (
                <li key={d} className="flex items-start gap-3">
                  <ArrowUpRight className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
                  <span className="text-navy-600 text-sm">{d}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={onApply}
              className="mt-8 bg-gold-400 hover:bg-gold-500 text-white font-bold px-6 py-3 rounded-lg transition-all flex items-center gap-2 shadow-md hover:shadow-lg"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              I Have My Documents — Apply Now <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-5 mt-0 lg:mt-10">
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
              <h3 className="font-semibold text-amber-900 mb-2 text-sm" style={{ fontFamily: "'Poppins', sans-serif" }}>
                About the Immigration Fee
              </h3>
              <p className="text-amber-800 text-sm leading-relaxed">
                There is an official immigration processing fee. The exact amount depends on your country. We will give you clear instructions on how and where to pay — never pay anyone outside our official channels.
              </p>
            </div>
            <div className="bg-sky-light border border-sky-border rounded-2xl p-6">
              <h3 className="font-semibold text-navy-700 mb-2 text-sm" style={{ fontFamily: "'Poppins', sans-serif" }}>
                Important
              </h3>
              <p className="text-navy-500 text-sm leading-relaxed">
                All documents must be submitted and the fee must be paid before your application can move forward. Our team personally checks every application we receive.
              </p>
            </div>
            <div className="bg-navy-50 border border-navy-100 rounded-2xl p-6">
              <h3 className="font-semibold text-navy-700 mb-2 text-sm" style={{ fontFamily: "'Poppins', sans-serif" }}>
                Not sure? Just ask us
              </h3>
              <p className="text-navy-500 text-sm leading-relaxed">
                If you have any questions before applying, message us on WhatsApp. We reply every day and are happy to help you get started.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BAND ── */}
      <section className="bg-navy-700 text-white py-16">
        <div className="max-w-3xl mx-auto px-5 text-center">
          <p className="text-gold-300 text-xs font-semibold uppercase tracking-widest mb-3">Ready to Start?</p>
          <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Apply today — it only takes 10 minutes
          </h2>
          <p className="text-white/65 mb-8 text-sm">
            Fill in the form and our team will contact you within 3–5 working days with your next steps.
          </p>
          <button
            onClick={onApply}
            className="bg-gold-400 hover:bg-gold-500 text-white font-bold px-8 py-4 rounded-lg transition-all inline-flex items-center gap-2 shadow-lg hover:shadow-xl text-base"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Start My Free Application <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-20 bg-white border-t border-sky-border">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center mb-12">
            <p className="text-gold-400 text-xs font-semibold uppercase tracking-widest mb-2">Get In Touch</p>
            <h2 className="text-3xl font-bold text-navy-700" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Talk to Us
            </h2>
            <p className="text-navy-500 mt-3 text-sm">Have a question? Reach us on any of these channels — we reply every day.</p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto mb-12">
            {[
              { icon: Phone, label: 'WhatsApp / Call', value: '+352 000 000 000' },
              { icon: Mail, label: 'Email', value: 'info@luxcareerhelp.lu' },
              { icon: MapPin, label: 'Location', value: 'Luxembourg City, Luxembourg' },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="border border-sky-border rounded-2xl p-6 text-center hover:border-gold-300 hover:shadow-md transition-all group">
                <div className="w-12 h-12 bg-sky-light group-hover:bg-navy-700 rounded-xl flex items-center justify-center mx-auto mb-3 transition-colors">
                  <Icon className="w-5 h-5 text-navy-700 group-hover:text-gold-300 transition-colors" />
                </div>
                <p className="text-xs text-navy-400 uppercase tracking-wider mb-1 font-medium">{label}</p>
                <p className="text-sm font-semibold text-navy-700" style={{ fontFamily: "'Poppins', sans-serif" }}>{value}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {SOCIAL_BUTTONS.map(({ name, icon: Icon, url, bg }) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${bg} text-white flex items-center gap-2.5 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all`}
              >
                <Icon className="w-4 h-4" />
                {name}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-navy-800 text-navy-200 border-t border-navy-700">
        <div className="max-w-6xl mx-auto px-5 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
            <img src="/image.png" alt="LuxCareer Help" className="h-12 w-auto brightness-0 invert opacity-90" />
            <div className="flex flex-wrap justify-center gap-6">
              {NAV_LINKS.map(l => (
                <a key={l.label} href={l.href} className="text-navy-300 hover:text-gold-300 text-sm transition-colors">{l.label}</a>
              ))}
            </div>
            <div className="flex items-center gap-5">
              {SOCIAL.map(({ name, icon: Icon, url }) => (
                <a key={name} href={url} target="_blank" rel="noopener noreferrer" className="text-navy-400 hover:text-gold-300 transition-colors" title={name}>
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
          <div className="border-t border-navy-700 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-navy-400 text-xs">&copy; {new Date().getFullYear()} LuxCareer Help. All rights reserved.</p>
            <p className="text-navy-500 text-xs">Job Seeking &amp; Employee Relocation — Luxembourg</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
