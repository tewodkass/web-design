document.addEventListener("DOMContentLoaded", function() {
  const App = {
    initNavbarToggle() {
      const menuIcon = document.getElementById('menu-icon');
      const navbar = document.getElementById('navbar');

      if (!menuIcon || !navbar) return;

      menuIcon.addEventListener('click', () => {
        navbar.classList.toggle('active');
      });
    },

    initContactForm() {
      const form = document.getElementById('contactForm');
      if (!form) return;

      form.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name')?.value.trim() || "";
        const email = document.getElementById('email')?.value.trim() || "";
        const message = document.getElementById('message')?.value.trim() || "";

        const namePattern = /^[A-Za-z\s]+$/;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!namePattern.test(name)) {
          Swal.fire({
            icon: 'error',
            title: 'Invalid Name',
            text: 'Please enter a valid name (letters and spaces only).',
          });
          return;
        }

        if (!emailPattern.test(email)) {
          Swal.fire({
            icon: 'error',
            title: 'Invalid Email',
            text: 'Please enter a valid email address.',
          });
          return;
        }

        if (message.length < 2) {
          Swal.fire({
            icon: 'warning',
            title: 'Empty Message',
            text: 'Please enter your message.',
          });
          return;
        }

        Swal.fire({
          icon: 'success',
          title: `Thank you, ${name}!`,
          text: 'Your message has been sent successfully.',
        });

        form.reset();
      });
    },

    initAccordion() {
      const accordionHeaders = document.querySelectorAll('.accordion-header');
      accordionHeaders.forEach(header => {
        const content = document.getElementById(header.dataset.contentId);
        if (!content) return;
        header.addEventListener('click', () => {
          if (content.style.maxHeight) {
            content.style.maxHeight = null;
          } else {
            document.querySelectorAll('.accordion-content').forEach(c => (c.style.maxHeight = null));
            content.style.maxHeight = `${content.scrollHeight}px`;
          }
        });
      });
    },

    toggleInfo(box) {
      if (box) box.classList.toggle('active');
    },
  };

  try {
    App.initNavbarToggle();
    App.initContactForm();
    App.initAccordion();
    window.App = { toggleInfo: App.toggleInfo };
  } catch (error) {
    console.error('Error initializing app:', error);
  }
});
