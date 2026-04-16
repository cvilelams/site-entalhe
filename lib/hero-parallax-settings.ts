"use client";

import { useSyncExternalStore } from "react";

export type HeroParallaxSettings = {
  enabled: boolean;
  respectReducedMotion: boolean;
  backgroundFactorDesktop: number;
  backgroundFactorMobile: number;
  backgroundMaxOffsetDesktop: number;
  backgroundMaxOffsetMobile: number;
  backgroundScaleDesktop: number;
  backgroundScaleMobile: number;
  contentFactorDesktop: number;
  contentFactorMobile: number;
  contentMaxOffsetDesktop: number;
  contentMaxOffsetMobile: number;
  overlayOpacityTop: number;
  overlayOpacityMiddle: number;
  overlayOpacityBottom: number;
};

export const HERO_PARALLAX_DEFAULTS: HeroParallaxSettings = {
  enabled: true,
  respectReducedMotion: true,
  backgroundFactorDesktop: 1.05,
  backgroundFactorMobile: 0.75,
  backgroundMaxOffsetDesktop: 760,
  backgroundMaxOffsetMobile: 420,
  backgroundScaleDesktop: 1.5,
  backgroundScaleMobile: 1.15,
  contentFactorDesktop: 0.3,
  contentFactorMobile: 0.2,
  contentMaxOffsetDesktop: 220,
  contentMaxOffsetMobile: 140,
  overlayOpacityTop: 0.45,
  overlayOpacityMiddle: 0.25,
  overlayOpacityBottom: 0.5,
};

type HeroParallaxSettingsListener = () => void;

let currentSettings: HeroParallaxSettings = HERO_PARALLAX_DEFAULTS;
const listeners = new Set<HeroParallaxSettingsListener>();

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function sanitizeSettings(next: HeroParallaxSettings): HeroParallaxSettings {
  return {
    enabled: Boolean(next.enabled),
    respectReducedMotion: Boolean(next.respectReducedMotion),
    backgroundFactorDesktop: clamp(next.backgroundFactorDesktop, 0, 2),
    backgroundFactorMobile: clamp(next.backgroundFactorMobile, 0, 2),
    backgroundMaxOffsetDesktop: clamp(next.backgroundMaxOffsetDesktop, 0, 1200),
    backgroundMaxOffsetMobile: clamp(next.backgroundMaxOffsetMobile, 0, 800),
    backgroundScaleDesktop: clamp(next.backgroundScaleDesktop, 1, 2.5),
    backgroundScaleMobile: clamp(next.backgroundScaleMobile, 1, 2.5),
    contentFactorDesktop: clamp(next.contentFactorDesktop, 0, 1),
    contentFactorMobile: clamp(next.contentFactorMobile, 0, 1),
    contentMaxOffsetDesktop: clamp(next.contentMaxOffsetDesktop, 0, 360),
    contentMaxOffsetMobile: clamp(next.contentMaxOffsetMobile, 0, 260),
    overlayOpacityTop: clamp(next.overlayOpacityTop, 0, 1),
    overlayOpacityMiddle: clamp(next.overlayOpacityMiddle, 0, 1),
    overlayOpacityBottom: clamp(next.overlayOpacityBottom, 0, 1),
  };
}

function emit() {
  listeners.forEach((listener) => listener());
}

function hasSettingsChanged(next: HeroParallaxSettings) {
  return (
    currentSettings.enabled !== next.enabled ||
    currentSettings.respectReducedMotion !== next.respectReducedMotion ||
    currentSettings.backgroundFactorDesktop !== next.backgroundFactorDesktop ||
    currentSettings.backgroundFactorMobile !== next.backgroundFactorMobile ||
    currentSettings.backgroundMaxOffsetDesktop !== next.backgroundMaxOffsetDesktop ||
    currentSettings.backgroundMaxOffsetMobile !== next.backgroundMaxOffsetMobile ||
    currentSettings.backgroundScaleDesktop !== next.backgroundScaleDesktop ||
    currentSettings.backgroundScaleMobile !== next.backgroundScaleMobile ||
    currentSettings.contentFactorDesktop !== next.contentFactorDesktop ||
    currentSettings.contentFactorMobile !== next.contentFactorMobile ||
    currentSettings.contentMaxOffsetDesktop !== next.contentMaxOffsetDesktop ||
    currentSettings.contentMaxOffsetMobile !== next.contentMaxOffsetMobile ||
    currentSettings.overlayOpacityTop !== next.overlayOpacityTop ||
    currentSettings.overlayOpacityMiddle !== next.overlayOpacityMiddle ||
    currentSettings.overlayOpacityBottom !== next.overlayOpacityBottom
  );
}

export function getHeroParallaxSettings() {
  return currentSettings;
}

export function setHeroParallaxSettings(next: HeroParallaxSettings) {
  const sanitized = sanitizeSettings(next);
  if (!hasSettingsChanged(sanitized)) return;
  currentSettings = sanitized;
  emit();
}

export function resetHeroParallaxSettings() {
  currentSettings = HERO_PARALLAX_DEFAULTS;
  emit();
}

export function subscribeHeroParallaxSettings(listener: HeroParallaxSettingsListener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function useHeroParallaxSettings() {
  return useSyncExternalStore(subscribeHeroParallaxSettings, getHeroParallaxSettings, getHeroParallaxSettings);
}
