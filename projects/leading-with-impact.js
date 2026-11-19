// projects/leading-with-impact.js
window.PORTFOLIO_PROJECTS = window.PORTFOLIO_PROJECTS || {};

window.PORTFOLIO_PROJECTS["leading-with-impact"] = {
    id: "leading-with-impact",
    badge: "Virtual Facilitation • Adult Learning & Engagement",
    status: "Interactive Facilitation Lab",
    title: "Leading With Impact: Virtual Facilitation Lab",
    subtitle: "A practical virtual facilitation framework and interactive micro-lab I designed to help instructors, managers, and team leads turn quiet, camera-off video calls into active, discussion-driven workshops.",
    roles: ["facilitation", "customer-ed", "lxd-data"],
    metrics: ["Virtual Engagement", "Psychological Safety", "Interactive Polling"],
    meta: {
        role: "Lead Facilitator & Instructional Designer",
        audience: "Virtual Facilitators, Managers & Team Leads",
        stack: "Adult Learning Theory, Mentimeter, Slido, MS Teams, HTML/JS",
        impact: "Higher Live Participation & Peer Discussion"
    },
    challenge: "Remote workshops and virtual trainings frequently stall out in awkward silence. Even knowledgeable facilitators fall into the trap of reading slide decks for 45 minutes straight while participants multitask off-camera, leaving teams with low retention and missed opportunities for peer learning.",
    persona: "Subject-matter experts, instructors, and managers who know their material well but want concrete, repeatable techniques to spark participation, build psychological safety, and manage live chat and breakout rooms smoothly.",

    features: [
        {
            title: "The 5-Minute Interaction Rule",
            desc: "I built the lab around a pacing cadence that introduces a low-friction interaction (chat waterfall, live poll, or quick reaction) every 5 minutes to prevent passive listening."
        },
        {
            title: "Psychological Safety Openers",
            desc: "I designed warm, low-stakes opening prompts using Mentimeter and Slido that invite every voice into the room early without putting quieter participants on the spot."
        },
        {
            title: "Discussion Over Monologue Architecture",
            desc: "I structured facilitation guides around open-ended coaching questions so participants surface real workplace challenges and learn directly from their peers."
        },
        {
            title: "Live Room Recovery Tactics",
            desc: "I documented practical recovery moves for common virtual roadblocks, including silent breakout rooms, off-topic tangents, and uneven participation."
        },
        {
            title: "Multi-Modal Participation Channels",
            desc: "I designed parallel engagement paths (verbal mic, live chat, anonymous polls) so introverted and extroverted learners alike can contribute comfortably."
        },
        {
            title: "Actionable Post-Session Handoffs",
            desc: "I paired every live session blueprint with a concise 1-page takeaway guide so key strategies stick long after the video call ends."
        }
    ],

    evaluation: {
        metric1Title: "Active Live Participation Rate",
        metric1Desc: "I track engagement across live polls, chat waterfall responses, and breakout debriefs to verify that participation is distributed across the whole room rather than just two vocal attendees.",
        metric2Title: "Post-Session Confidence & Application",
        metric2Desc: "I gather quick end-of-session pulse feedback asking participants to name one technique they will apply in their very next virtual meeting or training."
    },

    skills: [
        {
            skill: "High-Trust Virtual Facilitation",
            desc: "I create warm, energetic remote rooms where participants feel safe speaking up, testing ideas, and learning alongside their peers."
        },
        {
            skill: "Interactive Engagement Tooling",
            desc: "I weave Mentimeter, Slido, live chat waterfalls, and structured breakout prompts seamlessly into virtual sessions without technical friction."
        },
        {
            skill: "Adult Learning & Pacing Design",
            desc: "I apply adult learning principles to balance concise concept framing with immediate, relevant peer discussion."
        }
    ],

    demoTitle: "Test the Virtual Facilitation Playbook Selector",
    demoIntro: "Select a common virtual training challenge below to inspect the live facilitation move, tool pairing, and facilitator script I use to turn the room around.",

    renderInteractive: function() {
        return `
        <div class="surface-sandstone rounded p-6 md:p-8">
            <div class="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-[#E5E7EB]">
                <div>
                    <span class="font-mono-tag text-xs text-slate-500 block">Interactive Playbook</span>
                    <h3 class="font-display text-xl font-bold text-[#111827]">Live Room Troubleshooting & Engagement Moves</h3>
                </div>
                <div class="flex flex-wrap gap-2">
                    <button onclick="switchFacilTab(0)" class="facil-tab filter-pill active px-3.5 py-1.5 rounded text-xs font-semibold">1. Silent Camera-Off Room</button>
                    <button onclick="switchFacilTab(1)" class="facil-tab filter-pill px-3.5 py-1.5 rounded text-xs font-semibold">2. One Person Dominating</button>
                    <button onclick="switchFacilTab(2)" class="facil-tab filter-pill px-3.5 py-1.5 rounded text-xs font-semibold">3. Low Breakout Energy</button>
                </div>
            </div>
            <div id="facil-sandbox-body" class="bg-white rounded border border-[#E5E7EB] p-6"></div>
        </div>`;
    },

    initInteractive: function() {
        window.switchFacilTab = function(idx) {
            document.querySelectorAll('.facil-tab').forEach((b, i) => b.classList.toggle('active', i === idx));
            const body = document.getElementById('facil-sandbox-body');
            if (!body) return;

            const plays = [
                {
                    scenario: "You ask an open question to 25 people on Teams and get complete silence.",
                    move: "Switch immediately to a 20-second Chat Waterfall or anonymous Slido/Mentimeter poll.",
                    script: "“Before anyone unmutes, type one word in the chat describing your biggest hurdle this week, wait for my countdown, and hit Enter together on 3, 2, 1...”",
                    why: "Lowering the social friction from speaking on mic to typing simultaneously breaks the ice and gives you 15+ real responses to react to."
                },
                {
                    scenario: "One enthusiastic attendee answers every question while quieter peers tune out.",
                    move: "Validate their insight, then intentionally widen the floor using structured turn-taking.",
                    script: "“That is a great point, thank you for kicking us off. I would love to hear a different angle from someone who works with a different team or who has not jumped in yet.”",
                    why: "Preserves psychological safety for the vocal contributor while signaling clearly that every perspective in the room matters."
                },
                {
                    scenario: "Participants enter breakout rooms unsure of what to discuss and sit quietly.",
                    move: "Assign a concrete, time-boxed deliverable and a simple role prompt before opening rooms.",
                    script: "“You have 7 minutes to pick one scenario, draft a 3-sentence response in your workbook, and choose one person to share your top takeaway when we return.”",
                    why: "Clear constraints and a shared artifact remove ambiguity so groups jump straight into productive collaboration."
                }
            ];

            const p = plays[idx];
            body.innerHTML = `
                <div class="grid md:grid-cols-2 gap-6 text-xs">
                    <div class="space-y-4">
                        <div class="p-4 rounded surface-sandstone">
                            <span class="font-mono-tag text-[10px] text-slate-500 block mb-1">The Live Room Challenge</span>
                            <p class="font-bold text-sm text-[#111827]">${p.scenario}</p>
                        </div>
                        <div class="p-4 rounded surface-sandstone">
                            <span class="font-mono-tag text-[10px] text-slate-500 block mb-1">Facilitation Move</span>
                            <p class="text-[#4B5563] leading-relaxed">${p.move}</p>
                        </div>
                    </div>
                    <div class="p-5 rounded bg-[#0F172A] text-[#FAF8F5] flex flex-col justify-between">
                        <div>
                            <span class="font-mono-tag text-[10px] text-emerald-300 block mb-2">Sample Facilitator Script</span>
                            <p class="text-sm italic leading-relaxed mb-4">${p.script}</p>
                        </div>
                        <div class="pt-3 border-t border-white/10">
                            <span class="font-mono-tag text-[10px] text-[#E5E7EB]/60 block mb-1">Why It Works</span>
                            <p class="text-[#E5E7EB]/90 leading-relaxed">${p.why}</p>
                        </div>
                    </div>
                </div>
            `;
        };
        window.switchFacilTab(0);
    },

    transferability: [
        {
            role: "User Education & Live Customer Workshops",
            application: "A User Education Lead can apply these exact engagement moves to live enterprise AI workshops and product webinars, turning passive viewers into active hands-on builders."
        },
        {
            role: "Customer Success & Executive QBRs",
            application: "A Customer Success team can use these facilitation scripts to run more interactive Quarterly Business Reviews (QBRs) where client stakeholders actively co-create adoption goals."
        },
        {
            role: "Internal L&D & Manager Enablement",
            application: "An internal L&D team can package this micro-lab as a self-serve toolkit for new people managers and technical trainers stepping into remote facilitation for the first time."
        }
    ]
};
// END OF FILE