(() => {
  "use strict";

  const APPS_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbxgtcYu5Qg49RiV5nws0oY94JTtbbYuc-0_W7reQMz2PBzmqvrXeMwqx756vuW59g1QVA/exec";

  const TRANSLATIONS = {
    en: {
      pageTitle: "HEALTHACON 2026 — Community Medical Fund Survey",
      skipLink: "Skip to survey",
      storyEyebrow: "The story",
      storyHeadline: "Amina is 8. <em>She needs an urgent ₹4 lakh operation.</em>",
      storyLead:
        "Her daily-wage family can't raise it in time. Imagine thousands giving <strong>₹1 every week</strong> automatically — small coins become lakhs when a family needs it.",
      imaginedTitle: "Imagined example",
      imaginedText: "Amina is not a real patient. This story only explains the idea.",
      answersEyebrow: "Your answers",
      q1Title: "Would you join, giving ₹1 every week automatically?",
      q2Title: "If it launched, would you start paying in the first month?",
      q3Title: "Have you ever donated online for a medical cause?",
      q4Title: "What would make you trust a case is real?",
      q4Hint: "Choose all that apply.",
      optYes: "Yes",
      optMaybe: "Maybe",
      optNo: "No",
      optNotSure: "Not sure yet",
      optNever: "No, never",
      optOnce: "Yes, once",
      optMoreThanOnce: "Yes, more than once",
      optHospital: "Hospital confirms it",
      optDocs: "Verified documents",
      optRefer: "Someone I know refers it",
      optMedia: "Photo and video updates",
      finishTitle: "Finish",
      nameLabel: "Your name (optional)",
      namePlaceholder: "Anonymous",
      nameHelper: "Leave empty to stay anonymous.",
      sendBtn: "Send answers",
      sendingBtn: "Sending answers…",
      privacyTitle: "How answers are saved",
      privacyText: "Saved to a private Google Sheet only the owner can read. Your name is optional.",
      thankEyebrow: "Response recorded",
      thankHeading: "Thank you. HEALTHACON 2026.",
      thankCopy: "Your answers have been saved to the private Google Sheet.",
      resetBtn: "Submit another response",
      footerThanks: "Thank you. HEALTHACON 2026.",
      footerLink: "Google Form source ↗",
      errEmpty: "Please answer at least one question before sending.",
      errSetup: "Setup needed: paste your Apps Script Web App URL into app.js.",
      errSave: "Unable to save your response right now. Please try again.",
      svgAmount: "₹4L",
      svgReady: "READY IN TIME",
      svgRate: "₹1 / WEEK",
      progressHeader: (n) => `${n} of 4 answered`,
      progressFinish: (n) => `${n} of 4 answered.`,
    },
    ml: {
      pageTitle: "HEALTHACON 2026 — കമ്മ്യൂണിറ്റി മെഡിക്കൽ ഫണ്ട് സർവേ",
      skipLink: "സർവേയിലേക്ക് കടക്കുക",
      storyEyebrow: "കഥ",
      storyHeadline: "അമിനയ്ക്ക് 8 വയസ്സാണ്. <em>അവൾക്ക് 4 ലക്ഷം രൂപയുടെ അടിയന്തര ശസ്ത്രക്രിയ ആവശ്യമാണ്.</em>",
      storyLead:
        "ദിവസക്കൂലിക്കാരായ അവളുടെ കുടുംബത്തിന് സമയത്ത് പണം കണ്ടെത്താനാകില്ല. ആയിരക്കണക്കിന് ആളുകൾ ആഴ്ചയിൽ <strong>₹1 വീതം</strong> സ്വയമേവ നൽകുന്നത് സങ്കൽപ്പിക്കുക — ചെറിയ നാണയങ്ങൾ ലക്ഷങ്ങളായി മാറും, ഒരു കുടുംബത്തിന് ആവശ്യമുള്ളപ്പോൾ തയ്യാറാകും.",
      imaginedTitle: "സാങ്കൽപ്പിക ഉദാഹരണം",
      imaginedText: "അമിന ഒരു യഥാർത്ഥ രോഗിയല്ല. ആശയം വിശദീകരിക്കാൻ മാത്രമുള്ള കഥയാണിത്.",
      answersEyebrow: "നിങ്ങളുടെ ഉത്തരങ്ങൾ",
      q1Title: "ആഴ്ചതോറും ₹1 സ്വയമേവ നൽകി നിങ്ങൾ ഇതിൽ ചേരുമോ?",
      q2Title: "ഇത് ആരംഭിച്ചാൽ, ആദ്യ മാസത്തിൽ തന്നെ നിങ്ങൾ പണം നൽകാൻ തുടങ്ങുമോ?",
      q3Title: "ചികിത്സാ സഹായത്തിനായി നിങ്ങൾ എപ്പോഴെങ്കിലും ഓൺലൈനായി സംഭാവന നൽകിയിട്ടുണ്ടോ?",
      q4Title: "ഒരു കേസ് യഥാർത്ഥമാണെന്ന് വിശ്വസിക്കാൻ നിങ്ങൾക്ക് എന്തെല്ലാം വേണം?",
      q4Hint: "യോജിക്കുന്നവയെല്ലാം തിരഞ്ഞെടുക്കുക.",
      optYes: "അതെ",
      optMaybe: "ആയിരിക്കാം",
      optNo: "ഇല്ല",
      optNotSure: "ഇപ്പോൾ ഉറപ്പില്ല",
      optNever: "ഇല്ല, ഒരിക്കലുമില്ല",
      optOnce: "അതെ, ഒരിക്കൽ",
      optMoreThanOnce: "അതെ, ഒന്നിലധികം തവണ",
      optHospital: "ആശുപത്രി സ്ഥിരീകരിക്കുക",
      optDocs: "പരിശോധിച്ച രേഖകൾ",
      optRefer: "പരിചയമുള്ളവർ ശുപാർശ ചെയ്യുക",
      optMedia: "ഫോട്ടോ, വീഡിയോ വിവരങ്ങൾ",
      finishTitle: "പൂർത്തിയാക്കുക",
      nameLabel: "നിങ്ങളുടെ പേര് (നിർബന്ധമില്ല)",
      namePlaceholder: "അജ്ഞാതം",
      nameHelper: "പേര് നൽകാതിരുന്നാൽ അജ്ഞാതമായി തുടരാം.",
      sendBtn: "ഉത്തരങ്ങൾ അയയ്ക്കുക",
      sendingBtn: "അയയ്ക്കുന്നു…",
      privacyTitle: "ഉത്തരങ്ങൾ സൂക്ഷിക്കുന്ന രീതി",
      privacyText: "സർവേ ഉടമയ്ക്ക് മാത്രം വായിക്കാൻ കഴിയുന്ന സ്വകാര്യ ഗൂഗിൾ ഷീറ്റിലേക്കാണ് ഉത്തരങ്ങൾ പോകുന്നത്. പേര് നിർബന്ധമില്ല.",
      thankEyebrow: "ഉത്തരം രേഖപ്പെടുത്തി",
      thankHeading: "നന്ദി. HEALTHACON 2026.",
      thankCopy: "നിങ്ങളുടെ ഉത്തരങ്ങൾ സ്വകാര്യ ഗൂഗിൾ ഷീറ്റിൽ സേവ് ചെയ്തിട്ടുണ്ട്.",
      resetBtn: "മറ്റൊരു ഉത്തരം കൂടി നൽകുക",
      footerThanks: "നന്ദി. HEALTHACON 2026.",
      footerLink: "ഗൂഗിൾ ഫോം ↗",
      errEmpty: "അയയ്ക്കുന്നതിന് മുമ്പ് കുറഞ്ഞത് ഒരു ചോദ്യത്തിനെങ്കിലും ഉത്തരം നൽകുക.",
      errSetup: "സജ്ജീകരണം ആവശ്യമാണ്: app.js-ൽ Apps Script URL നൽകുക.",
      errSave: "ഇപ്പോൾ ഉത്തരം സേവ് ചെയ്യാൻ കഴിഞ്ഞില്ല. ദയവായി വീണ്ടും ശ്രമിക്കുക.",
      svgAmount: "₹4L",
      svgReady: "സമയത്ത് തയ്യാറാകും",
      svgRate: "₹1 / ആഴ്ച",
      progressHeader: (n) => `4-ൽ ${n} ഉത്തരം നൽകി`,
      progressFinish: (n) => `4-ൽ ${n} ഉത്തരം നൽകി.`,
    },
  };

  let currentLang = "en";
  let lastErrorKey = "";

  const form = document.getElementById("healthacon-form");
  const surveyContainer = document.getElementById("survey-container");
  const thankYouPanel = document.getElementById("thank-you-panel");
  const submitBtn = document.getElementById("submit-btn");
  const btnLabel = submitBtn.querySelector(".btn-label");
  const feedbackEl = document.getElementById("form-feedback");
  const nameInput = document.getElementById("respondent-name");

  const headerProgressText = document.getElementById("header-progress-text");
  const headerProgressBar = document.getElementById("header-progress-bar");
  const headerProgressFill = document.getElementById("header-progress-fill");
  const finishProgressText = document.getElementById("finish-progress-text");
  const finishDots = document.querySelectorAll("#finish-dots .f-dot");
  const questionCards = document.querySelectorAll(".question-card");
  const resetBtn = document.getElementById("reset-survey-btn");
  const langButtons = document.querySelectorAll(".lang-btn");

  const svgAmount = document.getElementById("svg-amount");
  const svgReady = document.getElementById("svg-ready");
  const svgRate = document.getElementById("svg-rate");

  const ENTRY_KEYS = {
    q1: "entry.1740767171",
    q2: "entry.1209894932",
    q3: "entry.1705522595",
    q4: "entry.2057489068",
  };

  function collectAnswers() {
    const q1 = form.querySelector(`input[name="${ENTRY_KEYS.q1}"]:checked`);
    const q2 = form.querySelector(`input[name="${ENTRY_KEYS.q2}"]:checked`);
    const q3 = form.querySelector(`input[name="${ENTRY_KEYS.q3}"]:checked`);
    const q4Nodes = Array.from(form.querySelectorAll(`input[name="${ENTRY_KEYS.q4}"]:checked`));

    return {
      q1: q1 ? q1.value : "",
      q2: q2 ? q2.value : "",
      q3: q3 ? q3.value : "",
      q4: q4Nodes.map((n) => n.value),
      name: nameInput.value.trim(),
    };
  }

  function updateProgress() {
    const data = collectAnswers();
    const states = [
      Boolean(data.q1),
      Boolean(data.q2),
      Boolean(data.q3),
      data.q4.length > 0,
    ];
    const answeredCount = states.filter(Boolean).length;
    const t = TRANSLATIONS[currentLang];

    headerProgressText.textContent = t.progressHeader(answeredCount);
    finishProgressText.textContent = t.progressFinish(answeredCount);

    headerProgressBar.setAttribute("aria-valuenow", String(answeredCount));
    headerProgressFill.style.width = `${(answeredCount / 4) * 100}%`;

    finishDots.forEach((dot, idx) => {
      dot.classList.toggle("is-active", states[idx]);
    });

    questionCards.forEach((card, idx) => {
      card.classList.toggle("is-answered", states[idx]);
    });

    if (answeredCount > 0 && !feedbackEl.hidden) {
      feedbackEl.hidden = true;
      feedbackEl.textContent = "";
      lastErrorKey = "";
    }
  }

  function setLanguage(lang) {
    if (!TRANSLATIONS[lang]) return;
    currentLang = lang;
    const t = TRANSLATIONS[lang];

    document.documentElement.lang = lang;
    document.title = t.pageTitle;

    langButtons.forEach((btn) => {
      const active = btn.dataset.lang === lang;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", String(active));
    });

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.dataset.i18n;
      if (t[key] !== undefined) {
        el.textContent = t[key];
      }
    });

    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      const key = el.dataset.i18nHtml;
      if (t[key] !== undefined) {
        el.innerHTML = t[key];
      }
    });

    nameInput.placeholder = t.namePlaceholder;

    if (svgAmount) svgAmount.textContent = t.svgAmount;
    if (svgReady) svgReady.textContent = t.svgReady;
    if (svgRate) svgRate.textContent = t.svgRate;

    if (submitBtn.disabled) {
      btnLabel.textContent = t.sendingBtn;
    }

    if (!feedbackEl.hidden && lastErrorKey && t[lastErrorKey]) {
      feedbackEl.textContent = t[lastErrorKey];
    }

    updateProgress();
  }

  function showConfirmation() {
    surveyContainer.hidden = true;
    thankYouPanel.hidden = false;
    thankYouPanel.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function submitViaAppsScript(endpoint, data) {
    const response = await fetch(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const result = await response.json();
    if (!result || !result.ok) {
      throw new Error((result && result.error) || "Submission failed");
    }
  }

  langButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      setLanguage(btn.dataset.lang);
    });
  });

  form.addEventListener("change", updateProgress);

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const t = TRANSLATIONS[currentLang];
    const data = collectAnswers();
    const answeredCount = [
      Boolean(data.q1),
      Boolean(data.q2),
      Boolean(data.q3),
      data.q4.length > 0,
    ].filter(Boolean).length;

    if (answeredCount === 0) {
      lastErrorKey = "errEmpty";
      feedbackEl.textContent = t.errEmpty;
      feedbackEl.hidden = false;
      questionCards[0].scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    const endpoint = APPS_SCRIPT_URL.trim();
    if (!endpoint) {
      lastErrorKey = "errSetup";
      feedbackEl.textContent = t.errSetup;
      feedbackEl.hidden = false;
      return;
    }

    lastErrorKey = "";
    feedbackEl.hidden = true;
    submitBtn.disabled = true;
    submitBtn.classList.add("is-loading");
    btnLabel.textContent = t.sendingBtn;

    try {
      await submitViaAppsScript(endpoint, data);
      showConfirmation();
    } catch (err) {
      lastErrorKey = "errSave";
      feedbackEl.textContent = TRANSLATIONS[currentLang].errSave;
      feedbackEl.hidden = false;
    } finally {
      submitBtn.disabled = false;
      submitBtn.classList.remove("is-loading");
      btnLabel.textContent = TRANSLATIONS[currentLang].sendBtn;
    }
  });

  resetBtn.addEventListener("click", () => {
    form.reset();
    updateProgress();
    thankYouPanel.hidden = true;
    surveyContainer.hidden = false;
    surveyContainer.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  setLanguage("en");
})();
