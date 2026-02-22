import React from "react";
import { User } from "lucide-react";
import { Player, teams } from "@/data/teams";

interface PlayerIconProps {
  player: Player | null;
  x: number;
  y: number;
  label: string;
}

const teamMap = new Map(teams.map(t => [t.name, t]));

// Jersey/shirt clip path for masking kit images (centered at 0,0)
const JERSEY_CLIP_PATH = "M-20,-22 L-12,-22 L-8,-16 L-4,-22 L4,-22 L8,-16 L12,-22 L20,-22 L20,-8 L14,-8 L14,22 L-14,22 L-14,-8 L-20,-8 Z";

const PlayerIcon: React.FC<PlayerIconProps> = ({ player, x, y, label }) => {
  const team = player ? teamMap.get(player.team) : null;
  const kitImage = team?.kitImage;

  if (player && kitImage) {
    const clipId = `jersey-clip-${player.id}`;
    return (
      <g>
        <defs>
          {/* Clip path in jersey shape */}
          <clipPath id={clipId}>
            <path d={JERSEY_CLIP_PATH} transform={`translate(${x}, ${y}) scale(1.1)`} />
          </clipPath>
        </defs>

        {/* Shadow behind jersey */}
        <path
          d={JERSEY_CLIP_PATH}
          transform={`translate(${x + 1.5}, ${y + 1.5}) scale(1.1)`}
          fill="rgba(0,0,0,0.3)"
        />

        {/* Kit image clipped to jersey shape */}
        <image
          href={kitImage}
          x={x - 24}
          y={y - 26}
          width="48"
          height="50"
          preserveAspectRatio="xMidYMid slice"
          clipPath={`url(#${clipId})`}
        />

        {/* Jersey outline */}
        <path
          d={JERSEY_CLIP_PATH}
          transform={`translate(${x}, ${y}) scale(1.1)`}
          fill="none"
          stroke="rgba(255,255,255,0.6)"
          strokeWidth="1"
        />

        {/* Player name label below jersey */}
        <rect
          x={x - 34}
          y={y + 26}
          width={68}
          height={16}
          fill="rgba(0,0,0,0.8)"
          rx="3"
        />
        <text
          x={x}
          y={y + 37}
          textAnchor="middle"
          fontSize="9"
          fill="white"
          fontWeight="700"
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
      <path
        d={JERSEY_CLIP_PATH}
        transform={`translate(${x}, ${y}) scale(1.1)`}
        fill="#555"
        stroke="#777"
        strokeWidth="1"
        opacity="0.4"
      />
      <g transform={`translate(${x - 10}, ${y - 10})`}>
        <User size={20} color="#fff" strokeWidth={2} style={{ opacity: 0.5 }} />
      </g>
      <rect
        x={x - 24}
        y={y + 26}
        width={48}
        height={16}
        fill="rgba(0,0,0,0.4)"
        rx="3"
      />
      <text
        x={x}
        y={y + 37}
        textAnchor="middle"
        fontSize="9"
        fill="white"
        opacity="0.5"
        fontWeight="600"
      >
        {label}
      </text>
    </g>
  );
};

export default PlayerIcon;
