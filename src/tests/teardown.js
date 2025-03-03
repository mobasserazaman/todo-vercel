module.exports = async () => {
    if (global.__MONGO_SERVER__) {
      await global.__MONGO_SERVER__.stop();
    } else {
      console.warn('MongoMemoryServer was not initialized.');
    }
  };
  
  