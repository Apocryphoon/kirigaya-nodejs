const discord = require("discord.js");

module.exports = {
    info: {
        name: "anuncio",
        description: "Faz um anuncio emm uma sala discord",
        usage: "",
        aliases: ["alerta"],
    },
    run : async (client, message, args, ops) => 
    {
        if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("Você precisa da permissão `MANAGE_GUILD` para executar esse comando!");

            const canal = message.mentions.channels.first();
            const aviso = args.slice(1).join(" ");
        
            if(!canal) return message.channel.send("Não foi possivel encontrar esse canal! Utilize: ki!anuncio <#canal> <aviso>");
            if(!aviso) return message.channel.send("Utilize: ki!anuncio <#canal> <aviso>");
        
            let embed = new discord.MessageEmbed() 
            .setTitle("⚠️ Aviso ⚠️")
            .setColor("#00ffee")
            .setDescription(aviso)
            .setTimestamp()
            .setFooter(`Aviso enviado por ${message.author.tag}`, message.author.displayAvatarURL);
            
            canal.send(embed);
        }
    }