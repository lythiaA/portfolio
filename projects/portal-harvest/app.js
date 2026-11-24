// projects/portal-harvest/app.js
(function () {
  const LEVELS = window.PORTAL_LEVELS || [];
  const PORTAL_NAMES = ["PORTAL ALPHA", "PORTAL BETA", "PORTAL GAMMA"];

  const portalArena = document.getElementById("portalArena");
  const resetBtn = document.getElementById("resetBtn");
  const drawerToggleBtn = document.getElementById("drawerToggleBtn");
  const sideDrawer = document.getElementById("sideDrawer");
  const drawerCloseBtn = document.getElementById("drawerCloseBtn");
  const tabBriefBtn = document.getElementById("tabBriefBtn");
  const tabLogBtn = document.getElementById("tabLogBtn");
  const drawerBriefView = document.getElementById("drawerBriefView");
  const drawerLogView = document.getElementById("drawerLogView");

  let currentLevel = 0;
  let portals = [];
  let turnsUsed = 0;
  let totalEnergy = 0;
  let isCommitting = false;
  let gameOver = false;
  let committedEarlyInM3 = false;
  let shiftAnnounced = false;
  let commitTimer = null;

  const missionHistory = LEVELS.map(l => ({
    id: l.id,
    shortName: l.shortName,
    status: "Not Started",
    bestEnergy: null,
    notes: []
  }));

  function shuffle(arr) {
    const copy = arr.map(item => ({ ...item }));
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function init() {
    resetBtn.addEventListener("click", () => loadLevel(currentLevel, false));

    drawerToggleBtn.addEventListener("click", () => {
      sideDrawer.classList.toggle("open");
      if (sideDrawer.classList.contains("open")) renderMissionLog();
    });

    drawerCloseBtn.addEventListener("click", () => sideDrawer.classList.remove("open"));
    tabBriefBtn.addEventListener("click", () => switchDrawerTab("brief"));
    tabLogBtn.addEventListener("click", () => switchDrawerTab("log"));

    document.querySelectorAll(".lvl-pill").forEach(btn => {
      btn.addEventListener("click", () => loadLevel(Number(btn.dataset.lvl), false));
    });

    loadLevel(0, true);
  }

  function switchDrawerTab(tab) {
    const isBrief = tab === "brief";
    tabBriefBtn.classList.toggle("active", isBrief);
    tabLogBtn.classList.toggle("active", !isBrief);
    drawerBriefView.classList.toggle("hidden", !isBrief);
    drawerLogView.classList.toggle("hidden", isBrief);
    if (!isBrief) renderMissionLog();
  }

  function openDrawer({ tone = "", tag, title, htmlBlocks, mathText = "", buttons = [] }) {
    sideDrawer.className = "side-drawer open" + (tone ? " tone-" + tone : "");
    switchDrawerTab("brief");

    document.getElementById("drawerTag").textContent = tag;
    document.getElementById("drawerTitle").textContent = title;
    document.getElementById("drawerText").innerHTML = htmlBlocks.join("");

    const mathBox = document.getElementById("drawerMathBox");
    if (mathText) {
      mathBox.classList.remove("hidden");
      document.getElementById("drawerMathText").textContent = mathText;
    } else {
      mathBox.classList.add("hidden");
    }

    const actionsEl = document.getElementById("drawerActions");
    actionsEl.innerHTML = "";
    buttons.forEach(btnCfg => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = btnCfg.primary ? "btn-drawer-primary" : "btn-drawer-outline";
      btn.textContent = btnCfg.label;
      btn.addEventListener("click", btnCfg.onClick);
      actionsEl.appendChild(btn);
    });
  }

  function showIntroDrawer() {
    openDrawer({
      tag: "INTERACTIVE MISSION",
      title: "Welcome to Portal Harvest",
      htmlBlocks: [
        "<p>Three mystery energy portals sit in front of you, each with a different hidden chance of paying out energy. You have <strong>15 turns</strong> to reach the target energy score.</p>",
        "<p>Click <strong>Test (1 Turn)</strong> to probe a portal and gather clues. Once you are confident you found the best portal, click <strong>Commit All</strong> to cash in all your remaining turns at once.</p>"
      ],
      buttons: [
        {
          label: "Start Mission 01 →",
          primary: true,
          onClick: () => sideDrawer.classList.remove("open")
        }
      ]
    });
  }

  function loadLevel(idx, showIntro) {
    if (commitTimer) {
      clearInterval(commitTimer);
      commitTimer = null;
    }

    currentLevel = idx;
    const lvl = LEVELS[idx];
    turnsUsed = 0;
    totalEnergy = 0;
    isCommitting = false;
    gameOver = false;
    committedEarlyInM3 = false;
    shiftAnnounced = false;

    const shuffled = shuffle(lvl.portalConfigs);
    portals = shuffled.map((cfg, i) => ({
      idx: i,
      name: PORTAL_NAMES[i],
      prob: cfg.prob,
      shiftedProb: cfg.shiftedProb !== undefined ? cfg.shiftedProb : cfg.prob,
      payout: cfg.payout,
      pulls: 0,
      hits: 0,
      earned: 0,
      history: []
    }));

    document.getElementById("brandPill").textContent = lvl.aiMode ? "MATH OF AI • MISSION LAB" : "INTERACTIVE MISSION";
    document.getElementById("levelTitle").textContent = lvl.title;
    document.getElementById("levelDesc").textContent = lvl.desc;

    updateVocabulary(lvl.aiMode);
    renderPortals();
    updateTelemetry();
    updateTabs();

    setLog("Click Test (1 Turn) to probe a portal, or Commit All once you are ready to lock in your choice.", "");

    if (showIntro) {
      showIntroDrawer();
    } else {
      sideDrawer.classList.remove("open");
    }
  }

  function updateVocabulary(aiMode) {
    const rateLabel = document.getElementById("rateLabel");
    if (aiMode) {
      rateLabel.innerHTML = `EXP. RETURN <span class="help-tip" data-tip="Your average energy earned per turn so far. In probability, comparing Expected Value (Probability x Payout) reveals the strongest long-run choice.">?</span>`;
    } else {
      rateLabel.textContent = "AVG / TURN";
    }
  }

  function renderPortals() {
    const lvl = LEVELS[currentLevel];
    const hitRateLabel = lvl.aiMode
      ? `EMP. PROB <span class="help-tip" data-tip="In Mission 01, we called this Hit Rate. Empirical Probability is your estimated chance of success based on observed trials.">?</span>`
      : "HIT RATE";
    const evLabel = lvl.aiMode
      ? `EST. EV <span class="help-tip" data-tip="Estimated Expected Value (average energy per turn from this portal so far).">?</span>`
      : "AVG / TURN";

    portalArena.innerHTML = portals.map(p => `
      <div class="portal-card" data-idx="${p.idx}" id="portalCard-${p.idx}">
        <div class="portal-top">
          <span class="portal-name">${p.name}</span>
          <span class="payout-badge">+${p.payout} ON HIT</span>
        </div>

        <div class="portal-visual">
          <div class="portal-ring"></div>
          <div class="portal-core" id="portalCore-${p.idx}">IDLE</div>
        </div>

        <div class="portal-stats">
          <div class="stat-row">
            <span class="stat-k">TRIALS</span>
            <span class="stat-v" id="pulls-${p.idx}">0</span>
          </div>
          <div class="stat-row">
            <span class="stat-k">${hitRateLabel}</span>
            <span class="stat-v" id="rate-${p.idx}">--</span>
          </div>
          <div class="stat-row">
            <span class="stat-k">${evLabel}</span>
            <span class="stat-v" id="ev-${p.idx}">--</span>
          </div>
          <div class="history-dots" id="dots-${p.idx}"></div>
        </div>

        <div class="true-odds-reveal hidden" id="reveal-${p.idx}"></div>

        <div class="portal-btns">
          <button class="btn-test" data-action="test" data-idx="${p.idx}" type="button">TEST (1 TURN)</button>
          <button class="btn-commit" data-action="commit" data-idx="${p.idx}" type="button">COMMIT ALL REMAINING</button>
        </div>
      </div>
    `).join("");

    portalArena.querySelectorAll("button").forEach(btn => {
      btn.addEventListener("click", () => {
        const idx = Number(btn.dataset.idx);
        if (btn.dataset.action === "test") {
          executeSingleTurn(idx);
        } else {
          startCommitBurst(idx);
        }
      });
    });
  }

  function getActiveProb(portal) {
    const lvl = LEVELS[currentLevel];
    if (lvl.shiftAfterTurn && turnsUsed >= lvl.shiftAfterTurn) {
      return portal.shiftedProb;
    }
    return portal.prob;
  }

  function executeSingleTurn(idx) {
    const lvl = LEVELS[currentLevel];
    if (gameOver || turnsUsed >= lvl.turns) return;

    const p = portals[idx];
    const activeProb = getActiveProb(p);
    const isHit = Math.random() < activeProb;
    const gain = isHit ? p.payout : 0;

    turnsUsed++;
    p.pulls++;
    if (isHit) p.hits++;
    p.earned += gain;
    p.history.push(isHit);
    totalEnergy += gain;

    // Flash portal feedback
    const card = document.getElementById(`portalCard-${idx}`);
    const core = document.getElementById(`portalCore-${idx}`);
    card.classList.remove("flash-hit", "flash-miss");
    void card.offsetWidth;
    card.classList.add(isHit ? "flash-hit" : "flash-miss");

    core.textContent = isHit ? `+${gain}` : "FIZZLE";
    core.className = "portal-core " + (isHit ? "hit-text" : "miss-text");

    updatePortalCard(p);
    updateTelemetry();

    // Mission 03 subtle warning right when shift begins
    if (lvl.shiftAfterTurn && turnsUsed === lvl.shiftAfterTurn && !shiftAnnounced) {
      shiftAnnounced = true;
      setLog("Sensor flicker detected! Portal outputs may be shifting. Keep an eye on recent dots.", "warn");
    } else if (!isCommitting) {
      setLog(
        isHit
          ? `${p.name} HIT for +${gain} Energy! (${lvl.turns - turnsUsed} turns remaining)`
          : `${p.name} FIZZLED (+0 Energy). (${lvl.turns - turnsUsed} turns remaining)`,
        isHit ? "success" : ""
      );
    }

    if (turnsUsed >= lvl.turns) {
      finishMission();
    }
  }

  function startCommitBurst(idx) {
    const lvl = LEVELS[currentLevel];
    if (gameOver || isCommitting || turnsUsed >= lvl.turns) return;

    if (lvl.shiftAfterTurn && turnsUsed < lvl.shiftAfterTurn) {
      committedEarlyInM3 = true;
    }

    isCommitting = true;
    setButtonsDisabled(true);
    setLog(`Committed all remaining turns to ${portals[idx].name}! Firing rapid harvest burst...`, "warn");

    commitTimer = setInterval(() => {
      if (gameOver || turnsUsed >= lvl.turns) {
        clearInterval(commitTimer);
        commitTimer = null;
        isCommitting = false;
        return;
      }
      executeSingleTurn(idx);
    }, 115);
  }

  function setButtonsDisabled(disabled) {
    portalArena.querySelectorAll("button").forEach(b => {
      b.disabled = disabled;
    });
  }

  function updatePortalCard(p) {
    document.getElementById(`pulls-${p.idx}`).textContent = p.pulls;
    const ratePct = p.pulls > 0 ? `${Math.round((p.hits / p.pulls) * 100)}%` : "--";
    const avgEv = p.pulls > 0 ? (p.earned / p.pulls).toFixed(1) : "--";

    document.getElementById(`rate-${p.idx}`).textContent = ratePct;
    document.getElementById(`ev-${p.idx}`).textContent = avgEv;

    const dotsEl = document.getElementById(`dots-${p.idx}`);
    dotsEl.innerHTML = p.history.map(h => `<span class="h-dot ${h ? "hit" : "miss"}"></span>`).join("");
  }

  function updateTelemetry() {
    const lvl = LEVELS[currentLevel];
    const left = lvl.turns - turnsUsed;
    const avg = turnsUsed > 0 ? (totalEnergy / turnsUsed).toFixed(1) : "0.0";
    const pct = Math.min(100, Math.round((totalEnergy / lvl.targetEnergy) * 100));

    const turnsEl = document.getElementById("turnsDisplay");
    turnsEl.textContent = left;
    turnsEl.className = "tele-value " + (left <= 4 && left > 0 ? "low-turns" : "");

    const energyEl = document.getElementById("energyDisplay");
    energyEl.textContent = `${totalEnergy} / ${lvl.targetEnergy}`;
    energyEl.className = "tele-value " + (totalEnergy >= lvl.targetEnergy ? "goal-hit" : "");

    document.getElementById("avgDisplay").textContent = avg;
    document.getElementById("meterFill").style.width = `${pct}%`;
    document.getElementById("meterPct").textContent = `${pct}% of Target (${totalEnergy} / ${lvl.targetEnergy})`;
  }

  function revealTrueOdds() {
    const lvl = LEVELS[currentLevel];
    portals.forEach(p => {
      const el = document.getElementById(`reveal-${p.idx}`);
      el.classList.remove("hidden");
      if (lvl.shiftAfterTurn) {
        el.textContent = `TRUE ODDS: ${Math.round(p.prob * 100)}% → ${Math.round(p.shiftedProb * 100)}%`;
      } else {
        const trueEv = (p.prob * p.payout).toFixed(1);
        el.textContent = `TRUE ODDS: ${Math.round(p.prob * 100)}% • EV: ${trueEv}/turn`;
      }
    });
  }

  function finishMission() {
    gameOver = true;
    isCommitting = false;
    if (commitTimer) {
      clearInterval(commitTimer);
      commitTimer = null;
    }
    setButtonsDisabled(true);
    revealTrueOdds();

    const lvl = LEVELS[currentLevel];
    const won = totalEnergy >= lvl.targetEnergy;

    if (won) {
      addMissionNote(currentLevel, lvl.winNoteLabel, lvl.winNoteBody);
      markCompleted(currentLevel, totalEnergy);
      updateTabs();
      setLog(`HARVEST COMPLETE: Collected ${totalEnergy} Energy (Target: ${lvl.targetEnergy})! True odds revealed above.`, "success");

      const htmlBlocks = [];
      if (currentLevel === 0) {
        htmlBlocks.push(
          `<p>You harvested <strong>${totalEnergy} Energy</strong> (target: ${lvl.targetEnergy})! Check the green banners on each portal to see their true hidden odds.</p>`,
          `<p><strong>HUD Upgrade for Mission 02:</strong> Now that you have practiced balancing testing against cashing in, we are switching your dashboard to the real Probability and AI terms:</p>`,
          `<ul class="vocab-list">
            <li><strong>Hit Rate → Empirical Probability:</strong> Estimating an unknown chance of success by counting real outcomes from your trials.</li>
            <li><strong>Test vs. Commit → Exploration vs. Exploitation:</strong> The classic AI trade-off between gathering new information and cashing in on your current best option.</li>
            <li><strong>Avg / Turn → Expected Value (E[X]):</strong> The long-run average reward per turn, calculated as Probability multiplied by Payout.</li>
          </ul>`
        );
      } else if (currentLevel === 1) {
        htmlBlocks.push(
          `<p>You beat the Jackpot Trap with <strong>${totalEnergy} Energy</strong>! Look at the revealed Expected Values on each portal card: the +20 portal quietly beat both the +5 safe option and the +60 jackpot.</p>`
        );
      } else {
        htmlBlocks.push(
          `<p>You navigated the mid-mission shift and harvested <strong>${totalEnergy} Energy</strong>! Look at the revealed odds on each portal to see which one faded and which one surged after Turn 7.</p>`
        );
      }

      const nextIdx = (currentLevel + 1) % LEVELS.length;
      openDrawer({
        tone: "win",
        tag: currentLevel === LEVELS.length - 1 ? "ALL MISSIONS COMPLETE" : `MISSION 0${currentLevel + 1} COMPLETE`,
        title: lvl.winTitle,
        htmlBlocks: htmlBlocks,
        mathText: lvl.winMath,
        buttons: [
          { label: "View All Notes", primary: false, onClick: () => switchDrawerTab("log") },
          {
            label: currentLevel < LEVELS.length - 1 ? `Continue to Mission 0${currentLevel + 2} →` : "Replay Mission 01 ↺",
            primary: true,
            onClick: () => loadLevel(nextIdx, false)
          }
        ]
      });
    } else {
      addMissionNote(currentLevel, lvl.failNoteLabel, lvl.failMath);
      markAttemptStatus(currentLevel, "In Progress");
      setLog(`OUT OF TURNS: Collected ${totalEnergy} / ${lvl.targetEnergy} Energy. Check the true odds revealed above.`, "danger");

      const extraNote = committedEarlyInM3
        ? "<p><strong>What caught you:</strong> You clicked Commit All before Turn 7, locking yourself onto a portal right before it overheated and dropped to 15%!</p>"
        : "";

      openDrawer({
        tone: "fail",
        tag: `SHORT OF TARGET (${totalEnergy} / ${lvl.targetEnergy})`,
        title: lvl.failTitle,
        htmlBlocks: [
          `<p>You finished 15 turns with <strong>${totalEnergy} Energy</strong> (needed ${lvl.targetEnergy}). Check the green banners on each portal to see their true hidden odds.</p>`,
          extraNote
        ],
        mathText: lvl.failMath,
        buttons: [
          { label: "View All Notes", primary: false, onClick: () => switchDrawerTab("log") },
          { label: "Try Again", primary: true, onClick: () => loadLevel(currentLevel, false) }
        ]
      });
    }
  }

  function updateTabs() {
    document.querySelectorAll(".lvl-pill").forEach((btn, i) => {
      btn.classList.toggle("active", i === currentLevel);
      btn.classList.toggle("solved", missionHistory[i].status === "Completed");
    });
  }

  function setLog(msg, tone) {
    const log = document.getElementById("feedbackLog");
    log.className = "live-log" + (tone ? " " + tone : "");
    document.getElementById("feedbackText").textContent = msg;
  }

  function addMissionNote(lvlIdx, label, body) {
    const rec = missionHistory[lvlIdx];
    if (!rec.notes.some(n => n.label === label)) {
      rec.notes.push({ label, body });
    }
    renderMissionLog();
  }

  function markAttemptStatus(lvlIdx, status) {
    const rec = missionHistory[lvlIdx];
    if (rec.status !== "Completed") rec.status = status;
    renderMissionLog();
  }

  function markCompleted(lvlIdx, energy) {
    const rec = missionHistory[lvlIdx];
    rec.status = "Completed";
    if (rec.bestEnergy === null || energy > rec.bestEnergy) rec.bestEnergy = energy;
    renderMissionLog();
  }

  function renderMissionLog() {
    const list = document.getElementById("missionLogList");
    list.innerHTML = missionHistory.map(item => {
      const isDone = item.status === "Completed";
      const isProg = item.status === "In Progress";
      const badgeClass = isDone ? "done" : (isProg ? "in-progress" : "");
      const metaLine = item.bestEnergy !== null
        ? `Best Harvest: ${item.bestEnergy} Energy`
        : (item.notes.length > 0 ? "Attempted • Takeaways unlocked below" : "Not attempted yet");

      const notesHtml = item.notes.length > 0
        ? `<ul class="log-notes-ul">${item.notes.map(n => `<li><strong>${n.label}:</strong> ${n.body}</li>`).join("")}</ul>`
        : `<p class="log-intro">Play this mission to unlock its Probability and AI takeaways.</p>`;

      return `
        <div class="log-card ${isDone ? "solved" : ""}">
          <div class="log-card-head">
            <span class="log-card-title">${item.shortName}</span>
            <span class="log-status ${badgeClass}">${item.status}</span>
          </div>
          <div class="log-card-meta">${metaLine}</div>
          ${notesHtml}
        </div>
      `;
    }).join("");
  }

  init();
})();
// END OF FILE