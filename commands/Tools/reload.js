module.exports = {
    info: {
      name: "reload",
      description: "ativa o loop da música",
      usage: "",
      aliases: ["recarregar"],
    },
    
    run : (client, message, args) => 
    {
    let user = message.author;
    var discordtag = "20cm sem uso#8776"

    if (user.id !== 'SEU ID') {
      return message.channel.send("Desculpa, esse comando é direcionado ao desenvolvedor, caso tenha algum problema entre em contato: ``"+discordtag+"``.");
    }
    
    if (args.length === 0) return message.channel.send("Use: `ki!reload <command>`");
    
    try {
      delete require.cache[require.resolve(`./${args[0]}`)];
    } catch (e) {
      return message.channel.send(`Comando não encontrado: **${args[0]}**`);
    }
    
    message.channel.send(`Comando recarregado, alterações aplicada: **${args[0]}**`);
    
  }
}