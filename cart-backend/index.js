const express = require("express")
const cors = require("cors")

const app = express() // Creates an express application

app.use(express.json())
app.use(cors())

app.get("/", (req, resp) => {
    resp.send("Welcome to our shopping API...")
})

app.get("/products", (req, resp) => {
    resp.send([1, 2, 3, 4])
})

const port = process.env.PORT || 5000

app.listen(port, console.log(`Server is running on port ${port}`))
/**
 * Listen for connections.

A node http.Server is returned, with this application (which is a Function) as its callback. If you wish to create both an HTTP and HTTPS server you may do so with the "http" and "https" modules as shown here:

var http = require('http') , https = require('https') , express = require('express') , app = express();

http.createServer(app).listen(80); https.createServer({ ... }, app).listen(443);
 */