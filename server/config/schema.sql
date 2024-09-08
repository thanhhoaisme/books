CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2),
    image VARCHAR(255),
    category_id INTEGER REFERENCES categories(id)
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role VARCHAR(50) DEFAULT 'user',
    address_line1 VARCHAR(255) NOT NULL,
    address_line2 VARCHAR(255),
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    postal_code VARCHAR(20) NOT NULL,
    country VARCHAR(100) NOT NULL
);


INSERT INTO categories (name) VALUES
('Fiction'),
('Non-Fiction'),
('Science'),
('Biography');

INSERT INTO books (title, description, price, image, category_id) VALUES
('The Great Gatsby', 'A novel written by American author F. Scott Fitzgerald.', 10.99, 'https://example.com/gatsby.jpg', 1),
('Sapiens', 'A book by Yuval Noah Harari that explores the history of humankind.', 15.99, 'https://example.com/sapiens.jpg', 2),
('A Brief History of Time', 'A popular-science book by Stephen Hawking.', 12.99, 'https://example.com/brief-history.jpg', 3),
('Steve Jobs', 'A biography of Steve Jobs by Walter Isaacson.', 18.99, 'https://example.com/steve-jobs.jpg', 4);



INSERT INTO categories (name) VALUES
('Kinh tế'),
('Văn học'),
('Truyện tranh'),
('Ngoại ngữ');

INSERT INTO books (title, description, price, image, category_id) VALUES
('The Martian', 'A novel about an astronaut stranded on Mars trying to survive.', 10.99, 'https://example.com/gatsby.jpg', 1), -- Corrected description
('Sapiens', 'A book by Yuval Noah Harari that explores the history of humankind.', 15.99, 'https://example.com/sapiens.jpg', 2),
('A Brief History of Time', 'A popular-science book by Stephen Hawking.', 12.99, 'https://example.com/brief-history.jpg', 3),
('Steve Jobs', 'A biography of Steve Jobs by Walter Isaacson.', 18.99, 'https://example.com/steve-jobs.jpg', 4),
('Mega Livestream - Bề Nổi Tảng Băng Chìm', 'Bóc trần sự thật về hiện tượng Mega Livestream và trang bị cho bạn kiến thức, chiến lược để chinh phục thị trường đầy tiềm năng này!', 62.30, '../images/megalivestream-31082024-1.jpg', 1);