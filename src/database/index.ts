import { createConnection, getConnectionOptions } from 'typeorm';

export default (async () => {
  const defaultOptions = await getConnectionOptions();
  const isTestEnv = process.env.NODE_ENV === 'test';
  const isProdEnv = process.env.NODE_ENV === 'production';

  const database = await createConnection(
    Object.assign(defaultOptions, {
      ...(isTestEnv && {
        database: './src/database/database.test.sqlite',
      }),
      ...(isProdEnv && {
        database: './dist/src/database/database.sqlite',
        entities: ['./dist/src/models/**.js'],
        migrations: ['./dist/src/database/migrations/**.js'],
        cli: {
          migrationsDir: './dist/src/database/migrations',
        },
      }),
    }),
  );

  if (isProdEnv) {
    await database.runMigrations();
  }

  return database;
})();
