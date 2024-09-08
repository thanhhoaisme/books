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
    .then(response => {
        if (!response.ok) {
            return response.json().then(data => {
                // Kiểm tra thông báo lỗi từ server
                if (data.error === 'Invalid credentials') {
                    throw new Error('Tên đăng nhập hoặc mật khẩu không đúng');
                } else {
                    throw new Error(data.error || 'Đăng nhập thất bại'); 
                }
            });
        }
        return response.json();
    })
    .then(data => {
        localStorage.setItem('token', data.token);

        // Cập nhật giao diện sau khi đăng nhập thành công
        $('#user-info').text(`Welcome, ${username}`); 
        $('#auth-btn').text('Logout'); 
        $('#auth-btn').off('click').on('click', function () {
            localStorage.removeItem('token'); 
            location.reload(); 
        });

        // Redirect dựa trên role (nếu cần)
        if (data.role === 'admin') {
            location.hash = "#admin";
        } else {
            location.hash = "#home";
        }
    })
    .catch(error => {
        alert(error.message); 
    });
});