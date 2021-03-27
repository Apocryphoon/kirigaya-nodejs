const { MessageEmbed } = require("discord.js");
const sendError = require("../../util/error");

module.exports = {
  info: {
    name: "remove",
    description: "Remover música da fila",
    usage: "<number>",
    aliases: ["rm"],
  },

  run: async function (client, message, args) {
   const queue = message.client.queue.get(message.guild.id);
    if (!queue) return sendError("Não há fila.",message.channel).catch(console.error);
    if (!args.length) return sendError(`Usage: ${client.config.prefix}\`remove <Queue Number>\``);
    if (isNaN(args[0])) return sendError(`Usage: ${client.config.prefix}\`remove <Queue Number>\``);
    if (queue.songs.length == 1) return sendError("Não há fila.",message.channel).catch(console.error);
    if (args[0] > queue.songs.length)
      return sendError(`A fila é só ${queue.songs.length} música longa!`,message.channel).catch(console.error);
try{
    const song = queue.songs.splice(args[0] - 1, 1); 
    sendError(`❌ **|** Removida: **\`${song[0].title}\`** da fila.`,queue.textChannel).catch(console.error);
                   message.react("✅")
} catch (error) {
        return sendError(`:notes:Ocorreu um erro inesperado. \n Tipo possível: ${error}`, message.channel);
      }
  },
};
