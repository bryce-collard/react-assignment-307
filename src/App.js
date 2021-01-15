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
    makePostCall(character).then(callResult => {
      if (callResult === true) {
        setCharacters([...characters, character]);
      }
    });
  }

  async function makePostCall(character) {
    return axios.post('http://localhost:5000/users', character)
     .then(function (response) {
       console.log(response);
       return (response.status === 200);
     })
     .catch(function (error) {
       console.log(error);
       return false;
     });
  }

  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeCharacter} />
      <Form handleSubmit={handleSubmit} />
    </div>
  );
}

export default App
