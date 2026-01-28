import { VercelRequest, VercelResponse } from "@vercel/node";
import { Telegraf } from "telegraf";

// Environment variables
const BOT_TOKEN = process.env.BOT_TOKEN;
const webhookUrl = process.env.WEBHOOK_URL;
///api.telegram.org/bot{token}/setWebhook?url={url}/api/telegram-hook?secret_hash=32e58fbahey833349df3383dc910e180
//api.telegram.org/bot{token}setWebhook?url=https://mobile-proxies.vercel.app/api/telegram-hook?secret_hash=32e58fbahey833349df3383dc910e180

const bot = new Telegraf(BOT_TOKEN);

// start handler
export async function handleStartCommand(ctx) {
  const COMMAND = "/start";
  const channelUrl = "t.me/dartproxx";
  const targetUrl = "t.me/+SrHrXj-y38kzZjU8";

  // Welcome message with Markdown formatting
  const reply = `
[If you’re serious about understanding how money moves in crypto, this is where it starts.

We explore advanced tools and real-world techniques used to analyze wallet activity, identify vulnerabilities, and understand how digital assets are secured—or lost.

No deep technical background required. We break everything down step by step so you can learn safely and responsibly.

Join the community and gain practical knowledge that helps you navigate crypto with confidence.](${targetUrl})


[Join Here](${targetUrl})
`;

  try {
    await ctx.reply(reply, {
      parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Join Channel",
              url: channelUrl,
            },
          ]
        ],
      },
    });
    console.log(`Reply to ${COMMAND} command sent successfully.`);
  } catch (error) {
    console.error(`Something went wrong with the ${COMMAND} command:`, error);
  }
}


// Register the /start command handler
bot.command("start", async (ctx) => {
  // Send image first
  // await sendImageCommand(ctx);
  await handleStartCommand(ctx);
});

// Webhook handler
export default async (req: VercelRequest, res: VercelResponse) => {
  try {
    const { body, query } = req;

    if (query.setWebhook === "true") {
      const success = await bot.telegram.setWebhook(webhookUrl);
      // console.log("Webchook set:", webhookUrl, success);
      return res.status(200).send("OK");
    }

    await bot.handleUpdate(body);
    return res.status(200).send("OK");
  } catch (err) {
    return res.json({ error: "Internal server error" }, { status: 500 });
  }

  // res.status(200).send("OK");
};
