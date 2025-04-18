import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
    const [chars, setChars] = useState([])

    function fetchUsers(){
        return fetch("http://localhost:8000/users")
    }

    function removeOneCharacter(id){
      fetch("http://localhost:8000/users" + `/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      }).then((r) => {
        if(r.status === 204){
          setChars(chars.filter((character) => {
            return id !== character.id;
        }))
        }
      }).catch((error) => {
        console.log(error)
      })
    }

    function postUser(person) {
      return fetch("http://localhost:8000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(person)
      });
    }
    
    function updateList(person) {
      postUser(person)
        .then(async (r) => {
          if (r.status === 201) {
            const data = await r.json();
            setChars([...chars, data]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }

    useEffect(() => {
        fetchUsers()
          .then((res) => res.json())
          .then((json) => setChars(json["users_list"]))
          .catch((error) => {
            console.log(error);
          });
      }, []);

  return (
    <div>
        <Table characterData={chars} removeOneCharacter={removeOneCharacter}/>
        <Form handleSubmit={updateList}/>
    </div>
  );
}
export default MyApp;