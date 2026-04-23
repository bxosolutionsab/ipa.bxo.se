const mobileToggle = document.querySelector("[data-nav-toggle]");
const mobileNav = document.querySelector("[data-mobile-nav]");
const pageNav = document.querySelector("[data-page-nav]");
const pageLinks = pageNav ? Array.from(pageNav.querySelectorAll("a")) : [];
const pageSections = pageLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if (mobileToggle && mobileNav) {
  mobileToggle.addEventListener("click", () => {
    const isOpen = mobileNav.classList.toggle("open");
    mobileToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

const normalizePath = (pathname) => {
  if (pathname.endsWith("/")) return `${pathname}index.html`;
  return pathname.replace(/\/index\.html$/, "/index.html");
};

const currentPath = normalizePath(window.location.pathname);

document.querySelectorAll(".top-nav a, .mobile-nav a").forEach((link) => {
  const href = link.getAttribute("href");
  if (!href || href.startsWith("#")) return;
  const url = new URL(href, window.location.href);
  if (normalizePath(url.pathname) === currentPath) {
    link.classList.add("is-current");
  }
});

if ("IntersectionObserver" in window && pageSections.length > 0) {
  const linkMap = new Map(pageLinks.map((link) => [link.getAttribute("href").slice(1), link]));
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const link = linkMap.get(entry.target.id);
        if (!link || !entry.isIntersecting) return;
        pageLinks.forEach((item) => item.classList.remove("active"));
        link.classList.add("active");
      });
    },
    {
      rootMargin: "-20% 0px -65% 0px",
      threshold: 0.1,
    }
  );

  pageSections.forEach((section) => observer.observe(section));
}
