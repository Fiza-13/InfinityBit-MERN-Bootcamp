const express = require('express');
const app = express();
const fs = require('fs');

const gifts = require('./gifts_data.json');

const port = 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.get('/gifts', (req, res) =>{
    res.send(gifts);
});

// Get gift suggestion using age....
app.get("/gifts_data/:age", (req, res) =>{
    const age = Number(req.params.age);
    const newgift = gifts.filter(gift => {const [min, max] = gift.age.split("-").map(Number);
    return age>= min && age <= max;    
    });
    return res.json(newgift);
});
//Addition of new gifts....
app.post('/gifts', (req, res) => {
    const addgift ={
        id: gifts.length + 1,
        name: req.body.name,
        age: req.body.age
    };
    gifts.push(addgift);
    fs.writeFile('./gifts_data.json',JSON.stringify(gifts, null, 2),(err) =>{
        if(err)
        {
            console.error(err);
            res.status(500).send({message : 'Unable to add the gift.... Sorry!! '});
        }
        else
        {
            res.send(addgift);
        }
    });
});
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});