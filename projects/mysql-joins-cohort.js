// projects/mysql-joins-cohort.js
window.PORTFOLIO_PROJECTS = window.PORTFOLIO_PROJECTS || {};

window.PORTFOLIO_PROJECTS["mysql-joins-cohort"] = {
    id: "mysql-joins-cohort",
    badge: "Custom EdTech Web App • Live & Async Cohort",
    status: "In Final QA • Architecture Preview",
    title: "Diagnostic & Formative SQL Joins Cohort Application",
    subtitle: "A custom-engineered HTML/JS cohort learning application that blends diagnostic readiness quizzes, guided syntax walkthroughs, and formative practice labs for live and self-paced instruction.",
    roles: ["facilitation", "lxd-data", "solutions"],
    metrics: ["Diagnostic Assessment", "Formative Scaffolding", "Live & Async Hybrid"],
    meta: {
        role: "Lead Learning Architect & Cohort Facilitator",
        audience: "Adult Technical Learners (Database & SQL)",
        stack: "HTML5, Vanilla JS, Tailwind CSS, Video & Forms Integration",
        impact: "70% Foundational Readiness + Scaffolded Mastery"
    },
    challenge: "In technical database cohorts, learners frequently jump straight into writing complex multi-table `JOIN` queries before grasping foundational concepts like primary/foreign keys or table aliases. Without a diagnostic check and gradual scaffolding, live cohort sessions get derailed by basic syntax confusion.",
    persona: "Adult learners attending either a live facilitator-led workshop or an on-demand cohort replay. They need a structured environment that checks their foundational readiness first, models how queries are built step-by-step, and gradually fades support as their confidence grows.",

    // Cross-Industry Transferability Block
    transferability: [
        {
            role: "Live Technical Facilitation & Customer Training",
            application: "Designed specifically to support hybrid delivery—giving facilitators a structured interactive lab for live workshops while ensuring self-paced replay learners get the exact same guided experience."
        },
        {
            role: "Customer Education & Product Certification",
            application: "Demonstrates how to build a multi-stage certification lab: verifying prerequisite knowledge via a diagnostic quiz before unlocking hands-on software configuration practice."
        },
        {
            role: "LXD & Assessment Engineering",
            application: "Showcases intentional scaffolding fade—moving learners from a 15-question diagnostic quiz to guided walkthroughs, roadmap-assisted formative labs, and unassisted summative challenges."
        }
    ],

    features: [
        {
            title: "Hybrid Live & On-Demand Cohort Access",
            desc: "Supports both synchronous workshop attendees (via live instructor session codes) and asynchronous learners (via pre-work video verification) within one unified web application."
        },
        {
            title: "15-Question Diagnostic Readiness Quiz",
            desc: "Evaluates foundational understanding of primary/foreign keys, join types, and table aliases—requiring a 70% baseline score and eliminating incorrect options on retry so learners master core concepts first."
        },
        {
            title: "3 Guided Formative Walkthroughs",
            desc: "Breaks down multi-table query construction step-by-step, visually connecting `SELECT`, `FROM`, `JOIN`, and `ON` clauses to relational table schemas."
        },
        {
            title: "7 Practice Labs with Toggleable Roadmaps",
            desc: "Provides formative coding practice equipped with an optional visual 'SQL Roadmap' that learners can toggle on for support or hide to test their independence."
        },
        {
            title: "5 Unassisted Summative Mastery Labs",
            desc: "Removes the training wheels for the final five challenges, assessing whether learners can independently construct accurate multi-table queries."
        },
        {
            title: "Persistent Coaching Feedback & Completion Sync",
            desc: "Features a scrollable feedback panel with targeted explanations for every choice and concludes with an integrated form handoff to log cohort completion."
        }
    ],

    evaluation: {
        metric1Title: "Foundational Readiness & Error Reduction",
        metric1Desc: "Ensures every learner achieves at least 70% mastery on core database relationships before attempting complex multi-table syntax.",
        metric2Title: "Independent Query Construction",
        metric2Desc: "Tracks learner progression as instructional scaffolding fades from guided walkthroughs to unassisted summative challenges."
    },

    renderInteractive: function() {
        return `
        <div class="surface-sandstone rounded p-6 md:p-8 mb-16">
            <div class="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-[#E5E7EB]">
                <div>
                    <span class="font-mono-tag text-xs px-2.5 py-1 rounded bg-[#0F172A] text-[#FAF8F5] inline-block mb-2">In Final QA • Smart Link Placeholder Active</span>
                    <h3 class="font-display text-2xl font-bold text-[#111827]">Inspect the 4-Stage Instructional & Assessment Architecture</h3>
                </div>
                <a href="#coming-soon" onclick="alert('This cohort web application is currently in final QA! As soon as you publish your final link, just replace #coming-soon in projects/mysql-joins-cohort.js.'); return false;" class="btn-outline px-4 py-2 rounded text-xs font-semibold">
                    Launch Cohort Application (In Final QA) ↗
                </a>
            </div>
            <div class="grid md:grid-cols-4 gap-4 text-xs">
                <div class="p-5 rounded bg-white border border-[#E5E7EB]">
                    <span class="font-mono-tag text-[10px] text-slate-500 block mb-1">Stage 01 / Pre-Work & Access</span>
                    <p class="font-display font-bold text-sm text-[#111827] mb-2">Hybrid Cohort Verification</p>
                    <p class="text-[#4B5563] leading-relaxed">Personalizes the interface with the learner's first name and verifies either live workshop attendance or completion of the prerequisite concept video.</p>
                </div>
                <div class="p-5 rounded bg-white border border-[#E5E7EB]">
                    <span class="font-mono-tag text-[10px] text-slate-500 block mb-1">Stage 02 / Diagnostic Quiz</span>
                    <p class="font-display font-bold text-sm text-[#111827] mb-2">15-Item Foundational Check</p>
                    <p class="text-[#4B5563] leading-relaxed">Assesses primary/foreign key logic, join selection, and alias rules. Requires a 70% score to advance, using smart option strikeout to guide formative retries.</p>
                </div>
                <div class="p-5 rounded bg-white border border-[#E5E7EB]">
                    <span class="font-mono-tag text-[10px] text-slate-500 block mb-1">Stage 03 / Formative Practice</span>
                    <p class="font-display font-bold text-sm text-[#111827] mb-2">3 Walkthroughs + 7 Labs</p>
                    <p class="text-[#4B5563] leading-relaxed">Transitions learners from guided multi-choice walkthroughs into 7 hands-on labs with a toggleable step-by-step SQL Roadmap.</p>
                </div>
                <div class="p-5 rounded bg-white border border-[#E5E7EB]">
                    <span class="font-mono-tag text-[10px] text-slate-500 block mb-1">Stage 04 / Summative Mastery</span>
                    <p class="font-display font-bold text-sm text-[#111827] mb-2">5 Unassisted Challenges</p>
                    <p class="text-[#4B5563] leading-relaxed">Evaluates independent query building without roadmap prompts, supported by a persistent scrollable feedback panel and completion logging.</p>
                </div>
            </div>
        </div>`;
    },

    initInteractive: function() {}
};
