"use client";

import { DialRoot, useDialKit } from "dialkit";
import "dialkit/styles.css";
import { useEffect } from "react";
import { HERO_PARALLAX_DEFAULTS, setHeroParallaxSettings } from "@/lib/hero-parallax-settings";

function HeroParallaxDialControls() {
  const controls = useDialKit("Hero parallax", {
    enabled: HERO_PARALLAX_DEFAULTS.enabled,
    respectReducedMotion: HERO_PARALLAX_DEFAULTS.respectReducedMotion,
    background: {
      _collapsed: false,
      factorDesktop: [HERO_PARALLAX_DEFAULTS.backgroundFactorDesktop, 0, 1.5, 0.01],
      factorMobile: [HERO_PARALLAX_DEFAULTS.backgroundFactorMobile, 0, 1.5, 0.01],
      maxOffsetDesktop: [HERO_PARALLAX_DEFAULTS.backgroundMaxOffsetDesktop, 0, 1200, 10],
      maxOffsetMobile: [HERO_PARALLAX_DEFAULTS.backgroundMaxOffsetMobile, 0, 800, 10],
      scaleDesktop: [HERO_PARALLAX_DEFAULTS.backgroundScaleDesktop, 1, 2.5, 0.01],
      scaleMobile: [HERO_PARALLAX_DEFAULTS.backgroundScaleMobile, 1, 2.5, 0.01],
    },
    content: {
      _collapsed: false,
      factorDesktop: [HERO_PARALLAX_DEFAULTS.contentFactorDesktop, 0, 0.8, 0.01],
      factorMobile: [HERO_PARALLAX_DEFAULTS.contentFactorMobile, 0, 0.8, 0.01],
      maxOffsetDesktop: [HERO_PARALLAX_DEFAULTS.contentMaxOffsetDesktop, 0, 360, 5],
      maxOffsetMobile: [HERO_PARALLAX_DEFAULTS.contentMaxOffsetMobile, 0, 260, 5],
    },
    overlay: {
      _collapsed: true,
      topOpacity: [HERO_PARALLAX_DEFAULTS.overlayOpacityTop, 0, 1, 0.01],
      middleOpacity: [HERO_PARALLAX_DEFAULTS.overlayOpacityMiddle, 0, 1, 0.01],
      bottomOpacity: [HERO_PARALLAX_DEFAULTS.overlayOpacityBottom, 0, 1, 0.01],
    },
  });

  useEffect(() => {
    setHeroParallaxSettings({
      enabled: controls.enabled,
      respectReducedMotion: controls.respectReducedMotion,
      backgroundFactorDesktop: controls.background.factorDesktop,
      backgroundFactorMobile: controls.background.factorMobile,
      backgroundMaxOffsetDesktop: controls.background.maxOffsetDesktop,
      backgroundMaxOffsetMobile: controls.background.maxOffsetMobile,
      backgroundScaleDesktop: controls.background.scaleDesktop,
      backgroundScaleMobile: controls.background.scaleMobile,
      contentFactorDesktop: controls.content.factorDesktop,
      contentFactorMobile: controls.content.factorMobile,
      contentMaxOffsetDesktop: controls.content.maxOffsetDesktop,
      contentMaxOffsetMobile: controls.content.maxOffsetMobile,
      overlayOpacityTop: controls.overlay.topOpacity,
      overlayOpacityMiddle: controls.overlay.middleOpacity,
      overlayOpacityBottom: controls.overlay.bottomOpacity,
    });
  }, [
    controls.background.factorDesktop,
    controls.background.factorMobile,
    controls.background.maxOffsetDesktop,
    controls.background.maxOffsetMobile,
    controls.background.scaleDesktop,
    controls.background.scaleMobile,
    controls.content.factorDesktop,
    controls.content.factorMobile,
    controls.content.maxOffsetDesktop,
    controls.content.maxOffsetMobile,
    controls.enabled,
    controls.respectReducedMotion,
    controls.overlay.bottomOpacity,
    controls.overlay.middleOpacity,
    controls.overlay.topOpacity,
  ]);

  return null;
}

export default function DevDialKit() {
  if (process.env.NODE_ENV !== "development") return null;

  return (
    <>
      <HeroParallaxDialControls />
      <DialRoot position="bottom-right" />
    </>
  );
}
