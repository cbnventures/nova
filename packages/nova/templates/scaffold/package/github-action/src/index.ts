import { setFailed } from '@actions/core';

import { run } from './run.js';

run().catch((error) => {
  setFailed((error instanceof Error) ? error.message : String(error));

  return;
});
