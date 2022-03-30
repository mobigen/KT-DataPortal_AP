CREATE TABLE TB_WEB_USER
(
    id       int auto_increment primary key,
    username varchar(255) not null,
    password varchar(255) not null,
    email    varchar(255),
    auth_type varchar(255) not null default 1
);

INSERT INTO TB_WEB_USER (username, password, email)
VALUES ('root', '!Biris.test202', 'root@mobigen.com');

INSERT INTO TB_WEB_USER (username, password, email)
VALUES ('admin', 'admin123', 'admin@mobigen.com');

create view metasch.v_biz_meta_name
as
select column_name
from information_schema.columns
where table_name = 'tb_biz_meta_name';

create view metasch.v_biz_meta_map
as
select column_name
from information_schema.columns
where table_name = 'tb_biz_meta_map';