document.addEventListener('DOMContentLoaded', () => {

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Select elements to reveal
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));

    // Smooth scroll handling (Optional extra smoothness if needed beyond CSS)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Console greeting
    console.log("%c Designed by Brian | Powered by Agentic AI ", "background: #222; color: #bada55; font-size: 12px; padding: 4px; border-radius: 4px;");

    // Translation Data
    const translations = {
        en: {
            "nav.about": "About",
            "nav.work": "Work",
            "nav.contact": "Contact",
            "hero.title": "Designing with AI.",
            "hero.subtitle": "Collaborating with AI to bring creative ideas to life.",
            "about.title": "About Me",
            "about.text1": "I build bridges between complex AI models and elegant user experiences. With a deep focus on **Large Language Models (LLMs)** and **Agentic Workflows**, I create solutions that are not just smart, but intuitive throughout.",
            "about.text2": "My philosophy is simple: Complexity should be invisible. The user sees beauty; the system handles the rest.",
            "about.stats.n_exp": "0.5+",
            "about.stats.exp": "Years AI Collaboration",
            "about.stats.n_projects": "20+",
            "about.stats.projects": "Projects",
            "portfolio.title": "Projects",
            "portfolio.p1.title": "Time Converter",
            "portfolio.p1.desc": "Because of work needs, I need to have meetings with colleagues in different urban areas, so I built a local time zone switching converter, allowing me to make effective meeting arrangements.",
            "portfolio.p2.title": "Smart Code Assistant",
            "portfolio.p2.desc": "VS Code extension integrating Gemini Pro for real-time refactoring.",
            "portfolio.p3.title": "Vision Analysis Pipeline",
            "portfolio.p3.desc": "Serverless architecture for processing biological imagery datasets.",
            "footer.title": "Let's Connect.",
            "footer.text": "Open for collaborations and technical consultancy."
        },
        zh: {
            "nav.about": "關於我",
            "nav.work": "作品集",
            "nav.contact": "聯絡",
            "hero.title": "用AI設計",
            "hero.subtitle": "這是我用AI協作的服務內容，來呈現自己創造力想法",
            "about.title": "About Me",
            "about.text1": "我建立複雜 AI 模型與優雅使用者體驗之間的橋樑。憑藉對 **大型語言模型 (LLMs)** 和 **代理工作流 (Agentic Workflows)** 的深入研究，我創造的不僅是智慧解決方案，更是直覺的使用體驗。",
            "about.text2": "我的哲學很簡單：複雜應當隱形。使用者看見美；系統處理其餘。",
            "about.stats.n_exp": "0.5+",
            "about.stats.exp": "AI協作年經驗",
            "about.stats.n_projects": "20+",
            "about.stats.projects": "專案",
            "portfolio.title": "專案分享",
            "portfolio.p1.title": "時間轉換器",
            "portfolio.p1.desc": "因為工作的需求會需要跟不同市區的同事開會，所以住了一個當地時區的切換轉換器，讓我可以做有效地會議安排",
            "portfolio.p2.title": "智慧程式碼助手",
            "portfolio.p2.desc": "整合 Gemini Pro 進行即時重構的 VS Code 擴充功能。",
            "portfolio.p3.title": "視覺分析管道",
            "portfolio.p3.desc": "處理生物影像資料集的無伺服器架構。",
            "footer.title": "保持聯繫。",
            "footer.text": "歡迎洽談合作與技術諮詢。"
        }
    };

    // Dynamic Projects Count Logic
    const projectCount = document.querySelectorAll('#portfolio .project-card').length;
    // Update translations
    translations.en['about.stats.n_projects'] = projectCount;
    translations.zh['about.stats.n_projects'] = projectCount;

    // Update initial display
    const projectCountEl = document.querySelector('[data-i18n="about.stats.n_projects"]');
    if (projectCountEl) {
        projectCountEl.textContent = projectCount;
    }

    // Language Switching Logic
    let currentLang = 'en';
    const langBtn = document.getElementById('lang-toggle');

    function switchLanguage(lang) {
        currentLang = lang;
        const t = translations[lang];

        // Update Text
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (t[key]) {
                // If the content has markdown-like bold syntax (**text**), basic replace
                // Note: For full markdown support, we'd need a parser. 
                // Here we essentially hardcode replacing ** with <strong> for specific keys if needed, 
                // OR we just use innerText for simple text. 
                // Given "about.text1" has **, let's do a simple regex for bold.
                let content = t[key];

                // Ensure content is a string for .includes() check
                // (Dynamic counts like n_projects might be numbers)
                if (typeof content === 'string' && content.includes('**')) {
                    content = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                    element.innerHTML = content;
                } else {
                    element.textContent = content;
                }
            }
        });

        // Update Button Text (Show the language you can switch TO)
        langBtn.textContent = lang === 'en' ? '中文' : 'EN';

        // Update html lang attribute
        document.documentElement.lang = lang === 'en' ? 'en' : 'zh-Hant';
    }

    // Toggle Button Listener
    if (langBtn) {
        langBtn.addEventListener('click', () => {
            const newLang = currentLang === 'en' ? 'zh' : 'en';
            switchLanguage(newLang);
        });
    }

    // Optional: Auto-detect browser language?
    // For now, default to English as per request logic "Default EN"
});
