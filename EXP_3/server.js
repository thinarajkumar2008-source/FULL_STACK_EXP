// Node.js HTTP Request Handling
// Name: THINA RAJKUMAR R
// Department: B.Tech Information Technology
// College: Kongu Engineering College

const http = require('http');

const PORT = 3000;

// Create HTTP Server
const server = http.createServer((req, res) => {

    // GET Request: serve the demo page
    if (req.method === 'GET' && req.url === '/') {

        res.writeHead(200, {
            'Content-Type': 'text/html'
        });

        res.end(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Node.js HTTP Demo</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background: #eaf0ff;
                        text-align: center;
                        padding: 40px;
                    }

                    .container {
                        background: white;
                        max-width: 650px;
                        margin: auto;
                        padding: 30px;
                        border-radius: 12px;
                        box-shadow: 0 4px 15px #cccccc;
                    }

                    h1 {
                        color: #1746a2;
                    }

                    button {
                        background: #1746a2;
                        color: white;
                        padding: 12px 20px;
                        border: none;
                        border-radius: 6px;
                        cursor: pointer;
                        margin: 6px;
                    }

                    button:hover {
                        background: #0d327b;
                    }

                    pre {
                        text-align: left;
                        background: #f0f0f0;
                        padding: 15px;
                        border-radius: 6px;
                        white-space: pre-wrap;
                    }
                </style>
            </head>

            <body>
                <div class="container">

                    <h1>Node.js HTTP Request Demo</h1>

                    <h3>THINA RAJKUMAR R</h3>
                    <p>B.Tech Information Technology</p>
                    <p>Kongu Engineering College</p>

                    <hr>

                    <p>Test the four HTTP request methods.</p>

                    <button onclick="sendRequest('GET')">
                        GET
                    </button>

                    <button onclick="sendRequest('POST')">
                        POST
                    </button>

                    <button onclick="sendRequest('PUT')">
                        PUT
                    </button>

                    <button onclick="sendRequest('DELETE')">
                        DELETE
                    </button>

                    <h3>Server Response</h3>

                    <pre id="output">Click a button to test a request.</pre>

                </div>

                <script>
                    async function sendRequest(method) {

                        const options = {
                            method: method
                        };

                        if (method === 'POST' || method === 'PUT') {
                            options.headers = {
                                'Content-Type':
                                    'application/x-www-form-urlencoded'
                            };

                            options.body = method === 'POST'
                                ? 'name=Thina&course=B.Tech%20IT'
                                : 'name=Thina%20Rajkumar';
                        }

                        try {
                            const response = await fetch('/data', options);
                            const result = await response.json();

                            document.getElementById('output').textContent =
                                JSON.stringify(result, null, 2);

                        } catch (error) {
                            document.getElementById('output').textContent =
                                'Error connecting to the server.';
                        }
                    }
                </script>
            </body>
            </html>
        `);
    }

    // GET Request: return data as JSON
    else if (req.method === 'GET' && req.url === '/data') {

        res.writeHead(200, {
            'Content-Type': 'application/json'
        });

        res.end(JSON.stringify({
            student: 'THINA RAJKUMAR R',
            method: 'GET',
            message: 'Data retrieved successfully'
        }, null, 2));
    }

    // POST Request
    else if (req.method === 'POST' && req.url === '/data') {

        let body = '';

        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {

            res.writeHead(200, {
                'Content-Type': 'application/json'
            });

            res.end(JSON.stringify({
                student: 'THINA RAJKUMAR R',
                method: 'POST',
                message: 'Data received successfully',
                data: body
            }, null, 2));
        });
    }

    // PUT Request
    else if (req.method === 'PUT' && req.url === '/data') {

        let body = '';

        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {

            res.writeHead(200, {
                'Content-Type': 'application/json'
            });

            res.end(JSON.stringify({
                student: 'THINA RAJKUMAR R',
                method: 'PUT',
                message: 'Data updated successfully',
                data: body
            }, null, 2));
        });
    }

    // DELETE Request
    else if (req.method === 'DELETE' && req.url === '/data') {

        res.writeHead(200, {
            'Content-Type': 'application/json'
        });

        res.end(JSON.stringify({
            student: 'THINA RAJKUMAR R',
            method: 'DELETE',
            message: 'Data deleted successfully'
        }, null, 2));
    }

    // Invalid Request
    else {

        res.writeHead(404, {
            'Content-Type': 'text/plain'
        });

        res.end('404 - Page Not Found');
    }

});

// Start Server
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log('Student: THINA RAJKUMAR R');
    console.log('Department: B.Tech Information Technology');
});
