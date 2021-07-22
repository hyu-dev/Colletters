const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const upload = multer({ dest: 'build/uploads/' });
const bodyParser = require('body-parser');
const app = express();
const http = require('http').createServer(app)

app.use(bodyParser.json())

const printResult = (err, result) => {
    if (err) return console.log(err);
    console.log(`${result} 를 정상적으로 삭제했습니다`);
};

http.listen(8080, function() {
    console.log("서버 실행중..");
    const pathname = path.join(__dirname, 'build/uploads')

    fs.readdir(pathname, 'utf8', function(err, files) {
        if (err) return printResult(err)

        files.forEach((filename) => {
            const fileData = path.join(__dirname, 'build/uploads/' + filename)
            fs.unlink(fileData, err => err ? printResult(err) : printResult(null, fileData));
        })
    })
});

app.use( express.static( path.join(__dirname, 'build') ))

app.get("/", function(req, res) {
    res.sendFile( path.join(__dirname, 'build/index.html' ))
})

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build/index.html'));
});
  

app.post('/api/upload', upload.single('userfile'), function(req, res) {
    console.log("파일?",req.file)
    res.json({ state: true, filename: req.file.filename })
})

app.put('/api/upload', function(req, res) {
    console.log("파일 삭제:", req.body)

    const requestFilename = req.body.filename
    const pathname = path.join(__dirname, 'build/uploads')

    fs.readdir(pathname, 'utf8', function(err, files) {
        if (err) return printResult(err)

        files.forEach((filename) => {
            if (requestFilename === filename) {
                const fileData = path.join(__dirname, 'build/uploads/' + filename)
                fs.unlink(fileData, err => err ? printResult(err) : printResult(null, fileData));
            }
        })
    })
    res.json({ state: true })
})