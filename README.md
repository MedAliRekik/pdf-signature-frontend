# PDF Signature Frontend (Angular)

Application Angular portfolio pour la signature visuelle de PDF avec un workflow guidé, une UX professionnelle, NgRx et Angular Material.

## Architecture

- Standalone components + lazy loading de la feature `pdf-signature`.
- Layout global Header / Body / Footer.
- State management NgRx (actions/reducer/selectors/effects).

## Nouveau workflow UX/UI

1. Importer le PDF
2. Saisir le nom
3. Ajouter la signature au PDF
4. Placer la signature par glisser-déposer
5. Signer et télécharger

### Layout

- Panneau gauche : étapes, upload, formulaire, prévisualisation de signature, statuts, actions.
- Panneau droit : prévisualisation PDF multi-pages.

### États visuels gérés

- Aucun PDF sélectionné
- PDF chargé
- Signature non ajoutée
- Signature ajoutée
- Chargement
- Succès
- Erreur

## Signature visible et plaçable

- Zone « Prévisualisation de la signature » dès la saisie du nom.
- Bouton explicite « Ajouter la signature au PDF ».
- Signature affichée au-dessus du canvas PDF (z-index supérieur).
- Parent PDF en `position: relative`, signature en `position: absolute`.
- Drag & drop via Angular CDK (`cdkDrag`, `cdkDragBoundary`).
- Curseur `grab`, fond léger, contour discret, police manuscrite lisible.
- Mise à jour automatique de `pageNumber`, `x`, `y` dans le state NgRx après déplacement.

## Sécurité frontend et bonnes pratiques

- Validation stricte du type MIME `application/pdf`.
- Validation de taille maximale fichier.
- Nettoyage des object URLs après téléchargement (`URL.revokeObjectURL`).
- Gestion d'erreurs HTTP avec message utilisateur non sensible.
- Pas d’affichage de stack trace brute à l’utilisateur.
- Aucune donnée métier sensible ajoutée au store NgRx.

## Audit des dépendances (npm audit)

Commande exécutée :

```bash
npm audit --json
```

Résultat au 14 mai 2026 : 6 vulnérabilités **high**, toutes transitives dans la toolchain de build (`@angular/cli`, `@angular-devkit/build-angular`, `copy-webpack-plugin`, `pacote`, `tar`, `serialize-javascript`).

### Pourquoi elles ne sont pas corrigées ici

- La correction proposée par npm impose un upgrade majeur vers Angular CLI/Devkit 21.
- Le projet doit rester cohérent en Angular 19 (contrainte explicite).
- Faire cet upgrade casserait potentiellement l’écosystème actuel et sort du scope de correction sans risque.

### Plan de remédiation recommandé

- Planifier une migration contrôlée Angular 19 → 20/21.
- Exécuter les migrations officielles (`ng update`) avec tests de non-régression.
- Rejouer `npm audit --json` après migration.

## Lancement

```bash
npm install
npm start
```

Puis ouvrir `http://localhost:4200`.
