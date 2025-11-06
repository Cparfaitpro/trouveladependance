import Timer from "../game/Timer";

// src/components/HeaderGame.tsx
interface HeaderGameProps {
  team: string;
  currentQuestion: number;
  numQuestion: number;
  score: number;
}

export default function HeaderGame({ team, currentQuestion, numQuestion, score }: HeaderGameProps) {

    return (
        <header className="fixed inset-x-0 top-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700">
            <div className="px-4 py-3 flex items-center justify-between text-sm md:text-base">
                {/* Nom d'équipe - Gauche */}
                <div className="flex items-center gap-2 font-bold text-blue-400">
                <span className="hidden sm:inline">Brigade :</span>
                <span className="truncate max-w-[120px] sm:max-w-none">{team}</span>
                </div>

                {/* Question + Score - Milieu */}
                <div className="flex items-center gap-6 text-center">
                <div>
                    <span className="text-slate-400">Question</span><br />
                    <strong className="text-xl text-white">{currentQuestion + 1}</strong>
                    <span className="text-slate-400">/{numQuestion}</span>
                </div>
                <div>
                    <span className="text-slate-400">Score</span><br />
                    <strong className="text-xl text-green-400">{score}</strong>
                </div>
                </div>

                {/* Timer - Droite */}
                <Timer minutes={20} seconds={0}/>
            </div>
        </header>
    );
};