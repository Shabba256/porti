document.addEventListener('DOMContentLoaded', () => {
  // Mobile navigation toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      // If nav is already displayed as a block element
      if (nav && window.getComputedStyle(nav).display === 'block') {
        // Create mobile nav overlay
        let mobileNav = document.querySelector('.nav-mobile');
        
        if (!mobileNav) {
          mobileNav = document.createElement('div');
          mobileNav.className = 'nav-mobile';
          
          // Clone the navigation
          const navClone = nav.cloneNode(true);
          mobileNav.appendChild(navClone);
          
          document.body.appendChild(mobileNav);
        }
        
        // Toggle mobile nav
        mobileNav.classList.toggle('active');
        
        // Toggle body scroll
        document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
      }
    });
  }
  
  // Close mobile nav when link is clicked
  document.addEventListener('click', (e) => {
    if (e.target.closest('.nav-link') && document.querySelector('.nav-mobile.active')) {
      document.querySelector('.nav-mobile').classList.remove('active');
      document.body.style.overflow = '';
    }
  });
  
  // Contact form submission
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Normally you would send this to a backend, but for a static site we'll just show a success message
      const formData = new FormData(contactForm);
      const formValues = {};
      
      formData.forEach((value, key) => {
        formValues[key] = value;
      });
      
      // Clear the form
      contactForm.reset();
      
      // Show success message
      const successMsg = document.createElement('div');
      successMsg.className = 'form-success';
      successMsg.innerHTML = `
        <p>Thank you ${formValues.name}! Your message has been sent successfully. I'll get back to you soon.</p>
      `;
      
      contactForm.style.display = 'none';
      contactForm.parentElement.appendChild(successMsg);
      
      // Remove success message after 5 seconds and show form again
      setTimeout(() => {
        successMsg.remove();
        contactForm.style.display = 'block';
      }, 5000);
    });
  }
  
  // Animate skill bars on scroll
  const skillBars = document.querySelectorAll('.skill-progress');
  
  const animateSkillBars = () => {
    skillBars.forEach(bar => {
      const targetWidth = bar.style.width;
      bar.style.width = '0';
      
      setTimeout(() => {
        bar.style.width = targetWidth;
      }, 100);
    });
  };
  
  // Check if IntersectionObserver is supported
  if ('IntersectionObserver' in window) {
    const skillsSection = document.querySelector('.skills-section');
    
    if (skillsSection) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateSkillBars();
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });
      
      observer.observe(skillsSection);
    }
  } else {
    // Fallback for browsers that don't support IntersectionObserver
    window.addEventListener('scroll', () => {
      const skillsSection = document.querySelector('.skills-section');
      
      if (skillsSection) {
        const rect = skillsSection.getBoundingClientRect();
        const isVisible = rect.top <= window.innerHeight && rect.bottom >= 0;
        
        if (isVisible) {
          animateSkillBars();
          window.removeEventListener('scroll', this);
        }
      }
    });
  }
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80, // Adjust for header height
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Active nav link based on scroll position
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  function setActiveNavLink() {
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionBottom = sectionTop + section.offsetHeight;
      const scrollPosition = window.scrollY;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          
          if (link.getAttribute('href') === `#${section.id}` || 
              (section.id === 'about' && link.getAttribute('href') === 'index.html#about') ||
              (section.id === 'skills' && link.getAttribute('href') === 'index.html#skills') ||
              (section.id === 'contact' && link.getAttribute('href') === 'index.html#contact')) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  
  window.addEventListener('scroll', setActiveNavLink);
  window.addEventListener('load', setActiveNavLink);
});