// projects/gradient-descent/levels.js
window.DESCENT_LEVELS = [
  {
    id: 0,
    title: "Mission 01: The Foggy Valley",
    desc: "Guide the rover to the green landing beacon (minimum loss) in 7 steps or fewer. Too small drains your battery; too large launches you out of the canyon!",
    startX: -3.8,
    maxSteps: 7,
    goalX: 0,
    goalTolerance: 0.32,
    defaultLr: 0.35,
    maxSafeX: 4.8,
    // f(x) = 0.5x^2 + 0.6 -> f'(x) = 1.0x
    // Diverges if lr >= 2.0; oscillates if lr > 1.2; stalls if lr <= 0.15
    fn: x => 0.5 * x * x + 0.6,
    df: x => 1.0 * x,
    winMath: "You just executed Gradient Descent! In AI training, altitude is 'Loss' (model error), slope is the 'Gradient', and thruster power is the 'Learning Rate'. A balanced learning rate lands smoothly at the minimum.",
    failDivergeMath: "Your Learning Rate was too high (at or above 2.0 on this curve), causing 'Divergence'. Instead of descending, each step multiplied your error and launched the rover higher up the opposite cliff.",
    failBatteryMath: "Your Learning Rate was too timid (or bounced back and forth too much), draining your battery before reaching the bottom. In AI training, a tiny learning rate makes models train painfully slowly."
  },
  {
    id: 1,
    title: "Mission 02: The Steep Canyon",
    desc: "Warning: this canyon is 2.5x steeper! A step size that felt safe in Mission 01 will now launch you straight off the wall. Recalibrate your learning rate and land in 7 steps.",
    startX: -2.4,
    maxSteps: 7,
    goalX: 0,
    goalTolerance: 0.28,
    defaultLr: 0.90,
    maxSafeX: 3.4,
    // f(x) = 1.25x^2 + 0.6 -> f'(x) = 2.5x
    // Diverges if lr >= 0.80! Sweet spot is 0.20 - 0.55.
    fn: x => 1.25 * x * x + 0.6,
    df: x => 2.5 * x,
    winMath: "Because the slope (gradient) is much steeper here, multiplying it by a big learning rate creates massive jumps. AI engineers scale down the learning rate on steep loss landscapes to keep training stable.",
    failDivergeMath: "Divergence! On a steep curve, even a moderate Learning Rate (0.80+) multiplies by a huge gradient and flings the rover out of the canyon. Lower the slider to around 0.25 to 0.50.",
    failBatteryMath: "Out of battery! Either your step size was too tiny to reach the center, or it bounced back and forth across the canyon walls. Aim for a smooth, steady descent."
  },
  {
    id: 2,
    title: "Mission 03: The False Bottom",
    desc: "Real AI loss landscapes have traps! There is a shallow dip nearby (Local Minimum) and a deeper canyon to the right (Global Minimum). Escape the shallow dip and land in the deep beacon in 8 steps!",
    startX: -3.2,
    maxSteps: 8,
    goalX: 2.0,
    goalTolerance: 0.45,
    defaultLr: 0.25,
    maxSafeX: 4.5,
    // Double-well potential: local min at -1.8 (y=3.12), ridge at -0.3 (y=3.54), global min at 2.0 (y=2.20)
    // Small lr (0.20) traps in local min (-1.8). Bold lr (~0.65-0.75) jumps over ridge to +0.5 -> converges to 2.0!
    fn: x => 0.0625 * Math.pow(x, 4) + 0.00833 * Math.pow(x, 3) - 0.4575 * Math.pow(x, 2) - 0.27 * x + 3.5,
    df: x => 0.25 * Math.pow(x, 3) + 0.025 * Math.pow(x, 2) - 0.915 * x - 0.27,
    winMath: "You escaped the Local Minimum! By using a bolder step size at the start, you carried enough momentum to clear the middle ridge and discover the true Global Minimum.",
    failDivergeMath: "Too much thrust! Your step size launched the rover past the deep canyon and off the far edge of the map. Try a bold but controlled step size around 0.60 to 0.80.",
    failBatteryMath: "Trapped in the False Bottom! A cautious step size settles into the first shallow dip it finds (a Local Minimum) and never discovers the deeper valley. Try a bolder initial step (around 0.65 to 0.75) to jump the ridge!"
  }
];
// END OF FILE