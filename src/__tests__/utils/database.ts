import database from '../../database';

export async function runMigrations() {
  return await (await database).runMigrations();
}

export async function dropDatabase() {
  if (process.env.NODE_ENV !== 'test') {
    console.error(
      `Error: The current Node environment (${process.env.NODE_ENV}) is not for testing`,
    );
  }
  return await (await database).dropDatabase();
}
