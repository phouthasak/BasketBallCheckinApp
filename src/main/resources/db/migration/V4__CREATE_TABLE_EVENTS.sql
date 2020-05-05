DROP TABLE IF EXISTS EVENTS;
CREATE TABLE EVENTS (
event_id INT(10) auto_increment primary key,
location_id INT(10) not null,
court_number INT(10) not null,
event_date_time DATETIME not null,
scheduled TINYINT default 0 not null,
permit LONGBLOB,
permit_file_name VARCHAR(100),
host_id INT(10) not null,
created_date DATETIME not null,
created_by VARCHAR(100) not null,
updated_date DATETIME not null,
updated_by VARCHAR(100) not null,
active TINYINT default 1 not null,
FOREIGN KEY (location_id) references location(location_id),
FOREIGN KEY (host_id) references player(player_id)
);