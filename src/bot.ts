import genSticker from "./controllers/genSticker";
import { InlineQueryResult, query } from "./types";

import TelegramBot from "node-telegram-bot-api";

const token = process.env.BOT_TOKEN;

import { balloons } from "./data";

let bot: TelegramBot | undefined = undefined;

if (token) {
  // Create a bot that uses 'polling' to fetch new updates
  bot = new TelegramBot(token, { polling: true });

  bot.on("inline_query", async (query: query) => {
    const queryContent = query.query;

    let results: InlineQueryResult[] = [];

    if (queryContent) {
      console.log(
        new Date().toUTCString() + " - Generating message: " + queryContent
      );

      if (queryContent.length > 5) {
        // const generatedMessage = await genSticker(queryContent, "JA01");
        // results.push(...generatedMessage);
      } else {
        results.push({
          type: "Article",
          id: "404_" + results.length,
          title: "Sorry, your message must be longer than 10 characters.",
          thumb_url:
            "https://muwado.com/wp-content/uploads/2014/06/sad-smiley-face.png",
          description: ":(",
          input_message_content: {
            parse_mode: "HTML",
            message_text: ":(",
          },
        });
      }
    } else {
      results.push({
        type: "Article",
        id: "404_" + results.length,
        title: "Not Found",
        thumb_url:
          "https://muwado.com/wp-content/uploads/2014/06/sad-smiley-face.png",
        description: ":(",
        input_message_content: {
          parse_mode: "HTML",
          message_text: ":(",
        },
      });
    }

    bot?.answerInlineQuery(query.id, results);
  });

  // Listen for any kind of message.
  bot.on("message", async (msg: TelegramBot.Message) => {
    const chatId = msg.chat.id;
    const message = msg.text;

    switch (message) {
      case "/start":
        bot?.sendMessage(
          chatId,
          "Let's get started.\n Use /instructions to receive uh... Instructions..?"
        );
        break;
      case "/instructions":
        bot?.sendMessage(chatId, "Allright.");
        bot?.sendMessage(chatId, "You have the following options:");

        let instructions = "";

        balloons.forEach((ballon: { char_name: string; prefix: string }) => {
          instructions += `For ${ballon.char_name} with the prefix ${ballon.prefix}  \n`;
        });

        instructions += `\nAnd your message should be preffix + message Eg. "JA01 Good morning"`;

        bot?.sendMessage(chatId, instructions);
        break;
      default:
        if (message) {
          bot?.sendMessage(
            chatId,
            "Please wait while we process your request :)"
          );

          let prefix = message.substring(5);
          let text = message.substring(0, 4);
          const result = await genSticker(prefix, text);

          console.log("Resultado da geração", result);
          if (result !== null) {
            bot?.sendSticker(chatId, result, {
              reply_to_message_id: msg.message_id,
            });
          } else {
            bot?.sendMessage(chatId, "Prefix invalid :/");
          }
        } else {
          bot?.sendMessage(
            chatId,
            "Sorry, coudn't catch that 😢 \nPlease use only inline commands for now."
          );
        }
        break;
    }
  });
}

export default bot;
