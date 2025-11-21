import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error('MongoDB connection failed:', error);
        throw error;
    }
}