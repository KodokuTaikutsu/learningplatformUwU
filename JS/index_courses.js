document.addEventListener('DOMContentLoaded', () => {
    const courseApiUrl = `http://localhost:4000/courses`;

    // Fetch all courses data
    fetch(courseApiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(courses => {
            const courseList = document.getElementById('course-list');
            courseList.innerHTML = ''; // Clear any existing content

            courses.forEach(course => {
                const courseItem = document.createElement('div');
                courseItem.classList.add('course-item');
                courseItem.innerHTML = `
                    <a href="/course.html?courseId=${course.id}" class="course-link">
                        <h3>${course.name}</h3>
                        
                        <img src="/images/${course.image}" alt="${course.name}">
                    </a>
                `;
                courseList.appendChild(courseItem);
            });
        })
        .catch(error => console.error('Error fetching courses:', error));
});
