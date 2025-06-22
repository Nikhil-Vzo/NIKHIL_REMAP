
// ================= Smooth Scroll with Lenis ====================
const lenis = new Lenis({
  duration: 1.3,
  smooth: true,
  direction: 'vertical',
  gestureDirection: 'vertical',
  smoothTouch: true,
  touchMultiplier: 2,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);






//=============================================================================================================================

var navLinks = document.getElementById("navLinks");
var openMenuIcon = document.getElementById("openMenu");
var closeMenuIcon = document.getElementById("closeMenu");

function showMenu() {
  navLinks.style.top = "0";
  openMenuIcon.style.display = "none";
  closeMenuIcon.style.display = "block";
}

function hideMenu() {
  navLinks.style.top = "-500%";
  openMenuIcon.style.display = "block";
  closeMenuIcon.style.display = "none";
}




document.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementById("bg-video");

  if (window.innerWidth < 768) {
    // Replace source for smaller screens
    const source = video.querySelector("source");
    source.src = "./compressed.mp4";

    // Reload video to apply the new source
    video.load();
  }
});










// =================================card-firefly-stretch-==============================



if (window.innerWidth > 768) {
  const horizontalSection = document.querySelector('.horizontal-section');

  // Create firefly container and add to section
  const fireflyGlobalContainer = document.createElement('div');
  fireflyGlobalContainer.className = 'firefly-global-container';
  horizontalSection.style.position = 'relative'; // ensure relative for absolute fireflies
  horizontalSection.appendChild(fireflyGlobalContainer);

  const fireflyCount = 80;
  const containerWidth = horizontalSection.clientWidth;
  const containerHeight = horizontalSection.clientHeight;

  for (let i = 0; i < fireflyCount; i++) {
    const dot = document.createElement('div');
    dot.className = 'firefly';

    dot.style.left = `${Math.random() * containerWidth}px`;
    dot.style.top = `${Math.random() * containerHeight}px`;

    dot.style.animationDuration = `${2 + Math.random() * 2}s`;
    dot.style.animationDelay = `${Math.random() * 4}s`;

    const anims = ['fly1', 'fly2', 'fly3'];
    dot.style.animationName = anims[Math.floor(Math.random() * anims.length)];

    fireflyGlobalContainer.appendChild(dot);
  }

  // Fireflies container initially hidden (CSS opacity:0)
  // On hover, CSS makes it visible (opacity:1)
}










//===========================cursor movement on cards-===========================================

if (window.innerWidth > 768) {  // disable on small screens
  document.querySelectorAll('.horizontal-section > div').forEach(card => {
    const img = card.querySelector('img');

    card.addEventListener('mousemove', e => {
      const rect = img.getBoundingClientRect();
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      const threshold = 15; // 15px proximity

      // Check if cursor is inside or near image bounds
      const nearX = mouseX >= rect.left - threshold && mouseX <= rect.right + threshold;
      const nearY = mouseY >= rect.top - threshold && mouseY <= rect.bottom + threshold;

      if (nearX && nearY) {
        // Calculate rotation relative to image center
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = mouseX - centerX;
        const deltaY = mouseY - centerY;

        const percentX = deltaX / (rect.width / 2);
        const percentY = deltaY / (rect.height / 2);

        const maxRotate = 15;

        const rotateX = percentY * maxRotate * -1;
        const rotateY = percentX * maxRotate;

        img.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.07)`;
        img.style.transition = 'transform 0.1s ease';
      } else {
        // Reset when cursor leaves proximity
        img.style.transform = 'scale(1) rotateX(0deg) rotateY(0deg)';
        img.style.transition = 'transform 0.4s ease';
      }
    });

    card.addEventListener('mouseleave', () => {
      img.style.transform = 'scale(1) rotateX(0deg) rotateY(0deg)';
      img.style.transition = 'transform 0.4s ease';
    });
  });
}



//=============================================swipe-card horizonatl========================================














// ====================FAQS EFFECT===============================


  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const answer = btn.nextElementSibling;

      // Toggle clicked
      btn.classList.toggle('active');
      answer.classList.toggle('show');

      // Optional: close others
      document.querySelectorAll('.faq-answer').forEach(other => {
        if (other !== answer) {
          other.classList.remove('show');
          other.previousElementSibling.classList.remove('active');
        }
      });
    });
  });


//===================testimonial=========================================


  const slider = document.getElementById("testimonialSlider");
  const cards = slider.children;
  let currentIndex = 0;
  const cardCount = cards.length;

  const firstClone = cards[0].cloneNode(true);
  slider.appendChild(firstClone);

  function slideNext() {
    currentIndex++;
    slider.style.transition = "transform 0.6s ease-in-out";
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;

    if (currentIndex === cardCount) {
      setTimeout(() => {
        slider.style.transition = "none";
        slider.style.transform = "translateX(0)";
        currentIndex = 0;
      }, 600);
    }
  }

  setInterval(slideNext, 2100);



//=============================================section=========================


const topSelect = document.getElementById('topSelect');
const bottomSelect = document.getElementById('bottomSelect');
const shoeSelect = document.getElementById('shoeSelect');

const topImg = document.getElementById('topImg');
const bottomImg = document.getElementById('bottomImg');
const shoeImg = document.getElementById('shoeImg');

const styleTag = document.getElementById('styleTag');
const shopBtn = document.getElementById('shopBtn');

// Mobile swipe variables
let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;
const swipeThreshold = 50; // minimum swipe distance
const verticalThreshold = 10; // maximum vertical movement to still count as swipe
let activeSelect = null;

function updateImage(selectEl, imgEl) {
  const src = selectEl.value;
  imgEl.classList.remove('active');
  setTimeout(() => {
    imgEl.src = src;
    imgEl.classList.add('active');
  }, 100);
}

function updateStyleTag() {
  const vibes = ['Chillwave', 'Bold Rebel', 'Clean Slate', 'Neo Tokyo', 'Urban Flash'];
  styleTag.textContent = vibes[Math.floor(Math.random() * vibes.length)];
}

function refreshLook() {
  updateImage(topSelect, topImg);
  updateImage(bottomSelect, bottomImg);
  updateImage(shoeSelect, shoeImg);
  updateStyleTag();
}

// Mobile swipe functions
function handleTouchStart(e) {
  if (window.innerWidth > 768) return;
  
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
  
  // Determine which item is being touched
  const touchY = e.touches[0].clientY;
  const imgRect = topImg.getBoundingClientRect();
  
  if (touchY < imgRect.bottom) {
    activeSelect = topSelect;
  } else if (touchY < imgRect.bottom + imgRect.height) {
    activeSelect = bottomSelect;
  } else {
    activeSelect = shoeSelect;
  }
}

function handleTouchMove(e) {
  if (window.innerWidth > 768 || !activeSelect) return;
  
  touchEndX = e.touches[0].clientX;
  touchEndY = e.touches[0].clientY;
  
  // Check if movement is primarily horizontal
  const deltaX = Math.abs(touchEndX - touchStartX);
  const deltaY = Math.abs(touchEndY - touchStartY);
  
  if (deltaX > deltaY && deltaY < verticalThreshold) {
    e.preventDefault(); // Prevent scrolling only for horizontal swipes
  }
}

function handleTouchEnd(e) {
  if (window.innerWidth > 768 || !activeSelect) return;
  
  touchEndX = e.changedTouches[0].clientX;
  touchEndY = e.changedTouches[0].clientY;
  
  const deltaX = touchEndX - touchStartX;
  const deltaY = Math.abs(touchEndY - touchStartY);
  
  // Only process as swipe if movement was primarily horizontal
  if (Math.abs(deltaX) > swipeThreshold && deltaY < verticalThreshold) {
    const options = activeSelect.options;
    const currentIndex = activeSelect.selectedIndex;
    
    if (deltaX < 0) {
      // Swipe left - next option
      activeSelect.selectedIndex = (currentIndex + 1) % options.length;
    } else {
      // Swipe right - previous option
      activeSelect.selectedIndex = (currentIndex - 1 + options.length) % options.length;
    }
    
    // Trigger change event
    const event = new Event('change');
    activeSelect.dispatchEvent(event);
  }
  
  activeSelect = null;
}

// Initialize
function initZFitEngine() {
  // Add touch events for mobile
  if (window.innerWidth <= 768) {
    const zfitContainer = document.querySelector('.zfit-container');
    zfitContainer.addEventListener('touchstart', handleTouchStart, { passive: true });
    zfitContainer.addEventListener('touchmove', handleTouchMove, { passive: false });
    zfitContainer.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    // Make images more interactive
    [topImg, bottomImg, shoeImg].forEach(img => {
      img.style.cursor = 'pointer';
      img.style.touchAction = 'pan-y';
    });
  }

  // Event listeners for dropdowns
  topSelect.addEventListener('change', () => updateImage(topSelect, topImg));
  bottomSelect.addEventListener('change', () => updateImage(bottomSelect, bottomImg));
  shoeSelect.addEventListener('change', () => updateImage(shoeSelect, shoeImg));
  
  shopBtn.addEventListener('click', () => {
    alert('OUT OF STOCK..THIS LOOK HAS BE STOLEN!...');
  });

  // Initial load
  window.addEventListener('load', () => {
    setTimeout(() => {
      [topImg, bottomImg, shoeImg].forEach(img => img.classList.add('active'));
      updateStyleTag();
    }, 300);
  });
}

initZFitEngine();


//========================bottom of js==========================================
  

gsap.registerPlugin(ScrollTrigger);

// Animate every section on scroll
document.querySelectorAll("section").forEach((section) => {
  gsap.from(section, {
    scrollTrigger: {
      trigger: section,
      start: "top 95%", // animate in when section enters
      toggleActions: "play none none none"
    },
    opacity: 0,
    y: 100,
    duration: 1,
    ease: "power3.out"
  });
});


// Animate h1, h2, p elements inside each section
gsap.utils.toArray("section").forEach((section) => {
  gsap.from(section.querySelectorAll("h1, h2, p, button"), {
    scrollTrigger: {
      trigger: section,
      start: "top 80%",
      toggleActions: "play none none none",
    },
    y: 60,
    opacity: 0,
    stagger: 0.2,
    duration: 1.1,
    ease: "expo.out",
  });
});

gsap.from(".card1", {
  scrollTrigger: {
    trigger: ".card1",
    start: "top 90%",
  },
  opacity: 0,
  y: 80,
  duration: 1.3,
  ease: "expo.out"
});

gsap.from(".card2", {
  scrollTrigger: {
    trigger: ".card2",
    start: "top 90%",
  },
  opacity: 0,
  y: 80,
  duration: 1.3,
  delay: 0.2,
  ease: "expo.out"
});

gsap.from(".card3", {
  scrollTrigger: {
    trigger: ".card3",
    start: "top 90%",
  },
  opacity: 0,
  y: 80,
  duration: 1.3,
  delay: 0.4,
  ease: "expo.out"
});

gsap.utils.toArray(".card1 img, .card2 img, .card3 img").forEach((img) => {
  gsap.from(img, {
    scrollTrigger: {
      trigger: img,
      start: "top 95%",
      scrub: true
    },
    scale: 1.2,
    opacity: 0.6,
    ease: "power2.out"
  });
});
