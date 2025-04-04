import React, { useState } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
    const [chars, setChars] = useState([])

    function updateList(person){
        setChars([...chars, person])
    }

    function removeOneCharacter(index){
        setChars(chars.filter((character, i) => {
            return i !== index;
        }))
    }

  return (
    <div>
        <Table characterData={chars} removeOneCharacter={removeOneCharacter}/>
        <Form handleSubmit={updateList}/>
    </div>
  );
}
export default MyApp;