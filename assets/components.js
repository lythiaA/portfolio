// assets/components.js
document.addEventListener('DOMContentLoaded', () => {
    // 1. Inject Shared Top Navigation
    const navPlaceholder = document.getElementById('site-nav');
    if (navPlaceholder) {
        navPlaceholder.innerHTML = `
        <header class="sticky top-0 z-40 border-b border-[#E5E7EB] bg-[#FAF8F5]/90 backdrop-blur-md">
            <div class="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
                <a href="index.html" class="flex items-center gap-3 group">
                    <span class="w-9 h-9 rounded bg-[#0F172A] text-[#FAF8F5] flex items-center justify-center font-bold text-sm tracking-wider">LA</span>
                    <div>
                        <span class="font-display font-bold text-lg text-[#111827] block leading-none">Lythia Amoakon</span>
                        <span class="font-mono-tag text-[10px] text-slate-500 block mt-1">Enablement • Solutions • LXD</span>
                    </div>
                </a>
                <nav class="hidden md:flex items-center gap-8 text-sm font-medium text-[#111827]">
                    <a href="index.html#work" class="hover:opacity-70 transition-opacity">Selected Work</a>
                    <a href="index.html#impact" class="hover:opacity-70 transition-opacity">Facilitation & Analytics</a>
                    <a href="index.html#capabilities" class="hover:opacity-70 transition-opacity">Capabilities</a>
                    <a href="about.html" class="hover:opacity-70 transition-opacity">About</a>
                    <button onclick="toggleContactDrawer(true)" class="btn-primary px-5 py-2.5 rounded text-sm font-medium">
                        Let's Connect
                    </button>
                </nav>
                <button onclick="toggleContactDrawer(true)" class="md:hidden btn-primary px-4 py-2 rounded text-xs font-medium">
                    Connect
                </button>
            </div>
        </header>`;
    }

    // 2. Inject Shared Footer + Slide-Out Contact Drawer
    const footerPlaceholder = document.getElementById('site-footer');
    if (footerPlaceholder) {
        footerPlaceholder.innerHTML = `
        <footer class="bg-[#0F172A] text-[#FAF8F5] border-t border-[#111827] mt-24">
            <div class="max-w-6xl mx-auto px-6 py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                <div>
                    <p class="font-mono-tag text-[#E5E7EB]/60 mb-2">Available for Strategic Roles & Consulting</p>
                    <h3 class="font-display text-2xl md:text-3xl font-bold mb-2">Ready to elevate product adoption & learning impact?</h3>
                    <p class="text-sm text-[#E5E7EB]/80 max-w-xl">Specializing in Live Technical Facilitation, Customer Education, Post-Sales Solutions Enablement, and Data-Driven Learning Experience Design.</p>
                </div>
                <div class="flex flex-wrap gap-4">
                    <button onclick="toggleContactDrawer(true)" class="bg-[#FAF8F5] text-[#0F172A] hover:bg-[#F5F2EB] px-6 py-3 rounded font-semibold text-sm transition-colors">
                        Open Contact Drawer
                    </button>
                    <a href="https://www.linkedin.com/in/lythiaa/" target="_blank" rel="noopener" class="border border-[#E5E7EB]/30 hover:border-[#FAF8F5] px-6 py-3 rounded font-semibold text-sm transition-colors">
                        LinkedIn ↗
                    </a>
                </div>
            </div>
            <div class="border-t border-white/10 py-6 text-center text-xs text-[#E5E7EB]/50">
                © ${new Date().getFullYear()} Lythia Amoakon • Fluent English & Native French • Built with Modular Decentralized Architecture
            </div>
        </footer>

        <!-- Slide-Out Contact Drawer -->
        <div id="contact-drawer-Wrapper" class="fixed inset-0 z-50 hidden">
            <div id="drawer-backdrop" onclick="toggleContactDrawer(false)" class="drawer-backdrop fixed inset-0 opacity-0"></div>
            <aside id="drawer-panel" class="drawer-panel fixed top-0 right-0 h-full w-full max-w-md z-10 p-8 flex flex-col justify-between translate-x-full shadow-2xl overflow-y-auto">
                <div>
                    <div class="flex items-center justify-between pb-6 border-b border-[#E5E7EB]">
                        <div>
                            <span class="font-mono-tag text-slate-500">Direct Inquiry</span>
                            <h3 class="font-display text-2xl font-bold text-[#111827]">Let's Connect</h3>
                        </div>
                        <button onclick="toggleContactDrawer(false)" class="w-9 h-9 rounded-full bg-[#F5F2EB] flex items-center justify-center text-[#111827] hover:bg-[#E5E7EB]" aria-label="Close drawer">✕</button>
                    </div>

                    <div class="my-6 p-4 rounded surface-sandstone">
                        <p class="font-mono-tag text-xs text-slate-500 mb-2">Target Focus Areas</p>
                        <div class="flex flex-wrap gap-1.5">
                            <span class="text-xs bg-white border border-[#E5E7EB] px-2.5 py-1 rounded font-medium">Customer Education & Enablement</span>
                            <span class="text-xs bg-white border border-[#E5E7EB] px-2.5 py-1 rounded font-medium">Live Technical Facilitation</span>
                            <span class="text-xs bg-white border border-[#E5E7EB] px-2.5 py-1 rounded font-medium">Solutions Engineering (Post-Sales)</span>
                            <span class="text-xs bg-white border border-[#E5E7EB] px-2.5 py-1 rounded font-medium">Customer Success</span>
                            <span class="text-xs bg-white border border-[#E5E7EB] px-2.5 py-1 rounded font-medium">LXD & Learning Analytics</span>
                        </div>
                        <a href="mailto:lythiaamoakon@gmail.com?subject=Portfolio%20Inquiry%20-%20Lythia%20Amoakon" class="flex items-center justify-between p-4 rounded surface-white">
                    </div>

                    <div class="space-y-4">
                        <a href="https://www.linkedin.com/in/lythiaa/" target="_blank" rel="noopener" class="flex items-center justify-between p-4 rounded surface-white">
                            <div>
                                <span class="font-semibold block text-sm">Message on LinkedIn</span>
                                <span class="text-xs text-slate-500">Fastest response for role inquiries & networking</span>
                            </div>
                            <span class="font-mono-tag">↗</span>
                        </a>
                        <a href="mailto:lythia.amoakon@gmail.com?subject=Portfolio%20Inquiry%20-%20Lythia%20Amoakon" class="flex items-center justify-between p-4 rounded surface-white">
                            <div>
                                <span class="font-semibold block text-sm">Send Direct Email</span>
                                <span class="text-xs text-slate-500">Request full tailored CV or discuss a role</span>
                            </div>
                            <span class="font-mono-tag">✉</span>
                        </a>
                    </div>
                </div>

                <div class="pt-6 border-t border-[#E5E7EB] text-xs text-slate-500">
                    <p class="font-medium text-[#111827] mb-1">Bilingual Facilitation & Consulting</p>
                    <p>Native French • Fluent English • Based in Georgia (EST)</p>
                </div>
            </aside>
        </div>`;
    }
});

// Global Drawer Toggle Function
window.toggleContactDrawer = function(open) {
    const wrapper = document.getElementById('contact-drawer-Wrapper');
    const backdrop = document.getElementById('drawer-backdrop');
    const panel = document.getElementById('drawer-panel');
    if (!wrapper) return;

    if (open) {
        wrapper.classList.remove('hidden');
        setTimeout(() => {
            backdrop.classList.remove('opacity-0');
            panel.classList.remove('translate-x-full');
        }, 10);
    } else {
        backdrop.classList.add('opacity-0');
        panel.classList.add('translate-x-full');
        setTimeout(() => wrapper.classList.add('hidden'), 350);
    }
};
