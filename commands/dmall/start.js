const { SlashCommandBuilder } = require('@discordjs/builders');
const { CommandInteraction, TextChannel } = require('discord.js');
const config = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('start')
        .setDescription('Envoyer le message configuré à tous les membres du serveur'),

    async execute(interaction) {
        // Vérifier que l'utilisateur est autorisé à exécuter cette commande
        if (!config.authorizedUsers.includes(interaction.user.id)) {
            return await interaction.reply({ content: "Vous n'êtes pas autorisé à exécuter cette commande.", ephemeral: true });
        }

        // Récupérer le message à envoyer depuis la configuration
        const message = config.messageToSend || "Message prédéfini récupéré depuis la configuration";

        // Récupérer tous les membres du serveur
        const members = await interaction.guild.members.fetch();


        //const logChannel = interaction.client.channels.cache.get('1205562761233301514');
        //if (!logChannel || !(logChannel instanceof TextChannel)) {
         //   console.error('Impossible de trouver le canal spécifié pour les logs.');
         // return await interaction.reply({ content: 'Impossible de trouver le canal spécifié pour les logs.', ephemeral: true });
     // }

       
        members.forEach(async (member) => {
            try {
                await member.send(message);
                const logMessage = `📗 |  Message envoyé à ${member.user.tag} (${member.user.id})`;
                console.log(logMessage);
               // await logChannel.send(logMessage);
                await new Promise(resolve => setTimeout(resolve, 2000)); // Délai de 2 secondes
            } catch (error) {
                const logMessage = `📕 | Impossible d'envoyer un message à ${member.user.tag} (${member.user.id}): ${error}`;
                console.error(logMessage);
                //await logChannel.send(logMessage);
            }
        });

        await interaction.reply({ content: 'Message envoyé à tous les membres du serveur !', ephemeral: true });
    },
};