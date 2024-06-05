const Player = require("../models/player");

const getAllPlayers = async (req, res) => {
    try {
      const players = await Player.getAllPlayers();
      res.json(players);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error retrieving players");
    }
  };
  
  const getPlayerById = async (req, res) => {
    const playerId = parseInt(req.params.id);
    try {
      const player = await Player.getPlayerById(playerId);
      if (!player) {
        return res.status(404).send("player not found");
      }
      res.json(player);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error retrieving book");
    }
  };

  const createPlayer = async (req, res) => {
    const newPlayer = req.body;
    try {
      const createdPlayer = await players.createPlayer(newPlayer);
      res.status(201).json(createdPlayer);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error creating Player");
    }
  };
  
  const updatePlayer = async (req, res) => {
    const playerId = parseInt(req.params.id);
    const newPlayerData = req.body;
  
    try {
      const updatedPlayer = await Player.updatePlayer(playerId, newPlayerData);
      if (!updatedPlayer) {
        return res.status(404).send("Player not found");
      }
      res.json(updatedPlayer);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error updating player");
    }
  };
  
  const deletePlayer = async (req, res) => {
    const playerId = parseInt(req.params.id);
  
    try {
      const success = await Player.deletePlayer(playerId);
      if (!success) {
        return res.status(404).send("player not found");
      }
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).send("Error deleting player");
    }
  };
  
  module.exports = {
    getAllPlayers,
    getPlayerById,
    createPlayer,
    updatePlayer,
    deletePlayer,
  };