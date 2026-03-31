import mongoose from 'mongoose';

export async function connectMongo(mongoUri?: string) {
  const uri = mongoUri || process.env.MONGODB_URI;
  if (!uri) throw new Error('MONGODB_URI is not set');

  if (mongoose.connection.readyState === 1) return mongoose.connection;

  mongoose.set('strictQuery', true);

  await mongoose.connect(uri, { autoIndex: true });
  console.log('MongoDB connected');

  return mongoose.connection;
}

