An example of the option object for constructor:

mysql.server start

```js
{
    host: "localhost",
    port: 3306,
    user: "ILYA",
    password: "secret",
    database: "employeeDB",
};
```
## Method **doQuery(sql, parameters)**

### Method usage
```js
const result = await db.doQuery("select * from employee")
```

```js
const result = await db.doQuery("select * from employee where id=?",[1])
```
Result:
```js
[
  {
    id: 2,
    firstname: 'Mary',
    lastname: 'Jones',
    department: 'admin',
    salary: '7000.00'
  }
]
```