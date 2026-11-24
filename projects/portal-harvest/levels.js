// projects/central-limit-theorem/levels.js
window.CLT_LEVELS = [
  {
    id: 0,
    shortName: "01. Break the Bell",
    aiMode: false,
    editable: true,
    startN: 1,
    minNToWin: 15,
    minBatchesToWin: 200,
    title: "Mission 01: Try to Break the Collector",
    desc: "Click and drag across the top bars to sculpt any weird shape you want. Fire 200 batches at Batch Size 1 first, then raise Batch Size to 15 or higher and fire 200 batches again.",
    // Starts with a dramatic U-shape (two spikes on opposite walls)
    weights: [95, 72, 35, 10, 4, 2, 2, 2, 2, 2, 2, 4, 10, 35, 72, 95],
    winTitle: "You Just Discovered the Central Limit Theorem!",
    winMath: "The Central Limit Theorem is why AI evaluation, A/B testing, and confidence intervals work. Even when raw user data is chaotic and lopsided, the average of enough samples behaves predictably like a Bell Curve.",
    winNoteLabel: "Central Limit Theorem (CLT)",
    winNoteBody: "No matter how wild or lopsided the original Population Distribution is, plotting the averages of large enough samples always converges toward a smooth Normal Distribution (Bell Curve)."
  },
  {
    id: 1,
    shortName: "02. Narrow the Target",
    aiMode: true,
    editable: false,
    startN: 2,
    targetMaxSE: 1.05,
    minBatchesToWin: 200,
    showPrecisionZone: true,
    title: "Mission 02: Shrink the Spread (Standard Error)",
    desc: "The Population above is completely flat (Uniform). Increase Sample Size (n) and fire 200 batches until your Sampling Distribution narrows tightly enough to hit a Std Error of 1.05 or lower inside the green zone.",
    weights: [60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60],
    winTitle: "Precision Achieved!",
    winMath: "Increasing Sample Size (n) does not just make the curve look normal. It shrinks the spread (Standard Error) by a factor of 1 / sqrt(n). In AI benchmarking, larger test sets give you tighter, more trustworthy accuracy scores.",
    winNoteLabel: "Standard Error & Precision",
    winNoteBody: "Larger Sample Sizes (n) pull sample averages tighter around the true mean, shrinking the Standard Error by 1 / sqrt(n)."
  },
  {
    id: 2,
    shortName: "03. Extreme Skew",
    aiMode: true,
    editable: false,
    startN: 2,
    minNToWin: 25,
    minBatchesToWin: 200,
    title: "Mission 03: Tame an ExtrAeme Skew",
    desc: "Real-world data (like income or viral views) is often heavily skewed. Test a small Sample Size (n = 2) to see the skew survive, then raise n high enough (25+) and fire 200 batches to force a symmetric Bell Curve.",
    weights: [100, 75, 45, 24, 14, 8, 5, 3, 2, 2, 1, 1, 1, 1, 1, 1],
    winTitle: "You Mastered the Central Limit Theorem!",
    winMath: "The more skewed your raw data is, the larger Sample Size (n) you need before the Bell Curve takes over. That is why statisticians use the classic n >= 30 rule of thumb when dealing with messy, real-world data.",
    winNoteLabel: "Skewness & The n >= 30 Rule",
    winNoteBody: "Heavily skewed populations stay lopsided at small sample sizes, requiring larger n (often 25 to 30+) before the Sampling Distribution becomes symmetric."
  }
];
// END OF FILE