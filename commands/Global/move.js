const { Util, MessageEmbed } = require("discord.js");
const diff = require('ansi-diff-stream')();
const createBar = require('string-progressbar');

module.exports = {
    info: {
        name: "move",
        description: "move",
        usage: "move",
        aliases: ["m","move","mov"],
    },

    run: async function (client, message, args)
    {
        let i = 0;
        
        let member = message.mentions.members.first();
        if (!member) return message.channel.send('Você deve mencionar algum membro.');//return message.reply

        if(!args[1]) return message.channel.send('Você deve informar o tempo da brincadeira');
        let msg = args.join(" "); 

        if(msg > 5 || msg < 0) return message.channel.send('O valor minimo é 1 e o valor maximo é 4');
        //let final = msg * 1000;

        const channelAtual = message.member.voice.channel.id;
        const channels = message.guild.channels.cache.filter(channel => channel.type == "voice")

        //console.log(channelAtual);

        for (const channel of channels.array())//
        {      
            member.voice.setChannel(channel.id);
            console.log(`Membro: ` + member.user.username + `, acaba de ser movido para a sala: ` + channel.name);
            //message.channel.send(`Membro: ` + `\*\*${member.user.username}\*\*` + `, acaba de ser movido para a sala: ` + `\*\*${channel.name}\*\*`);
        }         

        member.voice.setChannel(channelAtual);
        console.log(member.user.username + `, acaba de voltar ao canal de inicio.`)
        //return message.channel.send(`\*\*${member.user.username}\*\*` + `, Acaba de voltar ao canal de inicio.`);
    }
}