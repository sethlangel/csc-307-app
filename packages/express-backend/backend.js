import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userService from "./services/user-services.js"

dotenv.config();

const { MONGO_CONNECTION_STRING } = process.env;

mongoose.set("debug", true);
mongoose.connect(MONGO_CONNECTION_STRING + "users").catch((error) => console.log(error));


const app = express();
const port = 8000;

app.use(cors())
app.use(express.json());

//REST API ROUTES
//GET
app.get("/", (req, res) => {
  res.send("Hello World!");
});
  
app.get("/users", (req, res) => {
const name = req.query.name;
const job = req.query.job;

userService.getUsers(name, job).then((r) => res.send(r))
.catch((err) => console.log(err))});  

app.get("/users/:id", (req,res) => {
  const id = req.params["id"]
  userService.findUserById(id).then((r) => res.status(200).send(r)).catch((err) => console.log(err))
})

//POST
app.post("/users", (req,res) => {
    let userToAdd = req.body
    userService.addUser(userToAdd).then((r) => res.status(201).send(r))
})

//DELETE
app.delete("/users/:id", (req,res) => {
  const id = req.params["id"]  
  userService.removeUserById(id).then(res.status(204).send()).catch((err) => console.log(err))
})


//LISTEN
app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});