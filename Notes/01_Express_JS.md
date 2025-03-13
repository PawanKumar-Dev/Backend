# Express JS

- Creating our backend with Express.js is simple.
  ```
  npm install express
  ```

- Express simplifies our request/response cycle from server. For example:
  ```
  const express = require('express')    // "CommonJS" module style of JS.
  const app = express()                 // express provide "app"
  const port = 3000                     // listening on port for "http" requests

  app.get('/', (req, res) => {
    res.send('Hello World!')
  })

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
  ```

- "app" creates a new Express application instance.
    - Meaning "app" act both as object and function.
    - As function it handles HTTP requests
    - As object with provide methods (like get, post, etc.) to define routes, middleware and start server.


- In computer networking, a port is a communication endpoint.
    - When server runs, it listens for requests sent to this port.
    - By listening to 3000, we are directing our server to use that "channel" for handling all its HTTP traffic.


- When trying to use ES6 module syntax of "import" in Express.js.
  - Mention "type" : "module" in your pacakge.json file.


- Note: Never forget to put "/" before any url you pass.