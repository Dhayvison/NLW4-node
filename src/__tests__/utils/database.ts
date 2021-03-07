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

export async function truncate(entityName: string) {
  const entities = (await database).entityMetadatas;
  const entity = entities.find(ent => ent.name === entityName);

  const repository = (await database).getRepository(entityName);
  await repository.query(`DELETE FROM ${entity.tableName};`);
}
