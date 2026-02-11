require('dotenv').config();
const { drizzle } = require('drizzle-orm/postgres-js');
const postgres = require('postgres');

async function testConnection() {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString || connectionString.includes('YOUR_PASSWORD')) {
        console.error('ERROR: DATABASE_URL is not configured correctly. Please replace YOUR_PASSWORD with your actual database password.');
        process.exit(1);
    }

    const client = postgres(connectionString);
    const db = drizzle(client);

    try {
        console.log('Attempting to connect to database...');
        await client`SELECT 1`;
        console.log('Successfully connected to the database!');
        await client.end();
    } catch (error) {
        console.error('Failed to connect to the database:', error.message);
        process.exit(1);
    }
}

testConnection();
