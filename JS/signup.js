document.querySelector('.signup-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the default form submission

    const username = document.getElementById('usernamelog').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:4000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: username, email, password })
        });

        const data = await response.json();

        if (response.ok) {
            alert('Sign up successful! Please log in.');
            // Redirect to the login page
            window.location.href = '/Login.html';
        } else {
            alert('Sign up failed: ' + data.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while signing up. Please try again.');
    }
});
