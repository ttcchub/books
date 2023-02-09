"use strict";

const mariadb = require("mariadb");

module.exports = class Database {
  constructor(options) {
    this.options = options;
  }

  doQuery(sql, parameters) {
    return new Promise(async (resolve, reject) => {
      let connection;
      try {
        connection = await mariadb.createConnection(this.options);
        let queryResult = await connection.query(sql, parameters);
        if (typeof queryResult === "undefined") {
          reject("Query error");
        } else if (typeof queryResult.affectedRows === "undefined") {
          delete queryResult.meta;
          resolve({ queryResult, resultSet: true });
        } else {
          resolve({
            queryResult: {
              rowsChanged: queryResult.affectedRows,
              insertId: queryResult.insertId,
              status: queryResult.warningStatus,
            },
            resultSet: false,
          });
        }
      } catch (error) {
        reject("SQL-error" + error);
      } finally {
        if (connection) connection.end();
      }
    });
  }
};