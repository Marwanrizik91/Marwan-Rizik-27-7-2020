
BEGIN;

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS messages CASCADE;

CREATE TABLE users (
    id serial primary key,
    "firstName" text not null,
    "lastName" text not null,
    "password" text not null,
    "email" text not null
);

CREATE TABLE messages (
    id serial primary key,
    "senderId" INT not null,
    "receiverId" INT not null,
    title text,
    content text,
    "creationDate" timestamp DEFAULT current_timestamp,
    "isRead" BOOLEAN DEFAULT FALSE,
    "receiverDeleted" BOOLEAN DEFAULT FALSE,
    "senderDeleted" BOOLEAN DEFAULT FALSE
);

INSERT INTO users ("firstName", "lastName", "password", "email") VALUES 
    ('Marwan', 'Rizik', '123456', 'marwan.rizik@gmail.com'),
    ('John', 'Does', '123456', 'John.doe@gmail.com');

INSERT INTO messages ("senderId", "receiverId", title, content) VALUES 
    (1, 2, 'Hi John', 'Im creating this app for a job assignment at Herolo'),
    (2, 1, 'Hi Marwan' , 'Thats Awesome');


COMMIT;