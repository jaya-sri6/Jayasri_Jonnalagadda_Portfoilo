'use client';

import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

function CountUp({ value, suffix='' }: { value:number; suffix?:string }) { const ref=useRef<HTMLSpanElement>(null); const active=useInView(ref,{once:true,margin:'-80px'}); const [display,setDisplay]=useState(0); useEffect(()=>{if(!active)return; const start=performance.now(); const duration=1150; const tick=(now:number)=>{const progress=Math.min((now-start)/duration,1);const eased=1-Math.pow(1-progress,4);setDisplay(value*eased);if(progress<1)requestAnimationFrame(tick)};requestAnimationFrame(tick)},[active,value]); const text=value%1 ? display.toFixed(1) : Math.round(display).toString(); return <span ref={ref}>{text}{suffix}</span>; }
const stats=[{value:30,suffix:'+',label:'Projects Built'},{value:3,label:'Engineering Internships'},{value:9.5,suffix:' / 10',label:'CGPA'},{value:2026,label:'Graduation'}];
export function Statistics(){return <section className="section border-y border-white/8"><p className="eyebrow mb-12">02 / At a glance</p><div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-4">{stats.map((stat,i)=><motion.div initial={{opacity:0,y:18}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*.08}} className="bg-[#0a0a0b] p-6 md:p-9" key={stat.label}><div className="text-4xl tracking-[-.07em] md:text-6xl"><CountUp value={stat.value} suffix={stat.suffix}/></div><div className="mt-4 text-xs text-zinc-400">{stat.label}</div></motion.div>)}</div></section>;}
