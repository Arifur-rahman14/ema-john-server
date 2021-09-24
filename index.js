const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient } = require('mongodb');
require('dotenv').config();



const uri = `mongodb+srv://${process.env.DB_User}:${process.env.DB_PASS}@cluster0.sbn7t.mongodb.net/${process.env.DB_Name}?retryWrites=true&w=majority`;

const app = express()

app.use(bodyParser.json());
app.use(cors())
const port = 8800


console.log(process.env.DB_Name);

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const products = client.db("emaJohnStore").collection("products");
    console.log("database connected");

    app.post('/addProduct', (req, res) => {
        const product = req.body;
        console.log(product);
        products.insertOne(product)
        .then(result => {
            console.log(result);
        })
    })
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})