import express from 'express'
import cors from 'cors'
const app = express()
const port = process.env.PORT || 3000

app.use(cors())

app.get('/api/jokes', (req, res) => {
  const jokes = [
    {
      id: 1,
      title: "joke 1",
      content: "Just some joke 1"
    },
    {
      id: 2,
      title: "joke 2",
      content: "Just some joke 2"
    },
    {
      id: 3,
      title: "joke 3",
      content: "Just some joke 3"
    },
    {
      id: 4,
      title: "joke 4",
      content: "Just some joke 4"
    },
    {
      id: 5,
      title: "joke 5",
      content: "Just some joke 5"
    },
  ]
  res.send(jokes)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
