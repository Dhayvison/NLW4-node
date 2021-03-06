import { createConnection, getConnectionOptions } from 'typeorm';

(async () => {
  const defaultOptions = await getConnectionOptions();
  const isTestEnv = process.env.NODE_ENV === 'test';

  createConnection(
    Object.assign(defaultOptions, {
      ...(isTestEnv && {
        database: './src/database/database.test.sqlite',
      }),
    }),
  );
})();
