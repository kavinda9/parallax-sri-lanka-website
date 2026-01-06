// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Get elements for parallax effect
const welcome = document.getElementById("welcome");
const scrollIndicator = document.querySelector(".scroll-indicator");

// Sigiriya parallax layers
const layer1 = document.getElementById("layer1");
const layer2 = document.getElementById("layer2");
const layer3 = document.getElementById("layer3");
const layer4 = document.getElementById("layer4");
const sigiriyaMain = document.getElementById("sigiriya-main");

// Parallax scroll effect
window.addEventListener("scroll", function () {
  let value = window.scrollY;

  if (welcome) {
    welcome.style.top = value * 0.5 + "px";
  }

  // Hide scroll indicator when scrolling
  if (scrollIndicator) {
    if (value > 50) {
      scrollIndicator.style.opacity = "0";
    } else {
      scrollIndicator.style.opacity = "1";
    }
  }

  // Sigiriya gradual reveal effect
  const sigiriyaSection = document.getElementById("sigiriya");
  if (sigiriyaSection) {
    const sectionTop = sigiriyaSection.offsetTop;
    const sectionHeight = sigiriyaSection.offsetHeight;

    // Calculate scroll progress through the section (0 to 9 units)
    const scrollIntoSection = value - sectionTop;
    const unitHeight = window.innerHeight; // 1 unit = 100vh
    const scrollUnits = scrollIntoSection / unitHeight;

    // Only apply effects when in section view
    if (scrollUnits >= 0 && scrollUnits <= 9) {
      // Layer 4 appears at 2 units
      if (layer4) {
        if (scrollUnits >= 2) {
          layer4.classList.add("visible");
          layer4.style.transform = `translateY(${(scrollUnits - 2) * -50}px)`;
        } else {
          layer4.classList.remove("visible");
        }
      }

      // Sigiriya main appears at 4 units
      if (sigiriyaMain) {
        if (scrollUnits >= 4) {
          sigiriyaMain.classList.add("visible");
          sigiriyaMain.style.transform = `translateY(${
            (scrollUnits - 4) * -30
          }px)`;
        } else {
          sigiriyaMain.classList.remove("visible");
        }
      }

      // Layer 1 and 3 appear at 6 units (behind sigiriya)
      if (layer1) {
        if (scrollUnits >= 6) {
          layer1.classList.add("visible");
          layer1.style.transform = `translateY(${(scrollUnits - 6) * -20}px)`;
        } else {
          layer1.classList.remove("visible");
        }
      }

      if (layer3) {
        if (scrollUnits >= 6) {
          layer3.classList.add("visible");
          layer3.style.transform = `translateY(${(scrollUnits - 6) * -25}px)`;
        } else {
          layer3.classList.remove("visible");
        }
      }

      // Layer 2 appears at 7 units (front)
      if (layer2) {
        if (scrollUnits >= 7) {
          layer2.classList.add("visible");
          layer2.style.transform = `translateY(${(scrollUnits - 7) * -60}px)`;
        } else {
          layer2.classList.remove("visible");
        }
      }
    }
  }
});

// Show/hide scroll to top button
const topButton = document.getElementById("top");
window.addEventListener("scroll", function () {
  if (window.scrollY > 300) {
    topButton.style.display = "block";
  } else {
    topButton.style.display = "none";
  }
});

// Initially hide top button
if (topButton) {
  topButton.style.display = "none";
}

window.addEventListener("scroll", function () {
  const sections = document.querySelectorAll("section, .content");
  const navLinks = document.querySelectorAll("#header ul li a");

  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});
