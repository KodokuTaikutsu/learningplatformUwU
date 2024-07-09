document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('courseId');
    const courseApiUrl = `http://localhost:4000/courses/${courseId}`;
    const lessonsApiUrl = `http://localhost:4000/lessonsbyCourse/${courseId}`;

    // Fetch course data
    fetch(courseApiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('course-title').innerText = data.name;
            document.getElementById('course-description').innerText = data.description;
            document.getElementById('course-image').src = `/images/${data.image}`;
            document.getElementById('course-image').alt = data.name;
        })
        .catch(error => console.error('Error fetching course data:', error));

    // Fetch lessons data
    fetch(lessonsApiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(lessons => {
            const lessonsList = document.getElementById('lessons-list');
            lessonsList.innerHTML = ''; // Clear any existing content

            lessons.forEach(lesson => {
                const lessonItem = document.createElement('li');
                lessonItem.classList.add('lesson');
                lessonItem.innerHTML = `
                    <img src="/images/${lesson.image}" alt="${lesson.title}">
                    <span>Lesson ${lesson.number}</span>
                `;
                lessonsList.appendChild(lessonItem);
            });
        })
        .catch(error => console.error('Error fetching lessons:', error));
});
