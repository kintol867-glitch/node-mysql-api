import config from "../config.json";
import { Sequelize } from "sequelize";
import accountModel from "../accounts/account.model";
import refreshTokenModel from "../accounts/refresh-token.model";

const db: any = {};

initialize();

async function initialize() {
  const host     = process.env.DB_HOST     || config.database.host;
  const port     = parseInt(process.env.DB_PORT || String(config.database.port));
  const user     = process.env.DB_USER     || config.database.user;
  const password = process.env.DB_PASSWORD || config.database.password;
  const database = process.env.DB_NAME     || config.database.database;

  const sequelize = new Sequelize(database, user, password, {
    dialect: "mysql",
    host: host,
    port: port,
  });

  db.Account = accountModel(sequelize);
  db.RefreshToken = refreshTokenModel(sequelize);

  db.Account.hasMany(db.RefreshToken, { onDelete: "CASCADE" });
  db.RefreshToken.belongsTo(db.Account);

  await sequelize.sync();
}

export default db;