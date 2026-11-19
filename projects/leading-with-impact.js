// projects/leading-with-impact.js
window.PORTFOLIO_PROJECTS = window.PORTFOLIO_PROJECTS || {};

window.PORTFOLIO_PROJECTS["leading-with-impact"] = {
    id: "leading-with-impact",
    badge: "Articulate Storyline 360 • Leadership Simulation",
    status: "Interactive Video Walkthrough",
    title: "Leading With Impact: Virtual Facilitation Lab",
    subtitle: "An interactive branching simulation I built in Articulate Storyline 360 with AI-generated video scenarios that trains leaders to run engaging, productive virtual and client-facing meetings.",
    roles: ["facilitation", "lxd-data", "customer-ed"],
    metrics: ["Articulate Storyline 360", "AI Video Scenarios", "UDL & POUR Accessible"],
    meta: {
        role: "Instructional Designer & E-Learning Developer",
        audience: "Mid-to-Senior Corporate Leaders",
        stack: "Articulate Storyline 360, AI Video Generation, WCAG/POUR",
        impact: "End-to-End Virtual Facilitation Mastery"
    },
    challenge: "In hybrid corporate environments, leaders frequently struggle to keep virtual rooms engaged, select the right collaboration tools, and drive clear follow-through. Passive training on meeting etiquette rarely changes behavior when a real team or customer call goes off track.",
    persona: "Mid-to-senior-level professionals at a global logistics organization who need practical, decision-based practice that translates directly into confident leadership during internal and customer meetings.",

    features: [
        {
            title: "3-Phase Meeting Lifecycle Framework",
            desc: "I scaffolded the learning journey around the real flow of a virtual session: Pre-Meeting Planning, Leading and Engaging the Room, and Post-Meeting Follow-Up."
        },
        {
            title: "AI-Generated Branching Video Scenarios",
            desc: "I used AI video tools inside Storyline 360 to place leaders in realistic meeting breakdowns where every decision triggers immediate visual consequences and coaching feedback."
        },
        {
            title: "Dynamic Storyline Interactivity",
            desc: "I built custom drag-and-drop priority rankings, collaboration tool matchers, and clickable infographics to keep learners actively evaluating scenarios."
        },
        {
            title: "Clean Executive UI/UX Design",
            desc: "I designed a distraction-free interface with intentional whitespace, clear visual hierarchy, and consistent navigation to minimize cognitive load."
        },
        {
            title: "Universal Design for Learning (UDL)",
            desc: "I delivered content across multiple modalities (voiceover, text, AI video, and interactive graphics) to support diverse adult learning preferences."
        },
        {
            title: "POUR Accessibility Standards",
            desc: "I engineered the module with closed captions for all audio, full keyboard navigation, and clear instructions to ensure an inclusive learning experience."
        }
    ],

    evaluation: {
        metric1Title: "Leader Confidence & Scenario Relevance",
        metric1Desc: "I designed post-module surveys to measure leader preparedness and perceived relevance to their daily internal and client meetings.",
        metric2Title: "Decision-Making Accuracy",
        metric2Desc: "I built in tracking across the interactive tool-selection checks and the summative branching video simulation to verify applied judgment."
    },

    skills: [
        {
            skill: "Articulate Storyline 360 Development",
            desc: "I build custom UI states, branching logic, drag-and-drop interactions, and clickable infographics inside Storyline 360 to turn static topics into active decision labs."
        },
        {
            skill: "AI Video & Scenario Synthesis",
            desc: "I integrate AI-generated video scenarios into e-learning modules so learners can practice navigating tense virtual room moments with realistic visual feedback."
        },
        {
            skill: "Accessible LXD (UDL & POUR)",
            desc: "I design inclusive learning experiences from the ground up using closed captions, keyboard navigation, and multimodal content delivery."
        }
    ],

    demoTitle: "Watch the Storyline 360 Simulation Walkthrough",
    demoIntro: "Watch the walkthrough below to see the 3-phase meeting framework, custom drag-and-drop activities, and AI-generated branching video scenarios I built inside Articulate Storyline 360.",

    renderInteractive: function() {
        return `
        <div class="surface-sandstone rounded p-6 md:p-8">
            <div class="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-[#E5E7EB]">
                <div>
                    <span class="font-mono-tag text-xs text-slate-500 block">Articulate Storyline 360 Simulation Walkthrough</span>
                    <h3 class="font-display text-xl font-bold text-[#111827]">Branching Scenarios & Interactive Labs Preview</h3>
                </div>
                <a href="https://www.youtube.com/watch?v=r4fp_e3Ur00" target="_blank" rel="noopener" class="btn-primary px-4 py-2 rounded text-xs font-semibold">
                    Open Video on YouTube ↗
                </a>
            </div>
            <div class="aspect-video w-full max-w-4xl mx-auto rounded overflow-hidden border border-[#E5E7EB] bg-black shadow-lg">
                <iframe class="w-full h-full" src="https://www.youtube.com/embed/r4fp_e3Ur00" title="Leading With Impact Storyline Simulation" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
        </div>`;
    },

    initInteractive: function() {},

    transferability: [
        {
            role: "User Education & Live Customer Workshops",
            application: "A User Education Lead can adapt this 3-phase facilitation framework (pre-planning, active room engagement, and post-session follow-up) to standardize how internal trainers and partner champions deliver live customer workshops."
        },
        {
            role: "Customer Success & Executive QBRs",
            application: "A Customer Success team can repurpose this branching AI video simulation structure to train CSMs on running high-stakes Quarterly Business Reviews (QBRs) and keeping executive stakeholders engaged."
        },
        {
            role: "Enterprise L&D & Interactive E-Learning",
            application: "An L&D or Enablement team can use this accessible Storyline 360 template as a scalable self-serve module for onboarding new managers and technical facilitators across global regions."
        }
    ]
};
// END OF FILE