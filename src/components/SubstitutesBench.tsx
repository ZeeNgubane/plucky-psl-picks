import { Player } from "@/data/teams";
import { useTeamLogos } from "@/hooks/use-team-logos";
import { cn } from "@/lib/utils";

interface SubstitutesBenchProps {
  substitutes: Player[];
  onPlayerClick: (player: Player) => void;
  playerToSwap: Player | null;
}

const normalizePos = (p?: string | null): string => {
  const s = (p || "").toLowerCase();
  if (s === "gk" || s === "goalkeeper") return "GK";
  if (s === "def" || s === "defender") return "DEF";
  if (s === "mid" || s === "midfielder") return "MID";
  if (s === "fwd" || s === "forward") return "FWD";
  return (p || "").toUpperCase();
};

const positionOrder: Record<string, number> = { GK: 1, DEF: 2, MID: 3, FWD: 4 };

// Always render 4 bench slots: 1 GKP + 3 outfield, regardless of how many subs are filled
const BENCH_SLOTS = [
  { label: "GKP", position: "GK" as const },
  { label: "1.", position: null },
  { label: "2.", position: null },
  { label: "3.", position: null },
];

const SubstitutesBench = ({ substitutes, onPlayerClick, playerToSwap }: SubstitutesBenchProps) => {
  const logos = useTeamLogos();

  const gk = substitutes.find((p) => normalizePos(p.position) === "GK") || null;
  const outfield = substitutes
    .filter((p) => normalizePos(p.position) !== "GK")
    .sort((a, b) => (positionOrder[normalizePos(a.position)] || 9) - (positionOrder[normalizePos(b.position)] || 9));

  const slots: { label: string; player: Player | null }[] = [
    { label: "GKP", player: gk },
    { label: outfield[0] ? `1. ${normalizePos(outfield[0].position)}` : "1.", player: outfield[0] || null },
    { label: outfield[1] ? `2. ${normalizePos(outfield[1].position)}` : "2.", player: outfield[1] || null },
    { label: outfield[2] ? `3. ${normalizePos(outfield[2].position)}` : "3.", player: outfield[2] || null },
  ];

  return (
    <div className="w-full max-w-[480px] mx-auto mt-3 rounded-xl bg-[#1a6b2a]/70 backdrop-blur-sm border-t-2 border-[#0a0e27]/40 px-2 py-3 shadow-inner">
      <div className="grid grid-cols-4 gap-1 items-end">
        {slots.map((slot, i) => {
          const p = slot.player;
          const surname = p ? p.name.split(" ").slice(-1)[0].toUpperCase() : "";
          const isSelected = !!(p && playerToSwap?.id === p.id);
          const logo = p ? logos[p.team] : undefined;
          return (
            <button
              key={i}
              type="button"
              onClick={() => p && onPlayerClick(p)}
              className={cn(
                "flex flex-col items-center w-full focus:outline-none transition-transform",
                isSelected && "scale-105",
                !p && "opacity-70"
              )}
            >
              <span className="text-[8px] sm:text-[9px] font-bold text-white/90 mb-1 tracking-wide">
                {slot.label}
              </span>
              <div
                className={cn(
                  "flex items-center justify-center h-[40px] sm:h-[50px] w-full",
                  isSelected && "ring-2 ring-primary rounded-md"
                )}
              >
                {p && logo ? (
                  <img src={logo} alt={p.team} className="h-full w-auto object-contain drop-shadow-md" />
                ) : (
                  <div className="h-full w-[36px] rounded-md bg-white/15 border border-dashed border-white/40 flex items-center justify-center text-white/70 text-[10px] font-bold">
                    {p ? surname.slice(0, 2) : "+"}
                  </div>
                )}
              </div>
              <div className="w-full mt-1 rounded-[3px] overflow-hidden bg-[#0a0e27] shadow">
                <div className="text-white text-[10px] sm:text-[11px] font-bold text-center py-[2px] px-1 truncate leading-tight">
                  {p ? surname : "—"}
                </div>
                <div className="bg-[#1a1f3a] text-gray-300 text-[8px] sm:text-[9px] text-center py-[1px] px-1 truncate leading-tight">
                  {p ? "SUN (A)" : "—"}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SubstitutesBench;
