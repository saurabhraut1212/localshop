import mongoose from 'mongoose';

export async function connectDb() {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        if (conn) {
            console.log(`Mongodb connected to ${conn.connection.host}`);
        } else {
            console.log('error occur');
        }
    } catch (error) {
        throw new Error('Connection with mongodb failed');
    }
}