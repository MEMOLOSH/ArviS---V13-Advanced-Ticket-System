const { getPasteUrl, PrivateBinClient } = require('@agc93/privatebin');//ArviS#0011

module.exports = {//ArviS#0011
  name: 'interactionCreate',
  async execute(interaction, client) {//ArviS#0011
    if (!interaction.isButton()) return;
    if (interaction.customId == "destek-aç") {//ArviS#0011
      if (client.guilds.cache.get(interaction.guildId).channels.cache.find(c => c.topic == interaction.user.id)) {//ArviS#0011
        return interaction.reply({
          content: '<:carpi_arvis0011:1046067681515814912> لديك بالفعل تذكرة ، لا يمكنك فتح المزيد',
          ephemeral: true//ArviS#0011
        });// ArviS#0011
      };// ArviS#0011
// ArviS#0011
      interaction.guild.channels.create(`destek-${interaction.user.username}`, {
        parent: client.config.DestekKanalıKategorisi,
        topic: interaction.user.id,
        permissionOverwrites: [{// ArviS#0011
            id: interaction.user.id,
            allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
          },
          {
            id: client.config.YetkiliRolü,
            allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
          },
          {
            id: interaction.guild.roles.everyone,
            deny: ['VIEW_CHANNEL'],
          },
        ],
        type: "GUILD_TEXT",// ArviS#0011
      }).then(async c => {
        interaction.reply({
          content: `<:tik2_arvis0011:1046067679884234863> تم إنشاء ✦تذكرة✦ بنجاح  \n(<#${c.id}>)`,
          ephemeral: true
        });

        const embed = new client.discord.MessageEmbed()// ArviS#0011
          .setColor('#2f3136')
          .setImage("https://media.discordapp.net/attachments/1150005574734446592/1152930999668310067/ALPHAAAAAAAAAAAAAAAAAAAA.gif?width=1352&height=676")
          .setDescription(':حدد الموضوع الذي تريد الدعم منه أدناه \n\n<a: __اذا لم تقم باي اجراء خلال 5 دقايق رح✦ تنغلق ✦التذكرة__')
          .setFooter({text: `Made by ❤️ ✦✦✦MEMO✦✦✦`});

        const row = new client.discord.MessageActionRow()
          .addComponents(
            new client.discord.MessageSelectMenu()
            .setCustomId('Kategori')
            .setPlaceholder('🎫 🎫 اضفط لتحديد✦ نوع طلبك')
            .addOptions([{
                label: client.config.Kategori1,
                value: client.config.Kategori1,
                emoji: '<:siparis_arvis0011:1051904220657356810>',
              },
              {
                label: client.config.Kategori2,//     ArviS#0011
                value: client.config.Kategori2,//     ArviS#0011
                emoji: '<:ucretlihizmet_arvis0011:1051904219159986236>',
              },
              {
                label: client.config.Kategori3,
                value: client.config.Kategori3,
                emoji: '<:odac_arvis0011:1051904217478070276>',
              },
              {
                label: client.config.Kategori4,
                value: client.config.Kategori4,
                emoji: ':yarisma_arvis0011:1051904858602623126>',
              },
              {
                label: client.config.Kategori5,//     ArviS#0011
                value: client.config.Kategori5,//     ArviS#0011
                emoji: '<:sikayet_arvis0011:1051904216060407929>',
              },
            ]),
          );

        msg = await c.send({
          content: `**صاحب التذكرة:** <@!${interaction.user.id}>`,//     ArviS#0011
          embeds: [embed],
          components: [row]//     ArviS#0011
        });

        const collector = msg.createMessageComponentCollector({
          componentType: 'SELECT_MENU',
          time: 300000 //5 Dakika
        });

        collector.on('collect', i => {
          if (i.user.id === interaction.user.id) {
            if (msg.deletable) {
              msg.delete().then(async () => {
                const embed = new client.discord.MessageEmbed()//     ArviS#0011
                  .setColor('#2f3136')
                  .setAuthor({name: `✦✦𝐌𝐄𝐌𝐎✦✦ |𝐀𝐝𝐯𝐚𝐧𝐜𝐞𝐝 𝐓𝐢𝐜𝐤𝐞𝐭 𝐒𝐲𝐬𝐭𝐞𝐦`, iconURL: interaction.user.displayAvatarURL()})
                  .setDescription("شكرا لك على التواصل مع متجر الفا ستور سيتم الرد عليك في أقرب لاتتردد في الإطلاع على باقي المنتجات بينما يتم الرد عليك \n\nإذا تجاوز وقت الانتظار 10 دقائق ، يمكنك عمل اشارة على مسؤول نشط")
                  .addFields(
                    { name: '\u200B', value: '\u200B' },
                    {name: "✦المستخدم:", value: `<@!${interaction.user.id}> (${interaction.user.tag})`, inline: true},
                    {name: "✦السبب", value: `${i.values[0]}`, inline: true}
                  )
                  //.setDescription(`**Kullanıcı: **<@!${interaction.user.id}> \n\nSebep: \`${i.values[0]}\``)
                  .setFooter({text: `Made by ❤️ ✦✦𝐌𝐄𝐌𝐎✦✦`});

                const row = new client.discord.MessageActionRow()//     ArviS#0011
                  .addComponents(
                    new client.discord.MessageButton()//     ArviS#0011
                    .setCustomId('destek-kapat')//     ArviS#0011
                    .setLabel('اغلاق التذكرة')
                    .setEmoji('<:kapat_arvis0011:1051904224113471599>')//     ArviS#0011
                    .setStyle('DANGER'),
                  );

                const opened = await c.send({//     ArviS#0011
                  content: `(<@&${client.config.YetkiliRolü}>) ✦يامسؤولين المتجر في واحد فتح تكت`,
                  embeds: [embed],
                  components: [row]
                });

                opened.pin().then(() => {//     ArviS#0011
                  opened.channel.bulkDelete(1);//     ArviS#0011
                });
              });
            };
          };
        });

         //collector.on('end', collected => {if (collected.size < 1) {c.send(`<a:dikkat_arvis0011:997074866371039322> Her Hangi Bir Kategori Seçilmediği İçin Talep Geçersiz Kılındı, 5 Saniye İçinde Silinecek \n\nYeni Destek Talebi Oluştur, Bu Sefer Daha Hızlı Ol :)`).then(() => {setTimeout(() => {if (c. deletable) {c.delete();};}, 5000);});};});
      });
    };

    if (interaction.customId == "destek-kapat") {
      const guild = client.guilds.cache.get(interaction.guildId);//     ArviS#0011
      const arvis = guild.channels.cache.get(interaction.channelId);//     ArviS#0011

const row = new client.discord.MessageActionRow()
.addComponents(
  new client.discord.MessageButton()
  .setCustomId('kapatmayı-onayla')
  .setLabel('متاكد')
  .setEmoji("<:kapat_arvis0011:1051904224113471599>")
  .setStyle('DANGER'),

  new client.discord.MessageButton()
.setCustomId('kapatmayı-reddet')
.setLabel('✦تراجع')
.setStyle('SECONDARY')
);



      const verif = await interaction.reply({
        content: '❓ ❓هل انت متاكد من إغلاق التذكرة❓',
        components: [row]
      });//     ArviS#0011
//     ArviS#0011
      const collector = interaction.channel.createMessageComponentCollector({
        componentType: 'BUTTON',
        time: 300000 //5 Dakika
      });

      collector.on('collect', i => {
        if (i.customId == 'kapatmayı-onayla') {
          interaction.editReply({
            content: `التذكرة (<@!${interaction.user.id}>) اغلقت بواسطة`,
            components: []
          });

          arvis.edit({//   ArviS#0011
              name: `kapandı-${arvis.name}`,
              permissionOverwrites: [
                {
                  id: client.users.cache.get(arvis.topic),
                  deny: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
                },//   ArviS#0011
                {
                  id: client.config.YetkiliRolü,
                  allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
                },
                {
                  id: interaction.guild.roles.everyone,
                  deny: ['VIEW_CHANNEL'],
                },
              ],
            })//   ArviS#0011
            .then(async () => {
              const embed = new client.discord.MessageEmbed()
                .setColor('#2f3136')
                .setAuthor({name: '✦𝐌𝐞𝐦𝐨 𝐓𝐢𝐜𝐤𝐞𝐭✦|𝐓𝐢𝐜𝐤𝐞𝐭 𝐒𝐲𝐬𝐭𝐞𝐦', iconURL: client.user.displayAvatarURL()})
                .setDescription('```باستخدام الزر أدناه ، يمكنك عمل نسخة احتياطية من جميع المحادثات التي جرت على التذكرة \n\n𝑷𝒐𝒘𝒆𝒓𝒆𝒅 𝑩𝒚 𝑴𝑬𝑴𝑶```')
                .setFooter({text: `𝑴𝒂𝒅𝒆 𝒃𝒚 ❤️✦✦𝐌𝐄𝐌𝐎✦✦`});

              const row = new client.discord.MessageActionRow()
                .addComponents(
                  new client.discord.MessageButton()
                  .setCustomId('desteği-sil')
                  .setLabel('تحميل✦ ✦التذكرة')
                  .setEmoji('<:yedek_arvis0011:1051904222150529094>')
                  .setStyle('SUCCESS'),
                );
//   ArviS#0011
              arvis.send({
                embeds: [embed],
                components: [row]
              });//   ArviS#0011
            });

          collector.stop();
        };
        if (i.customId == 'kapatmayı-reddet') {
          interaction.editReply({
            content: '<:carpi_arvis0011:1046067681515814912> الغيت اغلاق التذكرة',
            components: []
          });
          collector.stop();
        };
      });//   ArviS#0011

      collector.on('end', (i) => {
        if (i.size < 1) {
          interaction.editReply({
            content: '<:saat_arvis0011:997076257843982356> Kapatma İşlemi Zamanaşımına Uğradı, Tekrar Dene',
            components: []
          });
        };//   ArviS#0011
      });//   ArviS#0011
    };
//   ArviS#0011
    if (interaction.customId == "desteği-sil") {
      const guild = client.guilds.cache.get(interaction.guildId);
      const arvis = guild.channels.cache.get(interaction.channelId);
//   ArviS#0011
      interaction.reply({
        content: '<a:yukleniyor2:997607500746596412> Mesajlar Kaydediliyor, Bu Biraz Zaman Alabilir'
      });//   ArviS#0011
//   ArviS#0011
      arvis.messages.fetch().then(async (messages) => {
        let a = messages.filter(m => m.author.bot !== true).map(m =>
          `${new Date(m.createdTimestamp).toLocaleString('en-EN')} - ${m.author.username}#${m.author.discriminator}: ${m.attachments.size > 0 ? m.attachments.first().proxyURL : m.content}`
        ).reverse().join('\n');
//   ArviS#0011
        if (a.length < 1) a = "[ArviS#0011] Hiçbir Şey Bulunamadı"//   ArviS#0011
//   ArviS#0011
        var paste = new PrivateBinClient("https://privatebin.net/");
        var result = await paste.uploadContent(a, {uploadFormat: 'markdown'})
//   ArviS#0011
            const embed = new client.discord.MessageEmbed()
              .setAuthor({name: 'ارشيف التذذذذكرة', iconURL: interaction.user.displayAvatarURL()})
              .setDescription(`<:neonsagok_arvis0011:997610091530428486> (\`${arvis.id}\`) ارشيف التذكرة`)
              .addFields(
                { name: '\u200B', value: '\u200B' },
                {name: "صاحب التذكرة:", value: `<@!${arvis.topic}> (${interaction.user.tag})`, inline: true},
                {name: "مغلق التذكرة:", value: `<@!${interaction.user.id}> (${interaction.user.tag})`, inline: true},
                {name: "النسخ الاحتياطي للرسائل:", value: `[**انقر للوصول الى تذكرتك**](${getPasteUrl(result)})`, inline: true}
              )//   ArviS#0011
              .setColor('2f3136')
              .setFooter({text: "Made by ❤️MEMO"});
//   ArviS#0011
            client.channels.cache.get(client.config.LogKanalı).send({
              embeds: [embed]
            }).catch(() => console.log("<a:dikkat_arvis0011:997074866371039322> Log Kanalı Bulunamadı, Ayarlayıp Tekrar Dene"));
            arvis.send('<a:yukleniyor_arvis0011:997607162262061117> Kanal Siliniyor...');

            setTimeout(() => {
              arvis.delete();
            }, 5000);
       });
     };
  },
};



















//   ArviS#0011