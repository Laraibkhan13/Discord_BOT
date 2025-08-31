const { Client, GatewayIntentBits } = require("discord.js");
require("dotenv").config();
const { GoogleGenAI } = require("@google/genai");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once("ready", () => {
  console.log("Logged in as " + client.user.tag);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return; // ignore bots

  
  if (!message.mentions.has(client.user)) return;

  
  const userInput = message.content.replace(/<@!?(\d+)>/g, "").trim();

  const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

  
  let resp = await message.reply("Thinking...");

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-001",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `Answer the following in one plain paragraph, no bullet points, no lists:\n${userInput}`,
            },
          ],
        },
      ],
      generationConfig: {
        maxOutputTokens: 300,
        temperature: 0.7,
      },
    });

    await resp.edit(response.text || "Sorry, I couldn’t generate a response.");
  } catch (err) {
    console.error(err);
    await resp.edit("⚠️ Error while generating response.");
  }
});

client.login(process.env.DISCORD_TOKEN);
