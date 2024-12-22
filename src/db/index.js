import pg from "pg";
import "dotenv/config";
const {Pool} = pg;
let dbDetails = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_DATABASE
};
const pool  = new Pool(dbDetails)

pool.on('error',(err, client)=>{
    console.log(`Some error occured: ${err}`);
})
export default pool