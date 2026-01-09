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

  // Trapezium Gallery Parallax Effect and Merge Animation
  const trapeziumGallery = document.querySelector(".trapezium-gallery");
  if (trapeziumGallery) {
    const galleryTop = trapeziumGallery.offsetTop;
    const galleryHeight = trapeziumGallery.offsetHeight;
    const galleryBottom = galleryTop + galleryHeight;

    // Merge animation trigger point (when scrolling past gallery)
    // Increased to give users more time to view the gallery
    const mergePoint = galleryBottom + window.innerHeight * 0.8;

    // Add merge effect when scrolling past the gallery
    if (value >= mergePoint) {
      trapeziumGallery.classList.add("merging");
    } else {
      trapeziumGallery.classList.remove("merging");
    }

    // Only apply parallax when gallery is in viewport
    if (value >= galleryTop - window.innerHeight && value <= galleryBottom) {
      const trapFrames = document.querySelectorAll(".trap-frame");

      // Parallax config: [speed, direction (1 = up, -1 = down)]
      const parallaxConfig = [
        { speed: 0.3, direction: 1 }, // Frame 1: move up
        { speed: 0.4, direction: -1 }, // Frame 2: move down
        { speed: 0.5, direction: 1 }, // Frame 3: move up
        { speed: 0.6, direction: -1 }, // Frame 4: move down
        { speed: 0.4, direction: 1 }, // Frame 5: move up
        { speed: 0.5, direction: -1 }, // Frame 6: move down
        { speed: 0.3, direction: 1 }, // Frame 7: move up
        { speed: 0.4, direction: -1 }, // Frame 8: move down
      ];

      trapFrames.forEach((frame, index) => {
        const config = parallaxConfig[index];
        const scrollRelativeToGallery = value - galleryTop;
        const offset =
          scrollRelativeToGallery * config.speed * config.direction;

        frame.style.transform = `translateY(${offset}px)`;
      });
    } else {
      // Reset parallax when out of viewport
      const trapFrames = document.querySelectorAll(".trap-frame");
      trapFrames.forEach((frame) => {
        frame.style.transform = "translateY(0)";
      });
    }
  }

  // Sigiriya bubble animation
  const sigiriyaSection = document.getElementById("sigiriya");
  const sigiriyaTitle = document.querySelector(".sigiriya-title");
  const sigiriyaDescription = document.querySelector(".sigiriya-description");

  if (sigiriyaSection) {
    const sectionTop = sigiriyaSection.offsetTop;
    const unitHeight = window.innerHeight;
    const scrollUnits = (value - sectionTop) / unitHeight;

    // Reset if scrolled above section
    if (scrollUnits < 0) {
      bubble.classList.remove("visible");
      if (sigiriyaTitle) sigiriyaTitle.classList.remove("visible");
      if (sigiriyaDescription) sigiriyaDescription.classList.remove("visible");
      if (imagesCreated) {
        imgSigiriya.classList.remove("visible");
        imgLayer1.classList.remove("visible");
        imgLayer2.classList.remove("visible");
        imgLayer3.classList.remove("visible");
        imgLayer4.classList.remove("visible");
      }
      return;
    }

    // Animation timeline (3.5 units for faster scrolling)
    if (scrollUnits >= 0 && scrollUnits <= 3.5) {
      // Create images if not created
      if (!imagesCreated) {
        createBubbleImages();
      }

      // Unit 0.2: Title appears
      if (scrollUnits >= 0.2) {
        if (sigiriyaTitle) sigiriyaTitle.classList.add("visible");
      } else {
        if (sigiriyaTitle) sigiriyaTitle.classList.remove("visible");
      }

      // Unit 0.5: Circle appears
      if (scrollUnits >= 0.5) {
        bubble.classList.add("visible");
      } else {
        bubble.classList.remove("visible");
      }

      // Unit 0.7: Description appears
      if (scrollUnits >= 0.7) {
        if (sigiriyaDescription) sigiriyaDescription.classList.add("visible");
      } else {
        if (sigiriyaDescription)
          sigiriyaDescription.classList.remove("visible");
      }

      // Unit 1: Sigiriya appears
      if (scrollUnits >= 1) {
        imgSigiriya.classList.add("visible");
      } else {
        imgSigiriya.classList.remove("visible");
      }

      // Unit 1.5: Layer 1 appears
      if (scrollUnits >= 1.5) {
        imgLayer1.classList.add("visible");
      } else {
        imgLayer1.classList.remove("visible");
      }

      // Unit 2: Layer 2 appears (higher level)
      if (scrollUnits >= 2) {
        imgLayer2.classList.add("visible");
      } else {
        imgLayer2.classList.remove("visible");
      }

      // Unit 2.5: Layer 3 appears (higher level)
      if (scrollUnits >= 2.5) {
        imgLayer3.classList.add("visible");
      } else {
        imgLayer3.classList.remove("visible");
      }

      // Unit 3: Layer 4 appears (front)
      if (scrollUnits >= 3) {
        imgLayer4.classList.add("visible");
      } else {
        imgLayer4.classList.remove("visible");
      }
    }

    // Past section - keep everything visible
    if (scrollUnits > 3.5) {
      if (sigiriyaTitle) sigiriyaTitle.classList.add("visible");
      bubble.classList.add("visible");
      if (sigiriyaDescription) sigiriyaDescription.classList.add("visible");
      if (imagesCreated) {
        imgSigiriya.classList.add("visible");
        imgLayer1.classList.add("visible");
        imgLayer2.classList.add("visible");
        imgLayer3.classList.add("visible");
        imgLayer4.classList.add("visible");
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
