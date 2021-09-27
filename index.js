const Discord = require("discord.js");
const util = require('minecraft-server-util');
const client = new Discord.Client();
const config = require("./config.json");

client.on("ready", () => {
  console.log(`TrCraft - BOT iniciado com sucesso! Created by: LawL#0719 / lawlidev.tk`); 
  client.user.setActivity(`em jogar.trcraft.com.br`);
});

client.on("guildCreate", guild => {
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setActivity(`em jogar.trcraft.com.br`);
});

client.on("guildDelete", guild => {
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`em jogar.trcraft.com.br`);
});


client.on("message", async message => {
  
  if(message.author.bot) return;
  
  if(!message.content.startsWith(config.prefix)) return;
  
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  if(command === "ip") {
    message.delete()
    message.reply(('jogar.trcraft.com.br'));
  }
  if(command === "ping") {
    message.delete().catch(O_o=>{});
    const m = await message.channel.send(`:ping_pong: Pong!`);
    message.channel.send(`:ping_pong: **|** ${message.author}\n:satellite: **|** **WebSocket Ping:** \`${Math.round(client.ping)}ms\`\n:stopwatch: **|** **API Ping:** \`${m.createdTimestamp - message.createdTimestamp}ms\``)

    m.delete();
  }
  if(command === "serverinfo") {
    if(message.guild.region === "brazil") var region = ":flag_br: Brasil";
    if(message.guild.region === "eu-central") var region = ":flag_eu: Europa Central";
    if(message.guild.region === "hongkong") var region = ":flag_hk: Hong Kong";
    if(message.guild.region === "japan") var region = ":flag_jp: Japão";
    if(message.guild.region === "russia") var region = ":flag_ru: Russia";
    if(message.guild.region === "singapore") var region = ":flag_sg: Cingapura";//
    if(message.guild.region === "southafrica") var region = ":flag_za: África do Sul";
    if(message.guild.region === "sydney") var region = ":flag_au: Sydney";
    if(message.guild.region === "us-central") var region = ":flag_us: Estados Unidos Centrais";
    if(message.guild.region === "us-east") var region = ":flag_us: Leste dos Estados Unidos";
    if(message.guild.region === "us-south") var region = ":flag_us: Sul dos Estados Unidos";
    if(message.guild.region === "us-west") var region = ":flag_us: Norte dos Estados Unidos Centrais";
    if(message.guild.region === "eu-west") var region = ":flag_eu: Europa Ocidental";
    let servericon = message.guild.iconURL;
    const serverinfo = new Discord.MessageEmbed()
        .setAuthor(message.guild.name, servericon)
        .setColor(3447003)
        
        .addField('💻 ID:', message.guild.id, true)
        .addField('👑 Dono:', message.guild.owner.user.tag, true)
        .addField('🌎 Região:', region, true)
        .addField('👥 Membros:', `**Total de membros**: ${message.guild.memberCount}`)
        .addField('🗓 Criado em:', message.guild.createdAt, true)
        
        .setTimestamp()
        .setFooter("© TrCraft - BOT", client.user.avatarURL);
  
    message.channel.send(message.author, serverinfo)
  }
  if(command ==="kick") {
    message.delete().catch(O_o=>{});
    if(!message.member.hasPermission('KICK_MEMBERS')) return message.reply(`você não tem permissão!`).then(msg => msg.delete(6000));
    const comousar = new Discord.MessageEmbed()
      .setAuthor("TrCraft", client.user.avatarURL)
      .setTitle(`tr!kick`)
      .setDescription(`Irá kickar usuário mencionado.`)
      .setColor("#22a7cc")
      .setFooter("© TrCraft - BOT")
      .addField("Como usar:", `\`tr!kick @usuário <motivo>\`\n\`tr!kick @LawL#0719 Criador\``)
      .addField("Permissão:", "O staff que for banir tem que esta em um cargo com a permissão `Kickar membros`")
      let member = message.mentions.members.first();
      if (!member) 
        return message.channel.send(message.author, comousar).then(msg => msg.delete(10000));
        if(!member.bannable) 
        return message.reply("eu não posso kickar esse usuário! Ele(a) têm um cargo maior.");
    let motivo = args.slice(1).join(' ');
    if(!motivo) motivo = "Não informado";

    const kickmsg = new Discord.MessageEmbed()
    .setTitle(`${member.user.tag} | Kick`)
    .setDescription(`Você foi kickado do servidor **${message.guild.name}**!`)
    .setColor("#aa0303")
    .setThumbnail(member.user.displayAvatarURL)
    .addField("📋 Motivo:", motivo)
    .setTimestamp()
    .setFooter("© TrCraft Moderação")

    const kickado = new Discord.MessageEmbed()
    .setTitle(`${member.user.tag} | Kickado`)
    .setDescription(`**${member.user.tag}** foi kickado do servidor!`)
    .setColor("#aa0303")
    .setThumbnail(message.author.displayAvatarURL)
    .addField("👮 Por:", message.author)
    .addField("📋 Motivo:", motivo)
    .setTimestamp()
    .setFooter("© TrCraft Moderação")
    if(message.guild.channels.cache.find(ch => ch.id === "764976791021944852")){
      let guild = message.guild.channels.cache.find(ch => ch.id === "764976791021944852");   
      guild.send(kickado).catch(O_o=>{});
      member.send(kickmsg).catch(O_o=>{});
    }

    await member
    .kick({
      reason: 'TrCraft - Descumprium as regras!',
    })
    .then(() => {
      message.reply(`Membro: ${member.user.tag} foi kickado! | Motivo: ` + motivo)
        .catch(error => message.reply(`Desculpa ${message.author}, eu não poderia kickar por causa de: \```js\n${error}\````));
      });
  }
  
  if(command === "ban") {
    message.delete().catch(O_o=>{});
    if(!message.member.hasPermission('BAN_MEMBERS')) return message.reply(`você não tem permissão!`).then(msg => msg.delete(6000));
    const comousar = new Discord.MessageEmbed()
      .setAuthor("TrCraft", client.user.avatarURL)
      .setTitle(`tr!ban`)
      .setDescription(`Irá banir o usuário mencionado.`)
      .setColor("#22a7cc")
      .setFooter("© TrCraft - BOT")
      .addField("Como usar:", `\`tr!ban @usuário <motivo>\`\n\`tr!ban @LawL#0719 Criador\``)
      .addField("Permissão:", "O staff que for banir tem que esta em um cargo com a permissão `Banir membros`")
      let member = message.mentions.members.first();
      if (!member) 
        return message.channel.send(message.author, comousar).then(msg => msg.delete(10000));
        if(!member.bannable) 
        return message.reply("eu não posso banir esse usuário! Ele(a) têm um cargo maior.");

    let motivo = args.slice(1).join(' ');
    if(!motivo) motivo = "Não informado";
    await member
    .ban({
      reason: 'TrCraft - Descumpriu as regras!',
    })
    .then(() => {
      message.reply(`Membro: ${member.user.tag} foi banido! | Motivo: ` + motivo)
        .catch(error => message.reply(`Desculpa ${message.author}, eu não poderia banir por causa de: \```js\n${error}\````));

        const banido = new Discord.MessageEmbed()
        .setTitle(`${member.user.tag} | Banido`)
        .setDescription(`**${member.user.tag}** foi banido do servidor!`)
        .setColor("#aa0303")
        .setThumbnail(message.author.displayAvatarURL)
        .addField("👮 Por:", message.author)
        .addField("📋 Motivo:", motivo)
        .setTimestamp()
        .setFooter("© TrCraft Moderação")

        if(message.guild.channels.cache.find(ch => ch.id === "687813844726448226")){
          let guild = message.guild.channels.cache.find(ch => ch.id === "687813844726448226");   
          guild.send(banido).catch(O_o=>{});
        }
      });
  }
  if(command === "botinfo") {
    message.delete().catch(O_o=>{});
    const info = new Discord.MessageEmbed()
    .setDescription(`\nOlá, eu sou o BOT Oficial do servidor de minecraft TrCraft, e fui criado com JavaScript.
    O meu prefix é **tr!**.
    :heart: Criador, LawL#0719, ele me criou! Website dele é lawlidev.tk `)
    .setColor('#8146DC')

    return message.channel.send(info);
  }
  if(command === "help"){
    message.delete().catch(O_o=>{});
    if(message) {
      const announce = new Discord.MessageEmbed()
      .setTitle('``🔔`` **TrCraft Comandos:**')
      .setDescription(`\n**tr!ip** - Irá mostrar o IP do servidor.
      **tr!botinfo** - Irá fazer um anúncio.
      **tr!ping** - Irá mostrar o ping da rede.
      **tr!servidor** - Irá mostrar informações do Servidor Minecraft.
      **tr!serverinfo** - Irá mostrar informações do Servidor Discord`)
      .setColor('#8146DC')
      .setTimestamp();

      return message.channel.send(announce);
    }
  }
  if(command === "limpar"){
    message.delete().catch(O_o=>{});
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("você não tem permissão! :x:");

    const comousar = new Discord.MessageEmbed()
      .setAuthor("TrCraft", client.user.avatarURL)
      .setTitle(`tr!limpar`)
      .setDescription(`Irá limpar o número de mensagens escolhido.`)
      .setColor("#22a7cc")
      .setFooter("© TrCraft - BOT")
      .addField("Como usar:", `tr!limpar <número maior que 2 e menor que 100`)
      .addField("Permissão:", "O staff que for mutar tem que esta em um cargo com a permissão `Gerenciar mensagens`")

      const num = args.join(" ");

   if(!num) return message.channel.send(comousar).then(msg => msg.delete(10000));
   if(isNaN(num) == true) return message.reply("por favor, digite somente números, de 2 a 100. :x:").then(msg => msg.delete(10000));
   if(num < 2) return message.reply("por favor, digite o número maior que 2 para deletar as mensagens. :x:").then(msg => msg.delete(8000));
   if(num > 100) return message.reply("por favor, digite o número maior que 2 e menos que 100. :x:").then(msg => msg.delete(8000));
   message.channel.bulkDelete(args[0]).catch(error => message.reply(`algumas mensagens não puderam ser deletadas por serem enviadas a mais de **2 semanas**!`));
   
   message.channel.send(`Chat limpo! Limpado **${args[0]}** mensagens por ${message.author}.`).then(msg => msg.delete(5000));
  }
  if(command === "helpmod"){
    message.delete().catch(O_o=>{});
    if(message.member.roles.cache.find(r => r.name === "SUPORTE")) { 
      return message.channel.send('> Você não pode usar esse comando!') }
    if(message) {
      const announce = new Discord.MessageEmbed()
      .setTitle('``🔔`` **TrCraft Comandos Moderação:**')
      .setDescription(`\n**tr!kick** - Comando para kickar jogadores (Necessário permissão **KICK_MEMBERS**).
      **tr!ban** - Comando para banir jogadores (Necessário permissão **BAN_MEMBERS**).
      **tr!limpar** - Comando para limpar até 100 mensagens (Necessário permissão **MANAGE_MESSAGES**).
      **tr!anunciar** - Comando para fazer um anúncio (Necessário permissão **ADMINISTRATOR**)`)
      .setColor('#8146DC')
      .setTimestamp();

      return message.channel.send(announce);
    }
  }

  if(command === "servidor") {
    message.delete().catch(O_o=>{});
    util.statusFE('jogar.trcraft.com.br') 
    .then((result) => {   
      if(result !== null) {
        console.log(JSON.stringify(result))
        var ponly = result.onlinePlayers
        var desc = result.description
        const server = new Discord.MessageEmbed()
        .setTitle('``🔔`` Status do Servidor:')
        .setDescription(`**Servidor IP:** jogar.trcraft.com.br
        **Status do Servidor:** Online 
        **MOTD:** ${desc}
        **Players online:** ${ponly} `)
        let member = message.mentions.members.first();
        if (!member) 
          return message.channel.send(message.author, server);
      }
    })
    .catch((error) => {
        throw error;
    });
  }

  if(command === "anunciar") {
    if (!message.member.hasPermission(['MANAGE_MESSAGES', 'ADMINISTRATOR'])) { return message.channel.send('> Você não pode usar esse comando!') }
  const mensg = args.slice(0).join(' ');
  if (!mensg) return null;
  message.delete()
  if(message) {
    const announce = new Discord.MessageEmbed()
    .setTitle('``🔔`` **TrCraft informa:**')
    .setDescription(mensg)
    .setColor('#8146DC')
    .setTimestamp();

  return message.channel.send('@everyone', announce);
  }
}
});

client.login(config.token);