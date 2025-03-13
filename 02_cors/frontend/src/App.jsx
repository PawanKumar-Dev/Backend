import axios from 'axios'
import { useEffect, useState } from 'react'

function App() {
  const [jokes, setJokes] = useState([])

  useEffect(() => {
    axios.get("http://localhost:3000/api/jokes")
      .then((response) => {
        setJokes(response.data)
      })
      .catch((error) => {
        console.log(error);
      })
  }, [])

  return (
    <>
      <h2>App</h2>
      <p>Jokes: {jokes.length}</p>
      <ul>
        {jokes.map((joke) => <li key={joke.id}>{joke.content}</li>)}
      </ul>
    </>
  )
}

export default App