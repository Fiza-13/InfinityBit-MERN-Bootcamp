const express = require('express');

const fs = require('fs')
const users_data = require('./MOCK_DATA.json');
const app = express();
const PORT = 3000;

//Middlewear
app.use(express.urlencoded({ extended: false}));

//Routes
app.get('/users_data', (req, res) =>{
    const html =`
    <ul>
        ${users_data.map(user => `<li>${user.Country_Name}</li>`).join("")}
    </ul>
    `;
    res.send(html);
});

app.get('/api/users_data', (req, res) =>{
    return res.json(users_data);
})
app.get("/api/users_data/:id", (req, res) =>{
    const id = Number(req.params.id);
    const user = users_data.find(user => user.id === id);
    return res.json(user);
});

app.post("/api/users_data", (req, res) =>{
    const body = req.body;
    users_data.push({...body, id: users_data.length+1});

    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users_data),(err, data) =>{
    return res.json({status: "Successful Bro....",id:users_data.length});
    });
});


app.listen(PORT,() => console.log(`Server started at port : ${PORT}`));