const express = require("express");
const Productos = require("../models/productos");
const validate_jwt = require('../routes/middleware')
const app = express();

var fs = require("fs");
var path = require("path");


app.get('/productos', validate_jwt, async(req, res) => {
    const result = await Productos.index();
    res.json(result);

})
app.post('/productos', validate_jwt, async(req, res) => {
    const result = await Productos.store(req.body);
    res.json(result);
})


app.post("/productos/:id", validate_jwt, async(req, res) => {
    let id = req.params.id
    const result = await Productos.update(id, req.body);
    res.json(result);
});

app.delete("/productos/:id", validate_jwt, async(req, res) => {
    let id = req.params.id;
    const result = await Productos.deleted(id);
    res.json(result);
});
app.get('/download/:id', async(req, res) => {

    console.log('ingreso ', req.params.id)
    let filename = req.params.id;
    let absPath = path.join(__dirname, "../../uploads", filename);

    console.log(absPath);
    res.download(absPath, (err) => {
        if (err) {
            console.log(err);
        }
    });
})
module.exports = app;