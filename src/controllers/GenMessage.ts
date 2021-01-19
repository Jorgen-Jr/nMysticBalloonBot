import { InlineQueryResult } from "../types";

// var PImage = require('pureimage');

const PImage = require("pureimage");
const fs = require("fs");

export default async (message: string) => {
  let results: InlineQueryResult[] = [];

  results.push(message);

  PImage.decodePNGFromStream(
    fs.createReadStream("./src/assets/balloons/Jaehee/03.png")
  ).then((img: any) => {
    console.log("size is", img.width, img.height);

    var fnt = PImage.registerFont(
      "./src/assets/fonts/roboto-regular.ttf",
      "Roboto"
    );

    fnt.load(() => {
      var ctx = img.getContext("2d");
      ctx.fillStyle = "#000";
      ctx.font = "348pt 'Roboto'";
      ctx.textAlign = "center";

      let lineHeight = 350;
      let lines = message.split("\n");

      let startHeight = img.height / 2 - ((lineHeight / 2) * lines.length) / 2;

      for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        ctx.fillText(
          line,
          img.width / 2,
          startHeight + lineHeight * i,
          img.width
        );
      }

      PImage.encodePNGToStream(
        img,
        fs.createWriteStream("./another.png"),
        50
      ).then(() => {
        console.log("done writing");
      });
    });
  });

  return results;
};
