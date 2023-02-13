import mongoose from 'mongoose';

const dbConnection = async () => {
    try {
        mongoose.set("strictQuery", false)
        mongoose.connect(process.env.MONGO_URL);
            console.log('mongodb online');
        } catch (error) {
            console.log(error);
            throw new Error('Error a la hora de iniciar la base de datos');
        }
    };

export default dbConnection;