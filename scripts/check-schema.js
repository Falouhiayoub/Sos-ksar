require('dotenv').config();
const postgres = require('postgres');

async function checkSchema() {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
        console.error('DATABASE_URL is not set');
        process.exit(1);
    }

    const sql = postgres(connectionString);

    try {
        const columns = await sql`
            SELECT table_schema, table_name, column_name, data_type 
            FROM information_schema.columns 
            WHERE table_schema IN ('public', 'neon_auth')
            ORDER BY table_schema, table_name, column_name
        `;

        console.log('\nDatabase Schema Dump:');
        let currentTable = '';
        columns.forEach(row => {
            const tableName = `${row.table_schema}.${row.table_name}`;
            if (tableName !== currentTable) {
                console.log(`\nTable: ${tableName}`);
                currentTable = tableName;
            }
            console.log(`  - ${row.column_name} (${row.data_type})`);
        });

    } catch (error) {
        console.error('Error querying schema:', error);
    } finally {
        await sql.end();
    }
}

checkSchema();
