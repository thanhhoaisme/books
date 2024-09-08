// Check if the user is authenticated
function isAuthenticated() {
    const token = localStorage.getItem('token');
    return token !== null;
}

// Optionally decode JWT token to check its validity
function decodeToken(token) {
    if (!token) return null;
    const payload = token.split('.')[1];
    const decodedPayload = atob(payload);
    return JSON.parse(decodedPayload);
}

// Check if the token is expired
function isTokenExpired(token) {
    const decoded = decodeToken(token);
    if (!decoded || !decoded.exp) return true;
    const expirationDate = new Date(decoded.exp * 1000);
    return expirationDate < new Date();
}

// Function to check if the user is authenticated
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
