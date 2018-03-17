'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  SELECT_ALL_TALENT: 'SELECT * FROM mmc.talent',
  SELECT_ONE_TALENT: 'SELECT * FROM mmc.talent WHERE id = $1',
  SELECT_TALENT_MOVIES: `
    SELECT m.id, m.title 
      FROM mmc.movie_talent AS t
      JOIN mmc.movie AS m
        ON t.movie_id = m.id
     WHERE t.talent_id = $1`,
  INSERT_TALENT: `
    INSERT INTO mmc.talent (first_name, last_name)
    VALUES($1, $2)
    RETURNING *
  `
};