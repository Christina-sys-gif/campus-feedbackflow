// Get DOM elements
const form = document.getElementById('feedbackForm');
const progress = document.getElementById('progress');
const ratingInput = document.getElementById('rating');
const ratingValue = document.getElementById('ratingValue');
const thankYouMessage = document.getElementById('thankYouMessage');

// Update rating display
ratingInput.addEventListener('input', function () {
  ratingValue.textContent = this.value;
});

// Auto-save to browser storage (simulates real auto-save)
const autoSaveFields = document.querySelectorAll('input, textarea');
autoSaveFields.forEach(field => {
  field.addEventListener('input', function () {
    localStorage.setItem(field.name || field.id, field.value);
  });
});

// Restore saved data on page load
autoSaveFields.forEach(field => {
  const savedValue = localStorage.getItem(field.name || field.id);
  if (savedValue) {
    field.value = savedValue;
  }
});

// Update progress bar based on form completion
function updateProgress() {
  const totalSteps = document.querySelectorAll('.form-step').length;
  const filledSteps = Array.from(document.querySelectorAll('.form-step')).filter(step => {
    const input = step.querySelector('input') || step.querySelector('textarea');
    return input && input.value.trim() !== '';
  }).length;

  const progressPercent = (filledSteps / totalSteps) * 100;
  progress.style.width = progressPercent + '%';
}

// Listen for any input to update progress
autoSaveFields.forEach(field => {
  field.addEventListener('input', updateProgress);
});

// On form submit
form.addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent real submit (for now)
  
  // Show thank you message
  thankYouMessage.style.display = 'block';
  
  // Reset form and clear saved data
  setTimeout(() => {
    form.reset();
    localStorage.clear();
    thankYouMessage.style.display = 'none';
    progress.style.width = '0%';
    ratingValue.textContent = '3'; // reset slider display
  }, 3000);

  alert("Feedback submitted! In a real system, this would be sent to the server.");
});