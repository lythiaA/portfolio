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
  const outcomeOverlay = document.getElementById("outcomeOverlay");
  const outcomeCard = document.getElementById("outcomeCard");

  let currentLevel = 0;
  let solved = LEVELS.map(() => false);
  let x = 0;
  let steps = 0;
  let trail = [];
  let fogRevealed = false;
  let gameOver = false;
  let isAnimating = false;
  let animFrameId = null;
  let overshotCount = 0;

  const stars = Array.from({ length: 45 }, () => ({
    rx: Math.random(),
    ry: Math.random() * 0.55,
    size: Math.random() * 1.6 + 0.5,
    alpha: Math.random() * 0.5 + 0.2
  }));

  function init() {
    lrSlider.addEventListener("input", () => {
      lrValue.textContent = Number(lrSlider.value).toFixed(2);
    });

    stepBtn.addEventListener("click", handleStep);
    resetBtn.addEventListener("click", () => loadLevel(currentLevel));
    fogToggleBtn.addEventListener("click", () => {
      fogRevealed = !fogRevealed;
      fogToggleBtn.textContent = fogRevealed ? "Clear Mist: ON" : "Clear Mist: OFF";
      drawScene(x, LEVELS[currentLevel].fn(x));
    });

    document.querySelectorAll(".lvl-pill").forEach(btn => {
      btn.addEventListener("click", () => {
        loadLevel(Number(btn.dataset.lvl));
      });
    });

    document.getElementById("overlayRetryBtn").addEventListener("click", () => {
      loadLevel(currentLevel);
    });

    document.getElementById("overlayNextBtn").addEventListener("click", () => {
      const next = (currentLevel + 1) % LEVELS.length;
      loadLevel(next);
    });

    window.addEventListener("resize", () => {
      if (!isAnimating) drawScene(x, LEVELS[currentLevel].fn(x));
    });

    loadLevel(0);
    // Ensure a clean redraw once browser layout finishes
    requestAnimationFrame(() => drawScene(x, LEVELS[currentLevel].fn(x)));
  }

  function loadLevel(idx) {
    if (animFrameId) {
      cancelAnimationFrame(animFrameId);
      animFrameId = null;
    }

    currentLevel = idx;
    const lvl = LEVELS[idx];
    x = lvl.startX;
    steps = 0;
    overshotCount = 0;
    trail = [{ x: x, y: lvl.fn(x) }];
    fogRevealed = false;
    gameOver = false;
    isAnimating = false;

    document.getElementById("levelTitle").textContent = lvl.title;
    document.getElementById("levelDesc").textContent = lvl.desc;
    lrSlider.value = lvl.defaultLr;
    lrValue.textContent = lvl.defaultLr.toFixed(2);
    stepBtn.disabled = false;
    fogToggleBtn.textContent = "Clear Mist: OFF";
    outcomeOverlay.classList.add("hidden");

    updateTabs();
    updateTelemetry();
    setLog("Rover deployed. Adjust the Learning Rate and fire thrusters to reach the green beacon.", "");
    drawScene(x, lvl.fn(x));
  }

  function updateTabs() {
    document.querySelectorAll(".lvl-pill").forEach((btn, i) => {
      btn.classList.toggle("active", i === currentLevel);
      btn.classList.toggle("solved", solved[i]);
    });
  }

  function updateTelemetry() {
    const lvl = LEVELS[currentLevel];
    document.getElementById("stepsDisplay").textContent = `${steps} / ${lvl.maxSteps}`;
    document.getElementById("lossDisplay").textContent = lvl.fn(x).toFixed(2);
    document.getElementById("gradDisplay").textContent = lvl.df(x).toFixed(2);
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

    function animateHop(now) {
      const p = Math.min(1, (now - t0) / duration);
      const ease = 1 - Math.pow(1 - p, 3);
      const curX = startX + (targetX - startX) * ease;
      const baseLineY = startY + (targetY - startY) * ease;
      const arcLift = Math.sin(p * Math.PI) * 0.75;
      drawScene(curX, baseLineY + arcLift);

      if (p < 1) {
        animFrameId = requestAnimationFrame(animateHop);
      } else {
        animFrameId = null;
        isAnimating = false;
        x = targetX;
        trail.push({ x: x, y: targetY });
        evaluateStep(startX, startY, prevGrad, targetY, diverged);
      }
    }

    animFrameId = requestAnimationFrame(animateHop);
  }

  function evaluateStep(prevX, prevY, prevGrad, newY, diverged) {
    const lvl = LEVELS[currentLevel];
    const newGrad = lvl.df(Math.max(-lvl.maxSafeX, Math.min(lvl.maxSafeX, x)));
    const crossedValley = (prevGrad < 0 && newGrad > 0) || (prevGrad > 0 && newGrad < 0);
    if (crossedValley) overshotCount++;

    updateTelemetry();

    // 1. Check Divergence Crash
    if (diverged) {
      gameOver = true;
      fogRevealed = true;
      drawScene(x, newY);
      setLog("SIGNAL LOST: Your learning rate was too large and launched the rover off the canyon!", "danger");
      showOutcome(
        false,
        "MISSION FAILED • DIVERGED",
        "Overshot the Canyon!",
        `Your Learning Rate of ${Number(lrSlider.value).toFixed(2)} multiplied by the slope (${prevGrad.toFixed(2)}) threw the rover completely off the terrain.`,
        lvl.failDivergeMath
      );
      return;
    }

    // 2. Check Victory
    if (Math.abs(x - lvl.goalX) <= lvl.goalTolerance) {
      gameOver = true;
      fogRevealed = true;
      solved[currentLevel] = true;
      updateTabs();
      drawScene(x, newY);

      const oscillationNote = overshotCount > 0
        ? "Notice how you overshot the bottom at first, then the reversed slope pulled you back in (damped oscillation)."
        : "You tuned the learning rate cleanly and guided the rover smoothly into the lowest valley without overshooting.";

      setLog(`LANDING CONFIRMED: Reached minimum loss in ${steps} step${steps === 1 ? "" : "s"}!`, "success");
      showOutcome(
        true,
        "MISSION COMPLETE",
        `Beacon Reached in ${steps} Step${steps === 1 ? "" : "s"}!`,
        oscillationNote,
        lvl.winMath
      );
      return;
    }

    // 3. Check Battery Depleted
    if (steps >= lvl.maxSteps) {
      gameOver = true;
      fogRevealed = true;
      drawScene(x, newY);
      const isLocalTrap = currentLevel === 2 && x < 0;
      setLog(
        isLocalTrap
          ? "BATTERY DEPLETED: Trapped in the shallow Local Minimum on the left."
          : "BATTERY DEPLETED: Ran out of steps before reaching the green beacon.",
        "warn"
      );
      showOutcome(
        false,
        isLocalTrap ? "MISSION FAILED • LOCAL MINIMUM" : "MISSION FAILED • OUT OF BATTERY",
        isLocalTrap ? "Trapped in the False Bottom!" : "Out of Battery!",
        isLocalTrap
          ? "The rover settled into the shallow dip on the left and never crossed the ridge to the deeper Global Minimum."
          : "You ran out of your 5 steps before reaching the green landing zone. Adjust your Learning Rate and try again.",
        lvl.failBatteryMath
      );
      return;
    }

    // 4. Mid-run Live Coaching
    stepBtn.disabled = false;
    drawScene(x, newY);

    if (newY > prevY + 0.1) {
      setLog("Diverging! You jumped higher up the opposite wall. Lower your Learning Rate immediately.", "danger");
    } else if (crossedValley) {
      setLog("Overshot the bottom! You jumped past the valley onto the opposite wall, so the slope reversed direction. Lower your Learning Rate to settle in.", "warn");
    } else if (Math.abs(x - prevX) < 0.25) {
      if (currentLevel === 2 && x < 0) {
        setLog("Barely moving inside a shallow dip! Try a larger Learning Rate to clear the ridge ahead.", "warn");
      } else {
        setLog("Tiny step! You risk running out of battery. Try increasing your Learning Rate.", "warn");
      }
    } else {
      setLog("Smooth descent! Altitude (Loss) dropped without overshooting.", "");
    }
  }

  function showOutcome(isWin, tag, title, reason, mathText) {
    outcomeCard.classList.toggle("fail", !isWin);
    document.getElementById("outcomeTag").textContent = tag;
    document.getElementById("outcomeTitle").textContent = title;
    document.getElementById("outcomeReason").textContent = reason;
    document.getElementById("outcomeMath").textContent = mathText;

    const nextBtn = document.getElementById("overlayNextBtn");
    if (isWin) {
      nextBtn.style.display = "inline-block";
      nextBtn.textContent = currentLevel < LEVELS.length - 1 ? "Next Mission →" : "Replay Mission 01 ↺";
    } else {
      nextBtn.style.display = "none";
    }

    outcomeOverlay.classList.remove("hidden");
  }

  function drawScene(roverX, roverY) {
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const W = rect.width || 760;
    const H = rect.height || 340;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const lvl = LEVELS[currentLevel];
    const xRange = lvl.maxSafeX + 0.4;
    const maxY = currentLevel === 1 ? 10.5 : 8.5;

    const mapX = v => ((v + xRange) / (xRange * 2)) * (W - 60) + 30;
    const mapY = v => H - 34 - (v / maxY) * (H - 68);

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

    // 3. Green Landing Beacon (Goal Zone)
    const gx = mapX(lvl.goalX);
    const gy = mapY(lvl.fn(lvl.goalX));
    const gLeft = mapX(lvl.goalX - lvl.goalTolerance);
    const gRight = mapX(lvl.goalX + lvl.goalTolerance);

    ctx.fillStyle = "rgba(52, 211, 153, 0.22)";
    ctx.fillRect(gLeft, gy - 45, gRight - gLeft, 55);
    ctx.strokeStyle = "#34D399";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(gLeft, gy + 8);
    ctx.lineTo(gRight, gy + 8);
    ctx.stroke();

    // 4. Hop Trail
    if (trail.length > 1) {
      ctx.beginPath();
      trail.forEach((pt, idx) => {
        const px = mapX(pt.x);
        const py = mapY(pt.y);
        if (idx === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      });
      ctx.strokeStyle = "rgba(251, 191, 36, 0.7)";
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

    // 5. Light Translucent Mist (Terrain stays visible on frame 1)
    const rx = mapX(roverX);
    const ry = mapY(roverY);

    if (!fogRevealed) {
      const mist = ctx.createRadialGradient(rx, ry, 55, rx, ry, 210);
      mist.addColorStop(0, "rgba(7, 11, 20, 0)");
      mist.addColorStop(0.65, "rgba(7, 11, 20, 0.35)");
      mist.addColorStop(1, "rgba(7, 11, 20, 0.55)");
      ctx.fillStyle = mist;
      ctx.fillRect(0, 0, W, H);
    }

    // 6. Rover Avatar + Headlamp Cone
    const slope = lvl.df(Math.max(-lvl.maxSafeX, Math.min(lvl.maxSafeX, roverX)));
    const dir = slope > 0 ? -1 : 1;

    if (!gameOver) {
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(rx + dir * 10, ry - 8);
      ctx.lineTo(rx + dir * 68, ry - 26);
      ctx.lineTo(rx + dir * 68, ry + 14);
      ctx.closePath();
      const beamGrad = ctx.createLinearGradient(rx, ry, rx + dir * 68, ry);
      beamGrad.addColorStop(0, "rgba(251, 191, 36, 0.35)");
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

    ctx.fillStyle = gameOver && !solved[currentLevel] ? "#FB7185" : "#FBBF24";
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

    // Always label the Goal Zone clearly
    ctx.fillStyle = "#34D399";
    ctx.font = "700 11px 'JetBrains Mono', monospace";
    ctx.textAlign = "center";
    ctx.fillText("GLOBAL MIN", gx, gy + 24);
  }

  init();
})();
// END OF FILE