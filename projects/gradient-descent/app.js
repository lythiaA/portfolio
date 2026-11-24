// projects/gradient-descent/app.js
(function () {
  const LEVELS = window.DESCENT_LEVELS || [];
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");

  const lrSlider = document.getElementById("lrSlider");
  const lrValue = document.getElementById("lrValue");
  const stepBtn = document.getElementById("stepBtn");
  const fogToggleBtn = document.getElementById("fogToggleBtn");
  const resetBtn = document.getElementById("resetBtn");
  const drawerToggleBtn = document.getElementById("drawerToggleBtn");
  const sideDrawer = document.getElementById("sideDrawer");
  const drawerCloseBtn = document.getElementById("drawerCloseBtn");
  const tabBriefBtn = document.getElementById("tabBriefBtn");
  const tabLogBtn = document.getElementById("tabLogBtn");
  const drawerBriefView = document.getElementById("drawerBriefView");
  const drawerLogView = document.getElementById("drawerLogView");

  let currentLevel = 0;
  let x = 0;
  let steps = 0;
  let trail = [];
  let fogRevealed = false;
  let gameOver = false;
  let isAnimating = false;
  let overshotCount = 0;
  let inDemoPhase = false;

  // Persistent mission records for the All Missions Log tab
  const missionHistory = LEVELS.map(l => ({
    id: l.id,
    shortName: l.shortName,
    status: "Not Started",
    stepsUsed: null,
    lastLr: null,
    note: "Complete this mission to unlock its Math of AI takeaway."
  }));

  const stars = Array.from({ length: 45 }, () => ({
    rx: Math.random(),
    ry: Math.random() * 0.55,
    size: Math.random() * 1.6 + 0.5,
    alpha: Math.random() * 0.5 + 0.2
  }));

  // Track rover render position for continuous blinking beacon animation
  let renderX = 0;
  let renderY = 0;

  function init() {
    lrSlider.addEventListener("input", () => {
      lrValue.textContent = Number(lrSlider.value).toFixed(2);
      updateFormulaBar();
    });

    stepBtn.addEventListener("click", handleStep);
    resetBtn.addEventListener("click", () => loadLevel(currentLevel, false));

    fogToggleBtn.addEventListener("click", () => {
      fogRevealed = !fogRevealed;
      fogToggleBtn.textContent = fogRevealed ? "Clear Fog: ON" : "Clear Fog: OFF";
    });

    drawerToggleBtn.addEventListener("click", () => {
      sideDrawer.classList.toggle("open");
      if (sideDrawer.classList.contains("open")) renderMissionLog();
    });

    drawerCloseBtn.addEventListener("click", () => {
      sideDrawer.classList.remove("open");
    });

    tabBriefBtn.addEventListener("click", () => switchDrawerTab("brief"));
    tabLogBtn.addEventListener("click", () => switchDrawerTab("log"));

    document.querySelectorAll(".lvl-pill").forEach(btn => {
      btn.addEventListener("click", () => loadLevel(Number(btn.dataset.lvl), false));
    });

    loadLevel(0, true);
    requestAnimationFrame(renderLoop);
  }

  function renderLoop(timestamp) {
    drawScene(renderX, renderY, timestamp);
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

  function openDrawer({ tone = "", tag, title, paragraphs, mathText = "", buttons = [] }) {
    sideDrawer.className = "side-drawer open" + (tone ? " tone-" + tone : "");
    switchDrawerTab("brief");

    document.getElementById("drawerTag").textContent = tag;
    document.getElementById("drawerTitle").textContent = title;
    document.getElementById("drawerText").innerHTML = paragraphs.map(p => `<p>${p}</p>`).join("");

    const mathBox = document.getElementById("drawerMathBox");
    if (mathText) {
      mathBox.classList.remove("hidden");
      document.getElementById("drawerMathText").textContent = mathText;
    } else {
      mathBox.classList.add("hidden");
    }

    const actionsEl = document.getElementById("drawerActions");
    actionsEl.innerHTML = "";
    buttons.forEach(b => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = b.primary ? "btn-drawer-primary" : "btn-drawer-outline";
      btn.textContent = b.label;
      btn.addEventListener("click", b.onClick);
      actionsEl.appendChild(btn);
    });
  }

  function showIntroDrawer() {
    openDrawer({
      tag: "INTERACTIVE MISSION",
      title: "Welcome to Rover Descent",
      paragraphs: [
        "Your lunar rover is stranded high up in a dark mountain valley with limited battery. Your mission is to reach the blinking green landing zone at the lowest point in 4 steps or fewer.",
        "You control one dial: Thruster Power. Each time you fire the thrusters, the rover multiplies your dial by the steepness of the hill (the slope) to decide how far to step."
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
    x = lvl.startX;
    renderX = x;
    renderY = lvl.fn(x);
    steps = 0;
    overshotCount = 0;
    trail = [{ x: x, y: lvl.fn(x) }];
    fogRevealed = false;
    gameOver = false;
    isAnimating = false;
    inDemoPhase = Boolean(lvl.hasGuidedDemo);

    document.getElementById("brandPill").textContent = lvl.aiMode ? "MATH OF AI • MISSION LAB" : "INTERACTIVE MISSION";
    document.getElementById("levelTitle").textContent = inDemoPhase ? lvl.demoTitle : lvl.title;
    document.getElementById("levelDesc").textContent = inDemoPhase ? lvl.demoDesc : lvl.desc;

    lrSlider.value = inDemoPhase ? lvl.demoLr : lvl.defaultLr;
    lrSlider.disabled = inDemoPhase;
    lrValue.textContent = Number(lrSlider.value).toFixed(2);
    stepBtn.disabled = false;
    fogToggleBtn.textContent = "Clear Fog: OFF";

    updateVocabulary(lvl.aiMode);
    updateTabs();
    updateTelemetry();
    updateFormulaBar();

    if (inDemoPhase) {
      setLog("Guided Test: Click Fire Thrusters once at 0.90 to see how this steeper slope reacts.", "warn");
    } else {
      setLog("Rover deployed. Adjust the dial and fire thrusters to reach the blinking green zone.", "");
    }

    if (showIntro) {
      showIntroDrawer();
    } else {
      sideDrawer.classList.remove("open");
    }
  }

  function updateVocabulary(aiMode) {
    const lossLabel = document.getElementById("lossLabel");
    const gradLabel = document.getElementById("gradLabel");
    const sliderLabel = document.getElementById("sliderLabel");

    if (aiMode) {
      lossLabel.innerHTML = `LOSS <span class="help-tip" data-tip="In Mission 01, we called this Altitude. In AI, Loss measures how big the model's error is.">?</span>`;
      gradLabel.innerHTML = `GRADIENT <span class="help-tip" data-tip="In Mission 01, we called this Slope. In AI, the Gradient tells the model how steep the error curve is.">?</span>`;
      sliderLabel.innerHTML = `LEARNING RATE <span class="help-tip" data-tip="In Mission 01, we called this Thruster Power. In AI, the Learning Rate controls how aggressively a model updates after an error.">?</span>`;
    } else {
      lossLabel.textContent = "ALTITUDE";
      gradLabel.textContent = "SLOPE";
      sliderLabel.textContent = "THRUSTER POWER";
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
    document.getElementById("stepsDisplay").textContent = `${steps} / ${lvl.maxSteps}`;
    document.getElementById("lossDisplay").textContent = lvl.fn(x).toFixed(2);
    document.getElementById("gradDisplay").textContent = lvl.df(x).toFixed(2);
  }

  function updateFormulaBar() {
    const lvl = LEVELS[currentLevel];
    const lr = Number(lrSlider.value);
    const grad = lvl.df(Math.max(-lvl.maxSafeX, Math.min(lvl.maxSafeX, x)));
    const delta = -lr * grad;
    const dirWord = delta >= 0 ? "right" : "left";
    const dialName = lvl.aiMode ? "Learning Rate" : "Thruster Power";
    const slopeName = lvl.aiMode ? "Gradient" : "Slope";

    document.getElementById("formulaEq").textContent =
      `${dialName} (${lr.toFixed(2)}) x ${slopeName} (${grad.toFixed(2)}) = ${delta >= 0 ? "+" : ""}${delta.toFixed(2)} ${dirWord}`;
  }

  function setLog(msg, tone) {
    const log = document.getElementById("feedbackLog");
    log.className = "live-log" + (tone ? " " + tone : "");
    document.getElementById("feedbackText").textContent = msg;
  }

  function handleStep() {
    if (gameOver || isAnimating) return;

    const lvl = LEVELS[currentLevel];
    const lr = Number(lrSlider.value);
    const startX = x;
    const startY = lvl.fn(startX);
    const prevGrad = lvl.df(startX);

    const rawNextX = startX - lr * prevGrad;
    const diverged = Math.abs(rawNextX) > lvl.maxSafeX;
    const targetX = diverged ? (rawNextX > 0 ? lvl.maxSafeX + 0.35 : -(lvl.maxSafeX + 0.35)) : rawNextX;
    const targetY = lvl.fn(Math.max(-lvl.maxSafeX, Math.min(lvl.maxSafeX, targetX)));

    steps++;
    isAnimating = true;
    stepBtn.disabled = true;

    const duration = 340;
    const t0 = performance.now();

    function animateStep(now) {
      const p = Math.min(1, (now - t0) / duration);
      const ease = 1 - Math.pow(1 - p, 3);
      renderX = startX + (targetX - startX) * ease;
      renderY = startY + (targetY - startY) * ease + Math.sin(p * Math.PI) * 0.45;

      if (p < 1) {
        requestAnimationFrame(animateStep);
      } else {
        isAnimating = false;
        x = targetX;
        renderX = x;
        renderY = targetY;
        trail.push({ x: x, y: targetY });

        if (inDemoPhase) {
          handleDemoComplete(prevGrad);
        } else {
          evaluateStep(startX, startY, prevGrad, targetY, diverged);
        }
      }
    }

    requestAnimationFrame(animateStep);
  }

  function handleDemoComplete(prevGrad) {
    const lvl = LEVELS[currentLevel];
    const newGrad = lvl.df(x);
    fogRevealed = true;
    updateTelemetry();
    updateFormulaBar();
    setLog("Overshot! Notice how the Gradient flipped from negative to positive on the opposite wall.", "warn");

    openDrawer({
      tone: "warn",
      tag: "LEARNING MOMENT • OVERSHOOTING",
      title: "Whoa! That Is Overshooting.",
      paragraphs: [
        `Even though 0.90 felt manageable in Mission 01, multiplying it by this steeper Gradient (${prevGrad.toFixed(2)}) launched you straight across the canyon onto the opposite wall.`,
        `Notice how your Gradient flipped from ${prevGrad.toFixed(2)} to +${newGrad.toFixed(2)}? That sign flip is why a high Learning Rate makes a rover (or an AI model) bounce back and forth across the bottom, or fly off the canyon completely.`
      ],
      mathText: "Your battery will now reset to 0 / 4. Lower your Learning Rate so you can step smoothly into the Global Minimum.",
      buttons: [
        {
          label: "Reset & Calibrate Learning Rate",
          primary: true,
          onClick: () => startMissionTwoRealAttempt()
        }
      ]
    });
  }

  function startMissionTwoRealAttempt() {
    const lvl = LEVELS[1];
    inDemoPhase = false;
    x = lvl.startX;
    renderX = x;
    renderY = lvl.fn(x);
    steps = 0;
    overshotCount = 0;
    trail = [{ x: x, y: lvl.fn(x) }];
    fogRevealed = false;
    gameOver = false;

    document.getElementById("levelTitle").textContent = lvl.title;
    document.getElementById("levelDesc").textContent = lvl.desc;
    lrSlider.disabled = false;
    lrSlider.value = 0.40;
    lrValue.textContent = "0.40";
    stepBtn.disabled = false;
    fogToggleBtn.textContent = "Clear Fog: OFF";

    updateTelemetry();
    updateFormulaBar();
    setLog("Battery reset to 0 / 4. Lower your Learning Rate and land smoothly.", "");
    sideDrawer.classList.remove("open");
  }

  function evaluateStep(prevX, prevY, prevGrad, newY, diverged) {
    const lvl = LEVELS[currentLevel];
    const lr = Number(lrSlider.value);
    const newGrad = lvl.df(Math.max(-lvl.maxSafeX, Math.min(lvl.maxSafeX, x)));
    const crossedValley = (prevGrad < 0 && newGrad > 0) || (prevGrad > 0 && newGrad < 0);
    if (crossedValley) overshotCount++;

    updateTelemetry();
    updateFormulaBar();

    // 1. Check Divergence
    if (diverged) {
      gameOver = true;
      fogRevealed = true;
      recordHistory("Failed (Diverged)", steps, lr, lvl.failDivergeMath);
      setLog("SIGNAL LOST: Your dial was too high and launched the rover off the terrain.", "danger");
      openDrawer({
        tone: "fail",
        tag: "SIGNAL LOST • DIVERGED",
        title: lvl.failDivergeTitle,
        paragraphs: [lvl.failDivergeReason],
        mathText: lvl.failDivergeMath,
        buttons: [
          { label: "Try Again", primary: true, onClick: () => loadLevel(currentLevel, false) }
        ]
      });
      return;
    }

    // 2. Check Victory
    if (Math.abs(x - lvl.goalX) <= lvl.goalTolerance) {
      gameOver = true;
      fogRevealed = true;
      recordHistory("Completed", steps, lr, lvl.conceptSummary);
      updateTabs();
      setLog(`LANDING CONFIRMED: Reached the lowest point in ${steps} step${steps === 1 ? "" : "s"}!`, "success");

      let winReason = `You landed in ${steps} step${steps === 1 ? "" : "s"}.`;
      if (currentLevel === 0) {
        winReason += " Notice how your steps got smaller as you neared the bottom, even if you never moved the dial? That happens because the hill gets less steep near the bottom, so the slope number gets closer to zero.";
      } else if (currentLevel === 1) {
        winReason += " You adapted cleanly to the steeper Gradient without overshooting off the canyon.";
      } else {
        winReason += " You cleared the middle ridge and reached the deepest valley. A cautious Learning Rate from Mission 02 would have trapped you in that shallow dip on the left.";
      }

      const nextIdx = (currentLevel + 1) % LEVELS.length;
      openDrawer({
        tone: "win",
        tag: currentLevel === LEVELS.length - 1 ? "ALL MISSIONS COMPLETE" : `MISSION 0${currentLevel + 1} COMPLETE`,
        title: lvl.winTitle,
        paragraphs: [winReason],
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

    // 3. Check Out of Battery
    if (steps >= lvl.maxSteps) {
      gameOver = true;
      fogRevealed = true;
      const isLocalTrap = currentLevel === 2 && x < 0;
      recordHistory(isLocalTrap ? "Trapped (Local Min)" : "Out of Battery", steps, lr, lvl.failBatteryMath);
      setLog(
        isLocalTrap
          ? "BATTERY DEPLETED: Trapped in the shallow Local Minimum on the left."
          : "BATTERY DEPLETED: Ran out of your 4 steps before reaching the target.",
        "warn"
      );
      openDrawer({
        tone: "fail",
        tag: isLocalTrap ? "TRAPPED • LOCAL MINIMUM" : "OUT OF BATTERY",
        title: lvl.failBatteryTitle,
        paragraphs: [lvl.failBatteryReason],
        mathText: lvl.failBatteryMath,
        buttons: [
          { label: "Try Again", primary: true, onClick: () => loadLevel(currentLevel, false) }
        ]
      });
      return;
    }

    // 4. Mid-run Live Coaching
    stepBtn.disabled = false;
    if (newY > prevY + 0.1) {
      setLog("Diverging! You stepped higher up the opposite wall. Lower your dial immediately.", "danger");
    } else if (crossedValley) {
      setLog("Overshot the bottom! You crossed onto the opposite wall, so the slope reversed direction. Lower your dial to settle in.", "warn");
    } else if (Math.abs(x - prevX) < 0.25) {
      if (currentLevel === 2 && x < 0) {
        setLog("Your Gradient is nearly zero inside this shallow dip, so you barely move. You hit a Local Minimum. Reset and try a bolder Learning Rate to clear the ridge.", "warn");
      } else {
        setLog("Small step. At this pace you risk running out of battery in 4 steps.", "warn");
      }
    } else {
      setLog(lvl.aiMode ? "Smooth descent. Loss dropped and the Gradient flattened out." : "Good descent. Altitude dropped and the slope flattened out.", "");
    }
  }

  function recordHistory(status, stepsUsed, lastLr, note) {
    const rec = missionHistory[currentLevel];
    // Never overwrite a Completed status with a later failed replay
    if (rec.status === "Completed" && status !== "Completed") return;
    rec.status = status;
    rec.stepsUsed = stepsUsed;
    rec.lastLr = lastLr;
    rec.note = note;
    renderMissionLog();
  }

  function renderMissionLog() {
    const list = document.getElementById("missionLogList");
    list.innerHTML = missionHistory.map(m => {
      const isDone = m.status === "Completed";
      const isFail = m.status !== "Not Started" && !isDone;
      const badgeClass = isDone ? "done" : (isFail ? "failed" : "");
      const metaLine = m.stepsUsed !== null
        ? `Steps: ${m.stepsUsed} / 4 • Last Dial: ${m.lastLr.toFixed(2)}`
        : "Not attempted yet";
      return `
        <div class="log-card ${isDone ? "solved" : ""}">
          <div class="log-card-head">
            <span class="log-card-title">${m.shortName}</span>
            <span class="log-status ${badgeClass}">${m.status}</span>
          </div>
          <div class="log-card-meta">${metaLine}</div>
          <p class="log-card-note">${m.note}</p>
        </div>
      `;
    }).join("");
  }

  function drawScene(roverX, roverY, timestamp) {
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const W = rect.width || 760;
    const H = rect.height || 300;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const lvl = LEVELS[currentLevel];
    const xRange = lvl.maxSafeX + 0.4;
    const maxY = currentLevel === 1 ? 10.5 : 8.5;

    const mapX = v => ((v + xRange) / (xRange * 2)) * (W - 60) + 30;
    const mapY = v => H - 30 - (v / maxY) * (H - 60);

    // 1. Night Sky Background
    const skyGrad = ctx.createLinearGradient(0, 0, 0, H);
    skyGrad.addColorStop(0, "#070B14");
    skyGrad.addColorStop(1, "#0F172A");
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, W, H);

    stars.forEach(s => {
      ctx.fillStyle = `rgba(248, 250, 252, ${s.alpha})`;
      ctx.beginPath();
      ctx.arc(s.rx * W, s.ry * H, s.size, 0, Math.PI * 2);
      ctx.fill();
    });

    // 2. Mountain Terrain Fill + Glowing Curve
    ctx.beginPath();
    ctx.moveTo(mapX(-xRange), H);
    for (let i = 0; i <= 220; i++) {
      const vx = -xRange + (i / 220) * (xRange * 2);
      const vy = lvl.fn(vx);
      ctx.lineTo(mapX(vx), mapY(vy));
    }
    ctx.lineTo(mapX(xRange), H);
    ctx.closePath();

    const terrainGrad = ctx.createLinearGradient(0, H * 0.25, 0, H);
    terrainGrad.addColorStop(0, "rgba(56, 189, 248, 0.24)");
    terrainGrad.addColorStop(1, "rgba(15, 23, 42, 0.95)");
    ctx.fillStyle = terrainGrad;
    ctx.fill();

    ctx.beginPath();
    for (let i = 0; i <= 220; i++) {
      const vx = -xRange + (i / 220) * (xRange * 2);
      const vy = lvl.fn(vx);
      if (i === 0) ctx.moveTo(mapX(vx), mapY(vy));
      else ctx.lineTo(mapX(vx), mapY(vy));
    }
    ctx.strokeStyle = "#38BDF8";
    ctx.lineWidth = 3;
    ctx.stroke();

    // 3. Step Trail
    if (trail.length > 1) {
      ctx.beginPath();
      trail.forEach((pt, idx) => {
        const px = mapX(pt.x);
        const py = mapY(pt.y);
        if (idx === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      });
      ctx.strokeStyle = "rgba(251, 191, 36, 0.72)";
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.stroke();
      ctx.setLineDash([]);

      trail.slice(0, -1).forEach(pt => {
        ctx.beginPath();
        ctx.arc(mapX(pt.x), mapY(pt.y), 3.5, 0, Math.PI * 2);
        ctx.fillStyle = "#FBBF24";
        ctx.fill();
      });
    }

    // 4. Dark Fog of War Mask (Spotlight around Rover)
    const rx = mapX(roverX);
    const ry = mapY(roverY);

    if (!fogRevealed) {
      const fog = ctx.createRadialGradient(rx, ry, 36, rx, ry, 130);
      fog.addColorStop(0, "rgba(7, 11, 20, 0)");
      fog.addColorStop(0.65, "rgba(7, 11, 20, 0.84)");
      fog.addColorStop(1, "rgba(7, 11, 20, 0.96)");
      ctx.fillStyle = fog;
      ctx.fillRect(0, 0, W, H);
    }

    // 5. Blinking Green Landing Zone (Drawn ABOVE fog so it pulses through the dark!)
    const pulse = 0.55 + 0.45 * Math.sin((timestamp || 0) / 380);
    const gx = mapX(lvl.goalX);
    const gy = mapY(lvl.fn(lvl.goalX));
    const gLeft = mapX(lvl.goalX - lvl.goalTolerance);
    const gRight = mapX(lvl.goalX + lvl.goalTolerance);

    ctx.fillStyle = `rgba(52, 211, 153, ${0.14 + pulse * 0.22})`;
    ctx.fillRect(gLeft, gy - 42, gRight - gLeft, 50);

    ctx.strokeStyle = `rgba(52, 211, 153, ${0.5 + pulse * 0.5})`;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(gLeft, gy + 8);
    ctx.lineTo(gRight, gy + 8);
    ctx.stroke();

    // Pulsing Beacon Dot
    ctx.beginPath();
    ctx.arc(gx, gy - 6, 4.5 + pulse * 2.5, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(52, 211, 153, ${0.45 + pulse * 0.55})`;
    ctx.fill();

    ctx.fillStyle = `rgba(52, 211, 153, ${0.7 + pulse * 0.3})`;
    ctx.font = "700 10.5px 'JetBrains Mono', monospace";
    ctx.textAlign = "center";
    ctx.fillText(lvl.aiMode ? "GLOBAL MIN" : "LANDING ZONE", gx, gy + 23);

    // 6. Rover Avatar + Headlight Cone
    const slope = lvl.df(Math.max(-lvl.maxSafeX, Math.min(lvl.maxSafeX, roverX)));
    const dir = slope > 0 ? -1 : 1;

    if (!gameOver) {
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(rx + dir * 10, ry - 8);
      ctx.lineTo(rx + dir * 72, ry - 26);
      ctx.lineTo(rx + dir * 72, ry + 14);
      ctx.closePath();
      const beamGrad = ctx.createLinearGradient(rx, ry, rx + dir * 72, ry);
      beamGrad.addColorStop(0, "rgba(251, 191, 36, 0.38)");
      beamGrad.addColorStop(1, "rgba(251, 191, 36, 0)");
      ctx.fillStyle = beamGrad;
      ctx.fill();
      ctx.restore();
    }

    ctx.save();
    ctx.translate(rx, ry - 9);

    ctx.fillStyle = "#94A3B8";
    ctx.beginPath();
    ctx.arc(-7, 7, 3.8, 0, Math.PI * 2);
    ctx.arc(7, 7, 3.8, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = gameOver && missionHistory[currentLevel].status !== "Completed" ? "#FB7185" : "#FBBF24";
    ctx.beginPath();
    ctx.roundRect(-11, -4, 22, 10, 4);
    ctx.fill();

    ctx.fillStyle = "#38BDF8";
    ctx.beginPath();
    ctx.arc(dir * 3, -5, 5.5, Math.PI, 0);
    ctx.fill();

    ctx.strokeStyle = "#F8FAFC";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(-dir * 6, -4);
    ctx.lineTo(-dir * 8, -12);
    ctx.stroke();

    ctx.fillStyle = "#34D399";
    ctx.beginPath();
    ctx.arc(-dir * 8, -13, 2.2, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  init();
})();
// END OF FILE