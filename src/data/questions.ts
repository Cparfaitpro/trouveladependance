// src/data/questions.ts
export type Question = {
    id: number;
    text: string;
    type: 'QCU' | 'QCM' | 'Libre';
    options: string[];
    correct: number; // index
    explanation: string;
    category: 'alcool' | 'ecrans' | 'tabac' | 'jeux';
  };
  
export const questions: Question[] = [
    {
      id: 1,
      text: "Igor dit : « Je ne peux pas dormir sans mon téléphone, même à 3h du matin. »",
      type: 'QCU',
      options: [
        "Comportement normal",
        "Signe possible d'addiction aux écrans",
        "Problème de sommeil uniquement",
        "Aucune importance"
      ],
      correct: 1,
      explanation: "C’est un signe d’hyperconnexion. Le cerveau associe l’écran à la récompense.",
      category: "ecrans"
    },
    {
        id: 1,
        text: "Lucas dit : « Je ne peux pas dormir sans mon téléphone, même à 3h du matin. »",
        type: 'QCU',
        options: [
          "Comportement normal",
          "Signe possible d'addiction aux écrans",
          "Problème de sommeil uniquement",
          "Aucune importance"
        ],
        correct: 1,
        explanation: "C’est un signe d’hyperconnexion. Le cerveau associe l’écran à la récompense.",
        category: "ecrans"
      },{
        id: 2,
        text: "Jean Neymar dit : « Je ne peux pas dormir sans mon téléphone, même à 3h du matin. »",
        type: 'QCU',
        options: [
          "Comportement normal",
          "Signe possible d'addiction aux écrans",
          "Problème de sommeil uniquement",
          "Aucune importance"
        ],
        correct: 1,
        explanation: "C’est un signe d’hyperconnexion. Le cerveau associe l’écran à la récompense.",
        category: "ecrans"
      },{
        id: 3,
        text: "Lucas dit : « Je ne peux pas dormir sans mon téléphone, même à 3h du matin. »",
        type: 'QCU',
        options: [
          "Comportement normal",
          "Signe possible d'addiction aux écrans",
          "Problème de sommeil uniquement",
          "Aucune importance"
        ],
        correct: 1,
        explanation: "C’est un signe d’hyperconnexion. Le cerveau associe l’écran à la récompense.",
        category: "ecrans"
      },{
        id: 4,
        text: "Lucas dit : « Je ne peux pas dormir sans mon téléphone, même à 3h du matin. »",
        type: 'QCU',
        options: [
          "Comportement normal",
          "Signe possible d'addiction aux écrans",
          "Problème de sommeil uniquement",
          "Aucune importance"
        ],
        correct: 1,
        explanation: "C’est un signe d’hyperconnexion. Le cerveau associe l’écran à la récompense.",
        category: "ecrans"
      },{
        id: 5,
        text: "Lucas dit : « Je ne peux pas dormir sans mon téléphone, même à 3h du matin. »",
        type: 'QCU',
        options: [
          "Comportement normal",
          "Signe possible d'addiction aux écrans",
          "Problème de sommeil uniquement",
          "Aucune importance"
        ],
        correct: 1,
        explanation: "C’est un signe d’hyperconnexion. Le cerveau associe l’écran à la récompense.",
        category: "ecrans"
      },{
        id: 6,
        text: "Lucas dit : « Je ne peux pas dormir sans mon téléphone, même à 3h du matin. »",
        type: 'QCU',
        options: [
          "Comportement normal",
          "Signe possible d'addiction aux écrans",
          "Problème de sommeil uniquement",
          "Aucune importance"
        ],
        correct: 1,
        explanation: "C’est un signe d’hyperconnexion. Le cerveau associe l’écran à la récompense.",
        category: "ecrans"
      },{
        id: 7,
        text: "Lucas dit : « Je ne peux pas dormir sans mon téléphone, même à 3h du matin. »",
        type: 'QCU',
        options: [
          "Comportement normal",
          "Signe possible d'addiction aux écrans",
          "Problème de sommeil uniquement",
          "Aucune importance"
        ],
        correct: 1,
        explanation: "C’est un signe d’hyperconnexion. Le cerveau associe l’écran à la récompense.",
        category: "ecrans"
      },{
        id: 8,
        text: "Lucas dit : « Je ne peux pas dormir sans mon téléphone, même à 3h du matin. »",
        type: 'QCU',
        options: [
          "Comportement normal",
          "Signe possible d'addiction aux écrans",
          "Problème de sommeil uniquement",
          "Aucune importance"
        ],
        correct: 1,
        explanation: "C’est un signe d’hyperconnexion. Le cerveau associe l’écran à la récompense.",
        category: "ecrans"
      },{
        id: 9,
        text: "Lucas dit : « Je ne peux pas dormir sans mon téléphone, même à 3h du matin. »",
        type: 'QCU',
        options: [
          "Comportement normal",
          "Signe possible d'addiction aux écrans",
          "Problème de sommeil uniquement",
          "Aucune importance"
        ],
        correct: 1,
        explanation: "C’est un signe d’hyperconnexion. Le cerveau associe l’écran à la récompense.",
        category: "ecrans"
      },{
        id: 10,
        text: "Lucas dit : « Je ne peux pas dormir sans mon téléphone, même à 3h du matin. »",
        type: 'QCU',
        options: [
          "Comportement normal",
          "Signe possible d'addiction aux écrans",
          "Problème de sommeil uniquement",
          "Aucune importance"
        ],
        correct: 1,
        explanation: "C’est un signe d’hyperconnexion. Le cerveau associe l’écran à la récompense.",
        category: "ecrans"
      },{
        id: 11,
        text: "Lucas dit : « Je ne peux pas dormir sans mon téléphone, même à 3h du matin. »",
        type: 'QCU',
        options: [
          "Comportement normal",
          "Signe possible d'addiction aux écrans",
          "Problème de sommeil uniquement",
          "Aucune importance"
        ],
        correct: 1,
        explanation: "C’est un signe d’hyperconnexion. Le cerveau associe l’écran à la récompense.",
        category: "ecrans"
      },{
        id: 12,
        text: "Lucas dit : « Je ne peux pas dormir sans mon téléphone, même à 3h du matin. »",
        type: 'QCU',
        options: [
          "Comportement normal",
          "Signe possible d'addiction aux écrans",
          "Problème de sommeil uniquement",
          "Aucune importance"
        ],
        correct: 1,
        explanation: "C’est un signe d’hyperconnexion. Le cerveau associe l’écran à la récompense.",
        category: "ecrans"
      },{
        id: 13,
        text: "Lucas dit : « Je ne peux pas dormir sans mon téléphone, même à 3h du matin. »",
        type: 'QCU',
        options: [
          "Comportement normal",
          "Signe possible d'addiction aux écrans",
          "Problème de sommeil uniquement",
          "Aucune importance"
        ],
        correct: 1,
        explanation: "C’est un signe d’hyperconnexion. Le cerveau associe l’écran à la récompense.",
        category: "ecrans"
      },{
        id: 14,
        text: "Lucas dit : « Je ne peux pas dormir sans mon téléphone, même à 3h du matin. »",
        type: 'QCU',
        options: [
          "Comportement normal",
          "Signe possible d'addiction aux écrans",
          "Problème de sommeil uniquement",
          "Aucune importance"
        ],
        correct: 1,
        explanation: "C’est un signe d’hyperconnexion. Le cerveau associe l’écran à la récompense.",
        category: "ecrans"
      },{
        id: 15,
        text: "Lucas dit : « Je ne peux pas dormir sans mon téléphone, même à 3h du matin. »",
        type: 'QCU',
        options: [
          "Comportement normal",
          "Signe possible d'addiction aux écrans",
          "Problème de sommeil uniquement",
          "Aucune importance"
        ],
        correct: 1,
        explanation: "C’est un signe d’hyperconnexion. Le cerveau associe l’écran à la récompense.",
        category: "ecrans"
      },
  ];