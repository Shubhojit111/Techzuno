const path = require("path");
const mysql = require("mysql2/promise");
const { sequelize } = require("./config/db");
const { blogModel, categoryModel, tagModel, userModel } = require("./models");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const OLD_DB_CONFIG = {
  host: process.env.OLD_DB_HOST || "localhost",
  user: process.env.OLD_DB_USER || "root",
  password: process.env.OLD_DB_PASS || "",
  database: process.env.OLD_DB_NAME || "techzuno_old",
  multipleStatements: true,
};

const WP_PREFIX = "wpzg_";
const DEFAULT_USER_ID = 1;

async function migrateData() {
  console.log("🚀 Starting WordPress data migration...");
  console.log("⚠️  This script will CLEAR existing blog data first!");
  
  let oldDbConnection;
  
  try {
    // Step 1: Connect to both databases
    console.log("\n📡 Connecting to databases...");
    oldDbConnection = await mysql.createConnection(OLD_DB_CONFIG);
    await sequelize.authenticate();
    console.log("✅ Both databases connected successfully!");

    // Step 2: Clear existing blog-related data first
    console.log("\n🗑️  Clearing existing blog data...");
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await blogModel.destroy({ where: {}, truncate: true });
    await sequelize.query('DELETE FROM BlogCategories');
    await sequelize.query('DELETE FROM BlogTags');
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
    console.log("   ✅ Existing blogs cleared!");

    // Step 3: Get or create default user
    console.log("\n👤 Checking for default admin user...");
    let defaultUser = await userModel.findByPk(DEFAULT_USER_ID);
    if (!defaultUser) {
      console.log("⚠️  Default user not found, creating one...");
      defaultUser = await userModel.create({
        id: DEFAULT_USER_ID,
        name: "Admin User",
        email: "admin@techzuno.com",
        password: "hashed_password_placeholder", // Set a real password later
        role: "admin",
      });
      console.log("✅ Default admin user created!");
    } else {
      console.log("✅ Default admin user already exists!");
    }

    // Step 4: Import Categories from WordPress
    console.log("\n📦 Importing categories...");
    const [categories] = await oldDbConnection.query(`
      SELECT t.*, tt.description, tt.count 
      FROM ${WP_PREFIX}terms t
      JOIN ${WP_PREFIX}term_taxonomy tt ON t.term_id = tt.term_id
      WHERE tt.taxonomy = 'category'
    `);
    
    const categoryMap = new Map();
    let newCategoriesCount = 0;
    for (const wpCat of categories) {
      const [category, created] = await categoryModel.findOrCreate({
        where: { slug: wpCat.slug },
        defaults: {
          name: wpCat.name,
          description: wpCat.description,
          slug: wpCat.slug,
          count: wpCat.count,
        },
      });
      categoryMap.set(wpCat.term_id, category);
      if (created) {
        newCategoriesCount++;
        console.log(`   ✨ Created category: ${wpCat.name}`);
      }
    }
    console.log(`   - Categories processed: ${categories.length} (${newCategoriesCount} new)`);

    // Step 5: Import Tags from WordPress
    console.log("\n📦 Importing tags...");
    const [tags] = await oldDbConnection.query(`
      SELECT t.*, tt.description, tt.count 
      FROM ${WP_PREFIX}terms t
      JOIN ${WP_PREFIX}term_taxonomy tt ON t.term_id = tt.term_id
      WHERE tt.taxonomy = 'post_tag'
    `);
    
    const tagMap = new Map();
    let newTagsCount = 0;
    for (const wpTag of tags) {
      const [tag, created] = await tagModel.findOrCreate({
        where: { slug: wpTag.slug },
        defaults: {
          name: wpTag.name,
          description: wpTag.description,
          slug: wpTag.slug,
          count: wpTag.count,
        },
      });
      tagMap.set(wpTag.term_id, tag);
      if (created) {
        newTagsCount++;
        console.log(`   ✨ Created tag: ${wpTag.name}`);
      }
    }
    console.log(`   - Tags processed: ${tags.length} (${newTagsCount} new)`);

    // Step 6: Import Posts (Blogs) from WordPress
    console.log("\n📦 Importing blogs...");
    const [posts] = await oldDbConnection.query(`
      SELECT * FROM ${WP_PREFIX}posts 
      WHERE post_type = 'post' AND post_status = 'publish'
    `);

    // First get the site URL from options
    const [siteUrlResults] = await oldDbConnection.query(`
      SELECT option_value FROM ${WP_PREFIX}options WHERE option_name = 'siteurl'
    `);
    const siteUrl = siteUrlResults.length > 0 ? siteUrlResults[0].option_value : "";

    const blogMap = new Map();
    let newBlogsCount = 0;
    for (const wpPost of posts) {
      // Get featured image
      let blogImage = null;
      const [featuredImages] = await oldDbConnection.query(`
        SELECT pm.meta_value 
        FROM ${WP_PREFIX}postmeta pm
        WHERE pm.post_id = ? AND pm.meta_key = '_thumbnail_id'
      `, [wpPost.ID]);
      
      console.log(`   🔍 Blog "${wpPost.post_title}" (ID ${wpPost.ID}): thumbnail ID found?`, featuredImages.length > 0 ? featuredImages[0].meta_value : "NO");
      
      if (featuredImages.length > 0) {
        const thumbnailId = featuredImages[0].meta_value;
        
        // Try both guid and _wp_attached_file
        const [imagePosts] = await oldDbConnection.query(`
          SELECT guid FROM ${WP_PREFIX}posts WHERE ID = ?
        `, [thumbnailId]);
        
        const [attachedFiles] = await oldDbConnection.query(`
          SELECT meta_value FROM ${WP_PREFIX}postmeta WHERE post_id = ? AND meta_key = '_wp_attached_file'
        `, [thumbnailId]);

        console.log(`   🖼️  Image GUID:`, imagePosts.length > 0 ? imagePosts[0].guid : "N/A");
        console.log(`   📁 Attached file:`, attachedFiles.length > 0 ? attachedFiles[0].meta_value : "N/A");

        if (attachedFiles.length > 0) {
          blogImage = `${siteUrl}/wp-content/uploads/${attachedFiles[0].meta_value}`;
        } else if (imagePosts.length > 0) {
          blogImage = imagePosts[0].guid;
        }
      }

      // Map WordPress status to our status
      const statusMap = {
        'publish': 'published',
        'draft': 'draft',
        'pending': 'draft',
        'future': 'draft',
        'private': 'draft'
      };
      const status = statusMap[wpPost.post_status] || 'published';

      const blog = await blogModel.create({
        title: wpPost.post_title,
        content: wpPost.post_content,
        blogImage: blogImage,
        status: status,
        userId: DEFAULT_USER_ID,
        createdAt: new Date(wpPost.post_date_gmt),
        updatedAt: new Date(wpPost.post_modified_gmt),
      });
      newBlogsCount++;
      blogMap.set(wpPost.ID, blog);
      console.log(`   ✨ Created blog: ${wpPost.post_title} with blogImage:`, blogImage);
    }
    console.log(`   - Blogs processed: ${posts.length} (${newBlogsCount} new)`);

    // Step 7: Link categories and tags to blogs
    console.log("\n🔗 Linking categories and tags to blogs...");
    const [termRelationships] = await oldDbConnection.query(`
      SELECT tr.*, tt.taxonomy, tt.term_id 
      FROM ${WP_PREFIX}term_relationships tr
      JOIN ${WP_PREFIX}term_taxonomy tt ON tr.term_taxonomy_id = tt.term_taxonomy_id
    `);

    let linksCreated = 0;
    for (const rel of termRelationships) {
      const blog = blogMap.get(rel.object_id);
      if (!blog) continue;

      if (rel.taxonomy === "category") {
        const category = categoryMap.get(rel.term_id);
        if (category) {
          await blog.addCategory(category);
          linksCreated++;
        }
      } else if (rel.taxonomy === "post_tag") {
        const tag = tagMap.get(rel.term_id);
        if (tag) {
          await blog.addTag(tag);
          linksCreated++;
        }
      }
    }
    console.log(`   - Category/tag links processed: ${linksCreated}`);

    console.log("\n🎉 Migration completed successfully!");
    console.log("\n📊 Summary:");
    console.log(`   - Blogs imported: ${newBlogsCount}`);
    console.log(`   - Categories imported: ${newCategoriesCount}`);
    console.log(`   - Tags imported: ${newTagsCount}`);
    console.log(`   - Links created: ${linksCreated}`);

  } catch (error) {
    console.error("\n❌ Migration failed!");
    console.error(error);
  } finally {
    if (oldDbConnection) await oldDbConnection.end();
    await sequelize.close();
    process.exit(0);
  }
}

// Run migration
migrateData();
