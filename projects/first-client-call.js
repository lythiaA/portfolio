// projects/first-client-call.js
window.PORTFOLIO_PROJECTS = window.PORTFOLIO_PROJECTS || {};

window.PORTFOLIO_PROJECTS["first-client-call"] = {
    id: "first-client-call",
    badge: "Consultative Onboarding • Canvas LMS",
    status: "Video Demo & Case Study",
    title: "Your First Client Call: Consultative Onboarding Lab",
    subtitle: "An onboarding program built in Canvas LMS that uses empathy mapping, video roleplay, and structured peer coaching to turn anxious new hires into confident 1:1 client facilitators.",
    roles: ["facilitation", "customer-ed", "lxd-data"],
    metrics: ["1:1 Client Facilitation", "9-Pt Analytic Rubric", "Canvas LMS Custom UI"],
    meta: {
        role: "Instructional Designer & Onboarding Facilitator",
        audience: "New Client-Facing Onboarding Specialists",
        stack: "Canvas LMS, Custom HTML/CSS, Video Simulation",
        impact: "Measurable Lift in Client-Facing Confidence"
    },
    challenge: "New specialists in a remote onboarding program understood the technical aspects of their job but lacked the confidence and consultative skills to lead effective 1:1 client sessions. Existing training focused on 'what buttons to click' rather than 'how to guide a client,' leading to new-hire anxiety and inconsistent customer experiences.",
    persona: "'Alex': a motivated but overwhelmed new hire. Alex needs psychological safety to practice client conversations without fear of judgment, alongside practical activities that translate product knowledge into confident client-facing action.",

    // Cross-Industry Transferability Block
    transferability: [
        {
            role: "Customer Success & Post-Sales Onboarding",
            application: "Directly models how to ramp new CSMs, Implementation Specialists, and Solutions Engineers so they can lead consultative kickoff and software setup calls with clients."
        },
        {
            role: "Live Training & Facilitation",
            application: "Demonstrates how I coach teams on verbal facilitation, objection handling, and consultative questioning—creating safe practice environments before staff step in front of live customers."
        },
        {
            role: "Customer Education & LMS Design",
            application: "Shows my ability to customize LMS environments (Canvas) with clean HTML/CSS and OSCQR quality standards so learners never feel lost in clunky interfaces."
        }
    ],

    features: [
        {
            title: "Learner-Centered Empathy Mapping",
            desc: "Grounded the entire training in a detailed learner analysis and empathy map to address the specific anxieties and blind spots of new client-facing staff."
        },
        {
            title: "'Practice, Review, Perform' Framework",
            desc: "Applied Bandura's Social Cognitive Theory to build self-efficacy—guiding new hires from low-stakes video roleplay to peer evaluation and final facilitation."
        },
        {
            title: "Structured Peer Coaching & 9-Pt Rubric",
            desc: "Designed a clear analytic rubric inside Canvas so peers could evaluate sample client calls and practice giving constructive, actionable feedback."
        },
        {
            title: "Authentic Client Call Simulation",
            desc: "Replaced passive multiple-choice quizzes with realistic video simulations where specialists practice facilitating a live software solution for a client."
        },
        {
            title: "Custom HTML/CSS Canvas Experience",
            desc: "Engineered a clean, accessible user interface using custom HTML and inline CSS within Canvas to reduce cognitive load and model great UX."
        },
        {
            title: "Data-Driven Evaluation & OSCQR Quality",
            desc: "Aligned the module with the OSCQR quality rubric and paired pre/post confidence surveys with rubric scores to quantify performance gains."
        }
    ],

    evaluation: {
        metric1Title: "Specialist Confidence & Self-Efficacy",
        metric1Desc: "Measured via pre- and post-training surveys tracking how prepared new specialists felt to lead live 1:1 customer onboarding calls.",
        metric2Title: "Consultative Facilitation Performance",
        metric2Desc: "Quantified by comparing initial practice recordings against final video submissions using the 9-point analytic facilitation rubric."
    },

    renderInteractive: function() {
        return `
        <div class="surface-sandstone rounded p-6 md:p-8 mb-16">
            <div class="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-[#E5E7EB]">
                <div>
                    <span class="font-mono-tag text-xs text-slate-500 block">Module Walkthrough & Discovery Artifacts</span>
                    <h3 class="font-display text-2xl font-bold text-[#111827]">Explore the Canvas Experience & Learner Empathy Map</h3>
                </div>
                <a href="https://www.youtube.com/watch?v=3v80Ql8X7gY" target="_blank" rel="noopener" class="btn-primary px-4 py-2 rounded text-xs font-semibold">
                    Watch Full Demo on YouTube ↗
                </a>
            </div>
            <div class="grid lg:grid-cols-12 gap-8 items-center">
                <div class="lg:col-span-7">
                    <div class="aspect-video w-full rounded overflow-hidden border border-[#E5E7EB] bg-black shadow-md">
                        <iframe class="w-full h-full" src="https://www.youtube.com/embed/3v80Ql8X7gY" title="Your First Client Call Walkthrough" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                </div>
                <div class="lg:col-span-5 bg-white p-5 rounded border border-[#E5E7EB]">
                    <span class="font-mono-tag text-[10px] text-slate-500 block mb-1">Human-Centered Discovery</span>
                    <h4 class="font-display font-bold text-lg text-[#111827] mb-2">Empathy Map: "Alex"</h4>
                    <p class="text-xs text-[#4B5563] leading-relaxed mb-4">
                        Mapping what a new onboarding specialist thinks, feels, sees, and hears during their first week allowed me to design a psychologically safe practice loop that directly targets call anxiety.
                    </p>
                    <img src="assets/AlexPersona.png" alt="Empathy Map for Learner Persona Alex" class="w-full h-auto rounded border border-[#E5E7EB]">
                </div>
            </div>
        </div>`;
    },

    initInteractive: function() {}
};
