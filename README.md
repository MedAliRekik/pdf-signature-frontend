# pdf-signature-frontend
# PDF Signature Frontend

Frontend Angular de l’application de signature PDF.

Cette application permet à un utilisateur :

- d’importer un fichier PDF,
- d’ajouter une signature générée à partir de son nom,
- d’ajouter un texte optionnel,
- d’envoyer le document au backend Spring Boot,
- puis de télécharger automatiquement le PDF signé.

Le frontend communique avec un backend Spring Boot via une API REST.

---

# Objectif du projet

Le projet a pour objectif de créer une solution simple de signature visuelle PDF.

Le workflow actuel est :

```text
Upload PDF
→ Saisie du nom du signataire
→ Ajout d’un texte optionnel
→ Envoi au backend Spring Boot
→ Génération du PDF signé
→ Téléchargement automatique

Technologies utilisées
Angular
TypeScript
SCSS
RxJS
Angular HttpClient
Architecture du projet

Le projet respecte les principes :

SOLID
Clean Code
Separation of Concerns
Architecture modulaire Angular

Structure actuelle :

src/app
│
├── core
│   └── services
│       └── pdf-signature.service.ts
│
├── features
│   └── pdf-signature
│       │
│       ├── models
│       │   └── pdf-signature-request.ts
│       │
│       ├── pages
│       │   └── pdf-signature-page
│       │       ├── pdf-signature-page.component.ts
│       │       ├── pdf-signature-page.component.html
│       │       ├── pdf-signature-page.component.scss
│       │       └── pdf-signature-page.component.spec.ts
│
├── app.config.ts
├── app.routes.ts
└── main.ts
Fonctionnalités actuelles
Upload d’un fichier PDF
Formulaire de signature
Validation simple côté frontend
Communication HTTP avec le backend
Téléchargement automatique du PDF signé
Gestion simple des erreurs
Fonctionnalités prévues
Frontend Angular
Prévisualisation PDF
Positionnement visuel de la signature
Drag & Drop
Ajout de plusieurs signatures
Responsive design
Loader amélioré
Notifications utilisateur
Gestion avancée des erreurs
Internationalisation (i18n)
Backend Spring Boot
Gestion multi-pages
Upload sécurisé
Signature image
QR Code
Historique des signatures
Sécurité avancée
Communication Backend

Le frontend communique avec le backend Spring Boot via :

POST http://localhost:8080/api/pdf/sign

Request :

multipart/form-data

Contenu envoyé :

Champ	Type
file	PDF
request	JSON

Exemple JSON :

{
  "signerName": "Mohamed Ali Rekik",
  "additionalText": "Bon pour accord",
  "pageNumber": 1,
  "x": 100,
  "y": 150
}

Réponse :

signed-document.pdf
Installation du projet
Prérequis
Node.js LTS
Angular CLI
Installation
git clone <repository-url>

cd pdf-signature-frontend

Installer les dépendances :

npm install
Lancer le projet
ng serve

Application disponible sur :

http://localhost:4200
Configuration Backend

Le backend Spring Boot doit être démarré sur :

http://localhost:8080

Le backend doit autoriser CORS pour :

http://localhost:4200
Philosophie du projet

Le projet est développé progressivement avec :

une architecture propre,
des responsabilités bien séparées,
un code maintenable,
une structure scalable,
une intégration propre avec Spring Boot.
Auteur

Mohamed Ali Rekik

Full Stack Java / Angular Engineer
