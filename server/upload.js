const express = require('express');
const upload = require('./multer');
const cloudinary = require('./cloudinary');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('upload file');
});

// images = array of images received from client, 12 = maximum no. of files
router.post('/upload', upload.array('images', 12), async (req, res) => {
  try {
    // store images from client in 'images'
    const { images } = req.body;

    //Loop through images array and upload
    files = [];
    for (let i = 0; i < images.length; i++) {
      const imageUrl = await cloudinary.uploader.upload(images[i]);
      //Push uploaded images URL to files
      files.push(imageUrl.url);
    }
    // send result to client
    res.json(files);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
