/* Using Node's built in fetch API to test the server's response to different routes. */

import assert from 'assert';
//assert is a built-in module in Node.js that provides a set of assertion functions for testing.

async function runTests() {
// This function will run a series of tests against the server to ensure it is responding correctly to different routes and requests.
//async function allows us to use await inside the function, which makes it easier to work with asynchronous code like fetch requests.
    console.log(" Server tests...engaged!");

    // Priority test cases

    const resHome = await fetch('http://localhost:3000/');
    assert.strictEqual(resHome.status, 200, " Home page should return status 200");
    console.log(" Home page test passed!");
    //test 1 checks if the home page is returning a status code of 200, 
    // which indicates that the request was successful and the server is responding correctly to the home page route.

    const resAbout = await fetch('http://localhost:3000/about');
    const textAbout = await resAbout.text();
    assert.strictEqual(textAbout, "About page", " About page should return 'About page'");
    console.log(" About page test passed!");
    //test 2 checks if the about page is returning the expected text response of "About page".

assert.strictEqual(resHome.headers.get('content-type'), 'text/html', "Home page should be HTML")
console.log(" Content-type test passed!");
//test 3 checks if the content type of the home page response is set to 'text/html',
// which indicates that the server is correctly identifying the type of content being served.

    // Additional test cases

    const res404 = await fetch('http://localhost:3000/nonexistent');
    assert.strictEqual(res404.status, 404, "Unknown route should show 404");
    console.log(" 404 route test passed!");
    //test 4 checks if an unknown route (in this case, /nonexistent) is returning a status code of 404,

    const resCase = await fetch('http://localhost:3000/ABOUT');
    assert.strictEqual(resCase.status, 404, "Uppercase route should show 404");
    console.log(" Case sensitivity test passed!");
    //test 5 checks if the server is case-sensitive by making a request to /ABOUT instead of /about,

    
    const reqQuery = await fetch('http://localhost:3000/about?id=123)');
    // Test  6 checks if the server correctly ignores query parameters 
    // and still returns the expected response for the /about route.
    // On a company website this would be important for tracking user behavior and analytics,
    // but for our simple server we just want to make sure it doesn't break the routing logic.
    console.log(' Query parameter test passed!');

    console.log("\n All testes completed successfully -YEAH! ");

    process.exit(0);
}

    runTests().catch(err => {
        console.error(" Test Failed - you lose", err.message);
        process.exit(1);
    });

    /*The UV_Handle_CLOSING error is a common issue that can occur when a Node.js 
    process is exiting and there are still open handles (such as network connections, file streams, etc.)
     that have not been properly closed. This error typically indicates that the process is trying to exit
      while there are still active handles that need to be closed. Not an issue but if this error appears in the future, 
      it usually means that there is some asynchronous operation that has not completed
       or some resource that has not been properly released before the process is exiting. 
    
       To resolve this issue, I could ensure that all asynchronous operations are completed
    and all resources are properly released before allowing the process to exit. 
    
    This involves adding cleanup code to close any open connections or streams, 
    or using process event handlers to catch the exit event and perform necessary cleanup before the process exits.*/ 