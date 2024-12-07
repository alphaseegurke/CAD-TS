import { sequelize } from '../db';
import { DataTypes } from 'sequelize';

const Call = sequelize.define('Call', {
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'pending'
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
});

export default Call;
