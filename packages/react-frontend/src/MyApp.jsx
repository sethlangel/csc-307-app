import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
    const [chars, setChars] = useState([])

    function fetchUsers(){
        return fetch("http://localhost:8000/users")
    }

    function removeOneCharacter(id){
      const updated = chars.filter((char) => {
        return id !== char._id
      })
      setChars(updated)
    }

    function deleteCharacter(id){
      fetch(`http://localhost:8000/users/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res) => {
            if (res.status == 204) {
                removeOneCharacter(id);
            } else if (res.status == 404) {
                throw new Error("Resource not found.");
            } else {
                throw new Error("Error.");
            }
        })
        .catch((error) => {
            console.log(error);
        });
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
        .then((r) => {
          if (r.status === 201) {
            return r.json()
          }
        }).then((json) => {
          setChars([...chars, json])
        })
        .catch((error) => {
          console.error(error);
        });
    }

    useEffect(() => {
        fetchUsers()
          .then((res) => res.json())
          .then((json) => setChars(json))
          .catch((error) => {
            console.log(error);
          });
      }, []);

  return (
    <div>
        <Table characterData={chars} deleteCharacter={deleteCharacter}/>
        <Form handleSubmit={updateList}/>
    </div>
  );
}
export default MyApp;