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

  - "origin : process.env.CORS_ORIGIN" This option specifies which domain(s) are allowed to access our resources.
  - "credentials: true" This option ensures requests that include credentials (such as cookies, authorization headers, or TLS client certificates) are allowed.


- 