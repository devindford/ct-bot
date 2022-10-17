const {ActivityType} = require('discord.js')
const { message_id, reaction_channel_id, reactions } = require('../config.json')

module.exports = {
  name: 'ready',
  once: true,
  async execute(client) {
    console.log(`Logged in as ${client.user.tag}`)
    // Get channel and message
    const channel = client.channels.cache.get(reaction_channel_id)
    const message = await channel.messages.fetch(message_id)

    // Set emojis on the message for reactions
    reactions.forEach((emoji) => {
      message.react(emoji.id)
    })

    // Set user Activity
    client.user?.setActivity('all of you 👀', { type: ActivityType.Watching })
    console.log(`Bot Is Ready`)
  },
}
