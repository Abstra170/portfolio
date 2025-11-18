// // Initialize EmailJS (only once)
// (function(){
//   emailjs.init("-ZPWx8uDavlrul3fe"); // Replace with your EmailJS User ID
// })();

// // Handle form submission
// const form = document.getElementById("contact-form");
// const status = document.getElementById("form-status");

// form.addEventListener("submit", function(event) {
//   event.preventDefault(); // Prevent default form submission

//   const templateParams = {
//     user_name: document.getElementById("name").value,
//     user_email: document.getElementById("email").value,
//     user_message: document.getElementById("message").value
//   };

//   emailjs.send("service_22t29zc", "template_ch2dguj", templateParams)
//     .then(function(response) {
//       console.log("SUCCESS!", response.status, response.text);
//       status.textContent = "Message sent successfully!";
//       form.reset(); // Clear form fields
//     }, function(error) {
//       console.log("FAILED...", error);
//       status.textContent = "Failed to send message. Try again later.";
//     });
// });
