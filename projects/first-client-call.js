// projects/first-client-call.js
window.PORTFOLIO_PROJECTS = window.PORTFOLIO_PROJECTS || {};

window.PORTFOLIO_PROJECTS["first-client-call"] = {
    id: "first-client-call",
    badge: "Branching Scenario • Consultative Onboarding",
    status: "Empathy Map & Scenario Preview",
    title: "Your First Client Call: Consultative Onboarding Simulation",
    subtitle: "A human-centered, branching onboarding simulation I designed to help new client-facing specialists practice active listening, de-escalation, and consultative discovery before their first live customer call.",
    roles: ["customer-ed", "facilitation", "solutions"],
    metrics: ["Empathy Mapping", "Branching Decisions", "Consultative Discovery"],
    meta: {
        role: "Instructional Designer & Onboarding Architect",
        audience: "New Client Success & Onboarding Specialists",
        stack: "Human-Centered Design, Empathy Mapping, Branching Storyboard",
        impact: "Safe Practice Before Live Client Calls"
    },
    challenge: "New onboarding specialists often know the product features inside and out, yet freeze up on their first live customer call when a client sounds stressed, rushed, or skeptical. Reading static call scripts does not prepare new hires to read emotional cues or pivot a conversation in real time.",
    persona: "Alex, a newly hired client-facing specialist preparing for their first solo onboarding call. Alex feels anxious about making mistakes in front of a paying customer and needs a safe, realistic space to practice discovery questions and de-escalation without risking a real account.",

    features: [
        {
            title: "Human-Centered Empathy Mapping",
            desc: "I started the design process by mapping what a new specialist like Alex says, thinks, does, and feels prior to their first live call so the training addresses real emotional friction rather than just product clicks."
        },
        {
            title: "Realistic Branching Call Decisions",
            desc: "I authored multi-path dialogue branches where learners choose how to respond to an overwhelmed client, immediately seeing how their tone and question framing shift client trust."
        },
        {
            title: "Consultative Discovery Over Script Reading",
            desc: "I structured every scenario around acknowledging client goals first before jumping into software setup, reinforcing consultative habits over robotic feature walkthroughs."
        },
        {
            title: "Natural Consequence Feedback Loops",
            desc: "Instead of generic 'Correct' or 'Incorrect' pop-ups, I wrote realistic client reactions paired with concise coaching notes explaining why a response built or eroded rapport."
        },
        {
            title: "De-Escalation & Expectation Setting",
            desc: "I embedded high-friction moments (such as a client arriving late or frustrated about a previous handoff) so new hires practice staying calm and resetting the agenda."
        },
        {
            title: "Reusable Onboarding Storyboard",
            desc: "I structured the scenario logic modularly so managers can swap in new client personas or product objections as offerings evolve."
        }
    ],

    evaluation: {
        metric1Title: "First-Call Confidence & Readiness",
        metric1Desc: "I evaluate learner confidence through pre- and post-simulation self-assessments and manager call-shadowing rubrics during a new hire's first two weeks.",
        metric2Title: "Discovery & De-Escalation Application",
        metric2Desc: "I measure workplace transfer by reviewing early call recordings for agenda setting, empathy statements, and clear next-step summaries."
    },

    skills: [
        {
            skill: "Human-Centered Discovery & Empathy Mapping",
            desc: "I ground every training build in deep audience research, capturing learner anxieties and workflow realities before writing a single scenario."
        },
        {
            skill: "Branching Scenario Authoring",
            desc: "I write authentic, high-stakes workplace dialogues with realistic consequences that build practical judgment rather than rote memorization."
        },
        {
            skill: "Consultative Onboarding Coaching",
            desc: "I distill years of 1:1 client onboarding experience into repeatable communication frameworks that help new hires sound calm and credible."
        }
    ],

    demoTitle: "Inspect the Learner Empathy Map & Branching Call Preview",
    demoIntro: "Switch between the two tabs below to inspect the Empathy Map I created for learner persona Alex and test a live branching decision point from the onboarding call simulation.",

    renderInteractive: function() {
        return `
        <div class="surface-sandstone rounded p-6 md:p-8">
            <div class="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-[#E5E7EB]">
                <div>
                    <span class="font-mono-tag text-xs text-slate-500 block">Interactive Design Artifact</span>
                    <h3 class="font-display text-xl font-bold text-[#111827]">Empathy Map & Live Decision Point</h3>
                </div>
                <div class="flex flex-wrap gap-2">
                    <button onclick="switchCallTab(0)" class="call-tab filter-pill active px-3.5 py-1.5 rounded text-xs font-semibold">1. Persona Empathy Map (Alex)</button>
                    <button onclick="switchCallTab(1)" class="call-tab filter-pill px-3.5 py-1.5 rounded text-xs font-semibold">2. Try a Branching Call Moment</button>
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
                    <div class="mb-4 pb-3 border-b border-[#E5E7EB]">
                        <span class="font-mono-tag text-[10px] text-slate-500 block">Human-Centered Discovery Artifact</span>
                        <h4 class="font-display font-bold text-lg text-[#111827]">Learner Persona Empathy Map: Alex</h4>
                    </div>
                    <img src="assets/AlexPersona.png" alt="Empathy Map for Learner Persona Alex" class="w-full h-auto rounded border border-[#E5E7EB]">
                `;
            } else {
                body.innerHTML = `
                    <div class="mb-4 pb-3 border-b border-[#E5E7EB]">
                        <span class="font-mono-tag text-[10px] text-slate-500 block">Scenario Checkpoint • Minute 2 of Onboarding Call</span>
                        <h4 class="font-display font-bold text-lg text-[#111827]">Client: "Honestly, I only have 15 minutes and I already feel behind on setting this up."</h4>
                    </div>
                    <p class="text-xs text-[#4B5563] mb-4">Choose how you respond to see the client reaction and coaching debrief:</p>
                    <div class="grid md:grid-cols-2 gap-4 text-xs mb-5">
                        <button onclick="pickCallOption(0)" class="text-left p-4 rounded surface-sandstone hover:border-[#111827] border border-transparent transition-all">
                            <strong class="block text-[#111827] mb-1">Option A: Jump Straight Into Screen Share</strong>
                            <span class="text-[#4B5563]">"No problem, let's hurry and share your screen so I can click through all the settings before you have to go."</span>
                        </button>
                        <button onclick="pickCallOption(1)" class="text-left p-4 rounded surface-sandstone hover:border-[#111827] border border-transparent transition-all">
                            <strong class="block text-[#111827] mb-1">Option B: Acknowledge, Prioritize & Narrow Scope</strong>
                            <span class="text-[#4B5563]">"I completely hear you, and we will respect your 15 minutes. Let's focus strictly on the one setup step you need for tomorrow, and I will send a quick guide for the rest."</span>
                        </button>
                    </div>
                    <div id="call-feedback-box" class="hidden p-4 rounded bg-[#0F172A] text-[#FAF8F5] text-xs"></div>
                `;
            }
        };

        window.pickCallOption = function(opt) {
            const box = document.getElementById('call-feedback-box');
            if (!box) return;
            box.classList.remove('hidden');
            if (opt === 0) {
                box.innerHTML = `
                    <span class="font-mono-tag text-[10px] text-amber-300 block mb-1">Client Reaction: Overwhelmed & Rushed</span>
                    <p class="leading-relaxed"><strong>Coaching Note:</strong> Rushing through every setting when a client is already stressed increases cognitive overload and leads to repeat support tickets. Pause first to validate their time constraint and narrow the goal to one immediate win.</p>
                `;
            } else {
                box.innerHTML = `
                    <span class="font-mono-tag text-[10px] text-emerald-300 block mb-1">✓ Client Reaction: Relieved & Engaged</span>
                    <p class="leading-relaxed"><strong>Coaching Note:</strong> Strong consultative move! Acknowledging their time limit lowers anxiety immediately, focuses the live call on their highest-priority outcome, and positions your follow-up SOP as a helpful safety net.</p>
                `;
            }
        };
        window.switchCallTab(0);
    },

    transferability: [
        {
            role: "Customer Success & Account Management",
            application: "A Customer Success team can deploy this branching call simulation during new-hire ramp-up so CSMs practice handling executive pushback, renewal objections, and rushed kickoff calls safely."
        },
        {
            role: "Solutions Engineering & Pre/Post-Sales",
            application: "A Solutions team can swap in technical discovery scenarios to train engineers on uncovering root business needs before launching into a live product demo."
        },
        {
            role: "User Education & Customer Support",
            application: "A Support or User Education team can adapt this empathy-map-to-scenario structure to train frontline agents on de-escalating frustrated users who feel intimidated by new software or AI tools."
        }
    ]
};
// END OF FILE