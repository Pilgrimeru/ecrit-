// ==UserScript==
// @name         Ecrit-
// @namespace    https://github.com/Pilgrimeru/ecrit-/tree/main
// @version      1.0
// @description  Ajoute l'explication sous la question dans les tests ecriplus
// @author       Elliott DE LUCA
// @match        https://app.tests.ecriplus.fr/*
// @icon         https://raw.githubusercontent.com/Pilgrimeru/ecrit-/main/ecritmoins.png
// @updateURL    https://raw.githubusercontent.com/Pilgrimeru/ecrit-/main/script.user.js
// @downloadURL  https://raw.githubusercontent.com/Pilgrimeru/ecrit-/main/script.user.js
// @grant        GM_addElement
// ==/UserScript==

const pattern = /https:\/\/api\.tests\.ecriplus\.fr\/api\/assessments\/(\d+)\/next/;
let explicationElement;

/**
 * Cette IIFE remplace la méthode `open` de XMLHttpRequest pour écouter les changements d'état de la requête.
 * Elle recherche spécifiquement les requêtes correspondant à un schéma indiquant une récupération de question d'évaluation.
 * Lors d'une récupération réussie, elle lit la réponse, extrait l'explication du JSON,
 * et appelle displayExplication pour l'afficher sur la page.
 * @param {Function} open - La fonction `open` originale de XMLHttpRequest.
 */
(function (open) {
    XMLHttpRequest.prototype.open = function () {
        this.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                if (pattern.test(this.responseURL)) {
                    let reader = new FileReader();

                    reader.onload = function () {
                        let text = reader.result;
                        let json = JSON.parse(text);
                        const explication = json.data.attributes.explication;
                        displayExplication(explication);
                    };
                    reader.readAsText(this.response);
                }
            }
        }, false);
        open.apply(this, arguments);
    };
})(XMLHttpRequest.prototype.open);

/**
 * Affiche l'explication d'une question d'évaluation.
 * Si une explication est déjà affichée, elle supprime celle qui existe avant d'ajouter la nouvelle explication.
 * L'explication est montrée dans un élément div stylisé qui inclut une image et le texte de l'explication.
 * @param {string} explication - La chaîne HTML contenant l'explication à afficher.
 */
function displayExplication(explication) {
    if (explicationElement) {
        document.body.removeChild(explicationElement);
    }

    if (explication) {
        // Crée un nouvel élément pour afficher l'explication
        explicationElement = document.createElement('div');
        explicationElement.style.maxWidth = '990px';
        explicationElement.style.margin = 'auto';
        explicationElement.className = "tutorial-panel__explication-container-body tutorial-panel__explication-content";
        
        // Crée et ajoute le conteneur d'image avec une image
        let pictoContainer = document.createElement('div');
        pictoContainer.className = "tutorial-panel__explication-picto-container";
        let pictoImage = document.createElement('img');
        pictoImage.src = "/images/icons/comparison-window/icon-lampe_verte.svg";
        pictoImage.alt = "lampe_verte";
        pictoImage.className = "tutorial-panel__explication-picto";
        pictoContainer.appendChild(pictoImage);
        
        // Crée et ajoute le span qui contient l'explication
        let textSpanContainer = document.createElement('span');
        let textSpan = document.createElement('span');
        textSpan.innerHTML = explication;
        textSpanContainer.appendChild(textSpan);
        
        explicationElement.appendChild(pictoContainer);
        explicationElement.appendChild(textSpanContainer);
        document.body.appendChild(explicationElement);
    }
}
