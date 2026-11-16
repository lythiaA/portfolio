// projects/adaptive-study-architect.js
window.PORTFOLIO_PROJECTS = window.PORTFOLIO_PROJECTS || {};

window.PORTFOLIO_PROJECTS["adaptive-study-architect"] = {
    id: "adaptive-study-architect",
    badge: "AI-Assisted Web App • Diagnostics & LXD",
    status: "Sanitized Interactive Simulator",
    title: "Adaptive Competency Diagnostic & Study Sprint Web App",
    subtitle: "A decentralized HTML/JS/JSON web application engineered through strategic AI prompting that transforms static technical syllabi into personalized, date-driven daily study sprints.",
    roles: ["lxd-data", "customer-ed", "solutions"],
    metrics: ["AI-Assisted Prototyping", "3 Adaptive Tracks", "Decentralized JSON"],
    meta: {
        role: "Lead Learning Architect & AI Prompt Engineer",
        audience: "Adult Technical Learners (Data Management)",
        stack: "HTML5, Vanilla JS, Decentralized JSON, AI-Assisted Dev",
        impact: "Personalized Pacing + 80% Mastery Gates"
    },
    challenge: "Adult learners in technical database courses arrive with vastly different readiness levels—from complete beginners intimidated by SQL to experienced analysts looking to accelerate. Static, one-size-fits-all resource lists cause cognitive overload, poor pacing, and premature exam attempts.",
    persona: "Self-paced adult learner balancing career and coursework. Needs an intelligent diagnostic tool that reads their Pre-Assessment competency breakdown, calculates days remaining until their target exam date, and serves a clear daily checklist.",

    // Cross-Industry Transferability Block
    transferability: [
        {
            role: "SaaS Customer Onboarding & Enablement",
            application: "This exact intake-to-roadmap engine can be deployed as an interactive 'Customer Onboarding Wizard'—routing new SaaS clients into Basic, Standard, or Enterprise implementation tracks based on their tech stack and target go-live date."
        },
        {
            role: "Solutions Engineering & Technical Support",
            application: "Demonstrates how I use strategic AI prompting and modular JSON architecture to rapidly build custom client-facing diagnostic tools without waiting on engineering sprints."
        },
        {
            role: "Customer Success & Retention",
            application: "The color-coded confidence tracker (Green/Yellow/Red) mirrors a Customer Health Score dashboard—allowing CSMs or coaches to spot where a user is stuck during onboarding."
        }
    ],

    features: [
        {
            title: "Strategic AI-Assisted Rapid Prototyping",
            desc: "Architected and iteratively debugged the full multi-file application by directing AI with modular technical specifications, UI state rules, and edge-case validation."
        },
        {
            title: "6-Variable Diagnostic Intake Engine",
            desc: "Evaluates prior SQL/database background, weekly study hours, learning modality preference, and target exam date to place users into Foundations, Standard, or Fast-Track tracks."
        },
        {
            title: "Pre-Assessment Competency Analyzer",
            desc: "Ingests domain-level diagnostic scores to automatically highlight high-risk chapters and prescribe targeted remediation labs."
        },
        {
            title: "Dynamic Daily Sprint Generator",
            desc: "Partitions 5 modular curriculum chapters into realistic daily workload buckets calibrated to the learner's target completion date."
        },
        {
            title: "Confidence Telemetry & 1-Click Filtering",
            desc: "Lets learners tag every sub-topic as Confident (Green), Shaky (Yellow), or Needs Review (Red) and filter the entire study plan to isolate weak spots."
        },
        {
            title: "Decentralized JSON Content Schema",
            desc: "Separates chapter content (`ch1.json`–`ch5.json`), video links, and FAQs from the core UI logic so subject-matter updates take seconds."
        }
    ],

    evaluation: {
        metric1Title: "Diagnostic-to-Exam Readiness Alignment",
        metric1Desc: "Enforces 80% chapter quiz mastery gates and beginner SQL guardrails before learners schedule their final assessment.",
        metric2Title: "Learner Autonomy & Coaching Efficiency",
        metric2Desc: "Equips learners to self-diagnose weak chapters while giving instructors an instant visual snapshot during 1:1 coaching calls."
    },

    // Self-Contained Interactive Simulator HTML
    renderInteractive: function() {
        return `
        <div class="surface-sandstone rounded p-6 md:p-8 mb-16">
            <div class="mb-5 p-3.5 rounded bg-[#0F172A] text-[#FAF8F5] flex flex-wrap items-center justify-between gap-2 text-xs">
                <span>🔒 <strong>Note:</strong> To protect internal university URLs, SharePoint links, and student privacy, this live interactive simulator runs a sanitized version of the web application.</span>
                <span class="font-mono-tag text-[10px] px-2.5 py-0.5 rounded bg-white/10">Interactive Simulator</span>
            </div>
            <div class="bg-white rounded border border-[#E5E7EB] p-6">
                <div class="grid lg:grid-cols-12 gap-6">
                    <div class="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-[#E5E7EB] pb-6 lg:pb-0 lg:pr-6">
                        <span class="font-mono-tag text-xs text-slate-500 block mb-2">Step 1: Test the Intake Algorithm</span>
                        <h4 class="font-display font-bold text-lg text-[#111827] mb-4">Adjust Learner Inputs</h4>
                        <div class="space-y-4 text-xs">
                            <div>
                                <label class="font-semibold block mb-1">Prior Technical / SQL Experience</label>
                                <select id="sim-exp" onchange="updateAdaptiveSim()" class="w-full p-2.5 rounded border border-[#E5E7EB] bg-[#FAF8F5]">
                                    <option value="Beginner (Guardrails Active)">Brand New Beginner (No prior SQL)</option>
                                    <option value="Intermediate" selected>Some Exposure (Familiar with basic tables)</option>
                                    <option value="Advanced">Experienced (Comfortable with queries & ERD)</option>
                                </select>
                            </div>
                            <div>
                                <label class="font-semibold block mb-1">Weekly Capacity & Target Timeline</label>
                                <select id="sim-hours" onchange="updateAdaptiveSim()" class="w-full p-2.5 rounded border border-[#E5E7EB] bg-[#FAF8F5]">
                                    <option value="foundations">6–8 hrs/wk → 4-Week Foundations Track</option>
                                    <option value="standard" selected>10–14 hrs/wk → 2.5-Week Standard Track</option>
                                    <option value="fast">18+ hrs/wk → 10-Day Fast-Track Sprint</option>
                                </select>
                            </div>
                            <div>
                                <label class="font-semibold block mb-1">Pre-Assessment Diagnostic Gap</label>
                                <select id="sim-pa" onchange="updateAdaptiveSim()" class="w-full p-2.5 rounded border border-[#E5E7EB] bg-[#FAF8F5]">
                                    <option value="syntax-gap" selected>Low Score in SQL Syntax & Joins (Ch. 2–3)</option>
                                    <option value="erd-gap">Low Score in ERD & Normalization (Ch. 4–5)</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="lg:col-span-7" id="adaptive-sim-output"></div>
                </div>
            </div>
        </div>`;
    },

    initInteractive: function() {
        window.updateAdaptiveSim = function() {
            const exp = document.getElementById('sim-exp')?.value || 'Intermediate';
            const hours = document.getElementById('sim-hours')?.value || 'standard';
            const pa = document.getElementById('sim-pa')?.value || 'syntax-gap';
            const out = document.getElementById('adaptive-sim-output');
            if (!out) return;

            const tracks = {
                foundations: { name: "Track 1: Guided Foundations Plan (28 Days)", pace: "60-Min Daily Sprints • Conceptual Videos + Step-by-Step Labs" },
                standard: { name: "Track 2: Standard Accelerated Plan (18 Days)", pace: "90-Min Daily Sprints • Balanced Concept Review & Query Practice" },
                fast: { name: "Track 3: Intensive Fast-Track Plan (10 Days)", pace: "High-Yield Diagnostic Labs & 80% Mastery Checkpoints" }
            };
            const focus = pa === 'syntax-gap'
                ? "Priority Remediation Flagged: Chapter 2 (SQL DDL/DML) & Chapter 3 (Primary/Foreign Keys & Joins)"
                : "Priority Remediation Flagged: Chapter 4 (Entity-Relationship Modeling) & Chapter 5 (Normalization)";

            out.innerHTML = `
                <div class="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-[#E5E7EB]">
                    <div>
                        <span class="font-mono-tag text-[10px] text-slate-500 block">Generated Sprint Pathway</span>
                        <h5 class="font-display font-bold text-base text-[#111827]">${tracks[hours].name}</h5>
                    </div>
                    <span class="font-mono-tag text-[10px] px-2.5 py-1 rounded bg-[#0F172A] text-[#FAF8F5]">${exp}</span>
                </div>
                <p class="text-xs text-[#4B5563] mb-3"><strong>Daily Pacing Rule:</strong> ${tracks[hours].pace}</p>
                <div class="p-3 rounded surface-sandstone text-xs mb-4">
                    <strong class="text-[#111827] block mb-1">🎯 Automated Pre-Assessment Prescription:</strong>
                    <span>${focus}</span>
                </div>
                <span class="font-mono-tag text-[10px] text-slate-500 block mb-2">Sample Module Confidence Tracker & Mastery Gates</span>
                <div class="grid sm:grid-cols-3 gap-2 text-xs">
                    <div class="p-2.5 rounded border border-emerald-300 bg-emerald-50/50">
                        <span class="font-bold text-emerald-900 block">🟢 Ch 1: DB Concepts</span>
                        <span class="text-[11px] text-emerald-800">Confident • 90% Gate Passed</span>
                    </div>
                    <div class="p-2.5 rounded border border-amber-300 bg-amber-50/50">
                        <span class="font-bold text-amber-900 block">🟡 Ch 2: SQL Syntax</span>
                        <span class="text-[11px] text-amber-800">Shaky • Lab Assigned</span>
                    </div>
                    <div class="p-2.5 rounded border border-rose-300 bg-rose-50/50">
                        <span class="font-bold text-rose-900 block">🔴 Ch 3–4: Modeling</span>
                        <span class="text-[11px] text-rose-800">Needs Review • Priority Sprint</span>
                    </div>
                </div>
            `;
        };
        window.updateAdaptiveSim();
    }
};
