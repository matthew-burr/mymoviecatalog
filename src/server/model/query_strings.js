export const QUERY_STRINGS = {
  // Genre Queries
  SELECT_ALL_GENRES: 'SELECT unnest(enum_range(NULL::mmc.genre)) AS genre',
  SELECT_GENRE_MOVIES: `
    SELECT m.id, m.title 
      FROM mmc.movie_genre AS g
      JOIN mmc.movie AS m
        ON g.movie_id = m.id
     WHERE g.genre = $1::mmc.genre`,

  // Talent Queries
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
  `,

  // Movie Queries
  SELECT_ALL_MOVIES: 'SELECT * FROM mmc.movie',
  SELECT_ONE_MOVIE: 'SELECT * FROM mmc.movie WHERE id = $1',
  SELECT_MOVIE_GENRE: 'SELECT genre FROM mmc.movie_genre WHERE movie_id = $1',
  SELECT_MOVIE_TALENT: `
    SELECT t.*
      FROM mmc.talent AS t
      JOIN mmc.movie_talent AS m
        ON m.talent_id = t.id
     WHERE m.movie_id = $1`,
  INSERT_MOVIE: `
    INSERT INTO mmc.movie (title)
    VALUES ($1)
    RETURNING *`,
};
