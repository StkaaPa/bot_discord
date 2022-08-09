//! WHENEVER YOU WANT TO REGISTER A COMMAND FOR THE BOT, YOU ALWAYS HAVE TO RUN THIS .JS FILE FIRST

const fs = require("node:fs");
const path = require("node:path");
const { Routes } = require("discord.js");
const { REST } = require("@discordjs/rest");
const { clientId, guildId, BOT_TOKEN } = require("./config.json");

const commands = [];
const commandsPath = path.join(__dirname, "commands");
const commandsFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandsFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: "10" }).setToken(BOT_TOKEN);

rest
  .put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
  .then(() => console.log("Successfully registered application commands!"))
  .catch(console.error);

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
