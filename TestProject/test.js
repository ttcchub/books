"use strict";

const mariadb = require("mariadb");

testA();

async function testA() {
  const options = {
    host: "localhost",
    port: 3306,
    user: "ILYA",
    password: "secret",
    database: "employeeDB",
  };
  //opens the connection
  const connection = await mariadb.createConnection(options);

  console.log("########## test 1 ############");
  let result = await connection.query("select * from employee");
  delete result.meta;
  console.log(result);
  console.log(result.map((item) => Object.values(item)));

  console.log("########## test 2 ############");
  result = await connection.query({
    rowsAsArray: true,
    sql: "select * from employee",
  });
  delete result.meta;
  console.log(result);

  console.log("########## test 3 ############");
  result = await connection.query("select * from employee where id=?", [2]);
  delete result.meta;
  console.log(result);

  //close connection
  connection.end();
}
