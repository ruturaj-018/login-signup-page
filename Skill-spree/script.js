// Toggle Functionality for Login and Signup
const container = document.getElementById("container");
const registerbtn = document.getElementById("register");
const loginbtn = document.getElementById("login");

registerbtn.addEventListener("click", () => {
  container.classList.add("active");
});

loginbtn.addEventListener("click", () => {
  container.classList.remove("active");
});


// Google Sign-In (Mock Function)
function googleSignIn() {
  alert("Google Sign-In is not implemented yet!");
  // Here you can integrate Google OAuth API.
}

document.addEventListener("DOMContentLoaded", function () {
  let generatedCode;
  let timer;
  let countdown = 120; // 2 minutes in seconds

  const emailInput = document.getElementById("email");
  const sendCodeMsg = document.getElementById("send-code-msg");
  const verificationSection = document.getElementById("verification-section");
  const verificationCodeInput = document.getElementById("verification-code");
  const verifyMsg = document.getElementById("verify-msg");
  const verificationStatus = document.getElementById("verification-status");
  const signupBtn = document.getElementById("signup-btn");

  // Show clickable text when email is entered
  emailInput.addEventListener("input", function () {
      sendCodeMsg.style.display = "block";
  });

  // Send verification code on clicking the text
  sendCodeMsg.addEventListener("click", function () {
      generatedCode = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit code
      alert("Verification code sent to email: " + generatedCode); // Simulating email send

      sendCodeMsg.style.display = "none"; // Hide clickable text
      verificationSection.style.display = "block"; // Show verification input field

      startTimer();
  });

  // Start Countdown Timer
  function startTimer() {
      countdown = 120; // Reset timer
      verificationStatus.style.display = "block";
      verificationStatus.innerText = ` ${countdown} sec`;//time :
      verificationStatus.classList.add("error");

      timer = setInterval(() => {
          countdown--;
          verificationStatus.innerText = ` ${countdown} sec`;//time :

          if (countdown <= 0) {
              clearInterval(timer);
              verificationStatus.innerText = "Time expired! Please request a new code.";
              setTimeout(() => {
                  location.reload(); // Reload page to reset process
              }, 2000);
          }
      }, 1000);
  }

  // Show clickable text "Click to verify" after code is sent
  verifyMsg.style.display = "block";

  // Verify Code when clicking the verification text
  verifyMsg.addEventListener("click", function () {
      let enteredCode = verificationCodeInput.value.trim();

      if (enteredCode.length === 6) {
          if (enteredCode == generatedCode) {
              clearInterval(timer); // Stop timer
              verificationStatus.innerText = "Email Verified!";
              verificationStatus.classList.remove("error");
              verificationStatus.classList.add("success");

              signupBtn.disabled = false; // Enable Sign Up button
          } else {
              verificationStatus.innerText = "Invalid Code!";
              verificationStatus.classList.remove("success");
              verificationStatus.classList.add("error");
          }
      } else {
          alert("Please enter the 6-digit code.");
      }
  });
});


// Sign verification


document.addEventListener("DOMContentLoaded", function () {
  const emailInput = document.querySelector('.sign-in input[placeholder="Email"]');
  const passwordInput = document.querySelector('.sign-in input[placeholder="Password"]');
  const signInBtn = document.querySelector(".signinbtn");
  
  signInBtn.addEventListener("click", function (event) {
      event.preventDefault(); // Prevent default form submission

      if (!validateSignInForm()) return;

      alert("✅ Login successful! Redirecting...");
      window.location.href = "dashboard.html"; // Redirect to user dashboard
  });

  // Validate Sign-In Form
  function validateSignInForm() {
      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();

      if (!validateEmail(email)) {
          alert("❌ Please enter a valid email address.");
          return false;
      }

      if (!password || password.length < 6) {
          alert("❌ Password must be at least 6 characters long.");
          return false;
      }

      return true;
  }

  // Validate Email Format
  function validateEmail(email) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
  }
});
