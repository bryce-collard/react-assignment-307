import React, { useEffect, useState } from 'react'
import Table from './Table'
import Form from './Form'
import axios from 'axios'

const App = props => {
  const [characters, setCharacters] = useState([])

  useEffect(() => {
    axios.get('http://localhost:5000/users')
      .then(res => {
        const characters = res.data.users_list;
        setCharacters(characters);
      })
      .catch(function (error) {
        //Not handling the error. Just logging into the console.
        console.log(error);
      });
  }, []);

  const removeCharacter = index => {
    setCharacters(
      characters.filter((character, i) => {
        return i !== index
      })
    )
  }

  const handleSubmit = character => {
    setCharacters([...characters, character])
  }

  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeCharacter} />
      <Form handleSubmit={handleSubmit} />
    </div>
  );
}

export default App
