async function loadComponent(id, url, jsFile = null) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to load ${url}`);

    const html = await response.text();
    const container = document.getElementById(id);
    container.innerHTML = html;
    console.log(`✅ Loaded: ${url}`);

    // 🧠 Force browser to reflow/recalculate layout after injection
    container.offsetHeight;

    // ✅ Dynamically load JS after HTML is inserted
    if (jsFile) {
      const script = document.createElement("script");
      script.src = jsFile;
      script.defer = true;

      // Wait until JS is loaded before next layout reflow
      script.onload = () => {
        console.log(`✅ Loaded script: ${jsFile}`);
        document.body.offsetHeight;
      };

      document.body.appendChild(script);
    }

  } catch (error) {
    console.error(`❌ Error loading ${url}:`, error);
  }
}

// Example usage
loadComponent("nav-placeholder", "/pages/nav.html");
loadComponent("footer-placeholder", "/Pages/footer.html");
loadComponent("content-placeholder", "/Pages/about.html", "/Assets/JS/about.js");

document.addEventListener("click", async (e) => {
  const link = e.target.closest("a[data-page]");
  if (!link) return; // not a page link

  e.preventDefault(); // stop full reload

  const page = link.dataset.page;
  const script = link.dataset.script || null;

  // Load the new page dynamically
  await loadComponent("content-placeholder", page, script);

  // Optional: scroll to top after load
  window.scrollTo({ top: 0, behavior: "smooth" });

  console.log(`🌐 Navigated to: ${page}`);
});
