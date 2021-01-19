import GenMessage from "./controllers/GenMessage";
import { InlineQueryResult, query } from "./types";

import TelegramBot from "node-telegram-bot-api";

const token = process.env.BOT_TOKEN;

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
        const generatedMessage = await GenMessage(queryContent);

        console.log(generatedMessage);
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

    let results: InlineQueryResult[] = [];

    if (results.length === 0) {
      // send a message in case it doesn't find anything.
      bot?.sendMessage(
        chatId,
        "Sorry, coudn't catch that 😢 \nPlease use only inline commands for now."
      );
    }
  });
}

export default bot;
