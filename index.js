'use-strict'
require('dotenv').config()
const AWS = require('aws-sdk')
const ssm = new AWS.SSM({ region: 'us-east-1' })
const { Client, GatewayIntentBits } = require('discord.js')
const fs = require('node:fs')
const path = require('node:path')

const entry = async () => {
	// Create a new promise that will get our token from ssm
const getEnvVar = async (varName) => {

return new Promise((res, rej) => {
	ssm.getParameter({Name:varName, WithDecryption: true }, (err, data) => {
		if (err) rej(console.log(err, err.stack))
		else {
			res (data.Parameter?.Value)
		}
	})
})
}

const token = await getEnvVar('DISCORD_TOKEN')

// Get our new discord client
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMembers], partials: ['MESSAGE'] })

// Get all our event functions
const eventsPath = path.join(__dirname, 'events')
const eventFiles = fs.readdirSync(eventsPath).filter((file) => file.endsWith('.js'))

// Loop over the functions and run them
for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file)
  const event = require(filePath)
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args))
  } else {
    client.on(event.name, (...args) => event.execute(...args))
  }
}

// Login to Discord with your client's token
client.login(token)
}

// run entry function
entry()