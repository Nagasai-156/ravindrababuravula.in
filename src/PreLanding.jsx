import React, { useState, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Stars,
  Sparkles,
  Float,
  Html,
  QuadraticBezierLine,
} from "@react-three/drei";
import * as THREE from "three";
import "./PreLanding.css";

// ---------------------------------------------------------------------------
// DATA
// ---------------------------------------------------------------------------
const BRANCHES = [
  {
    id: 1,
    text: "GATE CSE",
    sub: "Top Ranks",
    posDesk: [-6.2, 2.2, -2],
    posMob: [-1.8, 3.2, 0],
  },
  {
    id: 2,
    text: "Startups",
    sub: "Build & Scale",
    posDesk: [-3.2, 0.0, 1],
    posMob: [1.8, 1.2, 1],
  },
  {
    id: 3,
    text: "Career",
    sub: "Tech Jobs",
    posDesk: [0, -1.5, 2],
    posMob: [-1.8, -0.8, 1],
  },
  {
    id: 4,
    text: "Higher Ed",
    sub: "MS & PhD",
    posDesk: [3.2, 0.0, 1],
    posMob: [1.8, -2.8, 0],
  },
  {
    id: 5,
    text: "Finance",
    sub: "Algorithms",
    posDesk: [6.2, 2.2, -2],
    posMob: [0, -4.5, 0],
  },
];

const STAGE_HOOKS = [
  "Millions of students memorize syntax.",
  "Very few actually understand Computer Science.",
  "Stop merely surviving your courses.",
  "It all begins with one unbreakable foundation.",
  "One mentor. Every path unlocked.",
  "This is your transformation.",
  "",
];

const DURATIONS = [3500, 3500, 3500, 4000, 4500, 4500, 10000];

// ---------------------------------------------------------------------------
// 3D SCENE CONTROLLERS
// ---------------------------------------------------------------------------
function CameraController({ stage, isMobile }) {
  useFrame((state) => {
    let targetPos = new THREE.Vector3(0, 0, 15);

    // Continuous subtle cinematic drift to make the scene feel "alive"
    const driftX = Math.sin(state.clock.elapsedTime * 0.1) * 0.3;
    const driftY = Math.cos(state.clock.elapsedTime * 0.1) * 0.3;

    if (stage <= 2) {
      targetPos.set(driftX, driftY, 15);
    } else if (stage === 3) {
      targetPos.set(driftX, 1.5 + driftY, 12);
    } else if (stage === 4) {
      targetPos.set(
        driftX,
        (isMobile ? -1 : -0.5) + driftY,
        isMobile ? 18 : 14,
      );
    } else if (stage === 5) {
      // Large cinematic slow orbit sweeping around the tree
      targetPos.set(
        Math.sin(state.clock.elapsedTime * 0.2) * 3.5,
        (isMobile ? -1 : -0.5) + Math.sin(state.clock.elapsedTime * 0.1) * 1.5,
        (isMobile ? 18 : 14) + Math.cos(state.clock.elapsedTime * 0.2) * 2.5,
      );
    } else if (stage >= 6) {
      // Fly INTO the core
      targetPos.set(driftX, 1.5 + driftY, -2);
    }

    state.camera.position.lerp(targetPos, 0.03);
    // Looking slightly down moves the visual graph higher up the screen to avoid text overlap
    state.camera.lookAt(driftX * 0.2, isMobile ? -1.8 : -0.8, 0);
  });
  return null;
}

const CoreNode = ({ stage }) => {
  const coreRef = useRef();
  const innerRef = useRef();

  useFrame((state, delta) => {
    if (!coreRef.current) return;
    // Core appears in stage 3, swallows camera in stage 6
    const targetScale = stage >= 3 ? (stage >= 6 ? 20 : 1) : 0;
    coreRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.04,
    );

    if (innerRef.current) {
      innerRef.current.rotation.y -= delta * 0.4;
      innerRef.current.rotation.x += delta * 0.3;
    }
  });

  return (
    <group ref={coreRef} position={[0, 1.5, 0]}>
      <Float speed={2} rotationIntensity={1.5} floatIntensity={1.5}>
        {/* Outer Premium Gold/Dark Matter Diamond */}
        <mesh castShadow receiveShadow>
          <octahedronGeometry args={[1.2, 0]} />
          <meshPhysicalMaterial
            color="#050505"
            emissive="#d4af37"
            emissiveIntensity={0.6}
            roughness={0.15}
            metalness={1}
            wireframe={false}
          />
        </mesh>
        {/* Inner Glowing Structure */}
        <mesh ref={innerRef}>
          <icosahedronGeometry args={[1.6, 1]} />
          <meshBasicMaterial
            color="#ffffff"
            wireframe
            transparent
            opacity={0.15}
          />
        </mesh>
      </Float>

      {/* 2D HTML Label Pinned to Core */}
      <Html center position={[0, -2.5, 0]}>
        <div
          className={`core-label ${stage >= 3 && stage < 6 ? "visible" : ""}`}
        >
          <div className="core-name">Prof. RBR</div>
          <div className="core-title">SYSTEM CORE</div>
        </div>
      </Html>
    </group>
  );
};

const BranchNode = ({ data, stage, isMobile }) => {
  const ref = useRef();
  const pos = isMobile ? data.posMob : data.posDesk;
  const corePos = [0, 1.5, 0];

  // Dynamic bezier midpoint arching upwards
  const midX = (pos[0] + corePos[0]) / 2;
  const midY = (pos[1] + corePos[1]) / 2 + (isMobile ? 1.0 : 2.0);
  const midZ = (pos[2] + corePos[2]) / 2;

  useFrame(() => {
    if (!ref.current) return;
    const targetScale = stage >= 4 && stage < 6 ? 1 : 0;
    ref.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.05,
    );
  });

  return (
    <group>
      {/* 3D Glowing Curve Line */}
      <QuadraticBezierLine
        visible={stage >= 4 && stage < 6}
        start={corePos}
        end={pos}
        mid={[midX, midY, midZ]}
        color="#d4af37"
        lineWidth={1.5}
        transparent
        opacity={0.6}
        dashed={false}
      />

      <group ref={ref} position={pos}>
        <Float speed={3} rotationIntensity={2} floatIntensity={1.5}>
          {/* Branch Orb */}
          <mesh>
            <sphereGeometry args={[0.25, 32, 32]} />
            <meshPhysicalMaterial
              color="#ffffff"
              emissive="#d4af37"
              emissiveIntensity={0.5}
              roughness={0.1}
              metalness={0.8}
            />
          </mesh>
          {/* Aura */}
          <mesh>
            <sphereGeometry args={[0.45, 16, 16]} />
            <meshBasicMaterial
              color="#ffffff"
              wireframe
              transparent
              opacity={0.1}
            />
          </mesh>
        </Float>

        {/* Branch 2D HTML Card */}
        <Html center position={[0, -1.6, 0]}>
          <div
            className={`branch-card-3d ${stage >= 4 && stage < 6 ? "visible-card" : ""}`}
          >
            <h3 className="branch-title-3d">{data.text}</h3>
            <p className="branch-sub-3d">{data.sub}</p>
          </div>
        </Html>
      </group>
    </group>
  );
};

// ---------------------------------------------------------------------------
// MAIN COMPONENT
// ---------------------------------------------------------------------------
export default function PreLanding({ onComplete }) {
  const [stage, setStage] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  // Timeline progression
  useEffect(() => {
    if (stage >= 6) return;
    const t = setTimeout(() => setStage((s) => s + 1), DURATIONS[stage]);
    return () => clearTimeout(t);
  }, [stage]);

  const advance = () => {
    if (stage < 6) setStage((s) => s + 1);
  };

  // Wheel interaction
  useEffect(() => {
    let last = 0;
    const fn = (e) => {
      const now = Date.now();
      // Only throttle scroll changes by 800ms for slightly better responsiveness
      if (now - last > 800 && Math.abs(e.deltaY) > 20 && stage < 6) {
        setStage((s) => s + 1);
        last = now;
      }
    };
    window.addEventListener("wheel", fn);
    return () => window.removeEventListener("wheel", fn);
  }, [stage]);

  return (
    <div className="elegant-container" onClick={advance}>
      {/* jaw-dropping 3D Canvas Context */}
      <div className="canvas-wrapper">
        <Canvas
          camera={{ position: [0, 0, 15], fov: 60 }}
          dpr={[1, 2]} // Support high-DPI screens without melting GPUs
          performance={{ min: 0.5 }} // Allows dropping resolution defensively
        >
          {/* Lighting */}
          <ambientLight intensity={0.6} />
          <pointLight position={[5, 10, 5]} intensity={3} color="#ffffff" />
          <pointLight position={[-5, -10, -5]} intensity={2} color="#d4af37" />

          {/* Atmospheric Star Dust */}
          <Stars
            radius={100}
            depth={50}
            count={isMobile ? 1500 : 3500}
            factor={3}
            saturation={0}
            fade
            speed={0.5}
          />
          <Sparkles
            count={isMobile ? 80 : 150}
            scale={25}
            size={2.5}
            speed={0.2}
            opacity={0.3}
            color="#d4af37"
          />

          {/* Main Nodes */}
          <CoreNode stage={stage} />
          {BRANCHES.map((b) => (
            <BranchNode key={b.id} data={b} stage={stage} isMobile={isMobile} />
          ))}

          {/* Cinematic Camera Rig */}
          <CameraController stage={stage} isMobile={isMobile} />
        </Canvas>
      </div>

      {/* Cinematic Hook Overlays (Stages 0-2) */}
      <div className="hook-layer">
        {STAGE_HOOKS.slice(0, 3).map((hook, i) => (
          <h1 key={i} className={`hook-text ${stage === i ? "visible" : ""}`}>
            {hook}
          </h1>
        ))}
      </div>

      {/* Cinematic Subtitles (Stages 3-5) */}
      <div
        className={`bottom-subtitles ${stage >= 6 || stage < 3 ? "hidden" : ""}`}
      >
        <div className="subtitle-frame">
          {STAGE_HOOKS.slice(3, 6).map((hook, i) => (
            <p
              key={i + 3}
              className={`cinematic-sub ${stage === i + 3 ? "visible" : ""}`}
            >
              {hook}
            </p>
          ))}
        </div>
        <div className="scroll-indicator">click or scroll to continue</div>
      </div>

      {/* Final Reveal (Stage 6) */}
      <div className={`grand-reveal ${stage === 6 ? "active" : ""}`}>
        <div className="reveal-content">
          <p className="reveal-kicker">Welcome to the inner circle.</p>
          <h1 className="reveal-name">Prof. Ravindra Babu Ravula</h1>
          <div className="reveal-divider"></div>
          <p className="reveal-pillars">
            GATE CSE &nbsp;·&nbsp; Startups &nbsp;·&nbsp; Career &nbsp;·&nbsp;
            Higher Studies &nbsp;·&nbsp; Finance
          </p>
          <button
            className="elegant-enter-btn"
            onClick={(e) => {
              e.stopPropagation();
              onComplete();
            }}
          >
            Enter The Experience
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ marginLeft: 12 }}
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <div className="elegant-vignette" />
    </div>
  );
}
