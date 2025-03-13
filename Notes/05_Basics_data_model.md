# Basic Data Model

- We can have different data model styles in Mongoose.


- First let's assume we are making a todos app data model.
  - First create "models" folder which houses all models.
  - Next we make "todos" folder which will contain "todos" models only.


- We name our todo's first model as "user.models.js"
  - "models" is only there to denote that it's a model file.


- Any basic model file structure will have this:
  ```
  import mongoose from 'mongoose'

  const userSchema = new mongoose.Schema({})

  export const User = mongoose.model('User', userSchema)
  ```

- When our app is connected to MongoDB. These model files runs automatically.
  - based on above file our database created will be named in plural always.
  - like User will be renamed in DB as "users".


- We can simply define which data field need what data-type.
  ```
  const userSchema = new mongoose.Schema({
    username : String,
    email: String,
    isActive: Boolean
  })
  ```


- But we can get into more details also with each field details in object notation.
  - This give us advance validations.
  ```
  const loginSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      min: [6, "Password length should 6 minimum"]
    }
  })
  ```

- Beside normal data types, we also get "timestamp".
  - This give us "createdAt" and "updatedAt" fields.
  ```
  const loginSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true
    }
  }, { timestamps: true })
  ```


- We can also pass a value from one model to another model.
  - "type: mongoose.Schema.Types.ObjectId" -- syntax to refer to another model
  - ref: "User" -- here we pass ref of model which will be used as reference.

  ```
  const todoSchema = new mongoose.Schema({
    content: {
      type: String,
      required: true
    },
    completed: {
      type: Boolean,
      default: false
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    subTodos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubTodo"
      }
    ]
  }, { timestamps: true })
  ```