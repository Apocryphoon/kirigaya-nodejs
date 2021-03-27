const { MessageEmbed } = require("discord.js");
const sendError = require("../../util/error");

module.exports = {
  info: {
    name: "pause",
    description: "Para pausar a música atual no servidor",
    usage: "[pause]",
    aliases: ["pausar", "pausa"],
  },

  run: async function (client, message, args) {
    const serverQueue = message.client.queue.get(message.guild.id);
    if (serverQueue && serverQueue.playing) {
      serverQueue.playing = false;
	    try{
      serverQueue.connection.dispatcher.pause()
	  } catch (error) {
        message.client.queue.delete(message.guild.id);
        return sendError(`:notes:O Usúario parou e a fila foi limpa.: ${error}`, message.channel);
      }	    
      let xd = new MessageEmbed()
      .setDescription("⏸ A música foi pausada!")
      .setColor("YELLOW")
      .setTitle("A música foi pausada!")
      return message.channel.send(xd);
    }
    return sendError("Não há nada tocando neste servidor.", message.channel);
  },
};
