const { ActivityType } = require( 'discord.js' )
const { message_id, reaction_channel_id, reactions } = require( '../config.json' )
const logger = require( '../logger' )
const messages = require( '../messages.json' )

module.exports = {
  name: 'ready',
  once: true,
  async execute( client ) {
    logger.info( `Logged in as ${ client.user.tag }` )
    // Get channel and message
    const channel = client.channels.cache.get( reaction_channel_id )
    const message = await channel.messages.fetch( message_id )

    // Set emojis on the message for reactions
    reactions.forEach( ( emoji ) => {
      message.react( emoji.id )
    } )

    const randomNumber = Math.floor( Math.random() * ( 5 - 1 + 1 ) + 1 )
    const randomeBotStatus = messages[ randomNumber ]?.message
    
    
    // Set user Activity
    if (randomeBotStatus) {
      client.user?.setActivity( `${randomeBotStatus}`, { type: ActivityType.Watching } )
      logger.info(`bot status: ${randomeBotStatus}`)
      logger.info( `Bot Is Ready` )
    }
  },
}
