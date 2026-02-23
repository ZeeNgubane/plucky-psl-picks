import React from "react";

const PitchBackground = () => (
  <div className="absolute inset-0 bg-gradient-to-b from-emerald-500 via-emerald-400 to-emerald-500 rounded-lg">
    {/* Grass stripe pattern */}
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: `repeating-linear-gradient(
          0deg,
          transparent,
          transparent 40px,
          rgba(255, 255, 255, 0.06) 40px,
          rgba(255, 255, 255, 0.06) 80px
        )`,
      }}
    />
    {/* Subtle noise texture */}
    <div className="absolute inset-0 opacity-[0.03]" style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
    }} />
    {/* Pitch markings */}
    <div className="absolute inset-0 pointer-events-none">
      <svg className="w-full h-full" viewBox="0 0 400 600" preserveAspectRatio="xMidYMid slice">
        {/* Outer boundary */}
        <rect x="40" y="40" width="320" height="520" fill="none" stroke="rgba(255,255,255,0.65)" strokeWidth="3"/>
        {/* Center circle (half) */}
        <path d="M200 560 m-80,0 a80,80 0 0,1 160,0" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="2.5"/>
        {/* Center spot */}
        <circle cx="200" cy="560" r="5" fill="rgba(255,255,255,0.6)"/>
        {/* Halfway line */}
        <line x1="40" y1="560" x2="360" y2="560" stroke="rgba(255,255,255,0.55)" strokeWidth="2.5"/>
        {/* Penalty area (18-yard box) */}
        <rect x="95" y="40" width="210" height="130" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="2.5"/>
        {/* 6-yard box */}
        <rect x="145" y="40" width="110" height="55" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="2.5"/>
        {/* Penalty spot */}
        <circle cx="200" cy="135" r="3.5" fill="rgba(255,255,255,0.6)"/>
        {/* Penalty arc */}
        <path d="M165 170 A35 35 0 0 1 235 170" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="2.5"/>
        {/* Corner arcs */}
        <path d="M40 40 A25 25 0 0 1 65 65" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="2.5"/>
        <path d="M360 40 A25 25 0 0 0 335 65" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="2.5"/>
        {/* Goal */}
        <rect x="170" y="32" width="60" height="8" fill="rgba(255,255,255,0.5)" rx="2"/>
      </svg>
    </div>
  </div>
);

export default PitchBackground;
