const { Util, MessageEmbed } = require("discord.js");
const diff = require('ansi-diff-stream')();
const createBar = require('string-progressbar');
const ytdl = require("ytdl-core");
const ytdlDiscord = require("ytdl-core-discord");
const yts = require("yt-search");
const fs = require("fs");
const sendError = require("../../util/error");
const scdl = require("soundcloud-downloader").default;
module.exports = {
    info: {
        name: "play",
        description: "Para tocar musicas",
        usage: "<YouTube_URL> | <song_name>",
        aliases: ["p", "tocar"],
    },

    run: async function (client, message, args) {
        let channel = message.member.voice.channel;
        if (!channel) return sendError("Sinto muito, mas você precisa estar em um canal de voz para tocar música!", message.channel);

        const permissions = channel.permissionsFor(message.client.user);
        if (!permissions.has("CONNECT")) return sendError("Não consigo me conectar ao seu canal de voz, verifique se tenho as permissões adequadas!", message.channel);
        if (!permissions.has("SPEAK")) return sendError("Não posso falar neste canal de voz, certifique-se de que tenho as permissões adequadas!", message.channel);

        var searchString = args.join(" ");
        if (!searchString) return sendError("Você não quis, eu quero tocar", message.channel);
        const url = args[0] ? args[0].replace(/<(.+)>/g, "$1") : "";
        var serverQueue = message.client.queue.get(message.guild.id);

        let songInfo = null;
        let song = null;
        if (url.match(/^(https?:\/\/)?(www\.)?(m\.)?(youtube\.com|youtu\.?be)\/.+$/gi)) {
            try {
                songInfo = await ytdl.getInfo(url);
                if (!songInfo) return sendError("Parece que não consegui encontrar a música no YouTube", message.channel);
                song = {
                    id: songInfo.videoDetails.videoId,
                    title: songInfo.videoDetails.title,
                    url: songInfo.videoDetails.video_url,
                    img: songInfo.player_response.videoDetails.thumbnail.thumbnails[0].url,
                    duration: songInfo.videoDetails.lengthSeconds,
                    ago: songInfo.videoDetails.publishDate,
                    views: String(songInfo.videoDetails.viewCount).padStart(10, " "),
                    req: message.author,
                };
            } catch (error) {
                console.error(error);
                return message.reply(error.message).catch(console.error);
            }
        } else if (url.match(/^https?:\/\/(soundcloud\.com)\/(.*)$/gi)) {
            try {
                songInfo = await scdl.getInfo(url);
                if (!songInfo) return sendError("Parece que não consegui encontrar a música no soundcloud", message.channel);
                song = {
                    id: songInfo.permalink,
                    title: songInfo.title,
                    url: songInfo.permalink_url,
                    img: songInfo.artwork_url,
                    ago: songInfo.last_modified,
                    views: String(songInfo.playback_count).padStart(10, " "),
                    duration: Math.ceil(songInfo.duration / 1000),
                    req: message.author,
                };
            } catch (error) {
                console.error(error);
                return sendError(error.message, message.channel).catch(console.error);
            }
        } else {
            try {
                var searched = await yts.search(searchString);
                if (searched.videos.length === 0) return sendError("Parece que não consegui encontrar a música no YouTube", message.channel);

                songInfo = searched.videos[0];
                song = {
                    id: songInfo.videoId,
                    title: Util.escapeMarkdown(songInfo.title),
                    views: String(songInfo.views).padStart(10, " "),
                    url: songInfo.url,
                    ago: songInfo.ago,
                    test: songInfo.seconds,//valor em segundos da musica
                    seg: songInfo.duration.toString(),//valor + segundos
                    duration: songInfo.seconds,//duration.timestamp,//valor em segundo e minutos
                    img: songInfo.image,
                    req: message.author,
                };
            } catch (error) {
                console.error(error);
                return message.reply(error.message).catch(console.error);
            }
        }

        if (serverQueue) {
            serverQueue.songs.push(song);
            let thing = new MessageEmbed()
                //.setAuthor(`<a:checkout:745851470947024936> | Adicionada: ${song.title}`)
                .addField(`<a:checkout:745851470947024936> |ㅤAdicionada:\n`, song.title, false)
                .setThumbnail(song.img)
                .setColor("#00fff7")
                //.addField("Nome", song.title, true)
                .addField(`Duração`, "[" + song.duration + "] Segㅤ", true)
                .addField(`Lançado em`, song.ago , true)
                .addField(`Solicitado por`, song.req.tag, true)
                //.addField("Pedida por", song.req.tag, true)
                //.setFooter(`Visualizações: ${song.views} | ${song.ago}`);
            return message.channel.send(thing);
        }

        const queueConstruct = {
            textChannel: message.channel,
            voiceChannel: channel,
            connection: null,
            songs: [],
            volume: 50,
            playing: true,
            loop: false,
        };
        message.client.queue.set(message.guild.id, queueConstruct);
        queueConstruct.songs.push(song);

        const play = async (song) => {
            const queue = message.client.queue.get(message.guild.id);
            if (!song) {
                sendError(
                );
                message.client.queue.delete(message.guild.id);
                return;
            }
            let stream;
            let streamType;

            try {
                if (song.url.includes("soundcloud.com")) {
                    try {
                        stream = await scdl.downloadFormat(song.url, scdl.FORMATS.OPUS, client.config.SOUNDCLOUD);
                    } catch (error) {
                        stream = await scdl.downloadFormat(song.url, scdl.FORMATS.MP3, client.config.SOUNDCLOUD);
                        streamType = "unknown";
                    }
                } else if (song.url.includes("youtube.com")) {
                    stream = await ytdl(song.url, { quality: "highestaudio", highWaterMark: 1 << 25, type: "opus" });
                    stream.on("error", function (er) {
                        if (er) {
                            if (queue) {
                                queue.songs.shift();
                                play(queue.songs[0]);
                                return sendError(`Ocorreu um erro inesperado. \n Tipo possível \`${er}\``, message.channel);
                            }
                        }
                    });
                }
            } catch (error) {
                console.log();
                if (queue) {
                    queue.songs.shift();
                    play(queue.songs[0]);
                }
            }
            queue.connection.on("disconnect", () => message.client.queue.delete(message.guild.id));
            const dispatcher = queue.connection.play(stream).on("finish", () => {
                const shiffed = queue.songs.shift();
                if (queue.loop === true) {
                    queue.songs.push(shiffed);
                }
                play(queue.songs[0]);
            });

            //QUANDO USA LINK A DURAÇÃO VEM EM SEGUNDOS, QUANDO USA ESCRITA VEM EM MINUTO EX 3:30
            var size = 20;
            let total = song.duration;//170 add 20?
            let cr = total % 100;
            var slide = "🔵";
            var line = "▬";

            console.log(total);
            let value = createBar(total, cr++, size, line, slide);//cr++
            
            var frase = song.title;//frase com o nome da musica
            var frase_array = frase.split(' ');//separa a musica por (" ") e salva em um array

            for(var i = 0; i < frase_array.length; i++) 
            {
                console.log(frase_array[i])

                if(frase_array[i] != undefined)
                {
                    frase_array[i] = frase_array[i].replace(/^\s*/, "").replace(/\s*$/, "");
                }                
            }

            //             var vetor = ["A", "B", "C", "D", "E"];
            // var elementosRemovidos = vetor.splice(1, 2); // Remove o segundo e terceiro elementos do vetor.

            // console.log(elementosRemovidos); // ["B", "C"]
            // console.log(vetor); // ["A", "D", "E"]

            dispatcher.setVolumeLogarithmic(queue.volume / 100);

            queue.textChannel.send({embed: {
                color: "#00fff7",
                fields: [{
                    name: `<a:checkout:745851470947024936> |ㅤTocando:`,//+ frase_array[0] + " " + frase_array[1] + " " + frase_array[2] + " " + frase_array[3] + " " +frase_array[4] + " " +frase_array[5]+ " " +frase_array[6],
                    value: `${song.title}`,//
                    inline: false,
                },
                {
                    name: `ㅤ`,
                    value: `<a:discozinho:745141833633366077> | **[**` +value[0]+`**]**`,
                    inline: false,                        
                },
                {
                    name: "Duraçãoㅤ",
                    value: "[" + song.duration + "] Segㅤ",
                    inline: true,                        
                },
                {
                    name: `Lançado emㅤ` ,
                    value: song.ago + `ㅤ`,
                    inline: true
                },
                {
                    name: `Solicitado por` ,
                    value: song.req.tag,
                    inline: true
                }],
                // footer: {
                //     text: `Solicitado por : ${song.req.tag}`,
                // }
            }}).then(m => {
                    var int = setInterval(() => 
                    {
                        let value = createBar(total, cr++, size, line, slide);
                        
                        if (total < cr || !song) 
                        {
                            console.log("ENTROU NO IF");
                            clearInterval(int);
                        }
                        m.edit({embed: {
                            color: "#00fff7",
                fields: [{
                    name: `<a:checkout:745851470947024936> |ㅤTocando:`,//+ frase_array[0] + " " + frase_array[1] + " " + frase_array[2] + " " + frase_array[3] + " " +frase_array[4] + " " +frase_array[5]+ " " +frase_array[6],
                    value: `${song.title}`,//
                    inline: false,
                },
                {
                    name: `ㅤ`,
                    value: `<a:discozinho:745141833633366077> | **[**` +value[0]+`**]**`,
                    inline: false,                        
                },
                {
                    name: "Duraçãoㅤ",
                    value: "[" + song.duration + "] Segㅤ",
                    inline: true,                        
                },
                {
                    name: `Lançado emㅤ` ,
                    value: song.ago + `ㅤ`,
                    inline: true
                },
                {
                    name: `Solicitado por` ,
                    value: song.req.tag,
                    inline: true
                }],
                            // footer: {
                            //     text: `Solicitado por : ${song.req.tag}`,
                            // }
                        }});
                    }, 1200)
                })
        }
          
        try {
            const connection = await channel.join();
            queueConstruct.connection = connection;
            play(queueConstruct.songs[0]);
        } catch (error) {
            console.error(`Não consegui entrar no canal de voz: ${error}`);
            message.client.queue.delete(message.guild.id);
            await channel.leave();
            return sendError(`Não consegui entrar no canal de voz: ${error}`, message.channel);
        }
    },
};

