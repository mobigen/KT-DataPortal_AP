CREATE TABLE USER
(
    id       int auto_increment primary key,
    username varchar(255) not null,
    password varchar(255) not null,
    email    varchar(255)
);

INSERT INTO USER (username, password, email)
VALUES ('root', '!Biris.test202', 'root@mobigen.com');

INSERT INTO USER (username, password, email)
VALUES ('admin', 'admin123', 'admin@mobigen.com');