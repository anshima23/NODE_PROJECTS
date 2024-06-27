//connect to mongoDB


const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    //This line attempts to connect to the MongoDB database using 
    //the mongoose.connect method. The connection URI is provided from the
    // environment variable process.env.MONGODB_URI. The options object specifies
    // to use the new URL parser (useNewUrlParser: true) and the new Server Discovery
    // and Monitoring engine (useUnifiedTopology: true).
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`Database Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error}`);
  }
};

module.exports = connectDB;
