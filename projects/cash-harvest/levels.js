// projects/cash-harvest/levels.js
window.VAULT_LEVELS = [
  {
    id: 0,
    shortName: "01. Hidden Odds",
    aiMode: false,
    turns: 30,
    targetCash: 180,
    title: "Mission 01: Find the Best Cash Vault",
    desc: "Clicking a vault gives you a chance to win $10, or $0 if it comes up empty. You do not know the hidden odds. Bank $180 in 30 turns using Test x1 or Test x5 to gather clues, then Commit All when you spot the strongest vault.",
    vaultConfigs: [
      { role: "weak", prob: 0.20, payout: 10 },
      { role: "medium", prob: 0.45, payout: 10 },
      { role: "best", prob: 0.85, payout: 10 }
    ],
    winTitle: "You Just Solved a Multi-Armed Bandit!",
    winFormula: "",
    winMath: "A Multi-Armed Bandit is a classic probability problem where you choose between several options with unknown rewards, balancing testing against cashing in. Recommendation engines like Netflix and TikTok use this exact math to decide when to test new content and when to show your proven favorites.",
    winNoteLabel: "Multi-Armed Bandit & Exploration vs. Exploitation",
    winNoteBody: "A Multi-Armed Bandit balances two actions: Exploration, which means testing unknown vaults to estimate their odds, and Exploitation, which means committing to the strongest vault to maximize your reward."
  },
  {
    id: 1,
    shortName: "02. High Stakes",
    aiMode: true,
    turns: 30,
    targetCash: 275,
    title: "Mission 02: High Stakes & Mixed Payouts",
    desc: "Each Cash Vault now pays a different dollar amount ($5, $25, or $65) when it hits, and their hidden odds are unknown. Bank $275 in 30 turns by comparing each vault's average return per turn.",
    vaultConfigs: [
      { role: "safe", prob: 0.90, payout: 5 },      // EV = $4.50 / turn
      { role: "best", prob: 0.55, payout: 25 },     // EV = $13.75 / turn
      { role: "jackpot", prob: 0.07, payout: 65 }   // EV = $4.55 / turn
    ],
    winTitle: "Expected Utility Mastered!",
    winFormula: "Expected Value = Probability x Payout",
    winMath: "In AI decision theory, models maximize Expected Utility rather than chasing the highest hit rate or the biggest rare payout. Here, the $5 vault averages $4.50 per turn and the $65 jackpot averages $4.55 per turn, while the $25 vault at 55% wins with $13.75 per turn.",
    winNoteLabel: "Expected Utility & Expected Value",
    winNoteBody: "Expected Value equals Probability multiplied by Payout. AI models use Expected Utility to pick the option with the highest long-run average return instead of being fooled by frequent tiny wins or rare jackpots."
  },
  {
    id: 2,
    shortName: "03. Shifting Signals",
    aiMode: true,
    turns: 30,
    targetCash: 150,
    shiftAfterTurn: 15,
    title: "Mission 03: Adapt to Shifting Odds",
    desc: "Warning: vault odds are unstable and will shift halfway through the run at Turn 15. Bank $150 in 30 turns. Watch your recent hits closely, and be careful about clicking Commit All too early.",
    vaultConfigs: [
      { role: "fades", prob: 0.85, shiftedProb: 0.15, payout: 10 },
      { role: "steady", prob: 0.45, shiftedProb: 0.45, payout: 10 },
      { role: "surges", prob: 0.15, shiftedProb: 0.85, payout: 10 }
    ],
    winTitle: "You Adapted to Data Drift!",
    winFormula: "",
    winMath: "In the real world, user habits and markets change over time. In AI, this is called Data Drift. Because yesterday's best option can suddenly drop in performance, smart AI models keep monitoring recent results and resume exploring whenever performance falls.",
    winNoteLabel: "Data Drift & Adaptive Exploration",
    winNoteBody: "Data Drift happens when real-world probabilities change over time. Locking into an early winner forever fails when conditions shift, so AI models must detect cold streaks and re-explore."
  }
];
// END OF FILE