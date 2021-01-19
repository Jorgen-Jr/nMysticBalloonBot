import { InlineQueryResult } from "../types";

// var PImage = require('pureimage');

const PImage = require("pureimage");
const fs = require("fs");
const webp = require("webp-converter");

export default async (message: string): Promise<InlineQueryResult[]> => {
  let results: InlineQueryResult[] = [];

  webp.grant_permission();

  const image_work = await PImage.decodePNGFromStream(
    fs.createReadStream("./src/assets/balloons/Yoosung/04.png")
  ).then(async (img: any) => {
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
    });

    const response = await PImage.encodePNGToStream(
      img,
      fs.createWriteStream("./another.png"),
      50
    ).then(() => {
      console.log("done writing");

      const result = webp.cwebp("./another.png", "./another.webp", "-q 80");

      result.then(() => {
        let result: InlineQueryResult = {
          type: "document",
          id: "Yoosung04" + message,
          title: "Yoosung 04",
          photo_url: "./another.webp",
          mime_type: "application/pdf",
        };

        results.push(result);
      });

      return result;
    });

    console.log("response", response);
  });

  console.log("image_work", image_work);
  console.log("results", results);

  return results;
};
