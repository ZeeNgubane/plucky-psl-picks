import React from "react";

const PitchArrows = () => (
  <div className="absolute inset-0 opacity-15 pointer-events-none">
    <svg className="w-full h-full" viewBox="0 0 400 600" preserveAspectRatio="xMidYMid slice">
      <defs>
        <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="rgba(255,255,255,0.5)" />
        </marker>
      </defs>
      {/* Central route */}
      <path d="M 200 420 L 200 180" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeDasharray="6,4" markerEnd="url(#arrowhead)"/>
      {/* Wing routes */}
      <path d="M 100 400 Q 130 280 170 180" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeDasharray="5,4" markerEnd="url(#arrowhead)"/>
      <path d="M 300 400 Q 270 280 230 180" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeDasharray="5,4" markerEnd="url(#arrowhead)"/>
    </svg>
  </div>
);

export default PitchArrows;
