// ================= DARK MODE =================
const themeToggle = document.querySelector(".theme-toggle");

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.body.classList.add("dark");
  themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  const isDark = document.body.classList.contains("dark");

  localStorage.setItem("theme", isDark ? "dark" : "light");

  themeToggle.innerHTML = isDark
    ? '<i class="fa-solid fa-sun"></i>'
    : '<i class="fa-solid fa-moon"></i>';
});

// ================= SMOOTH SCROLL =================
document.querySelectorAll("a[href^='#']").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    document.querySelector(link.getAttribute("href"))
      ?.scrollIntoView({ behavior: "smooth" });
  });
});

// ================= ACTIVE NAV =================
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("nav a");

  let current = "";

  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) {
      current = sec.id;
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

// ================= COUNTER ANIMATION (PRO) =================
const counters = document.querySelectorAll(".counter");

const runCounter = (counter) => {
  const target = +counter.getAttribute("data-target");
  let count = 0;

  const speed = target / 40;

  const update = () => {
    if (count < target) {
      count += speed;
      counter.textContent = Math.ceil(count) + "+";
      requestAnimationFrame(update);
    } else {
      counter.textContent = target + "+";
    }
  };

  update();
};

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      runCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.6 });

counters.forEach(c => counterObserver.observe(c));

// ================= CERTIFICATE MODAL =================
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const closeBtn = document.querySelector(".close");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

const images = document.querySelectorAll(".cert-card img");

let index = 0;

images.forEach((img, i) => {
  img.addEventListener("click", () => {
    modal.style.display = "flex";
    modalImg.src = img.src;
    index = i;
    document.body.style.overflow = "hidden";
  });
});

nextBtn.addEventListener("click", () => {
  index = (index + 1) % images.length;
  modalImg.src = images[index].src;
});

prevBtn.addEventListener("click", () => {
  index = (index - 1 + images.length) % images.length;
  modalImg.src = images[index].src;
});

const closeModal = () => {
  modal.style.display = "none";
  document.body.style.overflow = "auto";
};

closeBtn.addEventListener("click", closeModal);

modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

// ================= AOS INIT =================
AOS.init({
  duration: 900,
  once: true,
});
// ================= BAR ANIMATION STATISTIK =================
const bars = document.querySelectorAll(".bar-fill");

const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target;
      const value = bar.getAttribute("data-height");

      setTimeout(() => {
        bar.style.height = value;
      }, 200);

      barObserver.unobserve(bar);
    }
  });
}, { threshold: 0.5 });

bars.forEach(bar => barObserver.observe(bar));
bars.forEach((bar, i) => {
  setTimeout(() => {
    barObserver.observe(bar);
  }, i * 200);
});