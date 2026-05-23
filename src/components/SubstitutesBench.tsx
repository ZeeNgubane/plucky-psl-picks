import { Player } from "@/data/teams";
import { useTeamLogos } from "@/hooks/use-team-logos";
import { cn } from "@/lib/utils";

interface SubstitutesBenchProps {
  substitutes: Player[];
  onPlayerClick: (player: Player) => void;
  playerToSwap: Player | null;
}

const positionOrder: { [key: string]: number } = { GK: 1, DEF: 2, MID: 3, FWD: 4 };

const SubstitutesBench = ({ substitutes, onPlayerClick, playerToSwap }: SubstitutesBenchProps) => {
  const logos = useTeamLogos();
  const sorted = [...substitutes].sort((a, b) => positionOrder[a.position] - positionOrder[b.position]);

  const labelFor = (p: Player, i: number) => {
    if (p.position === "GK") return "GKP";
    const outfield = sorted.filter((x) => x.position !== "GK");
    const idx = outfield.indexOf(p);
    return `${idx + 1}. ${p.position}`;
  };

  return (
    <div className="w-full max-w-[480px] mx-auto mt-3 rounded-xl bg-[#1a6b2a]/70 backdrop-blur-sm border border-emerald-700/40 px-2 py-3">
      <div className="flex justify-around items-end gap-1">
        {sorted.map((p, i) => {
          const surname = p.name.split(" ").slice(-1)[0].toUpperCase();
          const isSelected = playerToSwap?.id === p.id;
          const logo = logos[p.team];
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => onPlayerClick(p)}
              className={cn(
                "flex flex-col items-center w-[60px] sm:w-[80px] focus:outline-none transition-transform",
                isSelected && "scale-105"
              )}
            >
              <span className="text-[8px] sm:text-[9px] font-bold text-white/90 mb-1 tracking-wide">
                {labelFor(p, i)}
              </span>
              <div className={cn("flex items-center justify-center h-[40px] sm:h-[50px] w-full", isSelected && "ring-2 ring-primary rounded-md")}>
                {logo ? (
                  <img src={logo} alt={p.team} className="h-full w-auto object-contain drop-shadow-md" />
                ) : (
                  <div className="h-full w-[36px] rounded-md bg-white/15 flex items-center justify-center text-white/70 text-[10px] font-bold">
                    {surname.slice(0, 2)}
                  </div>
                )}
              </div>
              <div className="w-full mt-1 rounded-[3px] overflow-hidden bg-[#0a0e27] shadow">
                <div className="text-white text-[10px] sm:text-[11px] font-bold text-center py-[2px] px-1 truncate leading-tight">
                  {surname}
                </div>
                <div className="bg-[#1a1f3a] text-gray-300 text-[8px] sm:text-[9px] text-center py-[1px] px-1 truncate leading-tight">
                  SUN (A)
                </div>
              </div>
            </button>
          );
        })}
        {sorted.length === 0 && (
          <p className="text-white/70 text-sm py-4">Bench is empty</p>
        )}
      </div>
    </div>
  );
};

export default SubstitutesBench;
