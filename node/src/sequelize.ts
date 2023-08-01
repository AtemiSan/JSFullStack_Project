import { Sequelize } from 'sequelize-typescript'

export const sequelize = new Sequelize(process.env.DB_URI!, {
    dialect: "postgres",
    models: [`${__dirname}/models/`]
});
