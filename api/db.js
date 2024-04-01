import mysql from "mysql"
export const db = mysql.createConnection({
    host: '192.168.1.3',
    user: 'root',
    password: '',
    database: 'novelreading',
    port:3307,
    charset: 'utf8mb4',
  });