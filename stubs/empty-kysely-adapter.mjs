// Stub for @better-auth/kysely-adapter when using Drizzle/Postgres.
// Removes broken kysely@0.29.x migration constant imports from the bundle.
// Remove once better-auth ships the kysely/migration import fix.

export function getKyselyDatabaseType() {
  return null;
}

export async function createKyselyAdapter() {
  return { kysely: null, databaseType: null, transaction: undefined };
}

export default {};
