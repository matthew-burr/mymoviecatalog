$(document).ready(() => {
  addOptionsToGenreSelect();
  $('#movie_id').change(handleIDChange);
  $('#talent_id').change(handleTalentIDChange);
  $('#insert_button').click(handleInsert);
  $('#update_button').click(handleUpdate);
  $('#delete_button').click(handleDelete);
  $('#addTalent_button').click(handleAddTalent);
  $('#deleteTalent_button').click(handleDeleteTalentButton);
  $('#addGenre_button').click(handleAddGenreButton);
  $('#deleteGenre_button').click(handleDeleteGenreButton);
});

function handleDeleteGenreButton(event) {
  let movie_id = $('#movie_id').val();
  let genre = $('#genre_select').val();
  fetch(`/movies/${movie_id}/genres/${genre}`, {
    method: 'DELETE',
    headers: new Headers({
      'content-type': 'application/json',
    }),
  })
    .then(res => res.json())
    .catch(err => writeResponse(err))
    .then(data => writeResponse(JSON.stringify(data)));
}

function handleAddGenreButton(event) {
  let movie_id = $('#movie_id').val();
  let genre = $('#genre_select').val();
  fetch(`/movies/${movie_id}/genres/${genre}`, {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json',
    }),
  })
    .then(res => {
      return res.json();
    })
    .catch(err => {
      writeResponse(err);
    })
    .then(data => {
      writeResponse(JSON.stringify(data));
    });
}

function handleDeleteTalentButton(event) {
  let movie_id = $('#movie_id').val();
  let talent_id = $('#talent_id').val();
  fetch(`/movies/${movie_id}/talent/${talent_id}`, {
    method: 'DELETE',
    headers: new Headers({
      'content-type': 'application/json',
    }),
  })
    .then(res => {
      return res.json();
    })
    .catch(err => {
      writeResponse(err);
    })
    .then(data => {
      writeResponse(JSON.stringify(data));
    });
}

function handleAddTalent(event) {
  let movie_id = $('#movie_id').val();
  let talent_id = $('#talent_id').val();
  fetch(`/movies/${movie_id}/talent/${talent_id}`, {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json',
    }),
  })
    .then(res => {
      return res.json();
    })
    .catch(err => {
      writeResponse(err);
    })
    .then(data => {
      writeResponse(JSON.stringify(data));
    });
}

function handleDelete(event) {
  let movie_id = $('#movie_id').val();
  fetch(`/movies/${movie_id}`, {
    method: 'DELETE',
    headers: new Headers({
      'content-type': 'application/json',
    }),
  })
    .then(res => {
      return res.json();
    })
    .catch(err => {
      writeResponse(err);
    })
    .then(data => {
      if (data && data.length == 0) {
        $('#movie_id').val('');
        $('#title').val('');
      }
      writeResponse(JSON.stringify(data));
    });
}

function handleUpdate(event) {
  let movie = {
    title: $('#title').val(),
  };
  let movie_id = $('#movie_id').val();
  fetch(`/movies/${movie_id}`, {
    method: 'PUT',
    body: JSON.stringify(movie),
    headers: new Headers({
      'content-type': 'application/json',
    }),
  })
    .then(res => {
      return res.json();
    })
    .catch(err => {
      writeResponse(err);
    })
    .then(data => {
      writeResponse(JSON.stringify(data));
    });
}

function handleInsert(event) {
  let movie = {
    title: $('#title').val(),
  };
  console.log(movie);
  fetch('/movies', {
    method: 'POST',
    body: JSON.stringify(movie),
    headers: new Headers({
      'content-type': 'application/json',
    }),
  })
    .then(res => {
      return res.json();
    })
    .catch(err => {
      $('#response').text(err);
    })
    .then(data => {
      $('#response').text(JSON.stringify(data));
    });
}

function handleTalentIDChange(event) {
  let id = $('#talent_id').val();
  fetch(`/talent/${id}`, {
    method: 'GET',
    headers: new Headers({
      'content-type': 'application/json',
    }),
  })
    .then(res => {
      return res.json();
    })
    .then(obj => {
      if (obj && obj.length > 0)
        $('#talent_name').text(`${obj[0].first_name} ${obj[0].last_name}`);
    });
}

function handleIDChange(event) {
  let id = $('#movie_id').val();
  fetch(`/movies/${id}`, {
    method: 'GET',
    headers: new Headers({
      'content-type': 'application/json',
    }),
  })
    .then(res => {
      return res.json();
    })
    .then(obj => {
      if (obj && obj.length > 0) $('#title').val(obj[0].title);
    });
}

function addOptionsToGenreSelect() {
  fetch('/genres', {
    method: 'GET',
    headers: new Headers({
      'content-type': 'application/json',
    }),
  })
    .then(res => {
      return res.json();
    })
    .catch(err => {
      writeResponse(err);
    })
    .then(data => {
      let options = data
        .map(genre => `<option value="${genre.genre}">${genre.genre}</option>`)
        .join('');
      $('#genre_select').html(options);
    });
}
function writeResponse(text) {
  $('#response').text(text);
}
