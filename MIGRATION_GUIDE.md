# WordPress to Techzuno Database Migration Guide

This guide will help you migrate your blog data from the old WordPress database to your new Techzuno database.

## Prerequisites
1. MySQL installed and running locally
2. The old database dump: `techzuno.sql` (located in project root)

## Step 1: Import Old WordPress Database to Temporary DB

First, we need to import the old WordPress database into a temporary database so our migration script can read from it.

### Using MySQL CLI:
```bash
# Create a temporary database for the old WordPress data
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS techzuno_old;"

# Import the SQL dump into the temporary database
mysql -u root -p techzuno_old < techzuno.sql
```

### Using phpMyAdmin:
1. Open phpMyAdmin
2. Create a new database named `techzuno_old`
3. Import the `techzuno.sql` file into this database

## Step 2: Configure Environment Variables

Add the following to your `server/.env` file (if not already present):
```env
# Old WordPress Database (Temporary)
OLD_DB_HOST=localhost
OLD_DB_USER=root
OLD_DB_PASS=your_mysql_password
OLD_DB_NAME=techzuno_old
```

## Step 3: Run the Migration Script

Navigate to the server directory and run the migration:
```bash
cd server
npm run migrate
```

## What the Migration Script Does
1. **Connects** to both the old WordPress database and your new Techzuno database
2. **Creates** a default admin user (if one doesn't exist)
3. **Imports** Categories from WordPress
4. **Imports** Tags from WordPress
5. **Imports** Published Posts as Blogs (including featured images)
6. **Links** Categories and Tags to their respective Blogs

## Verify the Migration

After running the script, check:
1. The server console output shows success messages
2. Log into your Techzuno admin dashboard and verify blogs are present
3. Check that categories and tags are correctly assigned

## Troubleshooting

### Issue: Can't connect to old database
- Double-check your `OLD_DB_*` credentials in `server/.env`
- Ensure MySQL is running
- Verify the temporary database `techzuno_old` exists

### Issue: No blogs imported
- Check that your old database has posts with `post_type='post'` and `post_status='publish'`
- Verify the WordPress table prefix is `wpzg_` (if not, update `WP_PREFIX` in the script)

## Next Steps After Migration
1. Update the default admin user's password
2. Verify and adjust blog images (if needed)
3. Review and clean up imported content (remove WordPress shortcodes if necessary)
