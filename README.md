# PDF Signature Frontend (Angular)

Application de signature PDF avec **Angular**, **Angular Material**, **NgRx**, lazy-loading et prévisualisation PDF **multi-pages**.

## Fonctionnalités clés
- Upload sécurisé (`application/pdf` uniquement + taille max configurable).
- Prévisualisation de toutes les pages PDF avec scroll vertical.
- Rendu PDF.js robuste avec un **canvas distinct par page**.
- Signature visuelle déplaçable au-dessus du PDF (drag & drop limité à la page).
- Calcul automatique des coordonnées `pageNumber / x / y` pour le backend (repère bas-gauche compatible PDFBox).
- Envoi vers backend Spring Boot : `POST /api/pdf/sign` (`file` + payload JSON).
- Téléchargement du PDF signé.

## Design Angular Material
- Barre d’application avec branding.
- Layout 2 colonnes : panneau actions à gauche, preview PDF scrollable à droite.
- Utilisation de `MatCard`, `MatButton`, `MatIcon`, `MatFormField`, `MatInput`, `MatProgressSpinner`, `MatSnackBar`, `MatTooltip`.
- États UI explicites : aucun PDF, chargement, prêt, erreur.
- Responsive sur mobile/tablette.

## Architecture
- `src/app/core` : services et configuration API.
- `src/app/shared` : mutualisation UI/Material.
- `src/app/features/pdf-signature` : composants, pages, modèles, store NgRx.
- Lazy loading via `app.routes.ts` + `features/pdf-signature/pdf-signature.routes.ts`.

## NgRx
Actions métier principales :
- `uploadPdfSelected`
- `updateSignerName`
- `updateAdditionalText`
- `updateSignaturePosition`
- `signPdf`
- `signPdfSuccess`
- `signPdfFailure`

State principal :
- `selectedFile`
- `signerName`
- `additionalText`
- `signaturePosition`
- `isSignaturePlaced`
- `status`
- `signedPdf`
- `error`

## Gestion PDF.js (anti-erreur canvas)
- Annulation des `renderTask` en cours quand le PDF change.
- Séquencement de rendu page par page (attente de fin de `renderTask.promise`).
- Protection via drapeau `isRendering` pour éviter les doubles déclenchements.
- Nettoyage des canvas entre deux chargements.
- Nettoyage au destroy pour éviter les memory leaks.

## Lancement
1. Lancer le backend Spring Boot sur `http://localhost:8080`.
2. Lancer le frontend :

```bash
npm install
npm start
```

3. Ouvrir `http://localhost:4200`.
