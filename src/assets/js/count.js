function animateCounter(element, target, duration, suffix = '', prefix = '') {
    let start = 0;
    const stepTime = Math.abs(Math.floor(duration / target));
    const increment = target / (duration / stepTime);

    const counter = setInterval(() => {
        start += increment;
        if (start >= target) {
            clearInterval(counter);
            element.textContent = `${prefix}${target}${suffix}`;
        } else {
            element.textContent = `${prefix}${Math.floor(start)}${suffix}`;
        }
    }, stepTime);
}

function startCountOnScroll() {
    const observer = new IntersectionObserver(
        (entries, observerInstance) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const target = parseInt(element.getAttribute('data-target'), 10);
                    const duration = parseInt(element.getAttribute('data-duration'), 10) || 2000;
                    const suffix = element.getAttribute('data-suffix') || '';
                    const prefix = element.getAttribute('data-prefix') || '';

                    // Start the animation
                    animateCounter(element, target, duration, suffix, prefix);

                    // Stop observing this element after it animates
                    observerInstance.unobserve(element);
                }
            });
        },
        {
            threshold: 0.5, // Trigger when 50% of the element is visible
        }
    );

    // Observe counters inside #stats-316 and #sbs-1640
    const counters = document.querySelectorAll('#stats-316 .cs-number, #sbs-1640 .cs-number');
    counters.forEach(counter => observer.observe(counter));
}

document.addEventListener('DOMContentLoaded', startCountOnScroll);
