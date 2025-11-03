import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// Use the correctly spelled env var name: MONGODB_URL
const mongoUrl = process.env.MONGODB_URL || process.env.MONGOBD_URL;

if (!mongoUrl) {
    console.error('Missing MongoDB connection string. Set MONGODB_URL in .env');
}

// Provide recommended options and basic error/open handlers
mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).catch(err => {
    // Catch initial connection errors
    console.error('Initial MongoDB connection error:', err);
});

export const db = mongoose.connection;

db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

db.once('open', () => {
    console.log('Database Connected');
});