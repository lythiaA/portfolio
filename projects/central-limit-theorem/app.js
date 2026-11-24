// projects/central-limit-theorem/app.js
(function () {
  const LEVELS = window.CLT_LEVELS || [];
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");

  const nSlider = document.getElementById("nSlider");
  const nValue = document.getElementById("nValue");
  const dropOneBtn = document.getElementById("dropOneBtn");
  const fireManyBtn = document.getElementById("fireManyBtn");
  const resetBtn = document.getElementById("resetBtn");
  const drawerToggleBtn = document.getElementById("drawerToggleBtn");
  const sideDrawer = document.getElementById("sideDrawer");
  const drawerCloseBtn = document.getElementById("drawerCloseBtn");
  const tabBriefBtn = document.getElementById("tabBriefBtn");
  const tabLogBtn = document.getElementById("tabLogBtn");
  const drawerBriefView = document.getElementById("drawerBriefView");
  const drawerLogView = document.getElementById("drawerLogView");

  const NUM_BINS = 16;
  const COLLECTOR_BINS = 32;

  let currentLevel = 0;
  let weights = [];
  let sampleN = 1;
  let sampleMeans = [];
  let collectorCounts = new Array(COLLECTOR_BINS).fill(0);
  let lastPickedBins = [];
  let lastMeanVal = null;
  let highlightAlpha = 0;
  let isDrawing = false;

  const missionHistory = LEVELS.map(l => ({
    id: l.id,
    shortName: l.shortName,
    status: "Not Started",
    bestInfo: null,
    notes: []
  }));

  function init() {
    nSlider.addEventListener("input", () => {
      sampleN = Number(nSlider.value);
      nValue.textContent = sampleN;
      clearCollector();
      setLog(
        LEVELS[currentLevel].aiMode
          ? `Sample Size (n) set to ${sampleN}. Collector cleared. Fire batches to see the new Sampling Distribution.`
          : `Batch Size set to ${sampleN}. Collector cleared. Fire batches to see how the shape changes.`,
        ""
      );
    });

    dropOneBtn.addEventListener("click", () => runBatches(1));
    fireManyBtn.addEventListener("click", () => runBatches(200));
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

    // Pointer events for sculpting the top distribution bars
    canvas.addEventListener("pointerdown", e => {
      if (!LEVELS[currentLevel].editable) return;
      isDrawing = true;
      canvas.setPointerCapture(e.pointerId);
      handleSculpt(e);
    });

    canvas.addEventListener("pointermove", e => {
      if (!isDrawing) return;
      handleSculpt(e);
    });

    canvas.addEventListener("pointerup", () => {
      isDrawing = false;
    });

    loadLevel(0, true);
    requestAnimationFrame(renderLoop);
  }

  function renderLoop() {
    if (highlightAlpha > 0) {
      highlightAlpha = Math.max(0, highlightAlpha - 0.025);
    }
    drawScene();
    requestAnimationFrame(renderLoop);
  }

  function handleSculpt(e) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const padX = 36;
    const topStart = 28;
    const topEnd = rect.height * 0.44;

    if (y < topStart - 10 || y > topEnd + 10) return;

    const usableW = rect.width - padX * 2;
    const relX = (x - padX) / usableW;
    const binIdx = Math.floor(relX * NUM_BINS);

    if (binIdx >= 0 && binIdx < NUM_BINS) {
      const pct = Math.max(0.02, Math.min(1, (topEnd - y) / (topEnd - topStart)));
      weights[binIdx] = Math.round(pct * 100);
      clearCollector();
      setLog("Custom shape sculpted! Now fire batches to test if you can break the Bell Curve.", "");
    }
  }

  function clearCollector() {
    sampleMeans = [];
    collectorCounts = new Array(COLLECTOR_BINS).fill(0);
    lastPickedBins = [];
    lastMeanVal = null;
    updateTelemetry();
  }

  function pickOneIndex() {
    const total = weights.reduce((s, w) => s + w, 0) || 1;
    let r = Math.random() * total;
    for (let i = 0; i < NUM_BINS; i++) {
      r -= weights[i];
      if (r <= 0) return i;
    }
    return NUM_BINS - 1;
  }

  function getStats(arr) {
    if (arr.length === 0) return { mean: 0, sd: 0 };
    const mean = arr.reduce((s, v) => s + v, 0) / arr.length;
    const variance = arr.reduce((s, v) => s + (v - mean) * (v - mean), 0) / arr.length;
    return { mean, sd: Math.sqrt(variance) };
  }

  function runBatches(count) {
    const lvl = LEVELS[currentLevel];

    for (let b = 0; b < count; b++) {
      let sum = 0;
      const picked = [];
      for (let i = 0; i < sampleN; i++) {
        const idx = pickOneIndex();
        sum += idx;
        if (b === count - 1) picked.push(idx);
      }
      const avg = sum / sampleN;
      sampleMeans.push(avg);

      const cBin = Math.min(COLLECTOR_BINS - 1, Math.max(0, Math.floor((avg / (NUM_BINS - 1)) * (COLLECTOR_BINS - 1) + 0.5)));
      collectorCounts[cBin]++;

      if (b === count - 1) {
        lastPickedBins = picked;
        lastMeanVal = avg;
        highlightAlpha = 1.0;
      }
    }

    updateTelemetry();
    checkMissionProgress();
  }

  function checkMissionProgress() {
    const lvl = LEVELS[currentLevel];
    const batches = sampleMeans.length;
    const { sd } = getStats(sampleMeans);

    if (currentLevel === 0) {
      if (batches >= lvl.minBatchesToWin && sampleN >= lvl.minNToWin) {
        triggerWin();
      } else if (batches >= 100 && sampleN <= 2) {
        addMissionNote(0, "Batch Size 1 Copies the Source", "When you only grab 1 particle at a time, no averaging happens, so the collector simply mirrors your original weird shape.");
        setLog("Notice how Batch Size 1 just copies your weird shape! Now raise Batch Size to 15 or higher and fire 200 batches.", "warn");
      } else if (sampleN < lvl.minNToWin) {
        setLog(`Good test at Batch Size ${sampleN}. Raise Batch Size to 15+ and fire 200 batches to see the Bell Curve lock in.`, "");
      } else {
        setLog(`Keep firing! ${batches} / ${lvl.minBatchesToWin} batches collected at Batch Size ${sampleN}.`, "");
      }
      return;
    }

    if (currentLevel === 1) {
      if (batches >= lvl.minBatchesToWin && sd <= lvl.targetMaxSE) {
        triggerWin();
      } else if (batches >= 200 && sd > lvl.targetMaxSE) {
        addMissionNote(1, "Small Sample Size = Wide Spread", "At small Sample Sizes (n), averages still bounce around widely. Increase n to pull the Bell Curve inside the green Precision Zone.");
        setLog(`Spread (Std Error) is ${sd.toFixed(2)} (needs to be <= ${lvl.targetMaxSE.toFixed(2)}). Increase Sample Size (n) and fire 200 batches again.`, "warn");
      } else {
        setLog(`Collecting samples (${batches} / 200). Watch the Spread (Std Error) shrink as you raise Sample Size (n).`, "");
      }
      return;
    }

    if (currentLevel === 2) {
      if (batches >= lvl.minBatchesToWin && sampleN >= lvl.minNToWin) {
        triggerWin();
      } else if (batches >= 100 && sampleN < 10) {
        addMissionNote(2, "Skew Survives Small Samples", "When a population is heavily skewed, small samples (like n = 2 or 5) still produce a lopsided Sampling Distribution.");
        setLog(`Look at the collector: at n = ${sampleN}, the heavy skew still survives! Raise Sample Size (n) to 25+ and fire 200 batches.`, "warn");
      } else {
        setLog(`Raise Sample Size (n) to 25 or higher and fire 200 batches to force a symmetric Bell Curve.`, "");
      }
    }
  }

  function triggerWin() {
    const lvl = LEVELS[currentLevel];
    const { sd } = getStats(sampleMeans);
    addMissionNote(currentLevel, lvl.winNoteLabel, lvl.winNoteBody);
    markCompleted(currentLevel, `n = ${sampleN}, Std Error = ${sd.toFixed(2)}`);
    updateTabs();
    updateTelemetry();
    setLog(`MISSION COMPLETE: Bell Curve locked at n = ${sampleN} (Spread: ${sd.toFixed(2)})!`, "success");

    const htmlBlocks = [];
    if (currentLevel === 0) {
      htmlBlocks.push(
        `<p>Even with your custom shape in the top chamber, averaging <strong>${sampleN} particles</strong> per batch forced the bottom collector into a smooth Bell Curve!</p>`,
        `<p><strong>HUD Upgrade for Mission 02:</strong> Now that you have seen averages turn chaos into a bell curve, we are switching your dashboard to the real Statistics and AI terms:</p>`,
        `<ul class="vocab-list">
          <li><strong>Top Source → Population Distribution:</strong> The raw, real-world data you are pulling from (which is rarely a clean bell curve).</li>
          <li><strong>Batch Size → Sample Size (n):</strong> How many data points you average together in each trial.</li>
          <li><strong>Bottom Collector → Sampling Distribution:</strong> The shape formed by plotting the averages of many samples.</li>
          <li><strong>Spread → Standard Error:</strong> Measures how tightly your sample averages cluster around the true center.</li>
        </ul>`
      );
    } else if (currentLevel === 1) {
      htmlBlocks.push(
        `<p>You narrowed the Sampling Distribution to a Standard Error of <strong>${sd.toFixed(2)}</strong> using <strong>n = ${sampleN}</strong>, locking it cleanly inside the green Precision Zone.</p>`
      );
    } else {
      htmlBlocks.push(
        `<p>With <strong>n = ${sampleN}</strong>, even an extreme right-skewed population produced a clean, symmetric Bell Curve in the collector below.</p>`
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
      title: "Welcome to Signal Forge",
      htmlBlocks: [
        "<p>The top chamber is your particle source. You can click and drag across the bars to sculpt any shape you want. Each time you fire a batch, the lab grabs a handful of particles from your shape, finds their average, and drops it into the collector below.</p>",
        "<p>Your first challenge: try to break the collector by drawing the weirdest, most lopsided shape you can.</p>"
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
    currentLevel = idx;
    const lvl = LEVELS[idx];
    weights = [...lvl.weights];
    sampleN = lvl.startN;
    nSlider.value = sampleN;
    nValue.textContent = sampleN;

    document.getElementById("brandPill").textContent = lvl.aiMode ? "MATH OF AI • MISSION LAB" : "INTERACTIVE MISSION";
    document.getElementById("levelTitle").textContent = lvl.title;
    document.getElementById("levelDesc").textContent = lvl.desc;
    canvas.style.cursor = lvl.editable ? "crosshair" : "default";

    updateVocabulary(lvl.aiMode);
    clearCollector();
    updateTabs();

    setLog(
      lvl.editable
        ? "Click and drag across the top bars to sculpt your shape, then fire batches below."
        : "Adjust Sample Size (n) and fire batches to observe how the Sampling Distribution reacts.",
      ""
    );

    if (showIntro) {
      showIntroDrawer();
    } else {
      sideDrawer.classList.remove("open");
    }
  }

  function updateVocabulary(aiMode) {
    const spreadLabel = document.getElementById("spreadLabel");
    const nSliderLabel = document.getElementById("nSliderLabel");

    if (aiMode) {
      spreadLabel.innerHTML = `STD ERROR <span class="help-tip" data-tip="In Mission 01, we called this Spread. Standard Error measures how tightly sample averages cluster around the true population mean.">?</span>`;
      nSliderLabel.innerHTML = `SAMPLE SIZE (n) <span class="help-tip" data-tip="In Mission 01, we called this Batch Size. It is the number of data points averaged together in each sample.">?</span>`;
    } else {
      spreadLabel.textContent = "SPREAD";
      nSliderLabel.textContent = "BATCH SIZE";
    }
  }

  function updateTabs() {
    document.querySelectorAll(".lvl-pill").forEach((btn, i) => {
      btn.classList.toggle("active", i === currentLevel);
      btn.classList.toggle("solved", missionHistory[i].status === "Completed");
    });
  }

  function updateTelemetry() {
    const lvl = LEVELS[currentLevel];
    const count = sampleMeans.length;
    const { sd } = getStats(sampleMeans);

    document.getElementById("batchesDisplay").textContent = count;
    document.getElementById("spreadDisplay").textContent = count > 1 ? sd.toFixed(2) : "--";

    const statusEl = document.getElementById("statusDisplay");
    if (missionHistory[currentLevel].status === "Completed") {
      statusEl.textContent = "LOCKED";
      statusEl.className = "tele-value locked-in";
    } else if (count === 0) {
      statusEl.textContent = "READY";
      statusEl.className = "tele-value";
    } else if (lvl.showPrecisionZone && sd <= lvl.targetMaxSE) {
      statusEl.textContent = "IN ZONE";
      statusEl.className = "tele-value locked-in";
    } else {
      statusEl.textContent = "SAMPLING";
      statusEl.className = "tele-value warn-val";
    }
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
    if (rec.status === "Not Started") rec.status = "In Progress";
    renderMissionLog();
  }

  function markCompleted(lvlIdx, bestInfo) {
    const rec = missionHistory[lvlIdx];
    rec.status = "Completed";
    rec.bestInfo = bestInfo;
    renderMissionLog();
  }

  function renderMissionLog() {
    const list = document.getElementById("missionLogList");
    list.innerHTML = missionHistory.map(item => {
      const isDone = item.status === "Completed";
      const isProg = item.status === "In Progress";
      const badgeClass = isDone ? "done" : (isProg ? "in-progress" : "");
      const metaLine = item.bestInfo
        ? `Completed (${item.bestInfo})`
        : (item.notes.length > 0 ? "In Progress • Takeaways unlocked below" : "Not attempted yet");

      const notesHtml = item.notes.length > 0
        ? `<ul class="log-notes-ul">${item.notes.map(n => `<li><strong>${n.label}:</strong> ${n.body}</li>`).join("")}</ul>`
        : `<p class="log-intro">Play this mission to unlock its Central Limit Theorem takeaways.</p>`;

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

  function drawScene() {
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const W = rect.width || 760;
    const H = rect.height || 300;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const lvl = LEVELS[currentLevel];
    const padX = 36;
    const usableW = W - padX * 2;

    const topStart = 28;
    const topEnd = H * 0.44;
    const topH = topEnd - topStart;

    const botStart = H * 0.57;
    const botEnd = H - 22;
    const botH = botEnd - botStart;

    // Background
    const bgGrad = ctx.createLinearGradient(0, 0, 0, H);
    bgGrad.addColorStop(0, "#070B14");
    bgGrad.addColorStop(1, "#0F172A");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, W, H);

    // Chamber divider
    ctx.strokeStyle = "rgba(36, 50, 77, 0.8)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padX, H * 0.50);
    ctx.lineTo(W - padX, H * 0.50);
    ctx.stroke();

    // Chamber Labels
    ctx.font = "700 10.5px 'JetBrains Mono', monospace";
    ctx.fillStyle = "#38BDF8";
    ctx.textAlign = "left";
    const topLabel = lvl.editable
      ? "TOP CHAMBER: PARTICLE SOURCE (CLICK & DRAG TO DRAW)"
      : "TOP CHAMBER: POPULATION DISTRIBUTION (LOCKED)";
    ctx.fillText(topLabel, padX, 18);

    ctx.fillStyle = "#34D399";
    const botLabel = lvl.aiMode
      ? `BOTTOM CHAMBER: SAMPLING DISTRIBUTION OF THE MEAN (n = ${sampleN})`
      : `BOTTOM CHAMBER: AVERAGE COLLECTOR (BATCH SIZE = ${sampleN})`;
    ctx.fillText(botLabel, padX, botStart - 10);

    // 1. Draw Top Chamber Bars
    const barW = usableW / NUM_BINS;
    for (let i = 0; i < NUM_BINS; i++) {
      const h = (weights[i] / 100) * topH;
      const bx = padX + i * barW + 3;
      const by = topEnd - h;
      const isPicked = highlightAlpha > 0 && lastPickedBins.includes(i);

      ctx.fillStyle = isPicked
        ? `rgba(251, 191, 36, ${0.4 + highlightAlpha * 0.6})`
        : "rgba(56, 189, 248, 0.35)";
      ctx.fillRect(bx, by, barW - 6, h);

      ctx.strokeStyle = isPicked ? "#FBBF24" : "#38BDF8";
      ctx.lineWidth = isPicked ? 2 : 1;
      ctx.strokeRect(bx, by, barW - 6, h);
    }

    // 2. Mission 02 Green Precision Zone in Bottom Chamber
    if (lvl.showPrecisionZone) {
      const centerX = padX + usableW * 0.5;
      const zoneW = usableW * 0.24;
      ctx.fillStyle = "rgba(52, 211, 153, 0.12)";
      ctx.fillRect(centerX - zoneW / 2, botStart, zoneW, botH);
      ctx.strokeStyle = "rgba(52, 211, 153, 0.55)";
      ctx.setLineDash([4, 4]);
      ctx.strokeRect(centerX - zoneW / 2, botStart, zoneW, botH);
      ctx.setLineDash([]);

      ctx.fillStyle = "#34D399";
      ctx.font = "700 9.5px 'JetBrains Mono', monospace";
      ctx.textAlign = "center";
      ctx.fillText("PRECISION ZONE", centerX, botStart + 14);
    }

    // 3. Draw Bottom Collector Histogram
    const maxCount = Math.max(1, ...collectorCounts);
    const cBarW = usableW / COLLECTOR_BINS;

    for (let i = 0; i < COLLECTOR_BINS; i++) {
      if (collectorCounts[i] === 0) continue;
      const h = (collectorCounts[i] / maxCount) * (botH - 12);
      const bx = padX + i * cBarW + 1.5;
      const by = botEnd - h;

      ctx.fillStyle = "rgba(52, 211, 153, 0.5)";
      ctx.fillRect(bx, by, cBarW - 3, h);
      ctx.strokeStyle = "#34D399";
      ctx.lineWidth = 1;
      ctx.strokeRect(bx, by, cBarW - 3, h);
    }

    // Highlight last dropped average marker
    if (lastMeanVal !== null && highlightAlpha > 0) {
      const mx = padX + (lastMeanVal / (NUM_BINS - 1)) * usableW;
      ctx.fillStyle = `rgba(251, 191, 36, ${highlightAlpha})`;
      ctx.beginPath();
      ctx.arc(mx, botEnd - 6, 5, 0, Math.PI * 2);
      ctx.fill();
    }

    // Empty state hint
    if (sampleMeans.length === 0) {
      ctx.fillStyle = "rgba(148, 163, 184, 0.55)";
      ctx.font = "600 12px 'Space Grotesk', sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("Click 'Drop 1 Batch' or 'Fire 200 Batches' to fill the collector", W / 2, botStart + botH / 2);
    }
  }

  init();
})();
// END OF FILE