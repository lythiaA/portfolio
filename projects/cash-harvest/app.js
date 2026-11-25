// projects/cash-harvest/app.js
(function () {
  const LEVELS = window.VAULT_LEVELS || [];
  const VAULT_NAMES = ["VAULT ALPHA", "VAULT BETA", "VAULT GAMMA"];
  const VAULT_COLORS = ["#38BDF8", "#C084FC", "#FBBF24"];

  const vaultArena = document.getElementById("vaultArena");
  const soundToggleBtn = document.getElementById("soundToggleBtn");
  const resetBtn = document.getElementById("resetBtn");
  const drawerToggleBtn = document.getElementById("drawerToggleBtn");
  const sideDrawer = document.getElementById("sideDrawer");
  const drawerCloseBtn = document.getElementById("drawerCloseBtn");
  const tabBriefBtn = document.getElementById("tabBriefBtn");
  const tabLogBtn = document.getElementById("tabLogBtn");
  const drawerBriefView = document.getElementById("drawerBriefView");
  const drawerLogView = document.getElementById("drawerLogView");
  const replayChartBox = document.getElementById("replayChartBox");
  const replayCanvas = document.getElementById("replayCanvas");

  let currentLevel = 0;
  let vaults = [];
  let turnsUsed = 0;
  let totalCash = 0;
  let turnLog = []; // Tracks every click: { turn, vaultIdx, hit, gain, cumCash }
  let isCommitting = false;
  let gameOver = false;
  let committedAtTurn = null;
  let committedVaultIdx = null;
  let shiftAnnounced = false;
  let commitTimer = null;
  let soundEnabled = true;

  const missionHistory = LEVELS.map(l => ({
    id: l.id,
    shortName: l.shortName,
    status: "Not Started",
    bestCash: null,
    notes: []
  }));

  // Catchy synthesized cash-win jingle using Web Audio API (no external MP3 needed)
  function playWinJingle() {
    if (!soundEnabled) return;
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    try {
      const ctx = new AudioCtx();
      const notes = [523.25, 659.25, 783.99, 1046.50, 783.99, 1046.50]; // C5 E5 G5 C6 G5 C6
      const times = [0, 0.11, 0.22, 0.34, 0.50, 0.62];
      const durs = [0.10, 0.10, 0.10, 0.14, 0.10, 0.30];

      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, ctx.currentTime + times[i]);

        gain.gain.setValueAtTime(0.001, ctx.currentTime + times[i]);
        gain.gain.exponentialRampToValueAtTime(0.18, ctx.currentTime + times[i] + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + times[i] + durs[i]);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + times[i]);
        osc.stop(ctx.currentTime + times[i] + durs[i] + 0.02);
      });
    } catch (e) {
      // Ignore audio block if browser restricts autoplay
    }
  }

  function shuffle(arr) {
    const copy = arr.map(item => ({ ...item }));
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function init() {
    soundToggleBtn.addEventListener("click", () => {
      soundEnabled = !soundEnabled;
      soundToggleBtn.textContent = soundEnabled ? "Sound: ON" : "Sound: OFF";
    });

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

  function openDrawer({ tone = "", tag, title, showChart = false, htmlBlocks, mathText = "", buttons = [] }) {
    sideDrawer.className = "side-drawer open" + (tone ? " tone-" + tone : "");
    switchDrawerTab("brief");

    document.getElementById("drawerTag").textContent = tag;
    document.getElementById("drawerTitle").textContent = title;
    document.getElementById("drawerText").innerHTML = htmlBlocks.join("");

    if (showChart && turnLog.length > 0) {
      replayChartBox.classList.remove("hidden");
      drawReplayChart();
    } else {
      replayChartBox.classList.add("hidden");
    }

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
      title: "Welcome to Cash Harvest",
      showChart: false,
      htmlBlocks: [
        "<p>Three mystery <strong>Cash Vaults</strong> sit in front of you. When you tap a vault, you <strong>may or may not</strong> win cash: each vault has a hidden chance of paying out or coming up empty ($0).</p>",
        "<p>You have <strong>15 turns</strong> to hit the cash target. Click <strong>Test (1 Turn)</strong> to gather clues about which vault pays out most often, then click <strong>Commit All</strong> once you are confident to cash in your remaining turns fast.</p>"
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
    totalCash = 0;
    turnLog = [];
    isCommitting = false;
    gameOver = false;
    committedAtTurn = null;
    committedVaultIdx = null;
    shiftAnnounced = false;

    const shuffled = shuffle(lvl.vaultConfigs);
    vaults = shuffled.map((cfg, i) => ({
      idx: i,
      name: VAULT_NAMES[i],
      role: cfg.role,
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
    renderVaults();
    updateTelemetry();
    updateTabs();

    setLog("Click Test (1 Turn) on a Cash Vault to see if it pays out, or Commit All once you spot the winner.", "");

    if (showIntro) {
      showIntroDrawer();
    } else {
      sideDrawer.classList.remove("open");
    }
  }

  function updateVocabulary(aiMode) {
    const rateLabel = document.getElementById("rateLabel");
    if (aiMode) {
      rateLabel.innerHTML = `EXP. RETURN <span class="help-tip" data-tip="Your average dollars earned per turn so far. Comparing Expected Value (Probability x Payout) reveals the strongest long-run vault.">?</span>`;
    } else {
      rateLabel.textContent = "AVG / TURN";
    }
  }

  function renderVaults() {
    const lvl = LEVELS[currentLevel];
    const hitRateLabel = lvl.aiMode
      ? `EMP. PROB <span class="help-tip" data-tip="In Mission 01, we called this Hit Rate. Empirical Probability is your estimated chance of winning based on observed trials.">?</span>`
      : "HIT RATE";
    const evLabel = lvl.aiMode
      ? `EST. EV <span class="help-tip" data-tip="Estimated Expected Value (average dollars earned per turn from this vault so far).">?</span>`
      : "AVG / TURN";

    vaultArena.innerHTML = vaults.map(v => `
      <div class="vault-card" data-idx="${v.idx}" id="vaultCard-${v.idx}">
        <div class="vault-top">
          <span class="vault-name">${v.name}</span>
          <span class="payout-badge">+$${v.payout} ON HIT</span>
        </div>

        <div class="vault-visual">
          <div class="vault-ring"></div>
          <div class="vault-core" id="vaultCore-${v.idx}">READY</div>
        </div>

        <div class="vault-stats">
          <div class="stat-row">
            <span class="stat-k">TRIALS</span>
            <span class="stat-v" id="pulls-${v.idx}">0</span>
          </div>
          <div class="stat-row">
            <span class="stat-k">${hitRateLabel}</span>
            <span class="stat-v" id="rate-${v.idx}">--</span>
          </div>
          <div class="stat-row">
            <span class="stat-k">${evLabel}</span>
            <span class="stat-v" id="ev-${v.idx}">--</span>
          </div>
          <div class="history-dots" id="dots-${v.idx}"></div>
        </div>

        <div class="true-odds-reveal hidden" id="reveal-${v.idx}"></div>

        <div class="vault-btns">
          <button class="btn-test" data-action="test" data-idx="${v.idx}" type="button">TEST (1 TURN)</button>
          <button class="btn-commit" data-action="commit" data-idx="${v.idx}" type="button">COMMIT ALL REMAINING</button>
        </div>
      </div>
    `).join("");

    vaultArena.querySelectorAll("button").forEach(btn => {
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

  function getActiveProb(vault) {
    const lvl = LEVELS[currentLevel];
    if (lvl.shiftAfterTurn && turnsUsed >= lvl.shiftAfterTurn) {
      return vault.shiftedProb;
    }
    return vault.prob;
  }

  function executeSingleTurn(idx) {
    const lvl = LEVELS[currentLevel];
    if (gameOver || turnsUsed >= lvl.turns) return;

    const v = vaults[idx];
    const activeProb = getActiveProb(v);
    const isHit = Math.random() < activeProb;
    const gain = isHit ? v.payout : 0;

    turnsUsed++;
    v.pulls++;
    if (isHit) v.hits++;
    v.earned += gain;
    v.history.push(isHit);
    totalCash += gain;

    turnLog.push({
      turn: turnsUsed,
      vaultIdx: idx,
      hit: isHit,
      gain: gain,
      cumCash: totalCash
    });

    const card = document.getElementById(`vaultCard-${idx}`);
    const core = document.getElementById(`vaultCore-${idx}`);
    card.classList.remove("flash-hit", "flash-miss");
    void card.offsetWidth;
    card.classList.add(isHit ? "flash-hit" : "flash-miss");

    core.textContent = isHit ? `+$${gain}` : "$0";
    core.className = "vault-core " + (isHit ? "hit-text" : "miss-text");

    updateVaultCard(v);
    updateTelemetry();

    if (lvl.shiftAfterTurn && turnsUsed === lvl.shiftAfterTurn && !shiftAnnounced) {
      shiftAnnounced = true;
      setLog("Sensor flicker detected! Vault odds may be shifting. Watch your recent dots closely.", "warn");
    } else if (!isCommitting) {
      setLog(
        isHit
          ? `${v.name} paid +$${gain}! (${lvl.turns - turnsUsed} turns left)`
          : `${v.name} came up empty ($0). (${lvl.turns - turnsUsed} turns left)`,
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

    committedAtTurn = turnsUsed;
    committedVaultIdx = idx;
    isCommitting = true;
    setButtonsDisabled(true);
    setLog(`Committed all remaining turns to ${vaults[idx].name}! Cashing in...`, "warn");

    commitTimer = setInterval(() => {
      if (gameOver || turnsUsed >= lvl.turns) {
        clearInterval(commitTimer);
        commitTimer = null;
        isCommitting = false;
        return;
      }
      executeSingleTurn(idx);
    }, 110);
  }

  function setButtonsDisabled(disabled) {
    vaultArena.querySelectorAll("button").forEach(b => {
      b.disabled = disabled;
    });
  }

  function updateVaultCard(v) {
    document.getElementById(`pulls-${v.idx}`).textContent = v.pulls;
    const ratePct = v.pulls > 0 ? `${Math.round((v.hits / v.pulls) * 100)}%` : "--";
    const avgEv = v.pulls > 0 ? `$${(v.earned / v.pulls).toFixed(2)}` : "--";

    document.getElementById(`rate-${v.idx}`).textContent = ratePct;
    document.getElementById(`ev-${v.idx}`).textContent = avgEv;

    const dotsEl = document.getElementById(`dots-${v.idx}`);
    dotsEl.innerHTML = v.history.map(h => `<span class="h-dot ${h ? "hit" : "miss"}"></span>`).join("");
  }

  function updateTelemetry() {
    const lvl = LEVELS[currentLevel];
    const left = lvl.turns - turnsUsed;
    const avg = turnsUsed > 0 ? (totalCash / turnsUsed).toFixed(2) : "0.00";
    const pct = Math.min(100, Math.round((totalCash / lvl.targetCash) * 100));

    const turnsEl = document.getElementById("turnsDisplay");
    turnsEl.textContent = left;
    turnsEl.className = "tele-value " + (left <= 4 && left > 0 ? "low-turns" : "");

    const cashEl = document.getElementById("cashDisplay");
    cashEl.textContent = `$${totalCash} / $${lvl.targetCash}`;
    cashEl.className = "tele-value " + (totalCash >= lvl.targetCash ? "goal-hit" : "");

    document.getElementById("avgDisplay").textContent = `$${avg}`;
    document.getElementById("meterFill").style.width = `${pct}%`;
    document.getElementById("meterPct").textContent = `${pct}% of Target ($${totalCash} / $${lvl.targetCash})`;
  }

  function revealTrueOdds() {
    const lvl = LEVELS[currentLevel];
    vaults.forEach(v => {
      const el = document.getElementById(`reveal-${v.idx}`);
      el.classList.remove("hidden");
      if (lvl.shiftAfterTurn) {
        el.textContent = `TRUE ODDS: ${Math.round(v.prob * 100)}% → ${Math.round(v.shiftedProb * 100)}%`;
      } else {
        const trueEv = (v.prob * v.payout).toFixed(2);
        el.textContent = `TRUE ODDS: ${Math.round(v.prob * 100)}% • EV: $${trueEv}/turn`;
      }
    });
  }

  // Draws the student's actual turn-by-turn cash curve inside the debrief drawer
  function drawReplayChart() {
    const lvl = LEVELS[currentLevel];
    const ctx = replayCanvas.getContext("2d");
    const W = replayCanvas.width;
    const H = replayCanvas.height;
    ctx.clearRect(0, 0, W, H);

    const padL = 34;
    const padR = 12;
    const padT = 14;
    const padB = 20;
    const maxY = Math.max(lvl.targetCash * 1.15, totalCash * 1.1, 100);

    const mapX = t => padL + (t / lvl.turns) * (W - padL - padR);
    const mapY = val => H - padB - (val / maxY) * (H - padT - padB);

    // Axes
    ctx.strokeStyle = "rgba(148, 163, 184, 0.25)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padL, padT);
    ctx.lineTo(padL, H - padB);
    ctx.lineTo(W - padR, H - padB);
    ctx.stroke();

    // Dashed Target Line
    const ty = mapY(lvl.targetCash);
    ctx.save();
    ctx.strokeStyle = "rgba(52, 211, 153, 0.7)";
    ctx.setLineDash([4, 3]);
    ctx.beginPath();
    ctx.moveTo(padL, ty);
    ctx.lineTo(W - padR, ty);
    ctx.stroke();
    ctx.restore();

    ctx.fillStyle = "#34D399";
    ctx.font = "700 9px 'JetBrains Mono', monospace";
    ctx.fillText(`$${lvl.targetCash}`, 2, ty + 3);

    // Mission 03 Shift Marker at Turn 7
    if (lvl.shiftAfterTurn) {
      const sx = mapX(lvl.shiftAfterTurn);
      ctx.save();
      ctx.strokeStyle = "rgba(251, 113, 133, 0.75)";
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(sx, padT);
      ctx.lineTo(sx, H - padB);
      ctx.stroke();
      ctx.restore();

      ctx.fillStyle = "#FB7185";
      ctx.fillText("SHIFT", sx - 14, padT + 8);
    }

    // Cumulative Cash Curve
    ctx.strokeStyle = "#F8FAFC";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(mapX(0), mapY(0));
    turnLog.forEach(entry => {
      ctx.lineTo(mapX(entry.turn), mapY(entry.cumCash));
    });
    ctx.stroke();

    // Color-coded Dots per Turn (Shows which Vault they clicked!)
    turnLog.forEach(entry => {
      const px = mapX(entry.turn);
      const py = mapY(entry.cumCash);
      ctx.beginPath();
      ctx.arc(px, py, entry.hit ? 3.5 : 2.3, 0, Math.PI * 2);
      ctx.fillStyle = VAULT_COLORS[entry.vaultIdx];
      ctx.fill();
    });

    // X-axis labels
    ctx.fillStyle = "#94A3B8";
    ctx.font = "600 9px 'JetBrains Mono', monospace";
    ctx.fillText("T1", mapX(1) - 4, H - 5);
    ctx.fillText("T7", mapX(7) - 4, H - 5);
    ctx.fillText("T15", mapX(15) - 10, H - 5);
  }

  // Builds tailored, data-driven diagnosis based on what the student actually clicked
  function diagnoseFailure() {
    const lvl = LEVELS[currentLevel];
    const bestVault = vaults.find(v => v.role === "best" || v.role === "surges");
    const nonBestPulls = vaults.filter(v => v !== bestVault).reduce((s, v) => s + v.pulls, 0);

    // Mission 03: Data Drift Diagnosis
    if (currentLevel === 2) {
      const fadedVault = vaults.find(v => v.role === "fades");
      if (committedAtTurn !== null && committedAtTurn < lvl.shiftAfterTurn) {
        return {
          title: "Locked In Before the Shift!",
          noteLabel: "Data Drift & Early Commitment",
          diagnosis: `Look at your curve above after the red SHIFT line at Turn 7. You clicked Commit All on Turn ${committedAtTurn}, locking yourself onto ${vaults[committedVaultIdx].name} right before the odds shifted.`,
          mathText: "In AI and statistics, when real-world odds change over time, it is called Data Drift. Committing 100% to an early winner leaves you blind when performance drops."
        };
      }
      return {
        title: "Stuck on an Outdated Winner",
        noteLabel: "Detecting Data Drift",
        diagnosis: `You spent ${fadedVault.pulls} turns on ${fadedVault.name}, which started strong (85%) but dropped to 15% after Turn 7, while ${bestVault.name} surged to 85%. Notice how your curve flattened out in the second half.`,
        mathText: "When a reliable option suddenly goes cold, a smart AI resumes exploring instead of hoping the old odds come back. That is why reinforcement learning models keep a small exploration budget."
      };
    }

    // Mission 02: High Stakes / Jackpot Trap Diagnosis
    if (currentLevel === 1) {
      const safeVault = vaults.find(v => v.role === "safe");
      const jackpotVault = vaults.find(v => v.role === "jackpot");
      if (jackpotVault.pulls >= safeVault.pulls && jackpotVault.pulls >= bestVault.pulls) {
        return {
          title: "Caught in the Jackpot Trap!",
          noteLabel: "The Jackpot Trap (Low Expected Value)",
          diagnosis: `You spent ${jackpotVault.pulls} of your 15 turns chasing ${jackpotVault.name} (+$65). Because it only hits 7% of the time, its true Expected Value is just $4.55 per turn, causing long flat stretches on your curve.`,
          mathText: "Expected Value = Probability x Payout. Flashy jackpots feel exciting, but ${bestVault.name} ($25 at 55%) averages $13.75 per turn, nearly triple the jackpot's long-run return."
        };
      }
      if (safeVault.pulls >= bestVault.pulls) {
        return {
          title: "Too Safe to Reach $140",
          noteLabel: "Safe Payout Trap (Expected Value)",
          diagnosis: `You spent ${safeVault.pulls} turns on ${safeVault.name} (+$5). Even though it hits 90% of the time, $5 x 0.90 is only $4.50 per turn, so your curve climbed steadily but far too slowly to hit $140.`,
          mathText: "High hit frequency does not mean high value. Expected Value multiplies hit chance by dollar payout. Always compare Avg / Turn rather than just how often a vault pays out."
        };
      }
      return {
        title: "Not Enough Turns on the Best Vault",
        noteLabel: "Expected Value & Sample Size",
        diagnosis: `You spent ${bestVault.pulls} turns on ${bestVault.name} (+$25, true EV $13.75/turn) and ${nonBestPulls} turns on the lower-value vaults. With a few more turns on ${bestVault.name}, your curve crosses $140.`,
        mathText: "Because you never know the true odds up front, you need just enough trials to compare each vault's Avg / Turn, then commit your remaining turns to the leader."
      };
    }

    // Mission 01: Hidden Odds Diagnosis
    if (committedAtTurn !== null && committedVaultIdx !== bestVault.idx) {
      return {
        title: "Committed Too Early on a Small Sample",
        noteLabel: "Small Sample Size Bias",
        diagnosis: `You locked onto ${vaults[committedVaultIdx].name} after only ${committedAtTurn} turns. With such a small sample, a couple of lucky hits can make a ${Math.round(vaults[committedVaultIdx].prob * 100)}% vault look better than ${bestVault.name} (85%).`,
        mathText: "In statistics, Small Sample Size Bias happens when you draw conclusions from too few trials. Testing each option 2 to 3 times before committing cuts down the chance of being fooled by luck."
      };
    }

    if (nonBestPulls >= 8) {
      return {
        title: "Spent Too Many Turns Testing",
        noteLabel: "Over-Exploration",
        diagnosis: `You spent ${nonBestPulls} of your 15 turns on weaker vaults and only ${bestVault.pulls} turns on ${bestVault.name} (85%). Look at how your curve jumps steepest whenever you hit ${bestVault.name}.`,
        mathText: "Testing too long is called Over-Exploration. Even if an AI eventually finds the best option, it loses money if it wastes too many turns gathering data instead of cashing in."
      };
    }

    return {
      title: "Close Run! Watch Your Sample Clues",
      noteLabel: "Balancing Exploration & Exploitation",
      diagnosis: `You found ${bestVault.name} (85%) for ${bestVault.pulls} turns and banked $${totalCash} (just $${lvl.targetCash - totalCash} short of $${lvl.targetCash}).`,
      mathText: "Randomness means even a strong strategy can miss by a hair on a cold streak. Probe each vault 2 to 3 times, then commit to the clear leader to give yourself the highest odds of winning."
    };
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
    const won = totalCash >= lvl.targetCash;

    if (won) {
      playWinJingle();
      addMissionNote(currentLevel, lvl.winNoteLabel, lvl.winNoteBody);
      markCompleted(currentLevel, totalCash);
      updateTabs();
      setLog(`TARGET HIT! You banked $${totalCash} (Target: $${lvl.targetCash}). True odds revealed above.`, "success");

      const bestVault = vaults.find(v => v.role === "best" || v.role === "surges");
      const htmlBlocks = [];

      if (currentLevel === 0) {
        htmlBlocks.push(
          `<p>You banked <strong>$${totalCash}</strong>! Look at your curve above: you spent <strong>${bestVault.pulls} turns</strong> on ${bestVault.name} (85% odds), which drove your cash past the green target line.</p>`,
          `<p><strong>HUD Upgrade for Mission 02:</strong> Now that you have practiced balancing testing against cashing in, we are switching your dashboard to the real Probability and AI terms:</p>`,
          `<ul class="vocab-list">
            <li><strong>Hit Rate → Empirical Probability:</strong> Estimating hidden odds by counting real outcomes from your trials.</li>
            <li><strong>Test vs. Commit → Exploration vs. Exploitation:</strong> The core AI trade-off between gathering new data and cashing in on your current leader.</li>
            <li><strong>Avg / Turn → Expected Value (E[X]):</strong> The long-run average dollars earned per turn (Probability multiplied by Payout).</li>
          </ul>`
        );
      } else if (currentLevel === 1) {
        htmlBlocks.push(
          `<p>You banked <strong>$${totalCash}</strong> and avoided the <strong>Jackpot Trap</strong>! You spent <strong>${bestVault.pulls} turns</strong> on ${bestVault.name} ($25 at 55% = $13.75/turn), beating both the $5 safe vault and the rare $65 jackpot.</p>`
        );
      } else {
        htmlBlocks.push(
          `<p>You banked <strong>$${totalCash}</strong> and survived the Turn 7 shift! Notice how your curve stayed climbing after the red SHIFT line because you adapted instead of staying stuck on the fading vault.</p>`
        );
      }

      const nextIdx = (currentLevel + 1) % LEVELS.length;
      openDrawer({
        tone: "win",
        tag: currentLevel === LEVELS.length - 1 ? "ALL MISSIONS COMPLETE" : `MISSION 0${currentLevel + 1} COMPLETE`,
        title: lvl.winTitle,
        showChart: true,
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
      const diag = diagnoseFailure();
      addMissionNote(currentLevel, diag.noteLabel, diag.mathText);
      markAttemptStatus(currentLevel, "In Progress");
      setLog(`OUT OF TURNS: Banked $${totalCash} / $${lvl.targetCash}. Check your run curve and diagnosis in Field Notes.`, "danger");

      openDrawer({
        tone: "fail",
        tag: `SHORT OF TARGET ($${totalCash} / $${lvl.targetCash})`,
        title: diag.title,
        showChart: true,
        htmlBlocks: [`<p>${diag.diagnosis}</p>`],
        mathText: diag.mathText,
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

  function markCompleted(lvlIdx, cash) {
    const rec = missionHistory[lvlIdx];
    rec.status = "Completed";
    if (rec.bestCash === null || cash > rec.bestCash) rec.bestCash = cash;
    renderMissionLog();
  }

  function renderMissionLog() {
    const list = document.getElementById("missionLogList");
    list.innerHTML = missionHistory.map(item => {
      const isDone = item.status === "Completed";
      const isProg = item.status === "In Progress";
      const badgeClass = isDone ? "done" : (isProg ? "in-progress" : "");
      const metaLine = item.bestCash !== null
        ? `Best Harvest: $${item.bestCash}`
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