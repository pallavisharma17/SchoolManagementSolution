import Sequelize from 'sequelize';

export const db = new Sequelize({
    username: 'root',
    password: 'root',
    database: 'learning_management_solution',
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 5000
    },
});

db.sync({alter:true})
    .then(() => console.log("Database has been synced"))
    .catch((err) => console.error("Error syncing database " + err))
