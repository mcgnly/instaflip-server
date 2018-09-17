const fs = require('fs'),
    s3Utils =require('./s3'),
    AWS = require('aws-sdk');


const uploadApi = app => {
    app.post('/s3', (req, res) => {
        const stream = fs.createReadStream('./cat.png');
        var upload = new AWS.S3.ManagedUpload({
            params: {Bucket: 'mcgnly.com.examplebucket', Key: 'catPicture2', Body: stream},
            tags: [{Key: 'image', Value: 'cat'}, {Key: 'from', Value: 'Katie'}]
        });
        upload.on('httpUploadProgress', function(progress){console.log('progress is', progress)});
        upload.send(function(err, data) {
            console.log(err, data);
        });
    });
};

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
