
import React from "react";
import { User } from "lucide-react";
import { Player } from "@/data/teams";

interface PlayerIconProps {
  player: Player | null;
  x: number;
  y: number;
  label: string;
}

const getBg = (label: string) =>
  label === "GK" ? "#facc15"
  : label === "DEF" ? "#3b82f6"
  : label === "MID" ? "#22c55e"
  : label === "FWD" ? "#ef4444"
  : "#888";

// Ready for player images when available, fallback to icon and initials
const PlayerIcon: React.FC<PlayerIconProps> = ({ player, x, y, label }) => (
  <g>
    <circle
      cx={x}
      cy={y}
      r={28}
      fill={getBg(label)}
      opacity={player ? "1" : "0.5"}
      stroke="#fff"
      strokeWidth="3"
    />
    {/* Human icon (replace with <image> later) */}
    <g transform={`translate(${x - 18}, ${y - 18})`}>
      <User
        size={36}
        color="#fff"
        strokeWidth={2.2}
        style={{ opacity: player ? 1 : 0.6 }}
      />
    </g>
    {/* Player initials over the icon */}
    <text
      x={x}
      y={y + 24}
      textAnchor="middle"
      fontWeight="bold"
      fontSize="14"
      fill="#fff"
      opacity={player ? "0.95" : "0.65"}
      style={{ textShadow: "0 1px 3px #0007" }}
    >
      {player ? player.name.split(" ").map(n => n[0]).join("") : ""}
    </text>
    {/* Player name (first) or position */}
    <text
      x={x}
      y={y + 38}
      textAnchor="middle"
      fontSize="13"
      fill="#fff"
      opacity="0.85"
    >
      {player ? player.name.split(" ")[0] : label}
    </text>
  </g>
);

export default PlayerIcon;
