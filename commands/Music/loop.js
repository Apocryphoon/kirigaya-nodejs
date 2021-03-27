const { MessageEmbed } = require("discord.js");
const sendError = require("../../util/error");

module.exports = {
  info: {
    name: "loop",
    description: "ativa o loop da música",
    usage: "",
    aliases: ["l"],
  },

  run: async function (client, message, args) {
    const serverQueue = message.client.queue.get(message.guild.id);
       if (serverQueue) {
            serverQueue.loop = !serverQueue.loop;
            return message.channel.send({
                embed: {
                    color: "#00fff7",
                    description: `🔁  **|**  Repetição agora está: **\`${serverQueue.loop === true ? "Ligado" : "Desligado"}\`**`
                }
            });
        };
    return sendError("Não há nada tocando neste servidor.", message.channel);
  },
};
