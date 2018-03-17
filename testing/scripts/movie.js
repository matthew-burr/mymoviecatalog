$(document).ready(() => {
  $('#movie_id').change(handleIDChange);
  $('#insert_button').click(handleInsert);
  $('#update_button').click(handleUpdate);
  $('#delete_button').click(handleDelete);
});

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

function writeResponse(text) {
  $('#response').text(text);
}
