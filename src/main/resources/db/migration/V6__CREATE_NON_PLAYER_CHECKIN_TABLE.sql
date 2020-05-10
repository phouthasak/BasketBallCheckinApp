DROP TABLE IF EXISTS NON_PLAYER_CHECKIN;
CREATE TABLE NON_PLAYER_CHECKIN (
checkIn_id INT(10) auto_increment primary key,
event_id INT(10) not null,
sponsor_id INT(10) not null,
first_name VARCHAR(100) not null,
last_name VARCHAR(100) not null,
check_in_status TINYINT default 0 not null,
created_date DATETIME not null,
created_by VARCHAR(100) not null,
updated_date DATETIME not null,
updated_by VARCHAR(100) not null,
active TINYINT default 1 not null,
FOREIGN KEY (event_id) references events(event_id),
FOREIGN KEY (sponsor_id) references player(player_id)
);