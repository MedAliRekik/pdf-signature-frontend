# PDF Signature Frontend (Angular)

Application Angular portfolio pour **signature visuelle de PDF** avec UX professionnelle, confidentialité expliquée clairement, et architecture scalable.

## Objectif produit
Permettre à l'utilisateur de :
1. Importer un PDF.
2. Visualiser toutes les pages.
3. Générer une signature visuelle depuis son nom.
4. Placer la signature (drag & drop) sur une page.
5. Télécharger le PDF signé par le backend.

## Workflow utilisateur
**Importer → Placer → Signer → Télécharger**

- Upload validé (`application/pdf`, taille max).
- Prévisualisation multi-pages via PDF.js (scroll vertical).
- Signature déplaçable par page.
- Calcul et envoi `pageNumber`, `x`, `y` au backend.
- Retour backend en `Blob` puis téléchargement local.

## Confidentialité & sécurité (discours honnête)
- Traitement temporaire du document.
- Aucun stockage applicatif prévu côté frontend.
- Données utilisées uniquement pendant la session.
- Signature **visuelle simple** : ce projet ne prétend pas fournir une signature électronique certifiée.

## Limites actuelles
- Certification légale/eIDAS non implémentée.
- Chiffrement bout-en-bout non implémenté.
- Les garanties définitives de conservation dépendent du backend déployé.

## Stack technique
- Angular (standalone components)
- Angular Material
- NgRx (actions, reducer, selectors, effects)
- Lazy loading de la feature `pdf-signature`
- PDF.js pour rendu multi-pages

## Architecture

```text
src/app
├── core
│   ├── config
│   ├── constants
│   └── services
├── shared
│   ├── components
│   └── material
└── features
    └── pdf-signature
        ├── components
        ├── models
        ├── pages
        ├── store
        └── pdf-signature.routes.ts
```

## NgRx : state géré
- `selectedFile`
- `signerName`
- `additionalText`
- `signaturePosition`
- `isSignaturePlaced`
- `status` (`idle | loading | success | error`)
- `signedPdf`
- `error`

## Backend attendu
- Endpoint: `POST {apiBaseUrl}/api/pdf/sign`
- multipart:
  - `file`: PDF
  - `request`: JSON `{ signerName, additionalText, pageNumber, x, y }`
- Réponse: PDF signé (binaire)

## Configuration
- `src/environments/environment.ts` : URL backend (`apiBaseUrl`)
- `src/app/core/config/api.config.ts` : endpoints API
- `src/app/core/constants/file.constants.ts` : type MIME + limite taille

## Lancement
```bash
npm install
npm start
```
Puis ouvrir `http://localhost:4200`.

## Prochaines évolutions
- Signature électronique certifiée (prestataire qualifié).
- Historique utilisateur côté backend (optionnel, avec consentement).
- Zoom PDF et alignement assisté.
- E2E tests et monitoring UX.
