const fs = require('fs');
const AWS = require('aws-sdk');
const AWSKEYS = require('../instaflipServerConstants/aws');

AWS.config.loadFromPath('instaflipServerConstants/aws.json');

const errorFn = (err, data)=>{
    if (err) {
        throw(err)
    }
    return;
};  

// var stream = fs.createReadStream('routes/TODO.txt', errorFn);

const uploadApi = app => {
    app.post('/s3', (req, res) => {
        console.log('uploading to s3')
        const fileToUpload = req.body.data;
        console.log('req.body', req.body);
        var stream = fs.createReadStream(fileToUpload, errorFn);
        var upload = new AWS.S3.ManagedUpload({
            params: {
                Bucket: 'mcgnly.com.examplebucket', 
                Key: 'key', 
                Body: stream,
            },
            tags: [{Key: 'tag1', Value: 'value1'}, {Key: 'tag2', Value: 'value2'}]
          });

        upload.on('httpUploadProgress', function(progress){console.log('progress is', progress)});
        upload.send(function(err, data) {
            console.log(err, data);
        });
    });
    return app;
};

module.exports = uploadApi;
