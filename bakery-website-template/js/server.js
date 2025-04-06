var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

http.createServer(function (req, res) {
    var q = url.parse(req.url, true);

    if (q.pathname === '/') {
        // Serve samplehtml.html for the root path '/'
        fs.readFile('samplehtml.html', function (err, data) {
            if (err) {
                res.writeHead(500, {'Content-Type': 'text/html'});
                res.write('Internal Server Error');
                res.end();
                return;
            }
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            res.end();
        });
    } else if (q.pathname === '/signup') {
        // Serve signup.html for the '/signup' path
        fs.readFile('signup.html', function (err, data) {
            if (err) {
                res.writeHead(500, {'Content-Type': 'text/html'});
                res.write('Internal Server Error');
                res.end();
                return;
            }
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            res.end();
        });
    } else if (q.pathname === '/signupaction' && req.method === 'POST') {
        // Handle form submission for '/signupaction' with POST method
        let body = '';
        req.on('data', function (chunk) {
            body += chunk.toString();
        });
        req.on('end', function () {
            let postData = qs.parse(body);  // Parse the POST data
            console.log(postData);  // Log the form data to the console

            // Respond with a simple confirmation message
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(`Username: ${postData.username}<br>Email: ${postData.email}<br>Password: ${postData.password}`);
            res.end();
        });
    } else {
        // Handle other paths with a 404 error
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.write('404 Not Found');
        res.end();
    }
}).listen(7001, function () {
    console.log("Server started on port 7001");
});
