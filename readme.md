# Ecrit-

![Logo](https://raw.githubusercontent.com/Pilgrimeru/ecrit-/main/ecritmoins.png)

## Description

Ce script utilisateur (UserScript) Tampermonkey ajoute une fonctionnalité supplémentaire à l'interface des tests sur le site ecriplus.fr. Il affiche l'explication sous la question dans les tests, facilitant ainsi la compréhension des réponses.

Pour structurer votre guide d'installation de manière à gérer deux scripts distincts, un dans un dossier "visible" et un autre dans un dossier "invisible", voici une manière organisée de présenter ces instructions :

---

### Instructions d'Installation des Scripts pour Tampermonkey

Pour utiliser ces scripts, vous devez d'abord avoir l'extension Tampermonkey installée dans votre navigateur. Si ce n'est pas encore le cas, suivez le lien ci-dessous pour l'installer :

- [Installer Tampermonkey](https://www.tampermonkey.net/)

Une fois Tampermonkey installé, vous pouvez procéder à l'installation des scripts.

#### Script Visible

Ce script affiche directement l'explication sur la page.

1. **Installation** : Cliquez sur le lien suivant pour installer automatiquement le script visible :
    - [Installer le Script Visible](https://raw.githubusercontent.com/Pilgrimeru/ecrit-/main/visible/script.user.js)

#### Script Invisible

Ce script cache l'explication et ne l'affiche que lorsque la souris survole le coin supérieur droit de la page.

1. **Installation** : Cliquez sur le lien suivant pour installer automatiquement le script invisible :
    - [Installer le Script Invisible](https://raw.githubusercontent.com/Pilgrimeru/ecrit-/main/invisible/script.user.js)

### Utilisation

Après l'installation, le script choisi fonctionnera automatiquement sur les pages spécifiées dans le script. Pour le script "invisible", survolez simplement le coin supérieur droit de la page pour voir l'explication s'afficher.

Si vous souhaitez changer de script à l'avenir, assurez-vous de désactiver ou de supprimer le script précédent dans le tableau de bord Tampermonkey avant d'installer un nouveau script.

## Crédits

- L'idée du nom et la découverte du JSON exposant l'explication ont été fournis par [Léon Fievet](https://github.com/Pixnop/).
- Les commentaires de documentation ont été écrits par ChatGPT.
- L'utilisation de l'interception des XMLHttpRequests a été inspirée par [cette réponse sur Stack Overflow](https://stackoverflow.com/questions/629671/how-can-i-intercept-xmlhttprequests-from-a-greasemonkey-script).