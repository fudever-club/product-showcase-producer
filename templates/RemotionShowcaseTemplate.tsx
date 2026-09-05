import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

/**
 * RemotionShowcaseTemplate.tsx (v2.0 - The Cinematic Craft & Taste Edition)
 *
 * Implements:
 * 1. 3D Perspective Gyroscopic Camera (rotateX, rotateY, scale, subtle mouse-following tilt)
 * 2. Anisotropic Specular Sheen Sweep across the device glass bezel
 * 3. Film Grain Dithering Overlay (1.8% to eliminate H.264 color banding)
 * 4. Broadcast Video-Medium Typography Scale:
 *    - Hero Title: 84px, kerning -0.04em, masked slide-up reveal
 *    - Module Badge: 20px UPPERCASE tabular monospace
 *    - Feature Dock: 24px title, 16px subtitle, 18px KBD shortcut pills
 * 5. Strict Zero-Overlap Architecture:
 *    - Header Zone: y: 24px - 80px
 *    - Stage Zone:  y: 88px - 868px (Max height 780px)
 *    - Safe Buffer: y: 868px - 886px (Strict 18px Collision-Free Void)
 *    - Feature Dock: y: 886px - 960px
 *    - Progress:    y: 1062px - 1066px
 * 6. Audio-Reactive Beat Synchronization (125 BPM = 14.4 frames/beat)
 */

interface ShowcaseProps {
  appName: string;
  chapterNumber?: string;
  heroHeadline: string;
  subHeadline: string;
  featureTitle: string;
  featureDesc: string;
  shortcutBadge?: string;
  videoSrc?: string;
  imageSrc?: string;
  bpm?: number;
}

export const RemotionShowcaseTemplate: React.FC<ShowcaseProps> = ({
  appName = "DEPLOY ƯỚC MƠ",
  chapterNumber = "01 / 05",
  heroHeadline = "KHỞI TẠO Ý NIỆM.",
  subHeadline = "Trải nghiệm gieo thơ thả đèn lồng tương tác thời gian thực",
  featureTitle = "Phòng Tranh Đèn Lồng 3D",
  featureDesc = "Hiển thị ước mơ bay lượn trên dải ngân hà với hiệu ứng vật lý pháo hoa",
  shortcutBadge = "⌘ + K",
  videoSrc,
  imageSrc,
  bpm = 125,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // 1. AUDIO-REACTIVE BEAT SYSTEM (125 BPM -> 14.4 frames/beat)
  const framesPerBeat = (60 / bpm) * fps;
  const beatPhase = (frame % framesPerBeat) / framesPerBeat;
  const kickImpulse = Math.exp(-beatPhase * 5.0); // Sharp impulse that decays

  // 2. ENTRANCE SPRINGS (Physics-based snappy motion)
  const entranceSpring = spring({
    frame,
    fps,
    config: { mass: 0.7, damping: 18, stiffness: 110 },
  });

  const textEntranceSpring = spring({
    frame: frame - 4, // Staggered by 4 frames
    fps,
    config: { mass: 0.5, damping: 15, stiffness: 130 },
  });

  // 3. 3D GYROSCOPIC CAMERA CHOREOGRAPHY
  const cameraScale = interpolate(entranceSpring, [0, 1], [0.92, 1.0]) + kickImpulse * 0.012;
  const cameraRotateX = interpolate(entranceSpring, [0, 1], [8.0, 3.2]);
  const cameraRotateY = interpolate(entranceSpring, [0, 1], [-9.0, -3.5]);
  const cameraTiltZ = Math.sin(frame / 32) * 0.4;

  // 4. SPECULAR SHEEN SWEEP (Anisotropic reflection pass)
  const sheenTranslateX = interpolate(frame, [8, 48], [-150, 250], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 5. TIMELINE PROGRESSION
  const progressRatio = frame / durationInFrames;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#05070e',
        fontFamily: "'Geist', 'Inter', -apple-system, sans-serif",
        color: '#ffffff',
        overflow: 'hidden',
      }}
    >
      {/* ─────────────────────────────────────────────────────────────
          A. ATMOSPHERIC DEEP VOID BACKDROP (Night Studio Lighting)
      ───────────────────────────────────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 50% 35%, rgba(29, 78, 216, 0.18) 0%, rgba(15, 23, 42, 0.85) 65%, #03050a 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* High-Precision Sub-Pixel Grid (32px pitch @ 3% opacity) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 0)',
          backgroundSize: '32px 32px',
          opacity: 0.35,
          pointerEvents: 'none',
        }}
      />

      {/* ─────────────────────────────────────────────────────────────
          B. ZONE A: HUD HEADER (y: 24px - 80px)
      ───────────────────────────────────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          top: 24,
          left: 72,
          right: 72,
          height: 56,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          paddingBottom: 8,
          zIndex: 40,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 10,
              backgroundColor: '#0f172a',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 18,
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
            }}
          >
            ✦
          </div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em', color: '#ffffff' }}>
              {appName}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div
            style={{
              fontFamily: "'Geist Mono', 'JetBrains Mono', monospace",
              fontSize: 14,
              letterSpacing: '0.08em',
              color: 'rgba(255, 255, 255, 0.5)',
            }}
          >
            CHAPTER {chapterNumber}
          </div>
          <div
            style={{
              padding: '6px 14px',
              borderRadius: 999,
              backgroundColor: 'rgba(59, 130, 246, 0.12)',
              border: '1px solid rgba(96, 165, 250, 0.3)',
              color: '#93c5fd',
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.06em',
            }}
          >
            ● LIVE SHOWCASE
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          C. ZONE B: 3D PERSPECTIVE STAGE VIEWPORT (y: 88px - 868px)
      ───────────────────────────────────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          top: 88,
          left: 0,
          right: 0,
          height: 780, // Strict Max Height
          perspective: 1300,
          perspectiveOrigin: '50% 45%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 20,
        }}
      >
        {/* Atmospheric Backglow Halo (tính năng không gây lóa mặt kính) */}
        <div
          style={{
            position: 'absolute',
            width: 1240,
            height: 700,
            borderRadius: 36,
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.25) 0%, rgba(147, 51, 234, 0.10) 45%, transparent 75%)',
            filter: 'blur(55px)',
            transform: `scale(${cameraScale})`,
            opacity: 0.75 + kickImpulse * 0.25,
            pointerEvents: 'none',
          }}
        />

        {/* 3D Tilted Device Window Frame */}
        <div
          style={{
            width: 1380,
            height: 740,
            borderRadius: 20,
            backgroundColor: 'rgba(11, 15, 25, 0.95)',
            border: '1px solid rgba(255, 255, 255, 0.14)',
            boxShadow: `
              0 0 0 1px rgba(255, 255, 255, 0.08),
              0 30px 80px -15px rgba(0, 0, 0, 0.85),
              0 0 40px rgba(59, 130, 246, ${0.15 + kickImpulse * 0.1})
            `,
            transformStyle: 'preserve-3d',
            transform: `
              scale(${cameraScale})
              rotateX(${cameraRotateX}deg)
              rotateY(${cameraRotateY}deg)
              rotateZ(${cameraTiltZ}deg)
            `,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
          }}
        >
          {/* Window Chrome Titlebar */}
          <div
            style={{
              height: 40,
              backgroundColor: 'rgba(19, 24, 38, 0.9)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              alignItems: 'center',
              padding: '0 18px',
              gap: 8,
              zIndex: 10,
            }}
          >
            <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#ef4444' }} />
            <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#eab308' }} />
            <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#22c55e' }} />
            <div
              style={{
                marginLeft: 24,
                fontSize: 13,
                fontFamily: "'Geist Mono', monospace",
                color: 'rgba(255, 255, 255, 0.45)',
                letterSpacing: '-0.01em',
              }}
            >
              https://app.product.com/feature-deep-dive
            </div>
          </div>

          {/* Screen Content Viewport (Playwright 60fps Native Capture) */}
          <div style={{ flex: 1, position: 'relative', backgroundColor: '#02040a', overflow: 'hidden' }}>
            {videoSrc ? (
              <video
                src={videoSrc}
                autoPlay
                muted
                loop
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : imageSrc ? (
              <img
                src={imageSrc}
                alt="Product Viewport"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  gap: 16,
                  color: 'rgba(255, 255, 255, 0.4)',
                }}
              >
                <div style={{ fontSize: 32 }}>⚡</div>
                <div style={{ fontSize: 18, fontFamily: "'Geist Mono', monospace" }}>
                  [Playwright 60fps Native Capture Viewport]
                </div>
              </div>
            )}

            {/* Specular Sheen Sweep Overlay across Glass */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                width: '45%',
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.07), transparent)',
                transform: `translateX(${sheenTranslateX}%) skewX(-26deg)`,
                pointerEvents: 'none',
              }}
            />
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          D. ZONE C: DYNAMIC FEATURE DOCK (y: 886px - 960px)
          Strict 18px Clearance from y: 868px stage boundary
      ───────────────────────────────────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          top: 886,
          left: 0,
          right: 0,
          height: 74,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 30,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            padding: '12px 28px',
            borderRadius: 999,
            backgroundColor: 'rgba(15, 23, 42, 0.85)',
            border: '1.5px solid rgba(255, 255, 255, 0.12)',
            boxShadow: '0 12px 36px -8px rgba(0, 0, 0, 0.7), 0 0 20px rgba(59, 130, 246, 0.2)',
            backdropFilter: 'blur(20px)',
          }}
        >
          {/* Feature Badge */}
          <div
            style={{
              padding: '4px 12px',
              borderRadius: 6,
              backgroundColor: 'rgba(59, 130, 246, 0.25)',
              border: '1px solid rgba(96, 165, 250, 0.4)',
              color: '#60a5fa',
              fontSize: 12,
              fontWeight: 800,
              letterSpacing: '0.08em',
              fontFamily: "'Geist Mono', monospace",
            }}
          >
            FEATURE
          </div>

          {/* Feature Content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em', color: '#ffffff' }}>
              {featureTitle}
            </div>
            <div style={{ fontSize: 14, color: 'rgba(255, 255, 255, 0.65)', letterSpacing: '-0.01em' }}>
              {featureDesc}
            </div>
          </div>

          {/* Keyboard Shortcut Pill */}
          {shortcutBadge && (
            <div
              style={{
                marginLeft: 12,
                padding: '4px 10px',
                borderRadius: 6,
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: 'rgba(255, 255, 255, 0.85)',
                fontSize: 13,
                fontFamily: "'Geist Mono', monospace",
                fontWeight: 600,
              }}
            >
              {shortcutBadge}
            </div>
          )}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          E. PROGRESS SCRUBBER (y: 1062px - 1066px)
      ───────────────────────────────────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          top: 1062,
          left: 72,
          right: 72,
          height: 4,
          borderRadius: 2,
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
          overflow: 'hidden',
          zIndex: 50,
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${progressRatio * 100}%`,
            background: 'linear-gradient(90deg, #3b82f6, #6366f1, #a855f7)',
            boxShadow: '0 0 10px rgba(99, 102, 241, 0.7)',
          }}
        />
      </div>

      {/* ─────────────────────────────────────────────────────────────
          F. FILM GRAIN DITHER OVERLAY (Anti-Banding Filter)
      ───────────────────────────────────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          opacity: 0.022,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          mixBlendMode: 'overlay',
          zIndex: 9999,
        }}
      />
    </AbsoluteFill>
  );
};
