const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
const targets = Array.from(document.querySelectorAll<HTMLElement>(
  ".hero-copy, .hero-visual, .proof-strip, .section-heading, .writing-feature, .project-card, " +
  ".leadership-principles article, .career-item, .teaching-card, .about-heading, .about-copy, " +
  ".contact-inner > div, .page-heading, .brief-section, .brief-sidebar, .archive-card",
));
const revealed = new WeakSet<HTMLElement>();
const active = new Map<HTMLElement, Animation>();
let observer: IntersectionObserver | undefined;

function stopMotion() {
  observer?.disconnect();
  active.forEach((animation) => animation.cancel());
  active.clear();
}

function startMotion() {
  stopMotion();
  if (preference.matches || !("IntersectionObserver" in window) || !("animate" in Element.prototype)) return;
  observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting || !(entry.target instanceof HTMLElement)) continue;
      const target = entry.target;
      observer?.unobserve(target);
      if (revealed.has(target)) continue;
      revealed.add(target);
      target.dataset.motion = "revealed";
      if (target.contains(document.activeElement)) continue;
      const animation = target.animate(
        [{ opacity: 0, transform: "translateY(12px)" }, { opacity: 1, transform: "translateY(0)" }],
        { duration: 480, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
      );
      active.set(target, animation);
      const release = () => active.delete(target);
      animation.addEventListener("finish", release, { once: true });
      animation.addEventListener("cancel", release, { once: true });
    }
  }, { threshold: 0.08 });
  targets.forEach((target) => {
    if (!revealed.has(target)) observer?.observe(target);
  });
}

document.addEventListener("focusin", (event) => {
  if (!(event.target instanceof Element)) return;
  const target = event.target.closest<HTMLElement>("[data-motion]");
  if (target) active.get(target)?.cancel();
});
preference.addEventListener("change", startMotion);
startMotion();
