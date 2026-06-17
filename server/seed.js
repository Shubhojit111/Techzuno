require("dotenv").config();

const mongoose = require("mongoose");
const userModel = require("./models/userModel");
const bcrypt = require("bcrypt");

const adminData = {
  email: process.env.ADMIN_EMAIL,
  password: process.env.ADMIN_PASSWORD,
  role: "admin",
  name: "Techzuno Admin",
};

const addSeedAdmin = async () => {
  try {
    if (!process.env.MONGO_URI || !adminData.email || !adminData.password) {
      throw new Error("MONGO_URI, ADMIN_EMAIL, and ADMIN_PASSWORD are required");
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database successfully connected");

    const isAdminAlreadyExists = await userModel.findOne({
      email: adminData.email,
    });

    if (isAdminAlreadyExists) {
      console.log("Admin already exists");
      await mongoose.connection.close();
      process.exit(0);
    }

    const hashPassword = await bcrypt.hash(adminData.password, 10);
    const seedAdmin = await userModel.create({
      ...adminData,
      password: hashPassword,
    });

    console.log("Admin created successfully", {
      id: seedAdmin._id,
      email: seedAdmin.email,
      role: seedAdmin.role,
    });
    await mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.log(err.message);
    await mongoose.connection.close();
    process.exit(1);
  }
};

addSeedAdmin();
