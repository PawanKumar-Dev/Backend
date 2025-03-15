# Project Basics

- We can generate our .gitignore professional file by using "git ignore generator".

- Install "nodemon" for auto-restarting node.js server when detect changes in the directory.
  - Most time "nodemon" is installed as dev-dependency.
  - Only available when app is in development mode.
  ```
  npm install --save-dev nodemon
  ```

- Also modify "package.json" file acc to nodemon.
  ```
  "scripts": {
    "dev": "nodemon src/index.js"
  },
  ```

- Install "Prettier" package also for consistency. Also used as dev-dependency.
  - "-D" is shorthand of "--save-dev"
  ```
  npm i -D prettier
  ```

- Set basic config for Prettier in ".prettierrc" file
  ```
  {
    "singleQuote" : false,
    "bracketSpacing": true,
    "tabWidth" : 2,
    "trailingComma" : "es5",
    "semi" : true
  }
  ```

- Similar to ".gitignore", ".prettierignore" can be generated as well.