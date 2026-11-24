// projects/matrix-transformations/levels.js
window.MATRIX_LEVELS = [
  {
    id: 0,
    shortName: "01. Stretch Grid",
    aiMode: false,
    title: "Mission 01: Match the Target Silhouette",
    desc: "Adjust the Width and Height dials to warp the grid until your ship locks cleanly inside the pulsing green silhouette, then click Lock Warp.",
    start: { a: 1.0, b: 0.0, c: 0.0, d: 1.0 },
    target: { a: 2.0, b: 0.0, c: 0.0, d: 0.5 },
    sliders: [
      {
        key: "a",
        label: "WIDTH DIAL",
        tip: "",
        min: 0.5,
        max: 2.5,
        step: 0.1
      },
      {
        key: "d",
        label: "HEIGHT DIAL",
        tip: "",
        min: 0.5,
        max: 2.5,
        step: 0.1
      }
    ],
    winTitle: "You Just Applied a Matrix Transformation!",
    winMath: "Every layer inside a neural network multiplies incoming data by a matrix. Instead of just doing arithmetic, AI is literally stretching and reshaping data space so patterns become easier to separate.",
    winNoteLabel: "Scaling Matrix & Basis Vectors",
    winNoteBody: "Diagonal entries (a and d) stretch or squish space along the X and Y axes. Wherever the two Basis Vectors land, the entire grid follows automatically.",
    failTitle: "Not Quite Locked In",
    failHint: "Watch the two glowing guide arrows—match the green outline's width first, then adjust its height.",
    failMath: "In a scaling matrix, the horizontal and vertical dials work independently. Adjusting one axis never tilts or alters the other.",
    failNoteLabel: "Independent Axis Scaling"
  },
  {
    id: 1,
    shortName: "02. Slant Space",
    aiMode: true,
    title: "Mission 02: Tilt Space With Off-Diagonal Entries",
    desc: "Notice the top-right entry (b) of the matrix is now unlocked. Drag Horizontal Shear and watch how it tilts the vertical Basis Vector without changing the horizontal one.",
    start: { a: 1.0, b: 0.0, c: 0.0, d: 1.0 },
    target: { a: 1.0, b: 1.0, c: 0.0, d: 1.5 },
    sliders: [
      {
        key: "b",
        label: "HORIZONTAL SHEAR (b)",
        tip: "Top-right matrix entry. Tilts vertical grid lines left or right based on height without changing the horizontal axis.",
        min: -1.5,
        max: 1.5,
        step: 0.1
      },
      {
        key: "d",
        label: "VERTICAL SCALE (d)",
        tip: "In Mission 01, we called this the Height Dial. Stretches or squishes space along the Y-axis.",
        min: 0.5,
        max: 2.0,
        step: 0.1
      }
    ],
    winTitle: "Shear Transformation Mastered!",
    winMath: "Off-diagonal matrix entries mix the X and Y coordinates together. In AI, this lets a model combine different features (like combining height and weight) rather than treating every feature in isolation.",
    winNoteLabel: "Shear & Feature Mixing",
    winNoteBody: "Off-diagonal entries tilt space by mixing X and Y together. Pure shearing leans the grid without changing the Determinant (grid area).",
    failTitle: "Check Your Tilt and Height",
    failHint: "Use Vertical Scale (d) to match the silhouette's height, then slide Horizontal Shear (b) until the lean matches.",
    failMath: "Shear shifts points horizontally based on how high they are—the higher a point sits on the grid, the further it slides.",
    failNoteLabel: "How Horizontal Shear Works"
  },
  {
    id: 2,
    shortName: "03. Mirror & Collapse",
    aiMode: true,
    title: "Mission 03: Negative Space & Dimension Collapse",
    desc: "Your target is flipped backward on the other side of the grid. Your matrix entries can now go negative—watch what happens to the grid and the Determinant as you cross zero.",
    start: { a: 1.0, b: 0.0, c: 0.0, d: 1.0 },
    target: { a: -1.5, b: 0.0, c: 0.0, d: 1.0 },
    sliders: [
      {
        key: "a",
        label: "X-AXIS ENTRY (a)",
        tip: "Top-left diagonal entry. Positive stretches right, 0 collapses width completely, and negative flips space horizontally.",
        min: -2.0,
        max: 2.0,
        step: 0.1
      },
      {
        key: "d",
        label: "Y-AXIS ENTRY (d)",
        tip: "Bottom-right diagonal entry. Positive stretches up, 0 collapses height completely, and negative flips space upside down.",
        min: -2.0,
        max: 2.0,
        step: 0.1
      }
    ],
    winTitle: "You Mastered 2D Matrix Transformations!",
    winMath: "Matrices are the engine of deep learning. By chaining together scaling, shearing, and flipping across thousands of dimensions, AI models warp messy raw data until the right answer becomes easy to read.",
    winNoteLabel: "Negative Determinants & Reflections",
    winNoteBody: "Crossing past zero into negative matrix entries flips the orientation of space (turning the Determinant negative), mirroring shapes across an axis.",
    failTitle: "Almost Aligned in Negative Space",
    failHint: "Push X-Axis Entry (a) past zero into negative numbers to flip your ship into the left quadrant, then adjust its stretch.",
    failMath: "Negative diagonal entries mirror space across the opposite axis while still scaling its size.",
    failNoteLabel: "Mirroring Across Axes",
    collapseTitle: "You Flattened 2D Space Into a Line!",
    collapseMath: "When a matrix has a Determinant of 0, it is non-invertible—you cannot undo the warp because information was permanently destroyed. Keep pushing past zero into negative numbers to flip the ship instead.",
    collapseNoteLabel: "Zero Determinant (Dimension Collapse)"
  }
];
// END OF FILE