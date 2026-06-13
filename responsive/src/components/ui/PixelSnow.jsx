import { useEffect, useRef } from "react";
import * as THREE from "three";

const vertexShader = `
  attribute float aSize;
  attribute float aSpeed;
  attribute float aOffset;
  uniform float uTime;
  uniform float uSpeed;
  uniform float uDirection;
  uniform float uFarPlane;
  varying float vDepthFade;

  void main() {
    vec3 pos = position;

    float t = uTime * uSpeed * aSpeed + aOffset;
    pos.x += sin(uDirection) * t;
    pos.y -= cos(uDirection) * t;

    pos.x = mod(pos.x + 50.0, 100.0) - 50.0;
    pos.y = mod(pos.y + 50.0, 100.0) - 50.0;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = aSize * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;

    vDepthFade = clamp((-mvPosition.z) / uFarPlane, 0.0, 1.0);
  }
`;

const fragmentShader = `
  uniform vec3 uColor;
  uniform float uBrightness;
  uniform float uGamma;
  uniform float uDepthFadeAmount;
  uniform int uVariant;
  varying float vDepthFade;

  void main() {
    vec2 uv = gl_PointCoord - vec2(0.5);
    float alpha = 1.0;

    if (uVariant == 0) {
      float dist = length(uv);
      alpha = smoothstep(0.5, 0.0, dist);
    } else {
      vec2 a = abs(uv);
      alpha = step(max(a.x, a.y), 0.5);
    }

    float fade = 1.0 - vDepthFade * (uDepthFadeAmount / 20.0);
    fade = clamp(fade, 0.0, 1.0);

    vec3 color = pow(uColor * uBrightness, vec3(uGamma));
    gl_FragColor = vec4(color, alpha * fade);
  }
`;

export default function PixelSnow({
  color = "#ffffff",
  flakeSize = 0.009,
  minFlakeSize = 0.5,
  pixelResolution = 275,
  speed = 3.6,
  depthFade = 20,
  farPlane = 20,
  brightness = 10.2,
  gamma = 0.1,
  density = 0.6,
  variant = "square",
  direction = 280,
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
    camera.position.z = 10;

    const scene = new THREE.Scene();

    const count = Math.max(1, Math.floor(pixelResolution * density));
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const speeds = new Float32Array(count);
    const offsets = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 2] = -Math.random() * farPlane;

      sizes[i] = minFlakeSize + Math.random() * (flakeSize * 1000);
      speeds[i] = 0.5 + Math.random();
      offsets[i] = Math.random() * 50;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute("aSpeed", new THREE.BufferAttribute(speeds, 1));
    geometry.setAttribute("aOffset", new THREE.BufferAttribute(offsets, 1));

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uSpeed: { value: speed },
        uDirection: { value: (direction * Math.PI) / 180 },
        uColor: { value: new THREE.Color(color) },
        uBrightness: { value: brightness },
        uGamma: { value: gamma },
        uFarPlane: { value: farPlane },
        uDepthFadeAmount: { value: depthFade },
        uVariant: { value: variant === "square" ? 1 : 0 },
      },
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const resize = () => {
      const { clientWidth, clientHeight } = container;
      if (!clientWidth || !clientHeight) return;
      renderer.setSize(clientWidth, clientHeight);
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(container);

    const clock = new THREE.Clock();
    let raf = 0;

    const animate = () => {
      material.uniforms.uTime.value = clock.getElapsedTime();
      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [color, flakeSize, minFlakeSize, pixelResolution, speed, depthFade, farPlane, brightness, gamma, density, variant, direction]);

  return <div ref={containerRef} className="w-full h-full" />;
}
