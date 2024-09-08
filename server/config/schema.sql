CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);
drop table categories
CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2),
	stock_quantity INT NOT NULL,
    sold_quantity INT NOT NULL DEFAULT 0,
    image VARCHAR(255),
    category_id INTEGER REFERENCES categories(id)
	
);
drop table books
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role VARCHAR(50) DEFAULT 'user',
    address VARCHAR(255) NOT NULL

);
select * from users
drop table users
	
INSERT INTO categories (name) VALUES
('Kinh tế'),
('Sách giáo khoa'),
('Thiếu nhi'),
('Ngoại ngữ');

INSERT INTO books (title, description, price, image, category_id) VALUES
('The Martian', 'A novel about an astronaut stranded on Mars trying to survive.', 10.99, 'https://example.com/gatsby.jpg', 1), -- Corrected description
('Sapiens', 'A book by Yuval Noah Harari that explores the history of humankind.', 15.99, 'https://example.com/sapiens.jpg', 2),
('A Brief History of Time', 'A popular-science book by Stephen Hawking.', 12.99, 'https://example.com/brief-history.jpg', 3),
('Steve Jobs', 'A biography of Steve Jobs by Walter Isaacson.', 18.99, 'https://example.com/steve-jobs.jpg', 4),
('Mega Livestream - Bề Nổi Tảng Băng Chìm', 'Bóc trần sự thật về hiện tượng Mega Livestream và trang bị cho bạn kiến thức, chiến lược để chinh phục thị trường đầy tiềm năng này!', 62.30, '../images/megalivestream-31082024-1.jpg', 1);