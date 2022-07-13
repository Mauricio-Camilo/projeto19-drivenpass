import pg from "pg";

import dotenv from "dotenv";
dotenv.config();

const dbConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl: null
}

if (process.env.MODE === "PROD") {
    dbConfig.ssl = {
        rejectUnauthorized: false
    }
}

const { Pool } = pg;
const db = new Pool(dbConfig);

export default db;