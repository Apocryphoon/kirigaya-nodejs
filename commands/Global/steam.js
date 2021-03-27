const discord = require('discord.js');
var steam = require('steam-provider') //npm i steam-provider
var provider = new steam.SteamProvider();

module.exports = {
    info: {
        name: "steam",
        description: "Mostra informações sobre determinado jogo na steam",
        usage: "",
        aliases: ["jogo"],
    },
run : (client, message, args, ops) => {
 
    let arg = args.join(' ') //Puxa os argumentos do  usuário

    if(!arg) return message.channel.send(`${message.author}, você precisa colocar um jogo!`) //retorna quando o usuário não coloca um jogo

    provider.search(arg).then(result => { //vai mostrar o resultado
        provider.detail(result[0].id, 1, "portuguese", "pt").then(results => { //tenta mostrar o resultado em Português (Brasil)

            let other = results.otherData //vai pegar os dados do jogo
            
                const embed = new discord.MessageEmbed()  //vai mostrar para o usuário todas as informações do jogo
                    .setTitle(results.name)
                    .setColor('RANDOM')
                    .setDescription(`\n\n**__GÊNERO__**: ${results.genres.join(', ')} \n**__PLATAFORMA__**: ${other.platforms.join(', ')}\n**__CARACTERÍSTICAS__**: ${other.features.join(', ')}\n\n**👑 |__DEVELOPER__**: ${other.developer.join(', ')}`)
                    .setThumbnail(other.imageUrl)
                    .setTimestamp()
                    .setFooter(" Atenciosamente Kirigaya 者","https://i.imgur.com/LwLJ33j.png")

                message.channel.send(embed)
            })
        })
    }
}