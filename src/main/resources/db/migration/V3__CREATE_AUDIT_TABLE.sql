DROP TABLE IF EXISTS AUDIT;
CREATE TABLE AUDIT (
audit_id INT(10) auto_increment primary key,
action_type VARCHAR(100) not null,
description VARCHAR(1000) not null,
created_date DATETIME not null,
created_by VARCHAR(10) not null,
active TINYINT default 1 not null
);