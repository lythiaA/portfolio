// projects/portal-harvest/levels.js
window.PORTAL_LEVELS = [
  {
    id: 0,
    shortName: "01. Hidden Odds",
    aiMode: false,
    turns: 15,
    targetEnergy: 90,
    title: "Mission 01: Find the Strongest Portal",
    desc: "Each portal pays +10 Energy on a hit, but their hidden hit rates are different. Collect 90 Energy in 15 turns. Use Test (1 Turn) to probe, or Commit All once you spot the winner.",
    // Shuffled at runtime so players cannot memorize positions
    portalConfigs: [
      { label: "Weak", prob: 0.20, payout: 10 },
      { label: "Medium", prob: 0.45, payout: 10 },
      { label: "Strong", prob: 0.85, payout: 10 }
    ],
    winTitle: "You Just Solved a Multi-Armed Bandit!",
    winMath: "This exact puzzle is how recommendation systems (like Netflix and TikTok) and A/B testing engines work. They balance testing unknown options against cashing in on the current winner to maximize total reward.",
    winNoteLabel: "Exploration vs. Exploitation",
    winNoteBody: "Testing portals gathers Empirical Probability data (Exploration), while committing to the best portal maximizes reward (Exploitation).",
    failTitle: "Short of the Energy Target",
    failMath: "Either you spent too many turns testing weak portals, or you locked onto a medium portal before gathering enough evidence. Try probing each portal a couple of times, then commit to the clear leader.",
    failNoteLabel: "Balancing Exploration Time"
  },
  {
    id: 1,
    shortName: "02. Jackpot Trap",
    aiMode: true,
    turns: 15,
    targetEnergy: 120,
    title: "Mission 02: Beat the Jackpot Trap",
    desc: "Now each portal pays a different reward (+5, +20, or +60). Reach 120 Energy in 15 turns. Watch each portal's Expected Value (Avg / Turn), not just how often it hits or how big the jackpot looks.",
    portalConfigs: [
      { label: "Safe", prob: 0.90, payout: 5 },      // EV = 4.5
      { label: "Balanced", prob: 0.55, payout: 20 }, // EV = 11.0
      { label: "Jackpot", prob: 0.12, payout: 60 }   // EV = 7.2
    ],
    winTitle: "Expected Value Mastered!",
    winMath: "Expected Value equals Probability multiplied by Payout. A portal that hits 90% of the time for +5 only averages 4.5 per turn, while a rare +60 jackpot at 12% averages 7.2. The +20 portal at 55% quietly wins with 11.0 per turn.",
    winNoteLabel: "Expected Value (E[X])",
    winNoteBody: "Expected Value (Probability x Payout) reveals the true long-run winner, exposing both frequent tiny payouts and rare flashy jackpots as traps.",
    failTitle: "Caught in a Payout Trap",
    failMath: "High hit frequency (+5) and flashy jackpots (+60) both have lower Expected Value than the balanced +20 portal. Compare the Avg / Turn readout on each card before committing.",
    failNoteLabel: "Why Expected Value Beats Raw Hit Rate"
  },
  {
    id: 2,
    shortName: "03. Shifting Signals",
    aiMode: true,
    turns: 15,
    targetEnergy: 80,
    shiftAfterTurn: 7,
    title: "Mission 03: Adapt to Shifting Signals",
    desc: "Warning: portal stability is degrading. Halfway through the mission, the strongest portal will overheat while a weak one surges. Reach 80 Energy in 15 turns, and be careful about committing too early.",
    portalConfigs: [
      { label: "Fades", prob: 0.85, shiftedProb: 0.15, payout: 10 },
      { label: "Steady", prob: 0.45, shiftedProb: 0.45, payout: 10 },
      { label: "Surges", prob: 0.15, shiftedProb: 0.85, payout: 10 }
    ],
    winTitle: "You Adapted to Data Drift!",
    winMath: "In the real world, user preferences and market patterns change over time (Data Drift). AI systems that stop exploring forever get stuck on outdated winners. That is why algorithms like Epsilon-Greedy always save a small budget to keep testing.",
    winNoteLabel: "Data Drift & Adaptive Exploration",
    winNoteBody: "When probabilities shift over time (non-stationary environments), locking in permanently fails. Smart AI models detect drops in performance and resume exploring.",
    failTitle: "Outdated Strategy Caught by Data Drift",
    failMath: "Halfway through the run, your early winner overheated from 85% down to 15% while another portal surged to 85%. If you commit all turns early or ignore a cold streak, Data Drift drains your remaining budget.",
    failNoteLabel: "The Risk of Locking In Under Data Drift"
  }
];
// END OF FILE