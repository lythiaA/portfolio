// projects/gradient-descent/levels.js
window.DESCENT_LEVELS = [
  {
    id: 0,
    title: "Mission 01: The Foggy Valley",
    desc: "Guide the rover to the green landing beacon (minimum loss) in 5 steps or fewer. Too small drains your battery; too large launches you out of the canyon.",
    startX: -3.6,
    maxSteps: 5,
    goalX: 0,
    goalTolerance: 0.35,
    defaultLr: 0.50,
    maxSafeX: 4.6,
    // f(x) = 0.5x^2 + 0.5 -> f'(x) = 1.0x
    // Sweet spot: 0.45 - 0.85 (wins in 2-4 steps). Diverges at 2.0+. Stalls <= 0.20.
    fn: x => 0.5 * x * x + 0.5,
    df: x => 1.0 * x,
    winMath: "You just ran Gradient Descent! In AI training, altitude is 'Loss' (model error), slope is the 'Gradient', and thruster power is the 'Learning Rate'. A balanced learning rate lands smoothly at the minimum.",
    failDivergeMath: "Your Learning Rate was too high (2.0 or above on this curve), causing 'Divergence'. Instead of descending, each step multiplied your error and launched the rover off the canyon.",
    failBatteryMath: "Your Learning Rate was too small (or bounced back and forth too much), draining your 5-step battery before reaching the bottom. In AI training, a tiny learning rate makes models train too slowly."
  },
  {
    id: 1,
    title: "Mission 02: The Steep Canyon",
    desc: "This canyon is 2.5x steeper! A learning rate that worked in Mission 01 can now launch you straight off the wall. Recalibrate and land in 5 steps or fewer.",
    startX: -2.4,
    maxSteps: 5,
    goalX: 0,
    goalTolerance: 0.30,
    defaultLr: 0.85,
    maxSafeX: 3.4,
    // f(x) = 1.25x^2 + 0.5 -> f'(x) = 2.5x
    // Sweet spot: 0.25 - 0.55 (wins in 2-3 steps). Diverges at 0.80+. Stalls <= 0.15.
    fn: x => 1.25 * x * x + 0.5,
    df: x => 2.5 * x,
    winMath: "Because the slope (gradient) is much steeper here, multiplying it by a big learning rate creates massive jumps. AI engineers scale down the learning rate on steep loss landscapes to keep training stable.",
    failDivergeMath: "Divergence! On a steep curve, even a moderate Learning Rate (0.80+) multiplies by a huge gradient and flings the rover out of the canyon. Lower the slider to around 0.25 to 0.50.",
    failBatteryMath: "Out of battery! Either your step size was too tiny to reach the center in 5 steps, or it bounced back and forth across the canyon walls. Aim for a smooth, steady descent."
  },
  {
    id: 2,
    title: "Mission 03: The False Bottom",
    desc: "Real AI loss landscapes have traps! There is a shallow dip nearby (Local Minimum) and a deeper canyon to the right (Global Minimum). Escape the shallow dip and land in the deep beacon in 5 steps or fewer.",
    startX: -3.2,
    maxSteps: 5,
    goalX: 2.0,
    goalTolerance: 0.45,
    defaultLr: 0.25,
    maxSafeX: 4.5,
    // Local min at -1.8, ridge at -0.3, global min at +2.0.
    // Small lr (~0.25) traps in local min. Bold lr (~0.65 - 0.75) jumps the ridge and wins in 3-4 steps.
    fn: x => 0.0625 * Math.pow(x, 4) + 0.00833 * Math.pow(x, 3) - 0.4575 * Math.pow(x, 2) - 0.27 * x + 3.5,
    df: x => 0.25 * Math.pow(x, 3) + 0.025 * Math.pow(x, 2) - 0.915 * x - 0.27,
    winMath: "You escaped the Local Minimum! By using a bolder learning rate at the start, you carried enough momentum to clear the middle ridge and discover the true Global Minimum.",
    failDivergeMath: "Too much thrust! Your learning rate launched the rover past the deep canyon and off the far edge of the map. Try a controlled step size around 0.65 to 0.75.",
    failBatteryMath: "Trapped in the False Bottom! A cautious learning rate settles into the first shallow dip it finds (a Local Minimum) and never discovers the deeper valley. Try a bolder initial step (around 0.65 to 0.75) to jump the ridge."
  }
];
// END OF FILE