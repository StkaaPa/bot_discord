// Require the necessary discord.js classes
const fs = require('node:fs'); // fs is a Node´s native file system module
const path = require('node:path'); // path is Node´s native path utility module.
// path helps construct paths to access files and directories
const {Client, GatewayIntentBits, Collection} = require("discord.js")
const config = require("./config.json")

// Create a new client (our bot) instance
const client = new Client({intents: [GatewayIntentBits.Guilds]});

client.commands = new Collection(); // access your commands in other files
const commandsPath = path.join(__dirname, 'commands'); // path.join helps to construct a path and store it in a constant
// fs.readerSync will return an array of all the file names in the directory
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))

// the array in loop
for(const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  // set a new item in the collection
  // with the key as the command name and the value as the exported module
  client.commands.set(command.data.name, command);
}

client.once("ready", () => {
  console.log(`Ready! Logged in as ${client.user.tag}`);
  client.user.setActivity("I´m bot!");
})

// check if an interaction is a chat input command
client.on('interactionCreate', async interaction => {
  if(!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if(!command) return;

  try{
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({content: 'This command dosen´t exist!'})
  }

});

// Login to Discord with your client's token
client.login(config.BOT_TOKEN);