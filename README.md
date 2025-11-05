# Unis-Cité - Trouve la dépendance

**Comment créer des questions ?**

1 - Rendez-vous dans le dossier src/components/data et ouvrir le fichier questions.ts
2 - Remplir la fiche suivante :

    id: Rajouter 1 au numéro de la dernière question créer
    text: Le texte de la question ou de la situation
    type: Choisir entre un QCU et un QCM
    options: Mettre des choix possibles (vous pouvez en mettre autant que vous voulez)
    correct: Le ou les numéros des options correctes ex : [1], [0,1,2]
    /!\ A lire en commençant par 0, première option = 0, deuxième option = 1 ect..
    correct_doc : Id du ou des documents qui sont valides
    explanation: Explication après avoir répondu à la question

Des exemples de questions existent alors n'hésitez pas à vous en inspirer !

**Comment créer des documents ?**

1 - Les documents en eux-mêmes doivent être créer en dehors du projet informatique.
2 - Rendez-vous dans le dossier src/components/data et ouvrir le fichier documents.ts
3 - Remplir la fiche suivante :
    id : Rajouter 1 au numéro de la dernière question créer
    text : Résumé en une phrase du document
