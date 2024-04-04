import mysql from "mysql"
export const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'novelreading',
    port:3307,
    charset: 'utf8mb4',
  });