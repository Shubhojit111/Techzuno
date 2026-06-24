// const mongoose = require('mongoose');

// const connectDb = () => {
//     mongoose.connect(process.env.MONGO_URI)
//     .then(()=>
//     {
//         console.log("Database successfully connected ",process.env.MONGO_URI)
//     })
//     .catch((error)=>{
//         console.log(error);
//     })

// }

// module.exports=connectDb;

const { Sequelize } = require("sequelize");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

/* ===============================
   CREATE SEQUELIZE INSTANCE
================================ */
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",

    /* 🔥 CONNECTION POOL (VERY IMPORTANT) */
    pool: {
      max: 5, // max connections
      min: 0,
      acquire: 60000, // wait up to 60s
      idle: 10000, // release idle connections
    },

    /* 🔥 TIMEOUT FIX */
    dialectOptions: {
      connectTimeout: 60000,
    },

    logging: false,
  },
);

sequelize.addHook("afterConnect", async (connection) => {
  const conn =
    typeof connection?.promise === "function"
      ? connection.promise()
      : connection;
  try {
    await conn.query("SET SESSION innodb_lock_wait_timeout = 10");
  } catch {}
  try {
    await conn.query("SET SESSION lock_wait_timeout = 10");
  } catch {}
});

const connectDb = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database successfully connected");

    console.log(sequelize.models);

    await sequelize.sync(); // Sync models with the database
    console.log("Database synchronized successfully");
    console.log(sequelize.models)
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};

module.exports = { sequelize, connectDb };
