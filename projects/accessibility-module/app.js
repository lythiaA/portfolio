// projects/accessibility-module/app.js
(function () {
  const DATA = window.A11Y_CONTENT;
  const TOTAL_PANES = 8;

  const mainStage = document.getElementById("main-content");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const stepNumbers = document.getElementById("stepNumbers");
  const paneCounter = document.getElementById("paneCounter");
  const paneLabel = document.getElementById("paneLabel");
  const progressBar = document.getElementById("progressBar");
  const progressFill = document.getElementById("progressFill");

  // Persistent session state
  let currentPane = 0; // 0 to 7
  let activeContext = "university"; // Defaults to Online University
  let activeConnectPillar = "ada";
  let openPour = { P: true, O: false, U: false, R: false };
  let audit1Fixes = { contrast: false, link: false, alt: false, headings: false };
  let audit2Fixes = { captions: false, verbalize: false, agenda: false, camera: false };
  let lastHotspotNote = "Click any pulsing button in the simulated live session above to enable an inclusive practice.";

  // Separate Pane 7 state per context (University vs. Corporate)
  const scenarioState = {
    university: { currentPhaseIdx: 0, unlockedPhase: 0, evaluated: false, rankings: [] },
    corporate: { currentPhaseIdx: 0, unlockedPhase: 0, evaluated: false, rankings: [] }
  };

  let availableVoices = [];

  function initRankings() {
    ["university", "corporate"].forEach(ctx => {
      scenarioState[ctx].currentPhaseIdx = 0;
      scenarioState[ctx].unlockedPhase = 0;
      scenarioState[ctx].evaluated = false;
      scenarioState[ctx].rankings = DATA[ctx].phases.map(phase => {
        const opts = phase.options.map(o => o.id);
        return [opts[2], opts[0], opts[3], opts[1]];
      });
    });
  }

  function resetAllProgress() {
    stopReading();
    currentPane = 0;
    activeConnectPillar = "ada";
    openPour = { P: true, O: false, U: false, R: false };
    audit1Fixes = { contrast: false, link: false, alt: false, headings: false };
    audit2Fixes = { captions: false, verbalize: false, agenda: false, camera: false };
    lastHotspotNote = "Click any pulsing button in the simulated live session above to enable an inclusive practice.";
    initRankings();
    renderPane();
  }

  function init() {
    initRankings();
    setupContextToggle();
    setupNavigation();
    setupA11yWidget();
    renderStepNumbers();
    renderPane();
  }

  function switchContext(nextCtx) {
    if (nextCtx === activeContext) return;
    activeContext = nextCtx;
    stopReading();

    document.querySelectorAll(".ctx-btn").forEach(b => {
      const isMatch = b.dataset.ctx === activeContext;
      b.classList.toggle("active", isMatch);
      b.setAttribute("aria-pressed", String(isMatch));
    });

    renderPane();
  }

  function setupContextToggle() {
    document.querySelectorAll(".ctx-btn").forEach(btn => {
      btn.addEventListener("click", () => switchContext(btn.dataset.ctx));
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

  function renderStepNumbers() {
    stepNumbers.innerHTML = DATA.paneLabels.map((lbl, i) => `
      <button
        type="button"
        class="step-num ${i === currentPane ? "active" : ""}"
        aria-label="Go to Pane ${i + 1}: ${lbl}"
        aria-selected="${i === currentPane}"
        data-pane="${i}"
      >${i + 1}</button>
    `).join("");

    stepNumbers.querySelectorAll(".step-num").forEach(btn => {
      btn.addEventListener("click", () => goToPane(Number(btn.dataset.pane)));
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

    stepNumbers.querySelectorAll(".step-num").forEach((btn, i) => {
      btn.classList.toggle("active", i === currentPane);
      btn.setAttribute("aria-selected", String(i === currentPane));
    });
  }

  // Accessibility Widget + Audio Reader (Play, Pause/Resume, Stop, Voice Picker)
  function setupA11yWidget() {
    const toggleBtn = document.getElementById("a11yToggleBtn");
    const closeBtn = document.getElementById("a11yCloseBtn");
    const panel = document.getElementById("a11yPanel");
    const darkToggle = document.getElementById("darkToggle");
    const largeTextToggle = document.getElementById("largeTextToggle");
    const spacingToggle = document.getElementById("spacingToggle");
    const readPlayBtn = document.getElementById("readPlayBtn");
    const readPauseBtn = document.getElementById("readPauseBtn");
    const readStopBtn = document.getElementById("readStopBtn");
    const voiceSelect = document.getElementById("voiceSelect");

    function setPanelOpen(open) {
      panel.classList.toggle("hidden", !open);
      toggleBtn.setAttribute("aria-expanded", String(open));
    }

    toggleBtn.addEventListener("click", () => setPanelOpen(panel.classList.contains("hidden")));
    closeBtn.addEventListener("click", () => setPanelOpen(false));

    darkToggle.addEventListener("change", () => document.body.classList.toggle("dark-mode", darkToggle.checked));
    // Apply large-text to root <html> so all rem units scale
    largeTextToggle.addEventListener("change", () => document.documentElement.classList.toggle("large-text", largeTextToggle.checked));
    spacingToggle.addEventListener("change", () => document.body.classList.toggle("readable-spacing", spacingToggle.checked));

    function populateVoices() {
      if (!("speechSynthesis" in window)) return;
      availableVoices = window.speechSynthesis.getVoices().filter(v => v.lang.startsWith("en"));
      if (availableVoices.length === 0) availableVoices = window.speechSynthesis.getVoices();
      voiceSelect.innerHTML = `<option value="">Default System Voice</option>` +
        availableVoices.map((v, i) => `<option value="${i}">${v.name} (${v.lang})</option>`).join("");
    }

    if ("speechSynthesis" in window) {
      populateVoices();
      window.speechSynthesis.onvoiceschanged = populateVoices;
    }

    readPlayBtn.addEventListener("click", () => {
      if (!("speechSynthesis" in window)) {
        document.getElementById("readerStatus").textContent = "Your browser does not support built-in speech reading.";
        return;
      }
      window.speechSynthesis.cancel();
      const text = mainStage.innerText.replace(/\s+/g, " ").trim();
      const utter = new SpeechSynthesisUtterance(text);
      utter.rate = 0.98;

      if (voiceSelect.value !== "" && availableVoices[Number(voiceSelect.value)]) {
        utter.voice = availableVoices[Number(voiceSelect.value)];
      }

      utter.onstart = () => {
        readPauseBtn.disabled = false;
        readPauseBtn.textContent = "⏸ Pause";
        readStopBtn.disabled = false;
        document.getElementById("readerStatus").textContent = "Reading active pane aloud...";
      };
      utter.onend = () => {
        readPauseBtn.disabled = true;
        readPauseBtn.textContent = "⏸ Pause";
        readStopBtn.disabled = true;
        document.getElementById("readerStatus").textContent = "Finished reading pane.";
      };
      window.speechSynthesis.speak(utter);
    });

    readPauseBtn.addEventListener("click", () => {
      if (!("speechSynthesis" in window)) return;
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
        readPauseBtn.textContent = "⏸ Pause";
        document.getElementById("readerStatus").textContent = "Resumed reading...";
      } else if (window.speechSynthesis.speaking) {
        window.speechSynthesis.pause();
        readPauseBtn.textContent = "▶ Resume";
        document.getElementById("readerStatus").textContent = "Paused.";
      }
    });

    readStopBtn.addEventListener("click", stopReading);
  }

  function stopReading() {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    const pauseBtn = document.getElementById("readPauseBtn");
    const stopBtn = document.getElementById("readStopBtn");
    const status = document.getElementById("readerStatus");
    if (pauseBtn) {
      pauseBtn.disabled = true;
      pauseBtn.textContent = "⏸ Pause";
    }
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
    const p = DATA.connectPillars[activeConnectPillar];

    mainStage.innerHTML = `
      <span class="pane-tag">SYNTHESIS • HOW THEY CONNECT</span>
      <h2 class="pane-title">How ADA, WCAG, and UDL Work Together</h2>
      <p class="pane-lead">
        Click each pillar below to inspect its role and see how all three layers connect to build inclusive ${ctx.contextName} experiences.
      </p>

      <div class="connect-grid" role="tablist" aria-label="Three accessibility pillars">
        <button type="button" class="connect-btn ${activeConnectPillar === "ada" ? "active" : ""}" data-pillar="ada" aria-selected="${activeConnectPillar === "ada"}">
          <span class="connect-num">PILLAR 01</span>
          <h3>ADA</h3>
          <span style="font-size:0.8rem; color:var(--text-muted);">The Legal Floor</span>
        </button>
        <button type="button" class="connect-btn ${activeConnectPillar === "wcag" ? "active" : ""}" data-pillar="wcag" aria-selected="${activeConnectPillar === "wcag"}">
          <span class="connect-num">PILLAR 02</span>
          <h3>WCAG</h3>
          <span style="font-size:0.8rem; color:var(--text-muted);">The Technical How</span>
        </button>
        <button type="button" class="connect-btn ${activeConnectPillar === "udl" ? "active" : ""}" data-pillar="udl" aria-selected="${activeConnectPillar === "udl"}">
          <span class="connect-num">PILLAR 03</span>
          <h3>UDL</h3>
          <span style="font-size:0.8rem; color:var(--text-muted);">The Proactive Mindset</span>
        </button>
      </div>

      <div class="connect-detail-box" aria-live="polite">
        <h3>${p.title}</h3>
        <p>${p.body}</p>
        <div class="connect-link-note"><strong>${p.connects}</strong></div>
      </div>
    `;

    mainStage.querySelectorAll(".connect-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        activeConnectPillar = btn.dataset.pillar;
        renderPane4(ctx);
      });
    });
  }

  function renderPane5(ctx) {
    const fixedCount = Object.values(audit1Fixes).filter(Boolean).length;
    const score = fixedCount * 25;

    const buttons = [
      { key: "contrast", label: "Fix Low Color Contrast", note: "WCAG Perceivable: Raises text contrast to 4.5:1+." },
      { key: "headings", label: "Add Headings & Bullet List", note: "WCAG Understandable / UDL: Keeps the greeting while breaking up dense text." },
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

          <div style="font-size:0.9rem;">
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
      <span class="pane-tag">SPOT & FIX AUDIT 2 • LIVE VIRTUAL SESSION</span>
      <h2 class="pane-title">Audit Your ${ctx.audit2Title}</h2>
      <p class="pane-lead">Click each pulsing hotspot on the simulated session bar below to activate inclusive facilitation habits.</p>

      <div class="mock-meeting" aria-label="Simulated live virtual session">
        <div class="meeting-topbar">
          <span>● LIVE SESSION: ${ctx.audit2Title}</span>
          <span class="score-pill ${score === 100 ? "perfect" : ""}">Inclusion Score: ${score}%</span>
        </div>

        <div class="meeting-body">
          <div class="mock-slide">
            <div>
              <div class="mock-slide-title">${ctx.audit2SlideTitle}</div>
              <div class="mock-bars" aria-hidden="true">
                <div class="mock-bar" style="height: 85%;"></div>
                <div class="mock-bar" style="height: 55%;"></div>
                <div class="mock-bar" style="height: 95%;"></div>
                <div class="mock-bar" style="height: 70%;"></div>
              </div>
            </div>
            <div class="live-caption-bar ${audit2Fixes.captions ? "" : "hidden"}">
              <strong>[CC]:</strong> "As shown on the third bar of the chart, completion reached 95 percent..."
            </div>
          </div>

          <div class="mock-chat">
            <strong style="color:#93C5FD;">SESSION CHAT</strong>
            <div class="agenda-pill ${audit2Fixes.agenda ? "" : "hidden"}">✓ Agenda & Slides Shared 24h Early</div>
            <div class="chat-bubble">${ctx.audit2Chat1}</div>
            <div class="chat-bubble">${ctx.audit2Chat2}</div>
            <div class="agenda-pill ${audit2Fixes.verbalize ? "" : "hidden"}">✓ Host reading chat questions aloud</div>
            <div class="agenda-pill ${audit2Fixes.camera ? "" : "hidden"}">✓ Cameras optional (chat & mic welcome)</div>
          </div>
        </div>

        <div class="meeting-controls">
          ${ctx.audit2Items.map(item => `
            <button type="button" class="hotspot-btn ${audit2Fixes[item.id] ? "fixed" : ""}" data-fix2="${item.id}" aria-pressed="${audit2Fixes[item.id]}">
              ${audit2Fixes[item.id] ? "✓ " : ""}${item.btnLabel}
            </button>
          `).join("")}
        </div>
      </div>

      <div class="hotspot-feedback" aria-live="polite">
        ${lastHotspotNote}
      </div>
    `;

    mainStage.querySelectorAll("[data-fix2]").forEach(btn => {
      btn.addEventListener("click", () => {
        const k = btn.dataset.fix2;
        audit2Fixes[k] = !audit2Fixes[k];
        const item = ctx.audit2Items.find(i => i.id === k);
        lastHotspotNote = `<strong>${item.title}:</strong> ${item.note}`;
        renderPane6(ctx);
      });
    });
  }

  function renderPane7(ctx) {
    const state = scenarioState[activeContext];
    const otherCtx = activeContext === "university" ? "corporate" : "university";
    const otherName = DATA[otherCtx].contextName;
    const otherCompleted = scenarioState[otherCtx].evaluated;

    if (state.evaluated) {
      renderPane7Evaluation(ctx, state);
      return;
    }

    const phases = ctx.phases;
    const phase = phases[state.currentPhaseIdx];
    const currentOrderIds = state.rankings[state.currentPhaseIdx];
    const rankLabels = ["#1 Most Likely", "#2 Second Choice", "#3 Third Choice", "#4 Least Likely"];

    const bannerHtml = otherCompleted ? `
      <div class="cross-ctx-banner">
        <span>You have a completed Action Plan in <strong>${otherName}</strong>, though you have not ranked <strong>${ctx.contextName}</strong> yet.</span>
        <button type="button" class="nav-btn secondary" id="jumpOtherReportBtn" style="padding:5px 10px; font-size:0.76rem;">View ${otherName} Report →</button>
      </div>
    ` : "";

    mainStage.innerHTML = `
      <span class="pane-tag">IN THE MOMENT • 4-PHASE PRIORITY RANKING</span>
      <h2 class="pane-title">${phase.title}</h2>

      ${bannerHtml}

      <div class="phase-tabs" role="tablist" aria-label="Scenario phases">
        ${phases.map((p, i) => {
          const isLocked = i > state.unlockedPhase;
          return `
            <button type="button" class="phase-tab ${i === state.currentPhaseIdx ? "active" : ""}" data-phase="${i}" ${isLocked ? "disabled" : ""}>
              ${isLocked ? "🔒 " : ""}${i + 1}. ${p.title.split(": ")[1]}
            </button>
          `;
        }).join("")}
      </div>

      <p class="pane-lead">${phase.prompt}</p>
      <div class="rank-instruction">
        Action Required: Use the ↑ and ↓ buttons to rank these four options from #1 (Most Likely) to #4 (Least Likely).
      </div>

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
        <button type="button" class="nav-btn secondary" id="prevPhaseBtn" ${state.currentPhaseIdx === 0 ? "disabled" : ""}>← Previous Phase</button>
        ${state.currentPhaseIdx < phases.length - 1
          ? `<button type="button" class="nav-btn primary" id="nextPhaseBtn">Unlock & Continue to Phase ${state.currentPhaseIdx + 2} →</button>`
          : `<button type="button" class="nav-btn primary" id="evalPlanBtn">Evaluate My Plan ✓</button>`
        }
      </div>
    `;

    const jumpBtn = document.getElementById("jumpOtherReportBtn");
    if (jumpBtn) {
      jumpBtn.addEventListener("click", () => switchContext(otherCtx));
    }

    mainStage.querySelectorAll(".phase-tab").forEach(btn => {
      btn.addEventListener("click", () => {
        const target = Number(btn.dataset.phase);
        if (target <= state.unlockedPhase) {
          state.currentPhaseIdx = target;
          renderPane7(ctx);
        }
      });
    });

    mainStage.querySelectorAll(".arrow-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const i = Number(btn.dataset.idx);
        const dir = btn.dataset.move;
        const arr = state.rankings[state.currentPhaseIdx];
        const swapIdx = dir === "up" ? i - 1 : i + 1;
        if (swapIdx < 0 || swapIdx >= arr.length) return;
        [arr[i], arr[swapIdx]] = [arr[swapIdx], arr[i]];
        renderPane7(ctx);
      });
    });

    const prevPhaseBtn = document.getElementById("prevPhaseBtn");
    if (prevPhaseBtn) {
      prevPhaseBtn.addEventListener("click", () => {
        state.currentPhaseIdx--;
        renderPane7(ctx);
      });
    }

    const nextPhaseBtn = document.getElementById("nextPhaseBtn");
    if (nextPhaseBtn) {
      nextPhaseBtn.addEventListener("click", () => {
        state.currentPhaseIdx++;
        if (state.currentPhaseIdx > state.unlockedPhase) {
          state.unlockedPhase = state.currentPhaseIdx;
        }
        renderPane7(ctx);
      });
    }

    const evalPlanBtn = document.getElementById("evalPlanBtn");
    if (evalPlanBtn) {
      evalPlanBtn.addEventListener("click", () => {
        state.evaluated = true;
        renderPane7(ctx);
      });
    }
  }

  function renderPane7Evaluation(ctx, state) {
    const phases = ctx.phases;
    let strongTopCount = 0;

    const cardsHtml = phases.map((phase, pIdx) => {
      const orderIds = state.rankings[pIdx];
      const topOpt = phase.options.find(o => o.id === orderIds[0]);
      const isStrongTop = topOpt.idealRank === 1;
      if (isStrongTop) strongTopCount++;

      const recommended = [...phase.options].sort((a, b) => a.idealRank - b.idealRank);

      return `
        <div class="eval-card">
          <div class="eval-card-head">
            <h4>${phase.title}</h4>
            <span class="eval-badge ${isStrongTop ? "good" : "trap"}">
              ${isStrongTop ? "Strong #1 Priority" : "Subtle Trap at #1"}
            </span>
          </div>

          <div class="eval-rank-list">
            ${recommended.map(opt => {
              const userPos = orderIds.indexOf(opt.id) + 1;
              const isExactMatch = userPos === opt.idealRank;
              const idealLabels = ["", "Recommended #1 (Best)", "Recommended #2", "Recommended #3", "Recommended #4 (Riskiest)"];
              return `
                <div class="eval-rank-row">
                  <div class="eval-rank-meta">
                    <span class="ideal-tag">${idealLabels[opt.idealRank]}</span>
                    <span class="your-tag ${isExactMatch ? "match" : ""}">You ranked this #${userPos}${isExactMatch ? " ✓" : ""}</span>
                  </div>
                  <div>${opt.text}</div>
                  <div class="eval-why"><strong>Why:</strong> ${opt.feedback}</div>
                </div>
              `;
            }).join("")}
          </div>
        </div>
      `;
    }).join("");

    mainStage.innerHTML = `
      <span class="pane-tag">${ctx.contextName.toUpperCase()} PLAN EVALUATION • ${strongTopCount} OF 4 TOP PRIORITIES ALIGNED</span>
      <h2 class="pane-title">Your Full 4-Position Action Plan Debrief</h2>
      <p class="pane-lead">
        Below is the recommended priority order for every phase, showing exactly where you placed each option and why each move helps or creates a barrier.
      </p>

      <div>${cardsHtml}</div>

      <div class="phase-actions">
        <button type="button" class="nav-btn secondary" id="editPlanBtn">← Adjust My Rankings</button>
        <button type="button" class="nav-btn primary" id="goChecklistBtn">Continue to Quick-Check →</button>
      </div>
    `;

    document.getElementById("editPlanBtn").addEventListener("click", () => {
      state.evaluated = false;
      state.currentPhaseIdx = 0;
      renderPane7(ctx);
    });

    document.getElementById("goChecklistBtn").addEventListener("click", () => goToPane(7));
  }

  function renderPane8(ctx) {
    mainStage.innerHTML = `
      <span class="pane-tag">WRAP-UP • READY TO USE</span>
      <h2 class="pane-title">Remote Accessibility Quick-Check (${ctx.contextName})</h2>
      <p class="pane-lead">
        Keep this 6-point checklist handy before sharing a document or hosting a live virtual session.
      </p>

      <div class="checklist-box">
        <strong>Your ${ctx.contextName} Checklist</strong>
        <ul class="checklist-ul">
          ${ctx.checklist.map(item => `<li><span aria-hidden="true">☑</span><span>${item}</span></li>`).join("")}
        </ul>
        <div class="checklist-actions">
          <button type="button" class="nav-btn primary" id="copyChecklistBtn">Copy Checklist</button>
          <button type="button" class="nav-btn secondary" id="printChecklistBtn">Print / Save PDF</button>
          <button type="button" class="nav-btn secondary" id="startOverBtn">↺ Start Over</button>
        </div>
      </div>

      <div>
        <h3 style="font-family:var(--font-display); font-size:1rem; margin-bottom:8px;">Official Guidelines & Further Reading</h3>
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
    document.getElementById("startOverBtn").addEventListener("click", resetAllProgress);
  }

  init();
})();
// END OF FILE