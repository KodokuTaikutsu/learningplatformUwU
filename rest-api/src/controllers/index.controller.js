const { Pool } = require('pg');
const { hashPassword, comparePassword, generateToken } = require('./authHelpers');

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'zelly',
    database: 'classesapi',
    port: '5432'
});
// User registration
const addUser = async (req, res) => {
    const { name, email, password } = req.body;
    console.log('Received signup request:', req.body);
    try {
      const hashedPassword = await hashPassword(password);
      
      const response = await pool.query('INSERT INTO Users (name, email, hashed_password) VALUES ($1, $2, $3)', [name, email, hashedPassword]);
      console.log('User created:', response);
  
      res.status(201).json({
        message: 'User Created Successfully',
        body: {
          user: { name, email }
        }
      });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  // User login
  const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const response = await pool.query('SELECT * FROM Users WHERE email = $1', [email]);
        const user = response.rows[0];

        if (user && await comparePassword(password, user.hashed_password)) {
            const token = generateToken(user);
            res.json({ message: 'Logged in successfully', token, username: user.name });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

//get all
const getUsers = async (req, res) => {
    const response = await pool.query('SELECT * FROM Users');
    console.log(response.rows);
    res.send('users');
};

const getAdministrators = async (req, res) => {
    const response = await pool.query('SELECT * FROM Administrators');
    console.log(response.rows);
    res.send('administrators');
};

const getCategories = async (req, res) => {
    const response = await pool.query('SELECT * FROM Categories');
    console.log(response.rows);
    res.send('categories');
};

const getAllCourses = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit, 10) || 32;
        const response = await pool.query('SELECT * FROM Courses LIMIT $1', [limit]);
        console.log(response.rows);  // Ensure this logs the course data
        res.json(response.rows);
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).json({ error: 'An error occurred while fetching courses' });
    }
};

const getCourses = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit, 10) || 4;
        const response = await pool.query('SELECT * FROM Courses LIMIT $1', [limit]);
        console.log(response.rows);  // Ensure this logs the course data
        res.json(response.rows);
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).json({ error: 'An error occurred while fetching courses' });
    }
};

const getLessons = async (req, res) => {
    const response = await pool.query('SELECT * FROM Lessons');
    console.log(response.rows);
    res.send('lessons');
};

const getEnrollments = async (req, res) => {
    const response = await pool.query('SELECT * FROM Enrollments');
    console.log(response.rows);
    res.send('enrollments');
};

const getLessonProgress = async (req, res) => {
    const response = await pool.query('SELECT * FROM LessonProgress');
    console.log(response.rows);
    res.send('lessonprogress');
};

//sepcial gets
const getEnrollmentsByUserId = async (req, res) => {
    const { user_id } = req.params;
    const response = await pool.query('SELECT * FROM Enrollments WHERE user_id = $1', [user_id]);
    console.log(response.rows);
    res.json(response.rows);
};

const getEnrollmentsByCourseId = async (req, res) => {
    const { course_id } = req.params;
    const response = await pool.query('SELECT * FROM Enrollments WHERE course_id = $1', [course_id]);
    console.log(response.rows);
    res.json(response.rows);
};

const getLessonProgressByCourseId = async (req, res) => {
    const { course_id } = req.params;
    const response = await pool.query(`
        SELECT lp.*
        FROM LessonProgress lp
        JOIN Lessons l ON lp.lesson_id = l.id
        WHERE l.course_id = $1
    `, [course_id]);
    console.log(response.rows);
    res.json(response.rows);
};

const getLessonsByCourseId = async (req, res) => {
    const { course_id } = req.params;

    try {
        const response = await pool.query('SELECT * FROM Lessons WHERE course_id = $1 ORDER BY number', [course_id]);
        console.log(response.rows);  // Ensure this logs the lesson data
        res.json(response.rows);
    } catch (error) {
        console.error('Error fetching lessons:', error);
        res.status(500).json({ error: 'An error occurred while fetching lessons' });
    }
};

//get 

const getUserById = async (req, res) => {
    const { id } = req.params;
    const response = await pool.query('SELECT * FROM Users WHERE id = $1', [id]);
    console.log(response.rows);
    res.json(response.rows[0]);
};

const getAdministratorById = async (req, res) => {
    const { id } = req.params;
    const response = await pool.query('SELECT * FROM Administrators WHERE id = $1', [id]);
    console.log(response.rows);
    res.json(response.rows[0]);
};

const getCategoryById = async (req, res) => {
    const { id } = req.params;
    const response = await pool.query('SELECT * FROM Categories WHERE id = $1', [id]);
    console.log(response.rows);
    res.json(response.rows[0]);
};

const getCourseById = async (req, res) => {
    const { id } = req.params;
    const response = await pool.query('SELECT * FROM Courses WHERE id = $1', [id]);
    console.log(response.rows);
    res.json(response.rows[0]);
};

const getLessonById = async (req, res) => {
    const { id } = req.params;
    const response = await pool.query('SELECT * FROM Lessons WHERE id = $1', [id]);
    console.log(response.rows);
    res.json(response.rows[0]);
};

const getEnrollmentById = async (req, res) => {
    const { id } = req.params;
    const response = await pool.query('SELECT * FROM Enrollments WHERE id = $1', [id]);
    console.log(response.rows);
    res.json(response.rows[0]);
};

const getLessonProgressById = async (req, res) => {
    const { id } = req.params;
    const response = await pool.query('SELECT * FROM LessonProgress WHERE id = $1', [id]);
    console.log(response.rows);
    res.json(response.rows[0]);
};

//create


const addAdministrator = async (req, res) => {
    const { id, permission } = req.body;
    
    const response = await pool.query('INSERT INTO Administrators (id, permission) VALUES ($1, $2)', [id, permission]);
    console.log(response);
    res.json({
        message: 'Administrator Created Successfully',
        body: {
            administrator: { id, permission }
        }
    });
};

const addCategory = async (req, res) => {
    const { name } = req.body;
    
    const response = await pool.query('INSERT INTO Categories (name) VALUES ($1)', [name]);
    console.log(response);
    res.json({
        message: 'Category Created Successfully',
        body: {
            category: { name }
        }
    });
};

const addCourse = async (req, res) => {
    const { name, description, image, category_id } = req.body;
    
    const response = await pool.query('INSERT INTO Courses (name, description, image, category_id) VALUES ($1, $2, $3, $4)', [name, description, image, category_id]);
    console.log(response);
    res.json({
        message: 'Course Created Successfully',
        body: {
            course: { name, description, image, category_id }
        }
    });
};

const addLesson = async (req, res) => {
    const { title, course_id, content, number, media } = req.body;
    
    const response = await pool.query('INSERT INTO Lessons (title, course_id, content, number, media) VALUES ($1, $2, $3, $4, $5)', [title, course_id, content, number, media]);
    console.log(response);
    res.json({
        message: 'Lesson Created Successfully',
        body: {
            lesson: { title, course_id, content, number }
        }
    });
};

const addEnrollment = async (req, res) => {
    const { user_id, course_id } = req.body;
    
    const response = await pool.query('INSERT INTO Enrollments (user_id, course_id) VALUES ($1, $2)', [user_id, course_id]);
    console.log(response);
    res.json({
        message: 'Enrollment Created Successfully',
        body: {
            enrollment: { user_id, course_id }
        }
    });
};

const addLessonProgress = async (req, res) => {
    const { user_id, lesson_id, completed } = req.body;
    
    const response = await pool.query('INSERT INTO LessonProgress (user_id, lesson_id, completed) VALUES ($1, $2, $3)', [user_id, lesson_id, completed]);
    console.log(response);
    res.json({
        message: 'Lesson Progress Created Successfully',
        body: {
            lessonProgress: { user_id, lesson_id, completed }
        }
    });
};

//update

const updateUserById = async (req, res) => {
    const { id } = req.params;
    const { name, email, password, type, enrolled_courses, viewed_lessons } = req.body;

    const response = await pool.query(
        'UPDATE Users SET name = $1, email = $2, password = $3, type = $4, enrolled_courses = $5, viewed_lessons = $6 WHERE id = $7',
        [name, email, password, type, enrolled_courses, viewed_lessons, id]
    );

    console.log(response);
    res.json({
        message: 'User Updated Successfully',
        body: {
            user: { id, name, email, password, type, enrolled_courses, viewed_lessons }
        }
    });
};

const updateAdministratorById = async (req, res) => {
    const { id } = req.params;
    const { permission } = req.body;

    const response = await pool.query(
        'UPDATE Administrators SET permission = $1 WHERE id = $2',
        [permission, id]
    );

    console.log(response);
    res.json({
        message: 'Administrator Updated Successfully',
        body: {
            administrator: { id, permission }
        }
    });
};

const updateCategoryById = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    const response = await pool.query(
        'UPDATE Categories SET name = $1 WHERE id = $2',
        [name, id]
    );

    console.log(response);
    res.json({
        message: 'Category Updated Successfully',
        body: {
            category: { id, name }
        }
    });
};

const updateCourseById = async (req, res) => {
    const { id } = req.params;
    const { name, description, image, category_id } = req.body;

    const response = await pool.query(
        'UPDATE Courses SET name = $1, description = $2, image = $3, category_id = $4 WHERE id = $5',
        [name, description, image, category_id, id]
    );

    console.log(response);
    res.json({
        message: 'Course Updated Successfully',
        body: {
            course: { id, name, description, image, category_id }
        }
    });
};

const updateLessonById = async (req, res) => {
    const { id } = req.params;
    const { title, course_id, content, number, media } = req.body;

    const response = await pool.query(
        'UPDATE Lessons SET title = $1, course_id = $2, content = $3, number = $4, media = $5 WHERE id = $6',
        [title, course_id, content, number, media, id]
    );

    console.log(response);
    res.json({
        message: 'Lesson Updated Successfully',
        body: {
            lesson: { id, title, course_id, content, number }
        }
    });
};

const updateEnrollmentById = async (req, res) => {
    const { id } = req.params;
    const { user_id, course_id } = req.body;

    const response = await pool.query(
        'UPDATE Enrollments SET user_id = $1, course_id = $2 WHERE id = $3',
        [user_id, course_id, id]
    );

    console.log(response);
    res.json({
        message: 'Enrollment Updated Successfully',
        body: {
            enrollment: { id, user_id, course_id }
        }
    });
};

const updateLessonProgressById = async (req, res) => {
    const { id } = req.params;
    const { user_id, lesson_id, completed } = req.body;

    const response = await pool.query(
        'UPDATE LessonProgress SET user_id = $1, lesson_id = $2, completed = $3 WHERE id = $4',
        [user_id, lesson_id, completed, id]
    );

    console.log(response);
    res.json({
        message: 'LessonProgress Updated Successfully',
        body: {
            lessonProgress: { id, user_id, lesson_id, completed }
        }
    });
};


//delete

const deleteUserById = async (req, res) => {
    const { id } = req.params;
    const response = await pool.query('DELETE FROM Users WHERE id = $1', [id]);
    console.log(response);
    res.json({
        message: 'User Deleted Successfully',
        userId: id
    });
};

const deleteAdministratorById = async (req, res) => {
    const { id } = req.params;
    const response = await pool.query('DELETE FROM Administrators WHERE id = $1', [id]);
    console.log(response);
    res.json({
        message: 'Administrator Deleted Successfully',
        administratorId: id
    });
};

const deleteCategoryById = async (req, res) => {
    const { id } = req.params;
    const response = await pool.query('DELETE FROM Categories WHERE id = $1', [id]);
    console.log(response);
    res.json({
        message: 'Category Deleted Successfully',
        categoryId: id
    });
};

const deleteCourseById = async (req, res) => {
    const { id } = req.params;
    const response = await pool.query('DELETE FROM Courses WHERE id = $1', [id]);
    console.log(response);
    res.json({
        message: 'Course Deleted Successfully',
        courseId: id
    });
};

const deleteLessonById = async (req, res) => {
    const { id } = req.params;
    const response = await pool.query('DELETE FROM Lessons WHERE id = $1', [id]);
    console.log(response);
    res.json({
        message: 'Lesson Deleted Successfully',
        lessonId: id
    });
};

const deleteEnrollmentById = async (req, res) => {
    const { id } = req.params;
    const response = await pool.query('DELETE FROM Enrollments WHERE id = $1', [id]);
    console.log(response);
    res.json({
        message: 'Enrollment Deleted Successfully',
        enrollmentId: id
    });
};

const deleteLessonProgressById = async (req, res) => {
    const { id } = req.params;
    const response = await pool.query('DELETE FROM LessonProgress WHERE id = $1', [id]);
    console.log(response);
    res.json({
        message: 'LessonProgress Deleted Successfully',
        lessonProgressId: id
    });
};





module.exports = {

    loginUser,

    //gets all
    getUsers,
    getAdministrators,
    getCategories,
    getCourses,
    getLessons,
    getEnrollments,
    getLessonProgress,
    getAllCourses,

    //gets
    getUserById,
    getAdministratorById,
    getCategoryById,
    getCourseById,
    getLessonById,
    getEnrollmentById,
    getLessonProgressById,

    getEnrollmentsByUserId,
    getEnrollmentsByCourseId,
    getLessonProgressByCourseId,
    getLessonsByCourseId,

    //creates
    
    addUser, 
    addAdministrator, 
    addCategory, 
    addCourse, 
    addLesson, 
    addEnrollment, 
    addLessonProgress,

    //updates
    updateUserById,
    updateAdministratorById,
    updateCategoryById,
    updateCourseById,
    updateLessonById,
    updateEnrollmentById,
    updateLessonProgressById,

    //deletes
    deleteUserById,
    deleteAdministratorById,
    deleteCategoryById,
    deleteCourseById,
    deleteLessonById,
    deleteEnrollmentById,
    deleteLessonProgressById
}