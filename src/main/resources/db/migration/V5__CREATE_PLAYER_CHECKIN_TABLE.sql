DROP TABLE IF EXISTS PLAYER_CHECKIN;
CREATE TABLE PLAYER_CHECKIN (
checkIn_id INT(10) auto_increment primary key,
event_id INT(10) not null,
player_id INT(10) not null,
check_in_status TINYINT default 0 not null,
created_date DATETIME not null,
created_by VARCHAR(100) not null,
updated_date DATETIME not null,
updated_by VARCHAR(100) not null,
active TINYINT default 1 not null,
FOREIGN KEY (event_id) references events(event_id),
FOREIGN KEY (player_id) references player(player_id)
);