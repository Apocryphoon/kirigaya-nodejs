const { MessageEmbed } = require("discord.js");
const sendError = require("../../util/error");

module.exports = {
  info: {
    name: "tocando",
    description: "Para mostrar a música que está tocando atualmente.",
    usage: "",
    aliases: ["nowplaying"],
  },

  run: async function (client, message, args) {
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue) return sendError("Não há nada tocando neste servidor.", message.channel);
    let song = serverQueue.songs[0]
    let thing = new MessageEmbed()
      .setAuthor("Tocando Agora")
      .setThumbnail(song.img)
      .setColor("BLUE")
      .addField("Nome", song.title, true)
      .addField("Duração", song.duration, true)
      .addField("Pedida por", song.req.tag, true)
      .setFooter(`Visualizações: ${song.views} | ${song.ago}`)
    return message.channel.send(thing)
  },
};
