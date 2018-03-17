$(document).ready($('#insert_button').click(handleInsert));

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
