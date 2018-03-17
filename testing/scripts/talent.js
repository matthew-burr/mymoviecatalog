$(document).ready($('#insert_button').click(handleInsert));

function handleInsert(event) {
  let talent = {
    first_name: $('#first_name').val(),
    last_name: $('#last_name').val(),
  };
  console.log(talent);
  fetch('/talent', {
    method: 'POST',
    body: JSON.stringify(talent),
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
