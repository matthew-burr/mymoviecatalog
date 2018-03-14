const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static('build/public'));
app.all('*', (req, res) =>
  res.sendFile('index.html', {
    root: __dirname + '/build/public',
  }),
);
app.listen(PORT, () => console.log(`Listening on ${PORT}`));