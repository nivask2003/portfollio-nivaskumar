const modal = document.getElementById("videoModal");
        const iframe = document.getElementById("projectVideo");
        const closeBtn = document.getElementById("closeModal");

        document.querySelectorAll('.view-project').forEach(btn => {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                const videoUrl = this.getAttribute('data-video');
                iframe.src = videoUrl;
                modal.style.display = 'block';
            });
        });

        closeBtn.onclick = () => {
            modal.style.display = 'none';
            iframe.src = ''; // Stop the video
        };

        window.onclick = e => {
            if (e.target === modal) {
                modal.style.display = 'none';
                iframe.src = '';
            }
        };

        // Smooth scrolling for navigation links
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

        // Navbar scroll effect
        window.addEventListener('scroll', function () {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Scroll to top button
        const scrollToTopBtn = document.getElementById('scrollToTop');

        window.addEventListener('scroll', function () {
            if (window.scrollY > 500) {
                scrollToTopBtn.classList.add('show');
            } else {
                scrollToTopBtn.classList.remove('show');
            }
        });

        scrollToTopBtn.addEventListener('click', function (e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');

                    // Animate skill progress bars
                    if (entry.target.classList.contains('skills-grid')) {
                        const progressBars = entry.target.querySelectorAll('.skill-progress-fill');
                        progressBars.forEach(bar => {
                            setTimeout(() => {
                                bar.classList.add('animate');
                            }, 300);
                        });
                    }
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.querySelectorAll('.section-title, .about-content, .skills-grid, .projects-grid, .contact-content').forEach(el => {
            observer.observe(el);
        });

        // Form submission
        document.querySelector('form').addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');

            // Create mailto link
            const mailtoLink = `mailto:nivask457@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;

            // Open default email client
            window.location.href = mailtoLink;

            // Reset form
            this.reset();

            // Show success message
            alert('Thank you for your message! Your default email client should open with the message pre-filled.');
        });

        // Add typing effect to hero title
        function typeWriter() {
            const element = document.querySelector('.typewriter');
            const text = element.textContent;
            element.textContent = '';
            element.style.borderRight = '2px solid var(--primary-color)';

            let i = 0;
            function type() {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(type, 100);
                } else {
                    // Blinking cursor effect
                    setInterval(() => {
                        element.style.borderRight = element.style.borderRight === '2px solid transparent'
                            ? '2px solid var(--primary-color)'
                            : '2px solid transparent';
                    }, 500);
                }
            }

            setTimeout(type, 1000);
        }

        // Initialize typing effect when page loads
        window.addEventListener('load', typeWriter);

        // Mobile menu toggle (basic implementation)
        document.querySelector('.mobile-menu').addEventListener('click', function () {
            const navLinks = document.querySelector('.nav-links');
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        });

        // Add active navigation highlight
        window.addEventListener('scroll', function () {
            const sections = document.querySelectorAll('section');
            const navLinks = document.querySelectorAll('.nav-links a');

            let currentSection = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.scrollY >= sectionTop - 150) {
                    currentSection = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSection}`) {
                    link.classList.add('active');
                }
            });
        });

        // Parallax effect for hero section
        window.addEventListener('scroll', function () {
            const hero = document.querySelector('.hero');
            const scrolled = window.scrollY;
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        });

        // Add smooth reveal animations
        const revealElements = document.querySelectorAll('.skill-item, .project-card, .contact-item');

        const revealObserver = new IntersectionObserver(function (entries) {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                }
            });
        }, { threshold: 0.1 });

        revealElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'all 0.6s ease';
            revealObserver.observe(el);
        });