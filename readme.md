Pour intégrer la fonction de copie dans le guide d'installation dans votre README, en expliquant comment utiliser cette fonctionnalité avec les deux versions du script (visible et invisible), voici une manière organisée de présenter ces instructions :

---

# Ecrit-

![Logo](https://raw.githubusercontent.com/Pilgrimeru/ecrit-/main/ecritmoins.png)

## Description

Ce script utilisateur (UserScript) pour Tampermonkey améliore l'expérience sur le site ecriplus.fr en ajoutant automatiquement l'explication sous la question dans les tests. Il est conçu pour aider à mieux comprendre les réponses aux questions posées pendant les tests.

## Instructions d'Installation des Scripts pour Tampermonkey

Pour bénéficier de cette fonctionnalité, assurez-vous d'abord que l'extension Tampermonkey est installée dans votre navigateur. Si vous ne l'avez pas encore, vous pouvez la télécharger et l'installer via le lien suivant :

- [Installer Tampermonkey](https://www.tampermonkey.net/)

Une fois Tampermonkey installé, vous pouvez installer le script de votre choix.

### Script Visible

Ce script affiche l'explication directement sous la question.

1. **Installation** : Accédez au lien suivant pour installer le script visible automatiquement :
   - [Installer le Script Visible](https://raw.githubusercontent.com/Pilgrimeru/ecrit-/main/visible/script.user.js)

### Script Invisible

Ce script rend l'explication invisible par défaut ; elle ne s'affiche que lorsque vous survolez le coin supérieur droit de la page.

1. **Installation** : Accédez au lien suivant pour installer le script invisible automatiquement :
   - [Installer le Script Invisible](https://raw.githubusercontent.com/Pilgrimeru/ecrit-/main/invisible/script.user.js)

### Fonction de Copie du Prompt

Les deux scripts intègrent une fonctionnalité permettant de copier le prompt généré dans le presse-papiers. Voici comment l'utiliser :

- **Pour le script visible** : Cliquez directement sur l'explication affichée sous la question pour copier le prompt dans le presse-papiers.

- **Pour le script invisible** : Après avoir survolé le coin supérieur droit pour afficher l'explication, cliquez dessus pour copier le prompt dans le presse-papiers.

Cette fonction est pratique pour sauvegarder l'explication ou la partager rapidement.

### Utilisation

Après avoir installé le script de votre choix, il fonctionnera automatiquement sur le site ecriplus.fr dans les tests. Aucune configuration supplémentaire n'est nécessaire. Pour changer de script, désactivez ou supprimez le script actuel dans le tableau de bord de Tampermonkey avant d'installer l'autre version.

## Crédits

- Idée originale et découverte de l'API exposant l'explication : [Léon Fievet](https://github.com/Pixnop/)
- Documentation et conseils d'implémentation : ChatGPT
- Inspiration pour l'interception des requêtes XMLHttpRequest : [Stack Overflow](https://stackoverflow.com/questions/629671/how-can-i-intercept-xmlhttprequests-from-a-greasemonkey-script)