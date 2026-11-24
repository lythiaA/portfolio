// projects/linear-regression/app.js
(function () {
  const LEVELS = window.REGRESSION_LEVELS || [];
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");

  const slopeSlider = document.getElementById("slopeSlider");
  const interceptSlider = document.getElementById("interceptSlider");
  const slopeValue = document.getElementById("slopeValue");
  const interceptValue = document.getElementById("interceptValue");
  const lockBtn = document.getElementById("lockBtn");
  const olsToggleBtn = document.getElementById("olsToggleBtn");
  const resetBtn = document.getElementById("resetBtn");
  const drawerToggleBtn = document.getElementById("drawerToggleBtn");
  const sideDrawer = document.getElementById("sideDrawer");
  const drawerCloseBtn = document.getElementById("drawerCloseBtn");
  const tabBriefBtn = document.getElementById("tabBriefBtn");
  const tabLogBtn = document.getElementById("tabLogBtn");
  const drawerBriefView = document.getElementById("drawerBriefView");
  const drawerLogView = document.getElementById("drawerLogView");

  let currentLevel = 0;
  let m = 0;
  let b = 5;
  let exactOLS = { m: 0, b: 0, minSSE: 0, targetSSE: 0 };
  let showExactOLS = false;
  let levelSolvedOnce = LEVELS.map(() => false);

  const missionHistory = LEVELS.map(l => ({
    id: l.id,
    shortName: l.shortName,
    status: "Not Started",
    bestSSE: null,
    notes: []
  }));

  function computeOLS(points) {
    const n = points.length;
    const meanX = points.reduce((s, p) => s + p.x, 0) / n;
    const meanY = points.reduce((s, p) => s + p.y, 0) / n;

    let num = 0;
    let den = 0;
    points.forEach(p => {
      num += (p.x - meanX) * (p.y - meanY);
      den += (p.x - meanX) * (p.x - meanX);
    });

    const optM = den === 0 ? 0 : num / den;
    const optB = meanY - optM * meanX;
    const minSSE = calcSSE(points, optM, optB);
    return { m: optM, b: optB, minSSE: minSSE };
  }

  function calcSSE(points, slope, intercept) {
    return points.reduce((sum, p) => {
      const pred = slope * p.x + intercept;
      const err = p.y - pred;
      return sum + err * err;
    }, 0);
  }

  function init() {
    slopeSlider.addEventListener("input", () => {
      m = Number(slopeSlider.value);
      updateLiveUI();
      drawScene();
    });

    interceptSlider.addEventListener("input", () => {
      b = Number(interceptSlider.value);
      updateLiveUI();
      drawScene();
    });

    lockBtn.addEventListener("click", handleLock);
    resetBtn.addEventListener("click", () => loadLevel(currentLevel, false));

    olsToggleBtn.addEventListener("click", () => {
      if (olsToggleBtn.disabled) return;
      showExactOLS = !showExactOLS;
      olsToggleBtn.textContent = showExactOLS ? "Exact OLS: ON" : "Exact OLS: OFF";
      drawScene();
    });

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

    window.addEventListener("resize", drawScene);

    loadLevel(0, true);
    requestAnimationFrame(drawScene);
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
      title: "Welcome to Beam Alignment",
      htmlBlocks: [
        "<p>Your relay beam needs to pass as close as possible to a cluster of glowing energy nodes. Every time the beam misses a node, the vertical gap creates a glowing <strong>error square</strong> that drains power.</p>",
        "<p>Adjust <strong>Beam Tilt</strong> and <strong>Beam Height</strong> to shrink the total area of the squares below the Target Max, then click <strong>Lock Alignment</strong>.</p>"
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
    const ols = computeOLS(lvl.points);
    exactOLS = {
      m: ols.m,
      b: ols.b,
      minSSE: ols.minSSE,
      targetSSE: ols.minSSE * lvl.toleranceFactor
    };

    m = lvl.startM;
    b = lvl.startB;
    slopeSlider.value = m;
    interceptSlider.value = b;

    showExactOLS = false;
    olsToggleBtn.disabled = !levelSolvedOnce[idx];
    olsToggleBtn.textContent = levelSolvedOnce[idx] ? "Exact OLS: OFF" : "Exact OLS: LOCKED";

    document.getElementById("brandPill").textContent = lvl.aiMode ? "MATH OF AI • MISSION LAB" : "INTERACTIVE MISSION";
    document.getElementById("levelTitle").textContent = lvl.title;
    document.getElementById("levelDesc").textContent = lvl.desc;
    document.getElementById("targetDisplay").textContent = `≤ ${exactOLS.targetSSE.toFixed(2)}`;

    updateVocabulary(lvl.aiMode);
    updateTabs();
    updateLiveUI();
    setLog("Drag the sliders to shrink the glowing squares below Target Max, then click Lock Alignment.", "");
    drawScene();

    if (showIntro) {
      showIntroDrawer();
    } else {
      sideDrawer.classList.remove("open");
    }
  }

  function updateVocabulary(aiMode) {
    const sseLabel = document.getElementById("sseLabel");
    const slopeLabel = document.getElementById("slopeLabel");
    const interceptLabel = document.getElementById("interceptLabel");
    const formulaTag = document.getElementById("formulaTag");

    if (aiMode) {
      sseLabel.innerHTML = `SSE <span class="help-tip" data-tip="In Mission 01, we called this Power Drain. Sum of Squared Errors (SSE) adds up the area of every squared vertical gap.">?</span>`;
      slopeLabel.innerHTML = `SLOPE (m) <span class="help-tip" data-tip="In Mission 01, we called this Beam Tilt. Slope controls how steeply the prediction line rises or falls.">?</span>`;
      interceptLabel.innerHTML = `INTERCEPT (b) <span class="help-tip" data-tip="In Mission 01, we called this Beam Height. Intercept is where the line crosses the vertical axis at x = 0.">?</span>`;
      formulaTag.textContent = "LINEAR MODEL (y = mx + b)";
    } else {
      sseLabel.textContent = "POWER DRAIN";
      slopeLabel.textContent = "BEAM TILT";
      interceptLabel.textContent = "BEAM HEIGHT";
      formulaTag.textContent = "BEAM EQUATION";
    }
  }

  function updateTabs() {
    document.querySelectorAll(".lvl-pill").forEach((btn, i) => {
      btn.classList.toggle("active", i === currentLevel);
      btn.classList.toggle("solved", missionHistory[i].status === "Completed");
    });
  }

  function updateLiveUI() {
    const lvl = LEVELS[currentLevel];
    const curSSE = calcSSE(lvl.points, m, b);
    const inRange = curSSE <= exactOLS.targetSSE;

    slopeValue.textContent = m.toFixed(2);
    interceptValue.textContent = b.toFixed(1);

    const sseEl = document.getElementById("sseDisplay");
    sseEl.textContent = curSSE.toFixed(2);
    sseEl.className = "tele-value " + (inRange ? "in-range" : "over-range");

    const statusEl = document.getElementById("statusDisplay");
    statusEl.textContent = inRange ? "IN TARGET" : "TOO HIGH";
    statusEl.className = "tele-value " + (inRange ? "in-range" : "over-range");

    const sign = b >= 0 ? "+" : "-";
    document.getElementById("formulaEq").textContent = `y = ${m.toFixed(2)}x ${sign} ${Math.abs(b).toFixed(1)}`;
  }

  function setLog(msg, tone) {
    const log = document.getElementById("feedbackLog");
    log.className = "live-log" + (tone ? " " + tone : "");
    document.getElementById("feedbackText").textContent = msg;
  }

  function handleLock() {
    const lvl = LEVELS[currentLevel];
    const curSSE = calcSSE(lvl.points, m, b);

    if (curSSE <= exactOLS.targetSSE) {
      levelSolvedOnce[currentLevel] = true;
      olsToggleBtn.disabled = false;
      showExactOLS = true;
      olsToggleBtn.textContent = "Exact OLS: ON";
      drawScene();

      addMissionNote(currentLevel, lvl.winNoteLabel, lvl.winNoteBody);
      markCompleted(currentLevel, curSSE);
      updateTabs();

      setLog(`ALIGNMENT LOCKED: Your error (${curSSE.toFixed(2)}) beat the target! Dashed green line shows exact OLS (${exactOLS.minSSE.toFixed(2)}).`, "success");

      const htmlBlocks = [];
      if (currentLevel === 0) {
        htmlBlocks.push(
          `<p>You shrunk the total square area to <strong>${curSSE.toFixed(2)}</strong> (exact math minimum: ${exactOLS.minSSE.toFixed(2)}). The dashed green line on the grid shows the exact optimal line.</p>`,
          `<p><strong>HUD Upgrade for Mission 02:</strong> Now that you have felt how squared gaps pull a line into place, we are switching your dashboard to the real Linear Regression terms:</p>`,
          `<ul class="vocab-list">
            <li><strong>Beam Tilt → Slope (m):</strong> Controls how steeply your prediction line rises or falls as x increases.</li>
            <li><strong>Beam Height → Intercept (b):</strong> Sets where your line starts on the vertical axis (when x = 0).</li>
            <li><strong>Energy Gap → Residual:</strong> The vertical distance between a real data point and your line's prediction.</li>
            <li><strong>Power Drain → Sum of Squared Errors (SSE):</strong> The total area of all the squares combined. Minimizing SSE is called Ordinary Least Squares (OLS).</li>
          </ul>`
        );
      } else if (currentLevel === 1) {
        htmlBlocks.push(
          `<p>You achieved an SSE of <strong>${curSSE.toFixed(2)}</strong> (exact OLS minimum: ${exactOLS.minSSE.toFixed(2)}). Look at the dashed green line: that single outlier at the bottom right pulled the entire OLS line away from the other five points.</p>`
        );
      } else {
        htmlBlocks.push(
          `<p>You achieved an SSE of <strong>${curSSE.toFixed(2)}</strong> against the exact OLS minimum of <strong>${exactOLS.minSSE.toFixed(2)}</strong> (exact equation: y = ${exactOLS.m.toFixed(2)}x + ${exactOLS.b.toFixed(1)}).</p>`
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
      setLog(`Error is still ${curSSE.toFixed(2)} (needs to be ≤ ${exactOLS.targetSSE.toFixed(2)}). Look for the largest square and adjust your dials.`, "warn");

      openDrawer({
        tone: "warn",
        tag: "ALIGNMENT TOO HIGH",
        title: "Shrink Those Squares Further!",
        htmlBlocks: [
          `<p>Your current ${lvl.aiMode ? "SSE" : "Power Drain"} is <strong>${curSSE.toFixed(2)}</strong>, which is still above the Target Max of <strong>${exactOLS.targetSSE.toFixed(2)}</strong>.</p>`,
          `<p>Spot the biggest glowing square on the grid. Because error is squared, reducing your single biggest miss shrinks total error much faster than perfecting a tiny one.</p>`
        ],
        mathText: lvl.failMath,
        buttons: [
          { label: "Keep Tuning", primary: true, onClick: () => sideDrawer.classList.remove("open") }
        ]
      });
    }
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

  function markCompleted(lvlIdx, sse) {
    const rec = missionHistory[lvlIdx];
    rec.status = "Completed";
    if (rec.bestSSE === null || sse < rec.bestSSE) rec.bestSSE = sse;
    renderMissionLog();
  }

  function renderMissionLog() {
    const list = document.getElementById("missionLogList");
    list.innerHTML = missionHistory.map(item => {
      const isDone = item.status === "Completed";
      const isProg = item.status === "In Progress";
      const badgeClass = isDone ? "done" : (isProg ? "in-progress" : "");
      const metaLine = item.bestSSE !== null
        ? `Best SSE Achieved: ${item.bestSSE.toFixed(2)}`
        : (item.notes.length > 0 ? "Attempted • Takeaways unlocked below" : "Not attempted yet");

      const notesHtml = item.notes.length > 0
        ? `<ul class="log-notes-ul">${item.notes.map(n => `<li><strong>${n.label}:</strong> ${n.body}</li>`).join("")}</ul>`
        : `<p class="log-intro">Play this mission to unlock its Linear Regression takeaways.</p>`;

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
    const padL = 44;
    const padR = 30;
    const padT = 22;
    const padB = 30;

    // Keep square aspect ratio for visual honesty of "squares"
    const plotW = W - padL - padR;
    const plotH = H - padT - padB;
    const scale = Math.min(plotW / 10, plotH / 10);
    const offsetX = padL + (plotW - scale * 10) / 2;
    const offsetY = padT + (plotH - scale * 10) / 2;

    const mapX = vx => offsetX + vx * scale;
    const mapY = vy => offsetY + (10 - vy) * scale;

    // 1. Background
    const bgGrad = ctx.createLinearGradient(0, 0, 0, H);
    bgGrad.addColorStop(0, "#070B14");
    bgGrad.addColorStop(1, "#0F172A");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, W, H);

    // 2. Sci-Fi Coordinate Grid
    ctx.strokeStyle = "rgba(56, 189, 248, 0.08)";
    ctx.lineWidth = 1;
    for (let i = 0; i <= 10; i++) {
      // Vertical
      ctx.beginPath();
      ctx.moveTo(mapX(i), mapY(0));
      ctx.lineTo(mapX(i), mapY(10));
      ctx.stroke();
      // Horizontal
      ctx.beginPath();
      ctx.moveTo(mapX(0), mapY(i));
      ctx.lineTo(mapX(10), mapY(i));
      ctx.stroke();
    }

    // Axes
    ctx.strokeStyle = "rgba(148, 163, 184, 0.35)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(mapX(0), mapY(0));
    ctx.lineTo(mapX(10), mapY(0));
    ctx.moveTo(mapX(0), mapY(0));
    ctx.lineTo(mapX(0), mapY(10));
    ctx.stroke();

    // Axis ticks
    ctx.fillStyle = "#64748B";
    ctx.font = "600 10px 'JetBrains Mono', monospace";
    ctx.textAlign = "center";
    for (let i = 0; i <= 10; i += 2) {
      ctx.fillText(i, mapX(i), mapY(0) + 15);
      ctx.fillText(i, mapX(0) - 14, mapY(i) + 3);
    }

    // 3. Draw Glowing Error Squares (Residuals Squared)
    lvl.points.forEach(p => {
      const predY = m * p.x + b;
      const px = mapX(p.x);
      const py = mapY(p.y);
      const lineY = mapY(predY);
      const side = Math.abs(py - lineY);
      const topY = Math.min(py, lineY);

      const isBig = Math.abs(p.y - predY) > 1.8;
      ctx.fillStyle = isBig ? "rgba(251, 113, 133, 0.24)" : "rgba(251, 191, 36, 0.22)";
      ctx.strokeStyle = isBig ? "rgba(251, 113, 133, 0.75)" : "rgba(251, 191, 36, 0.65)";
      ctx.lineWidth = 1.2;

      // Draw square to the right (or left if near right edge)
      const sqX = p.x > 7.5 ? px - side : px;
      ctx.fillRect(sqX, topY, side, side);
      ctx.strokeRect(sqX, topY, side, side);

      // Vertical residual line
      ctx.strokeStyle = isBig ? "#FB7185" : "#FBBF24";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.lineTo(px, lineY);
      ctx.stroke();
    });

    // 4. Optional Exact OLS Reference Line (Dashed Emerald)
    if (showExactOLS) {
      ctx.save();
      ctx.strokeStyle = "#34D399";
      ctx.lineWidth = 2.5;
      ctx.setLineDash([6, 5]);
      ctx.beginPath();
      ctx.moveTo(mapX(0), mapY(exactOLS.b));
      ctx.lineTo(mapX(10), mapY(exactOLS.m * 10 + exactOLS.b));
      ctx.stroke();
      ctx.restore();
    }

    // 5. User's Glowing Laser Beam
    ctx.save();
    ctx.shadowColor = "#38BDF8";
    ctx.shadowBlur = 12;
    ctx.strokeStyle = "#38BDF8";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(mapX(0), mapY(b));
    ctx.lineTo(mapX(10), mapY(m * 10 + b));
    ctx.stroke();
    ctx.restore();

    // 6. Energy Nodes (Data Points)
    lvl.points.forEach(p => {
      const px = mapX(p.x);
      const py = mapY(p.y);

      ctx.beginPath();
      ctx.arc(px, py, p.outlier ? 7 : 6, 0, Math.PI * 2);
      ctx.fillStyle = p.outlier ? "#FB7185" : "#F8FAFC";
      ctx.fill();
      ctx.strokeStyle = p.outlier ? "#FFFFFF" : "#38BDF8";
      ctx.lineWidth = 2.5;
      ctx.stroke();

      if (p.outlier) {
        ctx.fillStyle = "#FB7185";
        ctx.font = "700 10px 'JetBrains Mono', monospace";
        ctx.textAlign = "center";
        ctx.fillText("OUTLIER", px, py + 19);
      }
    });
  }

  init();
})();
// END OF FILE