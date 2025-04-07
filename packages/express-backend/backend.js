import express from "express";

const app = express();
const port = 8000;

const users = {
    users_list: [
      {
        id: "xyz789",
        name: "Charlie",
        job: "Janitor"
      },
      {
        id: "abc123",
        name: "Mac",
        job: "Bouncer"
      },
      {
        id: "ppp222",
        name: "Mac",
        job: "Professor"
      },
      {
        id: "yat999",
        name: "Dee",
        job: "Aspring actress"
      },
      {
        id: "zap555",
        name: "Dennis",
        job: "Bartender"
      }
    ]
  };

app.use(express.json());

//Helper Functions
const findUserByName = (name) => 
  users["users_list"].filter((user) => user["name"] === name);

const findUserByNameAndJob = (name, job) => 
  users["users_list"].filter((user) => user["name"] === name && user["job"] === job)

const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

const addUser = (user) => {
    users["users_list"].push(user)
    return user
}

const deleteUserByName = (name) => 
  users["users_list"] = users["users_list"].filter((user) => user["name"] !== name)

const deleteUserById = (id) => 
  users["users_list"] = users["users_list"].filter((user) => user["id"] !== id)

//REST API ROUTES
//GET
app.get("/", (req, res) => {
  res.send("Hello World!");
});
  
app.get("/users", (req, res) => {
const name = req.query.name;
const job = req.query.job;

if (name != undefined && job != undefined) {
    let result = findUserByNameAndJob(name, job);
    result = { users_list: result };
    res.send(result);
} else if (name != undefined) {
    let result = findUserByName(name)
    result = { users_list: result }
    res.send(result)
} else {
    res.send(users);
}
});  

app.get("/users/:id", (req,res) => {
  const id = req.params["id"]
  let result = findUserById(id)

  if(result){
      res.send(result)
  } else {
      res.status(404).send("Resource not found.")
  }
})

//POST
app.post("/users", (req,res) => {
    const userToAdd = req.body
    addUser(userToAdd)
    res.send()
})

//DELETE
app.delete("/users", (req,res) => {
  const name = req.query["name"]
  let result = findUserByName(name)

  if(result.length > 0){
    deleteUserByName(name)
    res.send()
  } else {
    res.status(404).send("Resource not found.")
  }
})

app.delete("/users/:id", (req,res) => {
  const id = req.params["id"]  
  let result = findUserById(id)

  if(result){
      deleteUserById(id)
      res.send()
  } else {
      res.status(404).send("Resource not found.")
  }
})


//LISTEN
app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});