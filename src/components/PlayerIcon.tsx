import React from "react";
import { Player, getTeamName } from "@/data/teams";

interface PlayerIconProps {
  player: Player | null;
  x: number;
  y: number;
  label: string;
}

const TEAM_COLORS: Record<string, [string, string, string?]> = {
  'Kaizer Chiefs': ['#FDB913', '#000000', '#000000'],
  'Orlando Pirates': ['#000000', '#FFFFFF', '#FFFFFF'],
  'Mamelodi Sundowns': ['#FFD700', '#009639', '#009639'],
  'Stellenbosch FC': ['#8B0000', '#FFFFFF'],
  'Sekhukhune United': ['#006400', '#FFD700'],
  'AmaZulu FC': ['#006400', '#FFFFFF'],
  'Chippa United': ['#FF6600', '#000000'],
  'Lamontville Golden Arrows': ['#FFD700', '#006400'],
  'Richards Bay FC': ['#0066CC', '#FFFFFF'],
  'Polokwane City FC': ['#006400', '#FFD700'],
  'TS Galaxy FC': ['#800080', '#FFD700'],
  'Marumo Gallants FC': ['#8B4513', '#FFD700'],
  'Siwelele Football Club': ['#FF0000', '#FFFFFF'],
  'Durban City Football Club': ['#0099CC', '#FFFFFF'],
  'Magesi FC': ['#FF0000', '#000000'],
};

const PlayerIcon: React.FC<PlayerIconProps> = ({ player, x, y, label }) => {
  const teamName = player ? getTeamName(player) : '';
  const colors = player ? TEAM_COLORS[teamName] || ['#555', '#999'] : ['#555', '#999'];
  const [primary, secondary, accent] = colors;

  if (player) {
    const clipId = `jersey-clip-${player.id}`;

    return (
      <g>
        <defs>
          <clipPath id={clipId}>
            <path d={`
              M ${x - 14} ${y - 16} L ${x - 20} ${y - 12} L ${x - 20} ${y - 4}
              L ${x - 14} ${y - 4} L ${x - 14} ${y + 18} L ${x + 14} ${y + 18}
              L ${x + 14} ${y - 4} L ${x + 20} ${y - 4} L ${x + 20} ${y - 12}
              L ${x + 14} ${y - 16} L ${x + 8} ${y - 20} L ${x - 8} ${y - 20} Z
            `} />
          </clipPath>
        </defs>

        <path d={`
          M ${x - 13} ${y - 14} L ${x - 19} ${y - 10} L ${x - 19} ${y - 2}
          L ${x - 13} ${y - 2} L ${x - 13} ${y + 20} L ${x + 15} ${y + 20}
          L ${x + 15} ${y - 2} L ${x + 21} ${y - 2} L ${x + 21} ${y - 10}
          L ${x + 15} ${y - 14} L ${x + 9} ${y - 18} L ${x - 7} ${y - 18} Z
        `} fill="rgba(0,0,0,0.3)" />

        <path d={`
          M ${x - 14} ${y - 16} L ${x - 20} ${y - 12} L ${x - 20} ${y - 4}
          L ${x - 14} ${y - 4} L ${x - 14} ${y + 18} L ${x + 14} ${y + 18}
          L ${x + 14} ${y - 4} L ${x + 20} ${y - 4} L ${x + 20} ${y - 12}
          L ${x + 14} ${y - 16} L ${x + 8} ${y - 20} L ${x - 8} ${y - 20} Z
        `} fill={primary} />

        {accent && (
          <rect x={x - 4} y={y - 20} width={8} height={38} fill={accent} opacity={0.3} clipPath={`url(#${clipId})`} />
        )}

        <path d={`M ${x - 8} ${y - 20} Q ${x} ${y - 16} ${x + 8} ${y - 20}`} fill="none" stroke={secondary} strokeWidth="1.5" />
        <line x1={x - 20} y1={y - 4} x2={x - 14} y2={y - 4} stroke={secondary} strokeWidth="1.5" />
        <line x1={x + 14} y1={y - 4} x2={x + 20} y2={y - 4} stroke={secondary} strokeWidth="1.5" />

        <path d={`
          M ${x - 14} ${y - 16} L ${x - 20} ${y - 12} L ${x - 20} ${y - 4}
          L ${x - 14} ${y - 4} L ${x - 14} ${y + 18} L ${x + 14} ${y + 18}
          L ${x + 14} ${y - 4} L ${x + 20} ${y - 4} L ${x + 20} ${y - 12}
          L ${x + 14} ${y - 16} L ${x + 8} ${y - 20} L ${x - 8} ${y - 20} Z
        `} fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1" />

        <rect x={x - 30} y={y + 22} width={60} height={15} fill="rgba(0,0,0,0.85)" rx="3" />
        <text x={x} y={y + 32} textAnchor="middle" fontSize="8.5" fill="white" fontWeight="700" letterSpacing="0.4" style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>
          {player.name.split(' ').slice(-1)[0].toUpperCase()}
        </text>
      </g>
    );
  }

  return (
    <g>
      <path d={`
        M ${x - 14} ${y - 16} L ${x - 20} ${y - 12} L ${x - 20} ${y - 4}
        L ${x - 14} ${y - 4} L ${x - 14} ${y + 18} L ${x + 14} ${y + 18}
        L ${x + 14} ${y - 4} L ${x + 20} ${y - 4} L ${x + 20} ${y - 12}
        L ${x + 14} ${y - 16} L ${x + 8} ${y - 20} L ${x - 8} ${y - 20} Z
      `} fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeDasharray="3,2" />
      <text x={x} y={y + 4} textAnchor="middle" fontSize="10" fill="rgba(255,255,255,0.4)" fontWeight="600">+</text>
      <rect x={x - 20} y={y + 22} width={40} height={15} fill="rgba(0,0,0,0.3)" rx="3" />
      <text x={x} y={y + 32} textAnchor="middle" fontSize="8" fill="white" opacity="0.4" fontWeight="600">{label}</text>
    </g>
  );
};

export default PlayerIcon;
