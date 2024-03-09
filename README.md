# Piplator

It provides an simple option to in-place translate a message of a YouTube live chat.\
By clicking on "Translate" again after it has been translated, the original message will be shown again.

---
## Installation
### Quick:
1. Install Tampermonkey | [Google Chrome](https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) | [Firefox](https://addons.mozilla.org/firefox/addon/tampermonkey)
2. Click [Install](https://github.com/Ponkhy/Piplator/raw/main/piplator.user.js) here
### Alternative:
1. Open the **piplator.user.js** script in this repo.
2. Click the **Raw** button at the top of the file to view it's code
3. Copy the source code
4. Open Tampermonkey and click the "Create a new script..." button
5. Paste the code into the script window and click File -> Save

## Configuration
Inside of the script at **line 19** your Google Translation API key needs to be added.\
To get an API key you can follow this [tutorial](https://locoaddon.com/how-to-generate-google-translate-api-key) (You can skip point 6. and 7.).

It's also possible to change the target language at **line 22**, the string must be in ISO-639. You can find the supported list of languages and codes in [Google's Docs](https://cloud.google.com/translate/docs/languages).

---
### Known Issues
- Unicode emotes will be removed in the translation process
