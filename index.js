const { Client, GatewayIntentBits } = require("discord.js")
require("dotenv").config();

const client=new Client(
    { intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages, 
        GatewayIntentBits.MessageContent] });

client.on('messageCreate', message => {
    if(message.author.bot) return;
    console.log(message.content);
    message.reply("Hello from BOT!");
})

client.on('interactionCreate', interaction => {
    console.log(interaction);
    interaction.reply("PONg!");
})

client.login(process.env.DISCORD_TOKEN);


