const express = require("express");
const jwt = require("jsonwebtoken");
const connections = require("./db.js");
const app = express();
app.use(express.json());
const port = 3000;

let secret_key = "abcdefghijklmnopqrstuvwxyz0123456789";

app.get("/", (req, res) => {
  res.send("hello");
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  let sql = `select * from students where name=? and password=?`;
  connections.query(sql, [username, password], (err, result) => {
    if (err) {
      res.send(err);
    } else {
      if (result.length > 0) {
        let token = jwt.sign({ name: username, password: password }, secret_key);
        // res.send(token); 
        let up_sql=`update students set token=? where name=?`
        connections.query(up_sql,[token,username],(up_err,up_res)=>{
            if(up_err){
                res.send(err)
            }
            else{
                res.send("loginsuccess")
            }
        })
      } else {
        res.send("invalid credential");
      }
    }
  });
});

app.listen(port, () => {
  console.log("server has been running");
});
