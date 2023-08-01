insert into DEPARTMENT values (1, 'Отдел разработки');
insert into DEPARTMENT values (2, 'Отдел ИС');
insert into DEPARTMENT values (3, 'Техническа поддержка');

insert into DOLGNOST values (1, 'Инженер');
insert into DOLGNOST values (2, 'Ведущий инженер');
insert into DOLGNOST values (3, 'Начальник отдела');

insert into ROLES values (0, 'Администратор');
insert into ROLES values (1, 'Согласующий');
insert into ROLES values (2, 'Пользователь');

insert into STATUS values (0, 'Доступна');
insert into STATUS values (1, 'Не доступна');
insert into STATUS values (10, 'На рассмотрении');
insert into STATUS values (11, 'Согласовано');
insert into STATUS values (12, 'Отклонено');
insert into STATUS values (13, 'Отменено пользователем');
insert into STATUS values (14, 'Отменено системой');



create sequence USERS_SEQ
minvalue 1
maxvalue 99999999
start with 1
increment by 1
cache 20;


create or replace function USERS_BI() RETURNS trigger AS $$
begin
   -- получение нового ID записи
  if (coalesce(new.ID_USER, 0) <= 0) then
    select NEXTVAL('USERS_SEQ') into new.ID_USER;
  end if;
  return new;
end;
$$ LANGUAGE plpgsql;


CREATE TRIGGER USERS_BI_TR before insert on USERS
    FOR EACH ROW EXECUTE PROCEDURE USERS_BI();



-- пароль admin
insert into USERS (S_FAM, S_NAME, S_OTCH, EMAIL, S_PASSW, S_PHONE, ID_DEP, ID_DOLG, ID_ROLE)
	values ('Кодема', 'Вячеслав', 'Александрович', 'KodemaSlava@yandex.ru', '$2b$10$PuK8nRE5trlBqhbibrhW0uAIAbM9TiNFpaAMRCixuqusu73YYLA2O', '+79215634875', 1, 2, 0)
insert into USERS (S_FAM, S_NAME, S_OTCH, EMAIL, S_PASSW, S_PHONE, ID_DEP, ID_DOLG, ID_ROLE)
	values ('Ахтямова', 'Айгуль', '', 'aigul_mail@yandex.ru', '$2b$10$PuK8nRE5trlBqhbibrhW0uAIAbM9TiNFpaAMRCixuqusu73YYLA2O', '+79216234562', 1, 2, 0)



create sequence MEETING_ROOMS_SEQ
minvalue 1
maxvalue 99999999
start with 1
increment by 1
cache 20;


create or replace function MEETING_ROOMS_BI() RETURNS trigger AS $$
begin
   -- получение нового ID записи
  if (coalesce(new.ID_ROOM, 0) <= 0) then
    select NEXTVAL('MEETING_ROOMS_SEQ') into new.ID_ROOM;
  end if;
  return new;
end;
$$ LANGUAGE plpgsql;


CREATE TRIGGER MEETING_ROOMS_BI_TR before insert on MEETING_ROOMS
    FOR EACH ROW EXECUTE PROCEDURE MEETING_ROOMS_BI();



create sequence ORDERS_MEETING_ROOMS_SEQ
minvalue 1
maxvalue 99999999
start with 1
increment by 1
cache 20;


create or replace function ORDERS_MEETING_ROOMS_BI() RETURNS trigger AS $$
begin
   -- получение нового ID записи
  if (coalesce(new.ID_ORDER, 0) <= 0) then
    select NEXTVAL('ORDERS_MEETING_ROOMS_SEQ') into new.ID_ORDER;
  end if;
  return new;
end;
$$ LANGUAGE plpgsql;


CREATE TRIGGER ORDERS_MEETING_ROOMS_BI_TR before insert on ORDERS_MEETING_ROOMS
    FOR EACH ROW EXECUTE PROCEDURE ORDERS_MEETING_ROOMS_BI();



