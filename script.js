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

// Get mountain/ocean section elements
const text = document.getElementById("text");
const cloud = document.getElementById("cloud");
const bird1 = document.getElementById("bird1");
const bird2 = document.getElementById("bird2");
const explore = document.getElementById("explore");
const rocks = document.getElementById("rocks");
const forest = document.getElementById("forest");
const sky = document.getElementById("sky");
const mountains = document.getElementById("mountains");
const sun = document.getElementById("sun");
const splash = document.getElementById("splash");
const water = document.getElementById("water");

// Get fish elements
const fish1 = document.getElementById("fish1");
const fish2 = document.getElementById("fish2");
const fish3 = document.getElementById("fish3");
const fish4 = document.getElementById("fish4");

// Get bubbles container
const bubblesContainer = document.getElementsByClassName("bubbles")[0];

// Padding values for desktop
var fish2move = 100;
var fish3move = 900;
var fish4move = 1200;

if (screen.width < 400) {
  // Change transformation duration and translatey for mobile view
  if (bubblesContainer) {
    bubblesContainer.style.setProperty("--transform-duration", "15s");
    bubblesContainer.style.setProperty("--transform-y", "-700vh");
  }

  // Padding values for mobile
  fish2move = 1680;
  fish3move = 3000;
  fish4move = 4300;
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

  // Mountain/Ocean Section Parallax Effects
  const mountainSection = document.querySelector(".mountain-ocean-section");
  if (mountainSection) {
    const mountainTop = mountainSection.offsetTop;
    const relativeScroll = value - mountainTop;

    // Hide sigiriya section when mountain section is visible
    const sigiriyaSection = document.getElementById("sigiriya");
    if (sigiriyaSection) {
      if (value >= mountainTop - window.innerHeight * 0.5) {
        sigiriyaSection.style.opacity = "0";
        sigiriyaSection.style.pointerEvents = "none";
      } else {
        sigiriyaSection.style.opacity = "1";
        sigiriyaSection.style.pointerEvents = "auto";
      }
    }

    // Only apply parallax when in the mountain section viewport
    if (
      value >= mountainTop - window.innerHeight &&
      value <= mountainTop + window.innerHeight
    ) {
      if (text) {
        text.style.top = 50 + relativeScroll * -0.2 + "%";
      }

      if (cloud) {
        cloud.style.left = relativeScroll * 2 + "px";
      }

      if (bird1) {
        bird1.style.top = relativeScroll * 0.1 + "px";
        bird1.style.left = relativeScroll * 1 + "px";
      }

      if (bird2) {
        bird2.style.top = relativeScroll * -0.1 + "px";
        bird2.style.left = relativeScroll * -2 + "px";
      }

      if (explore) {
        explore.style.marginTop = relativeScroll * 1.5 + "px";
      }

      if (rocks) {
        rocks.style.top = relativeScroll * -0.14 + "px";
      }

      if (forest) {
        forest.style.top = relativeScroll * 0.4 + "px";
      }

      if (sky) {
        sky.style.top = relativeScroll * 0.25 + "px";
      }

      if (mountains) {
        mountains.style.top = relativeScroll * 0.25 + "px";
      }

      if (sun) {
        sun.style.top = relativeScroll * 1 + "px";
      }

      // To prevent splash to move above sea water
      if (splash && relativeScroll < 380) {
        splash.style.top = 20 + relativeScroll * -0.3 + "px";
      }
    }
  }

  // Ocean content - Fish parallax movement
  const oceanContent = document.querySelector(".ocean-content");
  if (oceanContent) {
    const oceanTop = oceanContent.offsetTop;
    const relativeOceanScroll = value - oceanTop;

    // Move fishes horizontally
    if (fish1) {
      fish1.style.right = (relativeOceanScroll - 100) * 1 + "px";
    }
    if (fish2) {
      fish2.style.left = (relativeOceanScroll - fish2move) * 1 + "px";
    }
    if (fish3) {
      fish3.style.right = (relativeOceanScroll - fish3move) * 1 + "px";
    }
    if (fish4) {
      fish4.style.left = (relativeOceanScroll - fish4move) * 1 + "px";
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
  const sections = document.querySelectorAll(
    "section, .content, .ocean-content",
  );
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
