// register
document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const isSeller = document.getElementById('is_seller').checked;

    fetch('http://localhost:8000/accounts/register/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password, is_seller: isSeller }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            document.getElementById('registerMessage').innerText = 'Registration successful!';
            window.location.href = 'login.html';
        } else {
            document.getElementById('registerMessage').innerText = 'Registration failed. Please try again.';
        }
    })
    .catch(error => console.error('Error:', error));
});



// login 
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:8000/accounts/login/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.access) {
            localStorage.setItem('accessToken', data.access);
            localStorage.setItem('refreshToken', data.refresh);
            window.location.href = 'products.html';
        } else {
            document.getElementById('loginMessage').innerText = 'Login failed. Please try again.';
        }
    })
    .catch(error => console.error('Error:', error));
});
