// projects/digital-accessibility-module.js
window.PORTFOLIO_PROJECTS = window.PORTFOLIO_PROJECTS || {};

window.PORTFOLIO_PROJECTS["digital-accessibility-module"] = {
    id: "digital-accessibility-module",
    badge: "Self-Paced LXD • Digital Accessibility & UDL",
    status: "Live Interactive Module",
    title: "Inclusive by Default: Remote Workplace Accessibility",
    subtitle: "A self-paced, 8-pane interactive learning module I designed and built through AI-assisted rapid prototyping to teach ADA, WCAG 2.2, and Universal Design for Learning (UDL) across both higher education and corporate remote environments.",
    roles: ["lxd-data", "customer-ed", "facilitation"],
    metrics: ["8-Pane UDL Stepper", "Dual Context Toggle", "Built-In A11y Toolbar"],
    meta: {
        role: "Learning Experience Designer & Creative Director",
        audience: "Remote Teams, Instructors & Enablement Leads",
        stack: "HTML5, CSS3, Vanilla JS, Web Speech API, AI-Assisted Coding",
        impact: "Accessible-by-Design Self-Paced Enablement"
    },
    challenge: "Digital accessibility training is often delivered as a dry compliance checklist or a long, dense scrolling page that ironically creates cognitive overload. Remote instructors and corporate teams need practical, scenario-based practice spotting real barriers in emails, slide decks, and live sessions without getting buried in legal jargon.",
    persona: "Remote educators, course designers, and distributed corporate teammates who want actionable habits for creating inclusive documents, slides, and live sessions from day one.",

    features: [
        {
            title: "Intentional UDL Slide-Pane Chunking",
            desc: "Instead of a long scrolling page, I structured the module into 8 focused panes with numbered navigation. Chunking content into bite-sized steps directly applies Universal Design for Learning by reducing cognitive load."
        },
        {
            title: "Persistent Dual-Context Toggle",
            desc: "Learners can switch seamlessly between Online University (default) and Corporate Remote at any point. Every example, audit, ranking scenario, and checklist adapts dynamically while keeping session state intact."
        },
        {
            title: "Built-In Accessibility Tools & Audio Reader",
            desc: "A floating side widget models inclusive design directly inside the module, offering High-Contrast Dark Mode, root-level Large Text scaling, Readable Spacing, a keyboard navigation guide, and a Web Speech API voice reader with pause, resume, and voice selection."
        },
        {
            title: "Spot & Fix Audit 1 (Written Content)",
            desc: "Learners toggle four real-time fixes on a broken announcement or team email (color contrast, descriptive links, alt text, and scannable headings) while preserving a natural human greeting."
        },
        {
            title: "Spot & Fix Audit 2 (Through Their Eyes)",
            desc: "A two-step live presentation slide audit where learners first distinguish 3 real barriers from 2 realistic distractors, then match each barrier to the most impacted attendee, review the exact WCAG and UDL rules, and apply the fix live."
        },
        {
            title: "In the Moment (4-Phase Priority Ranking)",
            desc: "A keyboard-accessible ranking exercise covering pre-session barriers, live curveballs, participant follow-up, and closing the loop. Instead of obvious wrong answers, learners navigate well-intentioned traps and receive a full 4-position debrief."
        }
    ],

    evaluation: {
        metric1Title: "Practical Barrier Recognition",
        metric1Desc: "Evaluated through the two-step slide audit and written content fixes, where learners must separate genuine WCAG/UDL barriers from passing distractors and connect each fix to the specific attendee it supports.",
        metric2Title: "Decision-Making Under Nuance",
        metric2Desc: "Measured through the 4-phase priority ranking debrief, which surfaces subtle, well-intentioned traps (such as publicly singling out a participant) and compares the learner's full ranking against inclusive best practices."
    },

    skills: [
        {
            skill: "Inclusive & UDL-First Architecture",
            desc: "I design learning experiences that model the standards they teach, combining semantic HTML, full keyboard operability, contrast compliance, and chunked pacing."
        },
        {
            skill: "Scenario & Audit Design",
            desc: "I replace passive compliance slides with active before-and-after audits and nuanced priority-ranking exercises that challenge learners to think through real-world tradeoffs."
        },
        {
            skill: "AI-Assisted Rapid Prototyping",
            desc: "I direct AI-assisted front-end development while owning the instructional storyboard, accessibility QA, distractor design, and state-driven evaluation logic."
        }
    ],

    demoTitle: "Explore the Live Accessibility Mini-Module",
    demoIntro: "Test the persistent Online University / Corporate Remote toggle in the top-right corner, open the floating Accessibility Tools button on the right to try the built-in voice reader or contrast modes, and walk through the two audits and 4-phase ranking exercise.",

    renderInteractive: function() {
        return `
        <div class="surface-sandstone rounded p-6 md:p-8">
            <div class="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-[#E5E7EB]">
                <div>
                    <span class="font-mono-tag text-xs text-slate-500 block">Self-Paced Web Module • 8 Interactive Panes</span>
                    <h3 class="font-display text-xl font-bold text-[#111827]">Inclusive by Default: Interactive Experience</h3>
                </div>
                <a href="projects/digital-accessibility-module/index.html" target="_blank" rel="noopener" class="btn-primary px-4 py-2 rounded text-xs font-semibold">
                    Open Module Full-Screen in New Tab ↗
                </a>
            </div>

            <div class="w-full h-[720px] rounded overflow-hidden border border-[#E5E7EB] bg-[#F7F5F0] shadow-sm">
                <iframe src="projects/digital-accessibility-module/index.html" title="Inclusive by Default Digital Accessibility Mini-Module" class="w-full h-full border-0"></iframe>
            </div>
        </div>`;
    },

    transferability: [
        {
            role: "Enterprise L&D & Compliance Enablement",
            application: "L&D teams can adapt this 8-pane stepper and dual-context toggle to turn mandatory compliance topics (such as security, privacy, or DEI) into short, interactive modules tailored by department."
        },
        {
            role: "Customer Education & Onboarding",
            application: "Customer Education teams can reuse the Spot & Fix audit pattern to teach users how to configure accessible dashboards, templates, or customer-facing portals directly inside a safe sandbox."
        },
        {
            role: "Higher-Ed Faculty Development",
            application: "Instructional design teams can deploy this exact module as a self-paced faculty onboarding resource, paired with the printable Quick-Check checklist for ongoing course QA."
        }
    ]
};
// END OF FILE