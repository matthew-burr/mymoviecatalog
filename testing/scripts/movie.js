$(document).ready(() => {
  $('#movie_id').change(handleIDChange);
  $('#insert_button').click(handleInsert);
  $('#update_button').click(handleUpdate);
});

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
