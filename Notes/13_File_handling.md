# File Handling - Cloudinary & Multer

- To host our files we use cloudinary service. Make an account and follow Node.js installation instructions.
  ```
  npm i cloudinary
  ```

- Next we put file uploading in "cloudinary.js" and put it in utils.


- "fs" is file system of Node.js which handles file related methods.   
  ```
  import fs from 'fs'
  ```


- We use "fs" to unlink/remove temp upload files from our server if cloudinary upload fails.
  ```
  fs.unlinkSync(localFilePath)
  ```
  
  - unlinkSync() method make sure our file unlinked synchronusly.
  - Remember, almost all file system never delete files. Just un-couple it, so it's beyond access.


- We also need "Multer" package to handle form uploads.
  ```
  npm i multer
  ```


- In multer we use diskStorage() method becoz memoryStorage() has limited space to store.
  - If big files comes MemoryStorage may get corrupt.
  - With "cb"/callback we passed our temp folder where we store our file before uploading to cloudinary.
  - Also used "file.originalname" for simplification for now.