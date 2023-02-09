"use strict"

const Database = require("./database");

const options = {
    host: "localhost",
    port: 3306,
    user: "ILYA",
    password: "secret",
    database: "employeeDB",
    allowPublicKeyRetrieval:true
  };

const db = new Database(options);

(async ()=>{
    try{
        const result = await db.doQuery('select * from employee')
        console.log(result)
        if(result.resultSet){
            for(const person of result.queryResult){
                console.log(`${person.firstname} ${person.lastname}`)
            }
        }
    }
    catch(error){
        console.log(error)
    }
})();