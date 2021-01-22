
const genSticker = require("../dist/controllers/genSticker");

const axios = require('axios');

const { balloons } = require('../dist/data');

exports.handler = async event => {

    const body = event.body;

    const req = JSON.parse(body);

    const {
        message,
    } = req;

    console.log('Update received: ', req);

    const bot_url = "https://api.telegram.org/bot" + process.env.BOT_TOKEN;

    console.log('BOT endpoint: ' + bot_url);

    const chatId = message.chat.id;

    const request = message.text;

    const parse_mode = 'HTML';

    /* Answer message. */
    switch (request) {
        case "/start":
            console.log('Received /start request:', chatId);

            await sendMessage({
                chat_id: chatId,
                text: "Let's get started. use /instructions to receive uh... Intructions",
                parse_mode,
            });

            break;
        case "/instructions":
            console.log('Received /instructions request;');

            let instructions = "Let's get started \n\n\n You have the following options:\n";

            balloons.forEach((ballon) => {
                instructions += `For ${ballon.char_name} with the prefix ${ballon.prefix}  \n`;
            });

            instructions += `\nAnd your message should be preffix + message Eg. "JA01 Good morning"`;

            await sendMessage({
                chat_id: chatId,
                text: instructions,
                parse_mode,
            });

            break;
        default:
            console.log('Received request;');

            if (request) {

                await sendMessage({
                    chat_id: chatId,
                    text: "Please wait while we process your request.",
                    parse_mode,
                });

                let prefix = request.substring(5);
                let text = request.substring(0, 4);

                console.log(genSticker);

                const result = await genSticker(prefix, text);

                console.log("Resultado da geração", result);
                if (result !== null) {

                    await sendMessage({
                        chat_id: chatId,
                        sticker: result,
                        reply_to_message_id: message.message_id,
                        allow_sending_without_reply: true,
                    });

                } else {

                    await sendMessage({
                        chat_id: chatId,
                        text: "Prefix Invalid",
                        parse_mode: parse_mode,
                    });
                }

                // send a message in case it doesn't find anything.
                await sendMessage({
                    chat_id: chatId,
                    text: "Sorry, coudn't catch that 😢 \nPlease use only inline commands for now",
                    parse_mode,
                });

            } else {
                await sendMessage({
                    chat_id: chatId,
                    text: "Sorry, coudn't catch that, try reading the instructions",
                    parse_mode: parse_mode,
                }
                );
            }
            break;
    }


    async function sendMessage(response) {
        return await axios.post('https://nervous-bardeen-125bdd.netlify.app/.netlify/functions/sendMessage', response);
    }

    return {
        statusCode: 200,

        body: JSON.stringify({
            message: "I'm working hooman! :)"
        }),
    }

}