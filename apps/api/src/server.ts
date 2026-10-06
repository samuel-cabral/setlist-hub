import mongoose from 'mongoose';
import { createApp } from './app.js';
import { config } from './config.js';

await mongoose.connect(config.MONGODB_URI);
createApp().listen(config.PORT, () => {
  console.log(`API listening on http://localhost:${config.PORT}`);
});
