import { balloon, font } from "./types";

export const fonts: font[] = [
  {
    name: "Roboto",
    address: "./src/assets/fonts/roboto.ttf",
  },
  {
    name: "Mukta",
    address: "./src/assets/fonts/mukta.ttf",
  },
  {
    name: "IndieFlower",
    address: "./src/assets/fonts/indieflower.ttf",
  },
];

const default_font = {
  name: "Mukta",
  address: "./src/assets/fonts/mukta.ttf",
};

export const balloons: balloon[] = [
  //Jaehee
  {
    char_name: "Jaehee",
    name: "Jaehee 01",
    prefix: "JA01",
    startHeight: 0,
    startWidth: 0,
    address: "./src/assets/balloons/Jaehee/01.png",
    font: fonts.find((font) => font.name === "Mukta") || default_font,
  },
  {
    char_name: "Jaehee",
    name: "Jaehee 02",
    prefix: "JA02",
    startHeight: 0,
    startWidth: 0,
    address: "./src/assets/balloons/Jaehee/02.png",
    font: fonts.find((font) => font.name === "Mukta") || default_font,
  },
  {
    char_name: "Jaehee",
    name: "Jaehee 03",
    prefix: "JA03",
    startHeight: 0,
    startWidth: 0,
    address: "./src/assets/balloons/Jaehee/03.png",
    font: fonts.find((font) => font.name === "Mukta") || default_font,
  },
  {
    char_name: "Jaehee",
    name: "Jaehee 04",
    prefix: "JA04",
    startHeight: 0,
    startWidth: 0,
    address: "./src/assets/balloons/Jaehee/04.png",
    font: fonts.find((font) => font.name === "IndieFlower") || default_font,
  },
  //Jumin
  {
    char_name: "Jumin",
    name: "Jumin 01",
    prefix: "JU01",
    startHeight: 0,
    startWidth: 0,
    address: "./src/assets/balloons/Jumin/01.png",
    font: fonts.find((font) => font.name === "Mukta") || default_font,
  },
  {
    char_name: "Jumin",
    name: "Jumin 02",
    prefix: "JU02",
    startHeight: 0,
    startWidth: 0,
    address: "./src/assets/balloons/Jumin/02.png",
    font: fonts.find((font) => font.name === "IndieFlower") || default_font,
  },
  {
    char_name: "Jumin",
    name: "Jumin 03",
    prefix: "JU03",
    startHeight: 0,
    startWidth: 0,
    address: "./src/assets/balloons/Jumin/03.png",
    font: fonts.find((font) => font.name === "Mukta") || default_font,
  },
  {
    char_name: "Jumin",
    name: "Jumin 04",
    prefix: "JU04",
    startHeight: 10,
    startWidth: -10,
    fontSize: "25pt",
    lineHeight: 25,
    address: "./src/assets/balloons/Jumin/04.png",
    font: fonts.find((font) => font.name === "IndieFlower") || default_font,
  },
  {
    char_name: "Jumin",
    name: "Jumin 05",
    prefix: "JU05",
    startHeight: 5,
    startWidth: 0,
    fontSize: "20pt",
    lineHeight: 20,
    address: "./src/assets/balloons/Jumin/05.png",
    font: fonts.find((font) => font.name === "IndieFlower") || default_font,
  },

  //Seven
  {
    char_name: "Seven",
    name: "Seven 01",
    prefix: "SE01",
    startHeight: 0,
    startWidth: -150,
    address: "./src/assets/balloons/Seven/01.png",
    font: fonts.find((font) => font.name === "Mukta") || default_font,
  },
  {
    char_name: "Seven",
    name: "Seven 02",
    prefix: "SE02",
    startHeight: 0,
    startWidth: 0,
    address: "./src/assets/balloons/Seven/02.png",
    font: fonts.find((font) => font.name === "Mukta") || default_font,
  },
  {
    char_name: "Seven",
    name: "Seven 03",
    prefix: "SE03",
    startHeight: 0,
    startWidth: 0,
    address: "./src/assets/balloons/Seven/03.png",
    font: fonts.find((font) => font.name === "Mukta") || default_font,
  },
  {
    char_name: "Seven",
    name: "Seven 04",
    prefix: "SE04",
    startHeight: 0,
    startWidth: 0,
    address: "./src/assets/balloons/Seven/04.png",
    font: fonts.find((font) => font.name === "Mukta") || default_font,
  },
  {
    char_name: "Seven",
    name: "Seven 05",
    prefix: "SE05",
    startHeight: 0,
    startWidth: 0,
    address: "./src/assets/balloons/Seven/05.png",
    font: fonts.find((font) => font.name === "Mukta") || default_font,
  },
  {
    char_name: "Seven",
    name: "Seven 06",
    prefix: "SE06",
    startHeight: 0,
    startWidth: 0,
    address: "./src/assets/balloons/Seven/06.png",
    font: fonts.find((font) => font.name === "Mukta") || default_font,
  },

  //Yoosung
  {
    char_name: "Yoosung",
    name: "Yoosung 01",
    prefix: "YO01",
    startHeight: 0,
    startWidth: -150,
    address: "./src/assets/balloons/Yoosung/01.png",
    font: fonts.find((font) => font.name === "Mukta") || default_font,
  },
  {
    char_name: "Yoosung",
    name: "Yoosung 02",
    prefix: "YO02",
    startHeight: 0,
    startWidth: 0,
    address: "./src/assets/balloons/Yoosung/02.png",
    font: fonts.find((font) => font.name === "Mukta") || default_font,
  },
  {
    char_name: "Yoosung",
    name: "Yoosung 03",
    prefix: "YO03",
    startHeight: 0,
    startWidth: 0,
    address: "./src/assets/balloons/Yoosung/03.png",
    font: fonts.find((font) => font.name === "Mukta") || default_font,
  },
  {
    char_name: "Yoosung",
    name: "Yoosung 04",
    prefix: "YO04",
    startHeight: 0,
    startWidth: 0,
    address: "./src/assets/balloons/Yoosung/04.png",
    font: fonts.find((font) => font.name === "IndieFlower") || default_font,
  },
  {
    char_name: "Yoosung",
    name: "Yoosung 05",
    prefix: "YO05",
    startHeight: 0,
    startWidth: 0,
    address: "./src/assets/balloons/Yoosung/05.png",
    font: fonts.find((font) => font.name === "Mukta") || default_font,
  },
  {
    char_name: "Yoosung",
    name: "Yoosung 06",
    prefix: "YO06",
    startHeight: 0,
    startWidth: 0,
    address: "./src/assets/balloons/Yoosung/06.png",
    font: fonts.find((font) => font.name === "Mukta") || default_font,
  },

  //Zen
  {
    char_name: "Zen",
    name: "Zen 01",
    prefix: "ZE01",
    startHeight: 0,
    startWidth: -150,
    address: "./src/assets/balloons/Zen/01.png",
    font: fonts.find((font) => font.name === "Mukta") || default_font,
  },
  {
    char_name: "Zen",
    name: "Zen 02",
    prefix: "ZE02",
    startHeight: 0,
    startWidth: 0,
    address: "./src/assets/balloons/Zen/02.png",
    font: fonts.find((font) => font.name === "Mukta") || default_font,
  },
  {
    char_name: "Zen",
    name: "Zen 03",
    prefix: "ZE03",
    startHeight: 0,
    startWidth: 0,
    address: "./src/assets/balloons/Zen/03.png",
    font: fonts.find((font) => font.name === "Mukta") || default_font,
  },
  {
    char_name: "Zen",
    name: "Zen 04",
    prefix: "ZE04",
    startHeight: 0,
    startWidth: 0,
    address: "./src/assets/balloons/Zen/04.png",
    font: fonts.find((font) => font.name === "Mukta") || default_font,
  },
  {
    char_name: "Zen",
    name: "Zen 05",
    prefix: "ZE05",
    startHeight: 0,
    startWidth: 0,
    address: "./src/assets/balloons/Zen/05.png",
    font: fonts.find((font) => font.name === "Mukta") || default_font,
  },
];
