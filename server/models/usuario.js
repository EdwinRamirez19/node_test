const express = require("express");
const mysql = require("mysql");
const bcrypt = require('bcrypt');
const connection = require("../config/db");
const jwt = require('jsonwebtoken');
const secret = 'testnodejs';
const app = express();


const register = ({ nombres, login, password }) => {
    let password_bcrypt = bcrypt.hashSync(password, 10);
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO usuarios(nombres,login,password) VALUES('${nombres}','${login}','${password_bcrypt}')`,
            (err, res) => {
                if (err) throw reject(err);
                resolve({
                    message: 'Usuario creado correctamente'
                });
            }
        );
    });
};


const findByLogin = (login) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM usuarios where login = '${login}'`, (err, res) => {
            if (err) throw reject(err);
            resolve(res);
        })
    })
}

const crearToken = (user) => {
    const expiresIn = 24 * 60 * 60;
    const accessToken = jwt.sign({
        user
    }, secret, {
        expiresIn

    })
    return accessToken;
}
module.exports = {
    register,
    findByLogin,
    crearToken
};