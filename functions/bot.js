/* 
The update object telegram is expected to send is
{
    update_id,
    message,
    edited_message,
    channel_post,
    edited_channel_post,
    inline_query?: {
        id,
        from,
        location,
        query,
        offset,
    },
    chosen_inline_result,
    callback_query,
    shipping_query,
    pre_checkout_query,
    poll,
    poll_answer,
}
from the body of it's request.

the answer it is expecting is
{
    inline_query_id,
    results: [
        {
            type,
            id,
            title,
            input_message_content,
            reply_markup,
            url,
            hide_url,
            description,
            thumb_url,
            thumb_width,
            thumb_height,
        }  
    ]
    cache_time,
    is_personal?,
    next_offset?,
    switch_pm_text?,
    switch_pm_parameter?,
}
for inline queries or
{
    chat_id,
    text,
    parse_mode,
    entities,
    disable_web_page_preview,
    disable_notification,
    reply_to_message_id,
    allow_sending_without_reply,
    reply_markup,
}
Let's get to it.
*/

const genSticker = require("../dist/controllers/genSticker");

const axios = require('axios');

const { balloons } = require('../dist/data');

exports.handler = async event => {

    const body = event.body;

    const req = JSON.parse(body);

    const {
        message,
        inline_query,
    } = req;

    console.log('Update received: ', req);

    const bot_url = "https://api.telegram.org/bot" + process.env.BOT_TOKEN;

    console.log('BOT endpoint: ' + bot_url);

    let response = {};

    let request = "";

    console.log("Fetching word: " + request);

    let results = [];

    if (inline_query) {
        if (results.length === 0) {
            results.push({
                type: "Article",
                id: "404_" + results.length,
                title: "I currently don't support inline_mode :(",
                thumb_url:
                    "https://muwado.com/wp-content/uploads/2014/06/sad-smiley-face.png",
                description: ":(",
                input_message_content: {
                    parse_mode: "HTML",
                    message_text: ":(",
                },
            });
        }

        /* Answer said inline query. */
        response = {
            inline_query_id: inline_query.id,
            results,
        };

        await answerInlineQuery(response);

    }

    else if (message) {
        const chatId = message.chat.id;
        const request = message.text;

        /* Answer message. */
        switch (request) {
            case "/start":
                response = {
                    chat_id: chatId,
                    text: "Let's get started. use /instructions to receive uh... Intructions",
                    parse_mode,
                }

                await sendMessage(response);

                break;
            case "/instructions":
                response = {
                    chat_id: chatId,
                    text: "Let's get started.",
                    parse_mode,
                }

                await sendMessage(response);

                response = {
                    chat_id: chatId,
                    text: "You have the following options:",
                    parse_mode,
                }

                await sendMessage(response);

                let instructions = "";

                balloons.forEach((ballon) => {
                    instructions += `For ${ballon.char_name} with the prefix ${ballon.prefix}  \n`;
                });

                instructions += `\nAnd your message should be preffix + message Eg. "JA01 Good morning"`;

                response = {
                    chat_id: chatId,
                    text: instructions,
                    parse_mode,
                }

                await sendMessage(response);

                break;
            default:
                if (message) {
                    response = {
                        chat_id: chatId,
                        text: "Please wait while we process your request.",
                        parse_mode,
                    }

                    await sendMessage(response);

                    let prefix = message.substring(5);
                    let text = message.substring(0, 4);

                    const result = await genSticker(prefix, text);

                    console.log("Resultado da geração", result);
                    if (result !== null) {

                        response = {
                            chat_id: chatId,
                            sticker: result,
                            reply_to_message_id: message.id,
                            allow_sending_without_reply: true,
                        }

                    } else {
                        response = {
                            chat_id: chatId,
                            text: "Prefix Invalid",
                            parse_mode: parse_mode,

                        }
                    }

                    // send a message in case it doesn't find anything.
                    response = {
                        chat_id: chatId,
                        text: "Sorry, coudn't catch that 😢 \nPlease use only inline commands for now",
                        parse_mode,
                    }

                    await sendMessage(response);

                } else {
                    response = {
                        chat_id: chatId,
                        text: "Sorry, coudn't catch that, try reading the instructions",
                        parse_mode: parse_mode,
                    }

                    await sendMessage(response);
                }
                break;
        }


    }

    async function sendMessage(response) {
        return await axios.post('https://nervous-bardeen-125bdd.netlify.app/.netlify/functions/answerInlineQuery', response);
    }

    async function answerInlineQuery(response) {
        return await axios.post('https://nervous-bardeen-125bdd.netlify.app/.netlify/functions/sendMessage', response);
    }

    return {
        statusCode: 200,

        body: JSON.stringify(response),
    }

}