const chalk = require('chalk');
//MEMO
module.exports = {//MEMO
  name: 'ready',//MEMO
  execute(client) {//MEMO
    client.user.setActivity("𝑷𝒐𝒘𝒆𝒓𝒆𝒅 𝑩𝒚 𝑴𝑬𝑴𝑶")//MEMO
    const arvis0011 = client.channels.cache.get(client.config.DestekKanalı)//MEMO
// ArviS#0011
    function sendTicketMSG() {// ArviS#0011
      const embed = new client.discord.MessageEmbed()// ArviS#0011
        .setColor('#2f3136')// ArviS#0011
        .setImage("https://media.discordapp.net/attachments/1150005574734446592/1152930999668310067/ALPHAAAAAAAAAAAAAAAAAAAA.gif?width=1352&height=676")
        .setAuthor(' ✦✦𝐌𝐄𝐌𝐎✦✦ 𝐓𝐢𝐜𝐤𝐞𝐭 𝐒𝐲𝐬𝐭𝐞𝐦', client.user.avatarURL())
        .setDescription('لانشاء تذكرة اضغط على الزر ادناه')//  ArviS#0011
        .setFooter(`𝑷𝒐𝒘𝒆𝒓𝒆𝒅 𝑩𝒚 𝑴𝑬𝑴𝑶`)// ArviS#0011

// ArviS#0011
      const row = new client.discord.MessageActionRow()
        .addComponents(//  ArviS#0011
          new client.discord.MessageButton()//  ArviS#0011
          .setCustomId('destek-aç')//  ArviS#0011
          .setLabel('✦فتح تذكرة✦')//  ArviS#0011
          .setEmoji('<a:4boyutdonensiyahkalp_arvis0011:1051894482381062164>')
          .setStyle('SUCCESS'),);
//  ArviS#0011
      arvis0011.send({
        embeds: [embed],//   ArviS#0011
        components: [row]})}//   ArviS#0011
    arvis0011.bulkDelete(100).then(() => {//   ArviS#0011
      sendTicketMSG()
//   ArviS#0011
      console.log(chalk.green('[BOT] ') + chalk.cyan('Embed Mesajı, Belirtilen Kanala Gönderildi'))})},};//   ArviS#0011
      //   ArviS#0011












      //   ArviS#0011