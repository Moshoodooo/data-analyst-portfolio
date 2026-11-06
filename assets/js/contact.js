/* ==========================================================================
   DATA ANALYST PORTFOLIO - CONTACT FORM HANDLING & VALIDATION
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !message) {
        formFeedback.style.color = '#ef4444';
        formFeedback.textContent = 'Please fill in all required fields.';
        return;
      }

      // Basic email format check
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        formFeedback.style.color = '#ef4444';
        formFeedback.textContent = 'Please enter a valid email address.';
        return;
      }

      // Simulate successful submission (Ready for Formspree / EmailJS integration)
      formFeedback.style.color = '#10b981';
      formFeedback.textContent = 'Thank you! Your message has been sent successfully. I will get back to you shortly.';
      
      contactForm.reset();

      // Clear feedback message after 6 seconds
      setTimeout(() => {
        formFeedback.textContent = '';
      }, 6000);
    });
  }
});