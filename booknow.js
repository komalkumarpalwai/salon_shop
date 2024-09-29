document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('bookNowForm');
  const warningMessage = document.getElementById('warningMessage');
  const thankYouMessage = document.getElementById('thankYouMessage');
  const bookingNumber = document.getElementById('bookingNumber');

  form.addEventListener('submit', function(event) {
    event.preventDefault();
    if (validateForm()) {
      thankYouMessage.classList.remove('hidden');
      bookingNumber.textContent = generateBookingNumber();
      warningMessage.classList.add('hidden');
    } else {
      warningMessage.classList.remove('hidden');
      thankYouMessage.classList.add('hidden');
    }
  });

  // Function to generate a random booking number
  function generateBookingNumber() {
    return Math.floor(100000 + Math.random() * 900000); // Generates a random 6-digit number
  }

  // Function to validate form fields
  function validateForm() {
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const place = document.getElementById('place').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;

    return name !== '' && phone !== '' && email !== '' && place !== '' && date !== '' && time !== '';
  }
});