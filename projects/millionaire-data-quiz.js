// projects/millionaire-data-quiz.js
window.PORTFOLIO_PROJECTS = window.PORTFOLIO_PROJECTS || {};

window.PORTFOLIO_PROJECTS["millionaire-data-quiz"] = {
    id: "millionaire-data-quiz",
    badge: "Interactive Assessment App • D492 CompTIA Data+",
    status: "Live Embedded Application",
    title: "D492 Data+ Interactive Mastery & Socratic Quiz Engine",
    subtitle: "A decentralized, high-stakes quiz application built for CompTIA Data+ certification prep, featuring tiered difficulty ladders, Socratic AI coaching lifelines, and configurable timed modes.",
    roles: ["lxd-data", "customer-ed", "solutions"],
    metrics: ["Decentralized Architecture", "Socratic Coach Lifeline", "54-Question Marathon"],
    meta: {
        role: "Lead Learning Architect & App Builder",
        audience: "Adult Technical Learners (Data Analytics)",
        stack: "HTML5, CSS, Vanilla JS, Modular Config Files, GitHub Pages",
        impact: "Progressive Confidence & Certification Readiness"
    },
    challenge: "Preparing for industry certification exams like CompTIA Data+ requires mastering a wide breadth of analytical concepts under time pressure. Static practice tests often overwhelm learners or simply mark answers wrong without helping them reason through why a particular statistical or data-governance choice fits best.",
    persona: "Adult learners preparing for technical certification who need a motivating, low-friction way to test their readiness across foundational and advanced domains while receiving Socratic guidance when they get stuck.",

    transferability: [
        {
            role: "Enterprise Product Certification & Badging",
            application: "This modular quiz architecture translates seamlessly into customer and partner product certification programs, allowing organizations to validate user proficiency across progressive difficulty tiers."
        },
        {
            role: "Scalable Self-Serve Learning Systems",
            application: "Because the question banks and game rules are separated into decentralized config files, non-technical subject-matter experts can update certification domains without touching the core application code."
        },
        {
            role: "AI-Guided Formative Coaching",
            application: "Illustrates how to embed Socratic coaching prompts ('Phone-a-Friend') into self-paced practice so users learn how to think through complex decisions rather than memorizing answer keys."
        }
    ],

    features: [
        {
            title: "Decentralized Question & Config Architecture",
            desc: "Separates domain question banks, timer settings, and scoring rules into clean modular files for effortless maintenance and rapid topic expansion."
        },
        {
            title: "Dual Pacing Modes (15-Question Classic & 54-Question Marathon)",
            desc: "Allows learners to choose between a focused 15-question sprint or an endurance 54-question marathon with Safe Havens and a Second Chance Shield."
        },
        {
            title: "Socratic Virtual Coach Lifeline (Phone-a-Friend)",
            desc: "Instead of handing over the right letter, the virtual coach offers targeted conceptual nudges and guiding questions to build independent analytical judgment."
        },
        {
            title: "50/50 Elimination & Audience Telemetry Lifelines",
            desc: "Gives learners strategic scaffolding tools to narrow down distractors and evaluate probability distributions when facing unfamiliar scenarios."
        },
        {
            title: "Configurable Timer & Cognitive Load Controls",
            desc: "Includes selectable 30s, 45s, and 60s pacing timers with helpful tooltips so learners can gradually simulate real exam-day time pressure."
        },
        {
            title: "Automated Completion Tracking Handoff",
            desc: "Integrates streamlined completion reporting so learners can document their milestone progress and share results with their instructor."
        }
    ],

    evaluation: {
        metric1Title: "Progressive Domain Mastery",
        metric1Desc: "Tracked via Safe Haven checkpoint progression and completion rates across both Classic and Marathon certification modes.",
        metric2Title: "Scaffolding Independence",
        metric2Desc: "Evaluated by monitoring lifeline dependency over repeat runs as learners move from guided hints to unassisted timed mastery."
    },

    renderInteractive: function() {
        return `
        <div class="surface-sandstone rounded p-6 md:p-8 mb-16">
            <div class="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-[#E5E7EB]">
                <div>
                    <span class="font-mono-tag text-xs text-slate-500 block">Live Interactive Application</span>
                    <h3 class="font-display text-2xl font-bold text-[#111827]">Play the D492 Data+ Quiz Engine Directly Below</h3>
                </div>
                <a href="https://yourfavci.github.io/D492QuizCohort/" target="_blank" rel="noopener" class="btn-primary px-4 py-2 rounded text-xs font-semibold">
                    Open Full Screen in New Tab ↗
                </a>
            </div>
            <div class="w-full h-[620px] rounded overflow-hidden border border-[#E5E7EB] bg-white shadow-md">
                <iframe src="https://yourfavci.github.io/D492QuizCohort/" title="D492 CompTIA Data+ Quiz Application" class="w-full h-full border-0"></iframe>
            </div>
        </div>`;
    },

    initInteractive: function() {}
};
// END OF FILE
