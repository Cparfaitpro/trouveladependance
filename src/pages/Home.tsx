// src/pages/Home.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { useGame } from '../context/GameContext';
import Layout from '../components/ui/Layout';

export default function Home() {
  const [teamName, setTeamName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { setTeam } = useGame();
  const handleStart = () => {
    if (!teamName.trim()) {
      setError('Veuillez remplir tous les champs');
      return;
    }
    // Sauvegarde dans le contexte global
    setTeam(teamName);
    // Redirige vers le jeu
    navigate('/game');
  };

  return (
    <div className="min-h-screen bg-[url('/path/to/your/background-image.jpg')] bg-cover bg-center text-slate-100 flex items-center justify-center">
      {/* Pas d'espace entre bg et contenu */}
      <div className="w-full max-w-md space-y-8 bg-slate-900/80 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-2xl"> {/* Div pour lisibilité sur image */}
        {/* Titre principal */}
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-400 mb-4">
            <span className="text-white">Trouve la</span> Dépendance
          </h1>
          <p className="text-slate-300 text-lg md:text-xl leading-relaxed">
            Trouve la Dépendance est un jeu intéractif où l'objectif est de trouver l'addiction d'une personne, grâce à vos connaissances et les indices que vous disposez.
          </p>
        </div>

        {/* Carte de création d'équipe */}
        <Card className="bg-slate-800/90 p-6 rounded-2xl shadow-xl border border-slate-700">
          <h2 className="text-2xl font-semibold text-white mb-6 text-center">
            Créer votre brigade
          </h2>
          <div className="space-y-5">
            {/* Nom d'équipe */}
            <div>
              <label className="block text-sm font-medium mb-2 text-slate-200">
                Nom de l'équipe
              </label>
              <input
                type="text"
                value={teamName}
                onChange={(e) => {
                  setTeamName(e.target.value);
                  setError('');
                }}
                className="w-full p-3 rounded-lg bg-slate-700/80 text-slate-100 placeholder-slate-400 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>

            {/* Erreur */}
            {error && (
              <p className="text-red-500 text-sm text-center font-medium">{error}</p>
            )}

            {/* Bouton démarrer */}
            <Button 
              onClick={handleStart} 
              className="w-full py-3 text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-lg shadow-lg"
            >
              Lancer l'enquête
            </Button>
          </div>
        </Card>
      </div>
      <Layout />
    </div>
  );
}