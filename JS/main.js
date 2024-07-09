document.addEventListener('DOMContentLoaded', () => {
    const sectionTitle = document.createElement('div');
    sectionTitle.classList.add('section-title');
    document.body.appendChild(sectionTitle);

    

    
    // Smooth scrolling and section title display
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);

                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 60, // Adjust this value if needed
                        behavior: 'smooth'
                    });

                    sectionTitle.textContent = targetSection.dataset.title;
                    sectionTitle.style.display = 'block';

                    setTimeout(() => {
                        sectionTitle.style.display = 'none';
                    }, 2000);
                }
            }
        });
    });
});

//login


document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');

    if (token && username) {
        // Hide the login and sign-up buttons
        document.getElementById('loginbtn').style.display = 'none';
        document.getElementById('signupbtn').style.display = 'none';

        // Show the user dropdown with the username
        const userDropdown = document.getElementById('user-dropdown');
        userDropdown.style.display = 'block';
        document.getElementById('username').innerText = username;

        // Add logout functionality
        document.getElementById('logout').addEventListener('click', () => {
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            window.location.href = '/Index.html'; // Redirect to home page after logout
        });
    }
});


