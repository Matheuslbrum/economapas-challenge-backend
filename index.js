import express from "express";
import cors from "cors";
import 'dotenv/config'
import db from "./src/db/index.js"

const app =  express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  const { userId } = req.body;

  db.query("SELECT * FROM city_group WHERE user_id = ?", [userId], (err, result) => {
    return res.json(result);
  })
})

app.post('/', (req, res) => {
  const { groupName, cities, userId } = req.body;

  console.log(JSON.stringify(cities));

  db.query("INSERT INTO city_group (user_id, name, cities) VALUES (?, ?, ?)", [userId, groupName, JSON.stringify(cities)], (err, result) => {
    if(err){
      return res.json(err);  
    }
    return res.json(result);
  })
})

app.delete('/', (req, res) => {
  const { groupId } = req.body;

  db.query(`DELETE FROM city_group WHERE id = ?`, [groupId], (err, result) => {
    if(err){
      return res.json(err);  
    }
    return res.json(result);
  })
})

app.listen(8888, () => {
  console.log("rodando na porta 8888")
})