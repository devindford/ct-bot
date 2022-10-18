const { roles, reactions, reaction_channel_id } = require('../config.json')

module.exports = {
  name: 'messageReactionRemove',
  async execute(reaction) {
    if (reaction.message.channelId !== reaction_channel_id) return
    const guild = reaction.message.guild
    // look up the member who reacted so we can add the role
    console.log(reaction)
    const memberWhoReacted = guild.members.cache.find((member) => member.user.id === reaction.message.author.id)
    // See if emoji is in the list of reactions
    const userReaction = reactions.find((singleReaction) => reaction.emoji.id === singleReaction.id)
    // If the emoji is not in the list
    if (userReaction) {
      // get the role based on the reaction
      const role = roles.find((role) => role.name === userReaction.name)
      //assign the user the role
      if (memberWhoReacted?.roles?.cache.has(role.id)) {
        console.log('Member has role, we can remove')
        await memberWhoReacted.roles.remove(role.id)
        console.log(`${role.name} removed from user:${memberWhoReacted?.user.username}`)
        return
      }
      console.log('User does not have this resolveComponent')
    }
  },
}
