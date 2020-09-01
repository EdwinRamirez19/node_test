const express = require("express");
const mysql = require("mysql");
const connection = require("../config/db");
const app = express();

const index = () => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM productos;`, (err, res) => {
            if (err) throw reject(err)
            resolve(res)
        })
    })
}


const store = ({ nombre, descripcion, stock, imagen }) => {
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO productos(nombre,descripcion,stock,imagen) VALUES('${nombre}','${descripcion}','${stock}','${imagen}')`,
            (err, res) => {
                if (err) throw reject(err);
                resolve({
                    message: 'Producto Agregado correctamente'
                });
            }
        );
    });
};

const update = (id, { nombre, descripcion, stock, imagen }) => {
    return new Promise((resolve, reject) => {
        connection.query(
            `UPDATE productos SET nombre = '${nombre}', descripcion = '${descripcion}', stock = '${stock}', imagen = '${imagen}' WHERE id='${id}' `,
            (err, res) => {
                if (err) throw reject(err);
                resolve(res);
            }
        );
    });
};


const deleted = (id) => {
    return new Promise((resolve, reject) => {
        connection.query(`DELETE FROM productos where id='${id}'`, (err, res) => {
            if (err) throw reject(err);
            resolve(res);
        });
    });
};
module.exports = {
    index,
    store,
    update,
    deleted
}