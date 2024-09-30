# 0x05. NodeJS Basics

## Resources
[Node JS getting started](https://nodejs.org/en/learn/getting-started/introduction-to-nodejs)
[Process API doc](https://node.readthedocs.io/en/latest/api/process/)
[Child process](https://nodejs.org/api/child_process.html)
[Express getting started](https://expressjs.com/en/starter/installing.html)
[Mocha documentation](https://mochajs.org/)
[Nodemon documentation](https://github.com/remy/nodemon#nodemon)
## Learning Objectives
<details>
<summary>run javascript using NodeJS</summary>
Node.js is a runtime environment that allows you to execute JavaScript code outside of a web browser. 

#### Steps to Run JavaScript with Node.js
**1. Install Node.js:** 
- Download and install Node.js from the official website: [nodejs.org](https://nodejs.org/en).
- The installer includes npm (Node Package Manager), which is useful for managing packages.

**2. Create a JavaScript File:** Use a text editor to create a new file with a .js extension. For example, app.js
```js
// app.js
console.log("Hello, World!");

// Function to add two numbers
function add(a, b) {
    return a + b;
}

// Call the add function
const sum = add(5, 3);
console.log("The sum is:", sum);
```
**3. Run the JavaScript File Using Node.js:**
```bash
node app.js
```
**Conclusion**
Running JavaScript with Node.js allows you to execute scripts on your local machine, making it a powerful tool for developing server-side applications, command-line tools, and scripts. Node.js also provides access to various built-in modules for file handling, networking, and more, enabling a wide range of functionalities.
</details>
<details>
<summary>use NodeJS modules</summary>
Node.js has a built-in module system that lets you create and use modules easily.

### Steps to Use Node.js Modules
**1. Create a Module:**
Create a new file for your module, e.g., ``mathUtils.js``.
```javascript
// mathUtils.js
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

module.exports = {
    add,
    subtract
};
```
In this example, ``mathUtils.js`` exports two functions: ``add`` and ``subtract``.

**2. Use the Module in Another File:**
Create another file, e.g., ``app.js``, where you will import and use the module.
```javascript
// app.js
const mathUtils = require('./mathUtils');

const sum = mathUtils.add(5, 3);
const difference = mathUtils.subtract(5, 3);

console.log("Sum:", sum);            // Output: Sum: 8
console.log("Difference:", difference); // Output: Difference: 2
```
Here, ``require('./mathUtils')`` imports the ``mathUtils`` module, allowing you to use its functions.

**3. Run the Main File:**

```bash
node app.js
```
**Output** 
```makefile
Sum: 8
Difference: 2
```
#### Explanation
- **Module Exporting:** The ``module.exports`` object allows you to specify which functions or variables should be available to other files.
- **Module Importing:** The ``require()`` function is used to import modules. The path to the module is provided as a string, and if it's in the same directory, it starts with ./.
#### Built-in Modules
Node.js also comes with many built-in modules like ``fs`` (file system), ``http`` (for creating web servers), and ``path`` (for handling file paths). Here's an example of using the fs module to read a file:

```javascript
// app.js
const fs = require('fs');

fs.readFile('example.txt', 'utf8', (err, data) => {
    if (err) {
        console.error("Error reading file:", err);
        return;
    }
    console.log("File content:", data);
});
```
In this example, the fs.readFile function reads the contents of example.txt, and if successful, logs it to the console.
</details>
<details>
<summary>use process to access command line arguments and the environment</summary>

``process`` module used to access command line arguments and environment variables. 

#### Accessing Command Line Arguments
``process.argv`` to access command line arguments, which is an array containing the command line arguments passed when starting the Node.js process.

**1. Command Line Arguments:**
- The first element (``process.argv[0]``) is the path to the Node.js executable.
- The second element (``process.argv[1]``) is the path to your script.
- Subsequent elements contain the additional command line arguments.

**Example: Accessing Command Line Arguments**
Create a file named args.js:

```javascript
// args.js
const args = process.argv.slice(2); // Get arguments starting from the third element

console.log("Command line arguments:");
args.forEach((arg, index) => {
    console.log(`${index + 1}: ${arg}`);
});
```
**Running the Script**
```bash
node args.js firstArgument secondArgument
```
**Output**
```yaml
Command line arguments:
1: firstArgument
2: secondArgument
```

#### Accessing Environment Variables
``process.env`` to access environment variables, which is an object containing the user environment.

**Example: Accessing Environment Variables**
Create a file named env.js:
```javascript
// env.js
console.log("Environment Variables:");
for (const key in process.env) {
    console.log(`${key}: ${process.env[key]}`);
}
```
**Running the Script**
```bash
node env.js
```
**Output**
This will output all the environment variables set in your current environment.

#### Accessing Specific Environment Variables
You can also access specific environment variables directly:
```javascript
// specificEnv.js
const path = process.env.PATH; // Access the PATH environment variable
console.log(`Current PATH: ${path}`);
```
**Summary**
``process.argv`` to access command line arguments.
``process.env`` to access environment variables.
</details>
<details>
<summary>create a small HTTP server using Node JS</summary>

#### Step 1: Set Up Your Project
**1. Create a new directory for your project:**
```bash
mkdir my-http-server
cd my-http-server
```
**2. Initialize a new Node.js project:**
```bash
npm init -y
```
#### Step 2: Create the HTTP Server
Create a file named server.js:

```javascript
const http = require('http');

// Create an HTTP server
const server = http.createServer((req, res) => {
    // Set the response HTTP header with HTTP status and content type
    res.writeHead(200, { 'Content-Type': 'text/plain' });

    // Send the response body "Hello World"
    res.end('Hello World\n');
});

// Server listens on port 3000
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
```
#### Step 3: Run the Server
Run your server using Node.js:
```bash
node server.js
```
#### Step 4: Access the Server
- Open your web browser and go to ``http://localhost:3000/``.
- You should see: ``Hello World``.

#### Explanation of the Code
- **Importing the HTTP Module:** ``const http = require('http');`` imports the built-in HTTP module.
- **Creating the Server:** ``http.createServer()`` creates an HTTP server that takes a callback function with two parameters: ``req`` (the request object) and ``res`` (the response object).
- **Sending a Response:** ``res.writeHead(200, { 'Content-Type': 'text/plain' });`` sets the status code to ``200 OK`` and the content type to plain text.
    + ``res.end('Hello World\n');`` sends the response body and ends the response.
- **Listening on a Port:** ``server.listen(PORT, () => {...});`` makes the server listen for incoming requests on the specified port (3000 in this case) and logs a message to the console when it's running.
</details>
<details>
<summary>create a small HTTP server using Express JS</summary>
Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. Here’s how to set up a basic Express server:

#### Step 1: Set Up Your Project
**1. Create a new directory for your project:**
```bash
mkdir my-express-server
cd my-express-server
```
**2. Initialize a new Node.js project:**
```bash
npm init -y
```
**3. Install Express:**
```bash
npm install express
```
#### Step 2: Create the Express Server
Create a file named server.js:
```javascript
const express = require('express');
const app = express();

// Define a route
app.get('/', (req, res) => {
    res.send('Hello World');
});

// Set the port
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}/`);
});
```
#### Step 3: Run the Server
```bash
node server.js
```
#### Step 4: Access the Server
- Open your web browser and go to ``http://localhost:3000/``.
- You should see: ``Hello World``.

#### Explanation of the Code
- **Importing Express:** ``const express = require('express');`` imports the Express module.
- **Creating an Application Instance:** ``const app = express();`` creates an Express application.
- **Defining a Route:** ``app.get('/', (req, res) => {...});`` defines a route that listens for GET requests on the root URL (``/``). When a request is received, it sends back a response with the text "Hello World".
- **Setting the Port and Starting the Server:** ``app.listen(PORT, () => {...});`` tells the application to listen on the specified port (3000) and logs a message when the server is running.
</details>
<details>
<summary>HTTP server using Node.js vs Express.js (Base Level vs Framework)</summary>

#### 1. Base Level vs Framework

- **Node.js:** When you create an HTTP server with Node.js, you are using the built-in ``http`` module directly. This requires more boilerplate code for handling requests and responses.
- **Express.js:** Express is a web framework built on top of Node.js that simplifies the process of creating servers and handling routes. It abstracts away much of the repetitive code.

#### 2. Code Complexity
- **Node.js Example:** Requires manual handling of HTTP methods, request parsing, and response management.
```javascript
const http = require('http');

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello, World!\n');
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});
```
- **Express.js Example:** Provides a more straightforward and cleaner API for defining routes and middleware.
```javascript
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});
```
#### 3. Routing and Middleware
- **Node.js:** Routing must be handled manually; you would need to parse the URL and HTTP methods yourself.
- **Express.js:** Built-in routing capabilities allow you to define routes easily and use middleware for processing requests (like body parsing, authentication, etc.).
#### 4. Features and Extensibility
- **Node.js:** You would need to implement additional features like error handling, query parsing, and serving static files yourself.
- **Express.js:** Provides built-in features and plugins for session management, error handling, and more, which makes development faster and easier.

In summary, using Node.js for a simple HTTP server gives you low-level control, while using Express.js provides a more robust framework that simplifies development.
| Feature                     | Node.js HTTP Server                           | Express.js HTTP Server                         |
|-----------------------------|----------------------------------------------|------------------------------------------------|
| **Framework**               | Built-in `http` module                       | Web framework built on top of Node.js         |
| **Code Complexity**         | More boilerplate code                        | Simplified and cleaner syntax                  |
| **Routing**                 | Manual routing logic required                 | Built-in routing capabilities                   |
| **Middleware Support**      | No built-in middleware; must implement manually | Extensive middleware support for processing requests |
| **Error Handling**          | Manual error handling                        | Built-in error handling mechanisms              |
| **Static File Serving**     | Must implement custom logic                  | Built-in methods for serving static files      |
| **Learning Curve**          | More technical and less intuitive            | Easier for beginners due to simplicity         |
| **Use Cases**               | Suitable for lightweight applications         | Ideal for larger applications or APIs          |
| **Community and Ecosystem** | Limited to core Node.js libraries            | Large ecosystem of plugins and middleware      |

</details>
<details>
<summary>create advanced routes with Express JS</summary>

#### 1. Install Express:
If you haven't already, create a new Node.js project and install Express:
```bash
npm init -y
npm install express
```
#### 2. Set Up Your Express App: 
Create a file called ``app.js`` and set up your basic Express application.
```javascript
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); // To parse JSON request bodies
```
#### 3. Define Advanced Routes:
```javascript
// Basic route
app.get('/', (req, res) => {
    res.send('Welcome to the homepage!');
});

// Route with parameters
app.get('/users/:userId', (req, res) => {
    const userId = req.params.userId;
    res.send(`User ID: ${userId}`);
});

// Route with query strings
app.get('/search', (req, res) => {
    const { q } = req.query; // e.g., /search?q=express
    res.send(`Search query: ${q}`);
});

// Route with middleware
const logRequest = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next(); // Call the next middleware/route handler
};

app.use(logRequest);

// Nested routes
const productsRouter = express.Router();

productsRouter.get('/', (req, res) => {
    res.send('List of products');
});

productsRouter.get('/:productId', (req, res) => {
    const productId = req.params.productId;
    res.send(`Product ID: ${productId}`);
});

app.use('/products', productsRouter); // Mount products router
```
#### 4. Start the Server: Finally, add the code to start your server:
```javascript
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
```
**Complete Code Example**
```javascript
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const logRequest = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
};

app.use(logRequest);

app.get('/', (req, res) => {
    res.send('Welcome to the homepage!');
});

app.get('/users/:userId', (req, res) => {
    const userId = req.params.userId;
    res.send(`User ID: ${userId}`);
});

app.get('/search', (req, res) => {
    const { q } = req.query;
    res.send(`Search query: ${q}`);
});

const productsRouter = express.Router();

productsRouter.get('/', (req, res) => {
    res.send('List of products');
});

productsRouter.get('/:productId', (req, res) => {
    const productId = req.params.productId;
    res.send(`Product ID: ${productId}`);
});

app.use('/products', productsRouter);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
```
**Testing the Routes**
You can test the following routes in your browser or using tools like Postman:

- ``GET /`` — Welcome message
- ``GET /users/123`` — Shows User ID: 123
- ``GET /search?q=express`` — Shows Search query: express
- ``GET /products`` — List of products
- ``GET /products/456`` — Shows Product ID: 456
</details>
<details>
<summary>use ES6 with Node JS with Babel-node</summary>
Babel is a JavaScript compiler that allows developers to use the latest JavaScript features while maintaining compatibility with older browsers and environments. It transforms ES6 (and beyond) code into a backward-compatible version of JavaScript, enabling developers to write modern syntax and features without worrying about browser support.

#### Key Features of Babel:
- **Transpilation:** Converts modern JavaScript code into a version that can run in older environments.
- **Plugins and Presets:** Supports a wide range of plugins and presets that allow developers to customize the transpilation process according to their needs.
- **Support for JSX:** Enables the use of JSX, a syntax extension used in React, which allows HTML-like code in JavaScript.
- **Polyfills:** Provides polyfills for new features, allowing them to work in environments that do not support them natively.
Babel is widely used in modern web development, especially in frameworks like React, Vue, and Angular, to ensure compatibility across different browsers and environments.

### How to use Babel
To use ES6 features in Node.js with Babel, you need to set up Babel and configure it to transpile your ES6 code. Here’s a step-by-step guide:

#### Step 1: Initialize Your Project
**1. Create a New Directory:**
```bash
mkdir my-es6-project
cd my-es6-project
```
**2. Initialize a New Node.js Project:**
```bash
npm init -y
```
#### Step 2: Install Babel
```bash
npm install @babel/core @babel/cli @babel/preset-env @babel/node --save-dev
```
#### Step 3: Create Babel Configuration
Create a file named ``.babelrc`` in the root of your project and add the following:
```json
{
  "presets": ["@babel/preset-env"]
}
```
#### Step 4: Write ES6 Code
Create Your Main JavaScript File: ``index.js`` and write some ES6 code.
```javascript
// index.js
const greet = (name) => {
    console.log(`Hello, ${name}!`);
};

greet('World');
```
#### Step 5: Run Your Code with Babel
```bash
npx babel-node index.js
```
#### Step 6: Optional - Add Scripts to Package.json
To make it easier to run your code, you can add a script to your package.json:
```json
"scripts": {
   "start": "babel-node index.js"
}
```
Now you can run your application using:
```bash
npm start
```
**Complete Directory Structure**
Your project structure should look like this:
```go
my-es6-project/
├── .babelrc
├── index.js
└── package.json
```
**Summary**
Using Babel with Node.js allows you to take advantage of ES6 features, such as arrow functions, template literals, and more. By setting up Babel as described, you can easily write and run modern JavaScript code.
</details>
<details>
<summary>use Nodemon to develop faster</summary>
Nodemon is a utility that automatically monitors for changes in your Node.js applications and automatically restarts the server when it detects changes. This is especially useful during development, as it saves you the hassle of manually stopping and restarting your application every time you make a code change.

#### Key Features of Nodemon:
- **Automatic Restart:** It watches files in your project and restarts the application whenever a file changes.
- **File Watching:** You can configure it to watch specific file types or directories, making it customizable to your workflow.
- **Configuration Options:** Nodemon allows various configuration options, such as specifying which files to watch, ignoring certain files, and setting the command to run.
- **Integration with npm:** You can easily add it as a script in your package.json for convenience.

#### How to Use Nodemon:
**1. Installation:** You can install Nodemon globally or as a development dependency in your project:
```bash
npm install -g nodemon  # Global installation
```
or

```bash
npm install --save-dev nodemon  # Local installation
```
**2. Running Your Application:** Instead of running your application with ``node app.js``, you run it with:
```bash
nodemon app.js
```
**3. Using with npm Scripts:** You can add a script to your ``package.json``:
```json
"scripts": {
  "start": "nodemon app.js"
}
```
Then run it using:
```bash
npm start
```
**Example Usage:**
If you have a simple Node.js application in ``app.js``:
```javascript
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
```
You can start it with Nodemon:
```bash
nodemon app.js
```
Now, any time you make changes to app.js, Nodemon will automatically restart the server, reflecting your changes without manual intervention. This greatly enhances productivity during development.

#### Local vs Global intallation
| **Aspect**           | **Global Installation**                                 | **Local Installation**                                |
|----------------------|--------------------------------------------------------|------------------------------------------------------|
| **Command**          | `npm install -g nodemon`                               | `npm install --save-dev nodemon`                     |
| **Scope**            | Available system-wide; can be used in any project.    | Available only in the specific project directory.    |
| **Usage**            | Run using `nodemon` command from anywhere in the terminal. | Run using `npx nodemon` or via npm scripts.         |
| **Package.json**     | Not listed in the project's `package.json` file.      | Listed under `devDependencies` in `package.json`.    |
| **Updates**          | Requires manual updates globally.                       | Can be updated per project, ensuring version control. |
| **Purpose**          | Useful for tools and utilities you want to access anywhere. | Best for project-specific dependencies.               |

</details>

## Provided files
**``database.csv``**
```csv
firstname,lastname,age,field
Johann,Kerbrou,30,CS
Guillaume,Salou,30,SWE
Arielle,Salou,20,CS
Jonathan,Benou,30,CS
Emmanuel,Turlou,40,CS
Guillaume,Plessous,35,CS
Joseph,Crisou,34,SWE
Paul,Schneider,60,SWE
Tommy,Schoul,32,SWE
Katie,Shirou,21,CS
```
**``package.json``**
```json
{
  "name": "node_js_basics",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "lint": "./node_modules/.bin/eslint",
    "check-lint": "lint [0-9]*.js",
    "test": "./node_modules/mocha/bin/mocha --require babel-register --exit",
    "dev": "nodemon --exec babel-node --presets babel-preset-env ./server.js ./database.csv"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "chai-http": "^4.3.0",
    "express": "^4.17.1"
  },
  "devDependencies": {
    "babel-cli": "^6.26.0",
    "babel-preset-env": "^1.7.0",
    "nodemon": "^2.0.2",
    "eslint": "^6.4.0",
    "eslint-config-airbnb-base": "^14.0.0",
    "eslint-plugin-import": "^2.18.2",
    "eslint-plugin-jest": "^22.17.0",
    "chai": "^4.2.0",
    "mocha": "^6.2.2",
    "request": "^2.88.0",
    "sinon": "^7.5.0"
  }
}
```
**``babel.config.js``**
```javascript
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
  ],
};
```
**``.eslintrc.js``**
```javascript
module.exports = {
  env: {
    browser: false,
    es6: true,
    jest: true,
  },
  extends: [
    'airbnb-base',
    'plugin:jest/all',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['jest'],
  rules: {
    'max-classes-per-file': 'off',
    'no-underscore-dangle': 'off',
    'no-console': 'off',
    'no-shadow': 'off',
    'no-restricted-syntax': [
      'error',
      'LabeledStatement',
      'WithStatement',
    ],
  },
  overrides:[
    {
      files: ['*.js'],
      excludedFiles: 'babel.config.js',
    }
  ]
};
```
and…
Don’t forget to run ``$ npm install`` when you have the ``package.json``

## Tasks
### 0. Executing basic javascript with Node JS
In the file ``0-console.js``, create a function named ``displayMessage`` that prints in ``STDOUT`` the string argument.
```bash
$ cat 0-main.js
const displayMessage = require('./0-console');

displayMessage("Hello NodeJS!");

$ node 0-main.js
Hello NodeJS!
``` 
### 1. Using Process stdin
Create a program named ``1-stdin.js`` that will be executed through command line:
- It should display the message ``Welcome to Holberton School``, what is your name? (followed by a new line)
- The user should be able to input their name on a new line
- The program should display ``Your name is: INPUT``
- When the user ends the program, it should display ``This important software is now closing`` (followed by a new line)

**Requirements:**
Your code will be tested through a child process, make sure you have everything you need for that.
```bash
$ node 1-stdin.js 
Welcome to Holberton School, what is your name?
Bob
Your name is: Bob
$ 
$ echo "John" | node 1-stdin.js 
Welcome to Holberton School, what is your name?
Your name is: John
This important software is now closing
``` 
### 2. Reading a file synchronously with Node JS
Using the database ``database.csv``, create a function ``countStudents`` in the file ``2-read_file.js``
- Create a function named ``countStudents``. It should accept a path in argument
- The script should attempt to read the database file synchronously
- If the database is not available, it should throw an error with the text ``Cannot load the database``
- If the database is available, it should log the following message to the console ``Number of students: NUMBER_OF_STUDENTS``
- It should log the number of students in each field, and the list with the following format: ``Number of students in FIELD: 6. List: LIST_OF_FIRSTNAMES``
- CSV file can contain empty lines (at the end) - and they are not a valid student!
```bash
$ cat 2-main_0.js
const countStudents = require('./2-read_file');

countStudents("nope.csv");

$ node 2-main_0.js
2-read_file.js:9
    throw new Error('Cannot load the database');
    ^

Error: Cannot load the database
...
$
$ cat 2-main_1.js
const countStudents = require('./2-read_file');

countStudents("database.csv");

$ node 2-main_1.js
Number of students: 10
Number of students in CS: 6. List: Johann, Arielle, Jonathan, Emmanuel, Guillaume, Katie
Number of students in SWE: 4. List: Guillaume, Joseph, Paul, Tommy
``` 
### 3. Reading a file asynchronously with Node JS
Using the database ``database.csv``, create a function ``countStudents`` in the file ``3-read_file_async.js``

- Create a function named ``countStudents``. It should accept a path in argument (same as in ``2-read_file.js``)
- The script should attempt to read the database file asynchronously
- The function should return a Promise
- If the database is not available, it should throw an error with the text ``Cannot load the database``
- If the database is available, it should log the following message to the console ``Number of students: NUMBER_OF_STUDENTS``
- It should log the number of students in each field, and the list with the following format: ``Number of students in FIELD: 6. List: LIST_OF_FIRSTNAMES``
- CSV file can contain empty lines (at the end) - and they are not a valid student!
```bash
$ cat 3-main_0.js
const countStudents = require('./3-read_file_async');

countStudents("nope.csv")
    .then(() => {
        console.log("Done!");
    })
        .catch((error) => {
        console.log(error);
    });

$ node 3-main_0.js
Error: Cannot load the database
...
$
$ cat 3-main_1.js
const countStudents = require('./3-read_file_async');

countStudents("database.csv")
    .then(() => {
        console.log("Done!");
    })
        .catch((error) => {
        console.log(error);
    });
console.log("After!");

$ node 3-main_1.js
After!
Number of students: 10
Number of students in CS: 6. List: Johann, Arielle, Jonathan, Emmanuel, Guillaume, Katie
Number of students in SWE: 4. List: Guillaume, Joseph, Paul, Tommy
Done!
```
**Tips:** Using asynchronous callbacks is the preferred way to write code in Node to avoid blocking threads
 
### 4. Create a small HTTP server using Node's HTTP module
In a file named ``4-http.js``, create a small HTTP server using the ``http`` module:
- It should be assigned to the variable ``app`` and this one must be exported
- HTTP server should listen on port 1245
- Displays ``Hello Holberton School!`` in the page body for any endpoint as plain text
In terminal 1:
```bash
$ node 4-http.js
...
```
In terminal 2:
```bash
$ curl localhost:1245 && echo ""
Hello Holberton School!
$ curl localhost:1245/any_endpoint && echo ""
Hello Holberton School!
```
 
### 5. Create a more complex HTTP server using Node's HTTP module
In a file named ``5-http.js``, create a small HTTP server using the ``http`` module:
- It should be assigned to the variable app and this one must be exported
- HTTP server should listen on port 1245
- It should return plain text
- When the URL path is `/`, it should display `Hello Holberton School!` in the page body
- When the URL path is `/students`, it should display `This is the list of our students` followed by the same content as the file ``3-read_file_async.js`` (with and without the database) - the name of the database must be passed as argument of the file
- CSV file can contain empty lines (at the end) - and they are not a valid student!
Terminal 1:
```bash
$ node 5-http.js database.csv
...
```
In terminal 2:
```bash
$ curl localhost:1245 && echo ""
Hello Holberton School!
$ 
$ curl localhost:1245/students && echo ""
This is the list of our students
Number of students: 10
Number of students in CS: 6. List: Johann, Arielle, Jonathan, Emmanuel, Guillaume, Katie
Number of students in SWE: 4. List: Guillaume, Joseph, Paul, Tommy
```
### 6. Create a small HTTP server using Express
Install Express and in a file named ``6-http_express.js``, create a small HTTP server using Express module:
- It should be assigned to the variable ``app`` and this one must be exported
- HTTP server should listen on port 1245
- Displays ``Hello Holberton School!`` in the page body for the endpoint /
In terminal 1:
```bash
$ node 6-http_express.js
...
```
In terminal 2:
```bash
$ curl localhost:1245 && echo ""
Hello Holberton School!
$ 
$ curl localhost:1245/any_endpoint && echo ""
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Error</title>
</head>
<body>
<pre>Cannot GET /lskdlskd</pre>
</body>
</html> 
```
### 7. Create a more complex HTTP server using Express
In a file named ``7-http_express.js``, recreate the small HTTP server using ``Express``:
- It should be assigned to the variable app and this one must be exported
- HTTP server should listen on port 1245
- It should return plain text
- When the URL path is ``/``, it should display ``Hello Holberton School!`` in the page body
- When the URL path is ``/students``, it should display ``This is the list of our students`` followed by the same content as the file ``3-read_file_async.js`` (with and without the database) - the name of the database must be passed as argument of the file
- CSV file can contain empty lines (at the end) - and they are not a valid student!
Terminal 1:
```bash
$ node 7-http_express.js database.csv
...
```
In terminal 2:
```bash
$ curl localhost:1245 && echo ""
Hello Holberton School!
$ 
$ curl localhost:1245/students && echo ""
This is the list of our students
Number of students: 10
Number of students in CS: 6. List: Johann, Arielle, Jonathan, Emmanuel, Guillaume, Katie
Number of students in SWE: 4. List: Guillaume, Joseph, Paul, Tommy
```
### 8. Organize a complex HTTP server using Express
Obviously writing every part of a server within a single file is not sustainable. Let’s create a full server in a directory named ``full_server``.

Since you have used ES6 and Babel in the past projects, let’s use ``babel-node`` to allow to use ES6 functions like import or export.

#### 8.1 Organize the structure of the server
- Create 2 directories within:
    + ``controllers``
    + ``routes``
- Create a file ``full_server/utils.js``, in the file create a function named ``readDatabase`` that accepts a file path as argument:
    + It should read the database asynchronously
    + It should return a promise
    + When the file is not accessible, it should reject the promise with the error
    + When the file can be read, it should return an object of arrays of the firstname of students per fields
#### 8.2 Write the App controller
Inside the file ``full_server/controllers/AppController.js``:
- Create a class named ``AppController``. Add a static method named ``getHomepage``
- The method accepts ``request`` and ``response`` as argument. It returns a 200 status and the message ``Hello Holberton School!``
#### 8.3 Write the Students controller
Inside the file ``full_server/controllers/StudentsController.js``, create a class named ``StudentsController``. Add two static methods:

**The first one is ``getAllStudents``:**
- The method accepts ``request`` and ``response`` as argument
- It should return a status 200
- It calls the function ``readDatabase`` from the ``utils`` file, and display in the page:
    + First line: ``This is the list of our students``
    + And for each field (order by alphabetic order case insensitive), a line that displays the number of students in the field, and the list of first names (ordered by appearance in the database file) with the following format: ``Number of students in FIELD: 6. List: LIST_OF_FIRSTNAMES``
- If the database is not available, it should return a status 500 and the error message ``Cannot load the database``
**The second one is ``getAllStudentsByMajor``:**

- The method accepts ``request`` and ``response`` as argument
- It should return a status 200
- It uses a parameter that the user can pass to the browser ``major``. The ``major`` can only be ``CS`` or ``SWE``. If the user is passing another parameter, the server should return a 500 and the error ``Major parameter must be CS or SWE``
- It calls the function ``readDatabase`` from the ``utils`` file, and display in the page the list of first names for the students (ordered by appearance in the database file) in the specified field ``List: LIST_OF_FIRSTNAMES_IN_THE_FIELD``
- If the database is not available, it should return a status 500 and the error message ``Cannot load the database``
#### 8.4 Write the routes
Inside the file ``full_server/routes/index.js``:
- Link the route ``/`` to the ``AppController``
- Link the route ``/students`` and ``/students/:major`` to the ``StudentsController``
#### 8.5 Write the server reusing everything you created
Inside the file named ``full_server/server.js``, create a small Express server:
- It should use the routes defined in ``full_server/routes/index.js``
- It should use the port ``1245``
#### 8.6 Update ``package.json`` (if you are running it from outside the folder ``full_server``)
If you are starting node from outside of the folder ``full_server``, you will have to update the command ``dev`` by: ``nodemon --exec babel-node --presets babel-preset-env ./full_server/server.js ./database.csv``

**Warning:**
- Don’t forget to export your express app at the end of ``server.js`` (``export default app;``)
- The database filename is passed as argument of the ``server.js`` BUT, for testing purpose, you should retrieve this filename at the execution (when ``getAllStudents`` or ``getAllStudentsByMajor`` are called for example)
In terminal 1:
```bash
$ npm run dev
...
```
In terminal 2:
```bash
$ curl localhost:1245 && echo ""
Hello Holberton School!
$ 
$ curl localhost:1245/students && echo ""
This is the list of our students
Number of students in CS: 6. List: Johann, Arielle, Jonathan, Emmanuel, Guillaume, Katie
Number of students in SWE: 4. List: Guillaume, Joseph, Paul, Tommy
$ 
$ curl localhost:1245/students/SWE && echo ""
List: Guillaume, Joseph, Paul, Tommy
$ 
$ curl localhost:1245/students/French -vvv && echo ""
*   Trying 127.0.0.1...
* TCP_NODELAY set
* Connected to localhost (127.0.0.1) port 1245 (#0)
> GET /students/SWES HTTP/1.1
> Host: localhost:1245
> User-Agent: curl/7.58.0
> Accept: */*
>
< HTTP/1.1 500 Internal Server Error
< X-Powered-By: Express
< Date: Mon, 06 Jul 2020 03:29:00 GMT
< Connection: keep-alive
< Content-Length: 33
<
* Connection #0 to host localhost left intact
Major parameter must be CS or SWE
```
If you want to add test to validate your integration, you will need to add this file: .babelrc
```
{
    "presets": [["env", {"exclude": ["transform-regenerator"]}]]
}
```