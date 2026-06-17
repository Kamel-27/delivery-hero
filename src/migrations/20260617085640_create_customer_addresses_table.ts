import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.raw(
        `
        CREATE TABLE customer_addresses(
            id SERIAL PRIMARY KEY,
            user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            label TEXT NOT NULL,
            country TEXT NOT NULL,
            city TEXT NOT NULL,
            street_address TEXT NOT NULL,
            building_number INT,
            apartment_number INT,
            created_at TIMESTAMP NOT NULL,
            type TEXT NOT NULL CHECK (type IN ('Home', 'Work', 'Other')),
            lat DECIMAL(10,7) NOT NULL,
            lng DECIMAL(10,7) NOT NULL,
            is_default BOOLEAN NOT NULL
        );
        create index idx_customer_addresses_user_id on customer_addresses(user_id);
        `
    )
}


export async function down(knex: Knex): Promise<void> {
        await knex.raw(`
    DROP TABLE customer_addresses;
    `)
}

