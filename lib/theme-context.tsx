'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Lang } from './i18n';

export type Density  = 'compact' | 'regular' | 'comfy';
export type HeroCopy = 'default' | 'sharper' | 'bold';

export interface ThemeValues {
  lang:        Lang;
  dark:        boolean;
  density:     Density;
  heroCopy:    HeroCopy;
  primaryHex:  string;
  glow:        number;
  gridOpacity: number;
  showScan:    boolean;
}

export interface ThemeContextType extends ThemeValues {
  setLang:        (v: Lang)     => void;
  setDark:        (v: boolean)  => void;
  setDensity:     (v: Density)  => void;
  setHeroCopy:    (v: HeroCopy) => void;
  setPrimaryHex:  (v: string)   => void;
  setGlow:        (v: number)   => void;
  setGridOpacity: (v: number)   => void;
  setShowScan:    (v: boolean)  => void;
}

const DEFAULTS: ThemeValues = {
  lang:        'es',
  dark:        true,
  density:     'regular',
  heroCopy:    'default',
  primaryHex:  '#CCFF00',
  glow:        24,
  gridOpacity: 4,
  showScan:    true,
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [lang, setLang]               = useState<Lang>(DEFAULTS.lang);
  const [dark, setDark]               = useState<boolean>(DEFAULTS.dark);
  const [density, setDensity]         = useState<Density>(DEFAULTS.density);
  const [heroCopy, setHeroCopy]       = useState<HeroCopy>(DEFAULTS.heroCopy);
  const [primaryHex, setPrimaryHex]   = useState<string>(DEFAULTS.primaryHex);
  const [glow, setGlow]               = useState<number>(DEFAULTS.glow);
  const [gridOpacity, setGridOpacity] = useState<number>(DEFAULTS.gridOpacity);
  const [showScan, setShowScan]       = useState<boolean>(DEFAULTS.showScan);

  const value: ThemeContextType = {
    lang, dark, density, heroCopy, primaryHex, glow, gridOpacity, showScan,
    setLang, setDark, setDensity, setHeroCopy, setPrimaryHex, setGlow, setGridOpacity, setShowScan,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextType {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
