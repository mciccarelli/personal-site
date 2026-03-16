'use client';

import { useRef, useEffect, useCallback } from 'react';
import * as THREE from 'three';

const vertexShader = `
  uniform float uTime;
  varying vec2 vUv;
  varying vec3 vNormal;

  void main() {
    vUv = uv;

    vec3 pos = position;

    // Gentle cloth wave — slow, layered sine waves
    float wave = sin(pos.x * 2.0 + uTime * 0.8) * 0.15;
    wave += sin(pos.y * 1.5 + uTime * 0.6) * 0.1;
    wave += sin((pos.x * 1.5 + pos.y) * 1.2 + uTime * 1.0) * 0.08;
    pos.z += wave;

    // Compute displaced normal for lighting
    float eps = 0.01;
    float waveX = sin((pos.x + eps) * 2.0 + uTime * 0.8) * 0.15
                + sin(pos.y * 1.5 + uTime * 0.6) * 0.1
                + sin(((pos.x + eps) * 1.5 + pos.y) * 1.2 + uTime * 1.0) * 0.08;
    float waveY = sin(pos.x * 2.0 + uTime * 0.8) * 0.15
                + sin((pos.y + eps) * 1.5 + uTime * 0.6) * 0.1
                + sin((pos.x * 1.5 + (pos.y + eps)) * 1.2 + uTime * 1.0) * 0.08;

    vec3 tangentX = vec3(eps, 0.0, waveX - wave);
    vec3 tangentY = vec3(0.0, eps, waveY - wave);
    vNormal = normalize(cross(tangentX, tangentY));

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uTexture;
  varying vec2 vUv;
  varying vec3 vNormal;

  void main() {
    vec4 texColor = texture2D(uTexture, vUv);

    // Soft directional light for subtle 3D shading
    vec3 lightDir = normalize(vec3(0.3, 0.5, 1.0));
    float diffuse = dot(vNormal, lightDir) * 0.5 + 0.5;
    float shading = mix(0.85, 1.05, diffuse);

    gl_FragColor = vec4(texColor.rgb * shading, texColor.a);
  }
`;

const IMG_WIDTH = 520;

interface ProjectImageProps {
  src: string;
  visible: boolean;
  className?: string;
}

export default function ProjectImage({ src, visible, className = '' }: ProjectImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const rafRef = useRef<number>(0);
  const hoverRef = useRef(0);
  const textureRef = useRef<THREE.Texture | null>(null);
  const initedRef = useRef(false);

  const animate = useCallback(() => {
    const material = materialRef.current;
    const renderer = rendererRef.current;
    const scene = sceneRef.current;
    const camera = cameraRef.current;
    if (!material || !renderer || !scene || !camera) return;

    material.uniforms.uTime.value += 0.016;

    const target = visible ? 1 : 0;
    hoverRef.current += (target - hoverRef.current) * 0.08;

    renderer.render(scene, camera);
    rafRef.current = requestAnimationFrame(animate);
  }, [visible]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || initedRef.current) return;
    initedRef.current = true;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const loader = new THREE.TextureLoader();
    loader.load(src, (texture) => {
      textureRef.current = texture;

      const imgAspect = texture.image.width / texture.image.height;
      const width = IMG_WIDTH;
      const height = width / imgAspect;

      renderer.setSize(width, height);
      container.style.width = `${width}px`;
      container.style.height = `${height}px`;

      // Perspective camera for real 3D depth
      const fov = 45;
      const aspect = width / height;
      const camera = new THREE.PerspectiveCamera(fov, aspect, 0.1, 100);
      // Position camera so the plane fills the view
      const planeH = 2;
      const planeW = planeH * imgAspect;
      const dist = planeH / (2 * Math.tan((fov * Math.PI) / 360));
      camera.position.z = dist * 1.1;
      cameraRef.current = camera;

      const material = new THREE.ShaderMaterial({
        uniforms: {
          uTexture: { value: texture },
          uTime: { value: 0 },
        },
        vertexShader,
        fragmentShader,
      });
      materialRef.current = material;

      const geometry = new THREE.PlaneGeometry(planeW, planeH, 48, 48);
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      rafRef.current = requestAnimationFrame(animate);
    });

    return () => {
      cancelAnimationFrame(rafRef.current);
      renderer.dispose();
      textureRef.current?.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      initedRef.current = false;
    };
  }, [src, animate]);

  useEffect(() => {
    if (initedRef.current && materialRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(animate);
    }
  }, [visible, animate]);

  return (
    <div
      ref={containerRef}
      className={className}
    />
  );
}
