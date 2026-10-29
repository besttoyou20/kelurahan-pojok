import "./config/env.js";
import connectDB from "./database/db.js";
import app from "./app.js";

const PORT = process.env.PORT || 4000;
const NODE_ENV = process.env.NODE_ENV || "development";

const startServer = async () => {
  try {
    await connectDB.query("SELECT 1");

    console.log("Database connected successfully!");

    app.listen(PORT, () => {
      console.log(
        `Server running at http://localhost:${PORT} in ${NODE_ENV} environment`
      );
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();