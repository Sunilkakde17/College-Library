// Selecting elements
const loginText = document.querySelector(".title-text .login");
const loginForm = document.querySelector("form.login");
const signupForm = document.querySelector("form.signup");
const loginBtn = document.querySelector("label.login");
const signupBtn = document.querySelector("label.signup");
const signupLink = document.querySelector("form .signup-link a");

// Function to handle form submission
function handleLogin(event) {
    event.preventDefault(); // Prevent default form submission behavior

    // Getting input values
    const emailInput = loginForm.querySelector('input[name="email"]');
    const passwordInput = loginForm.querySelector('input[name="password"]');

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    // Perform login via AJAX
    fetch('login.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            email: email,
            password: password
        })
    })
    .then(response => response.text())
    .then(data => {
        if (data.trim() === "Login successful") {
            // If login is successful, redirect to the main page
            window.location.href = "services.html"; // Replace "services.html" with the path to your main page
        } else {
            alert(data); // Display the error message from the server
        }
    })
    .catch(error => console.error('Error:', error));
}

// Function to handle signup submission
function handleSignup(event) {
    event.preventDefault(); // Prevent default form submission behavior

    // Getting input values
    const emailInput = signupForm.querySelector('input[name="email"]');
    const rollNoInput = signupForm.querySelector('input[name="rollNo"]');
    const passwordInput = signupForm.querySelector('input[name="password"]');
    const confirmPasswordInput = signupForm.querySelector('input[name="confirmPassword"]');

    const email = emailInput.value.trim();
    const rollNo = rollNoInput.value.trim();
    const password = passwordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    // Perform signup via AJAX
    fetch('signup.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            email: email,
            rollNo: rollNo,
            password: password
        })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message); // Display the success or error message from the server
        if (data.success) {
            window.location.href = "login.html"; // Redirect to the login page after successful signup
        }
    })
    .catch(error => console.error('Error:', error));
}

// Add event listener to login form
loginForm.addEventListener('submit', handleLogin);

// Add event listener to signup form
signupForm.addEventListener('submit', handleSignup);

// Toggle between login and signup forms
signupBtn.addEventListener('click', () => {
    loginForm.style.marginLeft = "-50%";
    loginText.style.marginLeft = "-50%";
});

loginBtn.addEventListener('click', () => {
    loginForm.style.marginLeft = "0%";
    loginText.style.marginLeft = "0%";
});

// Handle signup link click
signupLink.addEventListener('click', (event) => {
    event.preventDefault();
    signupBtn.click();
});
