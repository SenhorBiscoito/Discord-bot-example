const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const { getMember, formatDate } = require("../../functions.js");

module.exports = {
    name: "whois",
    aliases: ["who", "user", "info"],
    description: "Retorna a informação do usuário",
    usage: "[username | id | mention]",
    run: (client, message, args) => {
        const member = getMember(message, args.join(" "));

        // Member variables
        const joined = formatDate(member.joinedAt);
        const roles = member.roles.cache.filter(r => r.id !== message.guild.id).map(r => r).join(", ") || 'nop';

        // User variables
        const created = formatDate(member.user.createdAt);

        const embed = new MessageEmbed()
            .setFooter(member.displayName, member.user.displayAvatarURL)
            .setThumbnail(member.user.displayAvatarURL)
            .setColor(member.displayHexColor === '#000000' ? '#ffffff' : member.displayHexColor)

            .addField('Informação:', stripIndents`**- Nickname:** ${member.displayName}
            **- Se juntou em:** ${joined}
            **- Cargos:** ${roles}`, true)

            .addField('Usuário:', stripIndents`**- ID:** ${member.user.id}
            **- Username**: ${member.user.username}
            **- Tag**: ${member.user.tag}
            **- Criado em**: ${created}`, true)

            .setTimestamp()

        if (member.user.presence.game)
            embed.addField('Agora jogando', stripIndents`** Name:** ${member.user.presence.game.name}`);

        message.channel.send(embed);
    }
}