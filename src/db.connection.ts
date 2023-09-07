import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(process.env.DB_URL as string)

/**
 * Connect to Database
 */
export async function connect() {
  try {
    await sequelize.authenticate();
    console.log("Connected to database!!");

    // sequelize.sync({ force: true}).then(function() {
    //   console.log("All models were synchronized successfully.")
    // });
  } catch (err: any) {
    console.log('Unable to connect to database:::', err.message);
  }
}



