module.exports = {
    user: "playersapi_user", // Replace with your SQL Server login username
    password: "playersapi", // Replace with your SQL Server login password
    server: "localhost",
    database: "players_db",
    trustServerCertificate: true,
    options: {
      port: 1433, // Default SQL Server port
      connectionTimeout: 60000, // Connection timeout in milliseconds
    },
  };