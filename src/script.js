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
            "about.text1": "By day, I am a Product Manager. After work, I apply my learnings in Large Language Models (LLMs) to put ideas into practice, creating useful tools and workflows to solve everyday problems.",
            "about.text2": "AI Approach: Let AI handle the repetitive and complex tasks, so users can simply focus on using the tools to solve problems. The biggest constraint I set for myself is: 'No use of prior design tools or techniques—only text or hand-drawn sketches to build ideas through AI collaboration.'",
            "about.stats.n_exp": "0.5+",
            "about.stats.exp": "Years AI Collaboration",
            "about.stats.n_projects": "20+",
            "about.stats.projects": "Projects",
            "portfolio.title": "Projects",
            "portfolio.tetris.title": "Tetris",
            "portfolio.tetris.desc": "Another mini-game to help me unwind after work, allowing my brain to take a short breather and relax.",
            "portfolio.time_converter.title": "Time Converter",
            "portfolio.time_converter.desc": "Because of work needs, I need to have meetings with colleagues in different urban areas, so I built a local time zone switching converter, allowing me to make effective meeting arrangements.",
            "portfolio.phone_calc.title": "Phone Upgrade Calculator",
            "portfolio.phone_calc.desc": "A depreciation calculation tool designed to help evaluate the best time to sell your phone, allowing users to determine the optimal moment for an upgrade.",
            "portfolio.snake.title": "Snake Game",
            "portfolio.snake.desc": "Amidst busy work, sometimes you just want to zone out. Snake is a simple game to relax your brain and shift focus.",
            "footer.title": "Let's Connect.",
            "footer.text": "Open for collaborations and technical consultancy.",
            "footer.newsletter": "Newsletter"
        },
        zh: {
            "nav.about": "關於我",
            "nav.work": "作品集",
            "nav.contact": "聯絡",
            "hero.title": "用AI設計",
            "hero.subtitle": "這是我用AI協作的服務內容，來呈現自己創造力想法",
            "about.title": "About Me",
            "about.text1": "日常是一個產品經理，下班後學習應用使用大型語言模型(LLMs)實踐想法上，創作出可應用的小工具或流程，來解決日常生活的小問題。",
            "about.text2": "AI應用方式：讓AI處理重複複雜的事、使用者只應用工具解決問題。給自己最大的限制條件是：「不可以用過去任何設計工具或手法，僅能用文字或手繪，透過AI協作建立Idea」",
            "about.stats.n_exp": "0.5+",
            "about.stats.exp": "AI協作年經驗",
            "about.stats.n_projects": "20+",
            "about.stats.projects": "專案",
            "portfolio.title": "專案分享",
            "portfolio.tetris.title": "俄羅斯方塊",
            "portfolio.tetris.desc": "另一個工作之餘可以讓我放鬆的小遊戲，讓大腦可以暫時放鬆呼吸的小遊戲",
            "portfolio.time_converter.title": "時間轉換器",
            "portfolio.time_converter.desc": "因為工作的需求會需要跟不同市區的同事開會，所以住了一個當地時區的切換轉換器，讓我可以做有效地會議安排",
            "portfolio.phone_calc.title": "換機計算機",
            "portfolio.phone_calc.desc": "為了要能知道最佳售出手機的時間，所以做出了這一個折價計算的工具，讓有需要的人也可以來評估何時可以將手上的手機賣出",
            "portfolio.snake.title": "貪食蛇",
            "portfolio.snake.desc": "在工作繁忙之際，有時候都還是想放空一下，就會想要玩一下舒壓的小遊戲，貪食蛇是其中一個小遊戲，簡單的操作，就可以大腦放鬆一下移轉注意力",
            "footer.title": "保持聯繫。",
            "footer.text": "歡迎洽談合作與技術諮詢。",
            "footer.newsletter": "電子報"
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
