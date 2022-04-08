const express = require('express');
const router = express.Router();

const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");

const fs = require("fs");
const path = require("path");

router.post('/doc',(req,res,next) => {


    const adi = req.body.adi;
    const soyadi = req.body.soyadi;
    const tel = req.body.tel;


    const content = fs.readFileSync(
        path.resolve(__dirname, "../deneme.docx"),
        "binary"
    );

    const zip = new PizZip(content);

    const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
    });

    const icerik = {
            adi: adi,
            soyadi: soyadi,
            tel:  tel
    } 
    // Render the document (Replace {first_name} by John, {last_name} by Doe, ...)
    doc.render(icerik);

    const buf = doc.getZip().generate({
        type: "nodebuffer",
        // compression: DEFLATE adds a compression step.
        // For a 50MB output document, expect 500ms additional CPU time
        compression: "DEFLATE"
    });
    // buf is a nodejs Buffer, you can either write it to a file or res.send it with express for example.
    fs.writeFileSync(path.resolve(__dirname, "../../../../output.docx"), buf);
    res.send("başarılı");

});

module.exports = router;