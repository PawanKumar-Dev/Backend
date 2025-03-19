# Route Handling

- "App.js" file will handle main route import and pass base URL.
  ```
  import userRouter from './routes/user.routes.js'
  app.use("/api/v1/users", userRouter)
  ```


- In our "user.routes.js" file.
  ```
  import { Router } from 'express'
  import registerUser from '../controllers/user.controller.js'

  const router = Router()

  router.route("/register").post(registerUser)

  export default router
  ```


- "http://localhost:8000/api/v1/users" will be base url.

- And "register" will come from user router.

- Then our final url will be: "http://localhost:8000/api/v1/users/register"