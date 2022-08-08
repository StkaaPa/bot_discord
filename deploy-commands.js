const { SlashCommandBuilder, Routes } = require("discord.js");
const { REST } = require('@discordjs/rest');
const { clientId, guildId, BOT_TOKEN } = require('./config.json');

const commands = [
  new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
  new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
  new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
]

  .map(command => command.toJSON());

  const rest = new REST({version: '10'}).setToken(BOT_TOKEN)

  rest.put(Routes.applicationGuildCommands(clientId, guildId), {body: commands})
      .then(() => console.log('Successfully registered application commands!'))
      .catch(console.error)

  /* to delete guild-based commands
  rest.delete(Routes.applicationGuildCommand(clientId, guildId, 'commandId'))
      .then(() => console.log('Successfully deleted guild command!'))
      .catch(console.error);
   */

  /* to delete all guild-based commands at the same time
  rest.delete(Routes.applicationGuildCommand(clientId, guildId), {body: []})
      .then(() => console.log('Successfully deleted all guild commands!'))
      .catch(console.error);
   */