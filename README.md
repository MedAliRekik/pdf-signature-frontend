# PDF Signature Frontend (Angular)

Interface de signature PDF visuelle en Angular + NgRx.

## Objectif métier
L’utilisateur peut importer un PDF, voir la prévisualisation, générer une signature visuelle à partir de son nom, la déplacer sur le document, puis signer et télécharger le PDF final.

## Workflow utilisateur
1. Upload d’un fichier PDF (validation type + taille).
2. Affichage du PDF (page 1, structure prête multi-pages).
3. Saisie du nom et du texte additionnel.
4. Signature manuscrite visuelle superposée au PDF.
5. Drag & drop de la signature sur le canvas.
6. Conversion des coordonnées écran vers repère PDF (Y inversé).
7. Envoi backend `POST /api/pdf/sign` avec:
   - `file`
   - `request` JSON: `signerName`, `additionalText`, `pageNumber`, `x`, `y`
8. Téléchargement du PDF signé.

## Architecture
- `core/services`: service HTTP backend.
- `features/pdf-signature/pages`: page principale lazy-loadée.
- `features/pdf-signature/components`: upload, formulaire, preview PDF, signature drag & drop, actions.
- `features/pdf-signature/store`: actions, reducer, selectors, effects NgRx.
- `features/pdf-signature/models`: state et modèles de requête.

## NgRx
Actions clés:
- `uploadPdfSelected`
- `updateSignerName`
- `updateAdditionalText`
- `updateSignaturePosition`
- `signPdf` / `signPdfSuccess` / `signPdfFailure`

Selectors:
- `selectedFile`
- `signerName`
- `additionalText`
- `signaturePosition`
- `loading`
- `error`

## Lancement
```bash
npm install
npm start
```
Backend attendu: `http://localhost:8080/api/pdf/sign`.
