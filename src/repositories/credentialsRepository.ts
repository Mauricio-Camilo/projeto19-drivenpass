import db from "../config/database.js";

export async function checkTitleCredential (title) {
    const checkTitle = await db.query(`
    SELECT * FROM credentials WHERE title = $1`, [title]);

    return checkTitle.rowCount;
}

export async function saveCredential (id, title, url, name, password) {
    await db.query(`
    INSERT INTO credentials ("userId", title, url, name, password)
    VALUES ($1, $2, $3, $4, $5)`, [id, title, url, name, password])
}