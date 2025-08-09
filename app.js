// Age Calculator Logic
const birthDaySelect = document.getElementById("birthDay");
const birthMonthSelect = document.getElementById("birthMonth");
const birthYearInput = document.getElementById("birthYear");
const calculateBtn = document.getElementById("calculateBtn");
const themeToggleBtn = document.getElementById("theme-toggle");
const body = document.body;
const sunIcon = document.getElementById("sun-icon");
const moonIcon = document.getElementById("moon-icon");

// Function to set the theme
function setTheme(theme) {
  if (theme === "dark") {
    body.classList.remove("theme-light");
    body.classList.add("theme-dark");
    sunIcon.classList.add("hidden");
    moonIcon.classList.remove("hidden");
    localStorage.setItem("theme", "dark");
  } else {
    body.classList.remove("theme-dark");
    body.classList.add("theme-light");
    moonIcon.classList.add("hidden");
    sunIcon.classList.remove("hidden");
    localStorage.setItem("theme", "light");
  }
}

// Initialize theme on page load
const savedTheme = localStorage.getItem("theme") || "dark";
setTheme(savedTheme);

themeToggleBtn.addEventListener("click", () => {
  const currentTheme = body.classList.contains("theme-dark") ? "light" : "dark";
  setTheme(currentTheme);
});

// Function to populate the day dropdown based on month and year
function populateDays() {
  const selectedMonth = parseInt(birthMonthSelect.value);
  const selectedYear = parseInt(birthYearInput.value);
  const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();

  // Clear previous options
  birthDaySelect.innerHTML = "";

  // Populate new options
  for (let i = 1; i <= daysInMonth; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    birthDaySelect.appendChild(option);
  }
}

// Add event listeners to update the day dropdown
birthMonthSelect.addEventListener("change", populateDays);
birthYearInput.addEventListener("input", populateDays);
window.addEventListener("load", () => {
  populateDays();
  // Set current year as max value for year input
  birthYearInput.max = new Date().getFullYear();
});

// Main calculation function
calculateBtn.addEventListener("click", calculateAge);

function calculateAge() {
  // Get user inputs
  const userName = document.getElementById("userName").value.trim();
  const birthDay = parseInt(birthDaySelect.value);
  const birthMonth = parseInt(birthMonthSelect.value);
  const birthYear = parseInt(birthYearInput.value);

  // Get current date
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const currentDay = today.getDate();

  // Validate inputs
  if (!userName) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please enter your name!",
      customClass: {
        popup: "bg-primary",
      },
    });
    return;
  }

  if (isNaN(birthDay) || isNaN(birthMonth) || isNaN(birthYear)) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please select a valid birth date!",
      customClass: {
        popup: "bg-primary",
      },
    });
    return;
  }

  // Create user's birth date object
  const birthDate = new Date(birthYear, birthMonth, birthDay);

  // Check if the birth date is valid and not in the future
  if (
    birthDate > today ||
    birthDate.getFullYear() !== birthYear ||
    birthDate.getMonth() !== birthMonth ||
    birthDate.getDate() !== birthDay
  ) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please enter a valid birth date!",
      customClass: {
        popup: "bg-primary",
      },
    });
    return;
  }

  // Calculate age
  let age = currentYear - birthYear;
  if (
    currentMonth < birthMonth ||
    (currentMonth === birthMonth && currentDay < birthDay)
  ) {
    age--;
  }

  // Display the result using SweetAlert
  Swal.fire({
    title: "🎉 Happy " + age + "!",
    text: `${userName}, you are currently ${age} years old.`,
    icon: "success",
    confirmButtonText: "Awesome!",
    customClass: {
      popup: "bg-primary",
    },
  });

  // Also update the result on the page
  const resultArea = document.getElementById("resultArea");
  const resultText = document.getElementById("resultText");
  resultText.textContent = `${userName}, you are ${age} years old.`;
  resultArea.classList.remove("hidden");
}
