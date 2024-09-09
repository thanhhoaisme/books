const userServices = {
    login: async data => {
        try {
            const response = await fetch('/api/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)   

            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error   
 || 'Đăng nhập thất bại');
            }

            const result = await response.json();

            // Kiểm tra role và trả về thông tin chuyển hướng nếu cần
            if (result.role === 'admin') {
                result.redirectTo = '/admin'; // Hoặc đường dẫn tới trang admin của bạn
            }

            return result; // Trả về kết quả bao gồm token và thông tin chuyển hướng
        } catch (error) {
            throw error; // Ném lỗi để xử lý ở nơi gọi hàm login
        }
    },

    register: data => (
        fetch('/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    )
}

export default userServices;
