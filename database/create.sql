DROP SCHEMA mmc CASCADE;

CREATE SCHEMA IF NOT EXISTS mmc;
CREATE TYPE mmc.genre AS ENUM ('action', 'comedy', 'documentary', 'drama', 'romance');

CREATE TABLE IF NOT EXISTS mmc.user (
  id SERIAL NOT NULL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  first_name TEXT NULL,
  last_name TEXT NULL,
  password TEXT NULL
);

DELETE FROM mmc.user;
INSERT INTO mmc.user (email, first_name, last_name, password) VALUES
('matt.d.burr@gmail.com', 'Matt', 'Burr', 'nothing'),
('mdburr@outlook.com', 'Matthew', 'Burr', 'also_nothing');

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
  user_id INT NOT NULL REFERENCES mmc.user (id),
  title TEXT NOT NULL UNIQUE,
  release_year INTEGER NULL,
  rating TEXT NULL,
  poster TEXT NULL
);

DELETE FROM mmc.movie;
INSERT INTO mmc.movie (user_id, title, release_year, rating, poster) VALUES
(1, 'The Avengers', 2012, 'PG-13', 'https://ia.media-imdb.com/images/M/MV5BMTk2NTI1MTU4N15BMl5BanBnXkFtZTcwODg0OTY0Nw@@._V1_SX300.jpg'),
(1, 'The Avengers: Age of Ultron', 2015, 'PG-13', 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTM4OGJmNWMtOTM4Ni00NTE3LTg3MDItZmQxYjc4N2JhNmUxXkEyXkFqcGdeQXVyNTgzMDMzMTg@._V1_SX300.jpg'),
(1, 'Captain America', 2011, 'PG-13', 'https://ia.media-imdb.com/images/M/MV5BMTYzOTc2NzU3N15BMl5BanBnXkFtZTcwNjY3MDE3NQ@@._V1_SX300.jpg'),
(1, 'Thor', 2011, 'PG-13', 'https://images-na.ssl-images-amazon.com/images/M/MV5BOGE4NzU1YTAtNzA3Mi00ZTA2LTg2YmYtMDJmMThiMjlkYjg2XkEyXkFqcGdeQXVyNTgzMDMzMTg@._V1_SX300.jpg');

CREATE TABLE IF NOT EXISTS mmc.movie_talent (
  movie_id INT NOT NULL REFERENCES mmc.movie (id) ON DELETE CASCADE,
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
  movie_id INT NOT NULL REFERENCES mmc.movie(id) ON DELETE CASCADE,
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