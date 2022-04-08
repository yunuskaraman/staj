const express = require('express');
const router = express.Router();
const docxConverter = require('docx-pdf');
const { PDFNet } = require('@pdftron/pdfnet-node');
const path = require('path');
const fs = require('fs');
var toPdf = require("office-to-pdf");

const libre = require('libreoffice-convert');

libre.convertAsync = require('util').promisify(libre.convert);


router.post('/docx-pdf', (req, res) => {

    const inputPath = path.resolve(__dirname,'../output.docx');
    const outputPath = path.resolve(__dirname,'../output.pdf');
    
    const ext = '.pdf'
    // Read file
    const docxBuf = fs.readFileSync(inputPath, 'utf8', (err) => {
        if(err){
            console.log("error1:",err);
        }
    });

    console.log(typeof(docxBuf));

    

    //docxBuff = Buffer.from(docxBuf);

    //console.log(Buffer.isBuffer(docxBuff));

    libreofficeCommand = 'soffice --headless --convert-to .pdf'+inputPath+' --outdir'+outputPath;

    console.log(libreofficeCommand);

    console.log()

    // Convert it to pdf format with undefined filter (see Libreoffice docs about filter)

    res.send();


    // Here in done you have pdf file which you can save or transfer in another stream
    
    

    fs.writeFile(outputPath,libreofficeCommand,(err)=>{
        if(err){
            res.send('err',err);
        }
        else{
            res.send("başarılı");
        }
    });


    /*    
    var wordBuffer = fs.readFileSync(inputPath)

    toPdf(wordBuffer).then(
      (pdfBuffer) => {
        fs.writeFileSync(outputPath, pdfBuffer)
        res.send('başarılı');
      }, (err) => {
        console.log(err);
        res.send(err);
      }
    )
    */
    
        

    /*
    console.log(req.body);

    docxConverter('output.docx','output.pdf', (err,result)=>{
        if(err){
            console.log(err);
        }
        console.log('result',result);
        res.send('başarılı');
    });*/
    /*
        const inputPath = path.resolve(__dirname,'../output.docx');
        const outputPath = path.resolve(__dirname,'../output.pdf');
    
        const convertToPdf =async() =>{
            const pdfdoc = await PDFNet.PDFDoc.create();
            await pdfdoc.initSecurityHandler();
            await PDFNet.Convert.toPdf(inputPath,outputPath);
            pdfdoc.save(outputPath,PDFNet.SDFDoc.SaveOptions.e_linearized);
        }
    
        PDFNet.runWithCleanup(convertToPdf).then(() => {
            
            fs.readFile(outputPath,(err,data) => {
                if(err){
                    res.statusCode = 500;
                    res.end(err);
                }else{
                    res.setHeader('ContentType','application/pdf');
                    res.end(data);
                }
            });
    
        }).catch(err => {
            res.statusCode = 500;
            res.end(err);
        });
    
    */

});

module.exports = router;