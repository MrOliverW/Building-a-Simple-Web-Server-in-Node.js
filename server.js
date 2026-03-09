//Importing http and fs module using ES6 syntax
import http from 'http';
import fs from 'fs';

// Sets the port for the server to listen on (either from environment variable or default) to 3000
const PORT = process.env.PORT || 3000;

//Creating a server using http module
const server = http.createServer((req, res) => {

    //const path = req.url is used to get the URL path from the incoming request.
    const path = req.url;

    //Setting up the Routing Logic //
    // If the user visits the homepage, serve the home.html file
    if (path === '/' || path === '/home') {

        // Using fs module to read the home.html file and send it as a response
        fs.readFile('home.html', (err, data) => {
        //This is an asynchronous function that reads the contents of the home.html file and returns it as a buffer.
            // If there is an error reading the file, send a 500 Internal Server Error response
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/html' });
                res.end('Error loading home.html');
            /* res.writeHead is used to tell the browser the status code and content type of the response 
             (e.g. text/html, application/json, etc.) */
            } else {
                // Status code 200 means OK, and the content type is set to text/html
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
                /* res.end() is used to end the response and send the data back to the client
                If this were Express JS we would not setup routing logic like this, 
                we would use app.get() and app.post() methods to handle different routes and HTTP methods.

                The tradeoff is that using the http module gives us more control over the server 
                and how it handles requests, but it also requires more code and setup to handle routing 
                and other features that are built into Express JS. */
            }
        });
        // If the user visits the about page, send a simple text response
    } else if (req.url === '/about') {
        // Status code 200 means OK, and the content type is set to text/plain
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('About page');
    // If the user visits any other page, send a 404 Not Found response
    } else {

        res.writeHead(404, {'Content-Type': 'text/plain' });
        res.end('404 - Not found');
        }
    });
    // Starting the server and listening on the specified port
    server.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
    });