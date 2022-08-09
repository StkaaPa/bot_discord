// Require the necessary discord.js classes
const fs = require('node:fs'); // fs is a Node´s native file system module
const path = require('node:path'); // path is Node´s native path utility module.
// path helps construct paths to access files and directories
const {Client, GatewayIntentBits, Collection} = require("discord.js")
const config = require("./config.json")

// Create a new client (our bot) instance
const client = new Client({intents: [GatewayIntentBits.Guilds]});

client.commands = new Collection(); // access your commands in other files

client.on("ready", () => {
  console.log('Ready!');
  client.user.setActivity("I´m bot!");
})

// check if an interaction is a chat input command
client.on('interactionCreate', async interaction => {
  if(!interaction.isChatInputCommand()) return;

  const { commandName } = interaction;

  if(commandName === 'ping'){
    await interaction.reply('pong!');
  } else if (commandName === 'server'){
    await interaction.reply(`Server name: ${interaction.guild.name}\n Total members: ${interaction.guild.memberCount}`);
  } else if (commandName === 'user') {
    await interaction.reply(`Your Tag: ${interaction.user.tag}}`)
  }
});

// Login to Discord with your client's token
client.login(config.BOT_TOKEN);