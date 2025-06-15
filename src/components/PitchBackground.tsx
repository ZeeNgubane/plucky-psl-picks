
import React from "react";

const PitchBackground = () => (
  <div className="absolute inset-0 bg-gradient-to-b from-green-800 via-green-700 to-green-800">
    <div
      className="absolute inset-0 opacity-20"
      style={{
        backgroundImage: `repeating-linear-gradient(
          90deg,
          transparent,
          transparent 50px,
          rgba(255, 255, 255, 0.05) 50px,
          rgba(255, 255, 255, 0.05) 100px
        )`,
      }}
    />
    <div className="absolute inset-0 opacity-50 pointer-events-none">
      <svg className="w-full h-full" viewBox="0 0 400 600" preserveAspectRatio="xMidYMid slice">
        {/* Outer boundary - Half pitch */}
        <rect x="50" y="50" width="300" height="500" fill="none" stroke="white" strokeWidth="4"/>
        {/* Center circle (half only) */}
        <path d="M200 550 m-80,0 a80,80 0 0,1 160,0" fill="none" stroke="white" strokeWidth="4"/>
        {/* Center spot */}
        <circle cx="200" cy="550" r="6" fill="white"/>
        {/* Halfway line */}
        <line x1="50" y1="550" x2="350" y2="550" stroke="white" strokeWidth="3"/>
        {/* Penalty area (18-yard box) */}
        <rect x="100" y="50" width="200" height="120" fill="none" stroke="white" strokeWidth="3"/>
        {/* 6-yard box */}
        <rect x="150" y="50" width="100" height="60" fill="none" stroke="white" strokeWidth="3"/>
        {/* Penalty spot */}
        <circle cx="200" cy="140" r="4" fill="white"/>
        {/* Penalty arc */}
        <path d="M170 170 A30 30 0 0 1 230 170" fill="none" stroke="white" strokeWidth="3"/>
        {/* Corner arcs */}
        <path d="M50 50 A30 30 0 0 1 80 80" fill="none" stroke="white" strokeWidth="3"/>
        <path d="M350 50 A30 30 0 0 0 320 80" fill="none" stroke="white" strokeWidth="3"/>
        {/* Goal (top middle) */}
        <rect x="175" y="42" width="50" height="8" fill="white"/>
      </svg>
    </div>
  </div>
);

export default PitchBackground;
