const server = require("./src/app");
const { database } = require("./src/db/index");
require("dotenv").config();

const initializeDatabase = async () => {
  try {
    await database.authenticate();
    console.log(
      "Connection to the database has been established successfully."
    );

    await database.sync({ force: false });
    console.log(`Connected to ${database.getDatabaseName()} database`);

    server.listen(3001, () => {
      console.log(`listening on port 3001`);
    });
  } catch (error) {
    console.log("Unable to connect to the database:", error.message);
  }
};

initializeDatabase();
