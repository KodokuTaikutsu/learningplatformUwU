const {Router } = require("express");
const router = Router();

const {
    getUsers,
    getUserById,
    addUser,
    updateUserById,
    deleteUserById,

    getAdministrators,
    getAdministratorById,
    addAdministrator,
    updateAdministratorById,
    deleteAdministratorById,

    getCategories,
    getCategoryById,
    addCategory,
    updateCategoryById,
    deleteCategoryById,

    getCourses,
    getCourseById,
    addCourse,
    updateCourseById,
    deleteCourseById,
    getAllCourses,

    getLessons,
    getLessonById,
    addLesson,
    updateLessonById,
    deleteLessonById,

    getEnrollments,
    getEnrollmentById,
    addEnrollment,
    updateEnrollmentById,
    deleteEnrollmentById,

    getLessonProgress,
    getLessonProgressById,
    addLessonProgress,
    updateLessonProgressById,
    deleteLessonProgressById,

    getLessonProgressByCourseId,
    getLessonsByCourseId,

    getEnrollmentsByCourseId,
    getEnrollmentsByUserId,

    loginUser

} = require('../controllers/index.controller')

const authenticateToken = require('../controllers/authMiddleware');

 // Public routes
router.post('/register', addUser);
router.post('/login', loginUser);
router.get('/lessonsbyCourse/:course_id', getLessonsByCourseId);

// User routes
router.get('/getusers', authenticateToken, getUsers);
router.get('/users/:id', authenticateToken, getUserById);
router.post('/users', authenticateToken, addUser);
router.put('/users/:id', authenticateToken, updateUserById);
router.delete('/users/:id', authenticateToken, deleteUserById);

// Administrator routes
router.get('/administrators', authenticateToken, getAdministrators);
router.get('/administrators/:id', authenticateToken, getAdministratorById);
router.post('/administrators', authenticateToken, addAdministrator);
router.put('/administrators/:id', authenticateToken, updateAdministratorById);
router.delete('/administrators/:id', authenticateToken, deleteAdministratorById);

// Category routes
router.get('/categories', getCategories);
router.get('/categories/:id', getCategoryById);
router.post('/categories', addCategory);
router.put('/categories/:id', updateCategoryById);
router.delete('/categories/:id', deleteCategoryById);

// Course routes
router.get('/courses', getCourses);
router.get('/courses/:id', getCourseById); //this one
router.post('/courses', authenticateToken, addCourse);
router.put('/courses/:id', authenticateToken, updateCourseById);
router.delete('/courses/:id', authenticateToken, deleteCourseById);

router.get('/all_courses', getAllCourses);


// Lesson routes
router.get('/lessons', getLessons);
router.get('/lessons/:id', getLessonById);
router.post('/lessons', authenticateToken, addLesson);
router.put('/lessons/:id', authenticateToken, updateLessonById);
router.delete('/lessons/:id', authenticateToken, deleteLessonById);

// Enrollment routes
router.get('/enrollments', authenticateToken, getEnrollments);
router.get('/enrollments/:id', authenticateToken, getEnrollmentById);
router.post('/enrollments', authenticateToken, addEnrollment);
router.put('/enrollments/:id', authenticateToken, updateEnrollmentById);
router.delete('/enrollments/:id', authenticateToken, deleteEnrollmentById);

router.get('/enrollments/course/:course_id', authenticateToken, getEnrollmentsByCourseId);
router.get('/enrollments/user/:user_id', authenticateToken, getEnrollmentsByUserId);


// LessonProgress routes
router.get('/lessonprogress', authenticateToken, getLessonProgress);
router.get('/lessonprogress/:id', authenticateToken, getLessonProgressById);
router.post('/lessonprogress', authenticateToken, addLessonProgress);
router.put('/lessonprogress/:id', authenticateToken, updateLessonProgressById);
router.delete('/lessonprogress/:id', authenticateToken, deleteLessonProgressById);
router.get('/lessonprogress/course/:course_id', authenticateToken, getLessonProgressByCourseId);


module.exports = router;
                             