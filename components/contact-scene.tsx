'use client';

import { FileDown, Github, Linkedin, Mail, MapPin, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

const email = 'jayasriijonnalagadda@gmail.com';
const particles = Array.from({ length: 48 }, (_, i) => ({ left: `${(i * 37) % 100}%`, top: `${(i * 61) % 100}%`, delay: (i % 9) * .33, size: i % 4 + 1 }));

function ContactCard({ icon, label, value, href, download }: { icon: React.ReactNode; label: string; value: string; href?: string; download?: boolean }) {
  const body = <><span className="mb-5 inline-flex rounded-xl border border-violet-200/20 bg-violet-400/10 p-2.5 text-violet-100">{icon}</span><span className="block text-[10px] uppercase tracking-[.16em] text-violet-200">{label}</span><strong className="mt-2 block text-sm font-medium text-zinc-100">{value}</strong></>;
  const classes = 'glass block min-h-36 rounded-2xl p-5 text-left transition hover:-translate-y-1 hover:border-violet-200/60 hover:bg-violet-400/10';
  return href ? <motion.a whileHover={{ y: -5 }} href={href} download={download} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noreferrer' : undefined} className={classes}>{body}</motion.a> : <div className={classes}>{body}</div>;
}

export function ContactScene() {
  const [copied, setCopied] = useState(false);
  const copy = async () => { await navigator.clipboard.writeText(email); setCopied(true); window.setTimeout(() => setCopied(false), 1800); };
  return <section id="connect" className="relative overflow-hidden border-t border-white/10 px-5 py-28 md:px-10">
    <div className="absolute inset-0 opacity-45 [background-image:radial-gradient(circle_at_20%_30%,rgba(167,139,250,.5)_1px,transparent_1.5px),linear-gradient(125deg,transparent_49.8%,rgba(167,139,250,.14)_50%,transparent_50.2%)] [background-size:62px_62px,180px_120px]" />
    {particles.map((p, i) => <motion.i key={i} animate={{ opacity: [.15, .9, .15], scale: [.6, 1.3, .6], y: [0, -18, 0] }} transition={{ duration: 2.4 + i % 3, delay: p.delay, repeat: Infinity }} className="absolute rounded-full bg-violet-200 shadow-[0_0_12px_2px_rgba(196,162,255,.75)]" style={{ left: p.left, top: p.top, width: p.size, height: p.size }} />)}
    <div className="relative mx-auto max-w-5xl text-center"><p className="eyebrow">07 / CONNECT</p><h2 className="mt-7 text-5xl leading-[.93] tracking-[-.07em] md:text-7xl">Let&apos;s build something <span className="gradient-text">meaningful together.</span></h2><p className="mx-auto mt-7 max-w-2xl text-sm leading-7 text-zinc-400">Available for AI engineering, backend systems, agentic workflows, product engineering, and ambitious technical problems.</p>
      <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-12 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        <ContactCard icon={<Mail size={17} />} label="Email" value={email} href={`mailto:${email}`} />
        <ContactCard icon={<Linkedin size={17} />} label="LinkedIn" value="Connect professionally" href="https://www.linkedin.com/in/jayasri-jonnalagadda-5b86a2379" />
        <ContactCard icon={<Github size={17} />} label="GitHub" value="Explore engineering work" href="https://github.com/jaya-sri6" />
        <ContactCard icon={<FileDown size={17} />} label="Resume" value="Download profile" href="/jayasri-jonnalagadda-resume.pdf" download />
        <ContactCard icon={<MapPin size={17} />} label="Location" value="Chennai, India" />
        <ContactCard icon={<Sparkles size={17} />} label="Availability" value="Open to opportunities" />
      </motion.div>
      <div className="mt-8 flex flex-wrap justify-center gap-3"><a href={`mailto:${email}`} className="rounded-full bg-white px-5 py-3 text-xs font-semibold text-black transition hover:bg-violet-300">Send Email</a><a href="https://www.linkedin.com/in/jayasri-jonnalagadda-5b86a2379" target="_blank" rel="noreferrer" className="glass rounded-full px-5 py-3 text-xs">View LinkedIn</a><a href="https://github.com/jaya-sri6" target="_blank" rel="noreferrer" className="glass rounded-full px-5 py-3 text-xs">Open GitHub</a><a href="/jayasri-jonnalagadda-resume.pdf" download className="glass rounded-full px-5 py-3 text-xs">Download Resume</a></div>
      <button onClick={copy} className="mt-7 text-[10px] tracking-[.14em] text-violet-200 transition hover:text-white">{copied ? 'EMAIL COPIED' : 'COPY EMAIL ADDRESS'}</button><p className="mt-16 text-[10px] tracking-[.18em] text-zinc-600">© 2026 JAYASRI JONNALAGADDA · ENGINEERED WITH INTENTION</p>
    </div>
  </section>;
}
