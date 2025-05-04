import mongoose from 'mongoose';

export const connectToDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/calculator');
    console.log('✅ Connected to MongoDB');
  } catch (err) {
    console.error('❌ Failed to connect to MongoDB:', err);
    process.exit(1);
  }
};
