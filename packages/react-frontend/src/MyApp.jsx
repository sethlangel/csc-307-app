import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
    const [chars, setChars] = useState([])

    function fetchUsers(){
        return fetch("http://localhost:8000/users")
    }

    function removeOneCharacter(index){
        setChars(chars.filter((character, i) => {
            return i !== index;
        }))
    }

    function postUser(person) {
        const promise = fetch("Http://localhost:8000/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(person)
        });
      
        return promise;
      }

    function updateList(person) {
        postUser(person)
            .then((r) => {
                if (r.status === 201){
                    setChars([...chars, person])
                }
            })
            .catch((error) => {
            console.log(error);
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