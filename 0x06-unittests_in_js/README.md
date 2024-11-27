# 0x06. Unittests in JS
## Resources
[Mocha documentation](https://mochajs.org/)
[Chai](https://www.chaijs.com/api/)
[Sinon](https://sinonjs.org/releases/v7.5.0/)
[Express](https://expressjs.com/en/guide/routing.html)
[Request](https://www.npmjs.com/package/request)
[How to Test NodeJS Apps using Mocha, Chai and SinonJS](https://www.digitalocean.com/community/tutorials/how-to-test-nodejs-apps-using-mocha-chai-and-sinonjs)

## Learning Objectives
<details>
<summary>How to use Mocha to write a test suite<summary>

### Mocha
Mocha is a test runner. This just means that it is a tool that runs and executes our tests.
#### 1. Install mocha globally to be able to use it on command line:
```bash
npm install -g mocha
```
#### 2. Create test directory and test files
```bash
mkdir test && cd test
touch myTest.js
```
#### 3 Write a test suite using Mocha
In the test file, you can organize tests using Mocha’s ``describe`` and ``it`` blocks.
```javascript
const assert = require('assert');

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.strictEqual([1, 2, 3].indexOf(4), -1);
    });

    it('should return the index when the value is present', function() {
      assert.strictEqual([1, 2, 3].indexOf(2), 1);
    });
  });
});
```
#### 4. Run the test suite

- **Modify package.json:**
```json
"scripts": {
  "test": "mocha"
}
```
- **run the test suite:** Mocha will automatically look for test files in the test directory by default. `npm test`

### How ``describe`` works:

- ``describe()`` is a function provided by Mocha that allows you to group related tests together. In your case, it's grouping tests for "Math operations".
- Inside the ``describe()`` block, individual tests are defined using the ``it()`` function. Each ``it()`` block represents a single test case.

### Example
#### Step 1: Define the Function
``mathOperations.js``
```javascript
// Define the function that adds two numbers
const myAddFunction = (a, b) => a + b;

// Export the function so it can be imported in other files
module.exports = myAddFunction;
```
#### Step 2: Create the Test File
``mathOperations.test.js``
```javascript
const assert = require('assert');
// Import the function from the other file
const myAddFunction = require('./mathOperations');

describe('Math operations', function() {
  // Test case for adding two numbers
  it('should add two numbers correctly', function() {
    const result = myAddFunction(1, 1); // Call the function being tested
    assert.strictEqual(result, 2);      // Check if the result is exactly 2
  });

  // Additional test case for adding negative numbers
  it('should add two negative numbers correctly', function() {
    const result = myAddFunction(-1, -1);
    assert.strictEqual(result, -2);
  });
});
```
</details>
<details>
<summary>How to use different assertion libraries (Node or Chai)</summary>

### 1. Using Node.js ``assert`` Module
The ``assert`` module comes built into Node.js. It offers basic assertion methods like ``strictEqual``, ``deepEqual``, and others.

| Assertion Method                       | Description                                               | Example
        |
|----------------------------------------|-----------------------------------------------------------|--------------------------------------------------------------|
| `assert.strictEqual(a, b)`            | Checks if `a` is strictly equal to `b` (===).            | `assert.strictEqual(1, '1'); // Fails (type difference)`    |
| `assert.equal(a, b)`                  | Checks if `a` is equal to `b` (==).                      | `assert.equal(1, '1'); // Passes (type coercion)`           |
| `assert.notStrictEqual(a, b)`         | Checks if `a` is not strictly equal to `b`.              | `assert.notStrictEqual(1, 1); // Fails`
      |
| `assert.notEqual(a, b)`               | Checks if `a` is not equal to `b`.                       | `assert.notEqual(1, '1'); // Fails`
     |
| `assert.deepEqual(a, b)`              | Checks if `a` and `b` are deeply equal (including objects). | `assert.deepEqual({a: 1}, {a: 1}); // Passes`               |
| `assert.notDeepEqual(a, b)`           | Checks if `a` and `b` are not deeply equal.              | `assert.notDeepEqual({a: 1}, {a: 2}); // Passes`             |
| `assert.throws(fn)`                   | Checks if the function `fn` throws an error.             | `assert.throws(() => { throw new Error('Error!'); });`     |
| `assert.doesNotThrow(fn)`             | Checks if the function `fn` does not throw an error.     | `assert.doesNotThrow(() => { return 1 + 1; });`            |
| `assert.ok(value)`                    | Checks if `value` is truthy.                             | `assert.ok(true); // Passes`
      |
| `assert.fail([message])`              | Fails the test with an optional message.                 | `assert.fail('This test failed'); // Fails with message`    |
| `assert.strictEqual(a, b, [message])` | Checks strict equality with an optional message.         | `assert.strictEqual(1, 2, 'Values are not equal'); // Fails with message` |


### 2. Using ``Chai`` Assertion Library
``Chai`` is a popular assertion library that provides a more expressive and readable syntax. It supports three styles of assertions:

- **Should** style
- **Expect** style (commonly used)
- **Assert** style (similar to Node's ``assert``)

You’ll need to install it first: `npm install chai --save-dev`
#### Examples

##### Example with ``Chai`` (``expect`` style):
```javascript
const { expect } = require('chai');

describe('Array', function() {
  it('should return the correct length of an array', function() {
    const arr = [1, 2, 3];
    expect(arr).to.have.lengthOf(3);  // checks the length of the array
  });

  it('should return the correct element in array', function() {
    const arr = [1, 2, 3];
    expect(arr[1]).to.equal(2);  // checks the value of the second element
  });
});
```
##### Example with ``Chai`` (``should`` style):
```javascript
const { should } = require('chai');
should();  // needed to initialize the `should` style

describe('Math operations', function() {
  it('should add two numbers correctly', function() {
    const result = 1 + 1;
    result.should.equal(2);  // uses `should` assertion style
  });
});
```
##### Example with ``Chai`` (``assert`` style):
```javascript
const { assert } = require('chai');

describe('String operations', function() {
  it('should match the substring', function() {
    const str = 'hello world';
    assert.include(str, 'world');  // checks if the string contains a substring
  });
});
```
#### Common Chai Assertions:

- **Expect style:** Fluent and chainable. You can chain multiple assertions for better readability.
    + ``expect(value).to.equal(val)`` - Asserts equality.
    + ``expect(value).to.be.a('string')`` - Asserts type.
    + ``expect(array).to.have.lengthOf(n)`` - Asserts array length.
    + ``expect(fn).to.throw(Error)`` - Asserts if a function throws an error.
- **Should style:** Very similar to ``expect`` but in a different style. You use should() to initialize it.
    + ``value.should.equal(val)`` - Asserts equality.
    + ``value.should.be.a('number')`` - Asserts type.
- **Assert style:** Similar to Node’s ``assert``, but part of the Chai library.
    + ``assert.equal(a, b)`` - Asserts equality.
    + ``assert.typeOf(value, 'number')`` - Asserts type
</details>
<details>
<summary>Callbacks vs Promises </summary>

### Callbacks
A **callback** is a function that is passed as an argument to another function and is executed after some operation has been completed. Callbacks are commonly used in asynchronous operations to handle the result of a task once it is done.
**Example of a Callback:**
```javascript
function fetchData(callback) {
    setTimeout(() => {
        const data = { name: 'Alice', age: 25 };
        callback(data); // Execute the callback with the fetched data
    }, 1000);
}

fetchData((result) => {
    console.log('Data fetched:', result); // This will run after 1 second
});
```
**Pros:**

- Simple to understand for basic tasks.
- Useful for quick asynchronous operations.
**Cons:**

- **Callback Hell:** When you nest multiple callbacks, the code can become difficult to read and maintain.
- Error handling can become complex, as you have to handle errors in multiple places.

### Promises
A **Promise** is an object that represents the eventual completion (or failure) of an asynchronous operation and its resulting value. Promises provide a cleaner way to handle asynchronous code compared to callbacks and can be chained for better readability.

**Example of a Promise:**
```javascript
function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = { name: 'Alice', age: 25 };
            resolve(data); // Fulfill the promise with the fetched data
        }, 1000);
    });
}

fetchData()
    .then((result) => {
        console.log('Data fetched:', result); // This will run after 1 second
    })
    .catch((error) => {
        console.error('Error fetching data:', error);
    });
```

#### 1. Function Definition

The function `fetchData` is defined. This function is designed to simulate fetching data asynchronously.

#### 2. Returning a Promise

Inside the `fetchData` function, a new Promise is created and returned. A Promise takes a function as an argument, which itself takes two parameters: `resolve` and `reject`. These are functions used to handle the asynchronous operation's outcome.

#### 3. Asynchronous Operation

- `setTimeout` is used to simulate a delay (like fetching data from a server). It waits for 1000 milliseconds (1 second) before executing the code inside it.
- After the 1-second delay, an object `data` is created with properties `name` and `age`.

#### 4.  Resolving the Promise

The `resolve(data)` function is called, which fulfills the Promise with the `data` object. This means that the asynchronous operation was successful, and the result can now be accessed.

### Using the Promise
#### 5. Calling the Function

`fetchData()` is called, which returns a Promise. The code continues to execute without waiting for the Promise to resolve.

#### 6. Handling the Result

The `.then()` method is chained to the `fetchData()` call. It takes a function as an argument, which will be executed when the Promise is fulfilled (i.e., when `resolve(data)` is called). In this case, the `result` parameter in the `.then()` callback will contain the data object `{ name: 'Alice', age: 25 }`.

#### 7. Logging the Result

Inside the `.then()` callback, `console.log('Data fetched:', result)` is executed after 1 second, logging the fetched data to the console.

#### 8. Error Handling

The `.catch()` method is chained to handle any potential errors that may occur during the asynchronous operation. If the Promise were to be rejected (if you called `reject(someError)`), the error handling function would execute, logging the error message.

### Summary

- **Asynchronous Behavior**: The `fetchData` function simulates an asynchronous operation using `setTimeout`.
- **Promise Object**: The Promise allows for handling the result of the asynchronous operation (success or failure) in a more structured way than using callbacks.
- **Chaining Methods**: The `.then()` method processes the result, while the `.catch()` method manages errors, making the code cleaner and more readable.

| Feature/Aspect           | Callbacks                                         | Promises                                         |
|--------------------------|---------------------------------------------------|--------------------------------------------------|
| **Definition**           | A function passed as an argument to another function to be executed later. | An object representing the eventual result of an asynchronous operation. |
| **Syntax**               | Function nested within another function.         | Chained `.then()` and `.catch()` methods.       |
| **Error Handling**       | Error handling must be implemented in each callback. | Centralized error handling using `.catch()`.     |
| **Readability**          | Can lead to "callback hell" with deep nesting.   | More readable and manageable due to chaining.    |
| **State**                | No state representation.                          | Has three states: pending, fulfilled, rejected.  |
| **Complexity**           | Simpler for straightforward tasks but can become complex with multiple operations. | Better suited for complex operations with dependencies. |
| **Compatibility**        | Works with any function but can lead to nesting. | Can be integrated with async/await for even cleaner syntax. |
| **Use Cases**            | - Simple asynchronous tasks<br>- APIs that do not support Promises | - Multiple dependent async operations<br>- Cleaner code management<br>- Better error handling |
| **Performance**          | Slightly faster due to less overhead (no state management). | Slightly slower due to the additional abstraction layer. |

### When to Use Each

| Scenario                     | Recommended Approach     |
|------------------------------|---------------------------|
| Simple async tasks           | Callbacks                 |
| Avoiding callback hell       | Promises                  |
| Complex operations with dependencies | Promises                  |
| Legacy codebases             | Callbacks (if no choice), then refactor to Promises |
| Modern JavaScript projects    | Promises (and async/await) |
| Third-party libraries        | Follow the library's design (Callbacks or Promises) |


</details>
<details>
<summary>What is SinonJS</summary>

### What is SinonJS
It is a powerful library used for creating spies, stubs, mocks, and fake timers in JavaScript testing. It is commonly used alongside testing frameworks like Mocha to help verify the behavior of functions and external dependencies (e.g., APIs, databases, or file systems) without needing to actually call them.
### Why Use SinonJS?
- It allows you to **decouple your tests** from external dependencies.
- You can control the behavior of functions and verify interactions, making tests more **predictable**.
- **Isolation:** It ensures that you're testing only the functionality of the code itself, without relying on actual external systems.

Here’s what SinonJS allows you to do:

- **Spies**: Monitor function calls and track information such as how many times a function was called and with what arguments.
- **Stubs**: Replace functions with custom implementations to control their behavior (e.g., force a return value or throw an error).
- **Mocks**: Create fake objects with expectations to verify how they are used in tests.
- **Fake Timers**: Simulate the passage of time for functions like `setTimeout` and `setInterval`.
</details>
<details>
<summary> How to use SinonJS </summary>

Using SinonJS in your testing setup involves installing the library, integrating it with your test framework (like Mocha), and applying its features (spies, stubs, mocks, and fake timers) as needed. Here’s a step-by-step guide on how to use SinonJS:
#### 1. Installation `npm install sinon --save-dev`

#### 2. Setting Up Your Test Framework
You can use SinonJS with popular testing frameworks like Mocha. Make sure you have Mocha installed: `npm install mocha --save-dev`

#### 3. Using SinonJS Features
Here are examples demonstrating how to use each feature of SinonJS: **spies**, **stubs**, **mocks**, and **fake timers**.

**Using Spies**
Spies allow you to monitor function calls without modifying the function's behavior.
```javascript
const sinon = require('sinon');

describe('Spies Example', function() {
  it('should spy on a function', function() {
    const myFunction = sinon.spy();
    myFunction('Hello');

    // Check the spy
    sinon.assert.calledOnce(myFunction);          // Asserts that the spy was called exactly once
    sinon.assert.calledWith(myFunction, 'Hello'); // Asserts that it was called with the argument 'Hello'
  });
});
```
**Using Stubs**
Stubs allow you to replace a function with a custom implementation.
```javascript
const sinon = require('sinon');

describe('Stubs Example', function() {
  it('should stub a function', function() {
    const myFunction = sinon.stub().returns(42); // Stub that always returns 42
    const result = myFunction();

    sinon.assert.calledOnce(myFunction); // Verify the stub was called
    console.log(result); // Prints 42
  });
});
```
**Using Mocks**
Mocks allow you to create fake objects with expectations about how they should be called.
```javascript
const sinon = require('sinon');

describe('Mocks Example', function() {
  it('should create a mock with expectations', function() {
    const myObject = {
      myMethod: function() {}
    };

    const mock = sinon.mock(myObject);
    mock.expects('myMethod').once(); // Expect myMethod to be called once

    myObject.myMethod(); // Call the method

    mock.verify(); // Verify expectations were met
    mock.restore(); // Restore the original behavior
  });
});
```
**Using Fake Timers**
Fake timers allow you to control time-dependent functions like ``setTimeout`` and ``setInterval``.
```javascript
const sinon = require('sinon');

describe('Fake Timers Example', function() {
  it('should simulate time passage', function() {
    const clock = sinon.useFakeTimers();
    const callback = sinon.spy();

    setTimeout(callback, 1000); // Set a timeout for 1 second

    clock.tick(1000); // Simulate the passage of 1 second

    sinon.assert.calledOnce(callback); // Verify that the callback was called
    clock.restore(); // Restore the real timers
  });
});
```
#### Running Your Tests
To run your tests, you can use Mocha from the command line: `npx mocha`

Make sure your test files are in a directory recognized by Mocha (e.g., test), or specify the path to your test files.

</details>
<details>
<summary>How to present long test suites</summary>

Presenting long test suites effectively is crucial for maintaining clarity and organization, both for yourself and for others who may read or maintain the tests. Here are some strategies to present long test suites in a way that enhances readability and manageability:

### 1. Organize Tests into Descriptive Blocks
Group related tests using ``describe`` blocks to categorize them by functionality. Each block should have a clear and descriptive name that explains the functionality being tested.

```javascript
describe('User Authentication', function() {
  describe('Login', function() {
    it('should log in with valid credentials', function() {
      // Test implementation
    });

    it('should not log in with invalid credentials', function() {
      // Test implementation
    });
  });

  describe('Registration', function() {
    it('should register a new user with valid data', function() {
      // Test implementation
    });

    it('should not register a user with existing email', function() {
      // Test implementation
    });
  });
});
```
### 2. Use Before and After Hooks
Use ``before``, ``beforeEach``, ``after``, and ``afterEach`` hooks to set up common test data or state. This reduces redundancy in your test code and makes it clearer what setup is necessary for each test.

```javascript
describe('User Authentication', function() {
  let user;

  beforeEach(function() {
    user = createUser(); // Create a user before each test
  });

  afterEach(function() {
    deleteUser(user.id); // Clean up after each test
  });

  it('should log in with valid credentials', function() {
    // Test implementation
  });

  it('should not log in with invalid credentials', function() {
    // Test implementation
  });
});
```
### 3. Use Meaningful Test Names
Make test descriptions clear and descriptive to indicate what is being tested. This helps anyone reading the tests understand the purpose of each test at a glance.
```javascript
it('should return a user object when valid credentials are provided', function() {
  // Test implementation
});
```
### 4. Keep Tests Focused and Small
Each test should ideally check a single behavior or aspect of the functionality. If a test is doing too much, consider breaking it down into smaller, more focused tests.

Example:
Instead of testing multiple aspects of a function in one test:

```javascript
it('should return user data and log the event', function() {
  // Test implementation
});
```
You could separate them:

```javascript
it('should return user data when requested', function() {
  // Test implementation
});

it('should log the event when user data is requested', function() {
  // Test implementation
});
```
### 5. Use Data-Driven Tests
If you have multiple tests that are similar but with different inputs and expected outputs, consider using a data-driven approach. This can reduce redundancy.
```javascript
const testData = [
  { input: 'validInput', expected: 'validOutput' },
  { input: 'invalidInput', expected: 'error' }
];

testData.forEach(({ input, expected }) => {
  it(`should handle input: ${input}`, function() {
    const result = processInput(input);
    assert.equal(result, expected);
  });
});
```
### 6. Keep It DRY (Don't Repeat Yourself)
If you find yourself repeating the same code in multiple tests, consider abstracting that code into helper functions or using hooks to keep your tests clean and concise.

```javascript
function loginUser(credentials) {
  // Logic to log in the user
}

describe('User Authentication', function() {
  it('should log in with valid credentials', function() {
    const user = loginUser(validCredentials);
    assert(user.isLoggedIn);
  });

  it('should not log in with invalid credentials', function() {
    const user = loginUser(invalidCredentials);
    assert(!user.isLoggedIn);
  });
});
```
### 7. Utilize Tags or Annotations
If your test framework supports it, you can use tags or annotations to categorize tests (e.g., by priority, type, etc.). This can help in selectively running tests based on certain criteria.

### 8. Documentation and Comments
While tests should be self-explanatory, adding comments can provide context, especially for complex tests. Avoid excessive comments that restate what the code does; focus on explaining why something is done a certain way if it's not immediately clear.

### 9. Run Tests in Parallel
If you have a large number of tests, consider running them in parallel (if your testing framework supports it). This can speed up the testing process and make it more efficient.

### 10. Continuous Integration
Integrate your test suite with a Continuous Integration (CI) system to automate the testing process. This helps ensure that all tests are run frequently, and it can provide quick feedback on code changes.

</details>
<details>
<summary>When and how to use spies</summary>

### When to Use Spies
**Spies** are useful for monitoring function calls and their behavior without altering their implementation. Here are some common scenarios where using spies is appropriate:

- **Verifying Function Calls:** When you need to confirm that a function was called, how many times it was called, and with what arguments.

- **Testing Callbacks:** In asynchronous code, you can spy on callback functions to ensure they are called as expected.

- **Integration Testing:** To test interactions between different components or modules, ensuring that certain functions are called during the process.

- **Event Listeners:** When testing event-driven code, spies can confirm that event handlers are triggered.

- **Logging and Metrics:** To verify that logging functions or analytics tracking functions are called with the correct parameters.

### How to Use Spies
#### 1. Installation
First, install SinonJS if you haven't done so already: `npm install sinon --save-dev`

#### 2. Import SinonJS
In your test file, import SinonJS: `const sinon = require('sinon');`

#### 3. Creating a Spy
You can create a spy using ``sinon.spy()``. This can be done either on a new function or an existing one.
Example of Creating a Spy: `const myFunction = sinon.spy();`

#### 4. Using the Spy in Tests
You can use the spy in your test suite to monitor function calls.
```javascript
const assert = require('assert');
const sinon = require('sinon');

describe('Spies Example', function() {
  it('should call the function with the correct arguments', function() {
    // Create a spy
    const myFunction = sinon.spy();

    // Call the spy
    myFunction(42, 'hello');

    // Assertions
    assert(myFunction.calledOnce); // Check if it was called exactly once
    assert(myFunction.calledWith(42, 'hello')); // Check if it was called with specific arguments
  });

  it('should spy on an existing function', function() {
    const obj = {
      method: function() {
        return 'original';
      }
    };

    // Spy on the existing method
    const spy = sinon.spy(obj, 'method');

    // Call the spied method
    obj.method();

    // Assertions
    assert(spy.calledOnce); // Check if the method was called once
    assert(spy.returned('original')); // Check the return value
    spy.restore(); // Restore the original method
  });
});
```
**Key Methods for Spies**
Here are some important methods and properties you can use with spies:

- ``called``: Returns ``true`` if the spy was called at least once.
- ``calledOnce``: Returns ``true`` if the spy was called exactly once.
- ``calledTwice``: Returns ``true`` if the spy was called exactly twice.
- ``calledWith(args)``: Checks if the spy was called with specific arguments.
- ``returned(value)``: Checks if the spy returned a specific value.
- ``restore()``: Restores the original function if you’ve spied on an existing method.
**Example Scenario**
Here’s a practical example of using a spy to monitor logging behavior in a function:
```javascript
function logger(message) {
  console.log(message);
}

describe('Logger Function', function() {
  it('should log the correct message', function() {
    const consoleSpy = sinon.spy(console, 'log'); // Spy on console.log

    logger('Hello, world!'); // Call the logger function

    // Assertions
    sinon.assert.calledOnce(consoleSpy); // Ensure it was called once
    sinon.assert.calledWith(consoleSpy, 'Hello, world!'); // Check it logged the correct message

    consoleSpy.restore(); // Restore console.log to its original state
  });
});
```
</details>
<details>
<summary>When and how to use stubs</summary>

### When to Use Stubs
**Stubs** are useful for replacing functions in your code with controlled implementations, allowing you to control their behavior during tests. Here are common scenarios for using stubs:

- **Controlling Dependencies:** When you want to isolate the function being tested by replacing its dependencies (e.g., API calls, database access) with stubs that return predefined results.

- **Testing Edge Cases:** To simulate different scenarios, such as errors or specific return values, without relying on the actual implementation of the dependency.

- **Avoiding Side Effects:** When the original function has side effects (e.g., writing to a database or sending an email), stubs can prevent these actions while allowing you to test the logic that depends on those functions.

- **Performance Optimization:** Stubbing time-consuming operations (e.g., network requests) can speed up your test suite.

- **Testing Callbacks and Events:** You can stub functions that are used as callbacks to ensure they behave as expected in various conditions.

### How to Use Stubs
Here’s a step-by-step guide on how to use stubs in your tests using SinonJS.

#### 1. Installation
If you haven't installed SinonJS yet, you can do so using npm: ``npm install sinon --save-dev``
#### 2. Import SinonJS
In your test file, import SinonJS: ``const sinon = require('sinon');``
#### 3. Creating a Stub
You can create a stub using ``sinon.stub()``. You can stub an existing function or create a new one.

#### 4. Setting Stub Behavior
You can define the behavior of the stub using various methods like ``returns``, ``throws``, and more.

### Key Methods for Stubs
Here are some important methods and properties you can use with stubs:

- ``returns(value)``: Defines a value to return when the stub is called.
- ``throws(error)``: Defines an error to throw when the stub is called.
- ``callsFake(fn)``: Replaces the stub with a custom function that you provide.
- ``resetHistory()``: Resets the call history for the stub.
- ``restore()``: Restores the original function if you’ve stubbed an existing method.
**Example Scenario**
Here’s a more practical example of using a stub to isolate a function that depends on an external service:
```javascript
function getUserData(userId, database) {
  return database.fetchUser(userId);
}

describe('getUserData', function() {
  it('should return user data from the database', function() {
    const database = {
      fetchUser: function() {
        // This would normally fetch data from a real database
      }
    };

    // Stub the fetchUser method
    const stub = sinon.stub(database, 'fetchUser').returns({ id: 1, name: 'John Doe' });

    // Call the function being tested
    const result = getUserData(1, database);

    // Assertions
    assert.deepEqual(result, { id: 1, name: 'John Doe' }); // Verify the returned user data

    // Restore the original method
    stub.restore();
  });
});
```
</details>
<details>
<summary>What are hooks and when to use them</summary>

### What Are Hooks?
**Hooks** in testing frameworks (such as Mocha, Jest, or Jasmine) are special functions that allow you to run code at specific points during the test execution cycle. Hooks help manage the setup and teardown of test cases, making it easier to maintain your test code and avoid redundancy. Common hooks include:

- ``before``: Runs once before all tests in a ``describe`` block.
- ``beforeEach``: Runs before each test in a ``describe`` block.
- ``after``: Runs once after all tests in a ``describe`` block.
- ``afterEach``: Runs after each test in a ``describe`` block.
### When to Use Hooks
Hooks are useful in various scenarios to improve test organization and clarity:

- **Setup and Teardown:** When your tests require a common setup (e.g., creating objects, establishing database connections) or teardown (e.g., closing connections, cleaning up resources).

- **Reducing Redundancy:** To avoid repetitive code in each test case, especially if multiple tests require the same setup or cleanup logic.

- **Managing State:** When tests need a clean state before execution, hooks can help ensure that each test starts with a fresh environment.

- **Handling Asynchronous Operations:** Hooks can be beneficial for managing asynchronous operations, ensuring that setup is completed before tests run.

- **Grouping Related Tests:** When tests share setup or teardown logic, using hooks within a describe block can group related tests together logically.

```javascript
const assert = require('assert');

describe('User Management', function() {
  let user;

  // This runs once before all tests
  before(function() {
    console.log('Setting up test environment...');
  });

  // This runs before each test
  beforeEach(function() {
    user = {
      id: 1,
      name: 'Alice'
    };
  });

  // This test uses the setup from beforeEach
  it('should create a new user', function() {
    assert.equal(user.name, 'Alice');
  });

  // This test uses the same setup
  it('should have an id of 1', function() {
    assert.equal(user.id, 1);
  });

  // This runs after each test
  afterEach(function() {
    user = null; // Cleanup
  });

  // This runs once after all tests
  after(function() {
    console.log('Cleaning up test environment...');
  });
});
```
</details>
<details>
<summary>Unit testing with Async functions</summary>

Unit testing asynchronous functions can be a bit different from testing synchronous functions. Here's a comprehensive guide on how to effectively test asynchronous functions using Mocha and SinonJS.

### Overview of Async Functions
In JavaScript, asynchronous functions can be defined using:

- **Callbacks:** Functions passed as arguments to be called later.
- **Promises:** Objects that represent the eventual completion (or failure) of an asynchronous operation.
- **Async/Await:** A more readable way to work with Promises, allowing you to write asynchronous code that looks synchronous.
### Testing Async Functions
To test async functions, you need to ensure that your test framework understands when the asynchronous operation is complete. Below are the common methods for testing async functions.

#### 1. Using Callbacks
When using callbacks, you can use the ``done`` function provided by Mocha to signal the completion of the test.
```javascript
const assert = require('assert');

function asyncFunction(callback) {
  setTimeout(() => {
    callback(null, 'Hello, world!');
  }, 100);
}

describe('Async Function with Callback', function() {
  it('should return the expected message', function(done) {
    asyncFunction((err, result) => {
      assert.equal(result, 'Hello, world!');
      done(); // Signal that the test is complete
    });
  });
});
```
#### 2. Using Promises
When your async function returns a Promise, you can return the Promise directly in your test. Mocha will wait for the Promise to resolve before moving on.
```javascript
const assert = require('assert');

function asyncFunction() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Hello, world!');
    }, 100);
  });
}

describe('Async Function with Promises', function() {
  it('should return the expected message', function() {
    return asyncFunction().then((result) => {
      assert.equal(result, 'Hello, world!');
    });
  });
});
```
#### 3. Using Async/Await
Using async/await is often the most readable and straightforward way to test async functions. Simply declare your test as an ``async`` function and use ``await`` to wait for the asynchronous operation to complete.
```javascript
const assert = require('assert');

function asyncFunction() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Hello, world!');
    }, 100);
  });
}

describe('Async Function with Async/Await', function() {
  it('should return the expected message', async function() {
    const result = await asyncFunction();
    assert.equal(result, 'Hello, world!');
  });
});
```
#### Stubbing Async Functions
If you're using SinonJS and need to stub an asynchronous function, you can create stubs that return Promises or use ``callsFake`` to define custom behavior.
```javascript
const sinon = require('sinon');
const assert = require('assert');

const asyncFunction = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Hello, world!');
    }, 100);
  });
};

describe('Stubbing Async Functions', function() {
  it('should stub the async function', async function() {
    const stub = sinon.stub().returns(Promise.resolve('Stubbed response'));

    const result = await stub();
    assert.equal(result, 'Stubbed response');

    // Clean up
    stub.restore();
  });
});
```
### Summary
- **Callbacks:** Use the done function in Mocha to signal completion.
- **Promises:** Return the Promise from the test, and Mocha will handle it.
- **Async/Await:** Declare the test as async and use await for cleaner code.
- **Stubbing:** Use SinonJS to stub async functions and control their behavior during tests
</details>
<details>

<summary>How to write integration tests with a small node server</summary>

Writing integration tests for a small Node.js server involves testing the interactions between various parts of your application, such as routes, middleware, and databases. Here’s a step-by-step guide on how to set up and write integration tests for a simple Node.js server using Mocha, Chai, and Supertest.

### 1. Set Up Your Node.js Server
First, let’s create a simple Express server.
#### a. Initialize a New Node.js Project
```bash
mkdir my-node-server && cd my-node-server
npm init -y
npm install express
```
#### b. Create a Basic Express Server
Create a file named ``server.js``:
```javascript
// server.js
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Sample route
app.get('/api/greet', (req, res) => {
  res.json({ message: 'Hello, world!' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app; // Export the app for testing
```
### 2. Set Up Testing Dependencies
Install the necessary testing libraries: ``npm install --save-dev mocha chai supertest``
### 3. Write Integration Tests
Create a new directory named ``test`` and add a test file  ``server.test.js``.

#### a. Create a Test File
```bash
mkdir test
touch test/server.test.js
```
#### b. Write Integration Tests
Edit test/server.test.js:
```javascript
// test/server.test.js
const request = require('supertest');
const chai = require('chai');
const app = require('../server'); // Import the server

const { expect } = chai;

describe('Integration Tests for the Node.js Server', function() {
  it('should return a greeting message', function(done) {
    request(app)
      .get('/api/greet') // Make a GET request to the /api/greet endpoint
      .expect('Content-Type', /json/) // Expect JSON response
      .expect(200) // Expect status code 200
      .end((err, res) => {
        if (err) return done(err); // Handle any error
        expect(res.body).to.have.property('message', 'Hello, world!'); // Assert the response body
        done(); // Signal that the test is complete
      });
  });
});
```
### 4. Run the Tests
#### a. Update ``package.json`` for Testing
```json
"scripts": {
  "test": "mocha"
}
```
#### b. Execute the Tests
Run your tests using npm: ``npm test``
You should see output indicating that your tests passed.

### 5. Additional Integration Tests
You can expand your integration tests by adding more routes and corresponding tests. Here’s how to add a POST endpoint and test it:

#### a. Update the Server
Add a new route in ``server.js``:
```javascript
app.post('/api/greet', (req, res) => {
  const name = req.body.name;
  res.json({ message: `Hello, ${name}!` });
});
```
#### b. Update the Tests
Add a new test case in ``test/server.test.js``:
```javascript
it('should return a personalized greeting', function(done) {
  request(app)
    .post('/api/greet') // Make a POST request to the /api/greet endpoint
    .send({ name: 'Alice' }) // Send JSON body
    .expect('Content-Type', /json/) // Expect JSON response
    .expect(200) // Expect status code 200
    .end((err, res) => {
      if (err) return done(err); // Handle any error
      expect(res.body).to.have.property('message', 'Hello, Alice!'); // Assert the response body
      done(); // Signal that the test is complete
    });
});
```
### 6. Running Your Tests Again
After updating your server and tests, run your tests again: ``npm test``
</details>

## Tasks
### 0. Basic test with Mocha and Node assertion library
**Install Mocha using npm:**

- Set up a scripts in your ``package.json`` to quickly run Mocha using ``npm test``
- You have to use ``assert``

**Create a new file named ``0-calcul.js``:**

- Create a function named ``calculateNumber``. It should accepts two arguments (number) ``a`` and ``b``
- The function should round ``a`` and ``b`` and return the sum of it

**Test cases**

- Create a file ``0-calcul.test.js`` that contains test cases of this function
- You can assume ``a`` and ``b`` are always number
- Tests should be around the “rounded” part

**Tips:**

- For the sake of the example, this test suite is slightly extreme and probably not needed
- However, remember that your tests should not only verify what a function is supposed to do, but also the edge cases

**Requirements:**

- You have to use ``assert``
- You should be able to run the test suite using ``npm test 0-calcul.test.js``
- Every test should pass without any warning

**Expected output**

```bash
> const calculateNumber = require("./0-calcul.js");
> calculateNumber(1, 3)
4
> calculateNumber(1, 3.7)
5
> calculateNumber(1.2, 3.7)
5
> calculateNumber(1.5, 3.7)
6
>
```

**Run test**
```bash
bob@dylan:~$ npm test 0-calcul.test.js

> task_0@1.0.0 test /root
> ./node_modules/mocha/bin/mocha "0-calcul.test.js"

  calculateNumber
    ✓ ...
    ✓ ...
    ✓ ...
    ...

  130 passing (35ms)
```

### 1. Combining descriptions
**Create a new file named ``1-calcul.js``:**

- Upgrade the function you created in the previous task (``0-calcul.js``)
- Add a new argument named ``type`` at first argument of the function. ``type`` can be ``SUM``, ``SUBTRACT``, or ``DIVIDE`` (string)
- When type is ``SUM``, round the two numbers, and add ``a`` and ``b``
- When type is ``SUBTRACT``, round the two numbers, and subtract ``b`` from ``a``
- When type is ``DIVIDE``, round the two numbers, and divide ``a`` with ``b`` - if the rounded value of ``b`` is equal to 0, return the string ``Error``

**Test cases**

- Create a file ``1-calcul.test.js`` that contains test cases of this function
- You can assume ``a`` and ``b`` are always number
- Usage of ``describe`` will help you to organize your test cases

**Tips:**

- For the sake of the example, this test suite is slightly extreme and probably not needed
- However, remember that your tests should not only verify what a function is supposed to do, but also the edge cases

**Requirements:**

- You have to use ``assert``
- You should be able to run the test suite using ``npm test 1-calcul.test.js``
- Every test should pass without any warning

**Expected output**
```
> const calculateNumber = require("./1-calcul.js");
> calculateNumber('SUM', 1.4, 4.5)
6
> calculateNumber('SUBTRACT', 1.4, 4.5)
-4
> calculateNumber('DIVIDE', 1.4, 4.5)
0.2
> calculateNumber('DIVIDE', 1.4, 0)
'Error'
```

### 2. Basic test using Chai assertion library
While using Node assert library is completely valid, a lot of developers prefer to have a behavior driven development style. This type being easier to read and therefore to maintain.

**Let’s install Chai with npm:**

- Copy the file ``1-calcul.js`` in a new file ``2-calcul_chai.js`` (same content, same behavior)
- Copy the file ``1-calcul.test.js`` in a new file ``2-calcul_chai.test.js``
- Rewrite the test suite, using ``expect`` from ``Chai``

**Tips:**

- Remember that test coverage is always difficult to maintain. Using an easier style for your tests will help you
- The easier your tests are to read and understand, the more other engineers will be able to fix them when they are modifying your code

**Requirements:**

- You should be able to run the test suite using ``npm test 2-calcul_chai.test.js``
- Every test should pass without any warning

### 3. Spies

Spies are a useful wrapper that will execute the wrapped function, and log useful information (e.g. was it called, with what arguments). Sinon is a library allowing you to create spies.

**Let’s install Sinon with npm:**

- Create a new file named ``utils.js``
- Create a new module named ``Utils``
- Create a property named ``calculateNumber`` and paste your previous code in the function
- Export the Utils module

**Create a new file named ``3-payment.js``:**

- Create a new function named ``sendPaymentRequestToApi``. The function takes two argument ``totalAmount``, and ``totalShipping``
- The function calls the ``Utils.calculateNumber`` function with type ``SUM``, ``totalAmount`` as ``a``, ``totalShipping`` as ``b`` and display in the console the message ``The total is: <result of the sum>``

**Create a new file named ``3-payment.test.js`` and add a new suite named ``sendPaymentRequestToApi``:**

- By using ``sinon.spy``, make sure the math used for ``sendPaymentRequestToApi(100, 20)`` is the same as ``Utils.calculateNumber('SUM', 100, 20)`` (validate the usage of the ``Utils`` function)

**Requirements:**

- You should be able to run the test suite using ``npm test 3-payment.test.js``
- Every test should pass without any warning
- You should use a ``spy`` to complete this exercise

**Tips:**

- Remember to always restore a spy after using it in a test, it will prevent you from having weird behaviors
- Spies are really useful and allow you to focus only on what your code is doing and not the downstream APIs or functions
- Remember that integration test is different from unit test. Your unit test should test your code, not the code of a different function

### 4. Stubs
Stubs are similar to spies. Except that you can provide a different implementation of the function you are wrapping. Sinon can be used as well for stubs.

**Create a new file 4-payment.js, and copy the code from ``3-payment.js``** (same content, same behavior)

**Create a new file 4-payment.test.js, and copy the code from ``3-payment.test.js``**

- Imagine that calling the function ``Utils.calculateNumber`` is actually calling an API or a very expensive method. You don’t necessarily want to do that on every test run
- Stub the function ``Utils.calculateNumber`` to always return the same number 10
- Verify that the stub is being called with ``type = SUM, a = 100``, and ``b = 20``
- Add a spy to verify that console.log is logging the correct message The total is: 10

**Requirements:**

- You should be able to run the test suite using ``npm test 4-payment.test.js``
- Every test should pass without any warning
- You should use a ``stub`` to complete this exercise
- Do not forget to restore the spy and the stub

**Tips:**

- Using stubs allows you to greatly speed up your test. When executing thousands of tests, saving a few seconds is important
- Using stubs allows you to control specific edge case (e.g a function throwing an error or returning a specific result like a number or a timestamp)

### 5. Hooks
Hooks are useful functions that can be called before execute one or all tests in a suite

**Copy the code from ``4-payment.js`` into a new file ``5-payment.js``:** (same content/same behavior)

**Create a new file ``5-payment.test.js``:**

- Inside the same ``describe``, create 2 tests:
    + The first test will call sendPaymentRequestToAPI with 100, and 20:
        - Verify that the console is logging the string The total is: 120
        - Verify that the console is only called once
    + The second test will call sendPaymentRequestToAPI with 10, and 10:
        - Verify that the console is logging the string The total is: 20
        - Verify that the console is only called once

**Requirements:**

- You should be able to run the test suite using ``npm test 5-payment.test.js``
- Every test should pass without any warning
- You should use only one ``spy`` to complete this exercise
- You should use a beforeEach and a afterEach hooks to complete this exercise

### 6. Async tests with done
Look into how to support async testing, for example when waiting for the answer of an API or from a Promise

**Create a new file ``6-payment_token.js``:**

- Create a new function named ``getPaymentTokenFromAPI``
- The function will take an argument called ``success`` (boolean)
- When ``success`` is true, it should return a resolved promise with the object ``{data: 'Successful response from the API' }``
- Otherwise, the function is doing nothing.

**Create a new file ``6-payment_token.test.js`` and write a test suite named ``getPaymentTokenFromAPI``**
- How to test the result of getPaymentTokenFromAPI(true)?

**Tips:**

- You should be extremely careful when working with async testing. Without calling ``done`` properly, your test could be always passing even if what you are actually testing is never executed

**Requirements:**

- You should be able to run the test suite using ``npm test 6-payment_token.test.js``
- Every test should pass without any warning
- You should use the ``done`` callback to execute this test

### 7. Skip
When you have a long list of tests, and you can’t figure out why a test is breaking, avoid commenting out a test, or removing it. Skip it instead, and file a ticket to come back to it as soon as possible

You will be using this file, conveniently named ``7-skip.test.js``
```javascript
const { expect } = require('chai');

describe('Testing numbers', () => {
  it('1 is equal to 1', () => {
    expect(1 === 1).to.be.true;
  });

  it('2 is equal to 2', () => {
    expect(2 === 2).to.be.true;
  });

  it('1 is equal to 3', () => {
    expect(1 === 3).to.be.true;
  });

  it('3 is equal to 3', () => {
    expect(3 === 3).to.be.true;
  });

  it('4 is equal to 4', () => {
    expect(4 === 4).to.be.true;
  });

  it('5 is equal to 5', () => {
    expect(5 === 5).to.be.true;
  });

  it('6 is equal to 6', () => {
    expect(6 === 6).to.be.true;
  });

  it('7 is equal to 7', () => {
    expect(7 === 7).to.be.true;
  });
});
```
**Using the file ``7-skip.test.js``:**
- Make the test suite pass **without** fixing or removing the failing test
- ``it`` description **must stay** the same

**Tips:**

- Skipping is also very helpful when you only want to execute the test in a particular case (specific environment, or when an API is not behaving correctly)

**Requirements:**

- You should be able to run the test suite using ``npm test 7-skip.test.js``
- Every test should pass without any warning

### 8. Basic Integration testing
In a folder ``8-api`` located at the root of the project directory, copy this ``package.json`` over.
```json
{
  "name": "8-api",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "./node_modules/mocha/bin/mocha"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.17.1"
  },
  "devDependencies": {
    "chai": "^4.2.0",
    "mocha": "^6.2.2",
    "request": "^2.88.0",
    "sinon": "^7.5.0"
  }
}
```
**Create a new file ``api.js``:**

- By using express, create an instance of ``express`` called ``app``
- Listen to port 7865 and log ``API available on localhost port 7865`` to the browser console when the ``express`` server is started
- For the route ``GET /``, return the message ``Welcome to the payment system``

**Create a new file ``api.test.js``:**

- Create one suite for the index page:
    + Correct status code?
    + Correct result?
    + Other?

**Server**

Terminal 1
```bash
bob@dylan:~/8-api$  node api.js
API available on localhost port 7865
```
Terminal 2
```bash
bob@dylan:~/8-api$  curl http://localhost:7865 ; echo ""
Welcome to the payment system
bob@dylan:~/8-api$
bob@dylan:~/8-api$ npm test api.test.js

> 8-api@1.0.0 test /root/8-api
> ./node_modules/mocha/bin/mocha "api.test.js"



  Index page
    ✓ ...
    ✓ ...
    ...

  23 passing (256ms)
```
**Tips:**

- Since this is an integration test, you will need to have your node server running for the test to pass
- You can use the module ``request``

**Requirements:**

- You should be able to run the test suite using ``npm test api.test.js``
- Every test should pass without any warnings

### 9. Regex integration testing
In a folder ``9-api``, reusing the previous project in ``8-api`` (``package.json``, ``api.js`` and ``api.test.js``)

**Modify the file ``api.js``:**

- Add a new endpoint: ``GET /cart/:id``
- ``:id`` must be only a number (validation must be in the route definition)
- When access, the endpoint should return ``Payment methods for cart :id``

**Modify the file ``api.test.js``:**

- Add a new test suite for the cart page:
    + Correct status code when ``:id`` is a number?
    + Correct status code when ``:id`` is NOT a number (=> 404)?
    + etc.

**Server**

Terminal 1
```bash
bob@dylan:~$ node api.js
API available on localhost port 7865
```
Terminal 2
```bash
bob@dylan:~$ curl http://localhost:7865/cart/12 ; echo ""
Payment methods for cart 12
bob@dylan:~$
bob@dylan:~$ curl http://localhost:7865/cart/hello -v
*   Trying 127.0.0.1...
* TCP_NODELAY set
* Connected to localhost (127.0.0.1) port 7865 (#0)
> GET /cart/hello HTTP/1.1
> Host: localhost:7865
> User-Agent: curl/7.58.0
> Accept: */*
>
< HTTP/1.1 404 Not Found
< X-Powered-By: Express
< Content-Security-Policy: default-src 'none'
< X-Content-Type-Options: nosniff
< Content-Type: text/html; charset=utf-8
< Content-Length: 149
< Date: Wed, 15 Jul 2020 08:33:44 GMT
< Connection: keep-alive
<
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Error</title>
</head>
<body>
<pre>Cannot GET /cart/hello</pre>
</body>
</html>
* Connection #0 to host localhost left intact
```
**Tips:**

- You will need to add a small regex in your path to support the usecase

**Requirements:**

- You should be able to run the test suite using ``npm test api.test.js``
- Every test should pass without any warning

### 10. Deep equality & Post integration testing
In a folder ``10-api``, reusing the previous project in ``9-api`` (``package.json``, ``api.js`` and ``api.test.js``)

**Modify the file ``api.js``:**

- Add an endpoint ``GET /available_payments`` that returns an object with the following structure:
```
{
  payment_methods: {
    credit_cards: true,
    paypal: false
  }
}
```
- Add an endpoint ``POST /login`` that returns the message ``Welcome :username`` where ``:username`` is the value of the body variable ``userName``.

**Modify the file ``api.test.js``:**

- Add a test suite for the ``/login`` endpoint
- Add a test suite for the ``/available_payments`` endpoint

**Server**

Terminal 1
```bash
bob@dylan:~$ node api.js
API available on localhost port 7865
```
Terminal 2
```bash
bob@dylan:~$ curl http://localhost:7865/available_payments ; echo ""
{"payment_methods":{"credit_cards":true,"paypal":false}}
bob@dylan:~$
bob@dylan:~$ curl -XPOST http://localhost:7865/login -d '{ "userName": "Betty" }' -H 'Content-Type: application/json' ; echo ""
Welcome Betty
```
**Tips:**
- Look at deep equality to compare objects

**Requirements:**

- You should be able to run the test suite using ``npm test api.test.js``
- Every test should pass without any warning
- Your server should not display any error