# Guide de Configuration - Next.js App

## Étape 1 : Installer Node.js

1. **Téléchargez Node.js** :
   - Allez sur [https://nodejs.org/](https://nodejs.org/)
   - Téléchargez la version **LTS** (Long Term Support)
   - Exécutez l'installateur
   - Suivez les instructions d'installation

2. **Vérifiez l'installation** :
   Ouvrez un nouveau terminal PowerShell et exécutez :
   ```bash
   node --version
   npm --version
   ```
   Vous devriez voir les versions de Node.js et npm.

## Étape 2 : Installer les dépendances

Une fois Node.js installé, dans le dossier du projet, exécutez :

```bash
npm install
```

Cette commande va installer toutes les dépendances nécessaires (Next.js, React, TypeScript, etc.)

## Étape 3 : Démarrer le serveur de développement

```bash
npm run dev
```

Vous devriez voir un message comme :
```
  ▲ Next.js 14.x.x
  - Local:        http://localhost:3000
  - Ready in Xs
```

## Étape 4 : Ouvrir dans le navigateur

Ouvrez votre navigateur et allez sur :
**http://localhost:3000**

## Commandes utiles

- `npm run dev` - Démarrer le serveur de développement
- `npm run build` - Construire l'application pour la production
- `npm run start` - Démarrer le serveur de production
- `npm run lint` - Vérifier le code avec ESLint

## Dépannage

### Erreur "node is not recognized"
- Node.js n'est pas installé ou n'est pas dans le PATH
- Réinstallez Node.js et redémarrez le terminal

### Erreur "port 3000 already in use"
- Un autre processus utilise le port 3000
- Arrêtez l'autre processus ou changez le port dans `package.json`

### Erreurs de dépendances
- Supprimez `node_modules` et `package-lock.json`
- Exécutez `npm install` à nouveau


