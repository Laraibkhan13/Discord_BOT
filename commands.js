const { REST, Routes } = require('discord.js');
require('dotenv').config(); // load .env variables

const commands = [
  {
    name: 'ping',
    description: 'Replies with Pong!',
  },
  {
    name: 'chat',
    description: 'Ask ChatGPT about Discord!',
    options: [
      {
        name: 'question',
        type: 3, // STRING
        description: 'Your question for ChatGPT',
        required: true,
      },
    ],
  },
];

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: commands },
    );

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();
