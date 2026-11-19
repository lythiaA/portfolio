// projects/millionaire-data-quiz.js
window.PORTFOLIO_PROJECTS = window.PORTFOLIO_PROJECTS || {};

window.PORTFOLIO_PROJECTS["millionaire-data-quiz"] = {
    id: "millionaire-data-quiz",
    badge: "Interactive Assessment App • CompTIA Data+",
    status: "Live Embedded Application",
    title: "Interactive Certification Prep and Socratic Quiz App",
    subtitle: "A low-stakes, decentralized quiz application I built for CompTIA Data+ certification prep by bridging a familiar game-show format with instructional design principles like Socratic questioning and domain-level diagnostic reporting.",
    roles: ["lxd-data", "customer-ed", "solutions"],
    metrics: ["Game-Show to EdTech Bridge", "Socratic Coach Lifeline", "Domain Mastery Report"],
    meta: {
        role: "Lead Learning Architect & App Builder",
        audience: "Adult Technical Learners (Data Analytics)",
        stack: "HTML5, CSS, Vanilla JS, Modular Config Files, GitHub Pages",
        impact: "Low-Stakes Practice & Targeted Exam Readiness"
    },
    challenge: "Preparing for technical certification exams like CompTIA Data+ requires mastering a wide breadth of analytical concepts under time pressure. Static practice tests often feel intimidating and simply mark answers wrong without helping learners reason through why a choice is correct or showing them which specific exam domains need more review.",
    persona: "Adult learners preparing for technical certification who need a welcoming, low-stakes environment to practice across foundational and advanced domains, receive Socratic guidance when they get stuck, and walk away with a clear map of what to study next.",

    features: [
        {
            title: "Bridging Familiar Game Mechanics With EdTech",
            desc: "I took universally recognized mechanics from Who Wants to Be a Millionaire (Phone-a-Friend, 50/50, and Ask the Audience) and re-engineered them into purposeful instructional scaffolding tools."
        },
        {
            title: "Socratic Virtual Coach Lifeline (Phone-a-Friend)",
            desc: "Instead of handing over the right letter, I designed the Phone-a-Friend virtual coach to use Socratic questioning, offering conceptual nudges that strengthen independent analytical judgment."
        },
        {
            title: "Low-Stakes Dual Pacing Modes (16-Question Classic & 50-Question Marathon)",
            desc: "I built a low-stakes practice space where learners choose between a 16-question Classic run or a 50-question Marathon equipped with Safe Havens and a Second Chance Shield so mistakes become learning moments."
        },
        {
            title: "End-of-Run Diagnostic & Domain Mastery Report",
            desc: "At the end of every run, the app generates a personalized performance summary showing first-try accuracy, total questions answered, time spent, and a percentage breakdown across every CompTIA Data+ exam domain."
        },
        {
            title: "Targeted Pre-Exam Review List",
            desc: "Alongside the domain breakdown, the summary report isolates the specific questions each learner missed so they know precisely where to direct their remaining study time before exam day."
        },
        {
            title: "Decentralized Question & Config Architecture",
            desc: "I separated domain question banks, timer options (30s, 45s, 60s), and scoring rules into modular files so new certification topics can be updated without rewriting the core application."
        }
    ],

    evaluation: {
        metric1Title: "First-Try Accuracy & Domain Mastery",
        metric1Desc: "I evaluate learner readiness through the end-of-run diagnostic report, which tracks first-try accuracy, time spent, and mastery percentages across each CompTIA Data+ domain.",
        metric2Title: "Scaffolding Independence Over Repeat Runs",
        metric2Desc: "I look at how learners reduce their reliance on lifelines across repeat low-stakes runs as they review their missed-question list and build unassisted exam confidence."
    },

    skills: [
        {
            skill: "Instructional Gamification & Socratic Design",
            desc: "I translated familiar game-show mechanics (50/50, Ask the Audience, Phone-a-Friend) into evidence-based learning scaffolds powered by Socratic questioning."
        },
        {
            skill: "Diagnostic Learning Analytics",
            desc: "I engineered an automated end-of-run report that turns raw quiz clicks into actionable domain mastery percentages and a prioritized study list."
        },
        {
            skill: "Modular Front-End Prototyping",
            desc: "I partnered with AI through structured technical specifications to build a clean, decentralized HTML/CSS/JS web application hosted directly on GitHub Pages."
        }
    ],

    demoTitle: "Play the Interactive Data+ Quiz Application",
    demoIntro: "Test the live embedded app below by choosing Classic or Marathon mode, trying the Socratic Phone-a-Friend lifeline, and reviewing the end-of-run Domain Mastery Report.",

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
            application: "A Customer Education team can plug product-specific question banks into this decentralized quiz engine to run low-stakes customer or partner certification prep with automated domain-level diagnostic reports."
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