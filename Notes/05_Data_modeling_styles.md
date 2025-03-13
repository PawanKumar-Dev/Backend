# Data Modelling Styles

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


- First modelling style will be where we simply define which data field need what data-type.
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
  const customerSchema = new mongoose.Schema({
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

- 