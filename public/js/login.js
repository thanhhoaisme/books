$(document).on('submit', '#loginForm', function(e) {
    e.preventDefault();
    const username = $('#username').val();
    const password = $('#password').val();

    fetch('/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        localStorage.setItem('token', data.token);
        // Redirect to the home page or admin page based on role
        if (data.role === 'admin') {
            location.hash = "#admin";
        } else {
            location.hash = "#home";
        }
        location.reload();
    });
});