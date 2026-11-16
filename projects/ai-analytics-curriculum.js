// projects/ai-analytics-curriculum.js
window.PORTFOLIO_PROJECTS = window.PORTFOLIO_PROJECTS || {};

window.PORTFOLIO_PROJECTS["ai-analytics-curriculum"] = {
    id: "ai-analytics-curriculum",
    badge: "Technical SME & LXD • Curriculum & Assessment",
    status: "3 Enterprise Programs",
    title: "AI & Data Analytics Curriculum Architecture",
    subtitle: "Serving as Subject Matter Expert (SME) and Learning Experience Designer to audit, design, and align technical training programs across Generative AI, Business Intelligence, and Applied Mathematics.",
    roles: ["lxd-data", "solutions", "customer-ed"],
    metrics: ["SME Quality Assurance", "Authentic Assessment", "AI-Integrated Labs"],
    meta: {
        role: "Subject Matter Expert (SME) & LXD",
        audience: "Adult Technical Learners & Data Professionals",
        stack: "GenAI Workflows, BI Tools, HTML5/Chart.js, Python",
        impact: "3 Production-Ready Learning Programs"
    },
    challenge: "Technical training programs often struggle to balance depth with usability; either overwhelming learners with abstract theory or testing isolated button-clicks that don't transfer to the workplace. Organizations need subject-matter experts who can audit technical accuracy, structure realistic business scenarios, and build interactive tools that make complex concepts intuitive.",
    persona: "Adult learners and working professionals upskilling in AI and data analytics. They need clear instructional scaffolding, realistic workplace simulations, and objective assessment rubrics that set them up for real-world confidence.",

    // Cross-Industry Transferability Block
    transferability: [
        {
            role: "Customer Education & SaaS Enablement",
            application: "Shows how I translate complex technical capabilities (like AI workflows and BI reporting) into practical, application-focused training that helps end-users adopt tools safely and effectively."
        },
        {
            role: "Solutions Engineering & Onboarding",
            application: "Demonstrates my ability to partner with cross-functional technical teams, audit technical documentation and visual schemas for accuracy, and align training directly with business outcomes."
        },
        {
            role: "LXD & Program Architecture",
            application: "Highlights end-to-end curriculum governance—from backward-design rubric calibration and scenario architecture to building interactive visual widgets and AI feedback loops."
        }
    ],

    features: [
        {
            title: "End-to-End Curriculum Auditing & Scoping",
            desc: "Reviewed and restructured learning pathways to ensure lessons followed authentic workplace workflows—keeping training focused on practical application rather than overwhelming backend theory."
        },
        {
            title: "Scenario-Driven Performance Assessments",
            desc: "Designed cohesive, multi-stage business simulations (such as customer retention and retail operations) that evaluate whether learners can turn raw data into executive recommendations."
        },
        {
            title: "Backward-Design & Rubric Calibration",
            desc: "Audited assessment prompts and grading rubrics against competency standards so evaluation criteria remain clear, objective, and fair for every learner."
        },
        {
            title: "AI-Powered Formative Coaching Blocks",
            desc: "Designed prompt instructions and guardrails for embedded AI evaluation tools, giving learners instant, constructive feedback on their practice work without simply handing them the answer."
        },
        {
            title: "Interactive Visual Learning Widgets",
            desc: "Conceptualized and built dynamic HTML5 and Chart.js visual tools to replace static diagrams, allowing learners to manipulate variables and see abstract concepts in action."
        },
        {
            title: "Technical & Visual Quality Assurance",
            desc: "Partnered with instructional design and media teams to review technical diagrams, third-party labs, and learning guides for accuracy and accessibility prior to launch."
        }
    ],

    evaluation: {
        metric1Title: "Instructional Alignment & Rubric Clarity",
        metric1Desc: "Delivered build-ready curriculum blueprints and unambiguous assessment rubrics that eliminated cascading grading penalties and reduced learner confusion.",
        metric2Title: "Real-World Skill Transfer",
        metric2Desc: "Shifted evaluation away from passive memorization toward practical workplace deliverables, including executive briefings, dashboards, and validated AI workflows."
    },

    // Streamlined Interactive Showcase (Focuses on My Work & Impact, Not Course Tasks)
    renderInteractive: function() {
        return `
        <div class="surface-sandstone rounded p-6 md:p-8 mb-16">
            <div class="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-[#E5E7EB]">
                <div>
                    <span class="font-mono-tag text-xs text-slate-500 block">SME & Learning Design Portfolio Snapshot</span>
                    <h3 class="font-display text-2xl font-bold text-[#111827]">Explore My Role Across 3 Technical Programs</h3>
                </div>
                <div class="flex flex-wrap gap-2" id="curr-tabs">
                    <button onclick="switchCurrTab(0)" class="curr-tab filter-pill active px-3.5 py-1.5 rounded text-xs font-semibold">1. GenAI for Data Analytics</button>
                    <button onclick="switchCurrTab(1)" class="curr-tab filter-pill px-3.5 py-1.5 rounded text-xs font-semibold">2. Advanced Spreadsheets (BI)</button>
                    <button onclick="switchCurrTab(2)" class="curr-tab filter-pill px-3.5 py-1.5 rounded text-xs font-semibold">3. Applied Math for AI</button>
                </div>
            </div>
            <div id="curr-inspector-body" class="bg-white rounded border border-[#E5E7EB] p-6"></div>
        </div>`;
    },

    initInteractive: function() {
        const courseData = [
            {
                tag: "Program 01 • Practical AI Adoption & Workflow Design",
                title: "Generative AI for Data Analytics",
                overview: "Designed to teach analysts how to safely integrate AI tools into their daily data workflows, focusing on prompt strategy, output validation, and executive reporting.",
                pillars: [
                    { name: "My Role & Strategy", detail: "Audited the curriculum sequence to ensure learners were taught how to verify AI outputs for accuracy and bias before using them to make business decisions." },
                    { name: "Assessment Design", detail: "Created a unified corporate scenario where learners use AI to clean data, forecast trends, and present an ethical, business-ready dashboard." },
                    { name: "Value Delivered", detail: "Kept the training strictly focused on practical workplace adoption rather than backend AI engineering, making it accessible and immediately applicable." }
                ]
            },
            {
                tag: "Program 02 • Business Intelligence & Decision Modeling",
                title: "Advanced Spreadsheets for Data Analytics",
                overview: "A project-driven program moving learners beyond basic formula memorization into real-world data modeling, optimization, and stakeholder storytelling.",
                pillars: [
                    { name: "My Role & Strategy", detail: "Served as Technical SME and Quality Reviewer, auditing course blueprints, third-party labs, and visual diagrams for clarity and accuracy before launch." },
                    { name: "Assessment Design", detail: "Refined a multi-part retail simulation with independent datasets so an early mistake wouldn't penalize a learner across the rest of their project." },
                    { name: "Value Delivered", detail: "Calibrated assessment prompts and rubrics for unambiguous grading and integrated low-stakes AI practice blocks to build learner confidence." }
                ]
            },
            {
                tag: "Program 03 • Interactive Visualizations & Applied Concepts",
                title: "Applied Mathematics for AI",
                overview: "Bridges foundational math and statistics concepts directly to practical machine learning diagnostics through hands-on visual tools and guided coding.",
                pillars: [
                    { name: "My Role & Strategy", detail: "Translated abstract mathematical concepts into intuitive, visual learning experiences paired with clear instructional scaffolding." },
                    { name: "Interactive Innovation", detail: "Built custom HTML5 and Chart.js interactive widgets that let learners adjust variables and visually see how models behave in real time." },
                    { name: "Value Delivered", detail: "Designed AI-assisted practice environments with custom guardrails that coach learners through coding challenges step-by-step." }
                ]
            }
        ];

        window.switchCurrTab = function(idx) {
            document.querySelectorAll('.curr-tab').forEach((b, i) => b.classList.toggle('active', i === idx));
            const c = courseData[idx];
            const body = document.getElementById('curr-inspector-body');
            if (!body) return;
            body.innerHTML = `
                <div class="mb-5 pb-4 border-b border-[#E5E7EB]">
                    <span class="font-mono-tag text-[10px] text-slate-500 block mb-1">${c.tag}</span>
                    <h4 class="font-display font-bold text-xl text-[#111827] mb-1.5">${c.title}</h4>
                    <p class="text-xs sm:text-sm text-[#4B5563]">${c.overview}</p>
                </div>
                <div class="grid md:grid-cols-3 gap-4 text-xs">
                    ${c.pillars.map(p => `
                        <div class="p-4 rounded surface-sandstone">
                            <p class="font-display font-bold text-sm text-[#111827] mb-1.5">${p.name}</p>
                            <p class="text-[#4B5563] leading-relaxed">${p.detail}</p>
                        </div>
                    `).join('')}
                </div>
            `;
        };
        window.switchCurrTab(0);
    }
};
