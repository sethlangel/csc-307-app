function TableHeader() {
    return (
      <thead>
        <tr>
          <th>Name</th>
          <th>Job</th>
          <th>ID</th>
          <th>Remove</th>
        </tr>
      </thead>
    );
  }
  
  function TableBody(props) {
    return (
      <tbody>
        {props.characterData && props.characterData.map((row, index) => {
              return (
                <tr key={index}>
                    <td>{row.name}</td>
                    <td>{row.job}</td>
                    <td>{row._id}</td>
                    <td><button onClick={() => props.deleteCharacter(row._id)}>Remove</button></td>
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
        <TableBody characterData={props.characterData} deleteCharacter={props.deleteCharacter}/>
      </table>
    );
} export default Table;