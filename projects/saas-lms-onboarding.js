// projects/saas-lms-onboarding.js
window.PORTFOLIO_PROJECTS = window.PORTFOLIO_PROJECTS || {};

window.PORTFOLIO_PROJECTS["saas-lms-onboarding"] = {
    id: "saas-lms-onboarding",
    badge: "Post-Sales Onboarding • SaaS & LMS Enablement",
    status: "Interactive Enablement Sandbox",
    title: "SaaS to LMS Onboarding Playbook and Agentic AI Guide",
    subtitle: "A post-sales onboarding and customer education system I built to guide faculty and administrators through 1:1 LMS connections (Canvas, D2L), backed by structured SOP documentation and an agentic AI troubleshooting workflow.",
    roles: ["solutions", "customer-ed", "facilitation"],
    metrics: ["1:1 Client Setup", "SOP Documentation", "Agentic AI Triage"],
    meta: {
        role: "Customer Integration & Enablement Specialist",
        audience: "Higher-Ed Faculty, Course Leads & LMS Admins",
        stack: "Canvas, D2L, SaaS Platforms, Salesforce, Agentic AI",
        impact: "Streamlined Rollouts & Self-Service Adoption"
    },
    challenge: "When adopting a new digital learning platform, instructors and administrators frequently feel overwhelmed connecting their third-party SaaS product to their institution's LMS (Canvas or D2L). Without structured 1:1 guidance and clear documentation, minor setup missteps like broken course links or unsynced gradebooks create frustration and delay launch readiness.",
    persona: "Time-strapped faculty members and course administrators preparing for an upcoming term. They do not want dense technical jargon; they need a calm, consultative 1:1 walkthrough to get their course connected, paired with simple reference guides they can reuse independently each semester.",

    features: [
        {
            title: "1:1 Consultative Setup Facilitation",
            desc: "I lead live screen-share implementation calls where clients connect their SaaS platform to Canvas or D2L step-by-step, building hands-on confidence before day one."
        },
        {
            title: "Structured, Visual SOP Documentation",
            desc: "I author clear Standard Operating Procedures with prerequisites, numbered configuration steps, and verification checks so clients can repeat setups without guesswork."
        },
        {
            title: "Agentic AI Troubleshooting Workflow",
            desc: "I designed an agentic AI triage assistant concept that analyzes a client's setup symptom, identifies the likely configuration miss, and drafts a clear follow-up action plan for the specialist."
        },
        {
            title: "End-to-End Rollout Tracking in Salesforce",
            desc: "I manage implementation pipelines, log session milestones, and track adoption readiness in Salesforce to ensure predictable, zero-surprise term launches."
        },
        {
            title: "Course Shell & Module Readiness QA",
            desc: "I verify that deployed course links, assignment weights, and learner-view permissions function properly across Canvas and D2L environments."
        },
        {
            title: "Proactive Friction Reduction",
            desc: "I document recurring snags during course copy and semester rollover so I can address them proactively during live training before tickets pile up."
        }
    ],

    evaluation: {
        metric1Title: "Implementation Velocity & Launch Readiness",
        metric1Desc: "I track Salesforce project milestones to verify that instructors complete their LMS connection and gradebook checks ahead of term start dates.",
        metric2Title: "User Confidence & Repeat Ticket Reduction",
        metric2Desc: "I evaluate whether clients complete subsequent term rollovers independently using the self-serve SOPs, reducing repeat support requests for basic course linking."
    },

    skills: [
        {
            skill: "Consultative 1:1 Implementation",
            desc: "I guide non-technical stakeholders through live software integrations without jargon, balancing technical accuracy with patient, hands-on coaching."
        },
        {
            skill: "Self-Serve SOP & Enablement Authoring",
            desc: "I turn recurring client questions into structured Standard Operating Procedures that help users move from a first guided setup to repeat independent use."
        },
        {
            skill: "Agentic AI Workflow Design",
            desc: "I map real post-sales troubleshooting logic into structured AI triage prompts that speed up diagnosis while keeping human specialists in control of the final response."
        }
    ],

    demoTitle: "Explore the 3-Part Client Implementation Sandbox",
    demoIntro: "Use the three tabs below to inspect how I structure a live 1:1 onboarding call, review a sample LMS Integration Standard Operating Procedure (SOP), and test the agentic AI triage assistant on two common post-sales tickets.",

    renderInteractive: function() {
        return `
        <div class="surface-sandstone rounded p-6 md:p-8">
            <div class="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-[#E5E7EB]">
                <div>
                    <span class="font-mono-tag text-xs text-slate-500 block">Interactive Sandbox</span>
                    <h3 class="font-display text-xl font-bold text-[#111827]">Post-Sales Onboarding & AI Triage Preview</h3>
                </div>
                <div class="flex flex-wrap gap-2" id="saas-tabs">
                    <button onclick="switchSaasTab(0)" class="saas-tab filter-pill active px-3.5 py-1.5 rounded text-xs font-semibold">1. 1:1 Setup Call Playbook</button>
                    <button onclick="switchSaasTab(1)" class="saas-tab filter-pill px-3.5 py-1.5 rounded text-xs font-semibold">2. LMS Integration SOP</button>
                    <button onclick="switchSaasTab(2)" class="saas-tab filter-pill px-3.5 py-1.5 rounded text-xs font-semibold">3. Agentic AI Triage Assistant</button>
                </div>
            </div>
            <div id="saas-sandbox-body" class="bg-white rounded border border-[#E5E7EB] p-6"></div>
        </div>`;
    },

    initInteractive: function() {
        window.switchSaasTab = function(idx) {
            document.querySelectorAll('.saas-tab').forEach((b, i) => b.classList.toggle('active', i === idx));
            const container = document.getElementById('saas-sandbox-body');
            if (!container) return;

            if (idx === 0) {
                container.innerHTML = `
                    <div class="mb-4 pb-3 border-b border-[#E5E7EB]">
                        <span class="font-mono-tag text-[10px] text-slate-500 block">Live 1:1 Implementation Structure</span>
                        <h4 class="font-display font-bold text-lg text-[#111827]">How I Guide Clients Through a Live LMS Connection Call</h4>
                    </div>
                    <div class="grid md:grid-cols-3 gap-4 text-xs">
                        <div class="p-4 rounded surface-sandstone">
                            <span class="font-mono-tag text-[10px] text-slate-500">Phase 01 • Discovery</span>
                            <p class="font-bold text-sm text-[#111827] mt-1 mb-2">Course & LMS Readiness Check</p>
                            <p class="text-[#4B5563]">I review the client's LMS environment (Canvas or D2L), confirm their course structure and grading preferences, and set clear goals for the session.</p>
                        </div>
                        <div class="p-4 rounded surface-sandstone">
                            <span class="font-mono-tag text-[10px] text-slate-500">Phase 02 • Guided Setup</span>
                            <p class="font-bold text-sm text-[#111827] mt-1 mb-2">Hands-On Platform Pairing</p>
                            <p class="text-[#4B5563]">I walk the client through enabling the SaaS tool in their LMS navigation, pairing their course shell, and deploying their first linked assignments.</p>
                        </div>
                        <div class="p-4 rounded surface-sandstone">
                            <span class="font-mono-tag text-[10px] text-slate-500">Phase 03 • Verification & Handoff</span>
                            <p class="font-bold text-sm text-[#111827] mt-1 mb-2">Learner View & Documentation</p>
                            <p class="text-[#4B5563]">I verify that gradebook columns and learner links work properly, log completion in Salesforce, and send a tailored follow-up SOP guide.</p>
                        </div>
                    </div>`;
            } else if (idx === 1) {
                container.innerHTML = `
                    <div class="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-[#E5E7EB]">
                        <div>
                            <span class="font-mono-tag text-[10px] text-slate-500 block">SOP-INT-04 • Standard Operating Procedure (Sample)</span>
                            <h4 class="font-display font-bold text-lg text-[#111827]">SaaS-to-LMS Course Pairing & Gradebook Sync</h4>
                        </div>
                        <span class="font-mono-tag text-[10px] px-2.5 py-1 rounded surface-sandstone text-[#111827]">Audience: Faculty & LMS Admins</span>
                    </div>

                    <div class="grid md:grid-cols-2 gap-4 mb-5 text-xs">
                        <div class="p-3.5 rounded surface-sandstone">
                            <strong class="text-[#111827] block mb-1">1. Purpose & Scope</strong>
                            <p class="text-[#4B5563]">Standardizes how instructors pair a third-party SaaS course with Canvas or D2L and verify automatic gradebook passback prior to term launch.</p>
                        </div>
                        <div class="p-3.5 rounded surface-sandstone">
                            <strong class="text-[#111827] block mb-1">2. Prerequisites</strong>
                            <p class="text-[#4B5563]">Active instructor credentials in both the LMS and SaaS platform, a provisioned term course shell, and LTI tool access enabled by institutional IT.</p>
                        </div>
                    </div>

                    <div class="mb-5 text-xs">
                        <strong class="text-[#111827] block mb-2">3. Step-by-Step Procedure</strong>
                        <ol class="space-y-2 text-[#4B5563] list-decimal list-inside bg-[#FAF8F5] p-4 rounded border border-[#E5E7EB]">
                            <li><strong class="text-[#111827]">Enable Navigation Tool:</strong> Open LMS Course Settings, locate the partner LTI app under Navigation, drag it to the active menu, and save.</li>
                            <li><strong class="text-[#111827]">Authenticate & Pair Shell:</strong> Click the partner tool in the course menu, sign in with faculty credentials, and link the active SaaS section to the LMS shell.</li>
                            <li><strong class="text-[#111827]">Deploy Deep Links:</strong> Add graded activities strictly through the LMS External Tool picker (never via copy-pasted browser URLs) so gradebook columns generate automatically.</li>
                            <li><strong class="text-[#111827]">Initialize Term Rollover:</strong> When copying a course from a prior term, click the main partner link once in the new shell to refresh roster and due-date mapping.</li>
                        </ol>
                    </div>

                    <div class="p-3.5 rounded bg-[#0F172A] text-[#FAF8F5] text-xs flex flex-wrap items-center justify-between gap-2">
                        <div>
                            <strong class="block text-emerald-300 mb-0.5">4. Verification & QA Sign-Off</strong>
                            <span class="text-[#E5E7EB]/90">Confirm all deployed links open in Learner View, verify matching point values in the LMS Gradebook, and log "Launch Ready" in Salesforce.</span>
                        </div>
                    </div>`;
            } else {
                container.innerHTML = `
                    <div class="grid md:grid-cols-12 gap-6 items-center text-xs">
                        <div class="md:col-span-5 space-y-2">
                            <span class="font-mono-tag text-[10px] text-slate-500 block">Select a Common Client Question:</span>
                            <button onclick="runAiCopilot(0)" class="w-full text-left p-3 rounded surface-sandstone hover:border-[#111827] font-semibold">⚠️ "I copied my Canvas course from last semester and learners get an error clicking links."</button>
                            <button onclick="runAiCopilot(1)" class="w-full text-left p-3 rounded surface-sandstone hover:border-[#111827] font-semibold">📉 "My learners completed the activity, but their grades are not showing in D2L/Canvas."</button>
                        </div>
                        <div class="md:col-span-7 p-5 rounded bg-[#0F172A] text-[#FAF8F5]" id="ai-copilot-output"></div>
                    </div>`;
                window.runAiCopilot(0);
            }
        };

        window.runAiCopilot = function(issueIdx) {
            const box = document.getElementById('ai-copilot-output');
            if (!box) return;
            const responses = [
                {
                    cause: "The new semester's LMS shell was copied over, but the new course has not been paired with a fresh section in the SaaS platform yet.",
                    action: "1. Guide the instructor to click the main tool link in the course menu to complete the 1-click course pairing. 2. Auto-attach the 'New Semester Rollover SOP' to the follow-up email."
                },
                {
                    cause: "The activity was either pasted as a plain web link instead of added through the LMS tool picker, or the assignment is still unpublished in the LMS.",
                    action: "1. Walk the instructor through re-adding the item via the External Tool menu and ensuring 'Sync to Gradebook' is checked. 2. Run a quick grade refresh together."
                }
            ];
            box.innerHTML = `
                <span class="font-mono-tag text-[10px] text-emerald-300 block mb-1">✓ Agentic AI Diagnosis & Specialist Action Plan</span>
                <p class="text-xs mb-2.5 leading-relaxed"><strong>Likely Cause:</strong> ${responses[issueIdx].cause}</p>
                <p class="text-xs text-[#E5E7EB]/90 leading-relaxed"><strong>Recommended Walkthrough & Follow-Up:</strong> ${responses[issueIdx].action}</p>
            `;
        };
        window.switchSaasTab(0);
    },

    transferability: [
        {
            role: "Post-Sales Solutions & Implementation",
            application: "An implementation team can deploy this three-part structure (live call playbook, structured SOP, and AI triage helper) to standardize how new enterprise accounts integrate any B2B software with their existing CRM or ERP."
        },
        {
            role: "User Education & Customer Enablement",
            application: "A Customer Education Lead can adapt this self-serve SOP and troubleshooting format to help enterprise users move from their first guided onboarding call to confident, independent product use."
        },
        {
            role: "Customer Success & Technical Support",
            application: "A Customer Success or Support team can turn this AI triage blueprint into an internal copilot that diagnoses common configuration tickets and drafts consistent follow-up notes for account managers."
        }
    ]
};
// END OF FILE