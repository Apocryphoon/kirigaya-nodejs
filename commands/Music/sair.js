const { MessageEmbed } = require("discord.js");
const sendError = require("../../util/error");

module.exports = {
    info: {
        name: "sair",
        aliases: ["leave", "disconnect"],
        description: "Sai do canal de voz!",
        usage: "sair",
    },

    run: async function (client, message, args) {
        let channel = message.member.voice.channel;
        if (!channel) return sendError("Me desculpe, mas você precisa estar em um canal de voz!", message.channel);
        if (!message.guild.me.voice.channel) return sendError("Eu não estou em nenhum canal de voz!", message.channel);

        try {
            await message.guild.me.voice.channel.leave();
        } catch (error) {
            await message.guild.me.voice.kick(message.guild.me.id);
            return sendError("Tentando sair do canal de voz...", message.channel);
        }

        let Embed = new MessageEmbed()
            .setColor("#00fff7")
            //.setAuthor(`<a:checkout:745851470947024936> | Vazei`)
            .addField(`<a:checkout:745851470947024936> |ㅤVazei`,`Sai do canal de voz!`,false)
            //\.addField(`<a:discozinho:745141833633366077> | Vazei`)
            //.addField("ㅤ",`Sai do canal de voz!`,false)
            //.setTimestamp()
            //.setFooter(`Solicitado por: ${message.author.tag}`, message.author.displayAvatarURL({format: "png"}))

        return message.channel.send(Embed).catch(() => message.channel.send("🎶 Saiu do canal de voz :C"));
    },
};
