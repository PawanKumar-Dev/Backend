# Utils Class - Error Handling Api & Response Api

- We add our own custom class to handle errors and standardized the response.
  - "Error" to which custom class extends is a Node.js core class.

  ```
  class ApiError extends Error {
    constructor(statusCode, message = "Something Went Wrong", errors = [], stack = "") {
      super(message)
      this.statusCode = statusCode
      this.data = null
      this.message = message
      this.success = false
      this.errors = errors

      if (stack) {
        this.stack = stack
      } else {
        Error.captureStackTrace(this, this.constructor)
      }
    }
  }
  export default ApiError
  ```


- Similarly we can edit reponse api also.
  ```
  class ApiRespnse {
    constructor(statusCode, data, message = "Success") {
      this.statusCode = statusCode
      this.data = data
      this.message = message
      this.success = statusCode < 400
    }
  }
  export default ApiRespnse
  ```