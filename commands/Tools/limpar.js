const discord = require("discord.js");

module.exports = {
    info: {
        name: "limpar",
        aliases: ["clean", "clear"],
        description: "Limpa a sala de texto atual",
        usage: "[0 á 100]",
    },

run: async (client, message, args, ops) => {
            //Se o membro não tiver permissão
            if(!message.member.hasPermission("MANAGE_MESSAGES")){
                return message.reply("Você não pode excluir menssagens...").then(m.delete(5000));
            }

            let messagem ="";
            let deletar ="";
            let reason = args[0]
            let user = message.mentions.users.first()
        
            if (!reason) return message.reply("É necessario colocar um numero de 2 à 100")
            if (isNaN(reason)) return message.reply("É necessario colocar um numero de 2 à 100")
            if (reason < 2) return message.reply("Esse numero é muito baixo")
            if (reason > 100) return message.reply("Esse numero é muito alto")

            message.channel. messages.fetch({
                limit: reason,
            }).then((messages) => {
                if (!user) {
                    messagem = messages.filter(m => m.author.id).array().slice(0, reason)
                    deletar = messagem.filter(a => a.pinned === false)
                }
                message.channel.bulkDelete(deletar).catch(error => message.reply(error.stack))
            },
    )

            var embed = new discord.MessageEmbed()

            .setColor("#00fff7")
            .setTitle("🗑️ | Lixeiro")
            .setDescription("Acabei de limpar essa sala!")
            .setTimestamp()
            .setFooter(" Atenciosamente Kirigaya 者","https://i.imgur.com/LwLJ33j.png")
        
            message.channel.send(embed);
    }
}