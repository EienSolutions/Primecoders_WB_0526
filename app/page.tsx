'use client';

import { useEffect } from 'react';
import { useTheme } from '@/lib/theme-context';
import { NeonBackground } from '@/components/effects';
import { Nav } from '@/components/nav';
import { Hero } from '@/components/hero';
import { Pillars } from '@/components/pillars';
import { Lab } from '@/components/lab';
import { Vault } from '@/components/vault';
import { Stack } from '@/components/stack';
import { Contact } from '@/components/contact';
import {
  TweaksPanel, TweakSection, TweakSlider, TweakToggle, TweakRadio, TweakSelect, TweakColor,
} from '@/components/tweaks-panel';

const IS_DEV = process.env.NODE_ENV === 'development';

export default function Home() {
  const {
    lang, dark, density, heroCopy, primaryHex, glow, gridOpacity, showScan,
    setDensity, setHeroCopy, setPrimaryHex, setGlow, setGridOpacity, setShowScan,
  } = useTheme();

  // CSS variables on :root
  useEffect(() => {
    const r = document.documentElement.style;
    r.setProperty('--primary', primaryHex);
    r.setProperty('--glow', `${glow}px`);
    r.setProperty('--grid-opacity', `${gridOpacity / 100}`);
  }, [primaryHex, glow, gridOpacity]);

  // Density class on body
  useEffect(() => {
    document.body.classList.remove('density-compact', 'density-regular', 'density-comfy');
    document.body.classList.add(`density-${density}`);
  }, [density]);

  // Light/dark
  useEffect(() => {
    document.body.classList.toggle('light', !dark);
  }, [dark]);

  // Lang on <html>
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <>
      <NeonBackground />
      <style>{`
        .bg-grid{ background-image:
          linear-gradient(to right, color-mix(in oklab, var(--fg) calc(var(--grid-opacity, .04) * 100%), transparent) 1px, transparent 1px),
          linear-gradient(to bottom, color-mix(in oklab, var(--fg) calc(var(--grid-opacity, .04) * 100%), transparent) 1px, transparent 1px) !important; }
        .bg-scan{ display: ${showScan ? 'block' : 'none'} !important; }
      `}</style>

      <Nav />
      <main>
        <Hero />
        <Pillars />
        <Lab />
        <Vault />
        <Stack />
        <Contact />
      </main>

      {IS_DEV && (
        <TweaksPanel title="Tweaks · PrimeCoders">
          <TweakSection label={lang === 'en' ? 'Color · primary' : 'Color · primario'}>
            <TweakColor
              label={lang === 'en' ? 'Accent' : 'Acento'}
              value={primaryHex}
              options={['#CCFF00', '#00E5FF', '#B388FF', '#FF6E80', '#FFB454']}
              onChange={setPrimaryHex}
            />
          </TweakSection>

          <TweakSection label={lang === 'en' ? 'Glow · intensity' : 'Glow · intensidad'}>
            <TweakSlider label="Glow" value={glow} min={0} max={60} step={2} unit="px" onChange={setGlow} />
            <TweakSlider label="Grid" value={gridOpacity} min={0} max={14} step={1} unit="‰" onChange={setGridOpacity} />
            <TweakToggle label={lang === 'en' ? 'Scan line' : 'Scan line'} value={showScan} onChange={setShowScan} />
          </TweakSection>

          <TweakSection label={lang === 'en' ? 'Density' : 'Densidad'}>
            <TweakRadio
              label={lang === 'en' ? 'Spacing' : 'Espaciado'}
              value={density}
              options={['compact', 'regular', 'comfy']}
              onChange={setDensity}
            />
          </TweakSection>

          <TweakSection label="Hero · copy">
            <TweakSelect
              label={lang === 'en' ? 'Variant' : 'Variante'}
              value={heroCopy}
              options={[
                { value: 'default', label: 'Code. Data. Growth.' },
                { value: 'sharper', label: 'Ship. Read. Scale.' },
                { value: 'bold',    label: 'Build. Decide. Win.' },
              ]}
              onChange={setHeroCopy}
            />
          </TweakSection>
        </TweaksPanel>
      )}
    </>
  );
}
