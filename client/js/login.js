import userServices from "../services/userServices.js";

$(document).on('submit', '#loginForm', async function(e) {
    e.preventDefault();
    const username = $('#username').val();
    const password = $('#password').val();

    try {
        const data = await userServices.login({ username, password });

        if (data.error) {
            alert("Failed to login: " + data.error);
            return;
        }

        localStorage.setItem('token', data.token);

        // Gọi API nếu đăng nhập thành công với role admin
        if (data.role === 'admin') {
            try {
                const response = await fetch('/api/admin-data', { 
                    headers: {
                        'Authorization': 'Bearer ' + data.token
                    }
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Lỗi khi gọi API admin');
                }

                const adminData = await response.json();
                console.log(adminData); 
            } catch (error) {
                console.error('Lỗi khi gọi API admin:', error);
            }
        }

        // Redirect dựa trên role
        if (data.role === 'admin') {
            location.hash = "#admin";
        } else {
            location.hash = "#home";
        }
        location.reload(); 
    } catch (error) {
        alert("Đã xảy ra lỗi trong quá trình đăng nhập. Vui lòng thử lại."); 
    }
});

// ... (phần còn lại của code, bao gồm định nghĩa userServices)