// ==UserScript==
// @name         Piplator
// @namespace    https://github.com/Ponkhy/Piplator
// @version      1.0.0
// @description  Provides the option to in-place translate a message of a YouTube live chat
// @author       Ponkhy
// @match        https://www.youtube.com/*
// @icon         https://www.youtube.com/favicon.ico
// @grant        GM.xmlHttpRequest
// @connect      translation.googleapis.com
// @downloadURL  https://github.com/Ponkhy/Piplator/raw/main/piplator.js
// @updateURL    https://github.com/Ponkhy/Piplator/raw/main/piplator.js
// ==/UserScript==

(function() {
    'use strict';

    const API_KEY = "";
    const TARGET_LANGUAGE = "en";


    function addButtonToMessage(messageElement) {
        if (!messageElement.querySelector('.message-button')) {
            const button = document.createElement('button');

            button.textContent = 'Translate';
            button.className = 'message-button';
            button.style.position = 'absolute';
            button.style.top = '7px';
            button.style.right = '35px';
            button.style.padding = '2px 5px';
            button.style.backgroundColor = '#ccc';
            button.style.border = 'none';
            button.style.borderRadius = '3px';
            button.style.cursor = 'pointer';

            button.addEventListener('click', function(event) {
                event.stopPropagation();

                const messageTextElement = messageElement.querySelector('#message');

                handleButtonClick(messageTextElement);
            });

            messageElement.appendChild(button);
        }
    }

    function handleMouseEnter(event) {
        const messageElement = event.currentTarget;
        addButtonToMessage(messageElement);
    }

    function handleMouseLeave(event) {
        const messageElement = event.currentTarget;
        const button = messageElement.querySelector('.message-button');

        if (button) button.remove();
    }

    function convertNCR(inputString) {
        const ncrRegex = /&#([0-9]+);/g;

        const outputString = inputString.replace(ncrRegex, function(match, captureGroup) {
            const charCode = parseInt(captureGroup);

            return String.fromCharCode(charCode);
        });

        return outputString;
    }

    async function handleButtonClick(message) {
        GM.xmlHttpRequest ({
            method:     "POST",
            url:        `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`,
            data:       JSON.stringify({ q: message.innerText, target: TARGET_LANGUAGE }),
            headers:    { "Content-Type": "application/json" },
            onload: function (r) {
                const prevText = message.innerText;

                const { data } = JSON.parse(r.response);
                const translatedText = data.translations[0].translatedText;
                const sourceLanguage = data.translations[0].detectedSourceLanguage;

                const convertedText = convertNCR(translatedText);

                message.innerText = convertedText;

                console.log(`Translated text from "${prevText}" to "${convertedText}" | Detected source language: ${sourceLanguage}`);
            }
        }).catch(e => console.error(e));
    }


    const messageElements = document.querySelectorAll('yt-live-chat-text-message-renderer');

    messageElements.forEach(element => {
        element.addEventListener('mouseenter', handleMouseEnter);
        element.addEventListener('mouseleave', handleMouseLeave);
    });

    const observer = new MutationObserver(mutationsList => {
        mutationsList.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                if (node.nodeName === 'YT-LIVE-CHAT-TEXT-MESSAGE-RENDERER') {
                    node.addEventListener('mouseenter', handleMouseEnter);
                    node.addEventListener('mouseleave', handleMouseLeave);
                }
            });
        });
    });

    const targetNode = document.querySelector('yt-live-chat-item-list-renderer');
    const config = { childList: true, subtree: true };

    observer.observe(targetNode, config);
})();