export const QUERY_STRINGS = {
  // User Queries
  ADD_USER: `
    INSERT INTO mmc.user (email, first_name, last_name, password) 
    VALUES ($1, $2, $3, $5) RETURNING id`,
  GET_USER: `SELECT * FROM mmc.user WHERE email = $1`,

  // Genre Queries
  SELECT_ALL_GENRES: 'SELECT unnest(enum_range(NULL::mmc.genre)) AS genre',
  SELECT_GENRE_MOVIES: `
    SELECT m.id, m.title 
      FROM mmc.movie_genre AS g
      JOIN mmc.movie AS m
        ON g.movie_id = m.id
      JOIN mmc.user_movie AS u
        ON u.movie_id = m.id
     WHERE g.genre = $1::mmc.genre
       AND u.user_id = $2`,

  // Talent Queries
  SELECT_ALL_TALENT: 'SELECT * FROM mmc.talent',
  SELECT_ONE_TALENT: 'SELECT * FROM mmc.talent WHERE id = $1',
  SELECT_TALENT_MOVIES: `
    SELECT m.id, m.title 
      FROM mmc.movie_talent AS t
      JOIN mmc.movie AS m
        ON t.movie_id = m.id
      JOIN mmc.user_movie AS u
        ON u.movie_id = m.id
     WHERE t.talent_id = $1
       AND u.user_id = $2`,
  INSERT_TALENT: `
    INSERT INTO mmc.talent (first_name, last_name)
    VALUES($1, $2)
    RETURNING *
  `,

  // Movie Queries
  SELECT_ALL_MOVIES: `
    SELECT id, title, poster 
      FROM mmc.movie
     WHERE user_id = $1`,
  SELECT_ONE_MOVIE: `
    SELECT * 
      FROM mmc.movie 
     WHERE id = $1
       AND user_id = $2)`,
  SELECT_MOVIE_GENRE: `
    SELECT genre 
      FROM mmc.movie_genre AS g
      JOIN mmc.movie AS m
        ON m.id = g.movie_id
     WHERE movie_id = $1
       AND user_id = $2`,
  SELECT_MOVIE_TALENT: `
    SELECT t.*
      FROM mmc.talent AS t
      JOIN mmc.movie_talent AS m
        ON m.talent_id = t.id
      JOIN mmc.movie AS u
        ON u.id = m.movie_id
     WHERE m.movie_id = $1
       AND u.user_id = $2`,
  INSERT_MOVIE: `
    INSERT INTO mmc.movie (title, release_year, rating, poster, user_id)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *`,
  UPDATE_MOVIE: `
    UPDATE mmc.movie
       SET title = $2
          ,release_year = $3
          ,rating = $4
          ,poster = $5
     WHERE id = $1
       AND user_id = $6
    RETURNING *
  `,
  DELETE_MOVIE: 'DELETE FROM mmc.movie WHERE id = $1 AND user_id = $2',
  ADD_TALENT_TO_MOVIE: `
    INSERT INTO mmc.movie_talent (movie_id, talent_id)
    SELECT $1, $2
      FROM mmc.movie
     WHERE id = $1
       AND user_id = $3
    RETURNING *`,
  DELETE_TALENT_FROM_MOVIE: `
    DELETE FROM mmc.movie_talent
     WHERE movie_id = $1
       AND talent_id = $2
       AND EXISTS (
         SELECT *
           FROM mmc.movie
          WHERE id = movie_id
            AND user_id = $3`,
  ADD_GENRE_TO_MOVIE: `
    INSERT INTO mmc.movie_genre (movie_id, genre)
    SELECT $1, $2
      FROM mmc.movie
     WHERE id = $1
       AND user_id = $3
    RETURNING *`,
  DELETE_GENRE_FROM_MOVIE: `DELETE FROM mmc.movie_genre 
      WHERE movie_id = $1 AND genre = $2
        AND EXISTS (
          SELECT *
            FROM mmc.movie
           WHERE id = movie_id
             AND user_id = $3`,
};
