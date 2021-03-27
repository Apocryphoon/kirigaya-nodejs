const{Utils} = require("dbcm")
const discord = require("discord.js")
const utils = new Utils({lang:"pt-BR"})
module.exports = {
    info: {
        name: "discord",
        description: "Recebe algumas informações do discord",
        usage: "",
        aliases: [""],
    },
    run : async(client, message, args)=>{utils.discordStatus("summary",async data=>{

        let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
        let avatar = user.avatarURL({ dynamic: true, format: "png", size: 1024 });

        let ed=data.components,
        sd=data.scheduled_maintenances,
        id=data.incidents,
        iid=id.incident_updates,
        sid=sd.incident_updates,
        cd="Criado em",
        dd="Descrição",
        edd="Editado em",    

        dataEmbed=new discord.MessageEmbed()
        .setColor("#00ffee")
        .setTitle("Discord Status:")
        .setTimestamp()
        .setTimestamp()
        .setFooter(" Atenciosamente Kirigaya 者","https://i.imgur.com/LwLJ33j.png")
        .setDescription(`Todos os horários são exibidos como \`America/Tijuana\`, horário padrão de Discord Status API.\n\nEstado atual: ${data.status.description}\n\nEditado últimamente às: ${data.page["updated_at"]}\n\n🔗[Link](${data.page.url})\n\n`)
        .addField("API-"+ed[0].status,`${cd}: ${ed[0].created_at}\n${edd}: ${ed[0].updated_at}`)
        .addField(`${ed[2].name}-${ed[2].status}`,`${cd}: ${ed[2].created_at}\n${edd}: ${ed[2].updated_at}`)
        .addField(`${ed[4].name}-${ed[4].status}`,`${dd}: ${ed[4].description}\n${cd}: ${ed[4].created_at}\n${edd}: ${ed[4].updated_at}`)
        .addField(`${ed[5].name}-${ed[5].status}`,`${dd}: ${ed[5].description}\n${cd}: ${ed[5].created_at}\n${edd}: ${ed[5].updated_at}`)


        if(id[0]==undefined)
        {
            dataEmbed.addField(`🔧Incidente`, `Não está ocorrendo nenhum incidente agora.`)
        }else 
        {
            dataEmbed.addField(`🔧Incidente-Informações recentes:`,`Estado: ${iid[0].status}\nConteúdo: ${iid[0].body}\n${cd}: ${iid[0].created_at}\n${edd}: ${iid[0].updated_at}\nAtualizado em: ${iid[0].display_at}`)
            
        }if(sd[0]==undefined){
            dataEmbed.addField("⚠️Manuntenção agendada", `Não tem`)
        }else 
        {
            dataEmbed.addField(`⚠Manuntenção-agendada Informações recentes:`, `Estado: ${sid[0].status}\nConteúdo: ${sid[0].body}\n${cd}: ${sid[0].created_at}\n${edd}: ${sid[0].updated_at}\nAtualizado em: ${sid[0].display_at}`)    }

        
        message.channel.send(dataEmbed)
    })
    }
}