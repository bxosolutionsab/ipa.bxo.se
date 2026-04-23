const toggle = document.querySelector(".nav-toggle");
const toc = document.querySelector(".toc");
const links = Array.from(document.querySelectorAll(".toc a"));
const sections = links
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if (toggle && toc) {
  toggle.addEventListener("click", () => {
    const isOpen = toc.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
}

if ("IntersectionObserver" in window && links.length > 0) {
  const linkMap = new Map(links.map((link) => [link.getAttribute("href").slice(1), link]));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const link = linkMap.get(entry.target.id);
        if (!link) return;
        if (entry.isIntersecting) {
          links.forEach((item) => item.classList.remove("active"));
          link.classList.add("active");
        }
      });
    },
    {
      rootMargin: "-25% 0px -60% 0px",
      threshold: 0.1,
    }
  );

  sections.forEach((section) => observer.observe(section));
}
