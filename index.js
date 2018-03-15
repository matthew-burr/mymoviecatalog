const express = require('express');
const talent = require('./build/server/model/talent.js');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static('build/public'));
app.get('/talent', (req, res) => {
  talent
    .getTalent()
    .then(data => res.json(data))
    .catch(error => console.log(error));
});

app.all('*', (req, res) =>
  res.sendFile('index.html', {
    root: __dirname + '/build/public',
  })
);
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
