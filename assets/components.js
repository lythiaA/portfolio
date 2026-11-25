// assets/components.js
document.addEventListener('DOMContentLoaded', () => {
    // 0. Ensure <main> has an ID and inject Skip to Main Content link
    const mainEl = document.querySelector('main');
    if (mainEl && !mainEl.id) {
        mainEl.id = 'main-content';
        mainEl.setAttribute('tabindex', '-1');
    }
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'site-skip-link';
    skipLink.textContent = 'Skip to main content';
    document.body.insertBefore(skipLink, document.body.firstChild);

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
                    <a href="index.html#work" class="hover:opacity-70 transition-opacity">Work</a>
                    <a href="index.html#initiatives" class="hover:opacity-70 transition-opacity">Initiatives</a>
                    <a href="index.html#expertise" class="hover:opacity-70 transition-opacity">Expertise</a>
                    <a href="about.html" class="hover:opacity-70 transition-opacity">About</a>
                    <button onclick="toggleContactDrawer(true)" class="btn-primary px-5 py-2.5 rounded text-sm font-medium">
                        Contacts
                    </button>
                </nav>
                <button onclick="toggleContactDrawer(true)" class="md:hidden btn-primary px-4 py-2 rounded text-xs font-medium">
                    Contacts
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
                    <p class="font-mono-tag text-[#E5E7EB]/60 mb-2">Available for Strategic Roles & Collaborations</p>
                    <h3 class="font-display text-2xl md:text-3xl font-bold mb-2">Ready to elevate product adoption & learning impact?</h3>
                    <p class="text-sm text-[#E5E7EB]/80 max-w-xl">Specializing in Live Technical Facilitation, Customer Education, Post-Sales Onboarding, and Data-Driven Learning Experience Design.</p>
                </div>
                <div class="flex flex-wrap gap-4">
                    <button onclick="toggleContactDrawer(true)" class="bg-[#FAF8F5] text-[#0F172A] hover:bg-[#F5F2EB] px-6 py-3 rounded font-semibold text-sm transition-colors">
                        Contacts
                    </button>
                    <a href="https://www.linkedin.com/in/lythiaa/" target="_blank" rel="noopener" class="border border-[#E5E7EB]/30 hover:border-[#FAF8F5] px-6 py-3 rounded font-semibold text-sm transition-colors">
                        LinkedIn ↗
                    </a>
                </div>
            </div>
            <div class="border-t border-white/10 py-6 text-center text-xs text-[#E5E7EB]/50">
                © ${new Date().getFullYear()} Lythia Amoakon • Built with Gemini
            </div>
        </footer>

        <div id="contact-drawer-Wrapper" class="fixed inset-0 z-50 hidden">
            <div id="drawer-backdrop" onclick="toggleContactDrawer(false)" class="drawer-backdrop fixed inset-0 opacity-0"></div>
            <aside id="drawer-panel" class="drawer-panel fixed top-0 right-0 h-full w-full max-w-md z-10 p-8 flex flex-col justify-between translate-x-full shadow-2xl overflow-y-auto">
                <div>
                    <div class="flex items-center justify-between pb-6 border-b border-[#E5E7EB]">
                        <div>
                            <span class="font-mono-tag text-slate-500">Direct Inquiry</span>
                            <h3 class="font-display text-2xl font-bold text-[#111827]">Contacts</h3>
                        </div>
                        <button onclick="toggleContactDrawer(false)" class="w-9 h-9 rounded-full bg-[#F5F2EB] flex items-center justify-center text-[#111827] hover:bg-[#E5E7EB]" aria-label="Close drawer">✕</button>
                    </div>

                    <div class="my-6 p-4 rounded surface-sandstone">
                        <p class="font-mono-tag text-xs text-slate-500 mb-2">Target Focus Areas</p>
                        <div class="flex flex-wrap gap-1.5">
                            <span class="text-xs bg-white border border-[#E5E7EB] px-2.5 py-1 rounded font-medium">Live Technical Facilitation</span>
                            <span class="text-xs bg-white border border-[#E5E7EB] px-2.5 py-1 rounded font-medium">Customer Education & Enablement</span>
                            <span class="text-xs bg-white border border-[#E5E7EB] px-2.5 py-1 rounded font-medium">Solutions Engineering (Post-Sales)</span>
                            <span class="text-xs bg-white border border-[#E5E7EB] px-2.5 py-1 rounded font-medium">Customer Success</span>
                            <span class="text-xs bg-white border border-[#E5E7EB] px-2.5 py-1 rounded font-medium">LXD & Learning Analytics</span>
                        </div>
                    </div>

                    <div class="space-y-4">
                        <a href="https://www.linkedin.com/in/lythiaa/" target="_blank" rel="noopener" class="flex items-center justify-between p-4 rounded surface-white">
                            <div>
                                <span class="font-semibold block text-sm">Connect on LinkedIn</span>
                                <span class="text-xs text-slate-500">Fastest response for role inquiries & networking</span>
                            </div>
                            <span class="font-mono-tag">↗</span>
                        </a>
                        <a href="mailto:lythiaamoakon@gmail.com?subject=Portfolio%20Inquiry%20-%20Lythia%20Amoakon" class="flex items-center justify-between p-4 rounded surface-white">
                            <div>
                                <span class="font-semibold block text-sm">Email Direct</span>
                                <span class="text-xs text-slate-500">lythiaamoakon@gmail.com</span>
                            </div>
                            <span class="font-mono-tag">✉</span>
                        </a>
                    </div>
                </div>

                <div class="pt-6 border-t border-[#E5E7EB] text-xs text-slate-500">
                    <p class="font-medium text-[#111827] mb-1">Lythia Amoakon • 2026 Employee of the Year</p>
                    <p>Based in Georgia (EST) • Built with Gemini</p>
                </div>
            </aside>
        </div>`;
    }

    // 3. Inject Shared Floating Accessibility Widget
    const a11yWrapper = document.createElement('div');
    a11yWrapper.className = 'site-a11y-widget';
    a11yWrapper.innerHTML = `
        <button
            type="button"
            class="site-a11y-fab"
            id="siteA11yToggle"
            aria-expanded="false"
            aria-controls="siteA11yPanel"
            aria-label="Open Accessibility Tools"
            title="Accessibility Tools"
        >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="4.5" r="2" fill="currentColor" />
                <path d="M4.5 8.5H19.5M12 8.5V14.5M12 14.5L8.5 20.5M12 14.5L15.5 20.5" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        </button>

        <aside class="site-a11y-panel hidden" id="siteA11yPanel" aria-label="Portfolio Accessibility Tools">
            <div class="site-a11y-head">
                <h2>Accessibility Tools</h2>
                <button type="button" class="site-a11y-close" id="siteA11yClose" aria-label="Close accessibility tools">✕</button>
            </div>

            <div class="site-a11y-group">
                <span class="site-a11y-label">Audio Reader</span>
                <div class="site-reader-btns">
                    <button type="button" class="site-a11y-btn" id="siteReadPlay">▶ Read Page</button>
                    <button type="button" class="site-a11y-btn secondary" id="siteReadPause" disabled>⏸ Pause</button>
                    <button type="button" class="site-a11y-btn secondary" id="siteReadStop" disabled>■ Stop</button>
                </div>
                <select id="siteVoiceSelect" class="site-voice-select" aria-label="Select reading voice">
                    <option value="">Default System Voice</option>
                </select>
                <p class="site-a11y-hint" id="siteReaderStatus">Reads the main content of this page aloud.</p>
            </div>

            <div class="site-a11y-group">
                <span class="site-a11y-label">Display & Reading</span>
                <label class="site-a11y-row">
                    <span>High-Contrast Dark Mode</span>
                    <input type="checkbox" id="siteDarkToggle" />
                </label>
                <label class="site-a11y-row">
                    <span>Large Text Size</span>
                    <input type="checkbox" id="siteLargeToggle" />
                </label>
                <label class="site-a11y-row">
                    <span>Readable Spacing</span>
                    <input type="checkbox" id="siteSpacingToggle" />
                </label>
            </div>

            <div class="site-a11y-group site-kbd-box">
                <span class="site-a11y-label">Keyboard Navigation</span>
                <ul class="site-kbd-list">
                    <li><kbd>Tab</kbd> Move to next item</li>
                    <li><kbd>Shift</kbd> + <kbd>Tab</kbd> Move backward</li>
                    <li><kbd>Enter</kbd> / <kbd>Space</kbd> Activate or toggle</li>
                </ul>
            </div>
        </aside>
    `;
    document.body.appendChild(a11yWrapper);

    initSiteA11yWidget();
});

function initSiteA11yWidget() {
    const toggleBtn = document.getElementById('siteA11yToggle');
    const closeBtn = document.getElementById('siteA11yClose');
    const panel = document.getElementById('siteA11yPanel');
    const darkToggle = document.getElementById('siteDarkToggle');
    const largeToggle = document.getElementById('siteLargeToggle');
    const spacingToggle = document.getElementById('siteSpacingToggle');
    const playBtn = document.getElementById('siteReadPlay');
    const pauseBtn = document.getElementById('siteReadPause');
    const stopBtn = document.getElementById('siteReadStop');
    const voiceSelect = document.getElementById('siteVoiceSelect');
    const statusEl = document.getElementById('siteReaderStatus');

    // Restore saved preferences across pages
    const savedDark = localStorage.getItem('portfolioA11yDark') === 'true';
    const savedLarge = localStorage.getItem('portfolioA11yLarge') === 'true';
    const savedSpacing = localStorage.getItem('portfolioA11ySpacing') === 'true';

    darkToggle.checked = savedDark;
    largeToggle.checked = savedLarge;
    spacingToggle.checked = savedSpacing;

    document.body.classList.toggle('a11y-dark-mode', savedDark);
    document.documentElement.classList.toggle('a11y-large-text', savedLarge);
    document.body.classList.toggle('a11y-readable-spacing', savedSpacing);

    function setPanelOpen(open) {
        panel.classList.toggle('hidden', !open);
        toggleBtn.setAttribute('aria-expanded', String(open));
    }

    toggleBtn.addEventListener('click', () => setPanelOpen(panel.classList.contains('hidden')));
    closeBtn.addEventListener('click', () => setPanelOpen(false));

    darkToggle.addEventListener('change', () => {
        document.body.classList.toggle('a11y-dark-mode', darkToggle.checked);
        localStorage.setItem('portfolioA11yDark', String(darkToggle.checked));
    });

    largeToggle.addEventListener('change', () => {
        document.documentElement.classList.toggle('a11y-large-text', largeToggle.checked);
        localStorage.setItem('portfolioA11yLarge', String(largeToggle.checked));
    });

    spacingToggle.addEventListener('change', () => {
        document.body.classList.toggle('a11y-readable-spacing', spacingToggle.checked);
        localStorage.setItem('portfolioA11ySpacing', String(spacingToggle.checked));
    });

    // Built-in Web Speech API Reader
    let voices = [];
    function loadVoices() {
        if (!('speechSynthesis' in window)) return;
        voices = window.speechSynthesis.getVoices().filter(v => v.lang.startsWith('en'));
        if (voices.length === 0) voices = window.speechSynthesis.getVoices();
        voiceSelect.innerHTML = `<option value="">Default System Voice</option>` +
            voices.map((v, i) => `<option value="${i}">${v.name} (${v.lang})</option>`).join('');
    }

    if ('speechSynthesis' in window) {
        loadVoices();
        window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    playBtn.addEventListener('click', () => {
        if (!('speechSynthesis' in window)) {
            statusEl.textContent = 'Your browser does not support built-in speech reading.';
            return;
        }
        window.speechSynthesis.cancel();
        const target = document.querySelector('main') || document.body;
        const text = target.innerText.replace(/\s+/g, ' ').trim();
        const utter = new SpeechSynthesisUtterance(text);
        utter.rate = 0.98;

        if (voiceSelect.value !== '' && voices[Number(voiceSelect.value)]) {
            utter.voice = voices[Number(voiceSelect.value)];
        }

        utter.onstart = () => {
            pauseBtn.disabled = false;
            pauseBtn.textContent = '⏸ Pause';
            stopBtn.disabled = false;
            statusEl.textContent = 'Reading page aloud...';
        };
        utter.onend = () => {
            pauseBtn.disabled = true;
            pauseBtn.textContent = '⏸ Pause';
            stopBtn.disabled = true;
            statusEl.textContent = 'Finished reading page.';
        };
        window.speechSynthesis.speak(utter);
    });

    pauseBtn.addEventListener('click', () => {
        if (!('speechSynthesis' in window)) return;
        if (window.speechSynthesis.paused) {
            window.speechSynthesis.resume();
            pauseBtn.textContent = '⏸ Pause';
            statusEl.textContent = 'Resumed reading...';
        } else if (window.speechSynthesis.speaking) {
            window.speechSynthesis.pause();
            pauseBtn.textContent = '▶ Resume';
            statusEl.textContent = 'Paused.';
        }
    });

    stopBtn.addEventListener('click', () => {
        if ('speechSynthesis' in window) window.speechSynthesis.cancel();
        pauseBtn.disabled = true;
        pauseBtn.textContent = '⏸ Pause';
        stopBtn.disabled = true;
        statusEl.textContent = 'Reads the main content of this page aloud.';
    });

    window.addEventListener('beforeunload', () => {
        if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    });
}

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
// END OF FILE