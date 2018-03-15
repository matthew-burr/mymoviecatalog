CREATE SCHEMA IF NOT EXISTS mmc;

CREATE TABLE IF NOT EXISTS mmc.talent (
  id SERIAL NOT NULL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  UNIQUE (first_name, last_name)
);

TRUNCATE TABLE mmc.talent;
INSERT INTO mmc.talent (first_name, last_name) VALUES
('Chris', 'Evans'),
('Chris', 'Hemsworth');