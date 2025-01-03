const { Telegraf, Markup } = require("telegraf");
const { message } = require("telegraf/filters");
const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
  console.log("Received /start command");
  try {
    return ctx.reply("Hi");
  } catch (e) {
    console.error("error in start action:", e);
    return ctx.reply("Error occured");
  }
});
bot.hears("/mydata", (ctx) => {
  try {
    return ctx.reply("Hey there " + ctx.message.from.first_name + "\nWelcome!");
  } catch (e) {
    console.error("error in start action:", e);
    return ctx.reply("Error occured");
  }
});

bot.hears("/random", (ctx) => {
  try {
    return ctx.reply(
      "random example",
      Markup.inlineKeyboard([
        Markup.button.url("LAUNCH", "http://t.me/MicSoftware_bot/MicApp"),
      ])
    );
  } catch (e) {
    console.error("error in start action:", e);
    return ctx.reply("Error occured");
  }
});

bot.on("message", (ctx) => {
  try {
    return ctx.reply(
      " " + ctx.message.from.first_name + " said " + ctx.message.text
    );
  } catch (e) {
    console.error("error in start action:", e);
    return ctx.reply("Error occured");
  }
});

// AWS event handler syntax (https://docs.aws.amazon.com/lambda/latest/dg/nodejs-handler.html)
exports.handler = async (event) => {
  try {
    await bot.handleUpdate(JSON.parse(event.body));
    return { statusCode: 200, body: "" };
  } catch (e) {
    console.error("error in handler:", e);
    return {
      statusCode: 400,
      body: "This endpoint is meant for bot and telegram communication",
    };
  }
};
