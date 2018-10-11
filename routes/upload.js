const AWS = require('aws-sdk');
const multer = require ('multer');

var storage = multer.memoryStorage();

AWS.config.loadFromPath('instaflipServerConstants/aws.json');

const errorFn = (err, data)=>{
    if (err) {
        throw(err)
    }
    return;
};  


const uploadApi = app => {
    // is it a good idea to keep 7.5 mb in memory?
    // is this all blocking?
    app.use(multer({ storage: storage }).single('pdf'));
    
    app.post('/s3', (req, res) => {
        // this is huge, maybe I can get it smaller?
        const fileToUpload = req.file.buffer;
        const {order_id, description} = req.body;

        var upload = new AWS.S3.ManagedUpload({
            params: {
                Bucket: 'mcgnly.com.examplebucket', 
                Key: `${order_id}.pdf`, 
                Body: fileToUpload,
            },
            tags: [{Key: 'order_id', Value: order_id}, {Key: 'description', Value: description}]
          });

        upload.on('httpUploadProgress', function(progress){
            console.log('progress is', progress)
        });
        upload.send(function(err, data) {
            console.log(err, data);
            if (data) {
                res.status(200).send({ success: 'uploaded to s3' });
            }
        });
        
    });
    return app;
};

module.exports = uploadApi;
