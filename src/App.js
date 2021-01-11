import React, { useState } from 'react'
import Table from './Table'
import Form from './Form'

const App = props => {
  const [ state, setState ] = useState({ characters: [] })

  const removeCharacter = index => {
    const { characters } = state

    setState({
      characters: characters.filter((character, i) => {
        return i !== index
      }),
    })
  }

  const handleSubmit = character => {
    setState({ characters: [...this.state.characters, character] })
  }

  return (
    <div className="container">
      <Table characterData={state.characters} removeCharacter={removeCharacter} />
      <Form handleSubmit={handleSubmit}/>
    </div>
  );
}

export default App
