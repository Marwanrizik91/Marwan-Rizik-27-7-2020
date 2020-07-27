
BEGIN;

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS messages CASCADE;

CREATE TABLE users (
    id serial primary key,
    "firstName" text,
    "lastName" text,
    "password" text,
    "email" text
);

CREATE TABLE messages (
    id serial primary key,
    "senderId" INT,
    "receiverId" INT,
    title text,
    content text,
    "creationDate" timestamp DEFAULT current_timestamp
);

INSERT INTO users ("firstName", "lastName", "password", "email") VALUES 
    ('Marwan', 'Rizik', '123456', 'marwan.rizik@gmail.com'),
    ('John', 'Does', '123456', 'John.doe@gmail.com');

INSERT INTO messages ("senderId", "receiverId", title, content) VALUES 
    (1, 2, 'Hi John', 'Im creating this app for a job assignment at Herolo'),
    (2, 1, 'Hi Marwan' , 'Thats Awesome');


COMMIT;