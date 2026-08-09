"use client";

/**
 * IPhoneMockup, device frame for embedding real UI.
 *
 * Ported from the TypeScript original: this project is plain JS (jsconfig, no
 * tsconfig), so the prop types live in JSDoc instead of a `Props` interface.
 * Behaviour is unchanged apart from two additions the signature demos need:
 *
 *   - `screenRef`, a ref onto the scrollable content box, so a demo can
 *                     drive the screen's scroll from outside the frame.
 *   - `fill`, stretch the frame to its container instead of laying out
 *                     at the device's fixed logical size. `scale` alone can't
 *                     do that: `transform` doesn't affect layout, so a scaled
 *                     frame still reserves its full 393×852 box and punches a
 *                     hole through whatever sits under it.
 */

import React from "react";

/* Device specs (logical pixels) */
const DEVICE_SPECS = {
  // iPhone X/11/12/13 style notch
  x: {
    w: 375,
    h: 812,
    radius: 50,
    bezel: 12,
    topSafe: 47,
    bottomSafe: 34,
    notch: { w: 210, h: 35, r: 18 },
  },
  // iPhone 14 (notch)
  14: {
    w: 390,
    h: 844,
    radius: 56,
    bezel: 12,
    topSafe: 47,
    bottomSafe: 34,
    notch: { w: 225, h: 33, r: 18 },
  },
  // iPhone 14 Pro (dynamic island)
  "14-pro": {
    w: 393,
    h: 852,
    radius: 56,
    bezel: 12,
    topSafe: 59,
    bottomSafe: 34,
    island: { w: 126, h: 37, r: 20 },
  },
  // iPhone 15 (now has island)
  15: {
    w: 393,
    h: 852,
    radius: 56,
    bezel: 12,
    topSafe: 59,
    bottomSafe: 34,
    island: { w: 126, h: 37, r: 20 },
  },
  // iPhone 15 Pro
  "15-pro": {
    w: 393,
    h: 852,
    radius: 56,
    bezel: 12,
    topSafe: 59,
    bottomSafe: 34,
    island: { w: 126, h: 37, r: 20 },
  },
  // Plain rounded rectangle, no cutouts
  plain: {
    w: 390,
    h: 844,
    radius: 56,
    bezel: 12,
    topSafe: 16,
    bottomSafe: 16,
  },
};

export const IPHONE_MODELS = Object.keys(DEVICE_SPECS);

const PRESET_COLORS = {
  black: "#0b0b0d",
  midnight: "#0b0c10",
  silver: "#d7d8dc",
  starlight: "#f1eee9",
  "space-black": "#1c1e22",
  gold: "#f2dfb3",
  blue: "#2b4fa8",
  pink: "#ffbfd1",
  titanium: "#837a72",
  "natural-titanium": "#a69a8a",
  green: "#2b622e",
  red: "#c81f2f",
};

export const IPHONE_COLORS = Object.keys(PRESET_COLORS);

/** Lighten (pct > 0) or darken (pct < 0) a hex colour. Non-hex passes through. */
function shade(hex, pct) {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(String(hex).trim());
  if (!m) return hex;
  const [r, g, b] = [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)];
  const k = (100 + pct) / 100;
  const to = (v) => Math.max(0, Math.min(255, Math.round(v * k)));
  return `#${to(r).toString(16).padStart(2, "0")}${to(g)
    .toString(16)
    .padStart(2, "0")}${to(b).toString(16).padStart(2, "0")}`;
}

export function iphoneSpec(model) {
  return DEVICE_SPECS[model] || DEVICE_SPECS["14-pro"];
}

export function IPhoneMockup({
  model = "14-pro",
  color = "space-black",
  orientation = "portrait",
  scale = 1,
  fill = false,

  bezel,
  radius,
  shadow = true,

  screenBg = "#000",
  wallpaper,
  wallpaperFit = "cover",
  wallpaperPosition = "center",

  showDynamicIsland,
  showNotch,
  islandWidth,
  islandHeight,
  islandRadius,
  notchWidth,
  notchHeight,
  notchRadius,

  safeArea = true,
  safeAreaOverrides,

  showHomeIndicator = true,
  innerShadow = true,

  style,
  className,
  frameStyle,
  screenStyle,
  contentClassName,
  screenRef,

  children,
}) {
  const spec = iphoneSpec(model);
  const W = spec.w;
  const H = spec.h;

  const useIsland =
    typeof showDynamicIsland === "boolean" ? showDynamicIsland : Boolean(spec.island);

  const useNotch =
    typeof showNotch === "boolean" ? showNotch : Boolean(spec.notch) && !useIsland;

  const resolvedRadius = radius ?? spec.radius;
  const resolvedBezel = bezel ?? spec.bezel;

  const isLandscape = orientation === "landscape";
  const screenWidth = isLandscape ? H : W;
  const screenHeight = isLandscape ? W : H;

  const outerWidth = screenWidth + resolvedBezel * 2;
  const outerHeight = screenHeight + resolvedBezel * 2;
  const outerRadius = resolvedRadius + resolvedBezel;

  const colorHex = PRESET_COLORS[color] ?? color;
  const frameGradient = `linear-gradient(135deg, ${shade(colorHex, 8)} 0%, ${colorHex} 40%, ${shade(
    colorHex,
    -14
  )} 100%)`;

  const outerShadow =
    typeof shadow === "string"
      ? shadow
      : shadow
        ? "0 12px 30px rgba(0,0,0,0.35), 0 2px 6px rgba(0,0,0,0.22)"
        : "none";

  const innerShadowCss = innerShadow
    ? "inset 0 0 0 1px rgba(255,255,255,0.03), inset 0 10px 20px rgba(0,0,0,0.35), inset 0 -8px 16px rgba(0,0,0,0.28)"
    : "none";

  const notchSpec = spec.notch;
  const islandSpec = spec.island;

  const finalNotchW = notchWidth ?? notchSpec?.w ?? 0;
  const finalNotchH = notchHeight ?? notchSpec?.h ?? 0;
  const finalNotchR = notchRadius ?? notchSpec?.r ?? 0;

  const finalIslandW = islandWidth ?? islandSpec?.w ?? 0;
  const finalIslandH = islandHeight ?? islandSpec?.h ?? 0;
  const finalIslandR = islandRadius ?? islandSpec?.r ?? 0;

  const insets = {
    top: safeAreaOverrides?.top ?? spec.topSafe,
    bottom: safeAreaOverrides?.bottom ?? spec.bottomSafe,
    left: safeAreaOverrides?.left ?? 0,
    right: safeAreaOverrides?.right ?? 0,
  };

  // `fill` hands sizing to the parent. Otherwise we keep the original
  // transform-scale behaviour, which is fine when the caller has already
  // reserved room for the untransformed box.
  const wrapperStyle = fill
    ? { boxSizing: "border-box", display: "block", width: "100%", ...style }
    : {
        boxSizing: "border-box",
        display: "inline-block",
        transform: `scale(${scale})`,
        transformOrigin: "top left",
        ...style,
      };

  const frameBoxStyle = {
    width: fill ? "100%" : outerWidth,
    // In fill mode the parent owns the width and the ratio owns the height,
    // setting both to 100% would make `aspect-ratio` a no-op.
    height: fill ? "auto" : outerHeight,
    aspectRatio: fill ? `${outerWidth} / ${outerHeight}` : undefined,
    borderRadius: outerRadius,
    background: frameGradient,
    padding: resolvedBezel,
    boxSizing: "border-box",
    boxShadow: outerShadow,
    position: "relative",
    overflow: "hidden",
    ...frameStyle,
  };

  const screenBoxStyle = {
    width: "100%",
    height: "100%",
    borderRadius: resolvedRadius,
    position: "relative",
    overflow: "hidden",
    background: screenBg,
    boxShadow: innerShadowCss,
    ...screenStyle,
  };

  const wallpaperStyle = wallpaper
    ? {
        position: "absolute",
        inset: 0,
        backgroundImage: `url(${wallpaper})`,
        backgroundSize: wallpaperFit,
        backgroundPosition: wallpaperPosition,
        backgroundRepeat: "no-repeat",
        zIndex: 0,
      }
    : undefined;

  const cutoutCommon = {
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
    background: "#000",
    zIndex: 2,
    boxShadow: "0 1px 2px rgba(0,0,0,0.7)",
  };

  const homeIndicatorStyle = {
    position: "absolute",
    bottom: 8,
    left: "50%",
    transform: "translateX(-50%)",
    width: `${Math.round((screenWidth * 0.34 * 100) / screenWidth)}%`,
    maxWidth: 140,
    height: 5,
    borderRadius: 3,
    background: "linear-gradient(180deg, rgba(255,255,255,0.7), rgba(255,255,255,0.35))",
    opacity: 0.9,
    zIndex: 3,
    pointerEvents: "none",
  };

  const contentStyle = safeArea
    ? {
        position: "absolute",
        top: insets.top,
        right: insets.right,
        bottom: insets.bottom,
        left: insets.left,
        overflow: "hidden",
        zIndex: 1,
        display: "flex",
        flexDirection: "column",
      }
    : {
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        zIndex: 1,
        display: "flex",
        flexDirection: "column",
      };

  return (
    <div className={className} style={wrapperStyle}>
      <div style={frameBoxStyle} aria-label={`iPhone mockup (${model})`}>
        <div style={screenBoxStyle}>
          {wallpaper && <div aria-hidden style={wallpaperStyle} />}

          {/* Dynamic Island */}
          {useIsland && finalIslandW > 0 && finalIslandH > 0 && (
            <div
              aria-hidden
              style={{
                ...cutoutCommon,
                top: 12,
                width: finalIslandW,
                height: finalIslandH,
                borderRadius: finalIslandR,
              }}
            />
          )}

          {/* Notch */}
          {!useIsland && useNotch && finalNotchW > 0 && finalNotchH > 0 && (
            <div
              aria-hidden
              style={{
                ...cutoutCommon,
                top: 8,
                width: finalNotchW,
                height: finalNotchH,
                borderRadius: finalNotchR,
              }}
            />
          )}

          {/* Screen content */}
          <div ref={screenRef} style={contentStyle} className={contentClassName}>
            {children}
          </div>

          {/* Home indicator (for modern gesture phones) */}
          {showHomeIndicator && <div aria-hidden style={homeIndicatorStyle} />}
        </div>
      </div>
    </div>
  );
}

export default IPhoneMockup;
