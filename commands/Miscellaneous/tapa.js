const Discord = require('discord.js');

module.exports = {
    info: {
        name: "tapa",
        description: "Da um tapa em determinado usuario",
        usage: "",
        aliases: [""],
    },
    run : async (client, message, args) => {

        var list = [
            'https://i.imgur.com/2r32eHP.gif',
            'https://i.imgur.com/4yysn86.gif'
        ];

        var rand = list[Math.floor(Math.random() * list.length)];
        let user = message.mentions.users.first() || client.users.cache.get(args[0]);
        if (!user) return message.reply('lembre-se de mencionar um usuário válido para deitar na porrada!');

        let avatar = message.author.displayAvatarURL({format: 'png'});
        const embed = new Discord.MessageEmbed()
                .setColor('#00ffee')
                .setDescription(`${message.author} acaba de senta a porrada em ${user}`)
                .setImage(rand)
                .setTimestamp()
                .setThumbnail(avatar)
                .setFooter('kirigaya 者',"https://i.imgur.com/LwLJ33j.png")
                .setAuthor(message.author.tag, avatar);
        await message.channel.send(embed);
    }
}