// serverinfo.js
const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('serverinfo')
        .setDescription('Affiche les informations sur les serveurs où le bot est actuellement.'),

    async execute(interaction) {
        
        
        const guilds = interaction.client.guilds.cache;


        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Informations sur les serveurs')
            .setDescription(`Le bot est actuellement présent sur ${guilds.size} serveur(s).`);

        
            
        guilds.forEach(guild => {
            embed.setDescription(guild.name, `Nombre de membres: ${guild.memberCount}`);
        });

        // Envoyer l'embed en réponse à l'interaction
        await interaction.reply({ embeds: [embed] });
    },
};