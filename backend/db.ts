import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('sqlite::memory:');

export const createDatabaseConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Datenbankverbindung erfolgreich!');
    } catch (error) {
        console.error('Fehler bei der Datenbankverbindung:', error);
    }
};
