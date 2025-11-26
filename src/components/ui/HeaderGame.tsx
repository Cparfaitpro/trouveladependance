// src/components/HeaderGame.tsx (conditionner l'affichage du timer)
import Timer from '../game/Timer'; // Assure-toi d'importer Timer
import { useGame } from '../../context/GameContext';

interface HeaderGameProps {
  team: string;
  currentQuestion: number;
  numQuestion: number;
  score: number;
}

export default function HeaderGame({ team, currentQuestion, numQuestion, score }: HeaderGameProps) {
  const { state } = useGame();
  const { isTimerEnabled } = state;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between text-sm md:text-base">
        {/* Nom d'équipe */}
        <div className="flex items-center gap-2 font-bold text-blue-400">
          <span className="hidden sm:inline">Brigade :</span>
          <span className="truncate max-w-[120px] sm:max-w-none">{team}</span>
        </div>

        {/* Question + Score */}
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

        {/* Timer conditionnel */}
        {isTimerEnabled && (
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <Timer minutes={20} seconds={0} />
          </div>
        )}
      </div>
    </header>
  );
}