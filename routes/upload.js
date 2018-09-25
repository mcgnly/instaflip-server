const fs = require('fs');
const AWS = require('aws-sdk');
const AWSKEYS = require('../instaflipServerConstants/aws');
const bodyParser = require("body-parser");

AWS.config.loadFromPath('instaflipServerConstants/aws.json');

const errorFn = (err, data)=>{
    if (err) {
        throw(err)
    }
    return;
};  

// var stream = fs.createReadStream('routes/TODO.txt', errorFn);

const uploadApi = app => {
    app.use(bodyParser.raw({ limit: '10mb', type: '*/*' }));

    app.post('/s3', (req, res) => {
        console.log('uploading to s3')
        console.log('req.body', req.body);
        const fileToUpload = req.body.data;
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
        res.status(200).send({ success: 'I think the s3 worked?' });
    });
    return app;
};

module.exports = uploadApi;
