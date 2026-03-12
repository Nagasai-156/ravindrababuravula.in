import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * mvPosition;
}
`;

const fragmentShader = `
uniform float uTime;
varying vec2 vUv;

void main() {
    vec2 p = vUv * 2.0 - 1.0;
    
    float t = uTime * 0.15;
    vec2 uv = p;
    
    for(float i = 1.0; i < 6.0; i++) {
        uv.x += 0.5 / i * cos(i * 2.0 * uv.y + t);
        uv.y += 0.5 / i * cos(i * 1.5 * uv.x + t);
    }
    
    float wave = length(uv);
    
    vec3 bg = vec3(0.02, 0.02, 0.02);
    vec3 gold = vec3(1.0, 0.72, 0.01);
    
    float intensity = abs(1.0 / (30.0 * wave));
    vec3 color = mix(bg, gold * intensity * 0.8, 0.5);
    
    gl_FragColor = vec4(color, 1.0);
}
`;

function ShaderPlane() {
  const mesh = useRef();
  
  const uniforms = useMemo(() => ({
    uTime: { value: 0 }
  }), []);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.material.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={mesh}>
      <planeGeometry args={[10, 10]} />
      <shaderMaterial 
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export default function HeroShader() {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, overflow: 'hidden', opacity: 0.8 }}>
      <Canvas style={{ background: '#050505' }}>
        <ambientLight intensity={1.0} />
        <ShaderPlane />
      </Canvas>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to bottom, transparent 60%, #050505 100%)', pointerEvents: 'none' }} />
    </div>
  );
}
