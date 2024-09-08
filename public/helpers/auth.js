// Check if the user is authenticated
function isAuthenticated() {
    const token = localStorage.getItem('token');

    // Kiểm tra token trước khi giải mã
    if (!token || token.split('.').length !== 3) return false;

    return token !== null && !isTokenExpired(token); // Check expiration directly here
}

// Optionally decode JWT token to check its validity
function decodeToken(token) {
    try {
        if (!token) return null;

        const parts = token.split('.');
        if (parts.length !== 3) {
            console.error('Invalid token format');
            return null;
        }

        const payload = parts[1];
        const decodedPayload = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));

        // Optional: Check for correct Base64 padding
        if (decodedPayload.length % 4 !== 0) {
            console.error('Invalid Base64 padding in payload');
            return null;
        }

        try {
            return JSON.parse(decodedPayload);
        } catch (error) {
            console.error('Error parsing token payload:', error);
            return null;
        }
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
}

// Check if the token is expired
function isTokenExpired(token) {
    // Kiểm tra token trước khi giải mã
    if (!token || token.split('.').length !== 3) return true; 

    const decoded = decodeToken(token);
    if (!decoded || !decoded.exp) return true;
    const expirationDate = new Date(decoded.exp * 1000);
    return expirationDate < new Date();
}

// Function to check if the user is authenticated (no changes needed)
function checkAuthentication() {
    const token = localStorage.getItem('token');
    if (token && !isTokenExpired(token)) {
        return true;
    }
    return false;
}

function getUserInfo() {
    const token = localStorage.getItem('token');
    if (token && !isTokenExpired(token)) {
        return decodeToken(token);
    }
    return null;
}

export { isAuthenticated, checkAuthentication, getUserInfo };