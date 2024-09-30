// Program to read user input from stdin and display a message
// The program will greet the user, ask for their name, and display it
// It will close with a specific message after input is provided

// Display a welcome message and prompt for the user's name
process.stdout.write("Welcome to Holberton School, what is your name?\n");

/**
 * Event listener for the 'data' event on process.stdin
 * This event is triggered whenever the user inputs data
 * 
 * @param {Buffer} input - The data entered by the user
 */
process.stdin.on('data', (input) => {
    // Convert the input from a Buffer to a string and remove extra whitespace
    const name = input.toString().trim();

    // If the input is not empty, display the user's name
    if (name) {
        console.log(`Your name is: ${name}`);
        
        // Display closing message and exit the program
        process.stdout.write("This important software is now closing\n");
        process.exit();
    }
});
