// projects/adaptive-study-architect.js
window.PORTFOLIO_PROJECTS = window.PORTFOLIO_PROJECTS || {};

window.PORTFOLIO_PROJECTS["adaptive-study-architect"] = {
    id: "adaptive-study-architect",
    badge: "AI-Assisted Web App • Diagnostics & LXD",
    status: "Live Embedded Application",
    title: "Adaptive Learning Path and Pacing App ",
    subtitle: "A HTML/JS/JSON web application I built through strategic AI collaboration that converts static technical syllabi into personalized, date-driven daily study sprints.",
    roles: ["lxd-data", "customer-ed", "solutions"],
    metrics: ["6-Variable Intake Engine", "Decentralized JSON", "80% Mastery Gates"],
    meta: {
        role: "Lead Learning Architect & AI Prompt Engineer",
        audience: "Adult Technical Learners (Data Management)",
        stack: "HTML5, CSS, Vanilla JS, Modular JSON, Local Storage",
        impact: "Personalized Pacing & Self-Regulated Mastery"
    },
    challenge: "Adult learners entering technical database courses arrive with vastly different readiness levels, ranging from brand-new beginners intimidated by SQL to experienced analysts looking to accelerate. Static, one-size-fits-all resource lists cause cognitive overload, poor pacing, and premature exam attempts.",
    persona: "Self-paced adult learners balancing full-time work and technical coursework. They need an intelligent diagnostic tool that reads their Pre-Assessment competency breakdown, calculates days remaining until their target exam date, and organizes their workload into realistic daily buckets.",

    features: [
        {
            title: "Strategic AI-Assisted Prototyping",
            desc: "I architected and iteratively tested this multi-file application by directing AI with modular technical specifications, UI state rules, and edge-case validation."
        },
        {
            title: "6-Variable Diagnostic Intake Engine",
            desc: "I designed an onboarding gate that evaluates prior database and SQL experience, weekly study hours, schedule style, learning modality preference, and target exam date to route users into Foundations, Standard, or Fast-Track plans."
        },
        {
            title: "Pre-Assessment Competency Analyzer",
            desc: "I built a coaching report analyzer that ingests domain-level diagnostic scores to automatically flag high-risk chapters for deep-dive review and mark mastered chapters as optional."
        },
        {
            title: "Dynamic Daily Sprint Generator",
            desc: "I weighted all 5 curriculum chapters by theoretical difficulty and built an algorithm that partitions modules into realistic daily study buckets calibrated to the learner's target date."
        },
        {
            title: "Confidence Telemetry & 1-Click Filtering",
            desc: "I added color-coded confidence ratings (Green, Yellow, Red) so learners can tag every module, filter their entire plan to isolate shaky topics, and automatically unlock targeted supplemental resources."
        },
        {
            title: "Decentralized JSON Content Schema",
            desc: "I separated chapter content, FAQs, and motivational quotes into independent JSON files so subject-matter updates take seconds without touching the core application logic."
        }
    ],

    evaluation: {
        metric1Title: "Tool Adoption, Engagement & Qualitative Feedback",
        metric1Desc: "I evaluate learner reaction and behavioral adoption (Kirkpatrick Levels 1 and 2) by monitoring active tool utilization, daily sprint completion rates, confidence-tracker engagement, and ongoing learner feedback.",
        metric2Title: "Diagnostic Readiness & Self-Regulated Mastery",
        metric2Desc: "I assess instructional impact (Kirkpatrick Levels 2 and 3) by tracking how structured 80% mastery checkpoints and targeted Pre-Assessment remediation plans improve learner preparedness prior to high-stakes assessments."
    },

    skills: [
        {
            skill: "AI-Assisted Web App Architecture",
            desc: "I translate complex instructional rules into modular front-end code using structured prompting, iterative testing, and clean separation of UI logic from JSON data."
        },
        {
            skill: "Adaptive Routing & Pacing Logic",
            desc: "I design weighted scheduling algorithms and beginner guardrails that adjust workload intensity automatically based on user capacity and diagnostic scores."
        },
        {
            skill: "Self-Regulated Learning UX",
            desc: "I build zero-login, local-storage interfaces with color-coded confidence tracking and pacing alerts that keep adult learners motivated without overwhelming them."
        }
    ],

    demoTitle: "Test the Live Adaptive Learning Paths Application",
    demoIntro: "This is the sanitized portfolio version of the live application. Complete the 6-question onboarding intake below to generate a personalized weekly sprint schedule, test the confidence ratings, or open the Pre-Assessment Analyzer to watch the study plan adapt in real time.",

    renderInteractive: function() {
        return `
        <div class="surface-sandstone rounded p-6 md:p-8">
            <div class="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-[#E5E7EB]">
                <div>
                    <span class="font-mono-tag text-xs text-slate-500 block">Live Sanitized Application</span>
                    <h3 class="font-display text-xl font-bold text-[#111827]">Interactive Study Plan & Diagnostic Engine</h3>
                </div>
                <a href="adaptguide/index.html" target="_blank" rel="noopener" class="btn-primary px-4 py-2 rounded text-xs font-semibold">
                    Open Full Screen in New Tab ↗
                </a>
            </div>
            <div class="w-full h-[680px] rounded overflow-hidden border border-[#E5E7EB] bg-white shadow-md">
                <iframe src="adaptguide/index.html" title="Adaptive Learning Paths Application" class="w-full h-full border-0"></iframe>
            </div>
        </div>`;
    },

    initInteractive: function() {},

    transferability: [
        {
            role: "SaaS Customer Onboarding & Enablement",
            application: "An onboarding team can deploy this intake-to-roadmap engine as an interactive Customer Onboarding Wizard, routing new SaaS clients into Basic, Standard, or Enterprise implementation tracks based on their tech stack and target go-live date."
        },
        {
            role: "User Education & AI Adoption Roadmaps",
            application: "A User Education Lead can adapt this diagnostic intake to sort enterprise employees by current AI familiarity and role, generating personalized weekly practice sprints that move users from first experimentation to repeat daily use."
        },
        {
            role: "Customer Success & Account Health",
            application: "A Customer Success team can repurpose the Green, Yellow, and Red confidence tracker as a client-facing onboarding health checklist, allowing CSMs to spot adoption blockers early and trigger targeted support."
        }
    ]
};
// END OF FILE