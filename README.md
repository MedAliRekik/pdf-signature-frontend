# PDF Signature Frontend (Angular)

## Objectif
Ce frontend Angular fournit une interface de signature visuelle de PDF connectée au backend Spring Boot `pdf-signature-backend`.
L'utilisateur peut :
- téléverser un PDF,
- renseigner les paramètres de signature (nom, texte, page, coordonnées),
- envoyer la demande au backend,
- télécharger le PDF signé retourné sous forme de `Blob`.

## Stack et compatibilité
- Angular `19.2.x` (standalone)
- NgRx `19.2.x` (`@ngrx/store`, `@ngrx/effects`, `@ngrx/store-devtools`)
- RxJS `7.8.x`
- TypeScript `5.7.x`
- Node.js recommandé : `>=20 LTS`

## Architecture du projet
Structure principale :
- `src/app/core/services` : services transverses (`PdfSignatureService`).
- `src/app/features/pdf-signature` : feature métier complète (routes, page, composants, modèles, store).
- `src/app/features/pdf-signature/store` : actions, reducer, selectors, effects.

### Standalone + lazy loading
- Route racine redirigée vers `/pdf-signature`.
- La feature est lazy-loadée via `loadChildren`.
- Le state NgRx feature et ses effects sont fournis au niveau de la route lazy (`provideState` + `provideEffects`).

## NgRx (Store + Effects)
- **Store global** initialisé dans `app.config.ts` avec `provideStore()`.
- **Feature state** `pdfSignature` enregistré dans la route lazy via `provideState(pdfSignatureFeature)`.
- **Effects feature** `PdfSignatureEffects` fournis dans la route lazy via `provideEffects(PdfSignatureEffects)`.
- **Flux principal** :
  1. `setFile` (sélection PDF)
  2. `updateForm`
  3. `signPdf`
  4. `signPdfSuccess` (Blob signé)
  5. `signPdfFailure` (message d'erreur métier)

## Contrat HTTP avec le backend
Endpoint attendu :
- `POST http://localhost:8080/api/pdf/sign`

Payload `multipart/form-data` :
- `file`: fichier PDF
- `request`: `Blob` JSON `application/json`

Réponse attendue :
- `Blob` (PDF signé)

Important :
- Ne pas fixer manuellement `Content-Type` lors d'un envoi `FormData`.

## Sécurité et bonnes pratiques frontend
- Input fichier limité via `accept="application/pdf"`.
- Validation stricte du MIME type (`application/pdf`).
- Taille maximale de fichier : `5 Mo`.
- Pas de log du contenu PDF.
- Messages d'erreur utilisateurs sans stack trace technique.
- Typage strict sans `any`.

## Lancement local
1. Démarrer le backend Spring Boot (`pdf-signature-backend`) sur le port `8080`.
2. Installer les dépendances frontend :
   ```bash
   npm install
   ```
3. Démarrer le frontend :
   ```bash
   npm start
   ```
4. Ouvrir : `http://localhost:4200`.

## Build de production
```bash
ng build
```

## Erreurs connues / diagnostic rapide
- **Page blanche au démarrage** avec erreur `Cannot read properties of undefined (reading 'pipe')` :
  - cause fréquente : mauvaise initialisation de `Actions` dans un effect,
  - correction appliquée : injection via `inject(Actions)` avant usage dans `createEffect`.

- **Erreur CORS** vers `localhost:8080` :
  - vérifier la configuration CORS côté backend Spring Boot,
  - autoriser l'origine `http://localhost:4200`, méthodes `POST`, headers nécessaires.

## Roadmap
- Prévisualisation PDF avant signature.
- Positionnement visuel drag & drop de la signature.
- Gestion multi-pages et adaptation des coordonnées selon zoom.
