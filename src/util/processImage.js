const sharp = require("sharp");
const fs = require("fs");

module.exports = async function (single, multiple, id) {
  fs.access("./src/public/uploads", (error) => {
    if (error) {
      fs.mkdirSync("./src/public/uploads");
    }
  });
  let formatName = single.originalname.split(" ").join("-");

  try {
    await sharp(single.buffer)
      .resize(120, 100)
      .toFile(`./src/public/uploads/120x100-${id}-${formatName}`);
  } catch (error) {
    console.log(error);
  }

  try {
    for (let image of multiple) {
      let formatName = image.originalname.split(" ").join("-");
      await sharp(image.buffer)
        .composite([
          {
            input: "./src/public/resource/watermark.png",
            gravity: "southeast",
          },
        ])
        .resize(960, 720, {
          fit: sharp.fit.contain,
          background: { r: 255, g: 255, b: 255, alpha: 1 },
        })
        .toFile(`./src/public/uploads/960x720-${id}-${formatName}`);
    }
  } catch (err) {
    console.log(err);
  }
};
