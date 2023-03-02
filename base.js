
var translations = {};

function initialize() {
    
    var languageToCountryCode =
    {
        'cs': 'cs_cz', 'cs-cz': 'cs_cz',
        'da': 'da_dk', 'da-dk': 'da_dk',
        'de': 'de_de', 'de-de': 'de_de',
        'el': 'el_gr', 'el-gr': 'el_gr',
        'es': 'es_es', 'es-es': 'es_es',
        'fi': 'fi_fi', 'fi-fi': 'fi_fi',
        'fr': 'fr_fr', 'fr-fr': 'fr_fr',
        'id': 'id_id', 'id-id': 'id_id',
        'it': 'it_it', 'it-it': 'it_it',
        'ja': 'ja_jp', 'ja-jp': 'ja_jp',
        'ko': 'ko_kr', 'ko-kr': 'ko_kr',
        'lv': 'lv_lv', 'lv-lv': 'lv_lv',
        'ms': 'ms_my', 'ms-my': 'ms_my',
        'nb': 'nb_no', 'nb-no': 'nb_no',
        'nl': 'nl_nl', 'nl-nl': 'nl_nl',
        'pl': 'pl_pl', 'pl-pl': 'pl_pl',
        'pt': 'pt_br', 'pt-br': 'pt_br',
        'ro': 'ro_ro', 'ro-ro': 'ro_ro',
        'ru': 'ru_ru', 'ru-ru': 'ru_ru',
        'sv': 'sv_se', 'sv-se': 'sv_se',
        'th': 'th_th', 'th-th': 'th_th',
        'tr': 'tr_tr', 'tr-tr': 'tr_tr',
        'uk': 'uk_ua', 'uk-ua': 'uk_ua',
        'vi': 'vi_vn', 'vi-vn': 'vi_vn',
        'zh': 'zh_cn', 'zh-cn': 'zh_cn',
        'zh-tw': 'zh_tw', 'zz': 'zz_zz',
        'zz-zz': 'zz_zz', 'fil': 'ph_ph',
        'fil-ph': 'ph_ph', 'tl': 'ph_ph',
        'tl-tl': 'ph_ph'
    };
    
    language = window.navigator.userLanguage || window.navigator.language;
    language = language.toLowerCase();
    var lan_code = language.split('-');
    
    if (language in languageToCountryCode) {
        language_country = languageToCountryCode[language];
    }
    else if (lan_code[0] in languageToCountryCode) {
        language_country = languageToCountryCode[lan_code[0]];
    }
    else {
        language_country = 'fil-ph';
    }
    
    url = "Strings/" + language_country + "/translation.json";
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.send(null);
    
    promiseTranslation = new Promise((resolve, reject) => {
        promiseTranslationResolve = resolve;
        request.onreadystatechange = function () {
            
            if (request.readyState === 4 && request.status === 200) {
                processTranslations(JSON.parse(request.responseText));
            }
            else{
                
                document.getElementById("getAccessButton").innerHTML = "Translation in vain";
                document.getElementById("title").innerHTML = "Translation in vain";
                document.getElementById("desctext").innerHTML = "Translation in vain";
                
                let message = {
                    "action":"load_translations",
                    "path":url
                }
                //window.webkit.messageHandlers.interOp.postMessage(message);
                
            }
        }
    })
    
}


function processTranslations(_translations) {
    translations = _translations;
    
    
    document.getElementById("getAccessButton").innerHTML = translations["buttonPrimary"];
    document.getElementById("title").innerHTML = translations["heading"];
    document.getElementById("desctext").innerHTML = translations["desctext"];
    
    
    let message = {
        "action":"load_completion"
    }
    
    //  window.webkit.messageHandlers.interOp.postMessage(message);
}


function updateData(dict) {
    
    document.getElementById("getAccessButton").innerHTML = translations["buttonPrimary"];
    document.getElementById("title").innerHTML = translations["heading"];
    document.getElementById("desctext").innerHTML = translations["desctext"];
}

function onCancelTap() {
    var message = {
        "action": "cancel"
    }
    //.webkit.messageHandlers.interOp.postMessage(message);
}

function onSureTap() {
    var message = {
        "action": "continue"
    }
   // window.webkit.messageHandlers.interOp.postMessage(message);
}
