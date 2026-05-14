# PDF Signature Frontend (Angular)

Application Angular portfolio pour **signature visuelle de PDF** avec interface professionnelle, architecture évolutive, et messages de confiance clairs.

## Structure applicative

```text
src/app
├── layout
│   ├── header
│   ├── footer
│   └── main-layout
├── core
├── shared
└── features
    └── pdf-signature
```

- `main-layout` orchestre un layout global réutilisable : **Header / Body / Footer**.
- `features/pdf-signature` contient la page métier de signature.
- L’application reste en **standalone components**, avec lazy loading de la feature.

## Workflow utilisateur

1. Importer un PDF.
2. Visualiser toutes les pages (scroll vertical).
3. Générer/afficher une signature visuelle.
4. Déplacer la signature dans la zone PDF.
5. Signer puis télécharger le PDF retourné par le backend.

## Affichage PDF multi-pages

- Rendu PDF avec PDF.js sur **un canvas par page**.
- Prévisualisation scrollable verticalement.
- Nettoyage des canvas à chaque nouveau chargement.
- Annulation des `renderTask` en cours avant un nouveau rendu.
- Mécanisme anti-rendu parallèle pour éviter l’erreur :
  - `Cannot use the same canvas during multiple render() operations`.

## Signature visuelle

- Signature affichée au-dessus du PDF.
- Signature déplaçable (drag & drop) et bornée à la page active.
- Mise à jour automatique de `pageNumber`, `x`, `y` envoyés au backend.

## Sécurité et confidentialité (discours honnête)

Messages affichés dans l’UI :
- « Votre document n’est pas stocké »
- « Traitement temporaire du PDF »
- « Signature visuelle non certifiée »
- « Aucun contenu PDF n’est affiché dans les logs »

Ce projet **ne promet pas** :
- signature électronique certifiée,
- chiffrement complet,
- sécurité 100%.

## Stack technique

- Angular (standalone)
- Angular Material
- NgRx (actions, reducer, selectors, effects)
- Lazy loading (`pdf-signature.routes.ts`)
- PDF.js

## Lancement

```bash
npm install
npm start
```

Puis ouvrir `http://localhost:4200`.

## Limites actuelles

- Certification légale/eIDAS non implémentée.
- Chiffrement bout-en-bout non implémenté.
- Les garanties finales de conservation et de sécurité dépendent du backend déployé.
