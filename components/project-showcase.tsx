'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, X } from 'lucide-react';

const ProjectCubeScene = dynamic(() => import('./project-cube-scene').then(module => module.ProjectCubeScene), { ssr: false });

type Project = { title: string; category: string; summary: string; description: string; stack: string[]; href: string; position: string; flagship?: boolean };

const projects: Project[] = [
  { title: 'DualMind AI', category: 'AI Infrastructure', summary: 'Comparative LLM evaluation platform.', description: 'A production-grade platform that benchmarks frontier and open-source language models across factual reliability, safety, latency, cost efficiency, and conversational quality.', stack: ['Python', 'OpenAI', 'HuggingFace', 'Streamlit'], href: 'https://github.com/jaya-sri6/DualMind-AI', position: 'center', flagship: true },
  { title: 'Distributed API Gateway', category: 'Backend Infrastructure', summary: 'JWT routing, rate limiting, tracing.', description: 'A scalable API gateway with JWT authentication, Redis-backed sliding-window rate limiting, centralized logging, request tracing, and service management.', stack: ['Java', 'Spring Boot', 'Redis', 'JWT'], href: 'https://github.com/jaya-sri6/Distributed-API-Gateway-with-Authentication-and-Rate-Limiting', position: 'top' },
  { title: 'Concurrent URL Shortener', category: 'Distributed Systems', summary: 'High-throughput links with observability.', description: 'A production-ready shortener with JWT authentication, Redis caching, clickstream analytics, Prometheus metrics, and Grafana dashboards.', stack: ['Go', 'Redis', 'PostgreSQL', 'Prometheus'], href: 'https://github.com/jaya-sri6/Concurrent-URL-Shortener', position: 'upperLeft' },
  { title: 'AI Interview Simulator', category: 'AI Applications', summary: 'Real-time conversational evaluation.', description: 'A full-stack interview simulator supporting live AI conversations, Redis session management, intelligent summaries, and containerized deployment.', stack: ['FastAPI', 'React', 'Redis', 'OpenAI'], href: 'https://github.com/jaya-sri6/AI-Interview-Simulator', position: 'upperRight' },
  { title: 'Distributed Task Queue', category: 'Distributed Computing', summary: 'Reliable asynchronous task execution.', description: 'A distributed worker platform with worker pools, exponential-backoff retries, dead-letter queues, graceful shutdown, and horizontal scalability.', stack: ['Go', 'Redis', 'Docker', 'Workers'], href: 'https://github.com/jaya-sri6/Distributed-Task-Queue-System-', position: 'middleLeft' },
  { title: 'LLM Document Processing', category: 'RAG', summary: 'Document intelligence and semantic retrieval.', description: 'An insurance document intelligence platform with PDF ingestion, semantic chunking, vector embeddings, similarity search, and GPT-powered contextual reasoning.', stack: ['FastAPI', 'LangChain', 'GPT-4', 'Vector Search'], href: 'https://github.com/jaya-sri6/LLM-RAG-Based-Document-Processing-System', position: 'lowerLeft' },
  { title: 'Agentic Delivery Coordinator', category: 'Agentic AI', summary: 'Multi-agent logistics coordination.', description: 'A multi-agent framework combining coordinator and specialist agents for autonomous disruption management, ReAct reasoning, contextual memory, and explainable plans.', stack: ['Python', 'LangChain', 'ReAct', 'Tool Calling'], href: 'https://github.com/jaya-sri6/Agentic-Last-Mile-Delivery-Coordinator', position: 'lowerRight' },
];

const placements: Record<string, { x: string; y: string }> = {
  center: { x: '-50%', y: '-50%' },
  top: { x: '-50%', y: 'calc(-50% - var(--orbit-radius))' },
  upperLeft: { x: 'calc(-50% - var(--orbit-x))', y: 'calc(-50% - var(--orbit-y))' },
  upperRight: { x: 'calc(-50% + var(--orbit-x))', y: 'calc(-50% - var(--orbit-y))' },
  middleLeft: { x: '-50%', y: 'calc(-50% + var(--orbit-radius))' },
  lowerLeft: { x: 'calc(-50% - var(--orbit-x))', y: 'calc(-50% + var(--orbit-y))' },
  lowerRight: { x: 'calc(-50% + var(--orbit-x))', y: 'calc(-50% + var(--orbit-y))' },
};

export function ProjectShowcase() {
  const [deployed, setDeployed] = useState(false);
  const [selected, setSelected] = useState<Project | null>(null);
  const collapse = () => { setSelected(null); setDeployed(false); };

  return <section id="work" className="section project-systems">
    <div className="project-explorer-layout">
      <header className="project-explorer-heading">
        <p className="eyebrow">04 / PROJECT SYSTEMS</p>
        <h2>From prototypes to <span className="gradient-text">production.</span></h2>
        <p>Seven flagship systems and 30+ projects built across AI engineering, distributed systems, agentic workflows and production infrastructure.</p>
        <span className="project-explorer-divider" />
        <p className="project-explorer-heading__support">Iteration. Deployment. Production.</p>
      </header>

      <div className="project-explorer-stage" onClick={event => { if (event.target === event.currentTarget && deployed) collapse(); }}>
        <div className="grid absolute inset-0 opacity-30" />
        <div className="orb left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20" />
        <AnimatePresence mode="wait">
          {!deployed ? <motion.div key="cube" className="cube-stage-shell absolute inset-0" initial={{ opacity: 0, scale: .86 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: .72 }} transition={{ type: 'spring', stiffness: 150, damping: 19 }}><ProjectCubeScene onDeploy={() => setDeployed(true)} /></motion.div> : <motion.div key="formation" className="relative z-10 h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button onClick={collapse} className="absolute right-2 top-2 z-30 rounded-full border border-violet-200/30 bg-black/45 p-2 text-violet-100 transition hover:bg-violet-400/20" aria-label="Collapse project formation"><X size={17} /></button>
            <div className="project-orbit absolute left-1/2 top-1/2 h-[72%] w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-[50%]" />
            {projects.map((project, index) => <motion.button key={project.title} type="button" onClick={event => { event.stopPropagation(); setSelected(project); }} className={`project-tablet ${project.flagship ? 'project-tablet--flagship' : ''} left-1/2 top-1/2`} initial={{ opacity: 0, x: '-50%', y: '-50%', scale: .35 }} animate={{ opacity: selected && selected.title !== project.title ? .3 : 1, x: placements[project.position].x, y: placements[project.position].y, scale: project.flagship ? 1.12 : 1 }} transition={{ type: 'spring', stiffness: 125, damping: 18, delay: index * .05 }} whileHover={{ scale: project.flagship ? 1.2 : 1.08, y: project.flagship ? 'calc(-50% - 8px)' : `calc(${placements[project.position].y} - 8px)` }}><span className="project-tablet__glow" /><span className="project-tablet__category">{project.category}</span><strong>{project.title}</strong><span className="project-tablet__summary">{project.summary}</span><span className="project-tablet__open">OPEN <ArrowUpRight size={12} /></span></motion.button>)}
          </motion.div>}
        </AnimatePresence>
      </div>
    </div>

    <AnimatePresence>{selected && <motion.div className="project-detail-backdrop" onClick={() => setSelected(null)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><motion.article className="project-detail glass" onClick={event => event.stopPropagation()} initial={{ opacity: 0, scale: .88, y: 28 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: .92, y: 18 }} transition={{ type: 'spring', damping: 20, stiffness: 180 }}><button onClick={() => setSelected(null)} aria-label="Close project details" className="absolute right-5 top-5 text-zinc-300 transition hover:text-white"><X size={19} /></button><p className="eyebrow">{selected.category}</p><h3 className="mt-4 pr-8 text-3xl tracking-[-.06em] md:text-5xl">{selected.title}</h3><p className="mt-5 max-w-2xl text-sm leading-7 text-zinc-300">{selected.description}</p><div className="mt-7 flex flex-wrap gap-2">{selected.stack.map(tech => <span key={tech} className="rounded-full border border-violet-200/25 bg-violet-400/10 px-3 py-1.5 text-xs text-violet-100">{tech}</span>)}</div><a href={selected.href} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 rounded-full bg-violet-300 px-5 py-3 text-sm font-semibold text-black">View Repository <ArrowUpRight size={15} /></a></motion.article></motion.div>}</AnimatePresence>

    <div className="project-outro text-center"><p className="eyebrow">Project archive unlocked</p><h2 className="mt-6 text-5xl tracking-[-.07em] md:text-8xl">30+ Projects<br /><span className="gradient-text">Built.</span></h2><a href="https://github.com/jaya-sri6" target="_blank" rel="noreferrer" className="mt-9 inline-flex rounded-full border border-violet-200/40 bg-violet-400/10 px-6 py-3 text-sm text-violet-100">Explore Full GitHub Profile →</a></div>
  </section>;
}
