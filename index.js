'use-strict'
require('dotenv').config()
const { Client, GatewayIntentBits, ActivityType, REST, Routes, SlashCommandBuilder } = require('discord.js')

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessageReactions], partials: ['MESSAGE'] })
const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN)
client.on('ready',() => {
	console.log('client is ready')

	client.user?.setActivity('all of you ', {type: ActivityType.Watching})
});

const data = new SlashCommandBuilder()
  .setName('echo')
  .setDescription('Replies with your input!')
  .addStringOption((option) => option.setName('input').setDescription('The input to echo back').setRequired(true));
	
	rest
    .put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), { body: [data] })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);
	
	(async () => {
	try {
		console.log(`Started refreshing application (/) commands.`);
		console.log(`Successfully reloaded ${data} application (/) commands.`);
	} catch (error) {
		console.error(error);
	}
})();

client.on('messageCreate', (message) => {
	if (message.channelId !== '861648624747413558') return
	 console.log('hello')
  console.log(message)
})

client.on('messageReactionAdd', (reaction) => {
	console.log(reaction, reaction.message, reaction.emoji)
	const reactionEmoji = reaction.message.guild?.emojis.cache.find((emoji) => emoji.name === `${reaction.emoji.name}`)
	reaction.message.reply(`you reacted with ${reactionEmoji}`)
})


// Login to Discord with your client's token
client.login(process.env.DISCORD_TOKEN)
