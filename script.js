/**
 * TRANZOVIA SOLUTIONS PRIVATE LIMITED - Interactive Landing Page Logic
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================================
  // 1. Sticky Navigation & Scroll Spy (Active Links)
  // ==========================================================================
  const header = document.querySelector('.header');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  const sections = document.querySelectorAll('section');

  const handleScroll = () => {
    // 1. Sticky Navbar styling
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // 2. Scroll Spy (Active Nav Highlight)
    let currentSectionId = '';
    const scrollPosition = window.scrollY + 200; // Offset for trigger point

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSectionId = sectionId;
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Trigger once on load to set initial state


  // ==========================================================================
  // 2. Mobile Menu Navigation Toggle
  // ==========================================================================
  const menuToggle = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  const toggleMenu = () => {
    menuToggle.classList.toggle('active');
    mobileNav.classList.toggle('active');
    
    // Prevent background scrolling when menu is open
    if (mobileNav.classList.contains('active')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  menuToggle.addEventListener('click', toggleMenu);

  // Close mobile menu when a link is clicked
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      mobileNav.classList.remove('active');
      document.body.style.overflow = '';
    });
  });


  // ==========================================================================
  // 3. Scroll Reveal Animations (Intersection Observer)
  // ==========================================================================
  const revealElements = document.querySelectorAll('.reveal');

  const revealOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Once animated, no need to observe again
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15, // Elements trigger when 15% visible
    rootMargin: '0px 0px -50px 0px' // Offset triggers slightly before viewport entry
  });

  revealElements.forEach(element => {
    revealOnScroll.observe(element);
  });


  // ==========================================================================
  // 4. Interactive Contact Form Handler (Simulated Backend Delivery)
  // ==========================================================================
  const contactForm = document.getElementById('contactForm');
  const formSubmitBtn = document.getElementById('formSubmitBtn');
  const btnSpinner = formSubmitBtn.querySelector('.spinner');
  const btnText = formSubmitBtn.querySelector('.btn-text');
  const successOverlay = document.getElementById('successOverlay');
  const closeSuccessBtn = document.getElementById('closeSuccessBtn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault(); // Prevent standard page refresh

      // Gather input data (optional validation here)
      const name = document.getElementById('formName').value.trim();
      const email = document.getElementById('formEmail').value.trim();
      const message = document.getElementById('formMessage').value.trim();

      if (!name || !email || !message) {
        alert('Please fill in all fields before sending your message.');
        return;
      }

      // Enter Loading State
      formSubmitBtn.disabled = true;
      btnSpinner.style.display = 'inline-block';
      btnText.textContent = 'Sending Message...';

      // Simulate a server-side delivery delay (1.8 seconds)
      setTimeout(() => {
        // Exit Loading State
        formSubmitBtn.disabled = false;
        btnSpinner.style.display = 'none';
        btnText.textContent = 'Send Message';

        // Trigger stunning Glassmorphism Success Modal
        successOverlay.classList.add('active');
        
        // Reset the input values
        contactForm.reset();
      }, 1800);
    });
  }

  // Close Success Dialog Flow
  if (closeSuccessBtn) {
    closeSuccessBtn.addEventListener('click', () => {
      successOverlay.classList.remove('active');
    });
  }

});
