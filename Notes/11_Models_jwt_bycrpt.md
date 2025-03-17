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

- For tokens we use jsonwebtoken package.
  ```
  npm i jsonwebtoken
  ```

- To define Access Token and Refresh Token we use mongoose methods() function again.
  ```
  import jwt from 'jsonwebtoken'

  userSchema.methods.generateAccessToken = async function () {
    return await jwt.sign(
      {
        _id: this._id,
        email: this.email,
        username: this.username,
        fullname: this.fullname
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
      }
    )
  }

  userSchema.methods.generateRefreshToken = async function () {
    return await jwt.sign(
      {
          _id: this._id
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
          expiresIn: process.env.REFRESH_TOKEN_EXPIRY
      }
    )
  }
  ```