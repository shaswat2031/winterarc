// script.js

document.addEventListener("DOMContentLoaded", () => {
  const habitButtons = document.querySelectorAll(".complete-btn");
  const resetButton = document.getElementById("reset-btn");
  const progressCircle = document.querySelector(".progress");
  const progressPercent = document.getElementById("progress-percent");

  const totalHabits = habitButtons.length;

  // Load habit completion states from localStorage
  habitButtons.forEach(button => {
    const habit = button.parentElement.dataset.habit;
    if (localStorage.getItem(habit) === "completed") {
      button.classList.add("completed");
    }
  });

  // Function to update progress based on completed habits
  function updateProgress() {
    const completedCount = document.querySelectorAll(".complete-btn.completed").length;
    const completionPercentage = Math.round((completedCount / totalHabits) * 100);
    
    // Update progress circle
    const dashOffset = 314 - (314 * completionPercentage) / 100;
    progressCircle.style.strokeDashoffset = dashOffset;

    // Update progress text
    progressPercent.textContent = `${completionPercentage}%`;
  }

  // Initial progress update
  updateProgress();

  // Toggle habit completion
  habitButtons.forEach(button => {
    button.addEventListener("click", () => {
      const habit = button.parentElement.dataset.habit;
      if (button.classList.contains("completed")) {
        button.classList.remove("completed");
        localStorage.removeItem(habit);
      } else {
        button.classList.add("completed");
        localStorage.setItem(habit, "completed");
      }
      updateProgress();
    });
  });

  // Reset all habits for a new day
  resetButton.addEventListener("click", () => {
    habitButtons.forEach(button => button.classList.remove("completed"));
    localStorage.clear();
    updateProgress();
  });
});
