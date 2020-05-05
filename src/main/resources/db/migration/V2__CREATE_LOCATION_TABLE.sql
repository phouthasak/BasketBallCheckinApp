DROP TABLE IF EXISTS LOCATION;
CREATE TABLE LOCATION (
location_id INT(10) auto_increment primary key,
location_name VARCHAR(100) not null,
street_num INT(10) not null,
street_name VARCHAR(100) not null,
phone VARCHAR(100),
city VARCHAR(100) not null,
state VARCHAR(10) not null,
zip INT(50) not null,
created_date DATETIME not null,
created_by VARCHAR(100) not null,
active TINYINT default 1 not null
);

INSERT INTO LOCATION (location_name, street_num, street_name, phone, city, state, zip, created_date, created_by, active) VALUES ('Berliner', 1300, 'Deckenbach Road', '(614) 645-3366', 'Columbus', 'OH', 43223, now(), 'ADMIN', 1);
INSERT INTO LOCATION (location_name, street_num, street_name, phone, city, state, zip, created_date, created_by, active) VALUES ('Big Run', 4205, 'Clime Road', '(614) 645-3366', 'Columbus', 'OH', 43228, now(), 'ADMIN', 1);
INSERT INTO LOCATION (location_name, street_num, street_name, phone, city, state, zip, created_date, created_by, active) VALUES ('Cleo', 276,'South Nelson Road', '(614) 645-3366', 'Columbus', 'OH', 43205, now(), 'ADMIN', 1);
INSERT INTO LOCATION (location_name, street_num, street_name, phone, city, state, zip, created_date, created_by, active) VALUES ('McDonald', 4900 ,'Olentangy River Road', '(614) 645-3366', 'Columbus', 'OH', 43214, now(), 'ADMIN', 1);
INSERT INTO LOCATION (location_name, street_num, street_name, phone, city, state, zip, created_date, created_by, active) VALUES ('Willis', 2520 ,'Mock Road', '(614) 645-3366', 'Columbus', 'OH', 43219, now(), 'ADMIN', 1);