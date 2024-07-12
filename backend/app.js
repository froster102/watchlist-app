import express from 'express';

const app = express();

app.post('/api/auth', (req, res) => {
  res.send('auth');
});

app.get('/api/watchlist', (req, res) => {
  res.send('watchlist')
})




app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
