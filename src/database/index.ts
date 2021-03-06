import { createConnection, getConnectionOptions } from 'typeorm';

export default (async () => {
  const defaultOptions = await getConnectionOptions();
  const isTestEnv = process.env.NODE_ENV === 'test';

  const database = await createConnection(
    Object.assign(defaultOptions, {
      ...(isTestEnv && {
        database: './src/database/database.test.sqlite',
      }),
    }),
  );

  return database;
})();
