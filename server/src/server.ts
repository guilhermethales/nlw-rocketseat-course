import express from 'express';

const app = express();

app.get('/users', (request, response) => {
  console.log('Users listing');

  response.json([
    'Guilherme',
    'Diego',
    'Robson',
    'Daniel'
  ]);
});

app.listen(3333);