const { roles, reactions, reaction_channel_id } = require('../config.json')
const logger = require('../logger')

module.exports = {
  name: 'messageReactionAdd',
  async execute(reaction, user) {
  if (reaction.message.channelId !== reaction_channel_id) return
   const guild = reaction.message.guild
    // look up the member who reacted so we can add the role
    const memberWhoReacted = guild.members.cache.find((member) => member.user.id === user.id)
    // See if emoji is in the list of reactions
    const userReaction = reactions.find(singleReaction => reaction.emoji.id === singleReaction.id)
    // If the emoji is not in the list
    if (userReaction) {
      // get the role based on the reaction
      const role = roles.find(role => role.name === userReaction.name)
      //assign the user the role
       if (!memberWhoReacted?.roles?.cache.has(role.id)) {
         logger.info('Member doesnt have role, we can add')
         await memberWhoReacted.roles.add(role.id)
         logger.info(`${role.name} added to user: ${memberWhoReacted?.user.username}`)
         return
       }
       logger.info('User already has the role')
    }
  },
}
