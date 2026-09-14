// Stub for @better-auth/kysely-adapter when using Drizzle/Postgres.
// Removes broken kysely@0.29.x migration constant imports from the bundle.
// Remove once better-auth ships the kysely/migration import fix.

export function getKyselyDatabaseType() {
  return null;
}

// biome-ignore lint/suspicious/useAwait: stub must stay async to match better-auth's adapter API
export async function createKyselyAdapter() {
  return { databaseType: null, kysely: null, transaction: undefined };
}

export default {};
