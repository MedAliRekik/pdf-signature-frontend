# PDF Signature Frontend (Angular)

## Objectif
Application Angular permettant d'importer un PDF, saisir les données de signature visuelle (signataire, texte, page, X/Y), envoyer au backend Spring Boot, puis télécharger automatiquement le PDF signé.

## Stack
- Angular 19 (standalone)
- RxJS
- NgRx Store / Effects / Store Devtools
- Reactive Forms

## Architecture
- `core/services` : services transverses (`PdfSignatureService`)
- `shared/components` : composants réutilisables
- `features/pdf-signature` : feature métier (page, composants, modèles, store, routes)

## Backend attendu
- Base URL : `http://localhost:8080`
- Endpoint : `POST /api/pdf/sign`
- `multipart/form-data`:
  - `file` : PDF
  - `request` : JSON `{ signerName, additionalText, pageNumber, x, y }`

## Lancement
1. `npm install`
2. `npm start`
3. Front : `http://localhost:4200`
4. Vérifier backend : `http://localhost:8080`

## NgRx
- Actions: set file, update form, submit, success, failure, clear
- État: `idle | loading | success | error`
- Effects: appel HTTP backend via `PdfSignatureService`
- Selectors: fichier, formulaire, erreur, loading, blob signé

## Lazy loading
Route principale:
- `/pdf-signature` chargée via `loadChildren` sur `pdf-signature.routes.ts`

## Sécurité côté frontend
- `accept="application/pdf"`
- validation MIME `application/pdf`
- limite taille fichier 5MB
- assainissement nom de fichier
- messages d'erreur métier (pas de stack trace)
- typage strict sans `any`

## Améliorations futures
- Prévisualisation PDF avant signature
- Positionnement visuel drag & drop
- Mapping coordonnées selon zoom/rendu PDF
- i18n / accessibilité avancée
- gestion environnements (`environment.development.ts`, `environment.production.ts`)
