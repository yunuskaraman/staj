const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));

const docx = require('./routes/docx');
const docxPdf = require('./routes/docxtopdf');


app.use('/', docx);
app.use('/', docxPdf);
app.listen(8000, () => {
    console.log("listen 8000...");
});