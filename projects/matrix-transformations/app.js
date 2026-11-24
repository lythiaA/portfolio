// projects/matrix-transformations/app.js
(function () {
  const LEVELS = window.MATRIX_LEVELS || [];
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");

  const slider1 = document.getElementById("slider1");
  const slider2 = document.getElementById("slider2");
  const slider1Value = document.getElementById("slider1Value");
  const slider2Value = document.getElementById("slider2Value");
  const lockBtn = document.getElementById("lockBtn");
  const resetBtn = document.getElementById("resetBtn");
  const drawerToggleBtn = document.getElementById("drawerToggleBtn");
  const sideDrawer = document.getElementById("sideDrawer");
  const drawerCloseBtn = document.getElementById("drawerCloseBtn");
  const tabBriefBtn = document.getElementById("tabBriefBtn");
  const tabLogBtn = document.getElementById("tabLogBtn");
  const drawerBriefView = document.getElementById("drawerBriefView");
  const drawerLogView = document.getElementById("drawerLogView");

  // Asymmetric spacecraft polygon inside unit square [0, 1] x [0, 1]
  const SHIP_POLY = [
    { x: 0.94, y: 0.56 }, // Nose
    { x: 0.34, y: 0.92 }, // Tall upper wing
    { x: 0.14, y: 0.72 }, // Rear upper hull
    { x: 0.27, y: 0.50 }, // Thruster notch
    { x: 0.14, y: 0.22 }, // Rear lower hull
    { x: 0.56, y: 0.28 }  // Shorter lower fin
  ];

  // Small cockpit window so orientation/flip is crystal clear
  const COCKPIT_POLY = [
    { x: 0.68, y: 0.58 },
    { x: 0.44, y: 0.70 },
    { x: 0.42, y: 0.54 }
  ];

  let currentLevel = 0;
  let mat = { a: 1.0, b: 0.0, c: 0.0, d: 1.0 };

  const missionHistory = LEVELS.map(l => ({
    id: l.id,
    shortName: l.shortName,
    status: "Not Started",
    bestAlign: null,
    notes: []
  }));

  function cleanNum(v) {
    const rounded = Math.round(Number(v) * 10) / 10;
    return rounded === 0 ? 0 : rounded;
  }

  function transformPt(pt, m) {
    return {
      x: m.a * pt.x + m.b * pt.y,
      y: m.c * pt.x + m.d * pt.y
    };
  }

  function getDeterminant(m) {
    return m.a * m.d - m.b * m.c;
  }

  function getAlignment(m, target) {
    const dist = Math.hypot(
      m.a - target.a,
      m.b - target.b,
      m.c - target.c,
      m.d - target.d
    );
    return {
      dist,
      pct: Math.max(0, Math.min(100, Math.round((1 - dist / 2.2) * 100)))
    };
  }

  function init() {
    slider1.addEventListener("input", () => {
      const key = LEVELS[currentLevel].sliders[0].key;
      mat[key] = cleanNum(slider1.value);
      updateLiveUI();
    });

    slider2.addEventListener("input", () => {
      const key = LEVELS[currentLevel].sliders[1].key;
      mat[key] = cleanNum(slider2.value);
      updateLiveUI();
    });

    lockBtn.addEventListener("click", handleLock);
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
    requestAnimationFrame(renderLoop);
  }

  function renderLoop(timestamp) {
    drawScene(timestamp);
    requestAnimationFrame(renderLoop);
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
      title: "Welcome to Grid Warp",
      htmlBlocks: [
        "<p>Your ship is locked inside a holographic space grid. To dock safely, you need to warp the grid until your ship matches the pulsing green target silhouette.</p>",
        "<p>Watch the two glowing guide arrows on the grid: your dials stretch and tilt those arrows, and the entire coordinate grid bends along with them.</p>"
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
    mat = { ...lvl.start };

    document.getElementById("brandPill").textContent = lvl.aiMode ? "MATH OF AI • MISSION LAB" : "INTERACTIVE MISSION";
    document.getElementById("levelTitle").textContent = lvl.title;
    document.getElementById("levelDesc").textContent = lvl.desc;

    // Configure both sliders for this mission
    configureSlider(slider1, "slider1Label", "s1Min", "s1Mid", "s1Max", lvl.sliders[0], mat[lvl.sliders[0].key]);
    configureSlider(slider2, "slider2Label", "s2Min", "s2Mid", "s2Max", lvl.sliders[1], mat[lvl.sliders[1].key]);

    updateVocabulary(lvl);
    updateTabs();
    updateLiveUI();

    if (showIntro) {
      showIntroDrawer();
    } else {
      sideDrawer.classList.remove("open");
    }
  }

  function configureSlider(inputEl, labelId, minId, midId, maxId, cfg, initialVal) {
    inputEl.min = cfg.min;
    inputEl.max = cfg.max;
    inputEl.step = cfg.step;
    inputEl.value = initialVal;

    const labelEl = document.getElementById(labelId);
    if (cfg.tip) {
      labelEl.innerHTML = `${cfg.label} <span class="help-tip" data-tip="${cfg.tip}">?</span>`;
    } else {
      labelEl.textContent = cfg.label;
    }

    const mid = cleanNum((cfg.min + cfg.max) / 2);
    document.getElementById(minId).textContent = cfg.min.toFixed(1);
    document.getElementById(midId).textContent = mid.toFixed(1);
    document.getElementById(maxId).textContent = cfg.max.toFixed(1);
  }

  function updateVocabulary(lvl) {
    const detLabel = document.getElementById("detLabel");
    const matrixLabel = document.getElementById("matrixLabel");

    if (lvl.aiMode) {
      detLabel.innerHTML = `DETERMINANT <span class="help-tip" data-tip="In Mission 01, we called this Grid Area. The Determinant measures how much a matrix scales area—and turns negative when space flips.">?</span>`;
      matrixLabel.innerHTML = `2x2 MATRIX <span class="help-tip" data-tip="A compact grid of 4 numbers [a, b; c, d] that transforms every coordinate on the grid simultaneously.">?</span>`;
    } else {
      detLabel.textContent = "GRID AREA";
      matrixLabel.textContent = "CONTROL GRID";
    }

    // Highlight active matrix cells for this mission
    const activeKeys = lvl.sliders.map(s => s.key);
    ["a", "b", "c", "d"].forEach(k => {
      const el = document.getElementById("cell" + k.toUpperCase());
      el.classList.toggle("active-entry", activeKeys.includes(k));
    });
  }

  function updateTabs() {
    document.querySelectorAll(".lvl-pill").forEach((btn, i) => {
      btn.classList.toggle("active", i === currentLevel);
      btn.classList.toggle("solved", missionHistory[i].status === "Completed");
    });
  }

  function updateLiveUI() {
    const lvl = LEVELS[currentLevel];
    const k1 = lvl.sliders[0].key;
    const k2 = lvl.sliders[1].key;

    slider1Value.textContent = mat[k1].toFixed(1);
    slider2Value.textContent = mat[k2].toFixed(1);

    document.getElementById("cellA").textContent = mat.a.toFixed(1);
    document.getElementById("cellB").textContent = mat.b.toFixed(1);
    document.getElementById("cellC").textContent = mat.c.toFixed(1);
    document.getElementById("cellD").textContent = mat.d.toFixed(1);

    const det = getDeterminant(mat);
    const isCollapsed = Math.abs(det) < 0.01;
    const { dist, pct } = getAlignment(mat, lvl.target);
    const isLockedIn = dist <= 0.11;

    const alignEl = document.getElementById("alignDisplay");
    alignEl.textContent = `${pct}%`;
    alignEl.className = "tele-value " + (isLockedIn ? "locked-in" : "");

    const detEl = document.getElementById("detDisplay");
    detEl.textContent = lvl.aiMode ? det.toFixed(2) : `${det.toFixed(2)}x`;
    detEl.className = "tele-value " + (isCollapsed ? "collapsed" : (det < 0 ? "flipped" : ""));

    const statusEl = document.getElementById("statusDisplay");
    if (isCollapsed) {
      statusEl.textContent = "COLLAPSED";
      statusEl.className = "tele-value collapsed";
      setLog("DIMENSION COLLAPSE! When the Determinant hits 0.00, 2D space squashes flat into a single line—all width or height information is crushed.", "danger");
    } else if (isLockedIn) {
      statusEl.textContent = "ALIGNED";
      statusEl.className = "tele-value locked-in";
      setLog("Target alignment locked! Click Lock Warp to confirm.", "success");
    } else if (det < 0 && currentLevel === 2) {
      statusEl.textContent = "FLIPPED";
      statusEl.className = "tele-value flipped";
      setLog("Orientation flipped! Negative Determinant means space has mirrored across the axis. Fine-tune to match the green silhouette.", "");
    } else {
      statusEl.textContent = "WARPING";
      statusEl.className = "tele-value";
      setLog("Drag the two dials to warp the grid until your ship matches the pulsing green silhouette.", "");
    }
  }

  function setLog(msg, tone) {
    const log = document.getElementById("feedbackLog");
    log.className = "live-log" + (tone ? " " + tone : "");
    document.getElementById("feedbackText").textContent = msg;
  }

  function handleLock() {
    const lvl = LEVELS[currentLevel];
    const det = getDeterminant(mat);
    const isCollapsed = Math.abs(det) < 0.01;
    const { dist, pct } = getAlignment(mat, lvl.target);

    // 1. Special Fail: Dimension Collapse (Determinant = 0)
    if (isCollapsed && currentLevel === 2) {
      addMissionNote(currentLevel, lvl.collapseNoteLabel, lvl.collapseMath);
      markAttemptStatus(currentLevel, "In Progress");
      openDrawer({
        tone: "fail",
        tag: "SPACE COLLAPSED • DETERMINANT = 0",
        title: lvl.collapseTitle,
        htmlBlocks: [
          "<p>Setting an axis entry to <strong>0.0</strong> made the Determinant zero, crushing your entire 2D ship into a 1D line.</p>"
        ],
        mathText: lvl.collapseMath,
        buttons: [
          { label: "View All Notes", primary: false, onClick: () => switchDrawerTab("log") },
          { label: "Keep Warping", primary: true, onClick: () => sideDrawer.classList.remove("open") }
        ]
      });
      return;
    }

    // 2. Victory (within 0.11 matrix distance / 95%+ alignment)
    if (dist <= 0.11) {
      addMissionNote(currentLevel, lvl.winNoteLabel, lvl.winNoteBody);
      markCompleted(currentLevel, pct);
      updateTabs();

      const htmlBlocks = [];
      if (currentLevel === 0) {
        htmlBlocks.push(
          `<p>You locked the ship in at <strong>${pct}% alignment</strong>. Notice how moving the two glowing guide arrows controlled where every single grid line moved?</p>`,
          `<p><strong>HUD Upgrade for Mission 02:</strong> Now that you have felt how warping space works, we are switching your dashboard to the real Linear Algebra terms used in AI (hover over any <strong>?</strong> icon anytime for a reminder):</p>`,
          `<ul class="vocab-list">
            <li><strong>Control Grid → Transformation Matrix:</strong> A compact 2x2 grid of 4 numbers that tells a computer exactly how to stretch, tilt, or flip space.</li>
            <li><strong>Guide Arrows → Basis Vectors (î and ĵ):</strong> The two foundational arrows defining the grid. Wherever these two arrows land, every other point in space follows automatically.</li>
            <li><strong>Width & Height Dials → Diagonal Entries (a and d):</strong> The top-left and bottom-right numbers in the matrix. Adjusting them bigger or smaller stretches or squishes space along the X and Y axes.</li>
            <li><strong>Grid Area → Determinant:</strong> Measures how much a single grid square's area grew or shrank after your warp (here, 2.0 × 0.5 = 1.00x area).</li>
          </ul>`
        );
      } else if (currentLevel === 1) {
        htmlBlocks.push(
          `<p>You slanted the coordinate grid to <strong>${pct}% alignment</strong> by changing the off-diagonal entry <strong>(b)</strong>. Notice how shearing tilted the entire vertical axis without changing the horizontal Basis Vector.</p>`
        );
      } else {
        htmlBlocks.push(
          `<p>You crossed past zero into negative numbers and locked in at <strong>${pct}% alignment</strong>! Flipping space made the Determinant negative (<strong>${det.toFixed(2)}</strong>) and mirrored your ship cleanly onto the target.</p>`
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
      return;
    }

    // 3. Not Aligned Yet
    addMissionNote(currentLevel, lvl.failNoteLabel, lvl.failMath);
    markAttemptStatus(currentLevel, "In Progress");
    openDrawer({
      tone: "warn",
      tag: `ALIGNMENT AT ${pct}%`,
      title: lvl.failTitle,
      htmlBlocks: [
        `<p>Your ship is currently at <strong>${pct}% alignment</strong> (aim for 95%+ to lock in).</p>`,
        `<p>${lvl.failHint}</p>`
      ],
      mathText: lvl.failMath,
      buttons: [
        { label: "View All Notes", primary: false, onClick: () => switchDrawerTab("log") },
        { label: "Keep Warping", primary: true, onClick: () => sideDrawer.classList.remove("open") }
      ]
    });
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

  function markCompleted(lvlIdx, pct) {
    const rec = missionHistory[lvlIdx];
    rec.status = "Completed";
    if (rec.bestAlign === null || pct > rec.bestAlign) rec.bestAlign = pct;
    renderMissionLog();
  }

  function renderMissionLog() {
    const list = document.getElementById("missionLogList");
    list.innerHTML = missionHistory.map(item => {
      const isDone = item.status === "Completed";
      const isProg = item.status === "In Progress";
      const badgeClass = isDone ? "done" : (isProg ? "in-progress" : "");
      const metaLine = item.bestAlign !== null
        ? `Best Alignment: ${item.bestAlign}%`
        : (item.notes.length > 0 ? "Attempted • Takeaways unlocked below" : "Not attempted yet");

      const notesHtml = item.notes.length > 0
        ? `<ul class="log-notes-ul">${item.notes.map(n => `<li><strong>${n.label}:</strong> ${n.body}</li>`).join("")}</ul>`
        : `<p class="log-intro">Play this mission to unlock its Linear Algebra takeaways.</p>`;

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

  function drawArrow(x1, y1, x2, y2, color, label) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const len = Math.hypot(dx, dy);
    if (len < 6) return;

    const angle = Math.atan2(dy, dx);
    ctx.save();
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = 2.8;

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    const headLen = 9;
    ctx.beginPath();
    ctx.moveTo(x2, y2);
    ctx.lineTo(x2 - headLen * Math.cos(angle - Math.PI / 6), y2 - headLen * Math.sin(angle - Math.PI / 6));
    ctx.lineTo(x2 - headLen * Math.cos(angle + Math.PI / 6), y2 - headLen * Math.sin(angle + Math.PI / 6));
    ctx.closePath();
    ctx.fill();

    if (label) {
      ctx.font = "700 11px 'JetBrains Mono', monospace";
      ctx.fillText(label, x2 + Math.cos(angle) * 14, y2 + Math.sin(angle) * 14 + 4);
    }
    ctx.restore();
  }

  function drawScene(timestamp) {
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const W = rect.width || 760;
    const H = rect.height || 300;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const lvl = LEVELS[currentLevel];
    const det = getDeterminant(mat);
    const isCollapsed = Math.abs(det) < 0.01;
    const pulse = 0.5 + 0.5 * Math.sin((timestamp || 0) / 360);

    // Uniform square scaling centered at origin
    const scale = Math.min((W - 44) / 6.8, (H - 40) / 5.0);
    const cx = W / 2;
    const cy = H / 2 + 10;

    const mapX = vx => cx + vx * scale;
    const mapY = vy => cy - vy * scale;

    // 1. Background
    const bgGrad = ctx.createLinearGradient(0, 0, 0, H);
    bgGrad.addColorStop(0, "#070B14");
    bgGrad.addColorStop(1, "#0F172A");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, W, H);

    // 2. Faint Static Reference Grid (Unwarped Background Space)
    ctx.strokeStyle = "rgba(148, 163, 184, 0.08)";
    ctx.lineWidth = 1;
    for (let k = -4; k <= 4; k++) {
      ctx.beginPath();
      ctx.moveTo(mapX(k), mapY(-4));
      ctx.lineTo(mapX(k), mapY(4));
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(mapX(-4), mapY(k));
      ctx.lineTo(mapX(4), mapY(k));
      ctx.stroke();
    }

    // Static Axes
    ctx.strokeStyle = "rgba(148, 163, 184, 0.22)";
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(mapX(-4), mapY(0));
    ctx.lineTo(mapX(4), mapY(0));
    ctx.moveTo(mapX(0), mapY(-4));
    ctx.lineTo(mapX(0), mapY(4));
    ctx.stroke();

    // 3. Warped Coordinate Grid (Moves live with the matrix!)
    ctx.strokeStyle = isCollapsed ? "rgba(251, 113, 133, 0.5)" : "rgba(56, 189, 248, 0.22)";
    ctx.lineWidth = isCollapsed ? 2 : 1.1;
    for (let k = -3; k <= 3; k++) {
      // Warped vertical lines
      const v1 = transformPt({ x: k, y: -3 }, mat);
      const v2 = transformPt({ x: k, y: 3 }, mat);
      ctx.beginPath();
      ctx.moveTo(mapX(v1.x), mapY(v1.y));
      ctx.lineTo(mapX(v2.x), mapY(v2.y));
      ctx.stroke();

      // Warped horizontal lines
      const h1 = transformPt({ x: -3, y: k }, mat);
      const h2 = transformPt({ x: 3, y: k }, mat);
      ctx.beginPath();
      ctx.moveTo(mapX(h1.x), mapY(h1.y));
      ctx.lineTo(mapX(h2.x), mapY(h2.y));
      ctx.stroke();
    }

    // 4. Shaded Unit Square (Visualizes Grid Area / Determinant)
    const u0 = transformPt({ x: 0, y: 0 }, mat);
    const u1 = transformPt({ x: 1, y: 0 }, mat);
    const u2 = transformPt({ x: 1, y: 1 }, mat);
    const u3 = transformPt({ x: 0, y: 1 }, mat);

    ctx.beginPath();
    ctx.moveTo(mapX(u0.x), mapY(u0.y));
    ctx.lineTo(mapX(u1.x), mapY(u1.y));
    ctx.lineTo(mapX(u2.x), mapY(u2.y));
    ctx.lineTo(mapX(u3.x), mapY(u3.y));
    ctx.closePath();
    ctx.fillStyle = isCollapsed
      ? "rgba(251, 113, 133, 0.25)"
      : (det < 0 ? "rgba(192, 132, 252, 0.14)" : "rgba(56, 189, 248, 0.11)");
    ctx.fill();

    // 5. Pulsing Green Target Silhouette
    ctx.save();
    ctx.beginPath();
    SHIP_POLY.forEach((pt, i) => {
      const tp = transformPt(pt, lvl.target);
      if (i === 0) ctx.moveTo(mapX(tp.x), mapY(tp.y));
      else ctx.lineTo(mapX(tp.x), mapY(tp.y));
    });
    ctx.closePath();
    ctx.fillStyle = `rgba(52, 211, 153, ${0.10 + pulse * 0.14})`;
    ctx.fill();
    ctx.strokeStyle = `rgba(52, 211, 153, ${0.55 + pulse * 0.45})`;
    ctx.lineWidth = 2.4;
    ctx.setLineDash([6, 4]);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();

    // 6. Player's Warped Spacecraft
    ctx.save();
    ctx.beginPath();
    SHIP_POLY.forEach((pt, i) => {
      const tp = transformPt(pt, mat);
      if (i === 0) ctx.moveTo(mapX(tp.x), mapY(tp.y));
      else ctx.lineTo(mapX(tp.x), mapY(tp.y));
    });
    ctx.closePath();
    ctx.fillStyle = isCollapsed ? "rgba(251, 113, 133, 0.7)" : "rgba(56, 189, 248, 0.34)";
    ctx.fill();
    ctx.strokeStyle = isCollapsed ? "#FB7185" : "#38BDF8";
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Cockpit window
    ctx.beginPath();
    COCKPIT_POLY.forEach((pt, i) => {
      const tp = transformPt(pt, mat);
      if (i === 0) ctx.moveTo(mapX(tp.x), mapY(tp.y));
      else ctx.lineTo(mapX(tp.x), mapY(tp.y));
    });
    ctx.closePath();
    ctx.fillStyle = isCollapsed ? "#FB7185" : "#F8FAFC";
    ctx.fill();
    ctx.restore();

    // 7. Glowing Guide Arrows / Basis Vectors (î and ĵ)
    const iVec = transformPt({ x: 1, y: 0 }, mat);
    const jVec = transformPt({ x: 0, y: 1 }, mat);
    drawArrow(mapX(0), mapY(0), mapX(iVec.x), mapY(iVec.y), "#FBBF24", lvl.aiMode ? "î" : "X");
    drawArrow(mapX(0), mapY(0), mapX(jVec.x), mapY(jVec.y), "#C084FC", lvl.aiMode ? "ĵ" : "Y");

    // Origin dot
    ctx.beginPath();
    ctx.arc(mapX(0), mapY(0), 4, 0, Math.PI * 2);
    ctx.fillStyle = "#F8FAFC";
    ctx.fill();
  }

  init();
})();
// END OF FILE