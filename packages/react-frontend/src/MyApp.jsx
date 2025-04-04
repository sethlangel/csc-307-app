import React, { useState } from "react";
import Table from "./Table";

function MyApp() {
    const [chars, setChars] = useState([
            {
                name: "Charlie",
                job: "Janitor"
            },
            {
                name: "Mac",
                job: "Bouncer"
            },
            {
                name: "Dee",
                job: "Aspiring actress"
            },
            {
                name: "Dennis",
                job: "Bartender"
            }
        ]
    )

    function removeOneCharacter(index){
        setChars(chars.filter((character, i) => {
            return i !== index;
        }))
    }

  return (
    <div>
      <Table characterData={chars} removeOneCharacter={removeOneCharacter}/>
    </div>
  );
}
export default MyApp;