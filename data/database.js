const mysql=require("mysql2/promise");

//it consists a property for creating connection of pool

//information for connecting with data base
const pool=mysql.createPool({
    host:"localhost",//the host is the local server
    database:"blog_data",//which data base in the local host server
    user:"root",
    password:"adiyogi@123"//password to connect the local server
});
module.exports=pool;