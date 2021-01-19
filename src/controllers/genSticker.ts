import { balloons } from "../data";
import { balloon } from "../types";

// var PImage = require('pureimage');

const PImage = require("pureimage");
const fs = require("fs");
const webp = require("webp-converter");

export default async (message: string, prefix: string): Promise<any | null> => {
  console.log(prefix, message);
  webp.grant_permission();

  const image = balloons.find((balloon: balloon) => balloon.prefix === prefix);
  if (image) {
    await PImage.decodePNGFromStream(fs.createReadStream(image?.address)).then(
      async (img: any) => {
        console.log("size is", img.width, img.height);

        var fnt = PImage.registerFont(
          "./src/assets/fonts/roboto-regular.ttf",
          "Roboto"
        );

        await fnt.load(() => {
          var ctx = img.getContext("2d");
          ctx.fillStyle = "#000";
          ctx.font = "348pt 'Roboto'";
          ctx.textAlign = "center";

          let lineHeight = 350;
          let lines = message.split("\n");

          let startHeight =
            img.height / 2 - ((lineHeight / 2) * lines.length) / 2;

          for (let i = 0; i < lines.length; i++) {
            let line = lines[i];
            ctx.fillText(
              line,
              img.width / 2,
              startHeight + lineHeight * i,
              img.width
            );
          }
        });

        await PImage.encodePNGToStream(
          img,
          fs.createWriteStream(`./temp/${prefix}${message}.png`),
          50
        ).then(() => {
          console.log("done writing");

          const result = webp.cwebp(
            `./temp/${prefix}${message}.png`,
            `./generated/${prefix}${message}.webp`,
            "-q 80"
          );

          result.then((res: any) => {
            console.log(res);
            return `./generated/${prefix}${message}.webp`;
          });

          return result;
        });
      }
    );
  } else {
    return null;
  }
};
