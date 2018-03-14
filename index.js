const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static('public'));
app.all('*', (req, res) =>
  res.sendFile('index.html', {
    root: __dirname + '/public',
  }),
);
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
