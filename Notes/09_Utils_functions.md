# Utils Functions

- Often we use Utils to create asynchronous error handler wrapper function for Express route handlers.

- When in express route handlers, using try-catch in every route can become repetitive.
- So by wrapping route handler with "asyncHandler()", we automatically catch any errors and return a formatted response.


- These async functions can use Async/Await or Promise structure.


- Example of Async/Await:
  ```
  const asyncHandler = (fn) => async (req, res, next) => {
    try {
      await fn(req, res, next)
    } catch (error) {
      res.status(error.code || 500)
         .json({ success: false, message: error.message })
    }
  }
  export default asyncHandler
  ```


- Example of Promise:
  ```
  const asyncHandler = (requestHandler) => {
    (req, res, next) => {
      Promise
          .resolve(requestHandler(req, res, next))
          .catch((error) => next(error))
    }
  }

  export default asyncHandler
  ```