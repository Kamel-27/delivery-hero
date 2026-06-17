import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.raw(`
    CREATE TABLE password_resets (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      otp_hash TEXT NOT NULL UNIQUE,
      expires_at TIMESTAMP NOT NULL,
      created_at TIMESTAMP NOT NULL,
      consumed_at TIMESTAMP DEFAULT NULL
    );    
    create index idx_password_resets_user_id on password_resets(user_id);
    create index idx_password_resets_expires_at on password_resets(expires_at);
    
`);
}


export async function down(knex: Knex): Promise<void> {
    await knex.raw(`DROP TABLE IF EXISTS password_resets;`);
}

