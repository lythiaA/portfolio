// projects/c999-faculty-simulation.js
window.PORTFOLIO_PROJECTS = window.PORTFOLIO_PROJECTS || {};

window.PORTFOLIO_PROJECTS["c999-faculty-simulation"] = {
    id: "c999-faculty-simulation",
    badge: "Train-the-Trainer • Live Breakout Simulation",
    status: "Embedded Dashboards & Workbook",
    title: "Collaborative Coaching & Diagnostic Simulation",
    subtitle: "A live, breakout-room Train-the-Trainer simulation combining decentralized HTML/CSS learner dashboards with a multi-tab Excel facilitator workbook to standardize coaching diagnostics and outreach strategy.",
    roles: ["facilitation", "customer-ed", "lxd-data"],
    metrics: ["Live Breakout Facilitation", "Interactive Dashboards", "Facilitator Excel Workbook"],
    meta: {
        role: "Lead Facilitator & Enablement Designer",
        audience: "Course Instructors & Academic Coaches",
        stack: "HTML5, CSS, JSON, Microsoft Excel, MS Teams Breakouts",
        impact: "Reusable Train-the-Trainer Playbook"
    },
    challenge: "When coaching learners through multiple retake attempts, instructors often interpret diagnostic score reports differently or jump straight to generic study tips without examining underlying behavioral patterns, policy constraints, or outreach history. Teams needed a hands-on, collaborative way to practice 360-degree learner diagnosis and align on consistent coaching standards.",
    persona: "Peer course instructors and coaches who need practical, discussion-driven practice analyzing realistic learner profiles rather than listening to a passive lecture on coaching policies.",

    transferability: [
        {
            role: "Customer Success & Support Enablement",
            application: "While built for higher-education course instructors, this exact breakout-room simulation structure translates directly to onboarding Customer Success Managers (CSMs) and Support Specialists: teams inspect simulated customer health dashboards, diagnose adoption blockers in small groups, draft outreach plans, and compare strategies."
        },
        {
            role: "User Education & Partner Train-the-Trainer",
            application: "Demonstrates how I package repeatable facilitation frameworks (interactive sandboxes paired with structured facilitator workbooks) so other trainers and team leads can deliver consistent enablement sessions independently."
        },
        {
            role: "Role-Based Learning Design",
            application: "Shows how I design role-specific practice grounded in real daily workflows, moving staff from reading policy documents to actively diagnosing edge cases and defending their coaching decisions with peers."
        }
    ],

    features: [
        {
            title: "Live Microsoft Teams Breakout Architecture",
            desc: "Structured around small-group peer collaboration where instructors work through realistic learner cases together, draft responses, and reconvene to compare strategies across teams."
        },
        {
            title: "Decentralized HTML/CSS Diagnostic Dashboards",
            desc: "Built clean, realistic learner profiles (Alex M. and Jordan K.) displaying competency breakdowns, engagement logs, and retake context so facilitators practice reading real telemetry."
        },
        {
            title: "Guided Facilitator Breakout Workbook (.xlsx)",
            desc: "Created a structured Excel workbook with guided diagnostic prompts, policy review checks, and outreach drafting tabs, plus hidden facilitator debrief tabs for live reveal."
        },
        {
            title: "360-Degree Root-Cause Analysis",
            desc: "Trains facilitators to look beyond raw exam scores by cross-referencing competency gaps against study habits, anxiety triggers, and institutional retake policies."
        },
        {
            title: "Collaborative Peer Calibration",
            desc: "Prompts teams to compare their drafted outreach messages and coaching plans side-by-side, surfacing blind spots and building shared quality standards through discussion."
        },
        {
            title: "Self-Contained Reusable Enablement Kit",
            desc: "Packaged so any team lead or senior facilitator can pick up the live web dashboards and Excel workbook to run future onboarding cohorts consistently."
        }
    ],

    evaluation: {
        metric1Title: "Facilitator Alignment & Calibration",
        metric1Desc: "Measured during live debriefs by comparing breakout group outputs against standardized coaching benchmarks and policy accuracy checks.",
        metric2Title: "Workplace Transfer & Repeat Adoption",
        metric2Desc: "Evaluated by tracking how consistently instructors apply the diagnostic and outreach framework during live 1:1 learner coaching calls."
    },

    renderInteractive: function() {
        return `
        <div class="surface-sandstone rounded p-6 md:p-8 mb-16">
            <div class="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-[#E5E7EB]">
                <div>
                    <span class="font-mono-tag text-xs text-slate-500 block">Live Embedded Simulation & Facilitator Workbook</span>
                    <h3 class="font-display text-2xl font-bold text-[#111827]">Inspect the Learner Dashboards & Breakout Workbook</h3>
                </div>
                <div class="flex flex-wrap gap-2">
                    <button onclick="switchC999Student('alex')" id="btn-sim-alex" class="filter-pill active px-3.5 py-2 rounded text-xs font-semibold">Case 1: Alex M. (3rd Attempt)</button>
                    <button onclick="switchC999Student('jordan')" id="btn-sim-jordan" class="filter-pill px-3.5 py-2 rounded text-xs font-semibold">Case 2: Jordan K. (4th Attempt)</button>
                    <a href="assets/C999_MAP_Training_Breakout_Workbook.xlsx" download class="btn-primary px-4 py-2 rounded text-xs font-semibold">
                        Download Excel Workbook (.xlsx) ↓
                    </a>
                </div>
            </div>

            <div class="mb-4 flex items-center justify-between text-xs text-[#4B5563]">
                <span id="c999-active-label">Viewing live diagnostic profile: <strong>Alex M.</strong></span>
                <a id="c999-external-link" href="https://yourfavci.github.io/MAPT3/?student=alex" target="_blank" rel="noopener" class="font-mono-tag text-[11px] text-[#111827] underline underline-offset-4">
                    Open Dashboard in New Tab ↗
                </a>
            </div>

            <div class="w-full h-[540px] rounded overflow-hidden border border-[#E5E7EB] bg-white shadow-sm">
                <iframe id="c999-iframe" src="https://yourfavci.github.io/MAPT3/?student=alex" title="C999 Learner Diagnostic Simulation" class="w-full h-full border-0"></iframe>
            </div>
        </div>`;
    },

    initInteractive: function() {
        window.switchC999Student = function(student) {
            const urls = {
                alex: "https://yourfavci.github.io/MAPT3/?student=alex",
                jordan: "https://yourfavci.github.io/MAPT3/?student=jordan"
            };
            const names = {
                alex: "Alex M. (3rd Attempt)",
                jordan: "Jordan K. (4th Attempt)"
            };
            document.getElementById('btn-sim-alex').classList.toggle('active', student === 'alex');
            document.getElementById('btn-sim-jordan').classList.toggle('active', student === 'jordan');
            document.getElementById('c999-iframe').src = urls[student];
            document.getElementById('c999-external-link').href = urls[student];
            document.getElementById('c999-active-label').innerHTML = `Viewing live diagnostic profile: <strong>${names[student]}</strong>`;
        };
    }
};
// END OF FILE
