// js/login.js
document.querySelector('.login-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the default form submission

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:4000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            // Save the token and user's name to localStorage
            localStorage.setItem('token', data.token);
            localStorage.setItem('username', data.username);
            alert('Login successful!');

            // Redirect to the home page
            window.location.href = '/Index.html';
        } else {
            alert('Login failed: ' + data.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while logging in. Please try again.');
    }
});
