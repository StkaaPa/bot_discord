const { SlashCommandBuilder, messageLink } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
  async execute(interaction) {
    const msg = await interaction.reply({content: 'Pong!', fetchReply: true});
    await interaction.editReply({content:`Bot Ping: ${msg.createdTimestamp - interaction.createdTimestamp}ms.`})
  }
}