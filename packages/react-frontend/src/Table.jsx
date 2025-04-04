function TableHeader() {
    return (
      <thead>
        <tr>
          <th>Name</th>
          <th>Job</th>
          <th>Remove</th>
        </tr>
      </thead>
    );
  }
  
  function TableBody(props) {
    return (
      <tbody>
        {props.characterData.map((row, index) => {
            return (
                <tr key={index}>
                    <td>{row.name}</td>
                    <td>{row.job}</td>
                    <td><button onClick={() => props.removeOneCharacter(index)}>Remove</button></td>
                </tr>
            )
        })}
      </tbody>
    );
  }

  function Table(props) {
    return (
      <table>
        <TableHeader />
        <TableBody characterData={props.characterData} removeOneCharacter={props.removeOneCharacter}/>
      </table>
    );
} export default Table;