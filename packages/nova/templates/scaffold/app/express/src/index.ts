import express from 'express';

const app = express();
const port = 3000;

app.get('/', (_req, res) => {
  res.json({ message: 'Welcome to [__PROJECT_SLUG__]' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
