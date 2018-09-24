const fs = require('fs'),
    AWS = require('aws-sdk'),
    keys = require('../instaflipServerConstants/aws');
    // cat = require('../instaflipServerConstants/cat.png');

    const errorFn = (err, data)=>{
        if (err) {
            throw(err)
        }
        return;
    };

    const access = fs.access(('routes/TODO.txt'), errorFn);
    
const stream = fs.createReadStream('routes/TODO.txt', errorFn);

var params = {
    Bucket: 'mcgnly.com.examplebucket', /* required */
    Key: 'catPicture3', /* required */
    UploadId: 'STRING_VALUE', /* required */
    secretAccessKey: keys.secretAccessKey,
    accessKeyId: keys.accessKeyId,
    Body: stream
};


const uploadApi = app => {
    app.post('/s3', (req, res) => {
        var upload = new AWS.S3.ManagedUpload({
            params: params,
            tags: [{Key: 'image', Value: 'cat'}, {Key: 'from', Value: 'Katie'}]
          });
        upload.on('httpUploadProgress', function(progress){console.log('progress is', progress)});
        upload.send(function(err, data) {
            console.log(err, data);
        });
    });
    return app;
};

module.exports = uploadApi;

// app.listen(port, () => console.log(`Example app listening on port ${port}!`))
