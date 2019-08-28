/**
 * Created by danieldihardja on 04.08.19.
 */


const aws = require('aws-sdk');
const cors = require('cors');
const multer = require('multer');
const multerS3 = require('multer-s3');

const express = require('express');
const app = express();
const port = process.env.port || 5555;

app.use(cors());
app.use(express.static('images'));

app.get('/', (req, res) => {
  res.send('sinus duktus');
});

const s3 = new aws.S3();
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'sinusduktus/images',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + '.png')
    }
  })
});

//const upload = multer({ storage: storage });
app.post('/images', upload.single('sd-image'), (req, res) => {
  res.send(req.file);
});

app.listen(port, () => console.log(`running on port ${port}`));
