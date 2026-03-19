import React from "react";
import { User } from "lucide-react";
import { Player, getTeamName } from "@/data/teams";

// Team kit colors: [primary, secondary, accent/stripe]
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
  const team = player ? teamMap.get(player.team) : null;
  const kitImage = team?.kitImage;
  const colors = player ? TEAM_COLORS[player.team] || ['#555', '#999'] : ['#555', '#999'];
  const [primary, secondary, accent] = colors;

  if (player) {
    const clipId = `jersey-clip-${player.id}`;
    const hasKitImage = !!kitImage;

    return (
      <g>
        <defs>
          <clipPath id={clipId}>
            {/* Jersey/shirt shape */}
            <path d={`
              M ${x - 14} ${y - 16}
              L ${x - 20} ${y - 12}
              L ${x - 20} ${y - 4}
              L ${x - 14} ${y - 4}
              L ${x - 14} ${y + 18}
              L ${x + 14} ${y + 18}
              L ${x + 14} ${y - 4}
              L ${x + 20} ${y - 4}
              L ${x + 20} ${y - 12}
              L ${x + 14} ${y - 16}
              L ${x + 8} ${y - 20}
              L ${x - 8} ${y - 20}
              Z
            `} />
          </clipPath>
        </defs>

        {/* Drop shadow */}
        <path d={`
          M ${x - 14 + 1} ${y - 16 + 2}
          L ${x - 20 + 1} ${y - 12 + 2}
          L ${x - 20 + 1} ${y - 4 + 2}
          L ${x - 14 + 1} ${y - 4 + 2}
          L ${x - 14 + 1} ${y + 18 + 2}
          L ${x + 14 + 1} ${y + 18 + 2}
          L ${x + 14 + 1} ${y - 4 + 2}
          L ${x + 20 + 1} ${y - 4 + 2}
          L ${x + 20 + 1} ${y - 12 + 2}
          L ${x + 14 + 1} ${y - 16 + 2}
          L ${x + 8 + 1} ${y - 20 + 2}
          L ${x - 8 + 1} ${y - 20 + 2}
          Z
        `} fill="rgba(0,0,0,0.3)" />

        {/* Jersey base color */}
        <path d={`
          M ${x - 14} ${y - 16}
          L ${x - 20} ${y - 12}
          L ${x - 20} ${y - 4}
          L ${x - 14} ${y - 4}
          L ${x - 14} ${y + 18}
          L ${x + 14} ${y + 18}
          L ${x + 14} ${y - 4}
          L ${x + 20} ${y - 4}
          L ${x + 20} ${y - 12}
          L ${x + 14} ${y - 16}
          L ${x + 8} ${y - 20}
          L ${x - 8} ${y - 20}
          Z
        `} fill={primary} />

        {/* Vertical stripe detail */}
        {accent && (
          <rect
            x={x - 4}
            y={y - 20}
            width={8}
            height={38}
            fill={accent}
            opacity={0.3}
            clipPath={`url(#${clipId})`}
          />
        )}

        {/* Collar / neckline */}
        <path
          d={`M ${x - 8} ${y - 20} Q ${x} ${y - 16} ${x + 8} ${y - 20}`}
          fill="none"
          stroke={secondary}
          strokeWidth="1.5"
        />

        {/* Sleeve cuffs */}
        <line x1={x - 20} y1={y - 4} x2={x - 14} y2={y - 4} stroke={secondary} strokeWidth="1.5" />
        <line x1={x + 14} y1={y - 4} x2={x + 20} y2={y - 4} stroke={secondary} strokeWidth="1.5" />

        {/* Jersey outline */}
        <path d={`
          M ${x - 14} ${y - 16}
          L ${x - 20} ${y - 12}
          L ${x - 20} ${y - 4}
          L ${x - 14} ${y - 4}
          L ${x - 14} ${y + 18}
          L ${x + 14} ${y + 18}
          L ${x + 14} ${y - 4}
          L ${x + 20} ${y - 4}
          L ${x + 20} ${y - 12}
          L ${x + 14} ${y - 16}
          L ${x + 8} ${y - 20}
          L ${x - 8} ${y - 20}
          Z
        `} fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1" />

        {/* Kit image overlay if available */}
        {hasKitImage && (
          <image
            href={kitImage}
            x={x - 22}
            y={y - 22}
            width="44"
            height="44"
            preserveAspectRatio="xMidYMid slice"
            clipPath={`url(#${clipId})`}
            opacity="0.85"
          />
        )}

        {/* Player name label */}
        <rect
          x={x - 30}
          y={y + 22}
          width={60}
          height={15}
          fill="rgba(0,0,0,0.85)"
          rx="3"
        />
        <text
          x={x}
          y={y + 32}
          textAnchor="middle"
          fontSize="8.5"
          fill="white"
          fontWeight="700"
          letterSpacing="0.4"
          style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif" }}
        >
          {player.name.split(' ').slice(-1)[0].toUpperCase()}
        </text>
      </g>
    );
  }

  // Empty slot
  return (
    <g>
      <path d={`
        M ${x - 14} ${y - 16}
        L ${x - 20} ${y - 12}
        L ${x - 20} ${y - 4}
        L ${x - 14} ${y - 4}
        L ${x - 14} ${y + 18}
        L ${x + 14} ${y + 18}
        L ${x + 14} ${y - 4}
        L ${x + 20} ${y - 4}
        L ${x + 20} ${y - 12}
        L ${x + 14} ${y - 16}
        L ${x + 8} ${y - 20}
        L ${x - 8} ${y - 20}
        Z
      `} fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeDasharray="3,2" />
      <text
        x={x}
        y={y + 4}
        textAnchor="middle"
        fontSize="10"
        fill="rgba(255,255,255,0.4)"
        fontWeight="600"
      >
        +
      </text>
      <rect
        x={x - 20}
        y={y + 22}
        width={40}
        height={15}
        fill="rgba(0,0,0,0.3)"
        rx="3"
      />
      <text
        x={x}
        y={y + 32}
        textAnchor="middle"
        fontSize="8"
        fill="white"
        opacity="0.4"
        fontWeight="600"
      >
        {label}
      </text>
    </g>
  );
};

export default PlayerIcon;
