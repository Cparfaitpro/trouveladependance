// src/data/questions.ts
export type Question = {
    id: number;
    text: string;
    type: 'QCU' | 'QCM' | 'Libre';
    options: string[];
    correct: number[]; // index
    correct_doc : number[];
    explanation: string;
  };
  
export const questions: Question[] = [
    {
      id: 1,
      text: "Léo Parleur : « Bonjour, j’ai eu dernièrement un accident et depuis je suis KO.  »",
      type: 'QCU',
      options: [
        "Comportement normal",
        "Signe possible d'addiction aux écrans",
        "Problème de sommeil uniquement",
        "Aucune importance"
      ],
      correct: [1],
      correct_doc: [1],
      explanation: "C’est un signe d’hyperconnexion. Le cerveau associe l’écran à la récompense.",
    },
    {
        id: 2,
        text: "Guy Tart : « Bonjour, je ne sais pas trop lire ce papier d’analyse sanguine vous pourriez m’aider s’il vous plait ? d’ailleurs auriez-vous un petit truc a grignoté ? . »",
        type: 'QCM',
        options: [
          "Comportement normal",
          "Signe possible d'addiction aux écrans",
          "Problème de sommeil uniquement",
          "Aucune importance"
        ],
        correct: [1,2],
        correct_doc: [2,7],
        explanation: "C’est un signe d’hyperconnexion. Le cerveau associe l’écran à la récompense.",
      }/***,{
        id: 3,
        text: "Sarah Corsh  : « Bonjour, je ne sais plus où je suis, j’ai la tête qui tourne tellement… »",
        type: 'QCM',
        options: [
          "Comportement normal",
          "Signe possible d'addiction aux écrans",
          "Problème de sommeil uniquement",
          "Aucune importance"
        ],
        correct: 1,
        explanation: "C’est un signe d’hyperconnexion. Le cerveau associe l’écran à la récompense.",
      },{
        id: 4,
        text: "Igor Dupont: J’arrive pas à dormir, et j’ai pleins de proche qui me font des réflexion sur mon comportement. Il parait que je suis « agressif »….pfff",
        type: 'QCU',
        options: [
          "Comportement normal",
          "Signe possible d'addiction aux écrans",
          "Problème de sommeil uniquement",
          "Aucune importance"
        ],
        correct: 1,
        explanation: "C’est un signe d’hyperconnexion. Le cerveau associe l’écran à la récompense.",
      },{
        id: 5,
        text: " Alex Terieur : « Bonjour, je ne comprends pas je suis normal et pourtant j’ai du mal à m’endormir le soir.  »",
        type: 'QCU',
        options: [
          "Comportement normal",
          "Signe possible d'addiction aux écrans",
          "Problème de sommeil uniquement",
          "Aucune importance"
        ],
        correct: 1,
        explanation: "C’est un signe d’hyperconnexion. Le cerveau associe l’écran à la récompense.",
      },{
        id: 6,
        text: "Ema Jinassion:  « Meuf, j’ai telllement la dalle t’a des gâteaux ou autre ?  »",
        type: 'QCU',
        options: [
          "Comportement normal",
          "Signe possible d'addiction aux écrans",
          "Problème de sommeil uniquement",
          "Aucune importance"
        ],
        correct: 1,
        explanation: "C’est un signe d’hyperconnexion. Le cerveau associe l’écran à la récompense.",
      },{
        id: 7,
        text: "Jean Neymar : « Bonjour, j’ai besoin d’aide j’essaye d’arrêter et je vais souvent voir un groupe de parole.  »",
        type: 'QCU',
        options: [
          "Comportement normal",
          "Signe possible d'addiction aux écrans",
          "Problème de sommeil uniquement",
          "Aucune importance"
        ],
        correct: 1,
        explanation: "C’est un signe d’hyperconnexion. Le cerveau associe l’écran à la récompense.",
      },{
        id: 8,
        text: "Paul Ochon: « Bonjour, j’ai rdv avec le dentiste dans 2h et j’aimerais aussi faire une pause entre temps dehors, vous pensez que ça peut le faire ?  »",
        type: 'QCU',
        options: [
          "Comportement normal",
          "Signe possible d'addiction aux écrans",
          "Problème de sommeil uniquement",
          "Aucune importance"
        ],
        correct: 1,
        explanation: "C’est un signe d’hyperconnexion. Le cerveau associe l’écran à la récompense.",
      },{
        id: 9,
        text: "Remi Fassol: « Bonjour, j’ai trop soif vous auriez un distributeur de boisson ?  »",
        type: 'QCU',
        options: [
          "Comportement normal",
          "Signe possible d'addiction aux écrans",
          "Problème de sommeil uniquement",
          "Aucune importance"
        ],
        correct: 1,
        explanation: "C’est un signe d’hyperconnexion. Le cerveau associe l’écran à la récompense.",
      },{
        id: 10,
        text: "Jean Bonbœur  : « Bonjour, je dois passer ici car je n’arrête pas d’avoir des problème avec la justice. Je passe au tribunal dans 1 semaine. »",
        type: 'QCU',
        options: [
          "Comportement normal",
          "Signe possible d'addiction aux écrans",
          "Problème de sommeil uniquement",
          "Aucune importance"
        ],
        correct: 1,
        explanation: "C’est un signe d’hyperconnexion. Le cerveau associe l’écran à la récompense.",
      },{
        id: 11,
        text: "Anna Konda  : « Bonjour, j’aurais besoin de renseignement car je tombe malade rapidement et je tousse tout le temps.  »",
        type: 'QCU',
        options: [
          "Comportement normal",
          "Signe possible d'addiction aux écrans",
          "Problème de sommeil uniquement",
          "Aucune importance"
        ],
        correct: 1,
        explanation: "C’est un signe d’hyperconnexion. Le cerveau associe l’écran à la récompense.",
      },{
        id: 12,
        text: "Jack Pautt  : « Bonjour, j’ai un peu honte, je consomme une drogue excitante pour tenir face au travail.  »",
        type: 'QCU',
        options: [
          "Comportement normal",
          "Signe possible d'addiction aux écrans",
          "Problème de sommeil uniquement",
          "Aucune importance"
        ],
        correct: 1,
        explanation: "C’est un signe d’hyperconnexion. Le cerveau associe l’écran à la récompense.",
      }*/
  ];