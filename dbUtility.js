const sql = require('mssql');

const config = {
    user: 'sa',
    password: 'sadguru',
    server: 'PAMBA//MSSQLMS',
    database: 'db_Suntek',
    connectionTimeout: 30000, 
    requestTimeout: 30000,  
    options: {
        encrypt: true,
        trustServerCertificate: true
    },
    driver: 'tedious'
};

async function executeQuery(query) {
    try {
        console.log("hiop");
        const pool = await sql.connect(config);
        const result = await pool.request().query(query);
        console.log(query);
        return result.recordset;
    } catch (err) {
        console.error('Error executing query:', err);
        throw err;
    } finally {
        await sql.close();
    }
}





module.exports = {
    executeQuery
    
};
