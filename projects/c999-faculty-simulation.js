// projects/c999-faculty-simulation.js
window.PORTFOLIO_PROJECTS = window.PORTFOLIO_PROJECTS || {};

window.PORTFOLIO_PROJECTS["c999-faculty-simulation"] = {
    id: "c999-faculty-simulation",
    badge: "Train-the-Trainer • Live Breakout Simulation",
    status: "Embedded Dashboards & Workbook",
    title: "Live Diagnostic Coaching Simulation and Facilitator Kit",
    subtitle: "A live, breakout-room Train-the-Trainer simulation I designed with decentralized HTML/CSS learner dashboards and a multi-tab Excel facilitator workbook to standardize coaching diagnostics and outreach strategy.",
    roles: ["facilitation", "customer-ed", "lxd-data"],
    metrics: ["Live Breakout Facilitation", "Interactive Dashboards", "Facilitator Excel Workbook"],
    meta: {
        role: "Lead Facilitator & Enablement Designer",
        audience: "Course Instructors & Academic Coaches",
        stack: "HTML5, CSS, JSON, Microsoft Excel, MS Teams Breakouts",
        impact: "Reusable Train-the-Trainer Playbook"
    },
    challenge: "When coaching learners through multiple retake attempts, instructors often interpret diagnostic score reports differently or jump straight to generic study tips without examining underlying behavioral patterns, policy constraints, or outreach history. I saw a need for a hands-on, collaborative session where teams could practice 360-degree learner diagnosis and align on consistent coaching standards.",
    persona: "Peer course instructors and coaches who need practical, discussion-driven practice analyzing realistic learner profiles rather than listening to a passive lecture on coaching policies.",

    features: [
        {
            title: "Live Microsoft Teams Breakout Architecture",
            desc: "I structured the workshop around small-group peer collaboration where instructors inspect realistic learner cases together, draft outreach responses, and reconvene to compare strategies across teams."
        },
        {
            title: "Decentralized HTML/CSS Diagnostic Dashboards",
            desc: "I built two realistic fictional learner dashboards (Alex M. and Jordan K.) displaying competency breakdowns, engagement logs, and retake context so participants practice reading live telemetry."
        },
        {
            title: "Guided Facilitator Breakout Workbook (.xlsx)",
            desc: "I authored a structured Excel workbook containing guided diagnostic questions, policy review checks, and outreach drafting tabs, plus facilitator debrief tabs to anchor the live group reveal."
        },
        {
            title: "360-Degree Root-Cause Analysis",
            desc: "I designed the case prompts to push facilitators beyond raw exam scores, cross-referencing competency gaps against study habits, anxiety triggers, and institutional retake policies."
        },
        {
            title: "Collaborative Peer Calibration",
            desc: "I built comparison steps into the live debrief so breakout teams evaluate their drafted outreach messages side-by-side, surfacing blind spots and reinforcing shared quality standards."
        },
        {
            title: "Reusable Train-the-Trainer Kit",
            desc: "I packaged the live web dashboards and Excel workbook together so any senior facilitator or team lead can run future onboarding sessions consistently."
        }
    ],

    evaluation: {
        metric1Title: "Facilitator Alignment & Calibration",
        metric1Desc: "I evaluate alignment during live debriefs by comparing each breakout group's diagnostic conclusions and drafted outreach against standardized coaching benchmarks and policy checks.",
        metric2Title: "Workplace Transfer & Repeat Adoption",
        metric2Desc: "I track how consistently instructors apply this root-cause diagnostic framework during subsequent 1:1 learner coaching calls and team call reflections."
    },

    skills: [
        {
            skill: "Live Breakout Room Facilitation",
            desc: "I design and lead discussion-driven virtual workshops where peers learn from each other through structured case analysis rather than one-way slide lectures."
        },
        {
            skill: "Diagnostic Dashboard Prototyping",
            desc: "I build realistic, JSON-backed HTML/CSS interfaces that let trainees practice interpreting complex learner or customer telemetry in a safe sandbox."
        },
        {
            skill: "Train-the-Trainer Playbook Design",
            desc: "I pair interactive tools with structured facilitator workbooks so other leaders and trainers can deliver repeatable enablement sessions independently."
        }
    ],

    demoTitle: "Inspect the Live Learner Dashboards & Facilitator Workbook",
    demoIntro: "During the live training, instructors opened the Alex M. and Jordan K. dashboards below in Microsoft Teams breakout rooms to diagnose each learner's progress, then used the downloadable Excel workbook to answer guided diagnostic questions, verify policies, and draft outreach messages to compare with other teams.",

    renderInteractive: function() {
        return `
        <div class="surface-sandstone rounded p-6 md:p-8">
            <div class="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-[#E5E7EB]">
                <div>
                    <span class="font-mono-tag text-xs text-slate-500 block">Embedded Simulation & Downloadable Workbook</span>
                    <h3 class="font-display text-xl font-bold text-[#111827]">Switch Between Fictional Learner Cases</h3>
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
                <span id="c999-active-label">Viewing live diagnostic profile: <strong>Alex M. (3rd Attempt)</strong></span>
                <a id="c999-external-link" href="https://yourfavci.github.io/MAPT3/?student=alex" target="_blank" rel="noopener" class="font-mono-tag text-[11px] text-[#111827] underline underline-offset-4">
                    Open Dashboard in New Tab ↗
                </a>
            </div>

            <div class="w-full h-[540px] rounded overflow-hidden border border-[#E5E7EB] bg-white shadow-sm">
                <iframe id="c999-iframe" src="https://yourfavci.github.io/MAPT3/?student=alex" title="Learner Diagnostic Simulation" class="w-full h-full border-0"></iframe>
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
    },

    transferability: [
        {
            role: "Customer Success & Support Onboarding",
            application: "While I built this simulation for higher-education course instructors, a Customer Success or Support team can swap the learner dashboards for simulated customer health accounts so new hires practice diagnosing churn risks and drafting outreach in breakout rooms."
        },
        {
            role: "User Education & Partner Enablement",
            application: "A User Education Lead can repurpose this dashboard-plus-workbook kit as a scalable Train-the-Trainer workshop that partner teams and customer champions can deliver inside their own organizations."
        },
        {
            role: "Role-Based Enterprise Training",
            application: "Any L&D team can adapt this live breakout structure for role-based decision labs (such as sales discovery, escalation handling, or AI output review) where teams diagnose realistic scenarios and calibrate their responses together."
        }
    ]
};
// END OF FILE