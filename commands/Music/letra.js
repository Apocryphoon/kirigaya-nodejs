const { MessageEmbed } = require("discord.js");
const lyricsFinder = require("lyrics-finder");
const sendError = require("../../util/error");

module.exports = {
  info: {
    name: "letra",
    description: "Obtenha a letra da música que está tocando",
    usage: "[lyrics]",
    aliases: ["ly"],
  },

  run: async function (client, message, args) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return sendError("Não há nada tocando.",message.channel).catch(console.error);

    let lyrics = null;

    try {
      lyrics = await lyricsFinder(queue.songs[0].title, "");
      if (!lyrics) lyrics = `Nenhuma letra encontrada para ${queue.songs[0].title}.`;
    } catch (error) {
      lyrics = `Nenhuma letra encontrada para ${queue.songs[0].title}.`;
    }

    let lyricsEmbed = new MessageEmbed()
      .setAuthor(`${queue.songs[0].title} — Lyrics`)
      .setThumbnail(queue.songs[0].img)
      .setColor("YELLOW")
      .setDescription(lyrics)
      .setTimestamp();

    if (lyricsEmbed.description.length >= 2048)
      lyricsEmbed.description = `${lyricsEmbed.description.substr(0, 2045)}...`;
    return message.channel.send(lyricsEmbed).catch(console.error);
  },
};
