import userServices from "../services/userServices.js";

function init() {
    const registerForm = document.getElementById('registerForm');

registerForm.addEventListener('submit', function (event) {
    event.preventDefault();

    // Collect form data
    const formData = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value,
        address: document.getElementById('address').value
    };

    userServices.register(formData)
        .then(response => {
            if (response.ok) {
                // Registration successful, redirect to login page
                window.location.hash = '#login';
            } else {
                // Handle errors (e.g., user already exists)
                response.json().then(data => {
                    alert(`Error: ${data.message}`);
                });
            }
        })
        .catch(error => {
            console.error('Error during registration:', error);
            alert('An error occurred. Please try again.');
        });
});
}

export default {
    init,
}