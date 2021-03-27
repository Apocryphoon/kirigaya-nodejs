const { MessageEmbed } = require("discord.js");
const sendError = require("../../util/error");

module.exports = {
  info: {
    name: "volume",
    description: "Para alterar o volume da fila de músicas do servidor",
    usage: "[volume]",
    aliases: ["v", "vol"],
  },

  run: async function (client, message, args) {
    const channel = message.member.voice.channel;
    if (!channel)return sendError("Sinto muito, mas você precisa estar em um canal de voz para tocar música!", message.channel);
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue) return sendError("Não há nada jogando neste servidor.", message.channel);
    if (!serverQueue.connection) return sendError("Não há nada jogando neste servidor.", message.channel);
    if (!args[0])return message.channel.send(`O volume atual é: **${serverQueue.volume}**`);
     if(isNaN(args[0])) return message.channel.send(':notes: Apenas números!').catch(err => console.log(err));
    if(parseInt(args[0]) > 150 ||(args[0]) < 0) return sendError('Você pode\'t defina o volume para mais de 150. ou menor que 0',message.channel).catch(err => console.log(err));
    serverQueue.volume = args[0]; 
    serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100);
    let xd = new MessageEmbed()
    .setDescription(`Volume ajustado para: **${args[0]/1}/100**`)
    .setAuthor("🔊 | Volume do Servidor")
    .setColor("#00fff7")
    return message.channel.send(xd);
  },
};
