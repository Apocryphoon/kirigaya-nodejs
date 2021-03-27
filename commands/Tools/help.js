const { MessageEmbed } = require('discord.js')

module.exports = {
    info: {
        name: "help",
        description: "Mostra todos comandos",
        usage: "[command]",
        aliases: ["commands", "help me", "pls help"]
    },

    run: async function(client, message, args){
        var allcmds = "";

        client.commands.forEach(cmd => {
            let cmdinfo = cmd.info
            allcmds+="`"+client.config.prefix+cmdinfo.name+" "+cmdinfo.usage+"` ~ "+cmdinfo.description+"\n"
        })

        let embed = new MessageEmbed()
        .setAuthor("COMANDOS DO BOT "+client.user.username,)
        .setColor("#00fff7")
        .setDescription(allcmds)
        .setFooter(`Para obter informações de cada comando que você pode fazer ${client.config.prefix}help [command].`)

        if(!args[0])return message.channel.send(embed)
        else {
            let cmd = args[0]
            let command = client.commands.get(cmd)
            if(!command)command = client.commands.find(x => x.info.aliases.includes(cmd))
            if(!command)return message.channel.send("Unknown Command")
            let commandinfo = new MessageEmbed()
            .setTitle("Comando: "+command.info.name+" info")
            .setColor("#00fff7")
            .setDescription(`
            Nome: ${command.info.name}
            Descrição: ${command.info.description}
            Como usa: \`\`${client.config.prefix}${command.info.name} ${command.info.usage}\`\`
            Aliases: ${command.info.aliases.join(", ")}
            `)
            message.channel.send(commandinfo)
        }
    }
}
