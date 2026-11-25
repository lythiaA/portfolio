// projects/sql-gamified-labs.js
window.PORTFOLIO_PROJECTS = window.PORTFOLIO_PROJECTS || {};

window.PORTFOLIO_PROJECTS["sql-gamified-labs"] = {
    id: "sql-gamified-labs",
    badge: "Multimodal Technical Training • Animation, AI & Articulate 360",
    status: "4 Live Demos & Video",
    title: "Multimodal Database and SQL Training Suite",
    subtitle: "A four-part showcase I built demonstrating how complex database concepts (Normalization, Joins, and Aggregate Queries) can be taught across four distinct modalities: animated explainer video, Articulate Rise/Storyline courses, Socratic AI labs, and interactive web quests.",
    roles: ["lxd-data", "customer-ed", "facilitation", "gamified-learning"],
    metrics: ["Animaker Explainer Video", "Articulate Rise & Storyline", "Socratic AI Prototyping"],
    meta: {
        role: "Instructional Designer & Technical Facilitator",
        audience: "Technical Beginners, Analysts & Adult Learners",
        stack: "Articulate 360, Animaker, Gemini AI Prompting, HTML/JS",
        impact: "4 Live Multimodal Learning Assets"
    },
    challenge: "Every learner and organization absorbs technical training differently. Some users need a crisp 3-minute animated video to visualize how tables normalize; others need a structured Articulate Rise course, an interactive quest, or a Socratic AI coach that nudges them when their code breaks.",
    persona: "Adult learners and non-technical professionals upskilling in relational databases and SQL who feel intimidated by dry documentation and need engaging, multimodal ways to build fluency.",

    features: [
        {
            title: "Animated Concept Explainer (Animaker)",
            desc: "I produced an engaging visual micro-learning video on Database Normalization using dynamic hand-drawn animations and on-screen movement to make abstract table structuring click."
        },
        {
            title: "Articulate Rise 360 + Storyline Course",
            desc: "I developed a responsive e-learning course on MySQL Joins and Aggregate Functions in Rise 360, embedding custom Storyline 360 interactions and coding checks."
        },
        {
            title: "MySQL Identity: Socratic AI Mystery Lab",
            desc: "I prototyped a narrative SQL game through strategic AI collaboration that validates query results rather than rigid syntax and guides learners with Socratic questions."
        },
        {
            title: "SQL Quest Hub: Gagné & ARCS Web App",
            desc: "I built a custom HTML/Tailwind interactive module grounded in Gagné's Nine Events and Keller's ARCS model with leveled challenges and adaptive difficulty."
        },
        {
            title: "Multi-Layered Hint & Error Scaffolding",
            desc: "I designed progressive hints, targeted micro-quizzes for common syntax errors, and low-stakes retry loops so beginners never hit a dead end."
        },
        {
            title: "End-to-End Authoring Versatility",
            desc: "I demonstrated full fluency across industry-standard authoring suites (Articulate 360), animation tools (Animaker/Vyond), and custom front-end code."
        }
    ],

    evaluation: {
        metric1Title: "Concept Retention Across Modalities",
        metric1Desc: "I match each database competency to its strongest instructional medium: visual animation for conceptual normalization, Rise 360 for structured reference, and web labs for hands-on query practice.",
        metric2Title: "Applied Query Accuracy",
        metric2Desc: "I evaluate applied mastery through in-module coding checks, result-based query validation, and decreasing hint dependency across practice tasks."
    },

    skills: [
        {
            skill: "Multimodal Content Production",
            desc: "I match complex technical topics to the right medium, moving fluidly between animated explainer videos, structured e-learning, and interactive web sandboxes."
        },
        {
            skill: "Articulate 360 Course Authoring",
            desc: "I combine responsive Rise 360 layouts with embedded Storyline 360 practice checks to build polished, self-paced technical courses."
        },
        {
            skill: "Socratic AI Prototyping",
            desc: "I design result-validating web labs and Socratic feedback loops that help beginners debug technical errors and build independent judgment."
        }
    ],

    demoTitle: "Explore All 4 Multimodal Learning Deliverables",
    demoIntro: "Watch the animated Database Normalization video in Tab 1, or switch to Tab 2 to launch the Articulate Rise/Storyline course, MySQL Identity, and SQL Quest Hub live.",

    renderInteractive: function() {
        return `
        <div class="surface-sandstone rounded p-6 md:p-8">
            <div class="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-[#E5E7EB]">
                <div>
                    <span class="font-mono-tag text-xs text-slate-500 block">Interactive Multimodal Showcase</span>
                    <h3 class="font-display text-xl font-bold text-[#111827]">Video Explainer & 3 Live Interactive Labs</h3>
                </div>
                <div class="flex flex-wrap gap-2" id="multi-tabs">
                    <button onclick="switchMultiTab(0)" class="multi-tab filter-pill active px-3.5 py-1.5 rounded text-xs font-semibold">1. Animaker Video (Normalization)</button>
                    <button onclick="switchMultiTab(1)" class="multi-tab filter-pill px-3.5 py-1.5 rounded text-xs font-semibold">2. Launch 3 Interactive SQL Labs</button>
                </div>
            </div>
            <div id="multi-showcase-body"></div>
        </div>`;
    },

    initInteractive: function() {
        window.switchMultiTab = function(idx) {
            document.querySelectorAll('.multi-tab').forEach((b, i) => b.classList.toggle('active', i === idx));
            const body = document.getElementById('multi-showcase-body');
            if (!body) return;

            if (idx === 0) {
                body.innerHTML = `
                    <div class="bg-white rounded border border-[#E5E7EB] p-6">
                        <div class="flex flex-wrap items-center justify-between gap-4 mb-4">
                            <div>
                                <span class="font-mono-tag text-[10px] text-slate-500 block">Micro-Learning Animation • Built with Animaker</span>
                                <h4 class="font-display font-bold text-lg text-[#111827]">Visualizing Database Normalization</h4>
                            </div>
                            <a href="https://drive.google.com/file/d/1Q7Gy0hEqI8RT3ga1e71AYgP9IOEjr_19/view?usp=sharing" target="_blank" rel="noopener" class="btn-primary px-4 py-2 rounded text-xs font-semibold">
                                Open Video in Google Drive ↗
                            </a>
                        </div>
                        <p class="text-xs text-[#4B5563] mb-4 leading-relaxed">
                            Created as a live teaching demonstration, this animated explainer uses visual storytelling and on-screen hand movements to demystify how unstructured data tables are normalized cleanly.
                        </p>
                        <div class="aspect-video w-full max-w-4xl mx-auto rounded overflow-hidden border border-[#E5E7EB] bg-black shadow-md">
                            <iframe class="w-full h-full" src="https://drive.google.com/file/d/1Q7Gy0hEqI8RT3ga1e71AYgP9IOEjr_19/preview" allow="autoplay" allowfullscreen></iframe>
                        </div>
                    </div>`;
            } else {
                body.innerHTML = `
                    <div class="grid md:grid-cols-3 gap-6">
                        <div class="bg-white rounded border border-[#E5E7EB] p-6 flex flex-col justify-between">
                            <div>
                                <span class="font-mono-tag text-[10px] px-2 py-0.5 rounded surface-sandstone">Modality 02 / Articulate 360</span>
                                <h4 class="font-display font-bold text-xl text-[#111827] mt-3 mb-2">Rise 360 + Storyline Course</h4>
                                <p class="text-xs text-[#4B5563] leading-relaxed mb-6">A responsive e-learning course on MySQL Joins & Aggregate Functions built in Articulate Rise 360 with embedded Storyline 360 interactive quizzes.</p>
                            </div>
                            <a href="https://joinsagg427.s3.us-east-2.amazonaws.com/comprehensive-guide-to-my-sql-joins-and-aggregate-functions-raw-Hlxo9Nax/content/index.html" target="_blank" rel="noopener" class="btn-primary text-center py-2.5 px-4 rounded text-xs font-semibold">
                                Launch Articulate Course ↗
                            </a>
                        </div>
                        <div class="bg-white rounded border border-[#E5E7EB] p-6 flex flex-col justify-between">
                            <div>
                                <span class="font-mono-tag text-[10px] px-2 py-0.5 rounded surface-sandstone">Modality 03 / Socratic AI Lab</span>
                                <h4 class="font-display font-bold text-xl text-[#111827] mt-3 mb-2">MySQL Identity</h4>
                                <p class="text-xs text-[#4B5563] leading-relaxed mb-6">An AI-prototyped SQL mystery game that checks query results rather than rigid syntax and uses Socratic guiding questions to coach learners.</p>
                            </div>
                            <a href="https://lythiaa.github.io/mysqlgames/Mysqlid/" target="_blank" rel="noopener" class="btn-primary text-center py-2.5 px-4 rounded text-xs font-semibold">
                                Play MySQL Identity ↗
                            </a>
                        </div>
                        <div class="bg-white rounded border border-[#E5E7EB] p-6 flex flex-col justify-between">
                            <div>
                                <span class="font-mono-tag text-[10px] px-2 py-0.5 rounded surface-sandstone">Modality 04 / Interactive Web App</span>
                                <h4 class="font-display font-bold text-xl text-[#111827] mt-3 mb-2">SQL Quest Hub</h4>
                                <p class="text-xs text-[#4B5563] leading-relaxed mb-6">Transforms abstract SQL JOINs into a leveled practice quest grounded in Gagné's Nine Events and Keller's ARCS motivation model.</p>
                            </div>
                            <a href="https://lythiaa.github.io/mysqlgames/joinsquest/" target="_blank" rel="noopener" class="btn-primary text-center py-2.5 px-4 rounded text-xs font-semibold">
                                Launch SQL Quest Hub ↗
                            </a>
                        </div>
                    </div>`;
            }
        };
        window.switchMultiTab(0);
    },

    transferability: [
        {
            role: "Customer Education & Product Academy",
            application: "A Customer Education team can replicate this four-modality model to build a complete customer academy: short animated feature explainers, Articulate 360 onboarding courses, and interactive practice sandboxes."
        },
        {
            role: "User Education & AI Practice Labs",
            application: "A User Education Lead can adapt the MySQL Identity Socratic feedback model to build hands-on AI prompting labs that evaluate user outputs and coach them with guiding questions."
        },
        {
            role: "Live & Asynchronous Technical Enablement",
            application: "An Enablement team can pair the animated explainer for quick pre-work, run live practice with the web quests, and assign the Rise 360 course as a self-serve reference library."
        }
    ]
};
// END OF FILE