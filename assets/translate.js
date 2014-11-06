// This is the translate.js from Easy Search Upload project.
// This is a standalone optional JavaScript, it can easily be moved into another project.
// If you want to know how to add additional languages / translation lines check: https://github.com/BlameByte/Easy-Search-Upload#translatejs.

var language = '';

// This is the default language if there is no supported language / browser language is non-existant.
var defaultLang = 'en';

// This gets the default language, it gets the first two letters so en-US -> en.
function getDefaultLanguage() {
	var userLang = navigator.language || navigator.userLanguage; 
	return userLang.substr(0, 2);
}

// This gets the set language, it is upon starting up, it will choose the cookie if set or the default language of the browser / this file.
function getLang() {
	var lang = getCookie('lang');
	if (lang != '') {
		language = lang;
	} else {
		language = getDefaultLanguage();
	}
}

// This sets the language cookie which is stored for 30 days. So it will auto choose this language instead of the browser / script default.
function setLang(lang) {
	setCookie('lang', lang, 30);
	language = lang;
	fillLangSelect();
	translateAll();
	console.log('selected language: '+lang);
}

var txts = {};
// This loads the translation strings, all of the different languages.
// The txts.element_id is the name of the element (div, input, etc) of which you put in the HTML.
// The 'en': 'English Example' is basically JSON, and you would use the 2 letter locale code.
// txts.example = {'en': 'English Example', 'fr': 'French Example'};
function loadTxtStrings() {
	txts.tab_upload = {'en': 'Upload from my computer',
					   'fr': 'Télécharger depuis mon ordinateur',
					   'es': 'Subir desde mi ordenador',
					   'de': 'Laden sie von meinem computer'};
	txts.tab_search = {'en': 'Search for images',
					   'fr': 'Recherche d\'images',
					   'es': 'Buscar imágenes',
					   'de': 'Nach bildern'};
	txts.submit_upload = {'en': 'Upload image', 
						  'fr': 'Téléchargement d\'images',
						  'es': 'Cargar imágen',
						  'de': 'Bild hochladen'};
	txts.submit_image = {'en': 'Select image',
						 'fr': 'Sélectionner une image',
						 'es': 'Seleccionar imagen',
						 'de': 'Motiv auswählen'};
	txts.search_button= {'en': 'Go',
						 'fr': 'Aller',
						 'es': 'Ir',
						 'de': 'Gehen'};
	txts.upload_description = {'en': 'You can upload an image stored on your computer.', 
							   'fr': 'Vous pouvez télécharger une image stockée sur votre ordinateur.',
							   'es': 'Puedes subir una imagen almacenada en tu ordenador.',
							   'de': 'Sie können eine auf Ihrem Computer gespeicherte Bild hochladen.'};
	txts.search_description = {'en': 'You can search for an image, click it and then click the button below.', 
							   'fr': 'Vous pouvez rechercher une image, cliquez dessus, puis cliquez sur le bouton ci-dessous.',
							   'es': 'Usted puede buscar una imagen, haga clic en él y luego haga clic en el botón de abajo.',
							   'de': 'Sie können ein Bild zu suchen, klicken Sie darauf und klicken Sie dann auf die Schaltfläche unten.'};
	console.log(txts);
}
	
var txtsloaded=false;
// This function checks if the translation texts are loaded.
function checkTxtLoaded() {
	if (!txtsloaded) {
		loadTxtStrings();
		getLang();
		txtsloaded = true;
	}
}

// This function gets the tranlsation text for the language.
function translation(txt, lang) {
	checkTxtLoaded()
	// We check to see if the txts is defined and that it has its own property for the chosen language.
	if (typeof txts[txt]!== 'undefined' && txts[txt].hasOwnProperty(lang)!==false) {
		return txts[txt][lang];
	// We then check for the default language for the chosen translation text.
	} else if (typeof txts[txt]!== 'undefined' && txts[txt].hasOwnProperty(defaultLang)!==false) {
		return txts[txt][defaultLang];
	// This happens when there is no translation text in the default language.
	} else {
		return 'Invalid string.';
	}
}

// This function translates all of the text loaded from the loadTxtStrings() function. It runs upon page load.
function translateAll() {
	checkTxtLoaded();
	var valueelements = ['INPUT'];
	for(var k in txts) {
		
		var ebi = document.getElementById(k);
		if (ebi == null) {
			continue;
		}
		if (valueelements.indexOf(ebi.nodeName) == -1) {
			ebi.innerHTML = translation(k, language);
		} else {
			ebi.value = translation(k, language);
		}
		console.log('Translated: '+k+' -> '+translation(k, language));
	}
}

// This function creates the language flag selection, it allows the user to change their language manually.
function fillLangSelect() {
	var locale = ['en', 'fr', 'es', 'de'];
	var html = '';
	var active = '';
	for (var i=0; i<locale.length; i++) {
		if (language == locale[i]) {
			active = ' active';
		} else {
			active = '';
		}
		html += '<div class="flag '+locale[i]+active+'" onclick="setLang(\''+locale[i]+'\')"></div>';
	}
	document.getElementById('langselect').innerHTML = html;
}

// This sets the cookie used for the chosen language.
function setCookie(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	var expires = "expires="+d.toUTCString();
	document.cookie = cname + "=" + cvalue + "; " + expires;
}

// This gets the cookie stored for the selected language.
function getCookie(cname) {
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for(var i=0; i<ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1);
		if (c.indexOf(name) != -1) return c.substring(name.length,c.length);
	}
    return "";
}

// This function actives upon page load, and it translates all of the text and then loads the language flag selection.	
window.onload = function() {
	translateAll();
	fillLangSelect();
};