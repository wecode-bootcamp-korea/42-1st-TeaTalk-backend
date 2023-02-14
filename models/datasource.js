const { DataSource } = require("typeorm");

const teaDataSource = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
});

teaDataSource
  .initialize()
  .then(() => {
    console.log("Data server has been initialized!!");
  })

  .catch((err) => {
    console.log("Failed to connect database", err);
    teaDataSource.destroy();
  });

module.exports = {
  teaDataSource,
};
