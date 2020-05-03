DROP TABLE IF EXISTS EVENT;
CREATE TABLE EVENT (
event_id INT(10) auto_increment primary key,
event_location VARCHAR(150) not null,
court_number INT(10) not null,
event_time DATETIME not null,
permit BLOB,
created_date DATETIME not null,
created_by VARCHAR(10) not null,
updated_date DATETIME not null,
updated_by VARCHAR(10) not null,
active TINYINT default 1 not null
);