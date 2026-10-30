// amimate and do few page elements after a route has been rendered/done
export function animatePage() {
    const gsap = window.gsap;

    // keep the site online and working even if GSAP has not loaded or motion is reduced, failsafe
    if (!gsap || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return; }

    const elements = document.querySelectorAll(
        "#root > section h1, " +
        "#root > section .page-settings-icon, " +
        "#root > section .price-dial, " +
        "#root > section .overview-summary__item, " +
        "#root > section .history-date, " +
        "#root > section .history-prices h2, " +
        "#root > section .history-price-row, " +
        "#root > .price-disclaimer"

    );

    // a fade and rise
    gsap.from(elements, {
        y: 8,
        opacity: 0,
        duration: 0.4,
        stagger: 0.04,
        ease: "power1.out",
        clearProps: "transform,opacity"
        
    });
}





