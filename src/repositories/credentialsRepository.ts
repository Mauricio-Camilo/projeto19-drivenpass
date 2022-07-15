// import db from "../config/database.js";

// export async function checkTitleCredential (title) {
//     const checkTitle = await db.query(`
//     SELECT * FROM credentials WHERE title = $1`, [title]);

//     return checkTitle.rowCount;
// }

// export async function saveCredential (id, title, url, name, password) {
//     await db.query(`
//     INSERT INTO credentials ("userId", title, url, name, password)
//     VALUES ($1, $2, $3, $4, $5)`, [id, title, url, name, password])
// }

// export async function getCredentials (id : number) {
//     const credentials = await db.query (
//         `SELECT * FROM credentials WHERE "userId" = $1`, [id]);
//     return credentials.rows;
// }

// export async function getCredentialById (id : number) {
//     const credential = await db.query (
//         `SELECT * FROM credentials WHERE "id" = $1`, [id]);
//     return credential.rows[0];
// }

// export async function deleteCredentials (id : number) {
//     console.log(id);
//     await db.query (
//         `DELETE FROM credentials WHERE id=$1`, [id]);
// }

