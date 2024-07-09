-- Table: User
CREATE TABLE User (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    type VARCHAR(255),
    enrolledCourses TEXT,
    viewedLessons TEXT
);

-- Table: Administrator (inherits from User)
CREATE TABLE Administrator (
    id SERIAL PRIMARY KEY,
    permission VARCHAR(255),
    FOREIGN KEY (id) REFERENCES User(id)
);

-- Table: Category
CREATE TABLE Category (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255)
);

-- Table: Course
CREATE TABLE Course (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    description TEXT,
    image VARCHAR(255),
    category_id INT,
    FOREIGN KEY (category_id) REFERENCES Category(id)
);

-- Table: Lesson
CREATE TABLE Lesson (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    course_id INT,
    content TEXT,
    number INT,
    FOREIGN KEY (course_id) REFERENCES Course(id)
);

-- Table: Enrollment
CREATE TABLE Enrollment (
    id SERIAL PRIMARY KEY,
    user_id INT,
    course_id INT,
    FOREIGN KEY (user_id) REFERENCES User(id),
    FOREIGN KEY (course_id) REFERENCES Course(id)
);

-- Table: LessonProgress
CREATE TABLE LessonProgress (
    id SERIAL PRIMARY KEY,
    user_id INT,
    lesson_id INT,
    completed BOOLEAN,
    FOREIGN KEY (user_id) REFERENCES User(id),
    FOREIGN KEY (lesson_id) REFERENCES Lesson(id)
);
