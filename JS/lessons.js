document.addEventListener('DOMContentLoaded', () => {
    const courseId = new URLSearchParams(window.location.search).get('course_id');
    const lessonId = new URLSearchParams(window.location.search).get('lesson_id') || 1;
    
    const lessonTitle = document.getElementById('lesson-title');
    const lessonMedia = document.getElementById('lesson-media');
    const lessonContent = document.getElementById('lesson-content');
    const prevLessonBtn = document.getElementById('prev-lesson');
    const nextLessonBtn = document.getElementById('next-lesson');

    const fetchLessons = async (courseId) => {
        try {
            const response = await fetch(`http://localhost:4000/lessonsbyCourse/${courseId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching lessons:', error);
        }
    };

    const displayLesson = (lessons, currentLessonId) => {
        const lesson = lessons.find(lesson => lesson.id == currentLessonId);
        if (!lesson) return;

        lessonTitle.textContent = lesson.title;
        lessonMedia.src = lesson.media;
        lessonContent.textContent = lesson.content;

        const currentIndex = lessons.indexOf(lesson);
        prevLessonBtn.disabled = currentIndex === 0;
        nextLessonBtn.disabled = currentIndex === lessons.length - 1;

        prevLessonBtn.onclick = () => {
            if (currentIndex > 0) {
                displayLesson(lessons, lessons[currentIndex - 1].id);
            }
        };

        nextLessonBtn.onclick = () => {
            if (currentIndex < lessons.length - 1) {
                displayLesson(lessons, lessons[currentIndex + 1].id);
            }
        };
    };

    fetchLessons(courseId).then(lessons => {
        if (lessons && lessons.length > 0) {
            displayLesson(lessons, lessonId);
        }
    });
});
