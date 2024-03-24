
# Atelier - Développement et Service Cloud - Support Travaux Pratique - Projet

## Introduction

Vous êtes une équipe d'architectes techniques et développeurs officiant au sein d'une entreprise de service en informatique.

Vous êtes affectés au projet de refonte du socle SERVEUR/BDD de l'application 'MFLIX' fournissant des informations
cinématographiques en ligne (application fictive type 'Allociné').

Votre client stockait toutes ses données sur des serveurs physiques au sein de son centre de service. Pour des raisons de coût
et de sécurité, il a décidé migrer ses bases de données dans le Cloud.

La partie Front-End de l'application 'MFLIX' reste inchangée et fonctionne actuellement selon un contrat d'API. Votre tâche sera
donc de mettre en place un socle SERVEUR/BDD qui pourra communiquer avec son application et fournir des services via une
API REST.

La base MongoDB migrée sur le cloud contient des informations sur les films, les utilisateurs de la plateforme ou encore les
commentaires précédemment postés.

Le contrat d'API défini dans le cahier des charges du projet est le suivant:
```url
/movies - (GET) Récupérer tous les films
/movie/:idMovie - (GET-POST-PUT-DELETE) Récupérer/Ajouter/Modifier/Supprimer un film via son ID
/movie/comments - (GET) Récupérer la liste de tous les commentaires liés à un film
/movie/comment/:idComment - (GET-POST-PUT-DELETE) Récupérer/Ajouter/Modifier/Supprimer un commentaire d'un
film
```

Pour répondre à cette problématique votre équipe décide donc d'utiliser le framework Next.JS lié à la base de données
MongoDB gérée depuis MongoDB Atlas.


## Développement (standard)

### **Conditions préalables**

-   Node.js v20.11.1
-   Next.js v14.1.0
-   MongoDB v7.2
-   RAML v1.0

### Build

#### Créez votre application via Conteneur

Créez un fichier .env.local à la racine du projet et complétez la variable d'environnement suivante en remplaçant les valeurs entre les chevrons par les informations de connexion à votre base de données MongoDB:

```dotenv
NODE_ENV=development
MONGODB_URI=mongodb+srv://<user>:<password>@<host>/
```

Puis lancer le build et lancement du conteneur:

```bash
  docker build -t Atelier-Dev-Sec-Cloud -f ./Dockerfile
  docker run -dt -p 3000:3000/tcp Atelier-Dev-Sec-Cloud
```

#### Créez votre application Manuellement

Installation des dépendances

```bash
npm install
```

#### Development

Créez un fichier .env.local à la racine du projet et complétez la variable d'environnement suivante en remplaçant les valeurs entre les chevrons par les informations de connexion à votre base de données MongoDB:

```dotenv
NODE_ENV=development
MONGODB_URI=mongodb+srv://<user>:<password>@<host>/
```

### Finally

Démarrer le serveur de node

```bash
npm run dev
```

L'application fonctionnera sur le port 3000. Assurez-vous d'avoir configuré une connexion MongoDB et d'avoir une copie de la base de données. Cela devrait être une base de données MongoDB de base avec le dataset par défaut d'Atlas (mflix).

## FAQ

#### Où se trouve la documentation de l'API ?

La documentation de l'API est disponible sur la page *Swagger API* de l'application.

Vous pouvez maintenant aller dans votre navigateur et taper :
- http://localhost:3000/api-docs pour accéder à la documentation de l'API.


## Authors
- [@ClemLcs](https://github.com/ClemLcs)