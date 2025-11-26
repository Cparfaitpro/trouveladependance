// src/context/GameContext.tsx (ajouter l'état pour le timer)
import { createContext, useContext, useState, type ReactNode } from 'react';

// État du jeu
interface GameState {
  team: string;
  score: number;
  currentQuestion: number;
  isTimerEnabled: boolean; // ← NOUVEAU : true si timer activé
}

// Contexte
export const GameContext = createContext<{
  state: GameState;
  setTeam: (name: string) => void;
  setScore: (score: number) => void;
  setCurrentQuestion: (index: number) => void;
  setIsTimerEnabled: (enabled: boolean) => void; // ← NOUVEAU
} | null>(null);

// Provider
export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [team, setTeam] = useState('');
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isTimerEnabled, setIsTimerEnabled] = useState(true); // ← Par défaut activé

  return (
    <GameContext.Provider
      value={{
        state: { team, score, currentQuestion, isTimerEnabled },
        setTeam,
        setScore,
        setCurrentQuestion,
        setIsTimerEnabled,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

// Hook personnalisé
export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};