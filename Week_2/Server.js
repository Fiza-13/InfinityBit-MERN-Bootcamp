const http = require("http");

const express = require("express");

const app = express();

app.use(express.json());

app.get("/",(req, res) => {
    return res.send('Hello Jalish Dada & Hasan Dada....');
});

app.get("/about", (req, res) => {
    return res.send (`Hello Dear ${req.query.name}`);
});


app.post("/post", (req, res) => { 
    const{ name, messege } = req.body;
    res.send(`Hello ${name}!  ${messege} `);
});

const port = 8006;

app.listen(port,() => console.log(`Server Started on port ${port}!`));
