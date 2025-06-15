
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

const getBg = (label: string) =>
  label === "GK" ? "#facc15"
  : label === "DEF" ? "#3b82f6"
  : label === "MID" ? "#22c55e"
  : label === "FWD" ? "#ef4444"
  : "#888";

const PlayerIcon: React.FC<PlayerIconProps> = ({ player, x, y, label }) => {
  const team = player ? teamMap.get(player.team) : null;
  const kitImage = team?.kitImage;

  if (player && kitImage) {
    // Render player with kit image
    return (
      <g>
        {/* Kit Image */}
        <image
          href={kitImage}
          x={x - 25}
          y={y - 25}
          height="50"
          width="50"
        />

        {/* Player Name Box */}
        <rect
          x={x - 30}
          y={y + 28}
          width={60}
          height={18}
          fill={getBg(player.position)}
          rx="3"
        />
        <text
          x={x}
          y={y + 41}
          textAnchor="middle"
          fontSize="11"
          fill="white"
          fontWeight="bold"
        >
          {player.name.split(' ').slice(-1)[0]}
        </text>
      </g>
    );
  }

  // Render placeholder for empty slot
  return (
    <g>
      <circle
        cx={x}
        cy={y}
        r={28}
        fill={getBg(label)}
        opacity="0.5"
        stroke="#fff"
        strokeWidth="3"
      />
      <g transform={`translate(${x - 18}, ${y - 18})`}>
        <User size={36} color="#fff" strokeWidth={2.2} style={{ opacity: 0.6 }} />
      </g>
      <text
        x={x}
        y={y + 38}
        textAnchor="middle"
        fontSize="13"
        fill="#fff"
        opacity="0.85"
      >
        {label}
      </text>
    </g>
  );
};

export default PlayerIcon;
