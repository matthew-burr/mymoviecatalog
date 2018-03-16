DROP SCHEMA mmc CASCADE;

CREATE SCHEMA IF NOT EXISTS mmc;
CREATE TYPE mmc.genre AS ENUM ('action', 'comedy', 'documentary', 'drama', 'romance');

CREATE TABLE IF NOT EXISTS mmc.talent (
  id SERIAL NOT NULL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  UNIQUE (first_name, last_name)
);

DELETE FROM mmc.talent;
INSERT INTO mmc.talent (first_name, last_name) VALUES
('Chris', 'Evans'),
('Chris', 'Hemsworth');

CREATE TABLE IF NOT EXISTS mmc.movie (
  id SERIAL NOT NULL PRIMARY KEY,
  title TEXT NOT NULL
);

DELETE FROM mmc.movie;
INSERT INTO mmc.movie (title) VALUES
('The Avengers'),
('The Avengers: Age of Ultron'),
('Captain America'),
('Thor');

CREATE TABLE IF NOT EXISTS mmc.movie_talent (
  movie_id INT NOT NULL REFERENCES mmc.movie (id),
  talent_id INT NOT NULL REFERENCES mmc.talent (id),
  UNIQUE (movie_id, talent_id) 
);

DELETE FROM mmc.movie_talent;
INSERT INTO mmc.movie_talent
SELECT
    m.id AS movie_id
  , t.id AS talent_id
  FROM mmc.movie AS m
  CROSS JOIN mmc.talent AS t
 WHERE (m.title LIKE 'The Avengers%')
    OR (m.title = 'Captain America' AND t.last_name = 'Evans')
    OR (m.title = 'Thor' AND t.last_name = 'Hemsworth');

CREATE TABLE mmc.movie_genre (
  movie_id INT NOT NULL REFERENCES mmc.movie(id),
  genre mmc.genre NOT NULL,
  PRIMARY KEY (movie_id, genre)
);

DELETE FROM mmc.movie_genre;
INSERT INTO mmc.movie_genre
SELECT
    m.id AS movie_id
  , g.genre AS genre
  FROM mmc.movie AS m
 CROSS JOIN (SELECT unnest(enum_range(NULL::mmc.genre)) AS genre) AS g
 WHERE (m.title LIKE 'The Avengers%' AND g.genre IN ('comedy'::mmc.genre, 'action'::mmc.genre))
    OR (m.title = 'Captain America' AND g.genre IN ('action'::mmc.genre, 'drama'::mmc.genre))
    OR (m.title = 'Thor' AND g.genre = 'action'::mmc.genre);

CREATE TABLE IF NOT EXISTS mmc.user (
  id SERIAL NOT NULL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  first_name TEXT NULL,
  last_name TEXT NULL,
  password TEXT NULL
);

DELETE FROM mmc.user;
INSERT INTO mmc.user (email) VALUES
('matt.d.burr@gmail.com'),
('mdburr@outlook.com');

CREATE TABLE IF NOT EXISTS mmc.user_movie (
  movie_id INT NOT NULL REFERENCES mmc.movie (id),
  user_id INT NOT NULL REFERENCES mmc.user (id),
  PRIMARY KEY (movie_id, user_id)
);

DELETE FROM mmc.user_movie;
INSERT INTO mmc.user_movie
SELECT 
    m.id AS movie_id
  , u.id AS user_id
  FROM mmc.movie AS m
 CROSS JOIN mmc.user AS u
 WHERE (u.email = 'matt.d.burr@gmail.com' AND m.title IN ('Captain America', 'The Avengers'))
    OR (u.email = 'mdburr@outlook.com' AND m.title IN ('The Avengers', 'Thor'));
 