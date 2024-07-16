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
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    category_subject post_category_subject NOT NULL,
    status post_status NOT NULL, 
    limit_date TIMESTAMP WITHOUT TIME ZONE NOT NULL, 
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE OR REPLACE TRIGGER update_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE OR REPLACE TRIGGER update_posts_updated_at
BEFORE UPDATE ON posts
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();