// EmailJS integration for RSVP code form
// This script should be included in index.html before AngularJS scripts
(function(){
  var script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js';
  script.onload = function() {
    emailjs.init('DcZcEitCmiDyioCnt');
  };
  document.head.appendChild(script);
})();
