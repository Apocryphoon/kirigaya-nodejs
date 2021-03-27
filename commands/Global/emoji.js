const discord = require("discord.js");

module.exports = {
	info: {
		name: 'emoji', // nome do comando
		aliases: ["emo", "e"], // se quiser aliases, só colocar:          aliases: ['aliase1', 'aliase2', 'aliase3']  etc.
    description: "Um simples comando que envia emoji sem necessidade de um discord nitro.",
		category: "Global" // muita atenção com isso! este campo tem que corresponder a um nome de uma das pastas das categorias, dentro da pasta de comandos!
	},

	run: async (client, message, args) => {
        message.delete();
        if (!args[0])
          return message.channel.send(
            `**${message.author.username}, a sintaxe correta é:** ` +
              "`" +
              "!emoji nomedoemoji`"
          ); //Troque a exclamação ! da mensagem acima pelo seu prefixo
        let emoji = message.guild.emojis.cache.find(emoji => emoji.name === args[0]);
      
        if (!emoji) {
          message.channel.send(
            "`" + args[0] + "` **não é um emoji deste servidor.**"
          );
        } else if (emoji.animated === true) {
          message.channel.send(`<a:${args[0]}:${emoji.id}>`);
        } else {
          message.channel.send(`<:${args[0]}:${emoji.id}>`);
        }
    }
}
