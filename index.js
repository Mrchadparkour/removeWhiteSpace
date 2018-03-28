const Jimp = require('jimp');
const path = require('path');


if (process.argv.length < 3) {
  console.log("Please add path to file: whiteless <path/to/image>");
} else {  
  const writePath = path.dirname(process.argv[2]);
  Jimp.read(process.argv[2], (err, image) => {
    if (err) throw err;
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, (x, y) => {
      let hex  = image.getPixelColor(x, y);
      let rgba = Jimp.intToRGBA(hex);
      if (
        rgba.r === 255 &&
        rgba.g === 255 &&
        rgba.b === 255 &&
        rgba.a === 255
      ) {
        //if pixel is white make it transparent
        image.setPixelColor(Jimp.rgbaToInt( 255, 255, 255, 0 ), x, y);
      }
    });
    image.write(writePath + "/new.png");
  });
}
