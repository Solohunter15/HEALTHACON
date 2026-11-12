(() => {
  "use strict";

  /**
   * Paste your deployed Google Apps Script Web App URL here
   * (from `google-apps-script.gs` -> Deploy -> Web app -> https://script.google.com/macros/s/.../exec)
   * so submissions save directly to your Google Form with zero redirect.
   */
  const APPS_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbxgtcYu5Qg49RiV5nws0oY94JTtbbYuc-0_W7reQMz2PBzmqvrXeMwqx756vuW59g1QVA/exec";

  const form = document.getElementById("healthacon-form");
  const surveyContainer = document.getElementById("survey-container");
  const thankYouPanel = document.getElementById("thank-you-panel");
  const thankYouEyebrow = document.getElementById("thank-you-eyebrow");
  const thankYouHeading = document.getElementById("thank-you-heading");
  const thankYouCopy = document.getElementById("thank-you-copy");
  const submitBtn = document.getElementById("submit-btn");
  const btnLabel = submitBtn.querySelector(".btn-label");
  const feedbackEl = document.getElementById("form-feedback");

  const headerProgressText = document.getElementById("header-progress-text");
  const headerProgressBar = document.getElementById("header-progress-bar");
  const headerProgressFill = document.getElementById("header-progress-fill");
  const finishProgressText = document.getElementById("finish-progress-text");
  const finishDots = document.querySelectorAll("#finish-dots .f-dot");
  const questionCards = document.querySelectorAll(".question-card");
  const submittedSummary = document.getElementById("submitted-summary");
  const resetBtn = document.getElementById("reset-survey-btn");

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
    const nameInput = document.getElementById("respondent-name");

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

    headerProgressText.textContent = `${answeredCount} of 4 answered`;
    finishProgressText.textContent = `${answeredCount} of 4 answered.`;

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
    }
  }

  function buildSummary(data) {
    const rows = [
      {
        q: "1. Would you join, giving ₹1 every week automatically?",
        a: data.q1 || "Skipped",
      },
      {
        q: "2. If it launched, would you start paying in the first month?",
        a: data.q2 || "Skipped",
      },
      {
        q: "3. Have you ever donated online for a medical cause?",
        a: data.q3 || "Skipped",
      },
      {
        q: "4. What would make you trust a case is real?",
        a: data.q4.length ? data.q4.join(" · ") : "Skipped",
      },
      {
        q: "Your name",
        a: data.name || "Anonymous",
      },
    ];

    submittedSummary.innerHTML = "";
    rows.forEach((row) => {
      const item = document.createElement("div");
      item.className = "summary-item";

      const qSpan = document.createElement("span");
      qSpan.className = "summary-q";
      qSpan.textContent = row.q;

      const aSpan = document.createElement("span");
      aSpan.className = "summary-a";
      aSpan.textContent = row.a;

      item.appendChild(qSpan);
      item.appendChild(aSpan);
      submittedSummary.appendChild(item);
    });
  }

  function showConfirmation(data) {
    buildSummary(data);
    thankYouEyebrow.textContent = "Response recorded";
    thankYouHeading.textContent = "Thank you. HEALTHACON 2026.";
    thankYouCopy.textContent =
      "Your answers have been saved directly to the Google Form and private Google Sheet.";

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
      throw new Error((result && result.error) || "Google Form rejected the submission.");
    }
  }

  form.addEventListener("change", updateProgress);

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = collectAnswers();
    const answeredCount = [
      Boolean(data.q1),
      Boolean(data.q2),
      Boolean(data.q3),
      data.q4.length > 0,
    ].filter(Boolean).length;

    if (answeredCount === 0) {
      feedbackEl.textContent = "Please answer at least one question before sending.";
      feedbackEl.hidden = false;
      questionCards[0].scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    const endpoint = APPS_SCRIPT_URL.trim();
    if (!endpoint) {
      feedbackEl.textContent =
        "Setup needed: deploy google-apps-script.gs inside your Google Form and paste the Web App URL into APPS_SCRIPT_URL in app.js so responses save directly without redirecting.";
      feedbackEl.hidden = false;
      return;
    }

    feedbackEl.hidden = true;
    submitBtn.disabled = true;
    submitBtn.classList.add("is-loading");
    btnLabel.textContent = "Sending answers…";

    try {
      await submitViaAppsScript(endpoint, data);
      showConfirmation(data);
    } catch (err) {
      feedbackEl.textContent =
        "Unable to save your response right now. Please check the Apps Script deployment URL and try again.";
      feedbackEl.hidden = false;
    } finally {
      submitBtn.disabled = false;
      submitBtn.classList.remove("is-loading");
      btnLabel.textContent = "Send answers";
    }
  });

  resetBtn.addEventListener("click", () => {
    form.reset();
    updateProgress();
    thankYouPanel.hidden = true;
    surveyContainer.hidden = false;
    surveyContainer.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  updateProgress();
})();
