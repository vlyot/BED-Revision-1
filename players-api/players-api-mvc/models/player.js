const sql = require("mssql");
const dbConfig = require("../dbconfig");

class Player {
    constructor(id, username, doc) {
      this.id = id;
      this.username = username;
      this.doc = doc;
    }

    static async getAllPlayers() {
      const connection = await sql.connect(dbConfig);

      const sqlQuery = `SELECT * FROM Players`; // Replace with your actual table name
  
      const request = connection.request();
      const result = await request.query(sqlQuery);
  
      connection.close();
  
      return result.recordset.map(
        (row) => new Player(row.id, row.username, row.doc)
      ); // Convert rows to Book objects
    }
  
    static async getPlayerById(id) {
      const connection = await sql.connect(dbConfig);

      const sqlQuery = `SELECT * FROM Players WHERE id = @id`; // Parameterized query
  
      const request = connection.request();
      request.input("id", id);
      const result = await request.query(sqlQuery);
  
      connection.close();
  
      return result.recordset[0]
        ? new Player(
            result.recordset[0].id,
            result.recordset[0].username,
            result.recordset[0].doc
          )
        : null; // Handle book not found
    }

    static async createBook(newPlayerData) {
      const connection = await sql.connect(dbConfig);
  
      const sqlQuery = `INSERT INTO Players (username, doc) VALUES (@username, @doc); SELECT SCOPE_IDENTITY() AS id;`; // Retrieve ID of inserted record
  
      const request = connection.request();
      request.input("username", newPlayerData.username);
      request.input("doc", newPlayerData.doc);
  
      const result = await request.query(sqlQuery);
  
      connection.close();
  
      // Retrieve the newly created book using its ID
      return this.getPlayerById(result.recordset[0].id);
    
    }
    static async updatePlayer(id, newPlayerData) {
      const connection = await sql.connect(dbConfig);
  
      const sqlQuery = `UPDATE Players SET username = @username, doc = @doc WHERE id = @id`; // Parameterized query
  
      const request = connection.request();
      request.input("id", id);
      request.input("username", newPlayerData.username || null); // Handle optional fields
      request.input("doc", newPlayerData.doc || null);
  
      await request.query(sqlQuery);
  
      connection.close();
  
      return this.getPlayerById(id); // returning the updated book data
    }
  
    static async deletePlayer(id) {
      const connection = await sql.connect(dbConfig);
  
      const sqlQuery = `DELETE FROM Player WHERE id = @id`; // Parameterized query
  
      const request = connection.request();
      request.input("id", id);
      const result = await request.query(sqlQuery);
  
      connection.close();
  
      return result.rowsAffected > 0; // Indicate success based on affected rows
    }
  }

 
  module.exports = Player;