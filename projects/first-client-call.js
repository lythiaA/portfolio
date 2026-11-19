// projects/first-client-call.js
window.PORTFOLIO_PROJECTS = window.PORTFOLIO_PROJECTS || {};

window.PORTFOLIO_PROJECTS["first-client-call"] = {
    id: "first-client-call",
    badge: "E-Learning Module • Consultative Onboarding",
    status: "Video Walkthrough & Empathy Map",
    title: "Your First Client Call: Consultative Onboarding Simulation",
    subtitle: "A human-centered onboarding module I designed to help new implementation and client-facing specialists practice active listening, de-escalation, and consultative discovery before their first live customer call.",
    roles: ["customer-ed", "facilitation", "solutions"],
    metrics: ["Empathy Mapping", "Video Walkthrough", "Consultative Discovery"],
    meta: {
        role: "Instructional Designer & Onboarding Architect",
        audience: "New Implementation & Client Success Specialists",
        stack: "Canvas LMS, Articulate 360, Human-Centered Design, Empathy Mapping",
        impact: "Higher Self-Efficacy & First-Call Readiness"
    },
    challenge: "New onboarding specialists often know product features inside and out, yet freeze up on their first live customer call when a client sounds stressed, rushed, or skeptical. Reading static call scripts does not prepare new hires to read emotional cues or pivot a conversation in real time.",
    persona: "Alex, a newly hired client-facing specialist preparing for their first solo onboarding call. Alex feels anxious about making mistakes in front of a paying customer and needs a safe, realistic preparation module to build confidence before stepping into live calls.",

    features: [
        {
            title: "Human-Centered Empathy Mapping",
            desc: "I started the design process by mapping what a new specialist like Alex says, thinks, does, and feels prior to their first live call so the module addresses real emotional friction rather than just software clicks."
        },
        {
            title: "Structured Onboarding Preparation Flow",
            desc: "I built the course module inside Canvas to guide new hires step-by-step from pre-call preparation and agenda setting through active listening and follow-up documentation."
        },
        {
            title: "Consultative Discovery Over Script Reading",
            desc: "I structured the activities around acknowledging client goals first before jumping into platform setup, reinforcing consultative habits over robotic feature walkthroughs."
        },
        {
            title: "Peer Review & Feedback Loops",
            desc: "I incorporated structured peer feedback so new hires could practice call responses, observe how colleagues handle tough moments, and build self-efficacy together."
        },
        {
            title: "De-Escalation & Expectation Setting",
            desc: "I embedded realistic high-friction scenarios (such as a client arriving late or overwhelmed) so new hires practice staying calm and narrowing the call agenda."
        },
        {
            title: "Research-Backed Instructional Design",
            desc: "I grounded the module in adult learning and self-efficacy research, validating the learning experience through pre- and post-module learner surveys and thematic analysis."
        }
    ],

    evaluation: {
        metric1Title: "First-Call Self-Efficacy & Confidence",
        metric1Desc: "I evaluated learner readiness using pre- and post-module self-efficacy surveys alongside thematic analysis of learner reflections to measure confidence gains.",
        metric2Title: "Discovery & Communication Application",
        metric2Desc: "I designed the assessment criteria around observable call behaviors: clear agenda setting, empathy statements, and concise post-call summaries."
    },

    skills: [
        {
            skill: "Human-Centered Discovery & Empathy Mapping",
            desc: "I ground every training build in audience research, capturing learner anxieties and workflow realities before designing a single lesson."
        },
        {
            skill: "LMS Course & Multimedia Authoring",
            desc: "I build polished, navigable e-learning experiences combining Canvas LMS structure, visual assets, and guided walkthrough media."
        },
        {
            skill: "Consultative Onboarding Coaching",
            desc: "I translate real 1:1 client onboarding experience into practical communication frameworks that help new hires sound calm and credible."
        }
    ],

    demoTitle: "Watch the Module Walkthrough & Inspect the Empathy Map",
    demoIntro: "Watch the video walkthrough of the 'Your First Client Call' module below, or switch to the second tab to inspect the Empathy Map I created for learner persona Alex.",

    renderInteractive: function() {
        return `
        <div class="surface-sandstone rounded p-6 md:p-8">
            <div class="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-[#E5E7EB]">
                <div>
                    <span class="font-mono-tag text-xs text-slate-500 block">Project Deliverables</span>
                    <h3 class="font-display text-xl font-bold text-[#111827]">Module Video Walkthrough & Discovery Artifact</h3>
                </div>
                <div class="flex flex-wrap gap-2">
                    <button onclick="switchCallTab(0)" class="call-tab filter-pill active px-3.5 py-1.5 rounded text-xs font-semibold">1. Module Video Walkthrough</button>
                    <button onclick="switchCallTab(1)" class="call-tab filter-pill px-3.5 py-1.5 rounded text-xs font-semibold">2. Persona Empathy Map (Alex)</button>
                </div>
            </div>
            <div id="call-sandbox-body" class="bg-white rounded border border-[#E5E7EB] p-6"></div>
        </div>`;
    },

    initInteractive: function() {
        window.switchCallTab = function(idx) {
            document.querySelectorAll('.call-tab').forEach((b, i) => b.classList.toggle('active', i === idx));
            const body = document.getElementById('call-sandbox-body');
            if (!body) return;

            if (idx === 0) {
                body.innerHTML = `
                    <div class="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-[#E5E7EB]">
                        <div>
                            <span class="font-mono-tag text-[10px] text-slate-500 block">Video Walkthrough</span>
                            <h4 class="font-display font-bold text-lg text-[#111827]">Your First Client Call: Module Preview</h4>
                        </div>
                        <a href="https://youtu.be/3v80Ql8X7gY" target="_blank" rel="noopener" class="font-mono-tag text-[11px] text-[#111827] underline underline-offset-4">
                            Watch on YouTube ↗
                        </a>
                    </div>
                    <div class="relative w-full aspect-video rounded overflow-hidden border border-[#E5E7EB] bg-black">
                        <iframe src="https://www.youtube.com/embed/3v80Ql8X7gY" title="Your First Client Call Walkthrough" class="absolute inset-0 w-full h-full border-0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                `;
            } else {
                body.innerHTML = `
                    <div class="mb-4 pb-3 border-b border-[#E5E7EB]">
                        <span class="font-mono-tag text-[10px] text-slate-500 block">Human-Centered Discovery Artifact</span>
                        <h4 class="font-display font-bold text-lg text-[#111827]">Learner Persona Empathy Map: Alex</h4>
                    </div>
                    <img src="assets/AlexPersona.png" alt="Empathy Map for Learner Persona Alex" class="w-full h-auto rounded border border-[#E5E7EB]">
                `;
            }
        };
        window.switchCallTab(0);
    },

    transferability: [
        {
            role: "Customer Success & Account Management",
            application: "A Customer Success team can deploy this onboarding preparation structure during new-hire ramp-up so CSMs practice handling rushed kickoff calls, executive expectations, and renewal discovery safely."
        },
        {
            role: "Solutions Engineering & Pre/Post-Sales",
            application: "A Solutions team can swap in technical discovery scenarios to train specialists on uncovering root business needs before launching into a live product demo."
        },
        {
            role: "User Education & Customer Support",
            application: "A Support or User Education team can adapt this empathy-map-to-module blueprint to train frontline agents on guiding frustrated users who feel intimidated by new software or AI tools."
        }
    ]
};
// END OF FILE