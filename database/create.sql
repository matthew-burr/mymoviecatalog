CREATE SCHEMA IF NOT EXISTS mmc;

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
