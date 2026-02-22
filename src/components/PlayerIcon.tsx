import React from "react";
import { Player, teams } from "@/data/teams";

interface PlayerIconProps {
  player: Player | null;
  x: number;
  y: number;
  label: string;
}

const teamMap = new Map(teams.map(t => [t.name, t]));

// FPL-style jersey/shirt SVG path (centered at 0,0, roughly 40x44)
const JERSEY_PATH = "M-20,-22 L-12,-22 L-8,-18 L-4,-22 L4,-22 L8,-18 L12,-22 L20,-22 L20,-10 L14,-10 L14,22 L-14,22 L-14,-10 L-20,-10 Z";

const PlayerIcon: React.FC<PlayerIconProps> = ({ player, x, y, label }) => {
  const team = player ? teamMap.get(player.team) : null;

  if (player) {
    // Team colors for jersey - derive from team or use defaults
    const primaryColor = team ? getTeamPrimaryColor(team.name) : "#666";
    const secondaryColor = team ? getTeamSecondaryColor(team.name) : "#999";

    return (
      <g>
        {/* Jersey shape */}
        <g transform={`translate(${x}, ${y})`}>
          {/* Jersey shadow */}
          <path
            d={JERSEY_PATH}
            fill="rgba(0,0,0,0.25)"
            transform="translate(1.5, 1.5) scale(0.72)"
          />
          {/* Jersey body */}
          <path
            d={JERSEY_PATH}
            fill={primaryColor}
            stroke={secondaryColor}
            strokeWidth="1.5"
            transform="scale(0.72)"
          />
          {/* Jersey stripe/detail */}
          <rect
            x={-6}
            y={-8}
            width={12}
            height={18}
            fill={secondaryColor}
            opacity="0.3"
            rx="1"
            transform="scale(0.72)"
          />
          {/* Player number or position text on jersey */}
          <text
            x={0}
            y={4}
            textAnchor="middle"
            fontSize="11"
            fill="#fff"
            fontWeight="bold"
            style={{ textShadow: "0 1px 2px rgba(0,0,0,0.6)" }}
          >
            {label}
          </text>
        </g>

        {/* Player name label below jersey */}
        <rect
          x={x - 34}
          y={y + 20}
          width={68}
          height={16}
          fill="rgba(0,0,0,0.75)"
          rx="3"
        />
        <text
          x={x}
          y={y + 31}
          textAnchor="middle"
          fontSize="9"
          fill="white"
          fontWeight="600"
          letterSpacing="0.3"
        >
          {player.name.split(' ').slice(-1)[0].toUpperCase()}
        </text>
      </g>
    );
  }

  // Empty slot placeholder
  return (
    <g>
      <g transform={`translate(${x}, ${y})`}>
        <path
          d={JERSEY_PATH}
          fill="#555"
          stroke="#777"
          strokeWidth="1.5"
          opacity="0.4"
          transform="scale(0.72)"
        />
        <text
          x={0}
          y={4}
          textAnchor="middle"
          fontSize="11"
          fill="#fff"
          fontWeight="bold"
          opacity="0.5"
        >
          {label}
        </text>
      </g>
      <rect
        x={x - 24}
        y={y + 20}
        width={48}
        height={16}
        fill="rgba(0,0,0,0.4)"
        rx="3"
      />
      <text
        x={x}
        y={y + 31}
        textAnchor="middle"
        fontSize="9"
        fill="white"
        opacity="0.5"
        fontWeight="600"
      >
        EMPTY
      </text>
    </g>
  );
};

// PSL team color mappings
function getTeamPrimaryColor(teamName: string): string {
  const colors: Record<string, string> = {
    'Kaizer Chiefs': '#FDB913',
    'Orlando Pirates': '#000000',
    'Mamelodi Sundowns': '#FFD700',
    'Stellenbosch FC': '#8B0000',
    'Sekhukhune United': '#006400',
    'AmaZulu FC': '#006633',
    'Chippa United': '#FF4500',
    'Lamontville Golden Arrows': '#FFD700',
    'Richards Bay FC': '#003366',
    'Polokwane City FC': '#000080',
    'TS Galaxy FC': '#800080',
    'Marumo Gallants FC': '#8B4513',
    'Siwelele Football Club': '#006400',
    'Durban City Football Club': '#1E90FF',
    'Magesi FC': '#228B22',
  };
  return colors[teamName] || '#555555';
}

function getTeamSecondaryColor(teamName: string): string {
  const colors: Record<string, string> = {
    'Kaizer Chiefs': '#000000',
    'Orlando Pirates': '#FFFFFF',
    'Mamelodi Sundowns': '#009639',
    'Stellenbosch FC': '#FFD700',
    'Sekhukhune United': '#FFD700',
    'AmaZulu FC': '#FFFFFF',
    'Chippa United': '#000080',
    'Lamontville Golden Arrows': '#006400',
    'Richards Bay FC': '#FFD700',
    'Polokwane City FC': '#00BFFF',
    'TS Galaxy FC': '#FFD700',
    'Marumo Gallants FC': '#FFD700',
    'Siwelele Football Club': '#FFFFFF',
    'Durban City Football Club': '#FFFFFF',
    'Magesi FC': '#FFD700',
  };
  return colors[teamName] || '#999999';
}

export default PlayerIcon;
