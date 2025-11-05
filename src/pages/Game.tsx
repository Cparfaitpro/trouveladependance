// src/pages/Game.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { useGame } from '../context/GameContext';
import { questions } from '../data/questions';
import { documents } from '../data/documents';

export default function Game() {
  const navigate = useNavigate();
  const { state, setScore, setCurrentQuestion } = useGame();
  const { currentQuestion, score, team } = state;

  // États locaux
  const [selectedQCU, setSelectedQCU] = useState<number | null>(null);
  const [selectedQCM, setSelectedQCM] = useState<number[]>([]);
  const [selectedDoc, setSelectedDoc] = useState<number | null>(null); // Document choisi
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isDocCorrect, setIsDocCorrect] = useState(false);

  const question = questions[currentQuestion];
  if (!question) {
    navigate('/fin');
    return null;
  }

  useEffect(() => {
    if (!team || team.trim() === '') {
      navigate('/', { replace: true });
    }
  }, [team, navigate]);

  /** Vérifie la réponse principale */
  /** Vérifie la réponse principale */
  const checkMainAnswer = (): boolean => {
  // SÉCURITÉ : forcer correct en tableau
  const correctArray = Array.isArray(question.correct) ? question.correct : [];

  if (question.type === 'QCU') {
    return selectedQCU !== null && correctArray.indexOf(selectedQCU) !== -1;
  }

  if (question.type === 'QCM') {
    const correctArray = Array.isArray(question.correct) ? question.correct : [];
    const selectedArr = Array.isArray(selectedQCM) ? selectedQCM : [];

    // Tri pour comparer proprement
    const sortedCorrect = [...correctArray].sort((a, b) => a - b);
    const sortedSelected = [...selectedArr].sort((a, b) => a - b);

    // Doit être EXACTEMENT les mêmes indices
    return (
        sortedSelected.length === sortedCorrect.length &&
        sortedSelected.every((val, i) => val === sortedCorrect[i])
    );
}

  return false;
};

  /** Vérifie le document bonus */
const checkDocBonus = (): boolean => {
  if (!selectedDoc) return false;
  const docArray = Array.isArray(question.correct_doc) ? question.correct_doc : [];
  return docArray.indexOf(selectedDoc) !== -1;
};

  /** Soumission */
  const handleSubmit = () => {
    const mainCorrect = checkMainAnswer();
    const docCorrect = mainCorrect ? checkDocBonus() : false;

    setIsCorrect(mainCorrect);
    setIsDocCorrect(docCorrect);
    setShowResult(true);

    // Score : +1 pour réponse principale, +1 bonus si doc correct
    const bonus = docCorrect ? 1 : 0;
    setScore(score + (mainCorrect ? 1 : 0) + bonus);
  };
  
  useEffect(() => {
  const unloadCallback = (event: { preventDefault: () => void; returnValue: string; }) => {
    event.preventDefault();
    event.returnValue = "";
    return "";
  };

  window.addEventListener("beforeunload", unloadCallback);
  return () => window.removeEventListener("beforeunload", unloadCallback);
}, []);

  /** Question suivante */
  const goNext = () => {
    const next = currentQuestion + 1;
    if (next >= questions.length) {
      navigate('/fin');
    } else {
      setCurrentQuestion(next);
      // Reset
      setSelectedQCU(null);
      setSelectedQCM([]);
      setSelectedDoc(null);
      setShowResult(false);
      setIsCorrect(false);
      setIsDocCorrect(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <Card className="p-6 space-y-6 bg-slate-800/90 text-slate-100">
          {/* En-tête */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <h1 className="text-2xl font-bold">Brigade : {team}</h1>
            <div className="flex gap-4 text-lg">
              <span>Question <strong>{currentQuestion + 1}</strong>/{questions.length}</span>
              <span>Score : <strong>{score}</strong></span>
            </div>
          </div>

          {/* Texte de la question */}
          <h2 className="text-xl font-semibold">{question.text}</h2>

          {/* === RÉPONSES SELON TYPE === */}
          <div className="space-y-6">

            {/* QCU : Menu déroulant */}
            {question.type === 'QCU' && (
              <select
                value={selectedQCU ?? ''}
                onChange={(e) => setSelectedQCU(Number(e.target.value))}
                disabled={showResult}
                className="w-full p-3 rounded-lg bg-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>Choisissez une réponse...</option>
                {question.options.map((opt, idx) => (
                  <option key={idx} value={idx}>
                    {idx + 1}. {opt}
                  </option>
                ))}
              </select>
            )}

            {/* QCM : Cases à cocher */}
        {question.type === 'QCM' && (
        <div className="space-y-3">
            {question.options.map((opt, idx) => {
            // === SÉCURITÉ : correct est un tableau ===
            const correctArray = Array.isArray(question.correct) ? question.correct : [];
            const isChecked = Array.isArray(selectedQCM)
                ? selectedQCM.indexOf(idx) !== -1
                : false;

            // Feedback visuel : vert si correct, rouge si faux
            const isCorrectAnswer = correctArray.indexOf(idx) !== -1;
            const showCorrect = showResult && isCorrectAnswer;
            const showWrong = showResult && isChecked && !isCorrectAnswer;

            return (
                <label
                key={idx}
                className={`
                    flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all select-none
                    ${showResult
                    ? showCorrect
                        ? 'bg-green-600 text-white font-medium'
                        : showWrong
                        ? 'bg-red-600 text-white font-medium'
                        : 'bg-slate-700 text-slate-300'
                    : isChecked
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-700 hover:bg-slate-600 text-slate-200'
                    }
                    ${showResult ? 'cursor-default' : ''}
                `}
                >
                <input
                    type="checkbox"
                    checked={isChecked}
                    disabled={showResult}
                    onChange={() => {
                    setSelectedQCM(prev => {
                        const arr = Array.isArray(prev) ? prev : [];
                        return arr.indexOf(idx) !== -1
                        ? arr.filter(i => i !== idx)
                        : [...arr, idx];
                    });
                    }}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                />
                <span>
                    {idx + 1}. {opt}
                </span>
                </label>
            );
            })}
        </div>
        )}
            {/* === CHOIX DU DOCUMENT (BONUS) === */}
            <div className="border-t border-slate-600 pt-4">
              <p className="text-sm font-medium text-slate-300 mb-2">
                Document de référence (bonus) :
              </p>
              <select
                value={selectedDoc ?? ''}
                onChange={(e) => setSelectedDoc(Number(e.target.value))}
                disabled={showResult}
                className={`
                  w-full p-3 rounded-lg bg-slate-700 text-slate-100
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                  ${showResult ? 'opacity-70 cursor-not-allowed' : ''}
                `}
              >
                <option value="" disabled>Choisissez un document...</option>
                {documents.map((doc) => (
                  <option key={doc.id} value={doc.id}>
                    {doc.id} - {doc.text || '(sans titre)'}
                  </option>
                ))}
              </select>

              {/* Feedback visuel sur le document */}
              {showResult && selectedDoc !== null && (
                <div
                  className={`
                    mt-2 p-2 rounded text-sm font-medium text-center
                    ${isDocCorrect ? 'bg-green-700 text-green-100' : 'bg-red-700 text-red-100'}
                  `}
                >
                  {isDocCorrect ? '+1 point bonus' : 'Document incorrect'}
                </div>
              )}
            </div>
          </div>

          {/* Bouton Valider */}
          {!showResult && (
            <Button
              onClick={handleSubmit}
              disabled={
                (question.type === 'QCU' && selectedQCU === null) ||
                (question.type === 'QCM' && selectedQCM.length === 0)
              }
              className="w-full"
            >
              Valider la réponse
            </Button>
          )}

          {/* Résultat + Bouton suivant */}
          {showResult && (
            <div className="space-y-4">
              <div
                className={`
                  p-4 rounded-lg font-bold text-center
                  ${isCorrect ? 'bg-green-700 text-green-100' : 'bg-red-700 text-red-100'}
                `}
              >
                {isCorrect ? 'Réponse correcte !' : 'Réponse incorrecte'}
              </div>

              {isDocCorrect && (
                <div className="p-3 bg-green-700 text-green-100 rounded-lg text-center font-medium">
                  +1 point bonus pour le document !
                </div>
              )}

              <p className="text-sm text-slate-300 italic">{question.explanation}</p>

              <Button onClick={goNext} className="w-full">
                {currentQuestion + 1 === questions.length
                  ? 'Voir les résultats'
                  : 'Question suivante'}
              </Button>
            </div>
          )}
        </Card>

        <p className="text-center text-xs text-slate-500 mt-6">
          Jeu éducatif • Prévention des addictions • Sensibilisation sans stigmatisation
        </p>
      </div>
    </div>
  );
}