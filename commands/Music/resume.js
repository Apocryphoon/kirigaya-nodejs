const { MessageEmbed } = require("discord.js");
const sendError = require("../../util/error");

module.exports = {
  info: {
    name: "resume",
    description: "Para retomar a música pausada",
    usage: "",
    aliases: [],
  },

  run: async function (client, message, args) {
    const serverQueue = message.client.queue.get(message.guild.id);
    if (serverQueue && !serverQueue.playing) {
      serverQueue.playing = true;
      serverQueue.connection.dispatcher.resume();
      let xd = new MessageEmbed()
      .setDescription("▶ Retomada da música!")
      .setColor("YELLOW")
      .setAuthor("A música foi retomada!")
      return message.channel.send(xd);
    }
    return sendError("Não há nada tocando neste servidor.", message.channel);
  },
};
