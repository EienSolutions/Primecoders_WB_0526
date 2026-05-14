'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

// Animated grid + spotlights background
export function NeonBackground() {
  return (
    <div className="bg-fixed" aria-hidden="true">
      <div className="bg-grid" />
      <div className="bg-spot" />
      <div className="bg-spot b" />
      <div className="bg-scan" />
      <div className="bg-noise" />
    </div>
  );
}

export interface TyperLine {
  text: string;
  cls?: string;
}

export interface TyperProps {
  lines:       TyperLine[];
  speed?:      number;
  startDelay?: number;
  loop?:       boolean;
  onDone?:     () => void;
}

// Typewriter for hero — supports multiple lines, with token classes
export function Typer({ lines, speed = 22, startDelay = 200, loop = false, onDone }: TyperProps) {
  const [shown, setShown] = useState<string[]>(lines.map(() => ''));
  const [i, setI]         = useState(0);
  const [c, setC]         = useState(0);
  const done              = i >= lines.length;

  useEffect(() => {
    if (!done) return;
    if (onDone) onDone();
    if (!loop) return;
    const t = setTimeout(() => {
      setShown(lines.map(() => ''));
      setI(0); setC(0);
    }, 2400);
    return () => clearTimeout(t);
  }, [done, loop, lines, onDone]);

  useEffect(() => {
    if (done) return;
    const target = lines[i].text;
    if (c >= target.length) {
      const t = setTimeout(() => { setI((x) => x + 1); setC(0); }, 280);
      return () => clearTimeout(t);
    }
    const delay = c === 0 && i === 0 ? startDelay : (speed + Math.random() * 18);
    const t = setTimeout(() => {
      setShown((prev) => {
        const next = prev.slice();
        next[i] = target.slice(0, c + 1);
        return next;
      });
      setC((x) => x + 1);
    }, delay);
    return () => clearTimeout(t);
  }, [i, c, lines, speed, startDelay, done]);

  return (
    <>
      {lines.map((l, idx) => (
        <div key={idx} className={`typer-line ${l.cls || ''}`} style={{ minHeight: '1.2em' }}>
          {shown[idx]}
          {idx === i && !done && <span className="cursor" />}
          {idx === lines.length - 1 && done && <span className="cursor" />}
        </div>
      ))}
    </>
  );
}

export interface CountUpProps {
  to:        number;
  prefix?:   string;
  suffix?:   string;
  duration?: number;
  decimals?: number;
}

export function CountUp({ to, prefix = '', suffix = '', duration = 1400, decimals = 0 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [val, setVal] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const t0 = performance.now();
          const tick = (t: number) => {
            const k = Math.min(1, (t - t0) / duration);
            const eased = 1 - Math.pow(1 - k, 3);
            setVal(to * eased);
            if (k < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);
  const formatted = decimals === 0 ? Math.round(val).toLocaleString() : val.toFixed(decimals);
  return <span ref={ref}>{prefix}{formatted}{suffix}</span>;
}

export interface SparklineProps {
  width?:  number;
  height?: number;
  color?:  string;
  points?: number;
  speed?:  number;
  fill?:   boolean;
  seed?:   number;
}

export function Sparkline({
  width = 240, height = 60, color = 'var(--primary)', points = 40, speed = 1100, fill = true, seed = 1,
}: SparklineProps) {
  const [data, setData] = useState<number[]>(() => {
    let v = 50; const out: number[] = [];
    let r = seed;
    for (let i = 0; i < points; i++) {
      r = (r * 9301 + 49297) % 233280;
      v += (r / 233280 - 0.5) * 18;
      v = Math.max(8, Math.min(92, v));
      out.push(v);
    }
    return out;
  });
  useEffect(() => {
    const id = setInterval(() => {
      setData((prev) => {
        const v = prev[prev.length - 1] + (Math.random() - 0.5) * 16;
        return [...prev.slice(1), Math.max(8, Math.min(92, v))];
      });
    }, speed);
    return () => clearInterval(id);
  }, [speed]);
  const xStep = width / (points - 1);
  const path = data
    .map((v, i) => `${i === 0 ? 'M' : 'L'} ${(i * xStep).toFixed(1)} ${(height - (v / 100) * height).toFixed(1)}`)
    .join(' ');
  const area = `${path} L ${width} ${height} L 0 ${height} Z`;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id={`g-${seed}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity=".35" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {fill && <path d={area} fill={`url(#g-${seed})`} />}
      <path d={path} fill="none" stroke={color} strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round" />
      <circle
        cx={(points - 1) * xStep}
        cy={height - (data[data.length - 1] / 100) * height}
        r="3" fill={color}
      >
        <animate attributeName="r" values="3;5;3" dur="1.4s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

export interface BarsProps {
  values:  number[];
  color?:  string;
  width?:  number;
  height?: number;
  gap?:    number;
}

export function Bars({ values, color = 'var(--primary)', width = 220, height = 60, gap = 4 }: BarsProps) {
  const [vs, setVs] = useState<number[]>(values);
  useEffect(() => {
    const id = setInterval(() => {
      setVs((p) => p.map((v) => Math.max(10, Math.min(100, v + (Math.random() - 0.5) * 24))));
    }, 1400);
    return () => clearInterval(id);
  }, []);
  const bw = (width - gap * (vs.length - 1)) / vs.length;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      {vs.map((v, i) => (
        <rect key={i}
          x={i * (bw + gap)}
          y={height - (v / 100) * height}
          width={bw}
          height={(v / 100) * height}
          fill={color} opacity={0.4 + (v / 200)}>
          <animate attributeName="height" dur="1.2s" />
        </rect>
      ))}
    </svg>
  );
}

export interface DataFlowProps {
  direction?: 'x' | 'y';
  color?:     string;
}

export function DataFlow({ direction = 'x', color = 'var(--primary)' }: DataFlowProps) {
  return (
    <div className="dataflow" aria-hidden="true" style={{
      position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none',
    }}>
      <div style={{
        position: 'absolute',
        ...(direction === 'x'
          ? { top: '50%', left: '-30%', width: '30%', height: '1px', transform: 'translateY(-50%)' }
          : { left: '50%', top: '-30%', height: '30%', width: '1px', transform: 'translateX(-50%)' }),
        background: `linear-gradient(${direction === 'x' ? 'to right' : 'to bottom'}, transparent, ${color}, transparent)`,
        animation: `${direction === 'x' ? 'flow-x' : 'drift-y'} 3.5s linear infinite`,
      }} />
    </div>
  );
}

export function AsciiBlock({ children }: { children: ReactNode }) {
  return (
    <pre style={{
      fontFamily: 'var(--mono)', fontSize: 10, lineHeight: 1.15,
      color: 'var(--fg-4)', margin: 0, userSelect: 'none', whiteSpace: 'pre',
    }}>{children}</pre>
  );
}

export interface LiveBadgeProps {
  label:  string;
  value:  string;
  color?: string;
}

export function LiveBadge({ label, value, color = 'var(--ok)' }: LiveBadgeProps) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 10,
      padding: '8px 12px', borderRadius: 999,
      border: '1px solid var(--line-strong)', background: 'rgba(255,255,255,.02)',
      fontFamily: 'var(--mono)', fontSize: 11,
    }}>
      <span className="dot pulse" style={{ background: color, boxShadow: `0 0 10px ${color}` }} />
      <span style={{ color: 'var(--fg-3)' }}>{label}</span>
      <span style={{ color: 'var(--fg)' }}>{value}</span>
    </div>
  );
}
