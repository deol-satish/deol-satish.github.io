'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from './theme-provider';

const THEME_BG: Record<string, string> = {
  light: '#fafafa',
  dark: '#09090b',
  red: '#fef2f2',
  blue: '#eff6ff',
  green: '#f0fdf4',
  yellow: '#fefce8',
  forest: '#0a1410',
};

const THEME_STAR: Record<string, string> = {
  light: 'rgba(60, 60, 100, ALPHA)',
  dark: 'rgba(255, 255, 255, ALPHA)',
  red: 'rgba(180, 80, 80, ALPHA)',
  blue: 'rgba(80, 130, 230, ALPHA)',
  green: 'rgba(70, 180, 100, ALPHA)',
  yellow: 'rgba(190, 150, 60, ALPHA)',
  forest: 'rgba(170, 235, 140, ALPHA)',
};

type Star = {
  x: number;
  y: number;
  z: number; // depth 0..1 (closer = bigger / faster)
  baseAlpha: number;
  twinklePhase: number;
  twinkleSpeed: number;
};

type Shooting = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
};

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const { colorTheme } = useTheme();
  const themeRef = useRef(colorTheme);

  useEffect(() => {
    themeRef.current = colorTheme;
  }, [colorTheme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let stars: Star[] = [];
    let shootings: Shooting[] = [];
    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas!.width = Math.floor(width * dpr);
      canvas!.height = Math.floor(height * dpr);
      canvas!.style.width = width + 'px';
      canvas!.style.height = height + 'px';
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      const targetCount = Math.min(420, Math.floor((width * height) / 4500));
      stars = Array.from({ length: targetCount }, () => spawnStar());
    }

    function spawnStar(): Star {
      const z = Math.random();
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        z,
        baseAlpha: 0.35 + z * 0.65,
        twinklePhase: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.5 + Math.random() * 1.5,
      };
    }

    function maybeSpawnShooting() {
      if (shootings.length >= 2) return;
      if (Math.random() > 0.004) return;
      const startX = Math.random() * width * 0.6;
      const startY = Math.random() * height * 0.4;
      const angle = Math.PI * 0.18 + Math.random() * 0.12; // diagonal down-right
      const speed = 8 + Math.random() * 6;
      shootings.push({
        x: startX,
        y: startY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: 60 + Math.random() * 40,
      });
    }

    let lastT = performance.now();
    function frame(now: number) {
      const dt = Math.min(50, now - lastT) / 16.6667;
      lastT = now;

      const theme = themeRef.current;
      const bg = THEME_BG[theme] ?? '#09090b';
      const starColorTpl = THEME_STAR[theme] ?? THEME_STAR.dark;

      // Background fill
      ctx!.fillStyle = bg;
      ctx!.fillRect(0, 0, width, height);

      // Parallax mouse easing
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Stars
      for (const s of stars) {
        // drift slowly
        s.x -= (0.05 + s.z * 0.6) * dt;
        s.twinklePhase += s.twinkleSpeed * 0.02 * dt;
        if (s.x < -2) {
          s.x = width + 2;
          s.y = Math.random() * height;
        }

        const px = s.x + mouseX * (s.z * 14);
        const py = s.y + mouseY * (s.z * 14);
        const radius = 0.4 + s.z * 1.8;
        const twinkle = (Math.sin(s.twinklePhase) + 1) / 2; // 0..1
        const alpha = s.baseAlpha * (0.45 + twinkle * 0.55);
        ctx!.fillStyle = starColorTpl.replace('ALPHA', alpha.toFixed(3));
        ctx!.beginPath();
        ctx!.arc(px, py, radius, 0, Math.PI * 2);
        ctx!.fill();

        // halo on bright/close stars
        if (s.z > 0.85) {
          ctx!.fillStyle = starColorTpl.replace('ALPHA', (alpha * 0.15).toFixed(3));
          ctx!.beginPath();
          ctx!.arc(px, py, radius * 4, 0, Math.PI * 2);
          ctx!.fill();
        }
      }

      // Shooting stars
      maybeSpawnShooting();
      for (let i = shootings.length - 1; i >= 0; i--) {
        const s = shootings[i];
        s.x += s.vx * dt;
        s.y += s.vy * dt;
        s.life += dt;
        const t = s.life / s.maxLife;
        if (t >= 1 || s.x > width + 200 || s.y > height + 200) {
          shootings.splice(i, 1);
          continue;
        }
        const trailLen = 80;
        const tailX = s.x - s.vx * (trailLen / 10);
        const tailY = s.y - s.vy * (trailLen / 10);
        const grad = ctx!.createLinearGradient(s.x, s.y, tailX, tailY);
        const alpha = (1 - t) * 0.9;
        grad.addColorStop(0, starColorTpl.replace('ALPHA', alpha.toFixed(3)));
        grad.addColorStop(1, starColorTpl.replace('ALPHA', '0'));
        ctx!.strokeStyle = grad;
        ctx!.lineWidth = 1.5;
        ctx!.lineCap = 'round';
        ctx!.beginPath();
        ctx!.moveTo(s.x, s.y);
        ctx!.lineTo(tailX, tailY);
        ctx!.stroke();
      }

      rafRef.current = requestAnimationFrame(frame);
    }

    function onMouse(e: MouseEvent) {
      targetMouseX = (e.clientX / width - 0.5) * 2;
      targetMouseY = (e.clientY / height - 0.5) * 2;
    }
    function onLeave() {
      targetMouseX = 0;
      targetMouseY = 0;
    }

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouse);
    window.addEventListener('mouseleave', onLeave);

    rafRef.current = requestAnimationFrame(frame);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
      />
      <div aria-hidden className="aurora" />
      <div aria-hidden className="forest-overlay" />
    </>
  );
}
