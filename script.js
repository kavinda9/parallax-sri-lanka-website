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

// Track which layers are already in bubble
let layersInBubble = {
  sigiriya: false,
  layer1: false,
  layer2: false,
  layer3: false,
  layer4: false,
};

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

    // Animation happens between 0-6 units
    if (scrollUnits >= 0 && scrollUnits <= 6) {
      // Unit 0-1: Sigiriya appears full screen
      if (scrollUnits >= 0 && scrollUnits < 2) {
        sigiriyaLayer.classList.add("active");
        sigiriyaLayer.classList.remove("shrinking", "in-bubble");
        layersInBubble.sigiriya = false;
      }

      // Unit 2: Sigiriya starts shrinking into bubble
      if (scrollUnits >= 2 && scrollUnits < 2.5) {
        const progress = (scrollUnits - 2) * 2; // 0 to 1
        sigiriyaLayer.classList.add("shrinking");
        sigiriyaLayer.style.opacity = 1;
      }

      // Unit 2.5: Sigiriya locked in bubble
      if (scrollUnits >= 2.5 && !layersInBubble.sigiriya) {
        bubble.classList.add("visible");
        sigiriyaLayer.classList.remove("shrinking");
        sigiriyaLayer.classList.add("in-bubble");

        // Move to bubble frame
        const bubbleFrame = document.querySelector(".bubble-frame");
        bubbleFrame.appendChild(sigiriyaLayer);
        layersInBubble.sigiriya = true;
      }

      // Unit 3: Layer 1 (trees) appears and shrinks
      if (scrollUnits >= 3 && scrollUnits < 3.5) {
        layer1Anim.classList.add("active", "shrinking");
      }
      if (scrollUnits >= 3.5 && !layersInBubble.layer1) {
        layer1Anim.classList.remove("shrinking");
        layer1Anim.classList.add("in-bubble");
        const bubbleFrame = document.querySelector(".bubble-frame");
        bubbleFrame.appendChild(layer1Anim);
        layersInBubble.layer1 = true;
      }

      // Unit 3.5: Layer 3 (background) appears and shrinks
      if (scrollUnits >= 3.5 && scrollUnits < 4) {
        layer3Anim.classList.add("active", "shrinking");
      }
      if (scrollUnits >= 4 && !layersInBubble.layer3) {
        layer3Anim.classList.remove("shrinking");
        layer3Anim.classList.add("in-bubble");
        const bubbleFrame = document.querySelector(".bubble-frame");
        bubbleFrame.appendChild(layer3Anim);
        layersInBubble.layer3 = true;
      }

      // Unit 4: Layer 2 (bushes) appears and shrinks
      if (scrollUnits >= 4 && scrollUnits < 4.5) {
        layer2Anim.classList.add("active", "shrinking");
      }
      if (scrollUnits >= 4.5 && !layersInBubble.layer2) {
        layer2Anim.classList.remove("shrinking");
        layer2Anim.classList.add("in-bubble");
        const bubbleFrame = document.querySelector(".bubble-frame");
        bubbleFrame.appendChild(layer2Anim);
        layersInBubble.layer2 = true;
      }

      // Unit 4.5: Layer 4 (foreground) appears and shrinks
      if (scrollUnits >= 4.5 && scrollUnits < 5) {
        layer4Anim.classList.add("active", "shrinking");
      }
      if (scrollUnits >= 5 && !layersInBubble.layer4) {
        layer4Anim.classList.remove("shrinking");
        layer4Anim.classList.add("in-bubble");
        const bubbleFrame = document.querySelector(".bubble-frame");
        bubbleFrame.appendChild(layer4Anim);
        layersInBubble.layer4 = true;
      }

      // Unit 5-6: Bubble moves down with all layers fixed
      if (scrollUnits >= 5) {
        const bubbleOffset = (scrollUnits - 5) * 100;
        bubble.style.transform = `translate(-50%, calc(-50% + ${bubbleOffset}px))`;
      }

      // Show info when bubble is complete
      if (scrollUnits >= 5 && sigiriyaInfo) {
        sigiriyaInfo.style.opacity = "1";
        sigiriyaInfo.style.transform = "translateY(0)";
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
