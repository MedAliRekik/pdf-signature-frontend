# PDF Signature Frontend (Angular)

Application professionnelle de signature PDF avec **Angular 19**, **Angular Material**, **NgRx** et prévisualisation **multi-pages scrollable**.

## Fonctionnalités
- Import sécurisé d'un fichier PDF (type + taille max).
- Prévisualisation de **toutes les pages** du PDF avec scroll vertical.
- Signature visuelle manuscrite générée depuis le nom du signataire.
- Signature déplaçable sur la page choisie (coordonnées auto `pageNumber/x/y`).
- Texte additionnel optionnel.
- Envoi backend `POST http://localhost:8080/api/pdf/sign` avec `file` + `request` JSON.
- Téléchargement du PDF signé.

## Architecture
- `src/app/core`: services et config API (`api.config.ts`).
- `src/app/shared/material`: module Material partagé.
- `src/app/features/pdf-signature`: composants métier, modèles, page, routes lazy, store NgRx.

## Angular Material
Composants utilisés : Toolbar, Card, Button, Icon, Input/FormField, Spinner, SnackBar, Divider, Tooltip.

## NgRx
État principal : `selectedFile`, `signerName`, `additionalText`, `signaturePosition(pageNumber/x/y)`, `loading`, `error`, `signedPdf`.

## Lazy loading
Route principale : `/pdf-signature` chargée via `loadChildren` dans `app.routes.ts`.

## Lancement
1. Backend (Spring) sur `http://localhost:8080`.
2. Frontend :
```bash
npm install
npm start
```
3. Ouvrir `http://localhost:4200`.

## Workflow utilisateur
1. Importer un PDF.
2. Vérifier toutes les pages dans la colonne de prévisualisation.
3. Saisir nom + texte optionnel.
4. Déplacer la signature sur la page souhaitée.
5. Cliquer sur **Signer et télécharger**.
