// projects/accessibility-module/app.js
(function () {
  const DATA = window.A11Y_CONTENT;
  const TOTAL_PANES = 8;

  const mainStage = document.getElementById("main-content");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const stepDots = document.getElementById("stepDots");
  const paneCounter = document.getElementById("paneCounter");
  const paneLabel = document.getElementById("paneLabel");
  const progressBar = document.getElementById("progressBar");
  const progressFill = document.getElementById("progressFill");

  // Persistent state
  let currentPane = 0; // 0 to 7
  let activeContext = "university"; // Defaults to Online University
  let openPour = { P: true, O: false, U: false, R: false };
  let audit1Fixes = { contrast: false, link: false, alt: false, headings: false };
  let audit2Fixes = { captions: false, verbalize: false, agenda: false, camera: false };

  // Pane 7 ranking state (stores current option order per phase per context)
  let currentPhaseIdx = 0;
  let planEvaluated = false;
  const userRankings = {
    university: [],
    corporate: []
  };

  function initRankings() {
    ["university", "corporate"].forEach(ctx => {
      userRankings[ctx] = DATA[ctx].phases.map(phase => {
        // Start in a neutral mixed order so the #1 answer is not always at the top
        const opts = phase.options.map(o => o.id);
        return [opts[2], opts[0], opts[3], opts[1]];
      });
    });
  }

  function init() {
    initRankings();
    setupContextToggle();
    setupNavigation();
    setupA11yWidget();
    renderStepDots();
    renderPane();
  }

  function setupContextToggle() {
    document.querySelectorAll(".ctx-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const nextCtx = btn.dataset.ctx;
        if (nextCtx === activeContext) return;
        activeContext = nextCtx;
        stopReading();

        document.querySelectorAll(".ctx-btn").forEach(b => {
          const isMatch = b.dataset.ctx === activeContext;
          b.classList.toggle("active", isMatch);
          b.setAttribute("aria-pressed", String(isMatch));
        });

        renderPane();
      });
    });
  }

  function setupNavigation() {
    prevBtn.addEventListener("click", () => goToPane(currentPane - 1));
    nextBtn.addEventListener("click", () => goToPane(currentPane + 1));
  }

  function goToPane(idx) {
    if (idx < 0 || idx >= TOTAL_PANES) return;
    stopReading();
    currentPane = idx;
    renderPane();
    mainStage.focus({ preventScroll: false });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function renderStepDots() {
    stepDots.innerHTML = DATA.paneLabels.map((lbl, i) => `
      <button
        type="button"
        class="step-dot ${i === currentPane ? "active" : ""}"
        aria-label="Go to Pane ${i + 1}: ${lbl}"
        aria-selected="${i === currentPane}"
        data-pane="${i}"
      ></button>
    `).join("");

    stepDots.querySelectorAll(".step-dot").forEach(dot => {
      dot.addEventListener("click", () => goToPane(Number(dot.dataset.pane)));
    });
  }

  function updateChrome() {
    paneCounter.textContent = `Pane ${currentPane + 1} of ${TOTAL_PANES}`;
    paneLabel.textContent = DATA.paneLabels[currentPane];
    progressBar.setAttribute("aria-valuenow", String(currentPane + 1));
    progressFill.style.width = `${((currentPane + 1) / TOTAL_PANES) * 100}%`;

    prevBtn.disabled = currentPane === 0;
    nextBtn.disabled = currentPane === TOTAL_PANES - 1;
    nextBtn.textContent = currentPane === TOTAL_PANES - 1 ? "Module Complete ✓" : "Next →";

    stepDots.querySelectorAll(".step-dot").forEach((dot, i) => {
      dot.classList.toggle("active", i === currentPane);
      dot.setAttribute("aria-selected", String(i === currentPane));
    });
  }

  // Accessibility Widget + Built-in Web Speech API Reader
  function setupA11yWidget() {
    const toggleBtn = document.getElementById("a11yToggleBtn");
    const closeBtn = document.getElementById("a11yCloseBtn");
    const panel = document.getElementById("a11yPanel");
    const darkToggle = document.getElementById("darkToggle");
    const largeTextToggle = document.getElementById("largeTextToggle");
    const spacingToggle = document.getElementById("spacingToggle");
    const readPlayBtn = document.getElementById("readPlayBtn");
    const readStopBtn = document.getElementById("readStopBtn");

    function setPanelOpen(open) {
      panel.classList.toggle("hidden", !open);
      toggleBtn.setAttribute("aria-expanded", String(open));
    }

    toggleBtn.addEventListener("click", () => setPanelOpen(panel.classList.contains("hidden")));
    closeBtn.addEventListener("click", () => setPanelOpen(false));

    darkToggle.addEventListener("change", () => document.body.classList.toggle("dark-mode", darkToggle.checked));
    largeTextToggle.addEventListener("change", () => document.body.classList.toggle("large-text", largeTextToggle.checked));
    spacingToggle.addEventListener("change", () => document.body.classList.toggle("readable-spacing", spacingToggle.checked));

    readPlayBtn.addEventListener("click", () => {
      if (!("speechSynthesis" in window)) {
        document.getElementById("readerStatus").textContent = "Your browser does not support built-in speech reading.";
        return;
      }
      window.speechSynthesis.cancel();
      const text = mainStage.innerText.replace(/\s+/g, " ").trim();
      const utter = new SpeechSynthesisUtterance(text);
      utter.rate = 0.98;
      utter.onstart = () => {
        readStopBtn.disabled = false;
        document.getElementById("readerStatus").textContent = "Reading active pane aloud...";
      };
      utter.onend = () => {
        readStopBtn.disabled = true;
        document.getElementById("readerStatus").textContent = "Finished reading pane.";
      };
      window.speechSynthesis.speak(utter);
    });

    readStopBtn.addEventListener("click", stopReading);
  }

  function stopReading() {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    const stopBtn = document.getElementById("readStopBtn");
    const status = document.getElementById("readerStatus");
    if (stopBtn) stopBtn.disabled = true;
    if (status) status.textContent = "Uses your browser's built-in voice reader.";
  }

  function renderPane() {
    updateChrome();
    const ctx = DATA[activeContext];

    if (currentPane === 0) renderPane1(ctx);
    else if (currentPane === 1) renderPane2(ctx);
    else if (currentPane === 2) renderPane3(ctx);
    else if (currentPane === 3) renderPane4(ctx);
    else if (currentPane === 4) renderPane5(ctx);
    else if (currentPane === 5) renderPane6(ctx);
    else if (currentPane === 6) renderPane7(ctx);
    else renderPane8(ctx);
  }

  function renderPane1(ctx) {
    mainStage.innerHTML = `
      <span class="pane-tag">PILLAR 01 • LEGAL BASELINE</span>
      <h2 class="pane-title">ADA: The Americans with Disabilities Act</h2>

      <div class="roadmap-strip" aria-label="Three pillars roadmap">
        <div class="road-step current"><strong>1. ADA</strong>The Legal Floor</div>
        <div class="road-step"><strong>2. WCAG</strong>The Technical Standard</div>
        <div class="road-step"><strong>3. UDL</strong>The Proactive Mindset</div>
      </div>

      <p class="pane-lead">
        The Americans with Disabilities Act (ADA) is a civil rights law that prohibits discrimination based on disability. In remote work and online learning, accessibility is not an optional bonus; it is the baseline right to equal participation.
      </p>

      <div class="info-grid-2">
        <div class="info-card">
          <h3>What It Covers Digitally</h3>
          <p>Websites, learning management systems, internal portals, PDFs, slide decks, and live virtual meetings all fall under digital accessibility expectations.</p>
        </div>
        <div class="info-card">
          <h3>Why Remote Teams Care</h3>
          <p>Remote work relies almost entirely on screens, audio, and text. When a document or meeting is inaccessible, it locks people out of doing their job or completing coursework.</p>
        </div>
      </div>

      <div class="context-callout">
        <strong>In Your Context (${ctx.contextName}):</strong>
        <p>${ctx.adaExample}</p>
      </div>
    `;
  }

  function renderPane2(ctx) {
    const cards = [
      { key: "P", name: "Perceivable", short: "Can everyone see or hear the content?" },
      { key: "O", name: "Operable", short: "Can everyone navigate without a mouse?" },
      { key: "U", name: "Understandable", short: "Is the layout and language clear?" },
      { key: "R", name: "Robust", short: "Does it work with assistive tech?" }
    ];

    mainStage.innerHTML = `
      <span class="pane-tag">PILLAR 02 • TECHNICAL STANDARD</span>
      <h2 class="pane-title">WCAG 2.2 & The POUR Principles</h2>
      <p class="pane-lead">
        While ADA tells us <strong>why</strong> accessibility matters, the Web Content Accessibility Guidelines (WCAG) give us the measurable <strong>how</strong>. Click each POUR card below to see a ${ctx.contextName} example.
      </p>

      <div class="pour-grid">
        ${cards.map(c => `
          <button type="button" class="pour-card ${openPour[c.key] ? "open" : ""}" data-pour="${c.key}" aria-expanded="${openPour[c.key]}">
            <span class="pour-letter">${c.key}</span>
            <h3>${c.name}</h3>
            <p class="pour-short">${c.short}</p>
            <div class="pour-detail ${openPour[c.key] ? "" : "hidden"}">
              <strong>Example:</strong> ${ctx.pourExamples[c.key]}
            </div>
          </button>
        `).join("")}
      </div>
    `;

    mainStage.querySelectorAll(".pour-card").forEach(btn => {
      btn.addEventListener("click", () => {
        const k = btn.dataset.pour;
        openPour[k] = !openPour[k];
        renderPane2(ctx);
      });
    });
  }

  function renderPane3(ctx) {
    mainStage.innerHTML = `
      <span class="pane-tag">PILLAR 03 • PROACTIVE DESIGN</span>
      <h2 class="pane-title">UDL: Universal Design for Learning</h2>
      <p class="pane-lead">
        Universal Design for Learning (UDL) shifts accessibility from reactive fixes ("waiting until someone asks for an accommodation") to proactive flexibility built in from day one.
      </p>

      <div class="info-grid-2">
        <div class="info-card">
          <h3>The Curb-Cut Effect</h3>
          <p>Sidewalk curb cuts were designed for wheelchair users, yet they immediately helped parents with strollers, travelers with rolling luggage, and delivery workers too. Digital accessibility works the exact same way.</p>
        </div>
        <div class="info-card">
          <h3>Flexible by Default</h3>
          <p>UDL encourages offering multiple ways to absorb information (text, audio, visuals) and multiple ways to participate (mic, chat, async comments) so every brain can thrive.</p>
        </div>
      </div>

      <div class="context-callout">
        <strong>In Your Context (${ctx.contextName}):</strong>
        <p>${ctx.udlExample}</p>
      </div>
    `;
  }

  function renderPane4(ctx) {
    mainStage.innerHTML = `
      <span class="pane-tag">SYNTHESIS • THE BIG PICTURE</span>
      <h2 class="pane-title">How ADA, WCAG, and UDL Work Together</h2>
      <p class="pane-lead">
        Great remote experiences do not treat these three frameworks as separate checklists. Each layer supports the next.
      </p>

      <div class="connect-stack">
        <div class="connect-layer">
          <span class="layer-badge">1. ADA (Why)</span>
          <p>Sets the <strong>legal floor</strong> and civil rights foundation, ensuring no one is excluded from equal access.</p>
        </div>
        <div class="connect-layer">
          <span class="layer-badge">2. WCAG (How)</span>
          <p>Provides the <strong>measurable technical standards</strong> (contrast, alt text, keyboard access, clean headings) so assistive tech works reliably.</p>
        </div>
        <div class="connect-layer">
          <span class="layer-badge">3. UDL (Mindset)</span>
          <p>Raises the <strong>design ceiling</strong> by building flexibility into every doc, slide, and live session so everyone benefits without having to ask.</p>
        </div>
      </div>

      <div class="context-callout">
        <strong>Next Up: Put It Into Practice</strong>
        <p>In the next two panes, you will audit a real ${ctx.contextName} message and live session setup to spot and fix common barriers.</p>
      </div>
    `;
  }

  function renderPane5(ctx) {
    const fixedCount = Object.values(audit1Fixes).filter(Boolean).length;
    const score = fixedCount * 25;

    const buttons = [
      { key: "contrast", label: "Fix Low Color Contrast", note: "WCAG Perceivable: Raises text contrast to 4.5:1+." },
      { key: "headings", label: "Add Headings & Bullet List", note: "WCAG Understandable / UDL: Breaks up walls of text." },
      { key: "alt", label: "Add Descriptive Alt Text", note: "WCAG Perceivable: Describes the graphic for screen readers." },
      { key: "link", label: "Replace 'Click Here' Link", note: "WCAG Operable: Tells users exactly where the link goes." }
    ];

    mainStage.innerHTML = `
      <span class="pane-tag">SPOT & FIX AUDIT 1 • WRITTEN CONTENT</span>
      <h2 class="pane-title">Audit a ${ctx.audit1Title}</h2>
      <p class="pane-lead">Toggle each fix on the right to see the live before-and-after impact on accessibility.</p>

      <div class="audit-layout">
        <div class="artifact-box">
          <div class="artifact-header">
            <span>${ctx.audit1Sender}</span>
            <span class="score-pill ${score === 100 ? "perfect" : ""}">WCAG Score: ${score}%</span>
          </div>

          <div class="sim-text ${audit1Fixes.contrast ? "" : "broken-contrast"}">
            ${audit1Fixes.headings ? ctx.audit1BodyFixed : `<p>${ctx.audit1BodyBroken}</p>`}
          </div>

          <div class="sim-img-box">
            <div><strong>${ctx.audit1ImgCaption}</strong></div>
            <span class="alt-badge ${audit1Fixes.alt ? "fixed" : "missing"}">
              ${audit1Fixes.alt ? ctx.audit1AltFixed : "Missing Alt Text (Screen reader says: 'Image')"}
            </span>
          </div>

          <div>
            Resource: <a href="#audit-link" class="sim-link" onclick="return false;">${audit1Fixes.link ? ctx.audit1LinkFixed : ctx.audit1LinkBroken}</a>
          </div>
        </div>

        <div class="fix-controls">
          ${buttons.map(b => `
            <button type="button" class="fix-btn ${audit1Fixes[b.key] ? "fixed" : ""}" data-fix1="${b.key}" aria-pressed="${audit1Fixes[b.key]}">
              <div class="fix-btn-title">
                <span>${b.label}</span>
                <span>${audit1Fixes[b.key] ? "✓ Fixed" : "+ Apply"}</span>
              </div>
              <div class="fix-btn-note">${b.note}</div>
            </button>
          `).join("")}
        </div>
      </div>
    `;

    mainStage.querySelectorAll("[data-fix1]").forEach(btn => {
      btn.addEventListener("click", () => {
        const k = btn.dataset.fix1;
        audit1Fixes[k] = !audit1Fixes[k];
        renderPane5(ctx);
      });
    });
  }

  function renderPane6(ctx) {
    const fixedCount = Object.values(audit2Fixes).filter(Boolean).length;
    const score = fixedCount * 25;

    mainStage.innerHTML = `
      <span class="pane-tag">SPOT & FIX AUDIT 2 • LIVE SESSIONS</span>
      <h2 class="pane-title">Audit Your ${ctx.audit2Title}</h2>
      <p class="pane-lead">Enable all four inclusive facilitation habits below to see who each setting supports.</p>

      <div class="artifact-box">
        <div class="artifact-header">
          <span>LIVE SESSION READINESS</span>
          <span class="score-pill ${score === 100 ? "perfect" : ""}">Inclusion Score: ${score}%</span>
        </div>

        <div class="fix-controls">
          ${ctx.audit2Items.map(item => `
            <button type="button" class="fix-btn ${audit2Fixes[item.id] ? "fixed" : ""}" data-fix2="${item.id}" aria-pressed="${audit2Fixes[item.id]}">
              <div class="fix-btn-title">
                <span>${item.title}</span>
                <span>${audit2Fixes[item.id] ? "✓ Enabled" : "Enable"}</span>
              </div>
              <div class="fix-btn-note">${item.note}</div>
            </button>
          `).join("")}
        </div>
      </div>
    `;

    mainStage.querySelectorAll("[data-fix2]").forEach(btn => {
      btn.addEventListener("click", () => {
        const k = btn.dataset.fix2;
        audit2Fixes[k] = !audit2Fixes[k];
        renderPane6(ctx);
      });
    });
  }

  function renderPane7(ctx) {
    const phases = ctx.phases;

    if (planEvaluated) {
      renderPane7Evaluation(ctx);
      return;
    }

    const phase = phases[currentPhaseIdx];
    const currentOrderIds = userRankings[activeContext][currentPhaseIdx];
    const rankLabels = ["#1 Most Likely", "#2 Second Choice", "#3 Third Choice", "#4 Least Likely"];

    mainStage.innerHTML = `
      <span class="pane-tag">IN THE MOMENT • 4-PHASE PRIORITY RANKING</span>
      <h2 class="pane-title">${phase.title}</h2>

      <div class="phase-tabs" role="tablist" aria-label="Scenario phases">
        ${phases.map((p, i) => `
          <button type="button" class="phase-tab ${i === currentPhaseIdx ? "active" : ""}" data-phase="${i}">
            ${i + 1}. ${p.title.split(": ")[1]}
          </button>
        `).join("")}
      </div>

      <p class="pane-lead">${phase.prompt}</p>

      <div class="rank-list">
        ${currentOrderIds.map((optId, idx) => {
          const opt = phase.options.find(o => o.id === optId);
          return `
            <div class="rank-item">
              <div class="rank-left">
                <span class="rank-badge">#${idx + 1}</span>
                <div>
                  <span class="rank-label">${rankLabels[idx]}</span>
                  <p class="rank-text">${opt.text}</p>
                </div>
              </div>
              <div class="rank-arrows">
                <button type="button" class="arrow-btn" data-move="up" data-idx="${idx}" aria-label="Move option ${idx + 1} up" ${idx === 0 ? "disabled" : ""}>↑</button>
                <button type="button" class="arrow-btn" data-move="down" data-idx="${idx}" aria-label="Move option ${idx + 1} down" ${idx === currentOrderIds.length - 1 ? "disabled" : ""}>↓</button>
              </div>
            </div>
          `;
        }).join("")}
      </div>

      <div class="phase-actions">
        <button type="button" class="nav-btn secondary" id="prevPhaseBtn" ${currentPhaseIdx === 0 ? "disabled" : ""}>← Previous Phase</button>
        ${currentPhaseIdx < phases.length - 1
          ? `<button type="button" class="nav-btn primary" id="nextPhaseBtn">Next Phase →</button>`
          : `<button type="button" class="nav-btn primary" id="evalPlanBtn">Evaluate My Plan ✓</button>`
        }
      </div>
    `;

    mainStage.querySelectorAll(".phase-tab").forEach(btn => {
      btn.addEventListener("click", () => {
        currentPhaseIdx = Number(btn.dataset.phase);
        renderPane7(ctx);
      });
    });

    mainStage.querySelectorAll(".arrow-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const i = Number(btn.dataset.idx);
        const dir = btn.dataset.move;
        const arr = userRankings[activeContext][currentPhaseIdx];
        const swapIdx = dir === "up" ? i - 1 : i + 1;
        if (swapIdx < 0 || swapIdx >= arr.length) return;
        [arr[i], arr[swapIdx]] = [arr[swapIdx], arr[i]];
        renderPane7(ctx);
      });
    });

    const prevPhaseBtn = document.getElementById("prevPhaseBtn");
    if (prevPhaseBtn) {
      prevPhaseBtn.addEventListener("click", () => {
        currentPhaseIdx--;
        renderPane7(ctx);
      });
    }

    const nextPhaseBtn = document.getElementById("nextPhaseBtn");
    if (nextPhaseBtn) {
      nextPhaseBtn.addEventListener("click", () => {
        currentPhaseIdx++;
        renderPane7(ctx);
      });
    }

    const evalPlanBtn = document.getElementById("evalPlanBtn");
    if (evalPlanBtn) {
      evalPlanBtn.addEventListener("click", () => {
        planEvaluated = true;
        renderPane7(ctx);
      });
    }
  }

  function renderPane7Evaluation(ctx) {
    const phases = ctx.phases;
    let strongTopCount = 0;

    const cardsHtml = phases.map((phase, pIdx) => {
      const orderIds = userRankings[activeContext][pIdx];
      const topOpt = phase.options.find(o => o.id === orderIds[0]);
      const bottomOpt = phase.options.find(o => o.id === orderIds[3]);
      const isStrongTop = topOpt.idealRank === 1;
      if (isStrongTop) strongTopCount++;

      const recommended = [...phase.options].sort((a, b) => a.idealRank - b.idealRank);

      return `
        <div class="eval-card">
          <h4>${phase.title}</h4>
          <span class="eval-badge ${isStrongTop ? "good" : "trap"}">
            ${isStrongTop ? "Strong #1 Priority" : "Subtle Trap at #1"}
          </span>
          <p style="font-size:0.88rem; margin-bottom:6px;">
            <strong>Your #1 Choice Impact:</strong> ${topOpt.feedback}
          </p>
          <p style="font-size:0.84rem; color:var(--text-muted);">
            <strong>Your #4 (Least Likely):</strong> ${bottomOpt.idealRank >= 3 ? "Good instinct pushing this option to the bottom." : "Notice that this option actually solves the barrier more effectively than it looks."}
          </p>

          <div class="compare-grid">
            <div class="compare-col">
              <strong>Your Order</strong>
              <ol>
                ${orderIds.map(id => `<li>${phase.options.find(o => o.id === id).text.slice(0, 62)}...</li>`).join("")}
              </ol>
            </div>
            <div class="compare-col">
              <strong>Recommended Order</strong>
              <ol>
                ${recommended.map(o => `<li>${o.text.slice(0, 62)}...</li>`).join("")}
              </ol>
            </div>
          </div>
        </div>
      `;
    }).join("");

    mainStage.innerHTML = `
      <span class="pane-tag">PLAN EVALUATION • ${strongTopCount} OF 4 TOP PRIORITIES ALIGNED</span>
      <h2 class="pane-title">Your Accessibility Action Plan Debrief</h2>
      <p class="pane-lead">
        Here is how your top priorities performed across all four phases, including any well-intentioned traps that showed up at #1.
      </p>

      <div>${cardsHtml}</div>

      <div class="phase-actions">
        <button type="button" class="nav-btn secondary" id="editPlanBtn">← Adjust My Rankings</button>
        <button type="button" class="nav-btn primary" id="goChecklistBtn">Continue to Quick-Check →</button>
      </div>
    `;

    document.getElementById("editPlanBtn").addEventListener("click", () => {
      planEvaluated = false;
      currentPhaseIdx = 0;
      renderPane7(ctx);
    });

    document.getElementById("goChecklistBtn").addEventListener("click", () => goToPane(7));
  }

  function renderPane8(ctx) {
    mainStage.innerHTML = `
      <span class="pane-tag">WRAP-UP • READY TO USE</span>
      <h2 class="pane-title">Remote Accessibility Quick-Check (${ctx.contextName})</h2>
      <p class="pane-lead">
        Keep this 6-point checklist handy before sharing a document or hosting a live session.
      </p>

      <div class="checklist-box">
        <strong>Your ${ctx.contextName} Checklist</strong>
        <ul class="checklist-ul">
          ${ctx.checklist.map(item => `<li><span aria-hidden="true">☑</span><span>${item}</span></li>`).join("")}
        </ul>
        <div class="checklist-actions">
          <button type="button" class="nav-btn primary" id="copyChecklistBtn">Copy Checklist</button>
          <button type="button" class="nav-btn secondary" id="printChecklistBtn">Print / Save PDF</button>
        </div>
      </div>

      <div>
        <h3 style="font-family:var(--font-display); font-size:1.05rem; margin-bottom:10px;">Official Guidelines & Further Reading</h3>
        <div class="resource-grid">
          ${DATA.resources.map(r => `
            <a href="${r.url}" target="_blank" rel="noopener noreferrer" class="resource-link">
              <strong>${r.title}</strong>
              <span>${r.desc}</span>
            </a>
          `).join("")}
        </div>
      </div>
    `;

    document.getElementById("copyChecklistBtn").addEventListener("click", () => {
      const text = `Remote Accessibility Quick-Check (${ctx.contextName})\n\n` + ctx.checklist.map(i => `- [ ] ${i}`).join("\n");
      navigator.clipboard.writeText(text).then(() => {
        document.getElementById("copyChecklistBtn").textContent = "Copied! ✓";
      });
    });

    document.getElementById("printChecklistBtn").addEventListener("click", () => window.print());
  }

  init();
})();
// END OF FILE