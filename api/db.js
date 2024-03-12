import mysql from "mysql"
export const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'novelreading2',
    port:3307,
    charset: 'utf8mb4',
  });