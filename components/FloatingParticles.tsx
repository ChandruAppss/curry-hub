"use client";

const PARTICLES = [
  { char: "✦", size: 11, left: 3, delay: 0, duration: 14, drift: 35, rot: 180, opacity: 0.55 },
  { char: "·", size: 7, left: 9, delay: 2.5, duration: 18, drift: -25, rot: 90, opacity: 0.4 },
  { char: "◦", size: 9, left: 15, delay: 5, duration: 12, drift: 50, rot: 270, opacity: 0.45 },
  { char: "✧", size: 13, left: 22, delay: 1, duration: 20, drift: -40, rot: 360, opacity: 0.35 },
  { char: "✦", size: 7, left: 28, delay: 7, duration: 16, drift: 30, rot: 120, opacity: 0.5 },
  { char: "⊹", size: 10, left: 34, delay: 3, duration: 13, drift: -35, rot: 240, opacity: 0.4 },
  { char: "·", size: 6, left: 41, delay: 9, duration: 22, drift: 45, rot: 180, opacity: 0.35 },
  { char: "✦", size: 14, left: 47, delay: 0.5, duration: 17, drift: -50, rot: 300, opacity: 0.3 },
  { char: "◦", size: 8, left: 53, delay: 4, duration: 15, drift: 20, rot: 90, opacity: 0.5 },
  { char: "★", size: 7, left: 59, delay: 6.5, duration: 19, drift: -30, rot: 210, opacity: 0.35 },
  { char: "✧", size: 11, left: 65, delay: 2, duration: 14, drift: 55, rot: 150, opacity: 0.45 },
  { char: "·", size: 9, left: 71, delay: 8, duration: 21, drift: -20, rot: 330, opacity: 0.4 },
  { char: "✦", size: 6, left: 77, delay: 1.5, duration: 16, drift: 40, rot: 60, opacity: 0.55 },
  { char: "⊹", size: 12, left: 83, delay: 5.5, duration: 13, drift: -45, rot: 270, opacity: 0.3 },
  { char: "◦", size: 8, left: 89, delay: 3.5, duration: 18, drift: 25, rot: 120, opacity: 0.45 },
  { char: "★", size: 10, left: 94, delay: 7.5, duration: 15, drift: -35, rot: 200, opacity: 0.35 },
  { char: "✦", size: 7, left: 12, delay: 10, duration: 20, drift: 60, rot: 360, opacity: 0.4 },
  { char: "·", size: 13, left: 36, delay: 11, duration: 12, drift: -55, rot: 45, opacity: 0.3 },
  { char: "✧", size: 9, left: 58, delay: 12, duration: 17, drift: 35, rot: 270, opacity: 0.45 },
  { char: "◦", size: 11, left: 79, delay: 13, duration: 22, drift: -40, rot: 180, opacity: 0.35 },
];

export default function FloatingParticles({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 overflow-hidden pointer-events-none select-none ${className}`}
    >
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className="absolute bottom-0 text-amber-400"
          style={{
            left: `${p.left}%`,
            fontSize: `${p.size}px`,
            opacity: p.opacity,
            animationName: "float-particle",
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            animationIterationCount: "infinite",
            animationTimingFunction: "ease-in-out",
            "--drift": `${p.drift}px`,
            "--rot": `${p.rot}deg`,
          } as React.CSSProperties}
        >
          {p.char}
        </span>
      ))}
    </div>
  );
}
