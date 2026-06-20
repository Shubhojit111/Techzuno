require("dotenv").config();

const userModel = require("./models/userModel");
const bcrypt = require("bcrypt");
const { connectDb, sequelize } = require("./config/db");

const adminData = {
  name: "Techzuno Admin",
  email: process.env.ADMIN_EMAIL,
  password: process.env.ADMIN_PASSWORD,
  role: "admin head",
};

const addSeedAdmin = async () => {
  try {
    if (!adminData.email || !adminData.password) {
      throw new Error("ADMIN_EMAIL, and ADMIN_PASSWORD are required");
    }

    await connectDb();
    console.log("Database successfully connected");

    const isAdminAlreadyExists = await userModel.findOne({
      where: {
        email: adminData.email,
      },
    });

    if (isAdminAlreadyExists) {
      console.log("Admin already exists");
      await sequelize.close();
      process.exit(0);
    }

    const hashPassword = await bcrypt.hash(adminData.password, 10);
    const seedAdmin = await userModel.create({
      ...adminData,
      password: hashPassword,
    });

    console.log("Admin created successfully", {
      id: seedAdmin.id,
      email: seedAdmin.email,
      role: seedAdmin.role,
    });
    await sequelize.close();
    process.exit(0);
  } catch (err) {
    console.log(err.message);
    await sequelize.close();
    process.exit(1);
  }
};

addSeedAdmin();
