import { Sequelize } from 'sequelize';
import User from './models/User';
import Call from './models/Call';
import Vehicle from './models/Vehicle';

export const sequelize = new Sequelize('sqlite::memory:');

export const createDatabaseConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Datenbankverbindung erfolgreich!');
        await sequelize.sync({ alter: true });
        console.log('Tabellen synchronisiert!');
    } catch (error) {
        console.error('Fehler bei der Datenbankverbindung:', error);
    }
};
