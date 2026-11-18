// projects/saas-lms-onboarding.js
window.PORTFOLIO_PROJECTS = window.PORTFOLIO_PROJECTS || {};

window.PORTFOLIO_PROJECTS["saas-lms-onboarding"] = {
    id: "saas-lms-onboarding",
    badge: "Post-Sales Onboarding • SaaS & LMS Enablement",
    status: "Interactive Enablement Sandbox",
    title: "SaaS-to-LMS Client Onboarding Playbook & Agentic AI Guide",
    subtitle: "A post-sales customer education and implementation system designed to guide administrators and instructors through 1:1 LMS connections (Canvas, D2L), supported by clear documentation and an AI troubleshooting assistant.",
    roles: ["solutions", "customer-ed", "facilitation"],
    metrics: ["1:1 Client Setup", "SOP Documentation", "Agentic AI Triage"],
    meta: {
        role: "Customer Integration & Enablement Specialist",
        audience: "Higher-Ed Faculty, Course Leads & LMS Admins",
        stack: "Canvas, D2L, SaaS Platforms, Salesforce, Agentic AI",
        impact: "Streamlined Rollouts & Self-Service Adoption"
    },
    challenge: "When adopting a new digital learning platform, instructors and administrators often feel overwhelmed connecting their third-party SaaS product to their institution's LMS (Canvas or D2L). Without structured 1:1 guidance and visual documentation, minor setup missteps like broken course links or unsynced gradebooks create frustration and delay launch readiness.",
    persona: "Time-strapped faculty members and course administrators preparing for an upcoming term. They do not want dense technical jargon; they need a calm, consultative 1:1 walkthrough to get their course connected, backed by simple documentation they can reference on their own.",

    transferability: [
        {
            role: "Post-Sales Solutions & Implementation",
            application: "Demonstrates how I manage the end-to-end client setup journey, translating technical configuration steps into smooth, confidence-building 1:1 implementation calls tracked in Salesforce."
        },
        {
            role: "Customer Education & Enablement",
            application: "Showcases my ability to turn recurring client questions into scannable Standard Operating Procedures (SOPs) and interactive self-service guides that reduce support tickets."
        },
        {
            role: "Customer Success & AI Innovation",
            application: "Illustrates how I design practical Agentic AI workflows that help customers and CSMs quickly diagnose common setup roadblocks and generate clear follow-up action plans."
        }
    ],

    features: [
        {
            title: "1:1 Consultative Setup Facilitation",
            desc: "Lead live screen-share implementation calls where clients connect their SaaS platform to Canvas or D2L step-by-step, building hands-on confidence before day one."
        },
        {
            title: "Clear, Visual SOP Documentation",
            desc: "Author user-friendly setup guides and troubleshooting checklists that break complex LMS linking and gradebook sync rules into plain, actionable language."
        },
        {
            title: "Agentic AI Troubleshooting Assistant",
            desc: "Conceptualized an AI triage workflow that takes a client's setup symptom, identifies the likely configuration miss, and drafts a clear resolution note for the specialist."
        },
        {
            title: "End-to-End Rollout Tracking in Salesforce",
            desc: "Manage implementation pipelines, log session milestones, and monitor adoption readiness in Salesforce to ensure timely, zero-surprise rollouts."
        },
        {
            title: "Course Shell & Module Readiness QA",
            desc: "Verify that deployed course links, assignment weights, and student-view permissions work seamlessly across Canvas and D2L environments."
        },
        {
            title: "Proactive Friction Reduction",
            desc: "Identify the most common mistakes users make during course copy and semester rollover to address them proactively during live training."
        }
    ],

    evaluation: {
        metric1Title: "Implementation Velocity & Launch Readiness",
        metric1Desc: "Tracked via Salesforce project milestones, ensuring instructors complete their LMS connection and gradebook verification ahead of term start dates.",
        metric2Title: "User Confidence & Repeat Ticket Reduction",
        metric2Desc: "Measured by client self-sufficiency during subsequent term rollovers and reduced reliance on live support for basic course-linking tasks."
    },

    renderInteractive: function() {
        return `
        <div class="surface-sandstone rounded p-6 md:p-8 mb-16">
            <div class="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-[#E5E7EB]">
                <div>
                    <span class="font-mono-tag text-xs text-slate-500 block">Interactive Post-Sales Enablement Sandbox</span>
                    <h3 class="font-display text-2xl font-bold text-[#111827]">Explore the 3-Part Client Implementation System</h3>
                </div>
                <div class="flex flex-wrap gap-2" id="saas-tabs">
                    <button onclick="switchSaasTab(0)" class="saas-tab filter-pill active px-3.5 py-1.5 rounded text-xs font-semibold">1. 1:1 Setup Call Playbook</button>
                    <button onclick="switchSaasTab(1)" class="saas-tab filter-pill px-3.5 py-1.5 rounded text-xs font-semibold">2. Client LMS Setup SOP</button>
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
                            <p class="text-[#4B5563]">Review the client's LMS environment (Canvas or D2L), confirm their course structure and grading preferences, and set clear goals for the session.</p>
                        </div>
                        <div class="p-4 rounded surface-sandstone">
                            <span class="font-mono-tag text-[10px] text-slate-500">Phase 02 • Guided Setup</span>
                            <p class="font-bold text-sm text-[#111827] mt-1 mb-2">Hands-On Platform Pairing</p>
                            <p class="text-[#4B5563]">Walk the client through enabling the SaaS tool in their LMS navigation, pairing their course shell, and deploying their first linked assignments.</p>
                        </div>
                        <div class="p-4 rounded surface-sandstone">
                            <span class="font-mono-tag text-[10px] text-slate-500">Phase 03 • Verification & Handoff</span>
                            <p class="font-bold text-sm text-[#111827] mt-1 mb-2">Student View & Documentation</p>
                            <p class="text-[#4B5563]">Verify that gradebook columns and student links work properly, log completion in Salesforce, and send a tailored follow-up SOP guide.</p>
                        </div>
                    </div>`;
            } else if (idx === 1) {
                container.innerHTML = `
                    <div class="mb-4 pb-3 border-b border-[#E5E7EB]">
                        <span class="font-mono-tag text-[10px] text-slate-500 block">Self-Service Client Documentation Sample</span>
                        <h4 class="font-display font-bold text-lg text-[#111827]">Quick-Start Checklist: Connecting Your SaaS Course to Canvas / D2L</h4>
                    </div>
                    <div class="space-y-3 text-xs">
                        <div class="p-3.5 rounded surface-sandstone flex items-center justify-between gap-4">
                            <div><strong class="text-[#111827]">Step 1: Pair Your Course Shell.</strong> Open your Canvas/D2L course, select the partner tool from your course menu, and sign in once to link your shells.</div>
                            <span class="font-mono-tag px-2.5 py-1 rounded bg-white border border-[#E5E7EB] whitespace-nowrap">Course Pairing</span>
                        </div>
                        <div class="p-3.5 rounded surface-sandstone flex items-center justify-between gap-4">
                            <div><strong class="text-[#111827]">Step 2: Add Assignments via the Tool Picker.</strong> Use the LMS External Tool selector rather than copying browser URLs so grades sync automatically.</div>
                            <span class="font-mono-tag px-2.5 py-1 rounded bg-white border border-[#E5E7EB] whitespace-nowrap">Assignment Sync</span>
                        </div>
                        <div class="p-3.5 rounded surface-sandstone flex items-center justify-between gap-4">
                            <div><strong class="text-[#111827]">Step 3: Term Rollover Check.</strong> When copying a course to a new term, click the main tool link once to initialize the new roster and dates.</div>
                            <span class="font-mono-tag px-2.5 py-1 rounded bg-white border border-[#E5E7EB] whitespace-nowrap">Term Rollover</span>
                        </div>
                    </div>`;
            } else {
                container.innerHTML = `
                    <div class="grid md:grid-cols-12 gap-6 items-center text-xs">
                        <div class="md:col-span-5 space-y-2">
                            <span class="font-mono-tag text-[10px] text-slate-500 block">Select a Common Client Question:</span>
                            <button onclick="runAiCopilot(0)" class="w-full text-left p-3 rounded surface-sandstone hover:border-[#111827] font-semibold">⚠️ "I copied my Canvas course from last semester and students get an error clicking links."</button>
                            <button onclick="runAiCopilot(1)" class="w-full text-left p-3 rounded surface-sandstone hover:border-[#111827] font-semibold">📉 "My students completed the activity, but their grades aren't showing in D2L/Canvas."</button>
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
                    cause: "The new semester's LMS shell was copied over, but the new course hasn't been paired with a fresh section in the SaaS platform yet.",
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
    }
};
// END OF FILE
