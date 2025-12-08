// src/components/Timer.tsx (version corrigée et fiable sur mobile/tablette)
import { useState, useEffect, useRef } from 'react';
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
  const intervalRef = useRef<number | null>(null);

  // Réinitialiser le timer si les props minutes/seconds changent (ex: nouveau niveau)
  useEffect(() => {
    setTimeLeft(minutes * 60 + seconds);
  }, [minutes, seconds]);

  useEffect(() => {
    if (!isTimerEnabled) {
      // Nettoyer l'intervalle si le timer est désactivé
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    // Redirection immédiate si déjà à 0
    if (timeLeft <= 0) {
      navigate('/trouveladependance/fin');
      return;
    }

    // Créer l'intervalle UNE SEULE FOIS
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        const newTime = prev - 1;
        if (newTime <= 0) {
          // On arrête l'intervalle et on redirige dans le prochain cycle React
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          // La redirection sera faite dans le useEffect principal
          return 0;
        }
        return newTime;
      });
    }, 1000);

    // Nettoyage à la désactivation ou au démontage
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isTimerEnabled, navigate]); // ← timeLeft retiré !

  // Redirection quand timeLeft atteint 0 (après le setState)
  useEffect(() => {
    if (timeLeft <= 0 && isTimerEnabled) {
      navigate('/trouveladependance/fin');
    }
  }, [timeLeft, isTimerEnabled, navigate]);

  if (!isTimerEnabled) return null;

  const displayMinutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const displaySeconds = (timeLeft % 60).toString().padStart(2, '0');

  return (
    <span className="font-mono text-lg text-yellow-400">
      {displayMinutes}:{displaySeconds}
    </span>
  );
}