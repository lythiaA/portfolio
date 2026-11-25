// projects/cash-harvest/levels.js
window.VAULT_LEVELS = [
  {
    id: 0,
    shortName: "01. Hidden Odds",
    aiMode: false,
    turns: 15,
    targetCash: 90,
    title: "Mission 01: Find the Best Cash Vault",
    desc: "Clicking a vault gives you a chance to win $10, or $0 if it comes up empty. You do not know the hidden odds. Bank $90 in 15 turns using Test (1 Turn) to gather clues, then Commit All when you spot the strongest vault.",
    vaultConfigs: [
      { role: "weak", prob: 0.20, payout: 10 },
      { role: "medium", prob: 0.45, payout: 10 },
      { role: "best", prob: 0.85, payout: 10 }
    ],
    winTitle: "You Just Solved a Multi-Armed Bandit!",
    winMath: "This exact puzzle is how recommendation engines (like Netflix and TikTok) and A/B testing systems work. They balance testing unknown options against cashing in on the strongest option to maximize total reward.",
    winNoteLabel: "Exploration vs. Exploitation",
    winNoteBody: "Testing vaults gathers Empirical Probability data (Exploration), while committing to the highest-paying vault maximizes reward (Exploitation)."
  },
  {
    id: 1,
    shortName: "02. High Stakes",
    aiMode: true,
    turns: 15,
    targetCash: 140,
    title: "Mission 02: High Stakes & Mixed Payouts",
    desc: "Each Cash Vault now pays a different dollar amount ($5, $25, or $65) when it hits, and their hidden odds are unknown. Bank $140 in 15 turns by watching each vault's Avg / Turn (Expected Value).",
    vaultConfigs: [
      { role: "safe", prob: 0.90, payout: 5 },      // EV = $4.50 / turn
      { role: "best", prob: 0.55, payout: 25 },     // EV = $13.75 / turn
      { role: "jackpot", prob: 0.07, payout: 65 }   // EV = $4.55 / turn
    ],
    winTitle: "You Beat the Jackpot Trap!",
    winMath: "Expected Value equals Probability multiplied by Dollar Payout. The $5 vault hits 90% of the time ($4.50/turn) and the $65 jackpot only hits 7% of the time ($4.55/turn). The $25 vault at 55% quietly wins with $13.75/turn.",
    winNoteLabel: "Expected Value (E[X]) & The Jackpot Trap",
    winNoteBody: "Expected Value (Probability x Payout) reveals the true long-run winner, exposing both frequent tiny payouts and rare flashy jackpots as traps."
  },
  {
    id: 2,
    shortName: "03. Shifting Signals",
    aiMode: true,
    turns: 15,
    targetCash: 80,
    shiftAfterTurn: 7,
    title: "Mission 03: Adapt to Shifting Odds",
    desc: "Warning: vault odds are unstable and will shift halfway through the run. Bank $80 in 15 turns. Watch your recent hits closely, and be careful about clicking Commit All too early.",
    vaultConfigs: [
      { role: "fades", prob: 0.85, shiftedProb: 0.15, payout: 10 },
      { role: "steady", prob: 0.45, shiftedProb: 0.45, payout: 10 },
      { role: "surges", prob: 0.15, shiftedProb: 0.85, payout: 10 }
    ],
    winTitle: "You Adapted to Data Drift!",
    winMath: "In the real world, user habits and markets change over time (Data Drift). AI systems that stop exploring forever get stuck on outdated winners. That is why algorithms like Epsilon-Greedy always keep testing.",
    winNoteLabel: "Data Drift & Adaptive Exploration",
    winNoteBody: "When probabilities shift over time, locking in permanently fails. Smart AI models detect drops in performance and resume exploring."
  }
];
// END OF FILE