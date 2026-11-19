// projects/millionaire-data-quiz.js
window.PORTFOLIO_PROJECTS = window.PORTFOLIO_PROJECTS || {};

window.PORTFOLIO_PROJECTS["millionaire-data-quiz"] = {
    id: "millionaire-data-quiz",
    badge: "Interactive Assessment App • CompTIA Data+",
    status: "Live Embedded Application",
    title: "Interactive Certification Prep and Socratic Quiz App",
    subtitle: "A decentralized, game-show-inspired quiz application I built for CompTIA Data+ certification prep, featuring tiered difficulty ladders, a Socratic virtual coach lifeline, and configurable timed modes.",
    roles: ["lxd-data", "customer-ed", "solutions"],
    metrics: ["Decentralized Config", "Socratic Coach Lifeline", "54-Question Marathon"],
    meta: {
        role: "Lead Learning Architect & App Builder",
        audience: "Adult Technical Learners (Data Analytics)",
        stack: "HTML5, CSS, Vanilla JS, Modular Config Files, GitHub Pages",
        impact: "Progressive Confidence & Certification Readiness"
    },
    challenge: "Preparing for technical certification exams like CompTIA Data+ requires mastering a wide breadth of analytical concepts under time pressure. Static practice tests often overwhelm learners or simply mark answers wrong without helping them reason through why a particular statistical or data-governance choice fits best.",
    persona: "Adult learners preparing for technical certification who need an engaging, low-friction way to test their readiness across foundational and advanced domains while receiving Socratic guidance whenever they get stuck.",

    features: [
        {
            title: "Decentralized Question & Config Architecture",
            desc: "I separated domain question banks, timer rules, and scoring settings into modular files so content updates or new subject tracks can be deployed without rewriting the core app."
        },
        {
            title: "Dual Pacing Modes (15-Question Classic & 54-Question Marathon)",
            desc: "I built two distinct pathways so learners can choose a focused 15-question sprint or an endurance 54-question marathon equipped with Safe Havens and a Second Chance Shield."
        },
        {
            title: "Socratic Virtual Coach Lifeline (Phone-a-Friend)",
            desc: "Instead of handing over the right letter, I designed the virtual coach to provide targeted conceptual nudges and guiding questions that strengthen independent analytical judgment."
        },
        {
            title: "50/50 Elimination & Audience Poll Lifelines",
            desc: "I included strategic scaffolding tools that let learners narrow down distractors and weigh probability cues when encountering unfamiliar technical scenarios."
        },
        {
            title: "Configurable Timers & Pacing Controls",
            desc: "I added selectable 30s, 45s, and 60s pacing timers with explanatory tooltips so learners can gradually build comfort with real exam-day time constraints."
        },
        {
            title: "Streamlined Completion Reporting",
            desc: "I integrated an Outlook-based completion handoff so learners can easily document their milestone progress and share run summaries with their instructor."
        }
    ],

    evaluation: {
        metric1Title: "Progressive Domain Mastery",
        metric1Desc: "I evaluate learner progress through Safe Haven checkpoint attainment and completion rates across both Classic and Marathon certification runs.",
        metric2Title: "Scaffolding Independence Over Time",
        metric2Desc: "I look at how learners reduce their reliance on lifelines across repeat runs, transitioning from guided Socratic hints to unassisted timed accuracy."
    },

    skills: [
        {
            skill: "Modular Front-End Prototyping",
            desc: "I partnered with AI through structured technical specifications to architect a clean, decentralized HTML/CSS/JS application hosted directly on GitHub Pages."
        },
        {
            skill: "Socratic Coaching Prompt Design",
            desc: "I crafted hint logic that teaches learners how to reason through tricky analytical questions instead of giving away direct answers."
        },
        {
            skill: "Gamified Assessment Design",
            desc: "I balanced cognitive load, pacing timers, Safe Havens, and Second Chance Shields to keep high-stakes certification review motivating rather than stressful."
        }
    ],

    demoTitle: "Play the Interactive Data+ Quiz Application",
    demoIntro: "Test the live embedded app below by choosing Classic or Marathon mode, selecting a timer setting, and trying the Phone-a-Friend lifeline to see the Socratic coaching feedback in action.",

    renderInteractive: function() {
        return `
        <div class="surface-sandstone rounded p-6 md:p-8">
            <div class="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-[#E5E7EB]">
                <div>
                    <span class="font-mono-tag text-xs text-slate-500 block">Live Embedded App</span>
                    <h3 class="font-display text-xl font-bold text-[#111827]">CompTIA Data+ Interactive Mastery Run</h3>
                </div>
                <a href="https://yourfavci.github.io/D492QuizCohort/" target="_blank" rel="noopener" class="btn-primary px-4 py-2 rounded text-xs font-semibold">
                    Open Full Screen in New Tab ↗
                </a>
            </div>
            <div class="w-full h-[620px] rounded overflow-hidden border border-[#E5E7EB] bg-white shadow-md">
                <iframe src="https://yourfavci.github.io/D492QuizCohort/" title="Interactive Certification Prep and Socratic Quiz App" class="w-full h-full border-0"></iframe>
            </div>
        </div>`;
    },

    initInteractive: function() {},

    transferability: [
        {
            role: "Enterprise Product Certification & Badging",
            application: "A Customer Education team can plug product-specific question banks into this decentralized quiz engine to run interactive customer or partner certification prep with progressive difficulty tiers."
        },
        {
            role: "AI Literacy & Prompt Judgment Training",
            application: "A User Education Lead can adapt the Socratic Phone-a-Friend lifeline to coach enterprise employees through AI judgment scenarios, helping them spot hallucinations, bias, or weak prompts before answering."
        },
        {
            role: "Self-Serve Enablement at Scale",
            application: "Because the question banks and config files are completely decoupled from the UI, technical writers or subject-matter experts can swap in new product release quizzes without needing engineering support."
        }
    ]
};
// END OF FILE