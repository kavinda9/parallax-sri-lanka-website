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

// Sigiriya bubble animation elements
const bubble = document.getElementById("bubble");
const sigiriyaLayer = document.getElementById("sigiriya-layer");
const layer1Anim = document.getElementById("layer1-anim");
const layer2Anim = document.getElementById("layer2-anim");
const layer3Anim = document.getElementById("layer3-anim");
const layer4Anim = document.getElementById("layer4-anim");

// Store original parent for reset
const originalParent = document.getElementById("sigiriya");

// Parallax scroll effect
window.addEventListener("scroll", function () {
  let value = window.scrollY;

  // Parallax effect for welcome image
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

  // Sigiriya bubble animation
  const sigiriyaSection = document.getElementById("sigiriya");
  if (sigiriyaSection) {
    const sectionTop = sigiriyaSection.offsetTop;
    const unitHeight = window.innerHeight;
    const scrollUnits = (value - sectionTop) / unitHeight;

    // Reset if outside section
    if (scrollUnits < 0 || scrollUnits > 5) {
      resetAllLayers();
      return;
    }

    // Show bubble when animation starts
    if (scrollUnits >= 0) {
      bubble.classList.add("visible");
    }

    // Unit 1: Sigiriya appears in bubble size
    if (scrollUnits >= 1 && scrollUnits < 1.5) {
      sigiriyaLayer.classList.add("appearing");
    } else if (scrollUnits < 1) {
      sigiriyaLayer.classList.remove("appearing", "in-bubble");
      if (sigiriyaLayer.parentElement.classList.contains("bubble-circle")) {
        originalParent.appendChild(sigiriyaLayer);
      }
    }

    // Unit 1.5: Lock sigiriya in bubble
    if (scrollUnits >= 1.5) {
      if (!sigiriyaLayer.classList.contains("in-bubble")) {
        sigiriyaLayer.classList.add("in-bubble");
        const bubbleCircle = document.querySelector(".bubble-circle");
        bubbleCircle.appendChild(sigiriyaLayer);
      }
    }

    // Unit 2: Layer 1 appears
    if (scrollUnits >= 2 && scrollUnits < 2.5) {
      layer1Anim.classList.add("appearing");
    } else if (scrollUnits < 2) {
      layer1Anim.classList.remove("appearing", "in-bubble");
      if (layer1Anim.parentElement.classList.contains("bubble-circle")) {
        originalParent.appendChild(layer1Anim);
      }
    }

    if (scrollUnits >= 2.5) {
      if (!layer1Anim.classList.contains("in-bubble")) {
        layer1Anim.classList.add("in-bubble");
        const bubbleCircle = document.querySelector(".bubble-circle");
        bubbleCircle.appendChild(layer1Anim);
      }
    }

    // Unit 2.5: Layer 3 appears
    if (scrollUnits >= 2.5 && scrollUnits < 3) {
      layer3Anim.classList.add("appearing");
    } else if (scrollUnits < 2.5) {
      layer3Anim.classList.remove("appearing", "in-bubble");
      if (layer3Anim.parentElement.classList.contains("bubble-circle")) {
        originalParent.appendChild(layer3Anim);
      }
    }

    if (scrollUnits >= 3) {
      if (!layer3Anim.classList.contains("in-bubble")) {
        layer3Anim.classList.add("in-bubble");
        const bubbleCircle = document.querySelector(".bubble-circle");
        bubbleCircle.appendChild(layer3Anim);
      }
    }

    // Unit 3: Layer 2 appears
    if (scrollUnits >= 3 && scrollUnits < 3.5) {
      layer2Anim.classList.add("appearing");
    } else if (scrollUnits < 3) {
      layer2Anim.classList.remove("appearing", "in-bubble");
      if (layer2Anim.parentElement.classList.contains("bubble-circle")) {
        originalParent.appendChild(layer2Anim);
      }
    }

    if (scrollUnits >= 3.5) {
      if (!layer2Anim.classList.contains("in-bubble")) {
        layer2Anim.classList.add("in-bubble");
        const bubbleCircle = document.querySelector(".bubble-circle");
        bubbleCircle.appendChild(layer2Anim);
      }
    }

    // Unit 3.5: Layer 4 appears
    if (scrollUnits >= 3.5 && scrollUnits < 4) {
      layer4Anim.classList.add("appearing");
    } else if (scrollUnits < 3.5) {
      layer4Anim.classList.remove("appearing", "in-bubble");
      if (layer4Anim.parentElement.classList.contains("bubble-circle")) {
        originalParent.appendChild(layer4Anim);
      }
    }

    if (scrollUnits >= 4) {
      if (!layer4Anim.classList.contains("in-bubble")) {
        layer4Anim.classList.add("in-bubble");
        const bubbleCircle = document.querySelector(".bubble-circle");
        bubbleCircle.appendChild(layer4Anim);
      }

      // Unit 4-5: Bubble moves down
      const bubbleOffset = (scrollUnits - 4) * 100;
      bubble.style.transform = `translate(-50%, calc(-50% + ${bubbleOffset}px))`;
    } else {
      bubble.style.transform = "translate(-50%, -50%)";
    }
  }
});

// Function to reset all layers
function resetAllLayers() {
  if (bubble) {
    bubble.classList.remove("visible");
    bubble.style.transform = "translate(-50%, -50%)";
  }

  const layers = [
    sigiriyaLayer,
    layer1Anim,
    layer2Anim,
    layer3Anim,
    layer4Anim,
  ];
  layers.forEach((layer) => {
    if (layer) {
      layer.classList.remove("appearing", "in-bubble");
      if (
        layer.parentElement &&
        layer.parentElement.classList.contains("bubble-circle")
      ) {
        originalParent.appendChild(layer);
      }
    }
  });
}

// Show/hide scroll to top button
const topButton = document.getElementById("top");
window.addEventListener("scroll", function () {
  if (window.scrollY > 300) {
    topButton.style.display = "block";
  } else {
    topButton.style.display = "none";
  }
});

if (topButton) {
  topButton.style.display = "none";
}

// Active navigation on scroll
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
