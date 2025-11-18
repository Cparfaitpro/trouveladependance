// src/pages/Fin.tsx
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { useGame } from '../context/GameContext';
import { questions } from '../data/questions';
import { useEffect } from 'react';

export default function Fin() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = useGame();
  const { team, score } = state;
  useEffect(() => {
      if (!team || team.trim() === '') {
        navigate('/', { replace: true });
      }
    }, [team, navigate]);
  

  // Récupération du temps restant (en secondes) passé via navigate state depuis Game.tsx ou Timer
  const remainingSeconds = (location.state?.remainingTime as number) ?? 0;
  const minutes = Math.floor(remainingSeconds / 60).toString().padStart(2, '0');
  const seconds = (remainingSeconds % 60).toString().padStart(2, '0');

  const maxPossibleScore = questions.length * 2; // 1 point par question + 1 point bonus doc max

  return (
    <div className="min-h-screen bg-[url('/path/to/victory-background.jpg')] bg-cover bg-center flex items-center justify-center p-4">
      {/* Fond semi-transparent global pour lisibilité parfaite sur image */}
      <div className="w-full max-w-2xl">
        <Card className="bg-slate-900/95 backdrop-blur-xl border-slate-700 p-8 md:p-12 rounded-3xl shadow-2xl text-center space-y-10">
          {/* Titre victoire */}
          <div>
            <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-4">
              Enquête terminée !
            </h1>
            <p className="text-2xl text-slate-300">
              Bien joué, <span className="font-bold text-blue-400">Brigade {team || 'Anonyme'}</span> !
            </p>
          </div>

          {/* Résumé en cartes stylisées */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-lg">
            <div className="bg-slate-800/80 rounded-2xl p-6 border border-slate-600">
              <p className="text-slate-400">Score final</p>
              <p className="text-4xl font-bold text-green-400 mt-2">
                {score}
                <span className="text-xl text-slate-400"> / {maxPossibleScore}</span>
              </p>
            </div>

            <div className="bg-slate-800/80 rounded-2xl p-6 border border-slate-600">
              <p className="text-slate-400">Temps restant</p>
              <p className="text-4xl font-bold text-yellow-400 mt-2 font-mono">
                {minutes}:{seconds}
              </p>
            </div>

            <div className="bg-slate-800/80 rounded-2xl p-6 border border-slate-600">
              <p className="text-slate-400">Performance</p>
              <p className="text-4xl font-bold text-purple-400 mt-2">
                {Math.round((score / maxPossibleScore) * 100)}%
              </p>
            </div>
          </div>

          {/* Message personnalisé selon performance */}
          <div className="text-xl text-slate-300 italic">
            {score >= maxPossibleScore * 0.9 ? 'Excellente investigation ! Vous êtes des experts en prévention.' :
             score >= maxPossibleScore * 0.7 ? 'Très bon score ! Vous avez bien sensibilisé.' :
             score >= maxPossibleScore * 0.5 ? 'Bon travail, continuez à vous informer !' :
             'Il y a encore des choses à découvrir sur les addictions.'}
          </div>

          {/* Boutons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate('/')}
              className="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-xl shadow-lg"
            >
              Rejouer
            </Button>

            <Button
              onClick={() => navigate('/credits')}
              className="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 rounded-xl shadow-lg"
            >
              Crédits
            </Button>
          </div>

          {/* Footer discret */}
          <p className="text-xs text-slate-500 pt-8">
            Jeu éducatif • Prévention des addictions • Sensibilisation sans stigmatisation
          </p>
        </Card>
      </div>
    </div>
  );
}