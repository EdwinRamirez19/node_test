const express = require("express");
const Usuario = require('../models/usuario')
const bcrypt = require('bcrypt');
const _ = require('underscore');
const app = express();
app.post("/register", async(req, res) => {
    const result = await Usuario.register(req.body);
    res.json({
        result
    })
});

app.post("/login", async(req, res) => {


    const user = await Usuario.findByLogin(req.body.login);
    // console.log(req.body.login, user[0]);
    if (user === undefined) {
        res.json(404, {
            ok: false,
            menssage: 'El Usuario no fue encontrado'
        })
    } else {

        const equals = await bcrypt.compareSync(req.body.password, user[0].password);
        if (!equals) {
            res.json(400, {
                ok: false,
                menssage: "Usuario o contraseña invalidos",
            });
        } else {

            res.json({
                ok: true,
                user: Usuario.crearToken(user),
                name: user[0].nombres,
                message: 'autenticacion correcta'
            })
        }
    }

});


module.exports = app;

module.exports = app;