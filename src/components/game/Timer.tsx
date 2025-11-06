// src/components/Timer.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface TimerProps {
  minutes: number;
  seconds: number;
}

export default function Timer({ minutes, seconds }: TimerProps) {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(minutes * 60 + seconds);

  useEffect(() => {
    if (timeLeft <= 0) {
      navigate('/fin', { replace: true });
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, navigate]);

  const displayMinutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const displaySeconds = (timeLeft % 60).toString().padStart(2, '0');

  return (
    <div className="flex items-center gap-2">
        <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      <span className="font-mono text-lg text-yellow-400">{displayMinutes}:{displaySeconds}</span>
    </div>
  );
}