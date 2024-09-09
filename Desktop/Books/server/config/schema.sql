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
ALTER TABLE books ALTER COLUMN id SET DEFAULT nextval('books_id_seq');

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role VARCHAR(50) DEFAULT 'user',
    address VARCHAR(255) NOT NULL
);
drop table users
INSERT INTO users (username,password,role ,address)
VALUES 
('hoa','123456789','admin','123HL');
select * from users
INSERT INTO categories (name) VALUES
('Fiction'),
('Non-Fiction'),
('Science'),
('Biography');

INSERT INTO books (title, description, price, image, category_id)
VALUES
    ('The Great Gatsby', 'A novel written by American author F. Scott Fitzgerald.', 10.99, 'https://covers.openlibrary.org/b/id/8226196-L.jpg', 1),
    ('To Kill a Mockingbird', 'A novel by Harper Lee published in 1960.', 12.99, 'https://covers.openlibrary.org/b/id/8226131-L.jpg', 1),
    ('1984', 'A dystopian social science fiction novel by George Orwell.', 15.99, 'https://covers.openlibrary.org/b/id/8250986-L.jpg', 1),
    ('The Catcher in the Rye', 'A novel by J.D. Salinger, partially published in serial form in 1945–1946.', 11.99, 'https://covers.openlibrary.org/b/id/8232847-L.jpg', 1),
    ('Sapiens: A Brief History of Humankind', 'A book by Yuval Noah Harari, first published in Hebrew in Israel in 2011.', 18.99, 'https://covers.openlibrary.org/b/id/10349430-L.jpg', 2),
    ('Educated', 'A memoir by American author Tara Westover, published by Random House in 2018.', 14.99, 'https://covers.openlibrary.org/b/id/17854505-L.jpg', 2),
    ('A Brief History of Time', 'A popular-science book on cosmology by British physicist Stephen Hawking.', 16.99, 'https://covers.openlibrary.org/b/id/7889523-L.jpg', 3),
    ('The Selfish Gene', 'A book on evolution by Richard Dawkins, published in 1976.', 13.99, 'https://covers.openlibrary.org/b/id/8288904-L.jpg', 3),
    ('Guns, Germs, and Steel', 'A transdisciplinary non-fiction book by Jared Diamond.', 19.99, 'https://covers.openlibrary.org/b/id/7874438-L.jpg', 4),
    ('The Silk Roads: A New History of the World', 'A non-fiction book by Peter Frankopan, first published in 2015.', 17.99, 'https://covers.openlibrary.org/b/id/8217623-L.jpg', 4),
    ('The Alchemist', 'A novel by Paulo Coelho that tells the story of a shepherd named Santiago.', 13.49, 'https://covers.openlibrary.org/b/id/8234550-L.jpg', 1),
    ('The Hobbit', 'A fantasy novel by J.R.R. Tolkien about the adventures of Bilbo Baggins.', 14.99, 'https://covers.openlibrary.org/b/id/8216788-L.jpg', 1),
    ('Thinking, Fast and Slow', 'A book by Daniel Kahneman that explores the two systems of thought.', 16.49, 'https://covers.openlibrary.org/b/id/8235894-L.jpg', 2),
    ('The Power of Habit', 'A book by Charles Duhigg that explores the science of habit formation.', 15.99, 'https://covers.openlibrary.org/b/id/8234597-L.jpg', 2),
    ('The Gene: An Intimate History', 'A book by Siddhartha Mukherjee that traces the history of genetic research.', 17.49, 'https://covers.openlibrary.org/b/id/8234314-L.jpg', 3),
    ('Astrophysics for People in a Hurry', 'A book by Neil deGrasse Tyson that offers a quick overview of astrophysics.', 13.99, 'https://covers.openlibrary.org/b/id/8234322-L.jpg', 3),
    ('The Immortal Life of Henrietta Lacks', 'A book by Rebecca Skloot that tells the story of Henrietta Lacks and her immortal cells.', 14.49, 'https://covers.openlibrary.org/b/id/8234543-L.jpg', 4),
    ('Educated', 'A memoir by Tara Westover about her quest for knowledge and self-discovery.', 14.99, 'https://covers.openlibrary.org/b/id/8234554-L.jpg', 4);
