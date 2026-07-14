'use client';

import { Canvas, ThreeEvent, useFrame } from '@react-three/fiber';
import { Edges, Html } from '@react-three/drei';
import { useRef, useState } from 'react';
import * as THREE from 'three';

type FaceLabelProps = { category: string; title: string; detail: string; position: [number, number, number]; rotation: [number, number, number] };

function FaceLabel({ category, title, detail, position, rotation }: FaceLabelProps) {
  const face = useRef<THREE.Group>(null);
  useFrame(({ camera }) => {
    if (!face.current) return;
    const point = new THREE.Vector3();
    const quaternion = new THREE.Quaternion();
    const normal = new THREE.Vector3(0, 0, 1);
    face.current.getWorldPosition(point);
    face.current.getWorldQuaternion(quaternion);
    normal.applyQuaternion(quaternion);
    face.current.visible = normal.dot(new THREE.Vector3().subVectors(camera.position, point)) > .08;
  });

  return <group ref={face} position={position} rotation={rotation}>
    <Html transform center distanceFactor={5.2} style={{ pointerEvents: 'none', backfaceVisibility: 'hidden' }}>
      <div className="cube-webgl-label">
        <span className="cube-webgl-label__category">{category}</span>
        <strong>{title}</strong>
        <span className="cube-webgl-label__detail">{detail}</span>
        <i className="cube-webgl-label__nodes"><b /><b /><b /></i>
      </div>
    </Html>
  </group>;
}

function HolographicCube({ onDeploy }: { onDeploy: () => void }) {
  const group = useRef<THREE.Group>(null);
  const dragging = useRef(false);
  const moved = useRef(false);
  const last = useRef({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const corners: [number, number, number][] = [-1, 1].flatMap(x => [-1, 1].flatMap(y => [-1, 1].map(z => [x * 1.13, y * 1.13, z * 1.13] as [number, number, number])));

  useFrame((state, delta) => {
    if (!group.current) return;
    if (!dragging.current) group.current.rotation.y += delta * .2;
    group.current.rotation.x += (-.559 + Math.sin(state.clock.elapsedTime * .7) * .12 - group.current.rotation.x) * delta * 1.4;
    group.current.position.y = Math.sin(state.clock.elapsedTime * .9) * .12 + (hovered ? .13 : 0);
    const scale = hovered ? 1.08 : 1;
    group.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 1 - Math.exp(-delta * 8));
  });

  const down = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    dragging.current = true;
    moved.current = false;
    last.current = { x: event.clientX, y: event.clientY };
    (event.target as HTMLElement).setPointerCapture(event.pointerId);
  };
  const move = (event: ThreeEvent<PointerEvent>) => {
    if (!dragging.current || !group.current) return;
    const dx = event.clientX - last.current.x;
    const dy = event.clientY - last.current.y;
    if (Math.abs(dx) + Math.abs(dy) > 2) moved.current = true;
    group.current.rotation.y += dx * .012;
    group.current.rotation.x += dy * .008;
    last.current = { x: event.clientX, y: event.clientY };
  };
  const up = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    dragging.current = false;
    (event.target as HTMLElement).releasePointerCapture(event.pointerId);
    if (!moved.current) onDeploy();
  };

  return <group ref={group} rotation={[-.559, .436, 0]}>
    <mesh renderOrder={1} onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
      <boxGeometry args={[2.25, 2.25, 2.25]} />
      <meshPhysicalMaterial attach="material-0" color="#5b2eff" emissive="#3b1599" emissiveIntensity={hovered ? 1.65 : 1.1} metalness={.5} roughness={.16} transmission={.18} thickness={.45} ior={1.35} />
      <meshPhysicalMaterial attach="material-1" color="#7c4dff" emissive="#5423c5" emissiveIntensity={hovered ? 1.75 : 1.18} metalness={.52} roughness={.14} transmission={.2} thickness={.45} ior={1.35} />
      <meshPhysicalMaterial attach="material-2" color="#9d7cff" emissive="#6742db" emissiveIntensity={hovered ? 1.8 : 1.28} metalness={.58} roughness={.12} transmission={.22} thickness={.45} ior={1.35} />
      <meshPhysicalMaterial attach="material-3" color="#24105a" emissive="#1a073f" emissiveIntensity={.72} metalness={.46} roughness={.18} transmission={.16} thickness={.45} ior={1.35} />
      <meshPhysicalMaterial attach="material-4" color="#8e63ff" emissive="#6331d3" emissiveIntensity={hovered ? 1.85 : 1.3} metalness={.56} roughness={.12} transmission={.22} thickness={.45} ior={1.35} />
      <meshPhysicalMaterial attach="material-5" color="#2a105f" emissive="#190538" emissiveIntensity={.72} metalness={.46} roughness={.18} transmission={.16} thickness={.45} ior={1.35} />
      <Edges renderOrder={3} color={hovered ? '#b9fbff' : '#62f4ff'} threshold={15} scale={1.012} />
    </mesh>
    <mesh renderOrder={0}><boxGeometry args={[1.82, 1.82, 1.82]} /><meshPhysicalMaterial color="#7c4dff" emissive="#5b2eff" emissiveIntensity={1.9} transparent opacity={.28} roughness={.08} metalness={.2} /></mesh>
    <mesh><sphereGeometry args={[.42, 28, 28]} /><meshBasicMaterial color="#d7c7ff" transparent opacity={.84} /><pointLight color="#9d7cff" intensity={20} distance={5} /></mesh>
    {corners.map((position, index) => <mesh key={index} position={position} renderOrder={4}><sphereGeometry args={[.055, 12, 12]} /><meshBasicMaterial color="#7ef9ff" /><pointLight color={index % 2 ? '#62f4ff' : '#9d7cff'} intensity={2.5} distance={1.25} /></mesh>)}
    <FaceLabel category="AI INFRASTRUCTURE" title="DUALMIND AI" detail="Comparative model intelligence" position={[0, 0, 1.145]} rotation={[0, 0, 0]} />
    <FaceLabel category="BACKEND INFRASTRUCTURE" title="API GATEWAY" detail="Secure service routing" position={[1.145, 0, 0]} rotation={[0, Math.PI / 2, 0]} />
    <FaceLabel category="DISTRIBUTED SYSTEMS" title="URL SHORTENER" detail="High-throughput links" position={[-1.145, 0, 0]} rotation={[0, -Math.PI / 2, 0]} />
    <FaceLabel category="AGENTIC AI" title="DELIVERY COORDINATOR" detail="Autonomous coordination" position={[0, 1.145, 0]} rotation={[-Math.PI / 2, 0, 0]} />
    <FaceLabel category="RAG PLATFORM" title="DOCUMENT PROCESSING" detail="Semantic retrieval system" position={[0, -1.145, 0]} rotation={[Math.PI / 2, 0, 0]} />
    <FaceLabel category="AI APPLICATIONS" title="AI INTERVIEW" detail="Live evaluation engine" position={[0, 0, -1.145]} rotation={[0, Math.PI, 0]} />
  </group>;
}

export function ProjectCubeScene({ onDeploy }: { onDeploy: () => void }) {
  return <div className="project-cube-canvas" aria-label="Interactive 3D project cube. Drag to rotate or click to deploy projects.">
    <Canvas dpr={1} shadows={false} camera={{ position: [0, 0, 6.3], fov: 38 }} gl={{ antialias: false, powerPreference: 'high-performance', alpha: true }}>
      <ambientLight intensity={.65} />
      <pointLight position={[4, 3, 4]} color="#8e57ff" intensity={16} distance={10} />
      <pointLight position={[-4, -2, 3]} color="#32d8ff" intensity={9} distance={9} />
      <HolographicCube onDeploy={onDeploy} />
    </Canvas>
    <div className="cube-activation-hint"><i />TAP TO UNLOCK</div>
  </div>;
}
