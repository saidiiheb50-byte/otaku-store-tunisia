# Guide d'Installation de Node.js

## Installation de Node.js sur Windows

### Méthode 1 : Installation directe (Recommandée)

1. **Téléchargez Node.js** :
   - Allez sur : https://nodejs.org/
   - Cliquez sur le bouton **"Download Node.js (LTS)"**
   - La version LTS (Long Term Support) est recommandée pour la stabilité

2. **Installez Node.js** :
   - Exécutez le fichier téléchargé (ex: `node-v20.x.x-x64.msi`)
   - Cliquez sur "Next" dans l'assistant d'installation
   - Acceptez les termes et conditions
   - **IMPORTANT** : Cochez l'option "Automatically install the necessary tools" si proposée
   - Cliquez sur "Install"
   - Attendez la fin de l'installation
   - Cliquez sur "Finish"

3. **Vérifiez l'installation** :
   - Ouvrez un **nouveau** terminal PowerShell (fermez et rouvrez)
   - Exécutez :
     ```bash
     node --version
     npm --version
     ```
   - Vous devriez voir les versions affichées (ex: v20.10.0 et 10.2.3)

### Méthode 2 : Via Chocolatey (Si vous avez Chocolatey)

Si vous avez Chocolatey installé :
```bash
choco install nodejs
```

### Méthode 3 : Via Winget (Windows 10/11)

```bash
winget install OpenJS.NodeJS.LTS
```

## Après l'installation

1. **Fermez et rouvrez votre terminal** (important pour que les changements soient pris en compte)

2. **Vérifiez que Node.js fonctionne** :
   ```bash
   node --version
   npm --version
   ```

3. **Installez les dépendances du projet** :
   ```bash
   npm install
   ```
   Cette commande peut prendre quelques minutes la première fois.

4. **Démarrez le serveur de développement** :
   ```bash
   npm run dev
   ```

5. **Ouvrez votre navigateur** :
   - Allez sur : http://localhost:3000
   - Vous devriez voir votre application Next.js !

## Dépannage

### "node is not recognized"
- **Solution** : Redémarrez votre terminal complètement (fermez et rouvrez)
- Si ça ne fonctionne toujours pas, redémarrez votre ordinateur
- Vérifiez que Node.js est bien installé dans "Program Files\nodejs"

### Erreur lors de `npm install`
- Vérifiez votre connexion internet
- Essayez : `npm install --legacy-peer-deps`
- Ou : `npm install --force`

### Le port 3000 est déjà utilisé
- Fermez l'autre application qui utilise le port 3000
- Ou changez le port dans `package.json` : `"dev": "next dev -p 3001"`

## Besoin d'aide ?

Si vous rencontrez des problèmes :
1. Vérifiez que Node.js est bien installé : `node --version`
2. Exécutez le script de vérification : `powershell -ExecutionPolicy Bypass -File check-setup.ps1`
3. Consultez les logs d'erreur dans le terminal


