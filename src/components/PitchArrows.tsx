
import React from "react";

const PitchArrows = () => (
  <div className="absolute inset-0 opacity-30 pointer-events-none">
    <svg className="w-full h-full" viewBox="0 0 400 600" preserveAspectRatio="xMidYMid slice">
      <defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="rgba(255,255,255,0.7)" />
        </marker>
      </defs>
      {/* Attacking movement arrows */}
      <path d="M 150 450 Q 200 350 250 250" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="3" strokeDasharray="8,4" markerEnd="url(#arrowhead)"/>
      <path d="M 250 450 Q 200 350 150 250" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="3" strokeDasharray="8,4" markerEnd="url(#arrowhead)"/>
      {/* Wing play arrows */}
      <path d="M 80 400 Q 120 300 160 200" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeDasharray="6,3" markerEnd="url(#arrowhead)"/>
      <path d="M 320 400 Q 280 300 240 200" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeDasharray="6,3" markerEnd="url(#arrowhead)"/>
      {/* Central attacking route */}
      <path d="M 200 400 L 200 200" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="3" strokeDasharray="4,4" markerEnd="url(#arrowhead)"/>
      {/* Pressing lines */}
      <line x1="80" y1="300" x2="320" y2="300" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeDasharray="10,5"/>
      <line x1="80" y1="450" x2="320" y2="450" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeDasharray="10,5"/>
    </svg>
  </div>
);

export default PitchArrows;
