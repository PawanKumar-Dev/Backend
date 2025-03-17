# Models - JWT and Bycrpt

- To encrypt password in "user.models.js", we install package "bcrypt".
  ```
  npm i bcrypt
  ```

- Then use mongoose pre() function to encrypt our password just before saving it in DB. 
  ```
  import bcrypt from 'bcrypt'

  userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next()

    this.password = await bcrypt.hash(this.password, 10)
    next()
  })
  ```

- Using mongoose methods() function, we can define a custom function to check and verify our password.
  ```
  userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
  }
  ```

- 