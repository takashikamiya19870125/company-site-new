// Initialize EmailJS
(function() {
    // EmailJS設定が必要です
    // 1. https://www.emailjs.com/ でアカウント作成
    // 2. Gmail等のサービスを接続
    // 3. メールテンプレートを作成
    // 4. 以下に実際の値を設定してください
    const PUBLIC_KEY = "-0ODsrBCzoqQ0dFlg"; // EmailJSのPublic Key
    if (PUBLIC_KEY !== "YOUR_PUBLIC_KEY") {
        emailjs.init(PUBLIC_KEY);
    }
})();

// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Portfolio tabs functionality
document.addEventListener('DOMContentLoaded', function() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');

            // Remove active class from all tabs and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
});

// Contact form functionality
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const formStatus = document.getElementById('formStatus');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading state
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<div class="loading"></div> 送信中...';
        submitBtn.disabled = true;
        formStatus.innerHTML = '';

        // Get form data
        const formData = new FormData(contactForm);
        const templateParams = {
            from_name: formData.get('name'),
            from_email: formData.get('email'),
            company: formData.get('company') || '未記入',
            phone: formData.get('phone') || '未記入',
            service: getServiceText(formData.get('service')),
            message: formData.get('message'),
            to_name: '神谷崇',
            to_email: 'takashi.kamiya@roc-your-world.com',
            reply_to: formData.get('email')
        };

        // Send email using EmailJS
        const SERVICE_ID = "service_5js56et"; // EmailJSのService ID
        const TEMPLATE_ID = "template_z2xkjss"; // EmailJSのTemplate ID
        
        if (SERVICE_ID === "YOUR_SERVICE_ID" || TEMPLATE_ID === "YOUR_TEMPLATE_ID") {
            // EmailJS設定が未完了の場合は開発用メッセージを表示
            showFormStatus('success', 'フォームが送信されました（開発環境）。実際のメール送信にはEmailJS設定が必要です。');
            contactForm.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            return;
        }
        
        console.log('EmailJS 送信開始:', { SERVICE_ID, TEMPLATE_ID, templateParams });
        console.log('EmailJS 初期化状態:', emailjs);
        
        // 1. 神谷さん宛にお問い合わせ通知を送信
        const notificationParams = {
            ...templateParams,
            to_email: 'takashi.kamiya@roc-your-world.com',
            to_name: '神谷崇'
        };
        
        // 2. 問い合わせ者宛に自動返信を送信
        const autoReplyParams = {
            ...templateParams,
            to_email: formData.get('email'),
            to_name: formData.get('name')
        };
        
        // 両方のメールを送信
        Promise.all([
            emailjs.send(SERVICE_ID, TEMPLATE_ID, notificationParams),
            emailjs.send(SERVICE_ID, TEMPLATE_ID, autoReplyParams)
        ])
            .then(function(responses) {
                console.log('SUCCESS!', responses);
                showFormStatus('success', 'お問い合わせありがとうございます。確認メールをお送りしました。24時間以内にご返信いたします。');
                contactForm.reset();
            })
            .catch(function(error) {
                console.log('FAILED...', error);
                console.log('エラー詳細:', error.text || error.message || error);
                showFormStatus('error', `送信に失敗しました: ${error.text || error.message || 'Unknown error'}`);
            })
            .finally(function() {
                // Reset button state
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            });
    });

    function getServiceText(serviceValue) {
        const serviceMap = {
            'marketing-dx': 'マーケティングDX支援',
            'ai-tools': '生成AI活用ツール開発',
            'research': '市場調査・データ活用',
            'consultation': 'まずは相談したい',
            'other': 'その他'
        };
        return serviceMap[serviceValue] || '未選択';
    }

    function showFormStatus(type, message) {
        formStatus.className = `form-status ${type}`;
        formStatus.innerHTML = message;
        formStatus.style.display = 'block';

        // Hide status after 5 seconds
        setTimeout(() => {
            formStatus.style.display = 'none';
        }, 5000);
    }
});

// Intersection Observer for animations
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.service-card, .portfolio-item, .visual-card, .experience-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Typing animation for hero title
document.addEventListener('DOMContentLoaded', function() {
    const titleHighlight = document.querySelector('.title-highlight');
    if (titleHighlight) {
        const text = titleHighlight.textContent;
        titleHighlight.textContent = '';
        titleHighlight.style.borderRight = '2px solid';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                titleHighlight.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                titleHighlight.style.borderRight = 'none';
            }
        };
        
        setTimeout(typeWriter, 1000);
    }
});

// Parallax effect for hero background
document.addEventListener('DOMContentLoaded', function() {
    const heroParticles = document.querySelector('.hero-particles');
    
    if (heroParticles) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            heroParticles.style.transform = `translateY(${parallax}px)`;
        });
    }
});

// Form validation enhancement
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('input, textarea, select');

    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearError);
    });

    function validateField(e) {
        const field = e.target;
        const value = field.value.trim();
        
        clearError(e);

        if (field.hasAttribute('required') && !value) {
            showFieldError(field, 'この項目は必須です');
            return false;
        }

        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                showFieldError(field, '有効なメールアドレスを入力してください');
                return false;
            }
        }

        return true;
    }

    function showFieldError(field, message) {
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }

        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.style.color = '#ef4444';
        errorDiv.style.fontSize = '0.8rem';
        errorDiv.style.marginTop = '0.25rem';
        errorDiv.textContent = message;
        
        field.parentNode.appendChild(errorDiv);
        field.style.borderColor = '#ef4444';
    }

    function clearError(e) {
        const field = e.target;
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
        field.style.borderColor = '';
    }
});

// Loading states for better UX
document.addEventListener('DOMContentLoaded', function() {
    // Add loading class to body initially
    document.body.classList.add('loading');
    
    // Remove loading class when page is fully loaded
    window.addEventListener('load', function() {
        document.body.classList.remove('loading');
        
        // Trigger entrance animations
        const heroContent = document.querySelector('.hero-content');
        const heroVisual = document.querySelector('.hero-visual');
        
        if (heroContent) {
            heroContent.style.opacity = '0';
            heroContent.style.transform = 'translateY(30px)';
            heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
            
            setTimeout(() => {
                heroContent.style.opacity = '1';
                heroContent.style.transform = 'translateY(0)';
            }, 300);
        }
        
        if (heroVisual) {
            heroVisual.style.opacity = '0';
            heroVisual.style.transform = 'translateX(30px)';
            heroVisual.style.transition = 'opacity 1s ease, transform 1s ease';
            
            setTimeout(() => {
                heroVisual.style.opacity = '1';
                heroVisual.style.transform = 'translateX(0)';
            }, 600);
        }
    });
});

// Performance optimization - lazy loading for images
document.addEventListener('DOMContentLoaded', function() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
});

// Add CSS for loading states
const loadingStyles = `
    .loading * {
        transition-duration: 0s !important;
    }
    
    .field-error {
        animation: slideIn 0.3s ease;
    }
    
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

// Inject loading styles
const styleSheet = document.createElement('style');
styleSheet.textContent = loadingStyles;
document.head.appendChild(styleSheet);