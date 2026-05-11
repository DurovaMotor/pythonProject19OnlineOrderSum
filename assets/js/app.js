(function () {
  var LANG_KEY = "hightac-directory-language-v1";
  var DEFAULT_LANG = "fr";

  var LOCALES = {
    fr: {
      dir: "ltr",
      title_home: "HIGHTAC SHOP",
      home_shop: "BOUTIQUE HIGHTAC",
      home_whatsapp: "WhatsApp",
      price_notice: "Les prix sont bases sur les donnees de 2023 ; le devis final fait foi.",
      directory_title: "Modeles",
      model_count: "4 modeles",
      open_parts: "Pieces",
      language_en: "English",
      language_fr: "Francais",
      language_ar: "العربية"
    },
    en: {
      dir: "ltr",
      title_home: "HIGHTAC SHOP",
      home_shop: "HIGHTAC SHOP",
      home_whatsapp: "WhatsApp",
      price_notice: "Prices are based on 2023 data; final quotation applies.",
      directory_title: "Models",
      model_count: "4 models",
      open_parts: "Parts",
      language_en: "English",
      language_fr: "French",
      language_ar: "Arabic"
    },
    ar: {
      dir: "rtl",
      title_home: "متجر HIGHTAC",
      home_shop: "متجر HIGHTAC",
      home_whatsapp: "واتساب",
      price_notice: "تعتمد الأسعار على بيانات 2023؛ ويعتمد عرض السعر النهائي.",
      directory_title: "الموديلات",
      model_count: "4 موديلات",
      open_parts: "قطع الغيار",
      language_en: "English",
      language_fr: "Francais",
      language_ar: "العربية"
    }
  };

  var state = {
    lang: readStorage(LANG_KEY, DEFAULT_LANG)
  };

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    initLanguageSwitchers();
    initImageProtection();
    applyLanguage();
  }

  function readStorage(key, fallback) {
    try {
      var raw = window.localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (error) {
      return fallback;
    }
  }

  function writeStorage(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn("storage write failed", key, error);
    }
  }

  function t(key) {
    var langMap = LOCALES[state.lang] || LOCALES[DEFAULT_LANG];
    return langMap[key] || LOCALES[DEFAULT_LANG][key] || key;
  }

  function setLanguage(lang) {
    if (!LOCALES[lang]) {
      return;
    }

    state.lang = lang;
    writeStorage(LANG_KEY, lang);
    applyLanguage();
  }

  function applyLanguage() {
    document.documentElement.lang = state.lang;
    document.documentElement.dir = LOCALES[state.lang].dir;
    document.body.classList.toggle("is-rtl", LOCALES[state.lang].dir === "rtl");
    document.title = t("title_home");

    document.querySelectorAll("[data-i18n]").forEach(function (node) {
      node.textContent = t(node.getAttribute("data-i18n"));
    });

    document.querySelectorAll("[data-lang-switcher] [data-lang]").forEach(function (button) {
      var buttonLang = button.getAttribute("data-lang");
      button.textContent = t("language_" + buttonLang);
      button.classList.toggle("is-active", buttonLang === state.lang);
    });
  }

  function initLanguageSwitchers() {
    document.querySelectorAll("[data-lang-switcher] [data-lang]").forEach(function (button) {
      button.addEventListener("click", function () {
        setLanguage(button.getAttribute("data-lang"));
      });
    });
  }

  function initImageProtection() {
    var protectedSelector = "img, [data-protected-image], .model-card__visual";

    ["contextmenu", "dragstart", "selectstart"].forEach(function (eventName) {
      document.addEventListener(eventName, function (event) {
        if (event.target.closest(protectedSelector)) {
          event.preventDefault();
        }
      }, true);
    });
  }
})();
