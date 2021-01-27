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

  const removeCharacter = id => {
    makeDeleteCall(id).then(success => {
      if (success) {
        setCharacters(
          characters.filter((character, i) => {
            return character._id !== id
          })
        )
      }
    })

  }

  async function makeDeleteCall(id) {
    return axios.delete(`http://localhost:5000/users/${id}`)
      .then(function (response) {
        console.log(response);
        return (response.status === 204);
      })
      .catch(function (error) {
        console.log(error);
        return false;
      })
  }

  const handleSubmit = character => {
    makePostCall(character).then(newCharacter => {
      if (newCharacter) {
        setCharacters([...characters, newCharacter]);
      }
    });
  }

  async function makePostCall(character) {
    return axios.post('http://localhost:5000/users', character)
      .then(function (response) {
        console.log(response);
        return response.data;
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
