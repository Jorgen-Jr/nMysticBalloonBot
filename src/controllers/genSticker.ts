import sleep from "../util/sleep";
import { balloons } from "../data";
import { balloon } from "../types";

// var PImage = require('pureimage');

const PImage = require("pureimage");
const fs = require("fs");
const webp = require("webp-converter");

export const genSticker = async (
  message: string,
  prefix: string
): Promise<any | null> => {
  console.log(prefix, message);

  webp.grant_permission();

  const image = balloons.find((balloon: balloon) => balloon.prefix === prefix);

  //Disgusting
  const image_name = `${prefix}${message
    .split("\n")
    .join("_")
    .split(" ")
    .join("_")}`;

  if (image) {
    //Processing the image
    await PImage.decodePNGFromStream(fs.createReadStream(image?.address)).then(
      async (img: any) => {
        console.log("size is", img.width, img.height);

        console.log("Font Requested: ", image.font);

        let fnt = PImage.registerFont(image.font.address, image.font.name);

        let fonstSize = image.fontSize ? image.fontSize : "348pt";

        fnt.load(async () => {
          let ctx = img.getContext("2d");
          ctx.fillStyle = "#000";
          ctx.font = `${fonstSize} '${image.font.name}'`;
          ctx.textAlign = "center";

          console.log("lineheight", image.lineHeight);
          let lineHeight = image.lineHeight ? image.lineHeight : 350;
          let lines = message.split("\n");

          let startHeight =
            img.height / 2 - ((lineHeight / 2) * lines.length) / 2;

          for (let i = 0; i < lines.length; i++) {
            let line = lines[i];
            ctx.fillText(
              line,
              img.width / 2 + image.startWidth,
              startHeight + lineHeight * i + image.startHeight,
              img.width
            );
          }

          console.log("Done setting the text!");

          PImage.encodePNGToStream(
            img,
            fs.createWriteStream(`./temp/${image_name}.png`),
            50
          ).then(() => {
            console.log("done writing");
          });
        });

        console.log("Font loaded?", fnt.loaded);
        console.log("Waiting for generated image.");

        await sleep(1000);

        if (!fnt.loaded) {
          console.log("Trying again 1");
          await sleep(1000);
        }
        if (!fnt.loaded) {
          console.log("Trying again 2");
          await sleep(1000);
        }
        if (!fnt.loaded) {
          console.log("Trying again 3");
          await sleep(1000);
        }
      }
    );

    console.log("waiting for image to be ready");

    await sleep(500);

    //Converting the image
    const result = webp.cwebp(
      `./temp/${image_name}.png`,
      `./generated/${image_name}.webp`,
      "-q 80"
    );

    const generated_address = result
      .then(() => {
        return `./generated/${image_name}.webp`;
      })
      .catch(() => {
        return null;
      });

    return generated_address;
  } else {
    return null;
  }
};

export default genSticker;

module.exports = genSticker;
