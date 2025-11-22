// Premium Presentation Script with Ultra-Smooth Transitions
let currentSlide = 1;
const totalSlides = document.querySelectorAll('.slide').length;
let isTransitioning = false;

// Initialize presentation
document.addEventListener('DOMContentLoaded', () => {
  updateUI();
  initializeNavigation();
  initializeKeyboardControls();
  initializeMouseWheelNavigation();
  initializeTouchGestures();

  // Trigger first slide animation
  setTimeout(() => {
    triggerSlideAnimation(1);
  }, 300);
});

// Navigate to specific slide
function goToSlide(slideNumber) {
  if (slideNumber < 1 || slideNumber > totalSlides || slideNumber === currentSlide || isTransitioning) {
    return;
  }

  isTransitioning = true;

  const currentSlideEl = document.querySelector('.slide.active');
  const nextSlideEl = document.getElementById(`slide-${slideNumber}`);

  if (currentSlideEl) {
    currentSlideEl.classList.remove('active');
    if (slideNumber < currentSlide) {
      currentSlideEl.classList.add('next');
      setTimeout(() => currentSlideEl.classList.remove('next'), 1200);
    } else {
      currentSlideEl.classList.add('prev');
      setTimeout(() => currentSlideEl.classList.remove('prev'), 1200);
    }
  }

  if (nextSlideEl) {
    nextSlideEl.classList.add('active');
    triggerSlideAnimation(slideNumber);
  }

  currentSlide = slideNumber;
  updateUI();

  // Reset transition lock after animation completes
  setTimeout(() => {
    isTransitioning = false;
  }, 1200);
}

// Update UI elements
function updateUI() {
  // Update progress bar
  const progressBar = document.querySelector('.progress-bar');
  if (progressBar) {
    const progress = (currentSlide / totalSlides) * 100;
    progressBar.style.width = `${progress}%`;
  }

  // Update slide counter
  const currentSlideEl = document.getElementById('current-slide');
  if (currentSlideEl) {
    currentSlideEl.textContent = currentSlide;
  }

  // Update navigation dots
  document.querySelectorAll('.nav-dot').forEach((dot, index) => {
    if (index + 1 === currentSlide) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

// Initialize navigation dots
function initializeNavigation() {
  document.querySelectorAll('.nav-dot').forEach((dot) => {
    dot.addEventListener('click', (e) => {
      const slideNumber = parseInt(e.target.dataset.slide);
      goToSlide(slideNumber);
    });

    // Add hover preview effect
    dot.addEventListener('mouseenter', (e) => {
      const slideNumber = parseInt(e.target.dataset.slide);
      if (slideNumber !== currentSlide) {
        e.target.style.transform = 'scale(1.3)';
        e.target.style.background = 'rgba(0, 212, 255, 0.5)';
      }
    });

    dot.addEventListener('mouseleave', (e) => {
      const slideNumber = parseInt(e.target.dataset.slide);
      if (slideNumber !== currentSlide) {
        e.target.style.transform = '';
        e.target.style.background = '';
      }
    });
  });
}

// Keyboard controls
function initializeKeyboardControls() {
  document.addEventListener('keydown', (e) => {
    switch (e.key) {
      case 'ArrowRight':
      case ' ':
      case 'PageDown':
        e.preventDefault();
        if (currentSlide < totalSlides) {
          goToSlide(currentSlide + 1);
        }
        break;
      case 'ArrowLeft':
      case 'PageUp':
        e.preventDefault();
        if (currentSlide > 1) {
          goToSlide(currentSlide - 1);
        }
        break;
      case 'Home':
        e.preventDefault();
        goToSlide(1);
        break;
      case 'End':
        e.preventDefault();
        goToSlide(totalSlides);
        break;
      case 'Escape':
        e.preventDefault();
        toggleFullscreen();
        break;
    }
  });
}

// Mouse wheel navigation
function initializeMouseWheelNavigation() {
  let wheelTimeout;

  document.addEventListener('wheel', (e) => {
    if (isTransitioning) return;

    clearTimeout(wheelTimeout);

    wheelTimeout = setTimeout(() => {
      if (e.deltaY > 0 && currentSlide < totalSlides) {
        goToSlide(currentSlide + 1);
      } else if (e.deltaY < 0 && currentSlide > 1) {
        goToSlide(currentSlide - 1);
      }
    }, 50);
  }, { passive: true });
}

// Touch gestures
function initializeTouchGestures() {
  let touchStartX = 0;
  let touchEndX = 0;

  document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0 && currentSlide < totalSlides) {
        // Swipe left - next slide
        goToSlide(currentSlide + 1);
      } else if (diff < 0 && currentSlide > 1) {
        // Swipe right - previous slide
        goToSlide(currentSlide - 1);
      }
    }
  }
}

// Trigger slide-specific animations
function triggerSlideAnimation(slideNumber) {
  const slide = document.getElementById(`slide-${slideNumber}`);
  if (!slide) return;

  // Reset all animations
  const animatedElements = slide.querySelectorAll('[style*="animation"]');
  animatedElements.forEach(el => {
    el.style.animation = 'none';
    setTimeout(() => {
      el.style.animation = '';
    }, 10);
  });

  // Slide-specific animations
  switch (slideNumber) {
    case 1:
      animateGlobe(slide);
      break;
    case 2:
      animateSplitPanels(slide);
      break;
    case 3:
      animateCloud(slide);
      break;
    case 4:
      animateSWOT(slide);
      break;
    case 5:
      animateFlowchart(slide);
      break;
    case 6:
      animatePaymentFlow(slide);
      break;
    case 7:
      animateLogo(slide);
      break;
  }
}

// Slide 1: Globe animation
function animateGlobe(slide) {
  const globe = slide.querySelector('.globe');
  if (globe) {
    globe.style.animation = 'none';
    setTimeout(() => {
      globe.style.animation = 'rotateGlobe 20s linear infinite';
    }, 100);
  }
}

// Slide 2: Split panels animation
function animateSplitPanels(slide) {
  const panels = slide.querySelectorAll('.split-panel');
  panels.forEach((panel, index) => {
    panel.style.animation = 'none';
    setTimeout(() => {
      panel.style.animation = `scaleIn 0.8s cubic-bezier(0.4, 0.0, 0.2, 1) ${0.3 + index * 0.2}s forwards`;
    }, 50);
  });
}

// Slide 3: Cloud animation
function animateCloud(slide) {
  const cloud = slide.querySelector('.cloud');
  const devices = slide.querySelectorAll('.device');

  if (cloud) {
    cloud.style.animation = 'none';
    setTimeout(() => {
      cloud.style.animation = 'floatCloud 6s ease-in-out infinite';
    }, 100);
  }

  devices.forEach((device, index) => {
    device.style.animation = 'none';
    setTimeout(() => {
      device.style.animation = `deviceFloat 3s ease-in-out ${index}s infinite`;
    }, 100);
  });
}

// Slide 4: SWOT animation
function animateSWOT(slide) {
  const quadrants = slide.querySelectorAll('.swot-quadrant');
  quadrants.forEach((quadrant, index) => {
    quadrant.style.animation = 'none';
    setTimeout(() => {
      quadrant.style.animation = `scaleIn 0.8s cubic-bezier(0.4, 0.0, 0.2, 1) ${0.2 + index * 0.2}s forwards`;
    }, 50);
  });
}

// Slide 5: Flowchart animation
function animateFlowchart(slide) {
  const steps = slide.querySelectorAll('.flow-step');
  steps.forEach((step, index) => {
    step.style.animation = 'none';
    setTimeout(() => {
      step.style.animation = `scaleIn 0.8s cubic-bezier(0.4, 0.0, 0.2, 1) ${0.2 + index * 0.15}s forwards`;
    }, 50);
  });
}

// Slide 6: Payment flow animation
function animatePaymentFlow(slide) {
  const icons = slide.querySelectorAll('.payment-icon, .shield');
  icons.forEach((icon, index) => {
    icon.style.animation = 'none';
    setTimeout(() => {
      if (icon.classList.contains('shield')) {
        icon.style.animation = 'pulse 2s ease-in-out infinite';
      } else {
        icon.style.animation = `bounce 2s ease-in-out ${index * 0.3}s infinite`;
      }
    }, 100);
  });
}

// Slide 7: Logo animation
function animateLogo(slide) {
  const logo = slide.querySelector('.logo');
  if (logo) {
    logo.style.animation = 'none';
    setTimeout(() => {
      logo.style.animation = 'gradient-flow 6s ease infinite';
    }, 100);
  }
}

// Fullscreen toggle
function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(err => {
      console.log(`Error attempting to enable fullscreen: ${err.message}`);
    });
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}

// Add fullscreen button
const fullscreenBtn = document.createElement('button');
fullscreenBtn.innerHTML = '⛶';
fullscreenBtn.style.cssText = `
  position: fixed;
  top: 20px;
  left: 20px;
  background: rgba(10, 14, 39, 0.8);
  border: 1px solid rgba(0, 212, 255, 0.2);
  color: #00d4ff;
  font-size: 1.5rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 100;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
`;

fullscreenBtn.addEventListener('click', toggleFullscreen);
fullscreenBtn.addEventListener('mouseenter', () => {
  fullscreenBtn.style.transform = 'scale(1.1)';
  fullscreenBtn.style.boxShadow = '0 0 20px rgba(0, 212, 255, 0.6)';
});
fullscreenBtn.addEventListener('mouseleave', () => {
  fullscreenBtn.style.transform = '';
  fullscreenBtn.style.boxShadow = '';
});

document.body.appendChild(fullscreenBtn);
