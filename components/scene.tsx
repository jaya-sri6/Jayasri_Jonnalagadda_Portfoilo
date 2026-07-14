'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Float, Lightformer } from '@react-three/drei';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const DESKTOP_PARTICLES = 3200;
const MOBILE_PARTICLES = 700;

function CameraRig() {
  const { camera, pointer } = useThree(); const scroll = useRef(0);
  useEffect(() => { const update = () => { scroll.current = Math.min(window.scrollY / window.innerHeight, 1); }; window.addEventListener('scroll', update, { passive: true }); return () => window.removeEventListener('scroll', update); }, []);
  useFrame((_, delta) => { const t = scroll.current; const target = new THREE.Vector3(pointer.x * .22, pointer.y * .14 - t * .3, 6.1 + t * .55); camera.position.lerp(target, 1 - Math.exp(-delta * 2.4)); camera.lookAt(0, -t * .08, 0); });
  return null;
}

function ParticleField({ count }: { count:number }) {
  const particles = useRef<THREE.InstancedMesh>(null);
  const group = useRef<THREE.Group>(null);
  useLayoutEffect(() => { if (!particles.current) return; const dummy = new THREE.Object3D(); for (let i = 0; i < count; i++) { const r = 2.4 + Math.pow(Math.random(), .5) * 10; const theta = Math.random() * Math.PI * 2; dummy.position.set(Math.cos(theta) * r, (Math.random() - .5) * 7, Math.sin(theta) * r - 2); const scale = .35 + Math.random() * .9; dummy.scale.setScalar(scale); dummy.updateMatrix(); particles.current.setMatrixAt(i, dummy.matrix); } particles.current.instanceMatrix.needsUpdate = true; }, [count]);
  useFrame((_, delta) => { if (group.current) { group.current.rotation.y += delta * .012; group.current.rotation.z += delta * .003; } });
  return <group ref={group}><instancedMesh ref={particles} args={[undefined, undefined, count]} frustumCulled><circleGeometry args={[.018, 5]}/><meshBasicMaterial color="#c4adff" transparent opacity={.72} depthWrite={false}/></instancedMesh></group>;
}

function NeuralStar({ mobile }: { mobile:boolean }) {
  const group = useRef<THREE.Group>(null); const inner = useRef<THREE.Mesh>(null);
  useFrame((state, delta) => { if (!group.current || !inner.current) return; group.current.rotation.y += delta * .11; group.current.rotation.z = Math.sin(state.clock.elapsedTime * .33) * .16; group.current.position.y = Math.sin(state.clock.elapsedTime * .75) * .12; inner.current.rotation.x -= delta * .08; });
  return <Float speed={.75} rotationIntensity={.18} floatIntensity={.35}><group ref={group} scale={mobile ? 1.1 : 1.45}><mesh ref={inner}><icosahedronGeometry args={[1, mobile ? 1 : 2]}/><meshPhysicalMaterial color="#d8d9e8" metalness={1} roughness={.13} envMapIntensity={2.8} clearcoat={1} clearcoatRoughness={.08}/></mesh><mesh scale={1.16}><icosahedronGeometry args={[1, mobile ? 1 : 2]}/><meshPhysicalMaterial color="#6d31d8" metalness={.85} roughness={.22} wireframe transparent opacity={.72} envMapIntensity={3}/></mesh><pointLight color="#9e69ff" intensity={mobile ? 10 : 18} distance={6}/></group></Float>;
}

export function Scene() { const [mobile,setMobile]=useState(false); useEffect(()=>{const media=window.matchMedia('(max-width: 767px), (pointer: coarse)');const update=()=>setMobile(media.matches);update();media.addEventListener('change',update);return()=>media.removeEventListener('change',update)},[]); return <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true"><Canvas shadows={false} dpr={1} performance={{ min: mobile ? .45 : .65 }} camera={{ position: [0, 0, mobile ? 6.8 : 6.1], fov: mobile ? 48 : 42 }} gl={{ antialias: false, powerPreference: 'high-performance', stencil: false, depth: true }}><color attach="background" args={['#050505']}/><ambientLight intensity={.18}/><pointLight position={[-4, 2, 4]} color="#c8aaff" intensity={mobile ? 9 : 14}/><pointLight position={[4, -2, 2]} color="#5924cc" intensity={mobile ? 7 : 10}/><Environment resolution={mobile ? 32 : 64}><Lightformer form="ring" color="#b28cff" intensity={mobile ? 3 : 5} scale={4} position={[0, 2, 2]} /></Environment><NeuralStar mobile={mobile}/><ParticleField count={mobile ? MOBILE_PARTICLES : DESKTOP_PARTICLES}/><CameraRig/><EffectComposer enabled={!mobile} multisampling={0}><Bloom luminanceThreshold={.7} mipmapBlur intensity={.4} radius={.45}/></EffectComposer></Canvas></div>; }
