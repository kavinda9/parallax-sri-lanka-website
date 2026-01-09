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

// Sigiriya bubble animation
const bubble = document.getElementById("bubble");
const bubbleCircle = document.querySelector(".bubble-circle");

// Track created images
let imagesCreated = false;
let imgSigiriya, imgLayer1, imgLayer2, imgLayer3, imgLayer4;

// Create images inside bubble
function createBubbleImages() {
  if (imagesCreated) return;

  // Create images with proper IDs and z-index order
  imgLayer2 = document.createElement("img");
  imgLayer2.src = "images/2.png";
  imgLayer2.id = "img-layer2";
  bubbleCircle.appendChild(imgLayer2);

  imgLayer3 = document.createElement("img");
  imgLayer3.src = "images/3.png";
  imgLayer3.id = "img-layer3";
  bubbleCircle.appendChild(imgLayer3);

  imgSigiriya = document.createElement("img");
  imgSigiriya.src = "images/sigiriya.png";
  imgSigiriya.id = "img-sigiriya";
  bubbleCircle.appendChild(imgSigiriya);

  imgLayer1 = document.createElement("img");
  imgLayer1.src = "images/1.png";
  imgLayer1.id = "img-layer1";
  bubbleCircle.appendChild(imgLayer1);

  imgLayer4 = document.createElement("img");
  imgLayer4.src = "images/4.png";
  imgLayer4.id = "img-layer4";
  bubbleCircle.appendChild(imgLayer4);

  imagesCreated = true;
}

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

    // Reset if scrolled above section
    if (scrollUnits < 0) {
      bubble.classList.remove("visible");
      if (imagesCreated) {
        imgSigiriya.classList.remove("visible");
        imgLayer1.classList.remove("visible");
        imgLayer2.classList.remove("visible");
        imgLayer3.classList.remove("visible");
        imgLayer4.classList.remove("visible");
      }
      bubble.style.transform = "translate(-50%, -50%)";
      return;
    }

    // Animation timeline (7 units)
    if (scrollUnits >= 0 && scrollUnits <= 7) {
      // Create images if not created
      if (!imagesCreated) {
        createBubbleImages();
      }

      // Unit 1: Circle appears
      if (scrollUnits >= 1) {
        bubble.classList.add("visible");
      } else {
        bubble.classList.remove("visible");
      }

      // Unit 2: Sigiriya appears
      if (scrollUnits >= 2) {
        imgSigiriya.classList.add("visible");
      } else {
        imgSigiriya.classList.remove("visible");
      }

      // Unit 3: Layer 1 appears
      if (scrollUnits >= 3) {
        imgLayer1.classList.add("visible");
      } else {
        imgLayer1.classList.remove("visible");
      }

      // Unit 4: Layer 2 appears (higher level)
      if (scrollUnits >= 4) {
        imgLayer2.classList.add("visible");
      } else {
        imgLayer2.classList.remove("visible");
      }

      // Unit 5: Layer 3 appears (higher level)
      if (scrollUnits >= 5) {
        imgLayer3.classList.add("visible");
      } else {
        imgLayer3.classList.remove("visible");
      }

      // Unit 6: Layer 4 appears (front)
      if (scrollUnits >= 6) {
        imgLayer4.classList.add("visible");
      } else {
        imgLayer4.classList.remove("visible");
      }

      // Unit 6-7: Bubble moves down
      if (scrollUnits >= 6) {
        const moveAmount = (scrollUnits - 6) * 150;
        bubble.style.transform = `translate(-50%, calc(-50% + ${moveAmount}px))`;
      } else {
        bubble.style.transform = "translate(-50%, -50%)";
      }
    }

    // Past section - keep everything visible and moved
    if (scrollUnits > 7) {
      const moveAmount = 150; // Final position
      bubble.style.transform = `translate(-50%, calc(-50% + ${moveAmount}px))`;
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

// Flying Butterfly
const butterfly = document.getElementById("butterfly");

window.addEventListener("scroll", function () {
  let value = window.scrollY;

  // Show butterfly when user starts scrolling
  if (value > 100) {
    butterfly.classList.add("visible");
  } else {
    butterfly.classList.remove("visible");
  }
});
