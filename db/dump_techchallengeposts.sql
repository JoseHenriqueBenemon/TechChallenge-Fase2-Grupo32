SET timezone = 'America/Sao_Paulo';
CREATE TYPE user_role AS ENUM ('Student', 'Teacher');
CREATE TYPE post_category_subject AS ENUM ('Math', 'Biology', 'Physics', 'Chemistry', 'History', 'Geography', 'Portuguese', 'English', 'Literature', 'Physical Education', 'Arts', 'Sociology', 'Philosophy');
CREATE TYPE post_status AS ENUM ('Active', 'Inactive');

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role user_role NOT NULL,
    registration_number VARCHAR(50),
    department VARCHAR(50),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    category_subject post_category_subject NOT NULL,
    status post_status NOT NULL, 
    limit_date TIMESTAMPTZ NOT NULL DEFAULT NOW(), 
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
