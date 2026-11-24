// projects/linear-regression/levels.js
window.REGRESSION_LEVELS = [
  {
    id: 0,
    shortName: "01. Clean Relay",
    aiMode: false,
    title: "Mission 01: Align the Relay Beam",
    desc: "Each glowing square shows the power drain from missing a node. Adjust Beam Tilt and Beam Height to shrink the total Power Drain below the Target Max, then click Lock Alignment.",
    startM: 0.0,
    startB: 5.0,
    toleranceFactor: 1.45,
    points: [
      { x: 1.0, y: 1.8 },
      { x: 3.0, y: 4.1 },
      { x: 5.0, y: 4.6 },
      { x: 7.0, y: 7.2 },
      { x: 9.0, y: 8.3 }
    ],
    winTitle: "You Just Solved Ordinary Least Squares!",
    winMath: "Linear Regression finds the single straight line that minimizes the Sum of Squared Errors (SSE). Squaring every vertical gap forces the line to avoid big misses, because doubling a gap quadruples the size of its square.",
    winNoteLabel: "Ordinary Least Squares (OLS)",
    winNoteBody: "Linear Regression fits a line y = mx + b by minimizing the total area of the squared vertical gaps (residuals) between the data points and the line.",
    failNoteLabel: "Balancing Tilt & Height",
    failMath: "Even if the beam passes right through one or two nodes, leaving a big gap on another node creates a massive square that inflates total error. Balance the whole group together."
  },
  {
    id: 1,
    shortName: "02. Outlier Pull",
    aiMode: true,
    title: "Mission 02: The Outlier Anomaly",
    desc: "Five data points form a clean upward trend, but one far-away outlier sits at the bottom right. Notice how its giant error square pulls the optimal OLS line downward. Shrink SSE below the Target Max.",
    startM: 0.70,
    startB: 1.2,
    toleranceFactor: 1.12,
    points: [
      { x: 1.0, y: 2.0 },
      { x: 2.5, y: 3.1 },
      { x: 4.0, y: 4.2 },
      { x: 5.5, y: 5.3 },
      { x: 7.0, y: 6.4 },
      { x: 9.0, y: 1.8, outlier: true }
    ],
    winTitle: "Outlier Leverage Mastered!",
    winMath: "Because OLS squares every residual, a single extreme outlier creates a giant square that yanks the entire regression line toward it. That is why data scientists always plot their data and check for outliers before trusting a linear model.",
    winNoteLabel: "Outlier Leverage",
    winNoteBody: "Because residuals are squared, one far-away outlier produces a huge error penalty and pulls the OLS line away from the majority of the data.",
    failNoteLabel: "Ignoring an Outlier's Squared Penalty",
    failMath: "Fitting the 5 clean points looks intuitive, but the single outlier's squared residual dominates the total SSE. Tilting the line slightly downward dramatically shrinks that giant square."
  },
  {
    id: 2,
    shortName: "03. Noisy Sector",
    aiMode: true,
    title: "Mission 03: Human vs. Exact Math",
    desc: "Real-world data is noisy and trends can go downward (negative Slope). Tune your Slope and Intercept to beat the tight Target Max, then toggle 'Exact OLS' in the top bar to see how close you got to the closed-form solution.",
    startM: 0.20,
    startB: 4.0,
    toleranceFactor: 1.08,
    points: [
      { x: 1.0, y: 8.6 },
      { x: 2.0, y: 7.0 },
      { x: 3.2, y: 7.7 },
      { x: 4.5, y: 5.4 },
      { x: 5.5, y: 6.1 },
      { x: 6.8, y: 4.0 },
      { x: 8.0, y: 3.9 },
      { x: 9.0, y: 2.1 }
    ],
    winTitle: "Precision Fit Achieved!",
    winMath: "Even when data is noisy and slopes downward, there is always one unique line that minimizes SSE. In practice, AI systems either solve for this line directly with linear algebra or find it iteratively using Gradient Descent.",
    winNoteLabel: "Negative Slope & Unique Optimum",
    winNoteBody: "Every scatter plot has one unique OLS best-fit line. Comparing your intuition against the exact OLS line shows how close visual estimation gets to closed-form math.",
    failNoteLabel: "Fine-Tuning Noisy Data",
    failMath: "With noisy data, small adjustments to Slope and Intercept trade off error across multiple points. Watch the SSE readout on the left as you nudge each slider."
  }
];
// END OF FILE