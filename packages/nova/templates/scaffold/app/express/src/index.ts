import express from 'express';

/**
 * Index - App.
 *
 * Creates the Express application for the generated workspace.
 * Routes can be added directly or split into modules as the service grows.
 *
 * @since 0.0.0
 */
const app = express();

/**
 * Index - Port.
 *
 * Defines the local listening port used by the starter application.
 * Consumers can replace it with validated environment configuration later.
 *
 * @since 0.0.0
 */
const port = 3000;

app.get('/', (_req, res) => {
  res.json({ message: 'Welcome to [__PROJECT_SLUG__]' });

  return;
});

app.listen(port, () => {
  process.stdout.write(`Server running at http://localhost:${port}\n`);

  return;
});
