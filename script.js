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
const sigiriyaInfo = document.getElementById("sigiriya-info");

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

  // Sigiriya bubble shrink animation
  const sigiriyaSection = document.getElementById("sigiriya");
  if (sigiriyaSection) {
    const sectionTop = sigiriyaSection.offsetTop;
    const unitHeight = window.innerHeight;
    const scrollUnits = (value - sectionTop) / unitHeight;

    // Reset everything if scrolled above section
    if (scrollUnits < 0) {
      resetAllLayers();
      return;
    }

    // Reset everything if scrolled past section
    if (scrollUnits > 6) {
      return;
    }

    // Animation happens between 0-6 units
    if (scrollUnits >= 0 && scrollUnits <= 6) {
      // Unit 0-1: Sigiriya appears full screen
      if (scrollUnits >= 0 && scrollUnits < 2) {
        sigiriyaLayer.classList.add("active");
        sigiriyaLayer.classList.remove("shrinking", "in-bubble");
        sigiriyaLayer.style.transform = "";

        // Hide other layers
        layer1Anim.classList.remove("active", "shrinking", "in-bubble");
        layer2Anim.classList.remove("active", "shrinking", "in-bubble");
        layer3Anim.classList.remove("active", "shrinking", "in-bubble");
        layer4Anim.classList.remove("active", "shrinking", "in-bubble");
        bubble.classList.remove("visible");
      }

      // Unit 2: Sigiriya starts shrinking into bubble
      if (scrollUnits >= 2 && scrollUnits < 2.5) {
        sigiriyaLayer.classList.add("active", "shrinking");
        sigiriyaLayer.style.opacity = 1;
      }

      // Unit 2.5: Sigiriya locked in bubble
      if (scrollUnits >= 2.5) {
        bubble.classList.add("visible");
        if (!sigiriyaLayer.classList.contains("in-bubble")) {
          sigiriyaLayer.classList.remove("shrinking");
          sigiriyaLayer.classList.add("in-bubble");
          const bubbleFrame = document.querySelector(".bubble-frame");
          bubbleFrame.appendChild(sigiriyaLayer);
        }
      } else {
        // If scrolling back, remove from bubble
        if (sigiriyaLayer.classList.contains("in-bubble")) {
          sigiriyaLayer.classList.remove("in-bubble");
          originalParent.appendChild(sigiriyaLayer);
        }
      }

      // Unit 3: Layer 1 (trees) appears and shrinks
      if (scrollUnits >= 3 && scrollUnits < 3.5) {
        layer1Anim.classList.add("active", "shrinking");
      } else if (scrollUnits < 3) {
        layer1Anim.classList.remove("active", "shrinking", "in-bubble");
        if (layer1Anim.parentElement.classList.contains("bubble-frame")) {
          originalParent.appendChild(layer1Anim);
        }
      }

      if (scrollUnits >= 3.5) {
        if (!layer1Anim.classList.contains("in-bubble")) {
          layer1Anim.classList.remove("shrinking");
          layer1Anim.classList.add("in-bubble");
          const bubbleFrame = document.querySelector(".bubble-frame");
          bubbleFrame.appendChild(layer1Anim);
        }
      } else if (scrollUnits < 3.5) {
        if (layer1Anim.classList.contains("in-bubble")) {
          layer1Anim.classList.remove("in-bubble");
          originalParent.appendChild(layer1Anim);
        }
      }

      // Unit 3.5: Layer 3 (background) appears and shrinks
      if (scrollUnits >= 3.5 && scrollUnits < 4) {
        layer3Anim.classList.add("active", "shrinking");
      } else if (scrollUnits < 3.5) {
        layer3Anim.classList.remove("active", "shrinking", "in-bubble");
        if (layer3Anim.parentElement.classList.contains("bubble-frame")) {
          originalParent.appendChild(layer3Anim);
        }
      }

      if (scrollUnits >= 4) {
        if (!layer3Anim.classList.contains("in-bubble")) {
          layer3Anim.classList.remove("shrinking");
          layer3Anim.classList.add("in-bubble");
          const bubbleFrame = document.querySelector(".bubble-frame");
          bubbleFrame.appendChild(layer3Anim);
        }
      } else if (scrollUnits < 4) {
        if (layer3Anim.classList.contains("in-bubble")) {
          layer3Anim.classList.remove("in-bubble");
          originalParent.appendChild(layer3Anim);
        }
      }

      // Unit 4: Layer 2 (bushes) appears and shrinks
      if (scrollUnits >= 4 && scrollUnits < 4.5) {
        layer2Anim.classList.add("active", "shrinking");
      } else if (scrollUnits < 4) {
        layer2Anim.classList.remove("active", "shrinking", "in-bubble");
        if (layer2Anim.parentElement.classList.contains("bubble-frame")) {
          originalParent.appendChild(layer2Anim);
        }
      }

      if (scrollUnits >= 4.5) {
        if (!layer2Anim.classList.contains("in-bubble")) {
          layer2Anim.classList.remove("shrinking");
          layer2Anim.classList.add("in-bubble");
          const bubbleFrame = document.querySelector(".bubble-frame");
          bubbleFrame.appendChild(layer2Anim);
        }
      } else if (scrollUnits < 4.5) {
        if (layer2Anim.classList.contains("in-bubble")) {
          layer2Anim.classList.remove("in-bubble");
          originalParent.appendChild(layer2Anim);
        }
      }

      // Unit 4.5: Layer 4 (foreground) appears and shrinks
      if (scrollUnits >= 4.5 && scrollUnits < 5) {
        layer4Anim.classList.add("active", "shrinking");
      } else if (scrollUnits < 4.5) {
        layer4Anim.classList.remove("active", "shrinking", "in-bubble");
        if (layer4Anim.parentElement.classList.contains("bubble-frame")) {
          originalParent.appendChild(layer4Anim);
        }
      }

      if (scrollUnits >= 5) {
        if (!layer4Anim.classList.contains("in-bubble")) {
          layer4Anim.classList.remove("shrinking");
          layer4Anim.classList.add("in-bubble");
          const bubbleFrame = document.querySelector(".bubble-frame");
          bubbleFrame.appendChild(layer4Anim);
        }

        // Bubble moves down with all layers fixed
        const bubbleOffset = (scrollUnits - 5) * 100;
        bubble.style.transform = `translate(-50%, calc(-50% + ${bubbleOffset}px))`;

        // Show info when bubble is complete
        if (sigiriyaInfo) {
          sigiriyaInfo.style.opacity = "1";
          sigiriyaInfo.style.transform = "translateY(0)";
        }
      } else {
        // Reset bubble position
        bubble.style.transform = "translate(-50%, -50%)";

        // Hide info
        if (sigiriyaInfo) {
          sigiriyaInfo.style.opacity = "0";
          sigiriyaInfo.style.transform = "translateY(30px)";
        }

        if (layer4Anim.classList.contains("in-bubble")) {
          layer4Anim.classList.remove("in-bubble");
          originalParent.appendChild(layer4Anim);
        }
      }
    }
  }
});

// Function to reset all layers
function resetAllLayers() {
  // Hide bubble
  if (bubble) bubble.classList.remove("visible");

  // Reset all layers
  const layers = [
    sigiriyaLayer,
    layer1Anim,
    layer2Anim,
    layer3Anim,
    layer4Anim,
  ];
  layers.forEach((layer) => {
    if (layer) {
      layer.classList.remove("active", "shrinking", "in-bubble");
      layer.style.transform = "";
      // Move back to original parent if needed
      if (layer.parentElement.classList.contains("bubble-frame")) {
        originalParent.appendChild(layer);
      }
    }
  });

  // Reset info
  if (sigiriyaInfo) {
    sigiriyaInfo.style.opacity = "0";
    sigiriyaInfo.style.transform = "translateY(30px)";
  }

  // Reset bubble position
  if (bubble) {
    bubble.style.transform = "translate(-50%, -50%)";
  }
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

// Initially hide top button
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
