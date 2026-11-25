// projects/math-of-ai-labs.js
window.PORTFOLIO_PROJECTS = window.PORTFOLIO_PROJECTS || {};

window.PORTFOLIO_PROJECTS["math-of-ai-labs"] = {
    id: "math-of-ai-labs",
    badge: "Gamified Learning • Math of AI Series",
    status: "3 Playable Web Labs",
    title: "Math of AI: Interactive Intuition Labs",
    subtitle: "A three-part, puzzle-based learning suite I designed, directed, and built through AI-assisted rapid prototyping to develop applied mathematical intuition across Calculus, Linear Algebra, and Probability.",
    roles: ["gamified-learning", "lxd-data"],
    metrics: ["3 Playable Web Labs", "Progressive Vocabulary HUD", "AI-Assisted Prototyping"],
    meta: {
        role: "Learning Experience Designer & Creative Director",
        audience: "Aspiring AI Engineers & Data Practitioners",
        stack: "HTML5 Canvas, CSS3, Vanilla JS, Web Audio API, AI-Assisted Coding",
        impact: "Active Intuition Across 3 Core AI Math Pillars"
    },
    challenge: "Applied AI curricula often treat Linear Algebra, Multivariable Calculus, and Probability as isolated, plug-and-chug theory or passive textbook simulations. Beginners struggle to connect abstract equations to real machine learning failure modes like overshooting gradients, rank collapse, or data drift. I saw a need for active, game-like puzzles with real win and fail stakes that let learners feel the math first.",
    persona: "Adult learners, aspiring AI engineers, and data practitioners who want to look under the hood of machine learning models and build genuine mathematical intuition without getting buried in dry notation on day one.",

    features: [
        {
            title: "Rover Descent (Calculus & Optimization)",
            desc: "An interactive 3-mission terrain lab where learners tune step sizes and momentum to navigate loss landscapes, experiencing exploding gradients, overshooting, and local minima firsthand."
        },
        {
            title: "Grid Warp (Linear Algebra & Geometry)",
            desc: "A live 2D coordinate transformation puzzle where learners manipulate 2x2 matrix entries to stretch, shear, and mirror space, visually uncovering basis vectors, determinants, and zero-determinant dimension collapse."
        },
        {
            title: "Cash Harvest (Probability & Expected Utility)",
            desc: "A 30-turn Multi-Armed Bandit game with a live turn-by-turn replay curve that teaches empirical probability, expected value optimization, variance, data drift, and Epsilon-Greedy exploration."
        },
        {
            title: "Progressive Vocabulary Scaffolding",
            desc: "Every lab starts in plain, accessible game language during Mission 01, then upgrades the HUD to formal AI and math terminology with hoverable tooltips once the learner has built physical intuition."
        },
        {
            title: "Tailored Failure Diagnostics",
            desc: "Instead of generic error messages, each lab inspects the learner's actual inputs and strategy (such as committing too early on a small sample or triggering a zero determinant) to deliver targeted feedback."
        },
        {
            title: "Persistent Field Notes Drawer",
            desc: "A slide-out right-hand drawer captures every concept uncovered across wins and failed attempts, automatically compiling a clean study summary for each mathematical pillar."
        }
    ],

    evaluation: {
        metric1Title: "Diagnostic Concept Transfer",
        metric1Desc: "I evaluate effectiveness by tracking whether learners can bridge their visual intuition from the labs directly into applied ML troubleshooting, such as diagnosing learning rate instability, feature redundancy, and generalization gaps.",
        metric2Title: "Active Engagement & Retry Behavior",
        metric2Desc: "Because each mission features clear win/fail stakes and tailored failure feedback, learners naturally iterate on their strategies until they master the underlying mathematical principle rather than passively clicking through."
    },

    skills: [
        {
            skill: "Gamified Instructional Design",
            desc: "I replace passive simulations with active, puzzle-based mechanics that use tension, immediate feedback, and progressive scaffolding to make abstract technical concepts stick."
        },
        {
            skill: "Applied AI & Math Translation",
            desc: "I translate advanced machine learning mathematics (optimization dynamics, matrix geometry, and probabilistic reasoning) into intuitive visual models for beginners."
        },
        {
            skill: "AI-Assisted Rapid Prototyping",
            desc: "I pair human-centered learning architecture with AI-assisted coding, directing code generation while owning the pedagogical blueprint, mathematical balancing, UX refinement, and edge-case QA."
        }
    ],

    demoTitle: "Play All Three Interactive Math of AI Labs",
    demoIntro: "Switch between the three playable labs below to test the shared single-screen HUD, progressive vocabulary, and Field Notes drawer. For the full-screen experience, open any lab in a new tab.",

    renderInteractive: function() {
        return `
        <div class="surface-sandstone rounded p-6 md:p-8">
            <div class="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-[#E5E7EB]">
                <div>
                    <span class="font-mono-tag text-xs text-slate-500 block">Interactive Web Suite • 3 Core Pillars</span>
                    <h3 class="font-display text-xl font-bold text-[#111827]">Select a Math of AI Lab to Play</h3>
                </div>
                <div class="flex flex-wrap gap-2">
                    <button onclick="switchMathLab('calculus')" id="btn-lab-calculus" class="filter-pill active px-3.5 py-2 rounded text-xs font-semibold">01. Rover Descent (Calculus)</button>
                    <button onclick="switchMathLab('linalg')" id="btn-lab-linalg" class="filter-pill px-3.5 py-2 rounded text-xs font-semibold">02. Grid Warp (Linear Algebra)</button>
                    <button onclick="switchMathLab('prob')" id="btn-lab-prob" class="filter-pill px-3.5 py-2 rounded text-xs font-semibold">03. Cash Harvest (Probability)</button>
                </div>
            </div>

            <div class="mb-4 flex flex-wrap items-center justify-between gap-2 text-xs text-[#4B5563]">
                <span id="math-lab-active-label">Now playing: <strong>Rover Descent (Calculus & Optimization)</strong></span>
                <a id="math-lab-external-link" href="projects/gradient-descent/index.html" target="_blank" rel="noopener" class="font-mono-tag text-[11px] text-[#111827] underline underline-offset-4">
                    Open Lab Full-Screen in New Tab ↗
                </a>
            </div>

            <div class="w-full h-[680px] rounded overflow-hidden border border-[#E5E7EB] bg-[#070B14] shadow-sm">
                <iframe id="math-lab-iframe" src="projects/gradient-descent/index.html" title="Math of AI Interactive Lab" class="w-full h-full border-0"></iframe>
            </div>
        </div>`;
    },

    initInteractive: function() {
        window.switchMathLab = function(lab) {
            const labs = {
                calculus: {
                    url: "projects/gradient-descent/index.html",
                    name: "Rover Descent (Calculus & Optimization)"
                },
                linalg: {
                    url: "projects/matrix-transformations/index.html",
                    name: "Grid Warp (Linear Algebra & Geometry)"
                },
                prob: {
                    url: "projects/cash-harvest/index.html",
                    name: "Cash Harvest (Probability & Expected Utility)"
                }
            };
            const selected = labs[lab];
            if (!selected) return;

            document.getElementById('btn-lab-calculus').classList.toggle('active', lab === 'calculus');
            document.getElementById('btn-lab-linalg').classList.toggle('active', lab === 'linalg');
            document.getElementById('btn-lab-prob').classList.toggle('active', lab === 'prob');
            document.getElementById('math-lab-iframe').src = selected.url;
            document.getElementById('math-lab-external-link').href = selected.url;
            document.getElementById('math-lab-active-label').innerHTML = `Now playing: <strong>${selected.name}</strong>`;
        };
    },

    transferability: [
        {
            role: "Technical Enablement & Developer Relations",
            application: "A Developer Relations or Technical Enablement team can use this exact progressive-HUD pattern to onboard engineers onto complex APIs, cloud architectures, or AI tooling through safe, interactive sandboxes."
        },
        {
            role: "Customer Education & Product Adoption",
            application: "Customer Education teams can replace static feature tours with short, mission-based web labs that let new users experience cause-and-effect workflows and earn instant diagnostic feedback."
        },
        {
            role: "Higher-Ed & Enterprise LXD",
            application: "Curriculum teams can reuse this decentralized HTML/CSS/JS lab shell across any quantitative or analytical domain, keeping the UI consistent while swapping out the underlying JSON level logic."
        }
    ]
};
// END OF FILE