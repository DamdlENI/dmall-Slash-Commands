const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('config')
        .setDescription('Configurer le message à envoyer à tous les membres du serveur')
        .addStringOption(option =>
            option.setName('message')
                .setDescription('Le message à envoyer')
                .setRequired(true)),

    execute(interaction = new CommandInteraction()) {

        const message = interaction.options.getString('message');

        
        let config = {};
        try {
            config = require('../../config.json');
        } catch (error) {
            console.error('Erreur lors de la lecture du fichier de configuration:', error);
        }

        
        config.messageToSend = message;

        
        fs.writeFile('../../config.json', JSON.stringify(config, null, 2), err => {
            if (err) {
                console.error('Erreur lors de l\'écriture du fichier de configuration:', err);
                return interaction.reply({ content: 'Une erreur s\'est produite lors de la configuration du message.', ephemeral: true });
            }
            interaction.reply({ content: 'Le message à envoyer a été configuré avec succès !', ephemeral: true });
            console.log(message);
        });
    },
};