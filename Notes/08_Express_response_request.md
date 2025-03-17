# Response & Request in Express JS

- Two most important things in Express JS we use is in API Reference:
  - Request
  - Response

- When you use app.use() in Express, we are adding middleware to your application.

  
- For example, here we set our cors configuration.
  ```
  app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
  }))
  ```

  - "origin : process.env.CORS_ORIGIN" Specifies which domain(s) are allowed to access resources.
  - "credentials: true" Requests allowed that include credentials (such as cookies, authorization headers, or TLS client certificates).


- We can set size limit on incoming JSON data. For example:
  ```
  app.use(express.json({ limit: "16kb" }))
  ```


- When accepting data via URL, express.js need this config.
  ```
  app.use(express.urlencoded({ extended: true, limit: "16kb" }))
  ```
  
  - "extended: true" Meaning it can handle nested objects and arrays.
  - "limit: 16kb" Set max size for incoming payload to 16 kb.


- "express.static()" middleware to serve assets that don’t need any processing. These files are referred as "static assets".