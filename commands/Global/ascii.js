const figlet = require('figlet');

module.exports = {
    info: {
        name: "infoserver",
        description: "Mostra algumas informações sobre este servidor discord",
        usage: "",
        aliases: ["server","servidor", "serverinfo", "sinfo"],
    },
    run : async (bot, message, args) => 
    {
        message.delete();
        if(!args[0]) return message.channel.send('Please provide some text');

        msg = args.join(" ");

        figlet.text(msg, function (err, data){
            if(err){
                console.log('Something went wrong');
                console.dir(err);
            }
            if(data.length > 2000) return message.channel.send('Please provide text shorter than 2000 characters')

            message.channel.send('```' + data + '```')
        })

    }
}