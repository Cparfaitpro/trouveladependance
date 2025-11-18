// src/pages/Game.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { useGame } from '../context/GameContext';
import { questions } from '../data/questions';
import { documents } from '../data/documents';
import HeaderGame from '../components/ui/HeaderGame';
import Layout from '../components/ui/Layout';

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
    <><div className="min-h-screen p-4">
      {/* === HEADER FIXE === */}
      {/* HEADER FIXE */}
      <HeaderGame
        team={team}
        currentQuestion={currentQuestion}
        numQuestion={questions.length}
        score={score} />
      {/* === ESPACE VERTICAL POUR HEADER === */}
      <div className="pt-20"></div>

      {/* === CONTENU PRINCIPAL === */}
      <div className="max-w-none">
        <div className="grid lg:grid-cols-12 gap-6">
          {/* === ZONE CENTRALE : QUESTION + RÉPONSES (gauche + milieu) === */}
          <div className="lg:col-span-9 space-y-6">
            {/* Bulle de discussion (futur fond) */}
            <div className="relative bg-gradient-to-w from-slate-800/90 to-slate-700/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-2xl border border-slate-600">

              {/* Question */}
              <h2 className="text-2xl md:text-3xl font-bold text-black mb-6 leading-tight">
                {question.text}
              </h2>
            </div>
            {/* Bouton Valider */}
            {!showResult && (
              <Button
                onClick={handleSubmit}
                disabled={(question.type === 'QCU' && selectedQCU === null) ||
                  (question.type === 'QCM' && selectedQCM.length === 0)}
                className="w-full py-4 text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg"
              >
                Valider la réponse
              </Button>
            )}
            {/* === RÉSULTAT APRÈS SOUMISSION === */}
            {showResult && (
              <div className="mt-8 max-w-7xl mx-auto">
                <Card className="bg-slate-800/90 p-6 md:p-8 space-y-5">
                  <div
                    className={`
                      text-center p-5 rounded-xl text-2xl font-bold
                      ${isCorrect ? 'bg-green-600/90 text-green-100' : 'bg-red-600/90 text-red-100'}
                    `}
                  >
                    {isCorrect ? 'Bonne réponse !' : 'Réponse incorrecte'}
                  </div>

                  {isDocCorrect && (
                    <div className="text-center p-4 bg-green-600/90 text-green-100 rounded-xl font-medium">
                      +1 point bonus pour le document !
                    </div>
                  )}

                  <p className="text-slate-300 italic leading-relaxed">{question.explanation}</p>

                  <Button
                    onClick={goNext}
                    className="w-full py-4 text-lg font-semibold bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
                  >
                    {currentQuestion + 1 === questions.length ? 'Voir les résultats' : 'Question suivante'}
                  </Button>
                </Card>
              </div>
            )}
          </div>

          {/* === PANNEAU DROIT : RÉPONSES & DOCUMENT (bonus) === */}
          <div className="lg:col-span-3">
            {/* QCU */}
            {question.type === 'QCU' && (
              <select
                value={selectedQCU ?? ''}
                onChange={(e) => setSelectedQCU(Number(e.target.value))}
                disabled={showResult}
                className="w-full p-4 text-lg rounded-xl bg-slate-700/80 text-slate-100 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              >
                <option value="" disabled>Choisissez une réponse...</option>
                {question.options.map((opt, idx) => (
                  <option key={idx} value={idx} className="py-2">
                    {idx + 1}. {opt}
                  </option>
                ))}
              </select>
            )}

            {/* QCM */}
            {question.type === 'QCM' && (
              <div className="space-y-3">
                {question.options.map((opt, idx) => {
                  const correctArray = Array.isArray(question.correct) ? question.correct : [];
                  const isChecked = Array.isArray(selectedQCM) ? selectedQCM.indexOf(idx) !== -1 : false;
                  const isCorrectAnswer = correctArray.indexOf(idx) !== -1;
                  const showCorrect = showResult && isCorrectAnswer;
                  const showWrong = showResult && isChecked && !isCorrectAnswer;

                  return (
                    <label
                      key={idx}
                      className={`
                            flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all select-none text-lg
                            ${showResult
                          ? showCorrect
                            ? 'bg-green-600/90 text-white font-medium shadow-lg'
                            : showWrong
                              ? 'bg-red-600/90 text-white font-medium shadow-lg'
                              : 'bg-slate-700/70 text-slate-300'
                          : isChecked
                            ? 'bg-blue-600/90 text-white shadow-md'
                            : 'bg-slate-700/70 hover:bg-slate-600/80 text-slate-200 border border-slate-600'}
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
                        } }
                        className="w-6 h-6 text-blue-500 rounded focus:ring-2 focus:ring-blue-400" />
                      <span>{idx + 1}. {opt}</span>
                    </label>
                  );
                })}
              </div>
            )}
            <br></br>
            <br></br>
            <Card className="h-full bg-slate-800/90 border-slate-700 p-6 space-y-5 shadow-xl">
              <h3 className="text-lg font-bold text-blue-400 flex items-center gap-2">
                Document de référence
              </h3>
              <p className="text-sm text-slate-300">Choisissez le bon document pour +1 point bonus</p>

              <select
                value={selectedDoc ?? ''}
                onChange={(e) => setSelectedDoc(Number(e.target.value))}
                disabled={showResult}
                className="w-full p-3 rounded-lg bg-slate-700/80 text-slate-100 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                <option value="" disabled>Choisissez un document...</option>
                {documents.map((doc) => (
                  <option key={doc.id} value={doc.id}>
                    {doc.id} - {doc.text || '(sans titre)'}
                  </option>
                ))}
              </select>

              {showResult && selectedDoc !== null && (
                <div
                  className={`
                    p-3 rounded-lg text-center font-medium text-sm
                    ${isDocCorrect ? 'bg-green-600/90 text-green-100' : 'bg-red-600/90 text-red-100'}
                  `}
                >
                  {isDocCorrect ? '+1 point bonus !' : 'Document incorrect'}
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
    <Layout /></>
  );
}