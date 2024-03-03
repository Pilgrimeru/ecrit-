// ==UserScript==
// @name         Ecrit- gost
// @namespace    https://github.com/Pilgrimeru/ecrit-/tree/main
// @version      2.0
// @description  Ajoute l'explication sous la question dans les tests ecriplus
// @author       Elliott DE LUCA | FIEVET LEON
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
                        displayExplication(explication, json.data, json.data.attributes.type);
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
 * @param currentQuestionData
 * @param type
 */
function displayExplication(explication, currentQuestionData, type) {
    if (explicationElement) {
        document.body.removeChild(explicationElement);
    }


    if (explication) {
        explicationElement = document.createElement('div');
        explicationElement.style.maxWidth = '990px';
        explicationElement.style.margin = 'auto';
        explicationElement.style.visibility = 'hidden';
        explicationElement.className = "tutorial-panel__explication-container-body tutorial-panel__explication-content";

        let pictoContainer = document.createElement('div');
        pictoContainer.className = "tutorial-panel__explication-picto-container";

        let pictoImage = document.createElement('img');
        pictoImage.src = "/images/icons/comparison-window/icon-lampe_verte.svg";
        pictoImage.alt = "lampe_verte";
        pictoImage.className = "tutorial-panel__explication-picto";
        pictoContainer.appendChild(pictoImage);

        let textSpanContainer = document.createElement('span');
        let textSpan = document.createElement('span');
        textSpan.innerHTML = explication;
        textSpanContainer.appendChild(textSpan);

        explicationElement.appendChild(pictoContainer);
        explicationElement.appendChild(textSpanContainer);

        let hoverButton = document.createElement('div');
        hoverButton.style.position = 'fixed';
        hoverButton.style.top = '0';
        hoverButton.style.right = '0';
        hoverButton.style.width = '50px';
        hoverButton.style.height = '50px';
        hoverButton.style.cursor = 'pointer';

        hoverButton.onmouseenter = function() {
            explicationElement.style.visibility = 'visible';
        };

        hoverButton.onmouseleave = function() {
            explicationElement.style.visibility = 'hidden';
        };

        hoverButton.onclick = function() {
            copyPromptToClipboard(explication, currentQuestionData, type);
        };

        document.body.appendChild(explicationElement);
        document.body.appendChild(hoverButton);
    }
}

function generatePrompt(questionData, type) {
    let question = questionData.attributes.instruction;
    let explicationText = questionData.attributes.explication;
    let prompt = `Question: ${question}\n`;
    let reponsesPossibles = questionData.attributes.proposals;

    if (type === "QROCM-ind") {
        console.log("QROCM-ind");
        prompt += 'Sujet: ' + extractAndFormatMultipleChoices(reponsesPossibles);
    } else if (type === "QCU" || type === "QCM") {
        console.log("QCU or QCM");
        prompt += 'Sujet: ' + formatChoices(reponsesPossibles);
    }else if (type === "CATEG") {
        console.log("CATEG");
        prompt += extractAndFormatCategories(reponsesPossibles);
    }

    prompt += `\nExplication: ${explicationText}\n`;
    if (type === "CATEG") {
        prompt += '\nClasse les options dans les catégories en te servant de l explication';
    } else {
        prompt += '\nRépond à la question grâce à l explication, met en gras les mots que tu as choisis';
    }
    prompt = removeHtmlTags(prompt).replace(/&nbsp;/g, ' ');

    return prompt;
}


function extractAndFormatMultipleChoices(choicesString) {
    let cleanString = removeHtmlTags(choicesString).replace(/&nbsp;/g, ' ').replace(/<br>/g, '');

    const regex = /\$\{(fakeid\d)¦(.*?)\}/g;
    let placeholders = [...cleanString.matchAll(regex)];
    let formattedText = cleanString;

    placeholders.forEach((placeholder, index) => {
        formattedText = formattedText.replace(placeholder[0], `______ (${index + 1})`);
        const choices = placeholder[2].split('¦').map(choice => choice.trim()).join(' / ');
        formattedText += `\nChoix ${index + 1}: ${choices}`;
    });

    return formattedText;
}


function formatChoices(choicesString) {
    const choices = choicesString.split('\n').filter(choice => choice.trim() !== '');
    let formattedChoices = '';

    choices.forEach((choice, index) => {
        const cleanChoice = removeHtmlTags(choice).trim();
        if (cleanChoice) {
            formattedChoices += `${index + 1}. ${cleanChoice}\n`;
        }
    });

    return formattedChoices.trim();
}

function extractAndFormatCategories(categoriesString) {
    const options = categoriesString.split('\n--\n').map(optionGroup => {
        return removeHtmlTags(optionGroup).trim();
    }).filter(optionGroup => optionGroup);

    let formattedCategories = '';
    options.forEach((option, index) => {
        if (index === 0) {
            formattedCategories += `Categories: ${option}\n`;
        } else {
            formattedCategories += `Option : ${option.split('\n-').join(' / ').trim()}\n`;
        }
    });

    return formattedCategories.trim();
}

function removeHtmlTags(text) {
    return text.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ');
}

function copyPromptToClipboard(explication, currentQuestionData, type) {
    let prompt = generatePrompt(currentQuestionData, type);
    navigator.clipboard.writeText(prompt).then(() => {
        console.log('Prompt copié dans le presse-papiers');
    }).catch(err => {
        console.error('Erreur lors de la copie du prompt:', err);
    });
}
