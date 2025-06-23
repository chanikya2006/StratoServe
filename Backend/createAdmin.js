// createAdmin.js
const mongoose = require('mongoose');
require('dotenv').config();
const bcrypt = require('bcrypt');

// Simplified connection options
const MONGO_OPTIONS = {
  serverSelectionTimeoutMS: 10000, // 10 seconds timeout
  socketTimeoutMS: 30000, // 30 seconds timeout
};

// Get MongoDB URI from environment variables
const MONGODB_URI = process.env.MONGO_URI;

if (!MONGODB_URI) {
  console.error('❌ Error: MONGO_URI is not defined in .env file');
  process.exit(1);
}

console.log('🔌 Connecting to MongoDB...');
console.log('Using connection string:', MONGODB_URI.replace(/:[^:]*@/, ':***@')); // Hide password in logs

// Connect to MongoDB
mongoose.connect(MONGODB_URI, MONGO_OPTIONS)
  .then(() => {
    console.log('✅ Successfully connected to MongoDB');
    // Only proceed with admin creation if connection is successful
    createAdmin();
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
    console.log('\nTroubleshooting tips:');
    console.log('1. Verify your MongoDB Atlas username and password in the .env file');
    console.log('2. Make sure your IP is whitelisted in MongoDB Atlas Network Access');
    console.log('3. Check if the database name in the connection string is correct');
    console.log('4. Verify your internet connection');
    process.exit(1);
  });

// Import the Admin model
const Admin = require('./Admin');

async function createAdmin() {
  try {
    console.log('🔍 Checking for existing admin...');
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ adminname: 'admin' });
    if (existingAdmin) {
      console.log('ℹ️  Admin user already exists');
      process.exit(0);
    }

    // Hash the password
    const saltRounds = 10;
    const password = 'Admin@1234'; // Default password, change this in production
    const hashedPassword = await bcrypt.hash(password, saltRounds);
        
    // Create new admin
    const admin = new Admin({
      adminname: 'admin',
      email: 'admin@example.com',
      password: hashedPassword
    });

    // Save to database
    await admin.save();
    console.log('\n✅ Admin user created successfully!');
    console.log('   Username: admin');
    console.log('   Password: Admin@1234');
    console.log('\n⚠️  IMPORTANT: Please Change this password after first login!');
  } catch (error) {
    console.error('❌ Error creating admin user:', error.message);
  } finally {
    mongoose.connection.close();
    process.exit(0);
  }
}