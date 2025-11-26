// src/components/Timer.tsx (conditionner la redirection et le décrément)
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../../context/GameContext';

interface TimerProps {
  minutes: number;
  seconds: number;
}

export default function Timer({ minutes, seconds }: TimerProps) {
  const navigate = useNavigate();
  const { state } = useGame();
  const { isTimerEnabled } = state;

  const [timeLeft, setTimeLeft] = useState(minutes * 60 + seconds);

  useEffect(() => {
    if (!isTimerEnabled) {
      // Si désactivé, ne rien faire (pas de décrément, pas de redirection)
      return;
    }

    if (timeLeft <= 0) {
      navigate('/fin');
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, navigate, isTimerEnabled]);

  if (!isTimerEnabled) {
    return null; // Ne rien afficher si désactivé
  }

  const displayMinutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const displaySeconds = (timeLeft % 60).toString().padStart(2, '0');

  return (
    <span className="font-mono text-lg text-yellow-400">
      {displayMinutes}:{displaySeconds}
    </span>
  );
}