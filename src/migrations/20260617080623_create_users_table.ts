import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.raw(`
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      email TEXT NOT NULL UNIQUE, 
      phone TEXT NOT NULL UNIQUE, 
      name TEXT NOT NULL,
      password_hash TEXT NOT NULL,
      system_role TEXT NOT NULL CHECK (system_role IN ('customer', 'vendor', 'rider', 'admin')),
      created_at TIMESTAMP NOT NULL,
      updated_at TIMESTAMP NOT NULL,
      deleted_at TIMESTAMP DEFAULT NULL
    );
    create index idx_users_email on users(email);
    create index idx_users_system_role on users(system_role);
    
    
  `);
}

export async function down(knex: Knex): Promise<void> {
    await knex.raw(`DROP TABLE IF EXISTS users;`);
}

