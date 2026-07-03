const userModel = require("../models/userModel");
const blogModel = require("../models/blogsModel");
const categoryModel = require("../models/blogsCategoryModel");
const tagModel = require("../models/blogsTagModel");
const { Op } = require("sequelize");

const getDashboardStats = async (req, res) => {
  try {
    // 1. Fetch total counts
    const totalUsers = await userModel.count();
    const totalBlogs = await blogModel.count();
    const totalCategories = await categoryModel.count();
    const totalTags = await tagModel.count();

    // 2. Fetch recent data
    const recentBlogs = await blogModel.findAll({
      order: [["createdAt", "DESC"]],
      limit: 5,
      include: [
        {
          model: userModel,
          attributes: ["id", "name", "email", "profileImage"],
        },
      ],
    });

    const recentUsers = await userModel.findAll({
      order: [["createdAt", "DESC"]],
      limit: 5,
      attributes: ["id", "name", "email", "role", "profileImage", "createdAt"],
    });

    // 3. Activity data (blogs created in the last 14 days)
    const fourteenDaysAgo = new Date();
    fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);
    fourteenDaysAgo.setHours(0, 0, 0, 0);

    const blogsLast14Days = await blogModel.findAll({
      where: {
        createdAt: {
          [Op.gte]: fourteenDaysAgo,
        },
      },
      attributes: ["id", "createdAt"],
    });

    // Group activity data by date (YYYY-MM-DD format)
    const activityMap = {};
    for (let i = 13; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateString = d.toISOString().split("T")[0];
      activityMap[dateString] = 0;
    }

    blogsLast14Days.forEach((blog) => {
      const dateString = new Date(blog.createdAt).toISOString().split("T")[0];
      if (activityMap[dateString] !== undefined) {
        activityMap[dateString]++;
      }
    });

    const activityChartData = Object.keys(activityMap).map((date) => ({
      date,
      count: activityMap[date],
    }));

    return res.status(200).json({
      message: "Dashboard stats fetched successfully",
      stats: {
        totals: {
          users: totalUsers,
          blogs: totalBlogs,
          categories: totalCategories,
          tags: totalTags,
        },
        recentBlogs,
        recentUsers,
        activityChartData,
      },
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    return res.status(500).json({
      message: "Unable to fetch dashboard stats",
    });
  }
};

module.exports = {
  getDashboardStats,
};
