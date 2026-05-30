import mongoose from 'mongoose';

import env from './env.js';

let hasLoggedConnectionFailure = false;

export async function connectDatabase() {
  try {
    await mongoose.connect(env.mongoUri);
    hasLoggedConnectionFailure = false;
    console.log('MongoDB connected');
  } catch (error) {
    if (!hasLoggedConnectionFailure) {
      console.warn(
        `MongoDB connection failed. Continuing without database connection in ${env.nodeEnv} mode.`,
      );
      console.warn(error.message);
      hasLoggedConnectionFailure = true;
    }
  }
}

export function isDatabaseConnected() {
  return mongoose.connection.readyState === 1;
}
