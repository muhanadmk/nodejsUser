import mysql from 'mysql';

export const db = mysql.createConnection({
  user: 'root',
  password: 'Muh*/19932011',
  database: 'userTest',
  port: '3306'
});

db.connect((err: Error) => {
  if (err) {
    console.log(err.message)
    throw err;
  }
  console.log('MySql Connected...');
});
