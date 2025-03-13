# Dot env package

- Dot env package allow us to declare our environment variables and access them as well
  ```
  npm i dotenv
  ```

- Then we set our env variables in ".env" files.
  ```
  PORT=3000
  ```

- In our file, where we want use .env variables, we import the package and use it.
  ```
  require('dotenv').config()

  app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`)
  })
  ```

- Do remember .env are private data. So avoid uploading and sharing it at Github like repo.