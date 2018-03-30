$(document).ready(() => {
  let token = '';
  $('#submit').click(event => {
    event.preventDefault();
    let username = $('#username').val();
    let password = $('#password').val();
    fetch('/log_in', {
      method: 'POST',
      body: JSON.stringify({
        username: username,
        password: password,
        token: token,
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.success) token = data.token;
      })
      .catch(err => console.log(err));
  });
});
