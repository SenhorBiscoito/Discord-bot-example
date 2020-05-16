const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

module.exports = {
    name: "report",
    category: "moderation",
    description: "Reportar um membro",
    usage: "<mention, id>",
    run: async (client, message, args) => {
        if (message.deletable) message.delete();

        let rMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (!rMember)
            return message.reply("Não foi possivel achar essa pessoa").then(m => m.delete(5000));

        if (rMember.hasPermission("BAN_MEMBERS") || rMember.user.bot)
            return message.channel.send("Não pode reportar esse membro ;w;").then(m => m.delete(5000));

        if (!args[1])
            return message.channel.send("Por favor, fala o que esse membro aprontou!").then(m => m.delete(5000));

        const channel = message.guild.channels.cache.find(c => c.name === "☎denuncias")

        if (!channel)
            return message.channel.send("Não foi possivel achar um canal de `#reports`").then(m => m.delete(5000));

        const embed = new MessageEmbed()
            .setColor("#ff0000")
            .setTimestamp()
            .setFooter(message.guild.name, message.guild.iconURL)
            .setAuthor("Membro reportado", rMember.user.displayAvatarURL)
            .setDescription(stripIndents`**- Member:** ${rMember} (${rMember.user.id})
            **- Reportado por:** ${message.member}
            **- Reportado em:** ${message.channel}
            **- Razão:** ${args.slice(1).join(" ")}`);

        return channel.send(embed);
    }
}