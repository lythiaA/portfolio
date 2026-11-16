// projects/power-automate-ops.js
window.PORTFOLIO_PROJECTS = window.PORTFOLIO_PROJECTS || {};

window.PORTFOLIO_PROJECTS["power-automate-ops"] = {
    id: "power-automate-ops",
    badge: "Enablement Operations • Workflow Automation",
    status: "Interactive System Blueprint",
    title: "Automated Learner Triage & Multi-Course Outreach Pipeline",
    subtitle: "An automated operations system built with Microsoft Power Automate, MS Forms, and dynamic HTML templates that routes learner submissions, delivers personalized resource packets, and streamlines coaching follow-ups.",
    roles: ["solutions", "customer-ed", "lxd-data"],
    metrics: ["Power Automate", "Dynamic HTML Emails", "Multi-Branch Routing"],
    meta: {
        role: "Enablement Operations & Automation Builder",
        audience: "Instructional Teams & Adult Learners",
        stack: "Power Automate, MS Forms, HTML/CSS, Excel/SharePoint",
        impact: "Instant Resource Delivery & Zero Manual Triage"
    },
    challenge: "Supporting high volumes of learners across multiple technical courses created repetitive administrative work. Manually reviewing form submissions, checking which course or attempt a learner was on, and copy-pasting the right study resources slowed down response times and pulled focus away from live 1:1 coaching.",
    persona: "High-volume coaching and customer enablement teams who need reliable, automated backend workflows so every learner gets the right resources promptly, freeing facilitators to focus on human connection.",

    // Cross-Industry Transferability Block
    transferability: [
        {
            role: "Customer Success & Enablement Operations",
            application: "This automation pattern applies directly to B2B Customer Onboarding, automatically routing client intake forms, sending tailored welcome kits based on product tier, and alerting CSMs when a client flags a blocker."
        },
        {
            role: "Solutions Engineering & Workflow Design",
            application: "Demonstrates my ability to design conditional logic (`Switch` cases, dynamic variables, HTML payloads) that connects forms, spreadsheets, and communication tools without manual intervention."
        }
    ],

    features: [
        {
            title: "Multi-Course Conditional Switch Logic",
            desc: "Automatically evaluates each incoming form submission and routes the workflow down the exact branch for that specific course or learner profile."
        },
        {
            title: "Dynamic HTML Email Personalization",
            desc: "Builds clean, mobile-friendly HTML emails populated dynamically with the learner's name, tailored study guides, video links, and next steps."
        },
        {
            title: "Attempt & Priority-Level Triage",
            desc: "Distinguishes between brand-new learners and those preparing for a retake so high-priority coaching needs are surfaced immediately."
        },
        {
            title: "Cohort Verification & Resource Dispatch",
            desc: "Connects live and self-paced cohort check-in forms directly to automated follow-up emails containing practice labs and session recordings."
        },
        {
            title: "Clean Data Logging & Tracking",
            desc: "Records every submission and automated outreach touchpoint into structured tracking sheets for easy team visibility and reporting."
        },
        {
            title: "Scalable, Reusable Flow Templates",
            desc: "Structured modularly so new courses, onboarding tracks, or updated resource links can be swapped in quickly without rebuilding the workflow."
        }
    ],

    evaluation: {
        metric1Title: "Turnaround Speed for Learner Support",
        metric1Desc: "Reduced resource delivery time from manual daily batching to under 60 seconds from the moment a learner submits a form.",
        metric2Title: "Facilitator Time Reclaimed for Live Coaching",
        metric2Desc: "Eliminated repetitive copy-paste email administration across hundreds of monthly learner touchpoints."
    },

    renderInteractive: function() {
        return `
        <div class="surface-sandstone rounded p-6 md:p-8 mb-16">
            <div class="mb-6">
                <span class="font-mono-tag text-xs text-slate-500 block"> Workflow Explained  (Click Any Step to Inspect)</span>
                <h3 class="font-display text-2xl font-bold text-[#111827]">Flagship Flow: Automated Intake, Switch Routing & Dynamic HTML Dispatch</h3>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6" id="pa-nodes">
                <button onclick="selectPaNode(0)" class="pa-node text-left p-4 rounded bg-[#0F172A] text-[#FAF8F5]">
                    <span class="font-mono-tag text-[10px] opacity-70 block">Step 01 / Trigger</span>
                    <p class="font-display font-bold text-sm mt-1">MS Forms Intake Submission</p>
                </button>
                <button onclick="selectPaNode(1)" class="pa-node text-left p-4 rounded bg-white border border-[#E5E7EB] text-[#111827]">
                    <span class="font-mono-tag text-[10px] text-slate-500 block">Step 02 / Switch Router</span>
                    <p class="font-display font-bold text-sm mt-1">Course & Status Evaluation</p>
                </button>
                <button onclick="selectPaNode(2)" class="pa-node text-left p-4 rounded bg-white border border-[#E5E7EB] text-[#111827]">
                    <span class="font-mono-tag text-[10px] text-slate-500 block">Step 03 / Content Builder</span>
                    <p class="font-display font-bold text-sm mt-1">Dynamic HTML Email Assembly</p>
                </button>
                <button onclick="selectPaNode(3)" class="pa-node text-left p-4 rounded bg-white border border-[#E5E7EB] text-[#111827]">
                    <span class="font-mono-tag text-[10px] text-slate-500 block">Step 04 / Action & Log</span>
                    <p class="font-display font-bold text-sm mt-1">Instant Delivery & Tracking</p>
                </button>
            </div>
            <div id="pa-node-detail" class="bg-white rounded border border-[#E5E7EB] p-6 mb-6"></div>
            <div class="pt-6 border-t border-[#E5E7EB]">
                <span class="font-mono-tag text-xs text-slate-500 block mb-3">Additional Automated Workflows Designed</span>
                <div class="grid md:grid-cols-3 gap-4 text-xs">
                    <div class="p-4 rounded bg-white border border-[#E5E7EB]">
                        <p class="font-bold text-[#111827] mb-1">01 / Cohort Completion & Lab Unlock</p>
                        <p class="text-[#4B5563]">Triggers when a learner completes a live or recorded cohort, automatically emailing the matching practice materials and logging participation.</p>
                    </div>
                    <div class="p-4 rounded bg-white border border-[#E5E7EB]">
                        <p class="font-bold text-[#111827] mb-1">02 / Personalized Retake Support Routing</p>
                        <p class="text-[#4B5563]">Identifies learners preparing for an exam retake and delivers targeted diagnostic study plans alongside a prompt to book a 1:1 coaching session.</p>
                    </div>
                    <div class="p-4 rounded bg-white border border-[#E5E7EB]">
                        <p class="font-bold text-[#111827] mb-1">03 / New Learner Welcome & Pacing Sequence</p>
                        <p class="text-[#4B5563]">Automates onboarding touchpoints so new starters immediately receive their interactive study guide and upcoming live cohort schedule.</p>
                    </div>
                </div>
            </div>
        </div>`;
    },

    initInteractive: function() {
        const nodes = [
            {
                title: "Step 01: MS Forms Trigger & Response Capture",
                detail: "As soon as a learner submits an intake or cohort form, Power Automate captures their name, email, course selection, current progress stage, and any questions they flagged for support."
            },
            {
                title: "Step 02: Multi-Path Conditional Switch Routing",
                detail: "A structured Switch control checks which course and learning stage the submission belongs to—routing the learner to the exact set of resources built for their situation without manual sorting."
            },
            {
                title: "Step 03: Dynamic HTML Email Assembly",
                detail: "Injects the learner's first name and course-specific links (interactive study planner, recorded walkthroughs, and practice quizzes) into a clean, custom-styled HTML email template."
            },
            {
                title: "Step 04: Instant Dispatch & Team Visibility Log",
                detail: "Sends the tailored resource packet within seconds and logs the interaction in a central tracking sheet so instructors have full context before their next 1:1 call."
            }
        ];

        window.selectPaNode = function(idx) {
            document.querySelectorAll('.pa-node').forEach((btn, i) => {
                btn.className = i === idx
                    ? "pa-node text-left p-4 rounded bg-[#0F172A] text-[#FAF8F5]"
                    : "pa-node text-left p-4 rounded bg-white border border-[#E5E7EB] text-[#111827]";
            });
            const detail = document.getElementById('pa-node-detail');
            if (detail) {
                detail.innerHTML = `
                    <span class="font-mono-tag text-[10px] text-slate-500 block mb-1">Workflow Logic Breakdown</span>
                    <h4 class="font-display font-bold text-lg text-[#111827] mb-2">${nodes[idx].title}</h4>
                    <p class="text-sm text-[#4B5563] leading-relaxed">${nodes[idx].detail}</p>
                `;
            }
        };
        window.selectPaNode(0);
    }
};
