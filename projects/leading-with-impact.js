// projects/leading-with-impact.js
window.PORTFOLIO_PROJECTS = window.PORTFOLIO_PROJECTS || {};

window.PORTFOLIO_PROJECTS["leading-with-impact"] = {
    id: "leading-with-impact",
    badge: "Articulate Storyline 360 • Leadership Simulation",
    status: "Interactive Video Walkthrough",
    title: "Leading With Impact: Virtual Meeting Facilitation Lab",
    subtitle: "An interactive branching simulation built in Articulate Storyline 360 with AI-generated video scenarios that trains leaders to run engaging, productive virtual and client-facing meetings.",
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

    // Cross-Industry Transferability Block
    transferability: [
        {
            role: "Live Facilitation & Leadership Enablement",
            application: "Models my own core philosophy as a live facilitator; structuring every virtual session around purposeful pre-planning, active participant engagement, and clear post-session accountability."
        },
        {
            role: "Customer Education & Interactive E-Learning",
            application: "Demonstrates proficiency in Articulate Storyline 360, custom UI/UX states, drag-and-drop interactions, and AI video synthesis to create high-retention digital training."
        }
    ],

    features: [
        {
            title: "3-Phase Meeting Lifecycle Framework",
            desc: "Scaffolded the learning journey around the real flow of a virtual session: Pre-Meeting Planning, Leading & Engaging the Room, and Post-Meeting Follow-Up."
        },
        {
            title: "AI-Generated Branching Video Scenarios",
            desc: "Leveraged AI video tools inside Storyline 360 to place leaders in realistic meeting breakdowns where every decision triggers immediate visual consequences and coaching feedback."
        },
        {
            title: "Dynamic Storyline Interactivity",
            desc: "Built custom drag-and-drop priority rankings, collaboration tool matchers, and clickable infographics to keep learners actively evaluating scenarios."
        },
        {
            title: "Clean Executive UI/UX Design",
            desc: "Designed a distraction-free interface with intentional whitespace, clear visual hierarchy, and consistent navigation to minimize cognitive load."
        },
        {
            title: "Universal Design for Learning (UDL)",
            desc: "Delivered content across multiple modalities such as voiceover, text, AI video, and interactive graphics to support diverse adult learning preferences."
        },
        {
            title: "POUR Accessibility Standards",
            desc: "Engineered with closed captions for all audio, full keyboard navigation, and clear instructions to ensure an inclusive learning experience."
        }
    ],

    evaluation: {
        metric1Title: "Leader Confidence & Scenario Relevance",
        metric1Desc: "Evaluated via post-module surveys measuring leader preparedness and perceived relevance to their daily internal and client meetings.",
        metric2Title: "Decision-Making Accuracy",
        metric2Desc: "Assessed by tracking learner performance across the interactive tool-selection checks and the summative branching video simulation."
    },

    renderInteractive: function() {
        return `
        <div class="surface-sandstone rounded p-6 md:p-8 mb-16">
            <div class="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-[#E5E7EB]">
                <div>
                    <span class="font-mono-tag text-xs text-slate-500 block">Articulate Storyline 360 Simulation Walkthrough</span>
                    <h3 class="font-display text-2xl font-bold text-[#111827]">Watch the Branching Scenarios & Interactive Labs</h3>
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

    initInteractive: function() {}
};
