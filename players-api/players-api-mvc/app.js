const express = require("express");
const bodyParser = require("body-parser");
const playersController = require("./controllers/playersController"); // Import controllers
const sql = require("mssql"); // Assuming you've installed mssql
const dbConfig = require("./dbconfig");
const staticMiddleware = express.static("public"); // Path to the public folder

const app = express();
app.use(bodyParser.json()); // Parse incoming JSON data in request body
app.use(bodyParser.urlencoded({ extended: true })); // For form data handling
app.use(staticMiddleware);
// Define individual routes for each controller function
app.get("/players", playersController.getAllPlayers);
app.get("/players/:id", playersController.getPlayerById);
app.post("/players", playersController.createPlayer);
app.put("/players/:id", playersController.updatePlayer); // PUT for updating books
app.delete("/players/:id", playersController.deletePlayer); // DELETE for deleting books

const validatePlayer = require("./middlewares/validatePlayer");
app.post("/players", validatePlayer, playersController.createPlayer); // Add validateBook before createBook

const port = process.env.PORT || 3000;

app.listen(port, async () => {
  try {
    // Connect to the database
    await sql.connect(dbConfig);    console.log("Database connection established successfully");
  } catch (err) {
    console.error("Database connection error:", err);
    // Terminate the application with an error code (optional)
    process.exit(1); // Exit with code 1 indicating an error
  }

  console.log(`Server listening on port ${port}`);
});

// Close the connection pool on SIGINT signal
process.on("SIGINT", async () => {
  console.log("Server is gracefully shutting down");
  // Perform cleanup tasks (e.g., close database connections)
  await sql.close();
  console.log("Database connection closed");
  process.exit(0); // Exit with code 0 indicating successful shutdown
});