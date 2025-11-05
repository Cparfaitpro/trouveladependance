// src/pages/Home.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card }from '../components/ui/Card';
import { useGame } from '../context/GameContext';

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
      <div className="">
        <div className="">

          {/* Titre principal */}
          <div className="">
            <h1 className="">
              <span className="">
                Trouve la Dépendance
              </span>{' '}
            </h1>
            <p className="">
              Trouve la Dépendance est un jeu intéractif où l'objectif est de trouver l'addiction d'une personne, grâce à vos connaissances et les indices que vous disposez.
            </p>
          </div>

          {/* Carte de création d'équipe */}
          <Card className="">
            <h2 className="">
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
                  className=""
                />
              </div>
              {/* Erreur */}
              {error && (
                <p className="">{error}</p>
              )}

              {/* Bouton démarrer */}
              <br></br>
              <Button
                onClick={handleStart}
                className=""
              >
                Lancer l'enquête
              </Button>
            </div>
          </Card>

          {/* Infos bas de page */}
          <div className="text-center text-xs text-slate-400 space-y-1">
            <p>Jeu éducatif de prévention des addictions</p>
            <p>Conçu pour la sensibilisation • Pas de stigmatisation</p>
          </div>
        </div>
      </div>
  );
}