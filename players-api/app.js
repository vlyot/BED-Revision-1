const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const sql = require("mssql"); // Assuming you've installed mssql

let players = [
    {id: 1, username: 'Superman123', doc: '12-02-23'},
    {id: 2, username: 'uepsv', doc: '14-10-06'}
]

// parse incoming JSON data in requests
app.use(express.json())
// Configure body-parser to handle URL-encoded form data
app.use(bodyParser.urlencoded({ extended: true })); // Set extended: true for nested objects

app.get('/players', (req, res) => {
    res.json(players); // Send the array of books as JSON response
 });

 app.post('/players', (req, res) => {
    const newPlayer = req.body; // Get the new book data from the request body
    newPlayer.id = players.length + 1; // Assign a unique ID
    books.push(newPlayer); // Add the new book to the array
    res.status(201).json(newPlayer); // Send created book with status code 201
   });

   app.get('/players/:id', (req, res) => {
    const playerId = parseInt(req.params.id); // Get book ID from URL parameter
    const player = players.find(players => players.id === playerId);
  
    if (player) {
      res.json(player); // Send the book data if found
    } else {
      res.status(404).send('PLayer not found'); // Send error for non-existent book
    }
    });

    app.put('/players/:id', (req, res) => {
        const playerId = parseInt(req.params.id); // Get book ID from URL parameter
        const updatedplayer = req.body; // Get updated book data from request body
      
        const playerIndex = players.findIndex(players => players.id === playerId);
      
        if (playerIndex !== -1) {
          updatedplayer.id = playerId;
          players[playerIndex] = updatedplayer; // Update book data in the array
          res.json(updateplayer); // Send updated book data
        } else {
          res.status(404).send('player not found'); // Send error for non-existent book
        }
      });

      app.delete('/players/:id', (req, res) => {
        const playerId = parseInt(req.params.id); // Get book ID from URL parameter
      
        const playerIndex = players.findIndex(players => players.id === playerId);
      
        if (playerIndex !== -1) {
            players.splice(playerIndex, 1); // Remove book from the array
          res.status(204).send(); // Send empty response with status code 204 (No Content)
        } else {
          res.status(404).send('player not found'); // Send error for non-existent book
        }
      });

      app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
     });