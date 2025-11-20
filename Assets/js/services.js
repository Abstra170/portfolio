(async function () {
  console.log("📌 Services JS loaded");

  const categoryTabs = document.getElementById("service-categories");
  const serviceContainer = document.getElementById("service-container");

  // Load JSON config
  const response = await fetch("../Assets/Config/services.json");
  const servicesData = await response.json();

  // Create category buttons
  let firstCategory = null;
  Object.keys(servicesData).forEach((category, index) => {
    if (index === 0) firstCategory = category;

    const btn = document.createElement("button");
    btn.textContent = category;
    btn.classList.toggle("active", index === 0);
    btn.onclick = () => {
      document.querySelectorAll(".category-tabs button")
        .forEach(b => b.classList.remove("active"));
      
      btn.classList.add("active");
      loadServices(category);
    };
    categoryTabs.appendChild(btn);
  });

  // Load services of selected category
  function loadServices(category) {
    serviceContainer.innerHTML = "";

    servicesData[category].forEach(service => {
      const card = document.createElement("div");
      card.className = "service-card";

      card.innerHTML = `
        <img src="${service.image}" alt="${service.title}">
        <div class="service-card-content">
          <h3>${service.title}</h3>
          <p>${service.description}</p>
          <span class="price-tag">${service.price}</span>
        </div>
      `;

      serviceContainer.appendChild(card);

      setTimeout(() => card.classList.add("show"), 100);
    });
  }

  // Load first category automatically
  loadServices(firstCategory);

  ///
    function createScrollObserver(targetSelector, options = { threshold: 0.2 }) {
    const elements = document.querySelectorAll(targetSelector);
    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");

          if (entry.target.classList.contains("skill-card")) {
            const allSkills = document.querySelectorAll(".skill-card");
            const index = Array.from(allSkills).indexOf(entry.target);
            entry.target.style.transitionDelay = `${index * 0.1}s`;
          }
        } else {
          entry.target.classList.remove("show");
        }
      });
    }, options);

    elements.forEach((el) => observer.observe(el));
  }
  createScrollObserver(".sector-block", { threshold: 0.3 });
  createScrollObserver(".services-hero", { threshold: 0.8 });
})();
