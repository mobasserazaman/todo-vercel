const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongoServer;

beforeAll(async () => {
  console.log("🚀 Starting in-memory MongoDB server...");
  
  // Start MongoMemoryServer for testing
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  console.log(`✅ Connected to test database at ${mongoUri}`);

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
});

afterAll(async () => {
  console.log("🛑 Stopping in-memory MongoDB server...");

  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop(); // Ensures MongoMemoryServer shuts down

  console.log("✅ Test database closed.");
});
