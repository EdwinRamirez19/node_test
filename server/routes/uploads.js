const express = require('express');
const fileUpload = require('express-fileupload');
const { v4: uuidv4 } = require("uuid");
const app = express();

// default options
app.use(fileUpload());

app.post('/upload', function(req, res) {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let archivo = req.files.imagen;
    let nombreCortado = archivo.name.split(".");
    let extension = nombreCortado[nombreCortado.length - 1];

    // Extensiones permitidas
    let extensionesValidas = ["png", "jpg", "gif", "jpeg"];

    if (extensionesValidas.indexOf(extension) < 0) {
        return res.status(400).json({
            ok: false,
            err: {
                message: "Las extensiones permitidas son " + extensionesValidas.join(", "),
                ext: extension,
            },
        });
    }
    let nombreArchivo = `${uuidv4()}.${extension}`;


    archivo.mv(`uploads/${nombreArchivo}`, function(err) {
        if (err) return res.status(500).send(err);

        res.json({
            ok: true,
            message: "Imagen cargada correctamente",
            pathImagen: nombreArchivo,
        });
    });
});



module.exports = app;