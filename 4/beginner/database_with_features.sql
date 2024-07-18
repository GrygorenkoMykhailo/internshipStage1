-- Магазин книг, один автор может написать много книг, много пользователей могут добавлять в корзину много книг

CREATE TABLE Users(
    Id INT PRIMARY KEY AUTO_INCREMENT,
    Username VARCHAR(50) NOT NULL,
    Email VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE Authors(
    Id INT PRIMARY KEY AUTO_INCREMENT,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL
);

CREATE INDEX idx_Author_LastName ON Authors(LastName);

CREATE TABLE Books (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    Title VARCHAR(255) NOT NULL,
    Author_Id INT,
    FOREIGN KEY (Author_Id) REFERENCES Authors(Id) ON DELETE SET NULL
);

CREATE TABLE UsersBooks(
    UserId INT,
    BookId INT,
    FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE CASCADE,
    FOREIGN KEY (BookId) REFERENCES Books(Id) ON DELETE CASCADE
);

INSERT INTO Users (Username, Email)
VALUES
    ('user1', 'user1@example.com'),
    ('user2', 'user2@example.com'),
    ('user3', 'user3@example.com');

INSERT INTO Authors (FirstName, LastName)
VALUES
    ('John', 'Doe'),
    ('Jane', 'Smith'),
    ('Michael', 'Johnson');

INSERT INTO Books (Title, Author_Id)
VALUES
    ('Book1', 1),
    ('Book2', 1),
    ('Book3', 2),
    ('Book4', 3);

INSERT INTO UsersBooks (UserId, BookId)
VALUES
    (1, 1),
    (1, 2),
    (2, 3),
    (3, 4);

UPDATE Users SET Username = 'Bob', Email = 'bob@gmail.com' WHERE Id = 1;

SELECT * FROM Users;

-- Получить имена всех пользователей, которые добавили в корзину книгу с айди = 3, и название этой книги
SELECT Users.Username, Books.Title
FROM Users
JOIN UsersBooks ON Users.Id = UsersBooks.UserId
JOIN Books ON UsersBooks.BookId = Books.Id
WHERE Books.Id = 3;

SELECT * FROM Users ORDER BY Users.Username;


