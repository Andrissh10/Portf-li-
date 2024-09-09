import sqlite3 from "sqlite3";

const sqlite = sqlite3.verbose();
const db = new sqlite.Database("loginsystem.sqlite3");

export const initializeTable = () => {
    db.serialize(() => {
        db.run(
            "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, password TEXT)"
        );
    });
};

export function createUser(data) {
    return new Promise((resolve, reject) =>{
        db.all(
            `SELECT COUNT(id) as count FROM users WHERE email = '${data.email}'`,
            (err, row) => {
                if (err) throw err;
                if (row[0].count > 0) {
                    reject("Email is already is use!");
                } else {
                    db.prepare("INSERT INTO users VALUES(?, ?, ?)")
                    .run(null, data.email, data.password)
                    .finalize();
                    resolve("User has been created succesfully!");
                }
            }
        )
    } )
}

export function authenticate(data) {
    return new Promise((resolve, reject) => {
        db.all(
            `SELECT * FROM users WHERE email = '${data.email}' AND password = '${data.password}'`,
            (err, row) => {
                if (err) throw err;

                if(row.length === 0) {
                    reject("Invalid credentials!");
                } else {
                    resolve("Authenticated");
                }
            }
        )
    })
}